"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className={`flex w-full bg-black items-center justify-center`}>
      <div className="sm:w-[80%] flex flex-row px-8 py-[14px] items-center justify-between">
        <div className="flex flex-row text-gray-300 justify-start items-center px-4 text-xs w-full sm:w-1/2 space-x-4">
          <Link
            href="/faqs"
            className="font-semibold hover:text-cyan-300 duration-300"
          >
            Lorem <span className="px-2 text-stone-400">|</span>
          </Link>
          <Link
            href="/contact"
            className="font-semibold hover:text-cyan-300 duration-300"
          >
            Ipsum
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode" className="text-white">
            Dark Mode
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
