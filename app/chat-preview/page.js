// SPDX-License-Identifier: AGPL-3.0-or-later
import { notFound } from "next/navigation";
import GridChatPreview from "@/components/GridChatPreview";

export default function ChatPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <main className="bg-black pt-28">
    <p className="mx-auto max-w-4xl px-5 text-sm text-amber-200 sm:px-8">Local layout preview. Simulated replies only; no credits spent.</p>
    <GridChatPreview />
    <div className="h-screen" aria-hidden="true" />
  </main>;
}
