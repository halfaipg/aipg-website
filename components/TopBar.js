"use client";

import Link from "next/link";

const TopBar = () => {
  return (
    <div className={`flex w-full bg-black items-center justify-center`}>
      <div className="w-[80%] flex flex-row px-8 py-[14px] items-center justify-between">
        <div className="flex flex-row text-gray-300 justify-start items-center px-4 text-xs w-full sm:w-1/2 space-x-4">
          <Link
            href="/faqs"
            className="font-semibold hover:text-cyan-300 duration-300"
          >
            FAQs <span className="px-2 text-stone-400">|</span>
          </Link>
          <Link
            href="/contact"
            className="font-semibold hover:text-cyan-300 duration-300"
          >
            Lorem Ipsum
          </Link>
        </div>
        <div className="flex flex-row space-x-2 justify-end items-center">
          <Link
            href="/"
            className="bg-white text-xs px-4 -my-3 py-3 flex flex-row items-center justify-center space-x-2 -py-2 font-semibold hover:bg-blue-400 duration-300"
          >
            Something
            <span className="ml-1"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
