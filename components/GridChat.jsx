// SPDX-License-Identifier: AGPL-3.0-or-later
"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Markdown from "react-markdown";
import { FiArrowUp, FiArrowUpRight, FiImage, FiFilm, FiMusic, FiSquare, FiRotateCcw, FiCpu, FiServer } from "react-icons/fi";

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

export default function GridChat() {
  const [config, setConfig] = useState(null);
  const [remaining, setRemaining] = useState(3);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [model, setModel] = useState("Auto");
  const [token, setToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
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
    fetch("/api/demo/chat", { cache: "no-store", signal: controller.signal })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error("Unavailable");
        setConfig(data);
        if (Number.isInteger(data.remaining)) setRemaining(data.remaining);
        if (!data.available) setError(data.error?.message || "The demo is unavailable. Please open Chat.");
      })
      .catch(err => { if (err.name !== "AbortError") { setConfig({ available: false }); setError("The demo is unavailable right now. Please open Chat."); } });
    return () => { controller.abort(); abort.current?.abort(); };
  }, []);

  useEffect(() => {
    if (!config?.available || !scriptReady || !widget.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: config.siteKey, action: "homepage_chat", theme: "dark",
      size: window.matchMedia("(max-width: 359px)").matches ? "compact" : "flexible",
      callback: value => setToken(value),
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setError("Verification could not load. Retry or open Chat."); },
    });
    return () => { window.turnstile?.remove(widgetId.current); widgetId.current = null; };
  }, [config, scriptReady]);

  async function send(event) {
    event.preventDefault();
    if (busy || abort.current || !input.trim() || !token || remaining < 1 || !config?.available) return;
    // Failed/partial answers are visible, but never replayed as completed turns.
    const history = messages.filter(m => !m.failed);
    const outgoing = [...history, { role: "user", content: input.trim() }];
    setMessages([...outgoing, { role: "assistant", content: "" }]);
    setInput(""); setBusy(true); setError(""); setModel("Auto");
    restoreFocus.current = true;
    followReply.current = true;
    const controller = new AbortController(); abort.current = controller;
    let completed = false;
    try {
      const response = await fetch("/api/demo/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: outgoing.map(({ role, content }) => ({ role, content })), token }), signal: controller.signal });
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
      setMessages(current => current.map((m, i) => i >= current.length - 2 ? { ...m, failed: true } : m));
    } finally {
      setBusy(false); setToken(""); abort.current = null;
      if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
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
                <span className="inline-flex min-w-0 items-center gap-2 text-gray-200"><FiCpu aria-hidden="true" className="h-4 w-4 shrink-0 text-orange-300" /><span className="break-all">{busy ? model : "Auto"}</span></span>
                <span>{config?.available ? `${remaining} / 3 free turns left today` : config === null ? "Connecting..." : "Demo not open yet"}</span>
              </div>
              {busy ? <button type="button" onClick={() => abort.current?.abort()} aria-label="Stop response" title="Stop response" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300"><FiSquare /></button> :
                <button type="submit" disabled={!input.trim() || !token || !config?.available || remaining === 0} aria-label="Send message" title="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-400 text-black transition-colors hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300 disabled:bg-white/10 disabled:text-gray-500"><FiArrowUp className="h-5 w-5" /></button>}
            </div>
          </form>
        {config?.available && <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setScriptReady(true)} onError={() => setError("Verification could not load. Please open Chat.")} />
          <div ref={widget} className="mt-3 min-h-[65px] min-w-0" />
        </>}
        {error && <p role="status" className={`mt-3 text-xs leading-relaxed ${config?.available ? "text-amber-200" : "text-gray-400"}`}>{error}</p>}
        <div ref={transcript} role="log" aria-label="Chat conversation" aria-live="polite" aria-busy={busy} tabIndex={messages.length ? 0 : -1}
          onScroll={event => {
            const node = event.currentTarget;
            followReply.current = node.scrollHeight - node.scrollTop - node.clientHeight < 64;
          }}
          className={messages.length ? "mt-4 h-[min(28rem,55svh)] min-h-64 overflow-y-auto overscroll-contain border-y border-white/10 pr-3 [scrollbar-gutter:stable] focus-visible:outline focus-visible:outline-1 focus-visible:outline-orange-300/60 sm:pr-5" : ""}>
          {messages.map((m, i) => (
            <article key={i} aria-label={m.role === "user" ? "Your message" : "Grid response"} className={m.role === "user" ? "border-t border-white/10 pb-5 pt-5 first:border-t-0" : "pb-7"}>
              {m.role === "user" ? <>
                <p className="mb-2 text-xs text-gray-500">You</p>
                <p className="whitespace-pre-wrap text-base font-medium leading-7 text-gray-200 [overflow-wrap:anywhere] sm:text-lg">{m.content}</p>
              </> : <>
                <div className="mb-4 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="inline-flex shrink-0 items-center gap-2 font-medium text-orange-300"><FiCpu aria-hidden="true" className="h-4 w-4" /> Grid</span>
                  {m.model && <span className="min-w-0 break-all text-gray-500">{m.model}</span>}
                  {busy && i === messages.length - 1 && <span className="text-gray-400 motion-safe:animate-pulse">{m.content ? "Responding" : "Thinking"}</span>}
                </div>
                {m.content ? <div className="grid-chat-answer text-base leading-7 text-gray-200 [overflow-wrap:anywhere] sm:leading-8">
                  <Markdown skipHtml allowedElements={["p", "strong", "em", "del", "ul", "ol", "li", "blockquote", "pre", "code", "h1", "h2", "h3", "h4", "h5", "h6", "a", "br", "hr"]} components={{ a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer nofollow">{children}</a> }}>{m.content}</Markdown>
                </div> : <p className="text-sm leading-7 text-gray-400">{busy ? "Connecting to a Grid worker..." : "No response received."}</p>}
              </>}
              {m.completed && !m.failed && <ResponseDetails message={m} />}
            </article>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-md text-xs leading-relaxed text-gray-500">Community workers can read your prompts. Don&apos;t share secrets or personal information.</p>
          <div className="flex items-center gap-3">
            {messages.length > 0 && <button type="button" disabled={busy} title="Clear conversation" aria-label="Clear conversation" onClick={() => { setMessages([]); setError(""); }} className="p-2 text-gray-400 hover:text-white disabled:opacity-40"><FiRotateCcw /></button>}
            <a href="https://aipg.chat" className="inline-flex items-center gap-1.5 py-2 text-sm font-medium text-gray-200 hover:text-orange-300">Continue in Chat <FiArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <noscript><p className="mt-3 text-gray-300">Open <a className="underline" href="https://aipg.chat">AIPG Chat</a> to start a conversation.</p></noscript>
      </div>
    </section>
  );
}
