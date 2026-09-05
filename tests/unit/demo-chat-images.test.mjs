// SPDX-License-Identifier: AGPL-3.0-or-later
import assert from "node:assert/strict";
import test from "node:test";
import { randomBytes } from "node:crypto";
import { createDemoHandler, demoConfig, chatEvents, RESERVE_LUA } from "../../lib/demoChat.mjs";
import { IMAGE_MODELS, IMAGE_TOOL, IMAGE_RESERVE_LUA, imagePrompt, safeImageUrl } from "../../lib/demoImagePolicy.mjs";

const env = { DEMO_CHAT_ENABLED: "1", DEMO_IMAGES_ENABLED: "1", DEMO_CHAT_ORIGIN: "http://localhost", DEMO_REDIS_URL: "https://fixture.upstash.io", DEMO_REDIS_TOKEN: "fixture", DEMO_GRID_KEY: "fixture", DEMO_COOKIE_SECRET: randomBytes(32).toString("hex"), DEMO_TURNSTILE_SITE_KEY: "fixture", DEMO_TURNSTILE_SECRET: "fixture" };
const frame = data => `data: ${typeof data === "string" ? data : JSON.stringify(data)}\n\n`;
const callStream = (name = "generate_image", args = '{"prompt":"A futuristic city"}', reason = "tool_calls") => frame({ choices: [{ delta: { tool_calls: [{ index: 0, type: "function", function: { name, arguments: args } }] } }] }) + frame({ choices: [{ finish_reason: reason }] }) + frame("[DONE]");
const asset = "https://media.aipg.art/image/fixture-job/0.webp";
const request = () => new Request("http://localhost/api/demo/chat", { method: "POST", headers: { origin: "http://localhost", "content-type": "application/json" }, body: JSON.stringify({ token: "fixture", messages: [{ role: "user", content: "Generate a futuristic city image" }] }) });

function fixture(options = {}) {
  const calls = [];
  const fetcher = async (url, init = {}) => {
    calls.push({ url, init });
    if (url.includes("upstash")) {
      const cmd = JSON.parse(init.body);
      return Response.json({ result: cmd[0] === "MGET" ? (cmd[1].endsWith(":images") ? [1, 2] : [0, 0]) : cmd[1] === RESERVE_LUA ? ["ok", 14] : cmd[1] === IMAGE_RESERVE_LUA ? options.reservation || ["ok", 1] : 1 });
    }
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "localhost", action: "homepage_chat" });
    if (url.endsWith("/credits")) return Response.json({ charging_enabled: true, charging_mode: "allowlist", service_budget: { version: 1, all_models_charged: true, per_request_micro: 10000, daily_micro: 500000 } });
    if (url.endsWith("/models")) {
      options.onModels?.();
      return Response.json(options.models || [{ name: options.model || IMAGE_MODELS[0], type: "image", count: 1 }]);
    }
    if (url.endsWith("/generations")) return options.imageResponse || Response.json({ data: [{ url: options.url || asset }], grid: { model: options.resultModel || options.model || IMAGE_MODELS[0], worker: "public-worker", gen_time: 2 } });
    return new Response(options.stream ?? callStream(), { headers: { "content-type": "text/event-stream" } });
  };
  return { calls, handle: createDemoHandler({ env: { ...env, ...(options.model ? { DEMO_IMAGE_MODEL: options.model } : {}) }, fetcher }) };
}

test("images are opt-in and only Z-Image or Klein can be configured", () => {
  assert.equal(demoConfig({ ...env, DEMO_IMAGES_ENABLED: "0" }).images, false);
  assert.equal(demoConfig(env).imageModel, "z-image-turbo");
  assert.equal(demoConfig({ ...env, DEMO_IMAGE_MODEL: IMAGE_MODELS[1] }).imageModel, IMAGE_MODELS[1]);
  assert.throws(() => demoConfig({ ...env, DEMO_IMAGE_MODEL: "Krea 2 Turbo" }));
});

test("image tool exposes only a prompt, not model, URLs, settings or quantity", () => {
  assert.deepEqual(Object.keys(IMAGE_TOOL.function.parameters.properties), ["prompt"]);
  assert.equal(imagePrompt({ name: "generate_image", arguments: '{"prompt":" city "}' }), "city");
  for (const args of ['{}', 'null', '[]', '{"prompt":""}', '{"prompt":"hi","n":2}', '{"prompt":"hi","model":"other"}', JSON.stringify({ prompt: "x".repeat(1001) })]) assert.throws(() => imagePrompt({ name: "generate_image", arguments: args }));
  assert.throws(() => imagePrompt({ name: "exec", arguments: '{"prompt":"hi"}' }));
});

test("only canonical Grid raster asset URLs may reach the browser", () => {
  assert.equal(safeImageUrl(asset), asset);
  for (const url of ["https://evil.example/image/job/0.webp", "https://media.aipg.art.evil.example/image/job/0.webp", "http://media.aipg.art/image/job/0.webp", "https://user@media.aipg.art/image/job/0.webp", asset + "?redirect=evil", "https://media.aipg.art/image/job/0.svg", "data:image/png;base64,AA", "https://media.aipg.art/private/key"]) assert.equal(safeImageUrl(url), null);
});

test("fragmented structured calls execute only after a valid terminal frame", async () => {
  const pieces = frame({ choices: [{ delta: { tool_calls: [{ index: 0, function: { name: "generate_", arguments: '{"prompt":' } }] } }] }) + frame({ choices: [{ delta: { tool_calls: [{ index: 0, function: { name: "image", arguments: '"A city"}' } }] } }] });
  const events = [];
  for await (const e of chatEvents(new Response(pieces + frame({ choices: [{ finish_reason: "tool_calls" }] }) + frame("[DONE]")).body, { allowImageTool: true })) events.push(e);
  assert.equal(events.length, 1);
  assert.equal(imagePrompt(events[0].call), "A city");
  for (const stream of [pieces, callStream("exec"), callStream("generate_image", '{"prompt":"city"}', "length"), callStream().replace('"index":0', '"index":1'), frame({ choices: [{ delta: { tool_calls: [{ index: 0 }, { index: 1 }] } }] })]) {
    await assert.rejects(async () => { for await (const e of chatEvents(new Response(stream).body, { allowImageTool: true })) assert.notEqual(e.type, "image_tool"); });
  }
  await assert.rejects(async () => { for await (const e of chatEvents(new Response(callStream()).body)) void e; });
});

test("generated tool-like prose never executes an image", async () => {
  const { handle, calls } = fixture({ stream: frame({ choices: [{ delta: { content: 'generate_image({"prompt":"city"})' } }] }) + frame({ choices: [{ finish_reason: "stop" }] }) + frame("[DONE]") });
  assert.match(await (await handle(request())).text(), /"type":"done"/);
  assert.equal(calls.some(c => c.url.endsWith("/generations")), false);
});

for (const model of IMAGE_MODELS) test(`valid tool calls generate one bounded image using ${model}`, async () => {
  const { handle, calls } = fixture({ model });
  const events = (await (await handle(request())).text()).trim().split("\n").map(JSON.parse);
  assert.deepEqual(events.map(e => e.type), ["meta", "image_start", "image", "done"]);
  assert.equal(events[2].url, asset);
  assert.equal(events[3].stats.worker, "public-worker");
  const imageCalls = calls.filter(c => c.url.endsWith("/generations"));
  assert.equal(imageCalls.length, 1);
  assert.deepEqual(JSON.parse(imageCalls[0].init.body), { model, prompt: "A futuristic city", n: 1, size: "1024x1024", response_format: "url", output_format: "webp" });
  const reservation = calls.find(c => c.init.body && JSON.parse(c.init.body)[1] === IMAGE_RESERVE_LUA);
  assert.ok(reservation);
  const reserve = JSON.parse(reservation.init.body);
  assert.equal(reserve[7], "10000");
  assert.equal(reserve[8], "500000");
  assert.ok(calls.indexOf(reservation) < calls.indexOf(imageCalls[0]));
  const llm = JSON.parse(calls.find(c => c.url.endsWith("/completions")).init.body);
  assert.equal(llm.model, "auto"); assert.equal(llm.tool_choice, "auto"); assert.equal(llm.parallel_tool_calls, false);
});

test("image quota, exhausted shared budget, expired lease and offline model never dispatch", async () => {
  for (const options of [{ reservation: ["quota", 0] }, { reservation: ["budget", 0] }, { reservation: ["expired", 0] }, { models: [] }, { models: [{ name: "Krea 2 Turbo", type: "image", count: 1 }] }]) {
    const { handle, calls } = fixture(options);
    const output = await (await handle(request())).text();
    assert.match(output, /"type":"error"/);
    assert.doesNotMatch(output, /"type":"done"/);
    assert.equal(calls.some(c => c.url.endsWith("/generations")), false);
  }
});

test("failed, unsafe, wrong-model or multiple image results never become success or retry", async () => {
  for (const options of [{ url: "https://evil.example/image/job/0.webp" }, { resultModel: "Krea 2 Turbo" }, { imageResponse: Response.json({ secret: "private" }, { status: 500 }) }, { imageResponse: Response.json({ data: [{ url: asset }, { url: asset }] }) }]) {
    const { handle, calls } = fixture(options);
    const output = await (await handle(request())).text();
    assert.match(output, /"type":"error"/);
    assert.doesNotMatch(output, /"type":"done"|"type":"image"|private|evil.example/);
    assert.equal(calls.filter(c => c.url.endsWith("/generations")).length, 1);
  }
});

test("GET exposes independent image quota without generation", async () => {
  const { handle, calls } = fixture();
  const data = await (await handle(new Request("http://localhost/api/demo/chat"))).json();
  assert.equal(data.remaining, 15);
  assert.deepEqual(data.images, { limit: 2, remaining: 1, model: "z-image-turbo" });
  assert.equal(calls.some(c => c.url.includes("api.aipowergrid")), false);
});

test("cancellation after tool selection never dispatches an image or reports success", async () => {
  const controller = new AbortController();
  const { handle, calls } = fixture({ onModels: () => controller.abort() });
  const output = await (await handle(new Request(request(), { signal: controller.signal }))).text();
  assert.doesNotMatch(output, /"type":"done"|"type":"image"/);
  assert.equal(calls.some(c => c.url.endsWith("/generations")), false);
});
