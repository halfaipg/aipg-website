// SPDX-License-Identifier: AGPL-3.0-or-later

export const socialPages = {
  home: {
    path: "/",
    title: "AI Power Grid - Community-Powered AI Generation",
    description: "Transform supported GPUs into a community-powered generation layer for text, images, video, audio, agents, and workflows. GPU owners earn rewards for recorded work.",
    image: "home-v1.png", width: 1734, height: 907,
    alt: "AI Power Grid. Create beyond closed platforms. Text, image, video and music.",
  },
  run: {
    path: "/run",
    title: "Run an AI Power Grid Worker",
    description: "Connect your inference endpoint or ComfyUI setup to AI Power Grid. Download a worker for your OS and earn AIPG for accepted jobs.",
    image: "run-v1.png", width: 1730, height: 909,
    alt: "Run a worker. Earn AIPG. Your models, your machine, your schedule. Rewards depend on accepted work.",
  },
  validate: {
    path: "/validate",
    title: "Run an AI Power Grid Validator",
    description: "Install the verified unsigned CPU-only validator preview, create a dedicated local signing identity, and contribute independent worker evidence.",
    image: "validate-v1.png", width: 1734, height: 907,
    alt: "Run a validator. Help check the Grid. No GPU required. Evidence-only preview, no rewards or staking.",
  },
};

export function socialMetadata(key) {
  const { path, title, description, image, width, height, alt } = socialPages[key];
  const url = new URL(path, "https://aipowergrid.io").href;
  const imageUrl = `https://aipowergrid.io/social/${image}`;
  return {
    title,
    description,
    openGraph: {
      title, description, url, siteName: "AI Power Grid", locale: "en_US", type: "website",
      images: [{ url: imageUrl, width, height, alt, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image", title, description, creator: "@AIPowerGrid",
      images: [{ url: imageUrl, alt }],
    },
  };
}
