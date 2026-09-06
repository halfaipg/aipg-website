// SPDX-License-Identifier: AGPL-3.0-or-later
import test from "node:test";
import assert from "node:assert/strict";
import { spawn, spawnSync, execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { RESERVE_LUA, RELEASE_LUA } from "../../lib/demoChat.mjs";
import { IMAGE_RESERVE_LUA } from "../../lib/demoImagePolicy.mjs";

const available = spawnSync("redis-server", ["--version"]).status === 0 && spawnSync("redis-cli", ["--version"]).status === 0;
test("real isolated Redis proves atomic guest, IP, budget, concurrency and lease limits", { skip: available ? false : "Install redis-server and redis-cli for the real Lua concurrency proof" }, async () => {
  const dir = await mkdtemp(join(tmpdir(), "aipg-demo-")); const socket = join(dir, "redis.sock");
  const server = spawn("redis-server", ["--port", "0", "--unixsocket", socket, "--save", "", "--appendonly", "no"], { stdio: ["ignore", "pipe", "pipe"] });
  const ended = new Promise(resolve => server.once("exit", resolve));
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Redis startup timed out")), 5000);
      server.on("error", reject);
      server.stdout.on("data", data => { if (data.toString().toLowerCase().includes("ready to accept connections")) { clearTimeout(timer); resolve(); } });
    });
    const command = async (...args) => JSON.parse((await promisify(execFile)("redis-cli", ["-s", socket, "--json", ...args.map(String)])).stdout);
    const reserve = (prefix, guest, ip, id, budget = 100, clock = 1000) => command("EVAL", RESERVE_LUA, 5, `${prefix}:g:${guest}`, `${prefix}:ip:${ip}`, `${prefix}:budget`, `${prefix}:active`, `${prefix}:lease:${ip}`, 10, budget, clock, id, 86400);
    const release = (prefix, ip, id) => command("EVAL", RELEASE_LUA, 2, `${prefix}:active`, `${prefix}:lease:${ip}`, id);
    const budgetRace = await Promise.all(Array.from({ length: 25 }, (_, i) => reserve("budget", i, i, `r${i}`, 20)));
    assert.equal(budgetRace.filter(r => r[0] === "ok").length, 2);
    assert.equal(await command("GET", "budget:budget"), "20");
    // Expired global leases keep the separate concurrency cap from masking the guest cap.
    const guestRace = [];
    for (let wave = 0; wave < 7; wave++) {
      guestRace.push(...await Promise.all(Array.from({ length: 4 }, (_, i) => reserve("guest", "same", wave * 4 + i, `r${wave}-${i}`, 1000, 1000 + wave * 80000))));
    }
    assert.equal(guestRace.filter(r => r[0] === "ok").length, 15);
    assert.equal(await command("GET", "guest:g:same"), "15");
    const activeRace = await Promise.all(Array.from({ length: 25 }, (_, i) => reserve("active", i, i, `r${i}`, 1000)));
    assert.equal(activeRace.filter(r => r[0] === "ok").length, 4);
    for (let i = 0; i < 30; i++) {
      const result = await reserve("ip", i, "same", `r${i}`, 1000);
      assert.equal(result[0], "ok");
      assert.equal(result[1], Math.min(14, 29 - i));
      await release("ip", "same", `r${i}`);
    }
    assert.equal((await reserve("ip", "new-cookie", "same", "r31", 1000))[0], "quota");
    assert.equal(await command("GET", "ip:budget"), "300");
    assert.equal((await reserve("lease", 1, 1, "first"))[0], "ok");
    assert.equal((await reserve("lease", 2, 1, "second"))[0], "busy");
    await release("lease", 1, "wrong-id");
    assert.equal(await command("GET", "lease:lease:1"), "first");
    await release("lease", 1, "first");
    await release("lease", 1, "first");
    assert.equal((await reserve("lease", 2, 1, "second"))[0], "ok");
    assert.equal(await command("GET", "lease:budget"), "20");
    const image = (prefix, guest, ip, budget = 1000, lease = "live") => command("EVAL", IMAGE_RESERVE_LUA, 4,
      `${prefix}:g:${guest}:images`, `${prefix}:ip:${ip}:images`, `${prefix}:budget`, `${prefix}:lease:${ip}`, 10, budget, 86400, lease);
    await command("SET", "image-guest:lease:1", "live", "EX", 75);
    const imageGuestRace = await Promise.all(Array.from({ length: 25 }, () => image("image-guest", "same", 1)));
    assert.equal(imageGuestRace.filter(r => r[0] === "ok").length, 2);
    assert.equal(await command("GET", "image-guest:budget"), "20");
    await command("SET", "image-ip:lease:1", "live", "EX", 75);
    const imageIpRace = await Promise.all(Array.from({ length: 25 }, (_, i) => image("image-ip", i, 1)));
    assert.equal(imageIpRace.filter(r => r[0] === "ok").length, 4);
    assert.equal(await command("GET", "image-ip:budget"), "40");
    // Text and image reservations share one daily ceiling, not separate budgets.
    assert.equal((await reserve("shared", 1, 1, "live", 20))[0], "ok");
    assert.equal((await image("shared", 1, 1, 20))[0], "ok");
    assert.equal((await image("shared", 2, 1, 20))[0], "budget");
    assert.equal(await command("GET", "shared:budget"), "20");
    assert.equal(await command("GET", "shared:g:2:images"), null);
    await release("shared", 1, "live");
    assert.equal((await image("shared", 1, 1))[0], "expired");
    assert.equal(await command("GET", "shared:g:1:images"), "1");
  } finally {
    server.kill("SIGTERM"); await ended; await rm(dir, { recursive: true, force: true });
  }
});
