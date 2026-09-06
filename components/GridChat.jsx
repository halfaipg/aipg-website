// SPDX-License-Identifier: AGPL-3.0-or-later
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Script from "next/script";
import Markdown from "react-markdown";
import { GUEST_TURNS, conversationWindow } from "@/lib/demoChatPolicy.mjs";
import { IMAGE_LIMIT, IMAGE_MODELS, safeImageUrl } from "@/lib/demoImagePolicy.mjs";
import { FiArrowUp, FiArrowDown, FiArrowUpRight, FiImage, FiFilm, FiMusic, FiSquare, FiRotateCcw, FiCpu, FiServer } from "react-icons/fi";

function ResponseDetails({ message }) {
  const stats = message.stats || {};
  const number = value => new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
  return (
    <div className="mt-5 text-xs text-gray-400" aria-label="Response details">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex min-w-0 items-center gap-2"><FiServer aria-hidden="true" className="shrink-0" /><span className="sr-only">Served by </span><span className="break-all">{stats.worker || "Worker not reported"}</span></span>
      </div>
      <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
        {[["tokens_per_s", "tok/s", "Grid-reported decode speed, excluding time to first token"], ["gen_time", "s generation", "Grid-reported generation time, including time to first token"], ["ttft", "s first token", "Grid-reported time to first token"], ["output_tokens", "output tokens", "Output token usage returned by Grid; may include reasoning tokens"]].map(([key, label, title]) =>
          typeof stats[key] === "number" ? <div key={key} className="inline-flex gap-1" title={title}><dt className="sr-only">{title}</dt><dd><span className="font-medium tabular-nums text-gray-200">{number(stats[key])}</span> {label}</dd></div> : null)}
      </dl>
    </div>
  );
}

function resizeComposer(node) {
  if (!node) return;
  node.style.height = "auto";
  node.style.height = `${Math.min(node.scrollHeight, 192)}px`;
  node.style.overflowY = node.scrollHeight > 192 ? "auto" : "hidden";
}

export default function GridChat({ preview = null }) {
  const request = preview?.request || fetch;
  const [config, setConfig] = useState(null);
  const [remaining, setRemaining] = useState(GUEST_TURNS);
  const [imageRemaining, setImageRemaining] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [model, setModel] = useState("Auto");
  const [scriptReady, setScriptReady] = useState(Boolean(preview));
  const [verifying, setVerifying] = useState(false);
  const [stageActive, setStageActive] = useState(false);
  const [showLatest, setShowLatest] = useState(false);
  const initialAnchor = useRef(null);
  const widget = useRef(null);
  const widgetId = useRef(null);
  const abort = useRef(null);
  const composer = useRef(null);
  const restoreFocus = useRef(false);
  const transcript = useRef(null);
  const followReply = useRef(true);

  useEffect(() => {
    if (followReply.current && transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [messages]);

  useLayoutEffect(() => {
    if (!stageActive || initialAnchor.current === null) return;
    // Preserve the input position where possible, but never open behind the sticky header.
    const input = composer.current;
    const panel = input.form.getBoundingClientRect();
    const viewport = window.visualViewport;
    const top = Math.max(viewport?.offsetTop || 0, document.querySelector("header")?.getBoundingClientRect().bottom || 0) + 16;
    const bottom = (viewport?.offsetTop || 0) + (viewport?.height || window.innerHeight) - 16;
    const preferred = input.getBoundingClientRect().top - initialAnchor.current;
    const minimum = panel.bottom - bottom;
    const maximum = panel.top - top;
    const delta = minimum <= maximum ? Math.min(maximum, Math.max(minimum, preferred)) : minimum;
    initialAnchor.current = null;
    window.scrollBy({ top: delta, behavior: "instant" });
  }, [stageActive]);

  useEffect(() => { resizeComposer(composer.current); }, [input]);

  useEffect(() => {
    const node = composer.current;
    let width = 0;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width !== width) {
        width = entry.contentRect.width;
        resizeComposer(node);
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!busy && restoreFocus.current) {
      restoreFocus.current = false;
      if (!composer.current?.disabled) composer.current?.focus({ preventScroll: true });
    }
  }, [busy]);

  useEffect(() => {
    const controller = new AbortController();
    request("/api/demo/chat", { cache: "no-store", signal: controller.signal })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error("Unavailable");
        setConfig(data);
        if (Number.isInteger(data.remaining)) setRemaining(data.remaining);
        if (data.images && Number.isInteger(data.images.remaining)) setImageRemaining(data.images.remaining);
        if (!data.available) setError(data.error?.message || "The demo is unavailable. Please open Chat.");
      })
      .catch(err => { if (err.name !== "AbortError") { setConfig({ available: false }); setError("The demo is unavailable right now. Please open Chat."); } });
    return () => { controller.abort(); abort.current?.abort(); };
  }, [request]);

  function verify(signal) {
    if (preview) return preview.verify(signal);
    setVerifying(true);
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (error, value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        signal.removeEventListener("abort", cancel);
        error ? reject(error) : resolve(value);
      };
      const cancel = () => finish(new DOMException("Aborted", "AbortError"));
      const timer = setTimeout(() => finish(new Error("Verification timed out. Please try again.")), 60000);
      signal.addEventListener("abort", cancel, { once: true });
      try {
        widgetId.current = window.turnstile.render(widget.current, {
          sitekey: config.siteKey, action: "homepage_chat", theme: "dark",
          appearance: "interaction-only", execution: "execute", retry: "never", "refresh-expired": "manual",
          size: window.matchMedia("(max-width: 359px)").matches ? "compact" : "flexible",
          callback: value => finish(null, value),
          "expired-callback": () => finish(new Error("Verification expired. Please try again.")),
          "timeout-callback": () => finish(new Error("Verification timed out. Please try again.")),
          "error-callback": () => finish(new Error("Verification could not load. Retry or open Chat.")),
        });
        window.turnstile.execute(widgetId.current);
      } catch { finish(new Error("Verification could not load. Retry or open Chat.")); }
    });
  }

  function removeVerification() {
    if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
    widgetId.current = null;
    setVerifying(false);
  }

  async function send(event) {
    event.preventDefault();
    if (busy || abort.current || !input.trim() || !scriptReady || remaining < 1 || !config?.available) return;
    // Failed/partial answers are visible, but never replayed as completed turns.
    const history = messages.filter(m => !m.failed);
    const outgoing = [...history, { role: "user", content: input.trim() }];
    if (!stageActive) {
      const top = composer.current.getBoundingClientRect().top;
      initialAnchor.current = top >= 0 && top < window.innerHeight ? top : null;
      setStageActive(true);
    }
    setBusy(true); setError(""); setModel("Auto");
    restoreFocus.current = true;
    followReply.current = true;
    setShowLatest(false);
    const controller = new AbortController(); abort.current = controller;
    let completed = false;
    let dispatched = false;
    try {
      const token = await verify(controller.signal);
      controller.signal.throwIfAborted();
      removeVerification();
      dispatched = true;
      setMessages([...outgoing, { role: "assistant", content: "" }]);
      setInput("");
      const response = await request("/api/demo/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationWindow(outgoing), token }), signal: controller.signal });
      if (!response.ok) {
        const data = await response.json();
        if (data.error?.code === "quota") setRemaining(0);
        else if (Number.isInteger(data.remaining)) setRemaining(data.remaining);
        throw new Error(data.error?.message || "The demo is unavailable. Please open Chat.");
      }
      if (!response.body || !response.headers.get("content-type")?.includes("application/x-ndjson")) throw new Error("The response could not be read.");
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let index;
          while ((index = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, index); buffer = buffer.slice(index + 1);
            if (!line.trim()) continue;
            const item = JSON.parse(line);
            if (item.type === "image_quota") setImageRemaining(item.remaining);
            if (item.type === "image_start") {
              if (!IMAGE_MODELS.includes(item.model)) throw new Error("Image model unavailable.");
              setImageRemaining(item.remaining);
              setModel(item.model);
              setMessages(current => current.map((m, i) => i === current.length - 1 ? { ...m, content: "", model: item.model, generatingImage: true } : m));
            }
            if (item.type === "image") {
              const url = safeImageUrl(item.url);
              if (!url || !IMAGE_MODELS.includes(item.model) || typeof item.prompt !== "string" || item.prompt.length > 1000) throw new Error("The image could not be displayed.");
              setMessages(current => current.map((m, i) => i === current.length - 1 ? { ...m, content: `Generated a new image with ${item.model}. Image description: ${item.prompt}`, image: { url, prompt: item.prompt }, model: item.model, generatingImage: false } : m));
            }
            if (item.type === "meta") setRemaining(item.remaining);
            if (item.type === "model") {
              setModel(item.model);
              setMessages(current => current.map((m, i) => i === current.length - 1 ? { ...m, model: item.model } : m));
            }
            if (item.type === "delta") setMessages(current => current.map((m, i) => i === current.length - 1 ? { ...m, content: m.content + item.text } : m));
            if (item.type === "done") {
              completed = true;
              setMessages(current => current.map((m, i) => i === current.length - 1 ? { ...m, completed: true, stats: item.stats } : m));
              if (item.truncated) setError("Reply reached the demo length limit. Continue in Chat for more.");
            }
            if (item.type === "error") throw new Error(item.message);
          }
        }
      } finally { await reader.cancel(); reader.releaseLock(); }
      if (!completed) throw new Error("The response was interrupted. Please try again or open Chat.");
    } catch (err) {
      setError(err.name === "AbortError" ? "Response stopped." : err.message);
      if (dispatched) setMessages(current => current.map((m, i) => i >= current.length - 2 ? { ...m, failed: true } : m));
    } finally {
      removeVerification();
      setBusy(false); abort.current = null;
    }
  }

  return (
    <section id="try-grid" aria-labelledby="chat-title" className="scroll-mt-24 border-b border-white/15 bg-black py-8 sm:py-10">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="chat-title" className="text-xl font-semibold text-white sm:text-2xl">Chat with the Grid</h2>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <a href="https://aipg.art/create" className="inline-flex items-center gap-1.5 hover:text-white"><FiImage aria-hidden="true" /> Images</a>
            <a href="https://aipg.art/create/director" className="inline-flex items-center gap-1.5 hover:text-white"><FiFilm aria-hidden="true" /> Video</a>
            <a href="https://aipg.music" className="inline-flex items-center gap-1.5 hover:text-white"><FiMusic aria-hidden="true" /> Music</a>
          </div>
        </div>
          <form onSubmit={send} className="mt-5 overflow-hidden rounded-[8px] border border-white/20 bg-[#17181b] shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-colors focus-within:border-orange-300/60">
            <div className="relative">
            <div ref={transcript} role="log" aria-label="Chat conversation" aria-live="polite" aria-busy={busy && !verifying} tabIndex={messages.length ? 0 : -1}
              onScroll={event => {
                const node = event.currentTarget;
                followReply.current = node.scrollHeight - node.scrollTop - node.clientHeight < 32;
                setShowLatest(!followReply.current);
              }}
              className={`min-w-0 ${stageActive ? "h-[min(16rem,40svh)] overflow-y-auto overscroll-contain border-b border-white/10 px-4 [overflow-anchor:none] [scrollbar-gutter:stable] focus-visible:outline focus-visible:outline-1 focus-visible:outline-orange-300/60 sm:px-5" : ""}`}>
              {messages.filter(m => m.role === "assistant").slice(-1).map(m => (
                <article key={messages.length} aria-label="Grid response" className="py-4">
                  <div className="mb-3 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="inline-flex shrink-0 items-center gap-2 font-medium text-orange-300"><FiCpu aria-hidden="true" className="h-4 w-4" /> Grid</span>
                    {m.model && <span className="min-w-0 break-all text-gray-500">{m.model}</span>}
                    {busy && !verifying && <span role="status" className="text-gray-400 motion-safe:animate-pulse">{m.generatingImage ? "Generating image..." : m.content ? "Responding" : "Thinking..."}</span>}
                  </div>
                  {m.image ? <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-5">
                    {/* Only validated, Core-returned asset URLs may render as images. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.image.url} alt={m.image.prompt} width={1024} height={1024} referrerPolicy="no-referrer" className="aspect-square max-h-44 w-full max-w-full rounded object-contain" onLoad={() => { if (followReply.current && transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight; }} onError={event => { event.currentTarget.hidden = true; setError("The image could not load. Open the image link to try viewing it."); }} />
                    <div className="min-w-0">
                    <div className="flex flex-wrap gap-3 text-xs text-orange-300">
                      <a href={m.image.url} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1" title="Open or download the generated image">Open image <FiArrowUpRight aria-hidden="true" /></a>
                      <a href="https://aipg.art/create" target="_blank" rel="noopener noreferrer">Image studio</a>
                    </div>
                    {m.completed && !m.failed && <ResponseDetails message={m} />}
                    </div>
                  </div> : m.content ? <div className="grid-chat-answer text-sm leading-6 text-gray-200 [overflow-wrap:anywhere] sm:text-base sm:leading-7">
                    <Markdown skipHtml allowedElements={["p", "strong", "em", "del", "ul", "ol", "li", "blockquote", "pre", "code", "h1", "h2", "h3", "h4", "h5", "h6", "a", "br", "hr"]} components={{ a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer nofollow">{children}</a> }}>{m.content}</Markdown>
                  </div> : !busy && <p className="text-sm leading-7 text-gray-400">No response received.</p>}
                  {!m.image && m.completed && !m.failed && <ResponseDetails message={m} />}
                </article>
              ))}
            </div>
            {showLatest && <button type="button" aria-label="Jump to latest" title="Jump to latest" onClick={() => {
              followReply.current = true;
              transcript.current.scrollTop = transcript.current.scrollHeight;
              setShowLatest(false);
            }} className="absolute bottom-3 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#26272b] text-white shadow-md hover:bg-[#36373b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300"><FiArrowDown aria-hidden="true" /></button>}
            </div>
            <label htmlFor="grid-message" className="sr-only">Your message</label>
              <textarea ref={composer} id="grid-message" rows={1} maxLength={1000} value={input} disabled={busy || !config?.available || remaining === 0}
                onChange={e => setInput(e.target.value)} placeholder={messages.length ? "Ask a follow-up..." : "What are you curious about?"}
                onKeyDown={event => {
                  if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) {
                    event.preventDefault();
                    if (!event.repeat) event.currentTarget.form?.requestSubmit();
                  }
                }}
                className="block max-h-48 min-h-12 w-full min-w-0 resize-none overflow-y-hidden bg-transparent px-4 py-3 text-base leading-6 text-white placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed sm:px-5" />
            <div className="flex min-h-14 items-center justify-between gap-3 px-4 pb-3 sm:px-5">
              <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                <span className="inline-flex min-w-0 items-center gap-2 text-gray-200"><FiCpu aria-hidden="true" className="h-4 w-4 shrink-0 text-orange-300" /><span className="break-all">{verifying ? "Verifying..." : busy ? model : "Auto"}</span></span>
                <span>{config?.available ? `${remaining} / ${config.limit || GUEST_TURNS} free turns left today` : config === null ? "Connecting..." : "Demo not open yet"}</span>
                {imageRemaining !== null && <span>{imageRemaining} / {IMAGE_LIMIT} images left today</span>}
              </div>
              {busy ? <button key="stop" type="button" onClick={event => { event.preventDefault(); abort.current?.abort(); }} aria-label="Stop response" title="Stop response" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300"><FiSquare /></button> :
                <button key="send" type="submit" disabled={!input.trim() || !scriptReady || !config?.available || remaining === 0} aria-label="Send message" title="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-400 text-black transition-colors hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300 disabled:bg-white/10 disabled:text-gray-500"><FiArrowUp className="h-5 w-5" /></button>}
            </div>
            {config?.available && <div ref={widget} aria-label="Message verification" className={verifying ? "px-4 pb-3 sm:px-5" : ""} />}
          </form>
        {config?.available && !preview && <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setScriptReady(true)} onError={() => setError("Verification could not load. Please open Chat.")} />
        </>}
        {error && <p role="status" className={`mt-3 text-xs leading-relaxed ${config?.available ? "text-amber-200" : "text-gray-400"}`}>{error}</p>}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-md text-xs leading-relaxed text-gray-500">Community workers can read your prompts. Don&apos;t share secrets or personal information.</p>
          <div className="flex items-center gap-3">
            {messages.length > 0 && <button type="button" disabled={busy} title="Clear conversation" aria-label="Clear conversation" onClick={() => { setMessages([]); setError(""); setStageActive(false); setShowLatest(false); followReply.current = true; }} className="p-2 text-gray-400 hover:text-white disabled:opacity-40"><FiRotateCcw /></button>}
            <a href="https://aipg.chat" className="inline-flex items-center gap-1.5 py-2 text-sm font-medium text-gray-200 hover:text-orange-300">Continue in Chat <FiArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <noscript><p className="mt-3 text-gray-300">Open <a className="underline" href="https://aipg.chat">AIPG Chat</a> to start a conversation.</p></noscript>
      </div>
    </section>
  );
}
