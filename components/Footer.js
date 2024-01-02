"use client";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="flex flex-col">
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
                  src="/aipgweblogo.png" // Path to your image
                  alt="AI Power Grid Logo" // Alt text for your image
                  width={200} // Adjust based on your needs
                  height={120} // Adjust based on your needs
                />
              </a>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Resources</h4>

              <div className="mt-3 grid space-y-3">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://pool.aipowergrid.io/"
                    target="_blank"
                  >
                    Mining Pool
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="/wallet"
                  >
                    Wallets
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://explorer.aipowergrid.io/"
                    target="_blank"
                  >
                    Explorer
                  </a>
                </p>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">AI Power Grid</h4>

              <div className="mt-3 grid space-y-3">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="/about"
                  >
                    About Us
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://www.aipowergrid.io/aipg_whitepaperV1.04.pdf"
                    target="_blank"
                  >
                    White Paper
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                    href="https://discord.gg/vZ9XrTSRYr"
                    target="_blank"
                  >
                    Discord
                  </a>
                </p>
              </div>
            </div>



            <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">
                  ©AI POWER GRID | ALL RIGHTS RESERVED. {new Date().getFullYear()}
                </p>
              </div>
            </div>


          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
