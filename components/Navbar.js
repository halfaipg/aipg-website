"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null); // null, 'pools', 'exchanges'

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    import("preline");
  }, []);

  const renderMainOptions = () => (
    <>
      <Link
        className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 dark:hover:text-gray-300 text-center sm:text-left"
        href="/"
        aria-current="page"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      <Link
        className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 dark:hover:text-gray-300 text-center sm:text-left"
        href="/about"
        onClick={() => setIsOpen(false)}
      >
        About
      </Link>
      {/* <button onClick={() => setShowDropdown('pools')} className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 border-b-2 border-transparent dark:hover:text-gray-300 text-center sm:text-left">
        Pools
      </button> */}
      <Link
        className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 dark:hover:text-gray-300 text-center sm:text-left"
        href="https://docs.aipowergrid.io"
        target="_blank"
        onClick={() => setIsOpen(false)}
      >
        Docs
      </Link>
      <Link
        className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 dark:hover:text-gray-300 text-center sm:text-left"
        href="https://docs.aipowergrid.io/ai-power-grid-whitepaper"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setIsOpen(false)}
      >
        Whitepaper
      </Link>
      <Link
        className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 dark:hover:text-gray-300 text-center sm:text-left"
        href="https://basescan.org/token/0xa1c0deCaFE3E9Bf06A5F29B7015CD373a9854608"
        target="_blank"
        onClick={() => setIsOpen(false)}
      >
        Explorer
      </Link>
      <Link
        className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 dark:hover:text-gray-300 text-center sm:text-left"
        href="/wallet"
        onClick={() => setIsOpen(false)}
      >
        Wallets
      </Link>
      <Link
        className="font-medium text-orange-400 hover:text-orange-300 sm:py-6 md:py-6 pb-2 dark:hover:text-orange-300 text-center sm:text-left"
        href="/staking"
        onClick={() => setIsOpen(false)}
      >
        Earn
      </Link>
      {/* <button onClick={() => setShowDropdown('exchanges')} className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 border-b-2 border-transparent dark:hover:text-gray-300 text-center sm:text-left">
        Exchanges
      </button> */}
      <Link
        className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 dark:hover:text-gray-300 text-center sm:text-left"
        href="https://docs.aipowergrid.io/tokenomics"
        target="_blank"
        onClick={() => setIsOpen(false)}
      >
        Tokenomics
      </Link>
    </>
  );

  const renderDropdownOptions = (dropdown) => {
    switch (dropdown) {
      // case 'pools':
      //   return (
      //     <>
      //       <Link 
      //         href="https://pool.aipowergrid.io/" 
      //         target="_blank" 
      //         onClick={() => setIsOpen(false)} 
      //         className="block px-4 py-2 text-sm text-white hover:text-gray-200 dark:text:white dark:hover:text-gray-300 text-center sm:text-left"
      //       >
      //         Official
      //       </Link>
      //       <Link 
      //         href="https://miningpoolstats.stream/aipowergrid" 
      //         target="_blank" 
      //         onClick={() => setIsOpen(false)} 
      //         className="block px-4 py-2 text-sm text-white hover:text-gray-200 dark:text:white dark:hover:text-gray-300 text-center sm:text-left"
      //       >
      //         Public
      //       </Link>
      //     </>
      //   );
      // case 'exchanges':
      //   return (
      //     <>
      //       <Link 
      //         href="https://xeggex.com/market/AIPG_USDT" 
      //         target="_blank"
      //         onClick={() => setIsOpen(false)} 
      //         className="block px-4 py-2 text-sm text-white hover:text-gray-200 dark:text:white dark:hover:text-gray-300 text-center sm:text-left"
      //       >
      //         Xeggex
      //       </Link>
      //       <Link 
      //         href="https://www.coinex.com/en/exchange/aipg-usdt" 
      //         target="_blank"
      //         onClick={() => setIsOpen(false)} 
      //         className="block px-4 py-2 text-sm text-white hover:text-gray-200 dark:text:white dark:hover:text-gray-300 text-center sm:text-left"
      //       >
      //         CoinEx
      //       </Link>
      //       <Link 
      //         href="https://tradeogre.com/exchange/AIPG-USDT" 
      //         target="_blank"
      //         onClick={() => setIsOpen(false)} 
      //         className="block px-4 py-2 text-sm text-white hover:text-gray-200 dark:text:white dark:hover:text-gray-300 text-center sm:text-left"
      //       >
      //         TradeOgre
      //       </Link>
      //     </>
      //   );
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full mx-auto text-sm py-1 sm:py-0 md:py-0 backdrop-filter backdrop-blur-lg bg-black bg-opacity-70 rounded-b-lg">
      <nav
        className="relative px-4 sm:flex md:flex sm:items-center md:items-center sm:justify-between md:justify-between sm:px-6 md:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <div className="flex-none text-xl font-semibold text-white" aria-label="Brand">
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
          <Image
            src="/AIPGsimplelogo.png"
            alt="AI Power Grid Logo"
            width={40}
            height={24}
            priority
            style={{ height: 'auto' }}
          />
          <Image
            src="/aipgweblogo.png"
            alt="AI Power Grid"
            width={200}
            height={120}
            priority
            style={{ height: 'auto' }}
          />
        </Link>
          </div>
          <div className="sm:hidden md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="hs-collapse-toggle w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-white hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block flex-shrink-0 hidden w-4 h-4"
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
          className={`hs-collapse ${isOpen ? 'block' : 'hidden'} transition-all duration-150 basis-full grow sm:block md:block`}
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row md:flex-row sm:items-center md:items-center sm:justify-end md:justify-end sm:gap-y-0 md:gap-y-0 sm:gap-x-7 md:gap-x-7 sm:mt-0 md:mt-0 sm:ps-7 md:ps-7">
            {showDropdown ? (
              <>
                <button onClick={() => setShowDropdown(null)} className="font-medium text-white hover:text-gray-200 sm:py-6 md:py-6 pb-2 border-b-2 border-transparent dark:hover:text-gray-300 text-center sm:text-left">&#x2190; Back</button>
                {renderDropdownOptions(showDropdown)}
              </>
            ) : (
              renderMainOptions()
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

