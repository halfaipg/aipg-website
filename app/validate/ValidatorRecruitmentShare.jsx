"use client";

import { useState } from "react";
import { FiShare2 } from "react-icons/fi";

const SHARE_TEXT =
  "AI Power Grid needs two independently controlled Linux/systemd operators for a 72-hour CPU-only validator preview. No GPU, stake, rewards, routing authority, slashing, or personal/funded wallet key. Start: https://aipowergrid.io/validate";

export default function ValidatorRecruitmentShare() {
  const [status, setStatus] = useState("idle");

  async function shareOpening() {
    setStatus("idle");
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: "AI Power Grid validator opening",
          text: SHARE_TEXT,
        });
        setStatus("shared");
        return;
      }
      if (!navigator.clipboard?.writeText) {
        throw new Error("clipboard unavailable");
      }
      await navigator.clipboard.writeText(SHARE_TEXT);
      setStatus("copied");
    } catch (error) {
      if (error?.name === "AbortError") return;
      setStatus("failed");
    }
  }

  return (
    <div className="flex min-h-12 items-center gap-3">
      <button
        type="button"
        onClick={shareOpening}
        className="inline-flex min-h-12 items-center gap-2 border border-white/20 px-5 text-sm font-bold text-white hover:border-cyan-400 hover:text-cyan-300"
      >
        <FiShare2 aria-hidden="true" /> Share opening
      </button>
      <span
        className={status === "failed" ? "text-xs text-orange-300" : "text-xs text-gray-400"}
        role="status"
        aria-live="polite"
      >
        {status === "shared"
          ? "Opening shared."
          : status === "copied"
            ? "Opening copied."
            : status === "failed"
              ? "Sharing is unavailable in this browser."
              : ""}
      </span>
    </div>
  );
}
