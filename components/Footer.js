"use client";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black sm:p-0 p-4">
        <div className="max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-full lg:col-span-1">
              <a
                className="flex-none text-xl font-semibold text-white"
                href="https://www.aipowergrid.io"
                aria-label="Brand"
              >
                <Image
                  src="/aipgweblogo.png"
                  alt="AI Power Grid Logo"
                  width={200}
                  height={120}
                />
              </a>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Products</h4>
              <div className="mt-3 grid space-y-3">
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://aipg.art" target="_blank">
                    AI Art (aipg.art)
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://aipg.chat" target="_blank">
                    AI Chat (aipg.chat)
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://docs.aipowergrid.io/generate" target="_blank">
                    Streaming API
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://dashboard.aipowergrid.io" target="_blank">
                    Dashboard
                  </a>
                </p>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Developers</h4>
              <div className="mt-3 grid space-y-3">
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://docs.aipowergrid.io" target="_blank">
                    Documentation
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://docs.aipowergrid.io/generate" target="_blank">
                    API Reference
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://github.com/AIPowerGrid" target="_blank">
                    GitHub
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://basescan.org/token/0xa1c0deCaFE3E9Bf06A5F29B7015CD373a9854608"
                    target="_blank">
                    Explorer (BaseScan)
                  </a>
                </p>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Community</h4>
              <div className="mt-3 grid space-y-3">
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://discord.gg/W9D8j6HCtC" target="_blank">
                    Discord
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://twitter.com/aipowergrid" target="_blank">
                    Twitter / X
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="/about">
                    About
                  </a>
                </p>
                <p>
                  <a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://docs.aipowergrid.io/whitepaper" target="_blank">
                    Whitepaper
                  </a>
                </p>
              </div>
            </div>

            <div className="col-span-full mt-5 sm:mt-12">
              <p className="text-sm text-gray-400">
                ©AI POWER GRID | ALL RIGHTS RESERVED. {new Date().getFullYear()}
              </p>
            </div>

          </div>
        </div>
    </footer>
  );
};

export default Footer;
