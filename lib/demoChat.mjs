// SPDX-License-Identifier: AGPL-3.0-or-later
// Server-only: imported by the route, never by a client component.
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";

const CORE = "https://api.aipowergrid.io";
const COOKIE = "aipg_demo";
const NO_CACHE = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
export const MAX_BODY = 16000;
export const MAX_OUTPUT = 1024;

export class DemoError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

export function demoConfig(env = process.env) {
  if (env.DEMO_CHAT_ENABLED !== "1") return null;
  const origin = new URL(env.DEMO_CHAT_ORIGIN);
  const redis = new URL(env.DEMO_REDIS_URL);
  const local = ["127.0.0.1", "localhost"].includes(origin.hostname);
  if ((!local && (origin.protocol !== "https:" || env.VERCEL !== "1")) || origin.origin !== env.DEMO_CHAT_ORIGIN ||
      redis.protocol !== "https:" || !redis.hostname.endsWith(".upstash.io") || redis.pathname !== "/" || redis.username || redis.password ||
      !env.DEMO_GRID_KEY || !env.DEMO_REDIS_TOKEN || (env.DEMO_COOKIE_SECRET || "").length < 32 ||
      !env.DEMO_TURNSTILE_SITE_KEY || !env.DEMO_TURNSTILE_SECRET) throw new Error("Invalid demo configuration");
  const perRequest = Number(env.DEMO_REQUEST_MICRO || 10000);
  const daily = Number(env.DEMO_DAILY_MICRO || 500000);
  if (!Number.isSafeInteger(perRequest) || !Number.isSafeInteger(daily) || perRequest < 1 || daily < perRequest || daily > 1000000) {
    throw new Error("Invalid demo budget");
  }
  return { origin: origin.origin, hostname: origin.hostname, local, redis: redis.origin,
    key: env.DEMO_GRID_KEY, redisToken: env.DEMO_REDIS_TOKEN, secret: env.DEMO_COOKIE_SECRET,
    siteKey: env.DEMO_TURNSTILE_SITE_KEY, turnstileSecret: env.DEMO_TURNSTILE_SECRET, perRequest, daily };
}

export async function readBounded(stream, max = MAX_BODY, signal) {
  if (!stream) return "";
  const reader = stream.getReader();
  const parts = []; let size = 0;
  const cancel = () => { reader.cancel().catch(() => {}); };
  signal?.addEventListener("abort", cancel, { once: true });
  try {
    while (true) {
      signal?.throwIfAborted();
      const { done, value } = await reader.read();
      signal?.throwIfAborted();
      if (done) break;
      size += value.byteLength;
      if (size > max) { await reader.cancel(); throw new DemoError(413, "too_large", "That message is too long."); }
      parts.push(value);
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(parts));
  } finally { signal?.removeEventListener("abort", cancel); reader.releaseLock(); }
}

export function validateMessages(body) {
  if (!body || Object.keys(body).some(k => !["messages", "token"].includes(k)) ||
      typeof body.token !== "string" || body.token.length > 2048 || !body.token ||
      !Array.isArray(body.messages) || ![1, 3, 5].includes(body.messages.length)) {
    throw new DemoError(400, "invalid_request", "Please enter a message and complete verification.");
  }
  let bytes = 0;
  const messages = body.messages.map((m, i) => {
    if (!m || Object.keys(m).some(k => !["role", "content"].includes(k)) ||
        m.role !== (i % 2 ? "assistant" : "user") || typeof m.content !== "string" ||
        !m.content.trim() || m.content.length > (i % 2 ? 5000 : 1000)) {
      throw new DemoError(400, "invalid_request", "Keep your question under 1,000 characters.");
    }
    bytes += Buffer.byteLength(m.content);
    return { role: m.role, content: m.content.trim() };
  });
  if (bytes > 12000) throw new DemoError(413, "too_large", "This conversation is too long. Continue in Chat.");
  return messages;
}

function mac(config, text) { return createHmac("sha256", config.secret).update(text).digest("hex"); }

export function guestIdentity(request, config, now = Date.now()) {
  const day = new Date(now).toISOString().slice(0, 10);
  const cookie = request.headers.get("cookie")?.split(";").map(v => v.trim()).find(v => v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  let id = randomUUID();
  if (cookie && /^[\da-f-]{36}\.\d{4}-\d{2}-\d{2}\.[\da-f]{64}$/.test(cookie)) {
    const [oldId, oldDay, signature] = cookie.split(".");
    if (oldDay === day && timingSafeEqual(Buffer.from(signature), Buffer.from(mac(config, `${oldId}.${day}`)))) id = oldId;
  }
  const value = `${id}.${day}`;
  const ttl = Math.max(1, Math.ceil((Date.parse(`${day}T00:00:00Z`) + 86400000 - now) / 1000));
  return { day, id, ttl, cookie: `${COOKIE}=${value}.${mac(config, value)}; HttpOnly; SameSite=Strict; Path=/api/demo/chat; Max-Age=${ttl}${config.local ? "" : "; Secure"}` };
}

export function clientIdentity(request, config) {
  if (config.local) return "loopback";
  // Vercel overwrites this header. Never trust arbitrary X-Forwarded-For chains.
  const ip = request.headers.get("x-vercel-forwarded-for")?.trim();
  if (!ip || !isIP(ip)) throw new DemoError(503, "unavailable", "The demo is unavailable. Please open Chat.");
  // Group IPv6 privacy addresses by /64 so rotating the host bits cannot reset quotas.
  const normalized = isIP(ip) === 6 ? new URL(`http://[${ip}]`).hostname.slice(1, -1) : ip;
  let network = normalized;
  if (isIP(ip) === 6) {
    const [left, right = ""] = normalized.split("::");
    const a = left ? left.split(":") : []; const b = right ? right.split(":") : [];
    network = [...a, ...Array(8 - a.length - b.length).fill("0"), ...b].slice(0, 4).join(":");
  }
  return mac(config, `ip:${network}`);
}

export const RESERVE_LUA = `
local used = tonumber(redis.call('GET', KEYS[1]) or '0')
local ipused = tonumber(redis.call('GET', KEYS[2]) or '0')
if used >= 3 or ipused >= 6 then return {'quota', math.max(0, 3-used)} end
local spent = tonumber(redis.call('GET', KEYS[3]) or '0')
if spent + tonumber(ARGV[1]) > tonumber(ARGV[2]) then return {'budget', 0} end
redis.call('ZREMRANGEBYSCORE', KEYS[4], '-inf', ARGV[3])
if redis.call('ZCARD', KEYS[4]) >= 4 or redis.call('EXISTS', KEYS[5]) == 1 then return {'busy', 3-used} end
redis.call('SET', KEYS[5], ARGV[4], 'EX', 75)
redis.call('ZADD', KEYS[4], tonumber(ARGV[3])+75000, ARGV[4])
redis.call('EXPIRE', KEYS[4], 150)
for i=1,2 do redis.call('INCR', KEYS[i]); redis.call('EXPIRE', KEYS[i], ARGV[5]) end
redis.call('INCRBY', KEYS[3], ARGV[1]); redis.call('EXPIRE', KEYS[3], ARGV[5])
return {'ok', 2-used}
`;
export const RELEASE_LUA = `
redis.call('ZREM', KEYS[1], ARGV[1])
if redis.call('GET', KEYS[2]) == ARGV[1] then redis.call('DEL', KEYS[2]) end
return 1
`;
const ATTEMPT_LUA = `local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],60) end; return n`;

function json(body, status = 200, cookie) {
  return Response.json(body, { status, headers: { ...NO_CACHE, ...(cookie ? { "Set-Cookie": cookie } : {}), ...(status === 429 ? { "Retry-After": "60" } : {}) } });
}

export function createDemoHandler({ env = process.env, fetcher = fetch, now = Date.now } = {}) {
  return async function handle(request) {
    let identity; let config; let lease; let control; let timer; let remaining;
    const command = async args => {
      const response = await fetcher(config.redis, { method: "POST", redirect: "error", cache: "no-store",
        headers: { Authorization: `Bearer ${config.redisToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(args), signal: AbortSignal.timeout(4000) });
      if (!response.ok) throw new Error("Limiter unavailable");
      const data = JSON.parse(await readBounded(response.body));
      if (data.error || data.result === undefined) throw new Error("Limiter unavailable");
      return data.result;
    };
    const release = async () => {
      clearTimeout(timer);
      if (!lease) return;
      const saved = lease; lease = null;
      try { await command(["EVAL", RELEASE_LUA, "2", "demo:{chat}:active", saved.ipKey, saved.id]); }
      catch { console.warn("demo_chat lease_release_failed"); }
    };
    try {
      config = demoConfig(env);
      if (!config) return json({ available: false, error: { code: "unavailable", message: "The homepage demo is not open yet. You can use the full Chat now." } }, request.method === "GET" ? 200 : 503);
      if (new URL(request.url).origin !== config.origin || (request.method !== "GET" && request.headers.get("origin") !== config.origin) ||
          (request.headers.get("sec-fetch-site") && !["same-origin", "none"].includes(request.headers.get("sec-fetch-site")))) {
        throw new DemoError(403, "origin", "Please use the demo on the AI Power Grid website.");
      }
      identity = guestIdentity(request, config, now());
      const ip = clientIdentity(request, config);
      const prefix = `demo:{chat}:${identity.day}`;
      const guestKey = `${prefix}:guest:${identity.id}`;
      const ipKey = `${prefix}:ip:${ip}`;
      if (request.method === "GET") {
        const counts = await command(["MGET", guestKey, ipKey]);
        if (!Array.isArray(counts) || counts.length !== 2 || counts.some(n => n !== null && (!/^\d+$/.test(String(n)) || !Number.isSafeInteger(Number(n))))) throw new Error("Limiter contract changed");
        return json({ available: true, remaining: Math.max(0, Math.min(3 - Number(counts[0] || 0), 6 - Number(counts[1] || 0))), siteKey: config.siteKey }, 200, identity.cookie);
      }
      if (request.method !== "POST") throw new DemoError(405, "method", "Method not allowed.");
      const attempts = await command(["EVAL", ATTEMPT_LUA, "1", `demo:{chat}:attempt:${ip}`]);
      if (!Number.isInteger(attempts)) throw new Error("Limiter contract changed");
      if (attempts > 10) throw new DemoError(429, "rate_limit", "Please wait a minute before trying again.");
      if (!request.headers.get("content-type")?.startsWith("application/json")) throw new DemoError(415, "content_type", "A JSON message is required.");
      control = new AbortController();
      timer = setTimeout(() => control.abort(), 45000);
      const signal = AbortSignal.any([request.signal, control.signal]);
      let body;
      try { body = JSON.parse(await readBounded(request.body, MAX_BODY, signal)); }
      catch (error) { if (error instanceof DemoError) throw error; throw new DemoError(400, "invalid_request", "Please enter a valid message."); }
      const messages = validateMessages(body);
      const verification = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST", redirect: "error", signal, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: config.turnstileSecret, response: body.token }),
      });
      const verified = JSON.parse(await readBounded(verification.body));
      if (!verification.ok || verified.success !== true || verified.hostname !== config.hostname || verified.action !== "homepage_chat") {
        throw new DemoError(403, "verification", "Please complete verification again.");
      }
      // Reserve the FULL per-request exposure, never refund an uncertain upstream outcome.
      const id = randomUUID(); const activeIp = `demo:{chat}:active:${ip}`;
      const reserved = await command(["EVAL", RESERVE_LUA, "5", guestKey, ipKey, `${prefix}:budget`, "demo:{chat}:active", activeIp,
        String(config.perRequest), String(config.daily), String(now()), id, String(identity.ttl + 3600)]);
      if (!Array.isArray(reserved) || reserved.length !== 2 || !["ok", "quota", "busy", "budget"].includes(reserved[0]) || !Number.isInteger(reserved[1]) || reserved[1] < 0 || reserved[1] > 3) throw new Error("Limiter contract changed");
      if (reserved[0] !== "ok") throw new DemoError(429, reserved[0], reserved[0] === "quota" ? "Your free demo allowance is used. Continue in Chat." : reserved[0] === "busy" ? "The demo is busy. Please try again shortly." : "Today's demo allowance is used. Continue in Chat.");
      lease = { ipKey: activeIp, id };
      remaining = reserved[1];
      const headers = { Authorization: `Bearer ${config.key}`, "Content-Type": "application/json" };
      const credits = await fetcher(`${CORE}/v1/account/credits`, { headers, cache: "no-store", redirect: "error", signal });
      const balance = JSON.parse(await readBounded(credits.body));
      // The account summary cannot prove every auto-resolved model is charged
      // in allowlist mode. Refuse it rather than bypassing Core service ceilings.
      if (!credits.ok || balance.charging_enabled !== true || balance.charging_mode !== "on") throw new Error("Sponsored auto charging is not active");
      const upstream = await fetcher(`${CORE}/v1/chat/completions`, {
        method: "POST", headers, redirect: "error", cache: "no-store", signal,
        body: JSON.stringify({ model: "auto", stream: true, max_tokens: MAX_OUTPUT, reasoning_effort: "low", messages: [
          { role: "system", content: "Answer the user's question directly. Keep replies concise, usually under 150 words. You have no tools or browsing. Do not invent current Grid availability, prices, or account details." }, ...messages,
        ] }),
      });
      if (!upstream.ok || !upstream.headers.get("content-type")?.includes("text/event-stream") || !upstream.body) {
        await upstream.body?.cancel(); throw new Error("Grid unavailable");
      }
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const send = value => controller.enqueue(encoder.encode(`${JSON.stringify(value)}\n`));
          try {
            send({ type: "meta", remaining: reserved[1] });
            for await (const event of chatEvents(upstream.body)) send(event);
          } catch {
            if (!signal.aborted) send({ type: "error", message: "The response was interrupted. Continue in Chat or try again." });
          } finally {
            control.abort(); await release();
            try { controller.close(); } catch { /* Client already cancelled. */ }
          }
        },
        async cancel() { control.abort(); await release(); },
      });
      return new Response(stream, { headers: { ...NO_CACHE, "Content-Type": "application/x-ndjson", "Set-Cookie": identity.cookie } });
    } catch (error) {
      control?.abort(); await release();
      if (!(error instanceof DemoError)) console.warn("demo_chat unavailable");
      return json({ remaining, error: { code: error instanceof DemoError ? error.code : "unavailable", message: error instanceof DemoError ? error.message : "The demo is unavailable right now. Please continue in Chat." } }, error instanceof DemoError ? error.status : 503, identity?.cookie);
    }
  };
}

// Forward only answer text and model identity, never raw frames, reasoning, or errors.
export function responseStats(chunk) {
  const grid = chunk.grid || {};
  const stats = {};
  if (typeof grid.worker === "string" && grid.worker.trim() && grid.worker.length <= 96 && !/[\x00-\x1f\x7f]/.test(grid.worker)) stats.worker = grid.worker.trim();
  for (const key of ["gen_time", "ttft", "tokens_per_s"]) {
    const value = grid[key];
    if (typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1000000) stats[key] = value;
  }
  const tokens = chunk.usage?.completion_tokens;
  if (Number.isSafeInteger(tokens) && tokens >= 0 && tokens <= MAX_OUTPUT) stats.output_tokens = tokens;
  return stats;
}

export async function* chatEvents(stream) {
  const reader = stream.getReader(); const decoder = new TextDecoder("utf-8", { fatal: true });
  let buffer = ""; let bytes = 0; let textLength = 0; let finished = false; let reason; let stats = {};
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 256000) throw new Error("Stream too large");
      buffer += decoder.decode(value, { stream: true }).replace(/\r/g, "");
      let index;
      while ((index = buffer.indexOf("\n\n")) >= 0) {
        const frame = buffer.slice(0, index); buffer = buffer.slice(index + 2);
        const data = frame.split("\n").filter(l => l.startsWith("data:")).map(l => l.slice(5).trimStart()).join("\n");
        if (!data) continue;
        if (data === "[DONE]") {
          if (!textLength || !finished) throw new Error("Incomplete response");
          yield { type: "done", truncated: reason === "length", ...(Object.keys(stats).length ? { stats } : {}) }; return;
        }
        const chunk = JSON.parse(data);
        if (chunk.error) throw new Error("Upstream failure");
        stats = { ...stats, ...responseStats(chunk) };
        if (typeof chunk.model === "string" && /^[\w./:-]{1,120}$/.test(chunk.model)) yield { type: "model", model: chunk.model };
        const choice = chunk.choices?.[0];
        if (choice?.finish_reason) { reason = choice.finish_reason; finished = ["stop", "length"].includes(reason); }
        if (typeof choice?.delta?.content === "string") {
          textLength += choice.delta.content.length;
          if (textLength > 5000) throw new Error("Answer too large");
          yield { type: "delta", text: choice.delta.content };
        }
      }
      if (buffer.length > 64000) throw new Error("Frame too large");
    }
    throw new Error("Missing terminal frame");
  } finally { await reader.cancel(); reader.releaseLock(); }
}
