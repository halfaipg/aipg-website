"use client";
import React from "react";

// Declare your Team component
const Team = () => {
  // Component logic and JSX go here
  return (
    <div className="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
        <div className="text-center">
          <img className="rounded-full size-24 mx-auto" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" alt="Image Description" />
          <div className="mt-2 sm:mt-4">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              David Forren
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Founder / CEO
            </p>
          </div>
        </div>
        {/* End Col */}
        {/* Additional cols omitted for brevity */}
      </div>
      {/* End Grid */}

      {/* Card */}
      <div className="mt-12 flex justify-center">
        <div className="border border-gray-200 p-1.5 pl-5 rounded-full dark:border-gray-700">
          <div className="flex items-center gap-x-3">
            <span className="text-sm text-gray-500">Want to work with us?</span>
            <a className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-blue-600 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-blue-500 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
              We are hiring
              <svg className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
        </div>
      </div>
      {/* End Card */}
    </div>
  );
};

export default Team; // Export your Team component
