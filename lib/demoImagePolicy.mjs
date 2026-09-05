// SPDX-License-Identifier: AGPL-3.0-or-later
export const IMAGE_MODELS = ["z-image-turbo", "FLUX.2 Klein 4B FP8"];
export const IMAGE_LIMIT = 2;
export const IMAGE_IP_LIMIT = 4;

export function safeImageUrl(value) {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const url = new URL(value);
    if (url.origin !== "https://media.aipg.art" || url.username || url.password || url.search || url.hash ||
        !/^\/image\/[a-zA-Z0-9_-]+\/\d+\.(webp|png|jpg|jpeg)$/.test(url.pathname)) return null;
    return url.href;
  } catch { return null; }
}

export const IMAGE_TOOL = {
  type: "function",
  function: {
    name: "generate_image",
    description: "Generate one new image only when the user explicitly asks you to create an image. Not for questions about images or requests to describe or write prompts. Use the conversation to write a self-contained visual prompt. This creates a NEW image; it cannot see or edit a previous image. Do not claim otherwise.",
    parameters: { type: "object", properties: { prompt: { type: "string", minLength: 1, maxLength: 1000 } }, required: ["prompt"], additionalProperties: false },
  },
};

export function imagePrompt(call) {
  if (call?.name !== "generate_image" || typeof call.arguments !== "string" || call.arguments.length > 8192) throw new Error("Invalid image tool");
  const args = JSON.parse(call.arguments);
  if (!args || Array.isArray(args) || Object.keys(args).length !== 1 || typeof args.prompt !== "string" ||
      !args.prompt.trim() || args.prompt.length > 1000 || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(args.prompt)) throw new Error("Invalid image prompt");
  return args.prompt.trim();
}

// An image is a second paid operation. Reserve another full exposure under the
// SAME shared daily ceiling before dispatch; never refund an uncertain result.
export const IMAGE_RESERVE_LUA = `
if redis.call('GET', KEYS[4]) ~= ARGV[4] then return {'expired', 0} end
local used = tonumber(redis.call('GET', KEYS[1]) or '0')
local ipused = tonumber(redis.call('GET', KEYS[2]) or '0')
if used >= ${IMAGE_LIMIT} or ipused >= ${IMAGE_IP_LIMIT} then return {'quota', 0} end
local spent = tonumber(redis.call('GET', KEYS[3]) or '0')
if spent + tonumber(ARGV[1]) > tonumber(ARGV[2]) then return {'budget', 0} end
for i=1,2 do redis.call('INCR', KEYS[i]); redis.call('EXPIRE', KEYS[i], ARGV[3]) end
redis.call('INCRBY', KEYS[3], ARGV[1]); redis.call('EXPIRE', KEYS[3], ARGV[3])
return {'ok', math.min(${IMAGE_LIMIT - 1}-used, ${IMAGE_IP_LIMIT - 1}-ipused)}
`;
