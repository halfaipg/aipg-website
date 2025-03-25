"use client";

import Link from "next/link";
import React from "react";

const Wallet = () => {

  return (
    <div className="pb-40 pt-16">
      <section className="p-8 md:p-16">
        <div className="text-black dark:text-white text-center py-4 text-4xl font-semibold" style={{ display: 'flex', justifyContent: 'center' }}>
          Our Wallets
        </div>
        <p className="text-black dark:text-white text-center py-2 text-lg">
          AIPG wallets are available for Linux, Windows, MacOS, Raspberry Pi, and Web
        </p>
        <div className="grid md:grid-cols-6 grid-cols-1 gap-8">
          <div className="flex flex-col pt-4">
            <a href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.4.0/AI-Power-Grid-1.4.0-x86_64-linux-gnu.tar.gz">
              <img
                className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto"
                src="/wallet-icons/280_Linux-Transparent_324x324.png"
                alt="Linux Wallet"
              />
            </a>
            <div className="p-2 md:p-3 text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Linux Wallet
              </h3>
              <a
                className="mt-2 py-3 px-6 inline-flex justify-center items-center text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.4.0/AI-Power-Grid-1.4.0-x86_64-linux-gnu.tar.gz"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                  <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download
              </a>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <a href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.4.0/AI-Power-Grid-1.4.0-aarch64-linux-gnu.tar.gz">
              <img
                className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto"
                src="/wallet-icons/279_RaspberryPi-Transparent_324x324.png"
                alt="Raspberry Pi Wallet"
              />
            </a>
            <div className="p-2 md:p-3 text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                ARM Wallet
              </h3>
              <a
                className="mt-2 py-3 px-6 inline-flex justify-center items-center text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.4.0/AI-Power-Grid-1.4.0-aarch64-linux-gnu.tar.gz"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                  <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download
              </a>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <a href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.4.0/AI-Power-Grid-1.4.0-win64-setup-unsigned.exe">
              <img
                className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto"
                src="/wallet-icons/278_Windows-Transparent_324x324.png"
                alt="Windows Wallet"
              />
            </a>
            <div className="p-2 md:p-3 text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Windows Wallet
              </h3>
              <a
                className="mt-2 py-3 px-6 inline-flex justify-center items-center text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.4.0/AI-Power-Grid-1.4.0-win64-setup-unsigned.exe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                  <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download
              </a>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <a href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.4.0/AI-Power-Grid-1.4.0-osx-unsigned.tar.gz">
              <img
                className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto"
                src="/wallet-icons/277_Mac-Transparent_324x324.png"
                alt="MacOS Wallet"
              />
            </a>
            <div className="p-2 md:p-3 text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                MacOS Wallet
              </h3>
              <a
                className="mt-2 py-3 px-6 inline-flex justify-center items-center text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/download/v1.4.0/AI-Power-Grid-1.4.0-osx-unsigned.tar.gz"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                  <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download
              </a>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <a href="https://github.com/AIPowerGrid/AIPG-Paper-Wallet" target="_blank" rel="noopener noreferrer">
              <img
                className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto"
                src="/wallet-icons/276_paperwallet_324x324.png"
                alt="Paper Wallet"
              />
            </a>
            <div className="p-2 md:p-3 text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Paper Wallet
              </h3>
              <a
                className="mt-2 py-3 px-6 inline-flex justify-center items-center text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="https://github.com/AIPowerGrid/AIPG-Paper-Wallet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                  <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download
              </a>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <a href="https://webwallet.aipowergrid.io" target="_blank" rel="noopener noreferrer">
              <img
                className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto"
                src="/wallet-icons/281_web_wallet aipg_324x324.png"
                alt="Web Wallet"
              />
            </a>
            <div className="p-2 md:p-3 text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Web Wallet
              </h3>
              <a
                className="mt-2 py-3 px-6 inline-flex justify-center items-center text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="https://webwallet.aipowergrid.io"
                target="_blank" rel="noopener noreferrer"
              >
                <img src="/wallet-icons/globe.svg" className="w-4 h-4 mr-2" alt="Access" />
                Access
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center py-8">
        <a
          className="py-3 px-6 inline-flex justify-center items-center text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/tag/v1.4.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
          <path d="M18.36 9.28c0.48-1.72-0.24-3.6-0.28-3.72-0.12-0.28-0.4-0.52-0.72-0.52-0.080 0-1.92-0.16-3.76 1.24-1.44-0.28-3.080-0.36-3.16-0.36-0.040 0-0.040 0-0.080 0-0.080 0-1.72 0.080-3.16 0.36-1.84-1.4-3.68-1.24-3.76-1.24-0.32 0.040-0.6 0.24-0.72 0.52-0.040 0.080-0.8 2-0.28 3.72-0.92 1.28-1.64 2.96-1 5.96 0.6 2.72 2.84 4.24 5.16 4.76-0.2 0.56-0.28 1.24-0.36 1.96-0.96 0.040-1.56-0.52-2.4-1.4-0.72-0.76-1.52-1.64-2.84-1.92-0.44-0.12-0.88 0.16-1 0.64-0.080 0.48 0.2 0.92 0.68 1 0.76 0.16 1.28 0.72 1.92 1.4 0.84 0.88 1.8 1.96 3.52 1.96 0 0 0.040 0 0.040 0 0 0.92 0.080 1.8 0.12 2.52 0.040 0.48 0.44 0.8 0.92 0.76s0.8-0.44 0.76-0.92c-0.24-2.72-0.040-5.6 0.4-6 0.32-0.2 0.52-0.56 0.4-0.96-0.080-0.36-0.4-0.64-0.8-0.64-0.36 0-4.12-0.2-4.84-3.52-0.6-2.72 0.16-3.92 0.96-4.88 0.2-0.24 0.24-0.6 0.12-0.92-0.32-0.68-0.2-1.64-0.040-2.28 0.56 0.080 1.4 0.32 2.28 1.080 0.2 0.2 0.48 0.24 0.76 0.2 1.24-0.32 2.92-0.4 3.2-0.4 0.24 0 1.96 0.080 3.2 0.4 0.28 0.080 0.56 0 0.76-0.2 0.88-0.76 1.76-1 2.28-1.080 0.16 0.6 0.28 1.56-0.040 2.28-0.12 0.28-0.080 0.64 0.12 0.92 0.8 0.96 1.52 2.16 0.96 4.88-0.72 3.32-4.48 3.52-4.92 3.56-0.4 0-0.72 0.28-0.8 0.64s0.080 0.76 0.4 0.96c0.48 0.4 0.68 3.24 0.44 6-0.040 0.48 0.32 0.88 0.76 0.92 0.040 0 0.040 0 0.080 0 0.44 0 0.8-0.32 0.84-0.76 0.16-1.76 0.28-4.48-0.28-6.2 2.32-0.48 4.56-2.040 5.16-4.76 0.64-3-0.040-4.68-1-5.96z"></path>
          </svg>
          Other Releases
        </a>
      </div>
    </div>
  );
};

export default Wallet;
