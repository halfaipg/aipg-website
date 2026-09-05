import test from "node:test";
import assert from "node:assert/strict";
import { recommendWorker } from "../../app/run/operatorRecommendation.mjs";

const machine = { os: "linux", accelerator: "nvidia", vram: 24, ram: 64, disk: 100, workload: "text", textReady: true, mediaReady: false };

test("text preference is not overridden by audio-capable hardware", () => {
  assert.equal(recommendWorker(machine).action, "View worker downloads");
});

test("a gated desktop does not claim all text releases are unavailable", () => {
  for (const os of ["macos", "windows"]) {
    const result = recommendWorker({ ...machine, os, textReady: false });
    assert.match(result.secondary, /selected platform/);
    assert.doesNotMatch(result.body + result.secondary, /older mutable|not public yet|still in validation/);
    assert.equal(result.href, "/docs/connect-existing-stack");
  }
});

test("audio and image requests lead to their own guides without unlocking media", () => {
  for (const [workload, guide] of [["audio", "ace-step"], ["media", "comfyui"]]) {
    const result = recommendWorker({ ...machine, workload });
    assert.equal(result.href, `/docs/backends/${guide}`);
    assert.match(result.secondary, /still in qualification/);
    assert.match(result.secondary, /do not earn rewards/);
  }
});

test("media requirements and available release remain separate", () => {
  const result = recommendWorker({ ...machine, workload: "audio", disk: 10, mediaReady: true });
  assert.match(result.title, /requirements first/);
  assert.match(result.secondary, /passes its local test/);
});

test("CPU choice leads to non-economic validator preview", () => {
  const result = recommendWorker({ ...machine, accelerator: "cpu" });
  assert.equal(result.href, "/validate");
  assert.match(result.secondary, /no rewards/);
});
