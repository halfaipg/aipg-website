"use client";
import React from "react";

const LiveDemo = () => {
  return (
    <div style={{backgroundColor: '#1F1F1F'}}>
      <div className="max-w-[85rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight text-white">
            Experience the Grid in Action
          </h2>
          <p className="mt-1 text-gray-300">
            Visit our <a href="/about" className="text-white underline hover:text-gray-200 font-medium">About page</a> to explore our interactive demos and see how AIPG is powering the next generation of AI applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo; 