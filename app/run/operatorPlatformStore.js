"use client";

import { useSyncExternalStore } from "react";
import { detectOperatorPlatform } from "./platformDetection.mjs";

const SERVER_SNAPSHOT = "linux:linux";
const subscribe = () => () => {};
const getServerSnapshot = () => SERVER_SNAPSHOT;
const getClientSnapshot = () => {
  const detected = detectOperatorPlatform({
    userAgentDataPlatform: navigator.userAgentData?.platform,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
  });
  return `${detected.os}:${detected.downloadPlatform}`;
};

export function useDetectedOperatorPlatform() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [os, downloadPlatform] = snapshot.split(":");
  return { os, downloadPlatform };
}

export function useOperatorPlatformHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
