export function detectOperatorPlatform({
  userAgentDataPlatform = "",
  platform = "",
  userAgent = "",
} = {}) {
  const platformHint = `${userAgentDataPlatform} ${platform}`.trim();

  if (/^win/i.test(platformHint) || /windows/i.test(userAgent)) {
    return { os: "windows", downloadPlatform: "windows" };
  }
  if (/mac/i.test(platformHint) || /macintosh/i.test(userAgent)) {
    return { os: "macos", downloadPlatform: "macos" };
  }
  if (/aarch64|arm64/i.test(platformHint) || /aarch64|arm64/i.test(userAgent)) {
    return { os: "linux", downloadPlatform: "linuxArm64" };
  }
  return { os: "linux", downloadPlatform: "linux" };
}
