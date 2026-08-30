import assert from "node:assert/strict";
import test from "node:test";

import { detectOperatorPlatform } from "../../app/run/platformDetection.mjs";

test("keeps the download and planner on Windows together", () => {
  assert.deepEqual(
    detectOperatorPlatform({
      userAgentDataPlatform: "Windows",
      platform: "Win32",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    }),
    { os: "windows", downloadPlatform: "windows" },
  );
});

test("keeps the download and planner on macOS together", () => {
  assert.deepEqual(
    detectOperatorPlatform({
      userAgentDataPlatform: "macOS",
      platform: "MacIntel",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    }),
    { os: "macos", downloadPlatform: "macos" },
  );
});

test("maps Linux ARM64 to the ARM download and Linux planner", () => {
  assert.deepEqual(
    detectOperatorPlatform({
      platform: "Linux aarch64",
      userAgent: "Mozilla/5.0 (X11; Linux aarch64)",
    }),
    { os: "linux", downloadPlatform: "linuxArm64" },
  );
});

test("defaults unknown clients to Linux x64 without inventing hardware", () => {
  assert.deepEqual(detectOperatorPlatform(), {
    os: "linux",
    downloadPlatform: "linux",
  });
});
