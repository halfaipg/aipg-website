export function recommendWorker({ os, accelerator, vram, ram, disk, workload, textReady, mediaReady }) {
  if (accelerator === "cpu") {
    return {
      title: "Start with the validator preview",
      body: "No GPU is required for validator checks. Running a generation model is a separate workload with its own hardware requirements.",
      secondary: "The validator preview has no rewards or economic authority.",
      href: "/validate",
      action: "Open validator setup",
    };
  }

  if (workload === "audio" || workload === "media") {
    const candidate = ["linux", "windows"].includes(os) && accelerator === "nvidia" &&
      vram >= (workload === "audio" ? 12 : 24) && ram >= 32 && disk >= 49;
    return {
      title: candidate ? "Check a media profile on this machine" : "Check the media requirements first",
      body: workload === "audio"
        ? "The initial ACE-Step profile targets NVIDIA hardware on Linux or Windows with at least 12 GB VRAM, 32 GB RAM, and 49 GB free disk. A local generation test must still pass."
        : "ComfyUI image and video support depends on the exact model, workflow, and dependencies. These hardware entries cannot establish a compatible profile.",
      secondary: mediaReady
        ? "A manager download is available for your selected platform. Only a reviewed profile that passes its local test may serve jobs."
        : "Public media onboarding is still in qualification. Qualification tests do not earn rewards; an existing ComfyUI installation alone does not unlock Grid jobs.",
      href: workload === "audio" ? "/docs/backends/ace-step" : "/docs/backends/comfyui",
      action: workload === "audio" ? "Read the ACE-Step setup guide" : "Read the ComfyUI setup guide",
    };
  }

  return {
    title: textReady ? "Start with the text worker and your existing backend" : `Prepare your backend on ${os === "macos" ? "macOS" : os === "windows" ? "Windows" : "Linux"}`,
    body: "Start Ollama or an OpenAI-compatible local server, load a model that fits your hardware, then select and test it in the worker. VRAM alone cannot determine model fit: quantization and context length also matter.",
    secondary: textReady
      ? "A verified worker download is available for your selected platform. Check current network needs separately; they are not recommendations for what fits your GPU."
      : "A verified download is not available for your selected platform. Check the platform selector for current alternatives; this does not mean releases for other systems are unavailable.",
    href: textReady ? "#worker-downloads" : "/docs/connect-existing-stack",
    action: textReady ? "View worker downloads" : "Prepare a compatible backend",
  };
}
