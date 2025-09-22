"use client";
import React from "react";

const LiveDemo = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-[85rem] px-4 pt-6 pb-5 sm:px-6 lg:px-8 lg:pt-10 lg:pb-8 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Experience the Grid in Action
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Visit our <a href="/about" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">About page</a> to explore our interactive demos and see how AIPG is powering the next generation of AI applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo; 