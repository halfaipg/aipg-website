"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    import("preline");
  }, []);

  return (
    <header class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-1 sm:py-0 dark:bg-gray-900 dark:border-gray-800">
      <nav
        class="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex items-center justify-between">
          <div class="flex-none text-xl font-semibold dark:text-white" aria-label="Brand">
            <Link href="/">
              <a>
                <Image 
                  src="/aipgweblogo.png"
                  alt="AI Power Grid Logo"
                  width={200}
                  height={120}
                />
              </a>
            </Link>
          </div>
          <div class="sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              class="hs-collapse-toggle w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                class="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                class="hs-collapse-open:block flex-shrink-0 hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          class={`hs-collapse ${isOpen ? 'block' : 'hidden'} transition-all duration-300 basis-full grow sm:block`}
        >
          <div class="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
            <Link
              class="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500 pb-2 border-b-2 border-transparent hover:border-white"
              href="https://www.aipowergrid.io"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              class="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500 pb-2 border-b-2 border-transparent hover:border-white"
              href="/about"
            >
              About
            </Link>
            <div className="relative group inline-block">
              <Link href="https://miningpoolstats.stream/aipowergrid" target="_blank">
                <a className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500 pb-2 border-b-2 border-transparent hover:border-white">
                  Pools
                </a>
              </Link>
            </div>
            <Link
              class="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500 pb-2 border-b-2 border-transparent hover:border-white"
              href="/aipg_whitepaperV1.04.pdf"
              download
            >
              White Paper
            </Link>
            <Link
              class="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500 pb-2 border-b-2 border-transparent hover:border-white"
              href="https://explorer.aipowergrid.io/"
              target="_blank"
            >
              Explorer
            </Link>
            <Link
              class="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500 pb-2 border-b-2 border-transparent hover:border-white"
              href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/tag/v1.1.1"
              target="_blank"
            >
              Wallets
            </Link>
            {/* ... rest of your code ... */}
          </div>
        </div>
      </nav>
    </header>
  );
}
