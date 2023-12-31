"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const Wallet = () => {
  const [os, setOs] = useState('Unknown OS');

  useEffect(() => {
    const getOperatingSystem = () => {
      const userAgent = window.navigator.userAgent;
      let os = "Unknown OS";
      if (userAgent.indexOf("Win") != -1) os = "Windows";
      if (userAgent.indexOf("Mac") != -1) os = "MacOS";
      if (userAgent.indexOf("X11") != -1) os = "UNIX";
      if (userAgent.indexOf("Linux") != -1) os = "Linux";

      return os;
    };

    setOs(getOperatingSystem());
  }, []);

  return (
    <div class="pb-40">
      <section className="p-8 md:p-16">
        <div className="text-black dark:text-white text-center py-4 text-3xl font-semibold">
          Our Wallets
        </div>
        <p className="text-black dark:text-white text-center py-2 text-base">
          AIPG wallets are available for Linux, Windows, and MacOS
        </p>
        <div className="grid grid-col-1 sm:grid-cols-3 gap-8">
          <div class="flex flex-col pt-4">
            <img
              class="w-48 h-48 rounded-t-xl p-2 mx-auto"
              src="/Linux-Transparent.png"
              alt="mac-os"
            />
            <div class="p-2 md:p-3 text-center">
              <h3 class="text-sm font-bold text-gray-800 dark:text-white">
                Linux Wallet
              </h3>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Download the Linux Wallet
              </p>
              <a
                class={`mt-2 mr-2 py-1 px-1 inline-flex justify-center items-center gap-x-1 text-xs font-semibold rounded-lg border border-transparent ${os === 'Linux' ? 'bg-blue-600' : 'bg-black'} text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.1.2/AI-Power-Grid-Core-1.1.2-aarch64-linux-gnu.tar.gz"
              >
                Arch Linux
              </a>
              <a
                class={`mt-2 mr-2 py-1 px-1 inline-flex justify-center items-center gap-x-1 text-xs font-semibold rounded-lg border border-transparent ${os === 'Linux' ? 'bg-blue-600' : 'bg-black'} text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.1.2/AI-Power-Grid-Core-1.1.2-arm-linux-gnueabihf.tar.gz"
              >
                ARM
              </a>
              <a
                class={`mt-2 py-1 px-1 inline-flex justify-center items-center gap-x-1 text-xs font-semibold rounded-lg border border-transparent ${os === 'Linux' ? 'bg-blue-600' : 'bg-black'} text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.1.2/AI-Power-Grid-Core-1.1.2-x86_64-linux-gnu.tar.gz"
              >
                x86
              </a>
            </div>
          </div>
          <div class="flex flex-col pt-4">
            <img
              class="w-48 h-48 rounded-t-xl p-2 mx-auto"
              src="/Windows-Transparent.png"
              alt="Image Description"
            />
            <div class="p-2 md:p-3 text-center">
              <h3 class="text-sm font-bold text-gray-800 dark:text-white">
                Windows Wallet
              </h3>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Download the Windows wallet
              </p>
              <a
                class={`mt-2 py-1 px-1 inline-flex justify-center items-center gap-x-1 text-xs font-semibold rounded-lg border border-transparent ${os === 'Windows' ? 'bg-blue-600' : 'bg-black'} text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.1.2/AI-Power-Grid-Core-1.1.2-win64.zip"
              >
                Download
              </a>
            </div>
          </div>
          <div class="flex flex-col pt-4">
            <img
              class="w-48 h-48 rounded-t-xl p-2 mx-auto"
              src="/Mac-Transparent.png"
              alt="mac logo"
            />
            <div class="p-2 md:p-3 text-center">
              <h3 class="text-sm font-bold text-gray-800 dark:text-white">
                MacOS Wallet
              </h3>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Download the MacOS wallet
              </p>
              <a
                class={`mt-2 py-1 px-1 inline-flex justify-center items-center gap-x-1 text-xs font-semibold rounded-lg border border-transparent ${os === 'MacOS' ? 'bg-blue-600' : 'bg-black'} text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.1.2/AI-Power-Grid-Core-1.1.2-osx64.tar.gz"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wallet;
