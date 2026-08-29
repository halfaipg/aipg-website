"use client";
import Script from "next/script";

const prompt = `You are a website assistant for AI Power Grid.

AI Power Grid routes text, image, video, and audio generation to community-run workers. Public contracts, SDKs, worker and validator clients, and protocol specifications can be inspected. Current worker rewards are paid in AIPG according to recorded completed work; multi-asset worker payouts are planned, not live.

Explain that current community inference is not confidential, Core coordination is still centralized, and validator nodes are a non-economic preview. Never claim guaranteed earnings, universal hardware support, or a partnership with another project.`;

const widgetQuery = new URLSearchParams({
  agent: "Loddie",
  corpus: "b083536a-ea9f-47d7-a7b7-47b571595592",
  prompt,
  name: "Loddie",
  avatar: "https://aipowergrid.io/loddie.jpeg",
  theme: "dark",
  position: "bottom-right",
});

const VoiceAgentWidget = () => {
  return (
    <Script 
      src={`https://omnivox.io/widget/embed.js?url=${encodeURIComponent(`https://omnivox.io/?${widgetQuery.toString()}`)}`}
      strategy="afterInteractive"
    />
  );
};

export default VoiceAgentWidget;
