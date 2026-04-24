"use client";
import React, { useState, useEffect } from "react";
import { inView } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./customTimelineStyles.css";

const cardStyle = {
  background: "#1F1F1F",
  color: "#fff",
  boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)",
  fontFamily: "inherit",
  borderRadius: "24px",
  padding: "48px",
};

const arrowStyle = {
  borderRight: "7px solid #1F1F1F",
  filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.3))",
};

const iconStyle = {
  background: "#000000",
  border: "none",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  marginLeft: "-40px",
  marginTop: "-10px",
};

const AIPGIcon = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "50%", backgroundColor: "#000000",
  }}>
    <img src="/AIPGsimplelogo.png" alt="AIPG" style={{ width: '95%', height: 'auto' }} />
  </div>
);

const entries = [
  {
    date: "Dec 2023",
    title: "Fair Launch",
    body: "AI Power Grid launched with no VC, no presale, no pre-mine. Community-first from day one.",
  },
  {
    date: "2024",
    title: "Building the Grid",
    body: "Launched aipg.art for image generation, aipg.chat for LLM conversations, and the first GPU worker network. Public beta shaped by community feedback.",
  },
  {
    date: "Q1–Q2 2025",
    title: "Base L2 Migration",
    body: "Migrated to Base L2 with 150M fixed-supply AIPG token. Deployed StakingVault and core infrastructure contracts. Staking live with no lockup period.",
  },
  {
    date: "Q3–Q4 2025",
    title: "Grid SDK & Dashboard",
    body: "Released the Grid SDK for developers. Dashboard and API explorer went live. On-chain model registry for worker discovery.",
  },
  {
    date: "Q1 2026",
    completed: true,
    title: "Streaming API",
    body: "Real-time token streaming with OpenAI and Anthropic compatibility. Drop-in replacement — same SDKs, same code. Sub-second image generation with FLUX.",
  },
  {
    date: "Q2 2026",
    title: "P2P Mode & Trusted Workers",
    body: "Decentralized job distribution via libp2p gossipsub — no central coordinator required. Trusted worker bonding: stake AIPG for priority jobs and higher earnings.",
  },
  {
    date: "Q3 2026",
    title: "Video & Token Factory",
    body: "AI video generation from text prompts. ARC-20 Token Factory: launch tokens backed by real AI compute. Developer Launchpad with free inference for builders.",
  },
  {
    date: "Q4 2026",
    title: "On-Chain Verification & NFTs",
    body: "Worker registry and job escrow on Base L2. AI art NFTs with full generation parameters on-chain — not just a JPEG, the actual recipe. Dispute resolution via stake slashing.",
  },
  {
    date: "2027",
    title: "Confidential AI",
    body: "Private AI sessions using trusted execution environments. Verifiable, private inference where operators can't see your prompts or outputs.",
  },
];

const Timeline = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="container mx-auto w-full h-full p-8">
      <style jsx>{`
        @media (max-width: 768px) {
          .vertical-timeline::before {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            background: none !important;
          }
        }
      `}</style>
      <VerticalTimeline lineColor={isMobile ? "transparent" : "rgba(66, 66, 66, 0.752)"}>
        {entries.map((entry, i) => (
          <VerticalTimelineElement
            key={i}
            className="vertical-timeline-element--work"
            date={<span style={{ color: "#fff" }}>{entry.date}</span>}
            contentStyle={cardStyle}
            contentArrowStyle={arrowStyle}
            iconStyle={iconStyle}
            icon={<AIPGIcon />}
            visible={inView}
          >
            <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
              {entry.title}
            </h3>
            {entry.completed && (
              <span style={{
                display: "inline-block",
                marginTop: "8px",
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
                background: "rgba(52, 211, 153, 0.15)",
                color: "#34d399",
                border: "1px solid rgba(52, 211, 153, 0.3)",
              }}>
                ✓ Live Now
              </span>
            )}
            <p style={{ color: "#d3d3d3" }}>{entry.body}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
