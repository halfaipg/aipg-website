"use client";

import Link from "next/link";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "next-themes";

const TopBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`flex w-full bg-black items-center justify-center dark:bg-gray-50`}
    >
      <div className="sm:w-[80%] flex flex-row px-8 py-[4px] items-center justify-between">
        <div className="flex flex-row text-gray-300 dark:text-black justify-start items-center px-4 text-xs w-full sm:w-1/2 space-x-4">
          <Link
            href="/faqs"
            className="font-semibold hover:text-cyan-300  duration-300"
          >
            FAQs <span className="px-2 text-stone-400 dark:text-black">|</span>
          </Link>
          <Link
            href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/tag/v1.1.2"
            className="font-semibold hover:text-cyan-300 dark:text-black duration-300"
          >
            Wallet
          </Link>
        </div>
        {/* <div className="flex items-center space-x-2">
          <button
            className="bg-gray-50 dark:bg-gray-900 py-2 px-4 rounded"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <BsMoon className="h-4 w-4" />
            ) : (
              <BsSun className="h-4 w-4" />
            )}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;
