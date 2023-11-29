"use client";

import Link from "next/link";
import React, { useEffect } from "react";

const Wallet = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div>
      <section className="w-full h-96 flex flex-row items-end justify-end sm:justify-start p-4 sm:py-12 sm:px-32 relative">
        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="bg-white p-6 text-black w-full sm:h-full h-auto sm:w-[30%]">
          <h1 className="text-3xl sm:text-4xl  font-extrabold">Wallets</h1>
          <p className="my-4 text-sm font-medium">
            Our ecosystem thrives on open-source collaboration, fostering
            innovation and creativity, while our marketplace and NFT AI Gallery
            enable artists and AI enthusiasts to monetize their work and
            contribute to the rapidly evolving AI landscape.
          </p>
          <Link
            href="/faqs"
            className="my-4 px-6 py-2 sm:py-4 font-semibold flex flex-row space-x-2 border-b-2 border-cyan-300 max-w-[80%] hover:scale-90 duration-300 ease-in-out"
          >
            View our FAQs
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>
      <section className="p-8 md:p-16">
        <div className="text-black dark:text-white text-center py-8 text-3xl font-semibold">
          Our Wallets
        </div>
        <div className="grid grid-col-1 sm:grid-cols-3 gap-8">
          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <img
              class="w-full h-auto rounded-t-xl p-2 dark:bg-white"
              src="/linux-logo.png"
              alt="mac-os"
            />
            <div class="p-4 md:p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                Linux Wallet
              </h3>
              <p class="mt-1 text-gray-500 dark:text-gray-400">
                Download our Linux Wallet
              </p>
              <a
                class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Download
              </a>
            </div>
          </div>
          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <img
              class="w-full h-auto rounded-t-xl p-2 dark:bg-white"
              src="/windows-logo.png"
              alt="Image Description"
            />
            <div class="p-4 md:p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                Windows Wallet
              </h3>
              <p class="mt-1 text-gray-500 dark:text-gray-400">
                Download our Windows wallet
              </p>
              <a
                class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Download
              </a>
            </div>
          </div>
          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <img
              class="w-full h-auto rounded-t-xl p-2 dark:bg-white"
              src="/mac-logo.png"
              alt="mac logo"
            />
            <div class="p-4 md:p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                MacOS Wallet
              </h3>
              <p class="mt-1 text-gray-500 dark:text-gray-400">
                Download our MacOS wallet
              </p>
              <a
                class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
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
