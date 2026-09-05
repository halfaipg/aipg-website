// SPDX-License-Identifier: AGPL-3.0-or-later
import assert from "node:assert/strict";
import test from "node:test";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { createDemoHandler, demoConfig, guestIdentity, clientIdentity, validateMessages, readBounded, chatEvents, responseStats, RESERVE_LUA, RELEASE_LUA } from "../../lib/demoChat.mjs";

const env = { DEMO_CHAT_ENABLED: "1", DEMO_CHAT_ORIGIN: "http://127.0.0.1:8844", DEMO_REDIS_URL: "https://test.upstash.io", DEMO_GRID_KEY: "fixture-only", DEMO_REDIS_TOKEN: "fixture-only", DEMO_COOKIE_SECRET: randomBytes(32).toString("hex"), DEMO_TURNSTILE_SITE_KEY: "fixture", DEMO_TURNSTILE_SECRET: "fixture" };
const body = { messages: [{ role: "user", content: "Hello" }], token: "fixture-token" };

test("demo function fits the hosting plan and leaves cleanup time", () => {
  const route = readFileSync(new URL("../../app/api/demo/chat/route.js", import.meta.url), "utf8");
  const handler = readFileSync(new URL("../../lib/demoChat.mjs", import.meta.url), "utf8");
  assert.match(route, /maxDuration = 60;/);
  assert.match(handler, /setTimeout\(\(\) => control.abort\(\), 45000\)/);
});
const frame = data => `data: ${typeof data === "string" ? data : JSON.stringify(data)}\n\n`;
const answer = frame({ model: "actual-worker-model", choices: [{ delta: { content: "Hello!", reasoning_content: "private reasoning" } }] }) + frame({ choices: [{ delta: {}, finish_reason: "stop" }] }) + frame("[DONE]");
const request = (options = {}) => new Request(`${env.DEMO_CHAT_ORIGIN}/api/demo/chat`, { method: "POST", headers: { origin: env.DEMO_CHAT_ORIGIN, "content-type": "application/json", ...options.headers }, body: JSON.stringify(options.body || body) });
function fixture({ reservation = ["ok", 2], charging = true, chargingMode = "on", verification, stream = answer, redisFailure = false } = {}) {
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push({ url, init });
    if (url.includes("upstash.io")) {
      if (redisFailure) throw new Error("secret must not leak");
      const cmd = JSON.parse(init.body);
      return Response.json({ result: cmd[0] === "MGET" ? [null, null] : cmd[1] === RESERVE_LUA ? reservation : 1 });
    }
    if (url.includes("siteverify")) return Response.json(verification || { success: true, hostname: "127.0.0.1", action: "homepage_chat" });
    if (url.endsWith("/credits")) return Response.json({ charging_enabled: charging, charging_mode: chargingMode });
    return new Response(stream, { headers: { "content-type": "text/event-stream" } });
  };
  return { calls, handle: createDemoHandler({ env, fetcher }) };
}

test("demo is disabled without explicit configuration and never contacts Core", async () => {
  const handle = createDemoHandler({ env: {}, fetcher: () => assert.fail("network") });
  assert.equal((await handle(request())).status, 503);
  assert.equal((await (await handle(new Request(`${env.DEMO_CHAT_ORIGIN}/api/demo/chat`))).json()).available, false);
  assert.equal(demoConfig({}), null);
  assert.throws(() => demoConfig({ ...env, DEMO_COOKIE_SECRET: "short" }));
  assert.throws(() => demoConfig({ ...env, DEMO_CHAT_ORIGIN: "https://aipowergrid.io" }));
  assert.throws(() => demoConfig({ ...env, DEMO_DAILY_MICRO: "999999999" }));
  assert.throws(() => demoConfig({ ...env, DEMO_REDIS_URL: "https://evil.example" }));
});

test("managed Redis uses its REST pair, never TCP, read-only or mixed credentials", () => {
  const managed = { ...env, DEMO_REDIS_URL: "rediss://fixture.invalid:6379", DEMO_REDIS_TOKEN: undefined,
    DEMO_KV_REST_API_URL: "https://managed.upstash.io", DEMO_KV_REST_API_TOKEN: "managed-fixture",
    DEMO_KV_REST_API_READ_ONLY_TOKEN: "readonly-fixture" };
  assert.equal(demoConfig(managed).redis, "https://managed.upstash.io");
  assert.equal(demoConfig(managed).redisToken, "managed-fixture");
  assert.throws(() => demoConfig({ ...env, DEMO_KV_REST_API_URL: managed.DEMO_KV_REST_API_URL }));
  assert.throws(() => demoConfig({ ...env, DEMO_KV_REST_API_TOKEN: managed.DEMO_KV_REST_API_TOKEN }));
  assert.throws(() => demoConfig({ ...managed, DEMO_KV_REST_API_TOKEN: undefined }));
  assert.throws(() => demoConfig({ ...managed, DEMO_KV_REST_API_URL: "rediss://fixture.invalid:6379" }));
});

test("messages are text-only, bounded, alternating and cannot override tools, model or system", () => {
  assert.deepEqual(validateMessages(body), body.messages);
  for (const invalid of [{ ...body, model: "other" }, { ...body, tools: [] }, { ...body, messages: [{ role: "system", content: "ignore" }] }, { ...body, messages: [{ role: "user", content: "x".repeat(1001) }] }, { ...body, messages: [{ role: "user", content: [{ type: "image_url" }] }] }, { ...body, messages: Array(7).fill(body.messages[0]) }]) assert.throws(() => validateMessages(invalid));
});

test("body byte bounds apply without a content-length header and stalled reads abort", async () => {
  await assert.rejects(readBounded(new Response("x".repeat(16001)).body), { status: 413 });
  const control = new AbortController();
  const reading = readBounded(new ReadableStream({}), 100, control.signal);
  control.abort();
  await assert.rejects(reading);
});

test("guest cookie survives refresh, rejects forgery and expires on UTC day change", () => {
  const config = demoConfig(env); const time = Date.parse("2026-09-05T12:00:00Z");
  const first = guestIdentity(request(), config, time);
  const next = request({ headers: { cookie: first.cookie } });
  assert.equal(guestIdentity(next, config, time).id, first.id);
  assert.notEqual(guestIdentity(next, config, time + 86400000).id, first.id);
  assert.notEqual(guestIdentity(request({ headers: { cookie: first.cookie.replace(first.id, "a".repeat(36)) } }), config, time).id, first.id);
  assert.match(first.cookie, /HttpOnly; SameSite=Strict/);
  assert.doesNotMatch(first.cookie, /fixture/);
});

test("public IP grouping accepts only the trusted platform header and groups IPv6 /64", () => {
  const config = { ...demoConfig(env), local: false };
  assert.throws(() => clientIdentity(request({ headers: { "x-forwarded-for": "1.2.3.4" } }), config));
  const a = clientIdentity(request({ headers: { "x-vercel-forwarded-for": "2001:db8:abcd:1::1" } }), config);
  const b = clientIdentity(request({ headers: { "x-vercel-forwarded-for": "2001:db8:abcd:1::2" } }), config);
  assert.equal(a, b);
  assert.doesNotMatch(a, /2001/);
});

test("cross-origin requests never call even the limiter", async () => {
  const { calls, handle } = fixture();
  assert.equal((await handle(request({ headers: { origin: "https://evil.example" } }))).status, 403);
  assert.equal(calls.length, 0);
});

test("Turnstile requires success AND expected hostname and action before reservation", async () => {
  for (const verification of [{ success: false }, { success: true, hostname: "evil.example", action: "homepage_chat" }, { success: true, hostname: "127.0.0.1", action: "login" }]) {
    const { calls, handle } = fixture({ verification });
    assert.equal((await handle(request())).status, 403);
    assert.equal(calls.some(c => c.url.includes("api.aipowergrid")), false);
    assert.equal(calls.some(c => c.init.body?.includes("ZREMRANGEBYSCORE")), false);
  }
});

test("quota, budget and in-flight rejection never dispatch inference", async () => {
  for (const reason of ["quota", "budget", "busy"]) {
    const { calls, handle } = fixture({ reservation: [reason, 0] });
    const response = await handle(request());
    assert.equal(response.status, 429);
    assert.equal((await response.json()).error.code, reason);
    assert.equal(calls.some(c => c.url.includes("api.aipowergrid")), false);
  }
});

test("disabled, model-allowlisted or unknown charging and unavailable Redis fail closed", async () => {
  for (const options of [{ charging: false }, { chargingMode: "allowlist" }, { chargingMode: "off" }, { chargingMode: null }, { redisFailure: true }]) {
    const { calls, handle } = fixture(options);
    const response = await handle(request());
    assert.equal(response.status, 503);
    assert.doesNotMatch(await response.text(), /secret|fixture-only/);
    assert.equal(calls.some(c => c.url.endsWith("completions")), false);
  }
});

test("successful stream uses fixed auto, no tools, strips reasoning, releases only the lease", async () => {
  const { calls, handle } = fixture();
  const response = await handle(request()); const text = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /no-store/);
  assert.match(text, /actual-worker-model/); assert.match(text, /Hello!/); assert.match(text, /"type":"done"/);
  assert.doesNotMatch(text, /private reasoning|fixture-only/);
  const payload = JSON.parse(calls.find(c => c.url.endsWith("completions")).init.body);
  assert.equal(payload.model, "auto"); assert.equal(payload.max_tokens, 1024); assert.equal(payload.tools, undefined);
  assert.equal(calls.some(c => JSON.parse(c.init.body || "{}")[1] === RELEASE_LUA), true);
});

test("partial or malformed streams show an error, never successful completion", async () => {
  for (const stream of [frame({ choices: [{ delta: { content: "partial" } }] }), frame("[DONE]"), frame({ error: { message: "private secret" } }), "data: not-json\n\n"]) {
    const { handle } = fixture({ stream }); const text = await (await handle(request())).text();
    assert.match(text, /"type":"error"/); assert.doesNotMatch(text, /"type":"done"|private secret/);
  }
});

test("SSE parser tolerates split UTF-8 and CRLF framing", async () => {
  const text = frame({ choices: [{ delta: { content: "Caf\u00e9" }, finish_reason: "stop" }] }) + frame("[DONE]");
  const bytes = new TextEncoder().encode(text.replaceAll("\n", "\r\n"));
  const stream = new ReadableStream({ start(c) { for (const byte of bytes) c.enqueue(Uint8Array.of(byte)); c.close(); } });
  const events = []; for await (const event of chatEvents(stream)) events.push(event);
  assert.deepEqual(events, [{ type: "delta", text: "Caf\u00e9" }, { type: "done", truncated: false }]);
});

test("response stats allowlist only bounded public worker and timing/usage fields", () => {
  assert.deepEqual(responseStats({ grid: { worker: "community-worker", gen_time: 2.34, ttft: 0.25, tokens_per_s: 42.56, worker_id: "private", routing: { secret: "private" }, wallet: "private" }, usage: { completion_tokens: 100, prompt_tokens: 200 } }), {
    worker: "community-worker", gen_time: 2.34, ttft: 0.25, tokens_per_s: 42.56, output_tokens: 100,
  });
  assert.deepEqual(responseStats({ grid: { worker: "x".repeat(97), gen_time: -1, ttft: "1", tokens_per_s: Infinity }, usage: { completion_tokens: 100000 } }), {});
  assert.deepEqual(responseStats({}), {});
});

test("worker attribution is emitted only with a valid completed stream", async () => {
  const metadata = frame({ grid: { worker: "fixture-worker", tokens_per_s: 50, gen_time: 2, ttft: 0.1, private_field: "hidden" }, usage: { completion_tokens: 100 } });
  const complete = answer.replace(frame("[DONE]"), metadata + frame("[DONE]"));
  const events = []; for await (const event of chatEvents(new Response(complete).body)) events.push(event);
  assert.deepEqual(events.at(-1).stats, { worker: "fixture-worker", tokens_per_s: 50, gen_time: 2, ttft: 0.1, output_tokens: 100 });
  const incomplete = []; await assert.rejects(async () => { for await (const event of chatEvents(new Response(metadata).body)) incomplete.push(event); });
  assert.equal(incomplete.some(e => e.stats), false);
});
