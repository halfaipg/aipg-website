// SPDX-License-Identifier: AGPL-3.0-or-later
"use client";

import { useMemo } from "react";
import GridChat from "./GridChat";

export default function GridChatPreview() {
  const preview = useMemo(() => {
    let remaining = 15;
    return {
      verify: async signal => { signal.throwIfAborted(); return "local-layout-fixture"; },
      request: async (_url, options) => {
        if (options.method !== "POST") return Response.json({ available: true, remaining, limit: 15 });
        const { messages } = JSON.parse(options.body);
        remaining--;
        const first = messages[0].content;
        const reply = `This is a **simulated streaming reply**, not live inference.\n\nYour first message in the outgoing context was: ${first}\n\n` +
          Array.from({ length: 10 }, (_, i) => `**Pass ${i + 1}**\n\nA small idea becomes a working prototype through steady iteration. Start with a clear question, explore a few possibilities, then try the strongest one. Keep what works and refine the rest.\n\n`).join("");
        const chunks = reply.match(/.{1,35}|\n/g) || [];
        const encoder = new TextEncoder();
        let timer;
        let cleanup = () => {};
        const stream = new ReadableStream({
          start(controller) {
            const emit = data => controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
            const stop = () => { cleanup(); controller.error(new DOMException("Aborted", "AbortError")); };
            cleanup = () => { clearInterval(timer); options.signal.removeEventListener("abort", stop); };
            options.signal.addEventListener("abort", stop, { once: true });
            emit({ type: "meta", remaining });
            emit({ type: "model", model: "Simulated reply" });
            timer = setInterval(() => {
              const text = chunks.shift();
              if (text !== undefined) emit({ type: "delta", text });
              else { cleanup(); emit({ type: "done" }); controller.close(); }
            }, 90);
          },
          cancel() { cleanup(); },
        });
        return new Response(stream, { headers: { "content-type": "application/x-ndjson" } });
      },
    };
  }, []);
  return <GridChat preview={preview} />;
}
