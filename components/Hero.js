"use client";
import { useState } from "react";

const Hero = () => {

  return (
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element-dark.svg')]">
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 pb-10">
        <div className="flex justify-center items-center mb-8">
          <img
            src="/aipg-main.png"
            alt="aipg"
            className="w-48 h-48 md:w-64 md:h-64 object-contain p-2"
          />
        </div>
        <div class="mt-5 max-w-xl text-center mx-auto">
          <h1 class="block font-bold text-gray-800 text-2xl md:text-3xl lg:text-4xl dark:text-gray-200">
            Empowering the architects of tomorrow with the freedom of open source generative AI
          </h1>
        </div>

        <div class="mt-5 max-w-3xl text-center mx-auto">
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Revolutionizing the AI landscape with open access to
            blockchain-validated and incentivized generative AI models, fostering adoption, innovation, creativity, and
            community-driven growth.
          </p>
        </div>

        <div class="mt-12 flex flex-col md:flex-row gap-3 justify-center mb-4">
          <a
            class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800 w-full md:w-auto md:w-64"
            href="/wallet"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ffffff"
              version="1.1"
              viewBox="0 0 512.001 512.001"
              xmlSpace="preserve"
            >
              <path d="M459.102 274.658v-66.057c0-21.692-17.647-39.34-39.34-39.34H263.033a78.684 78.684 0 002.699-20.469c0-6.653-.839-13.112-2.404-19.285 14.402 16.775 35.739 27.433 59.531 27.433 43.268 0 78.47-35.201 78.47-78.470S366.127 0 322.858 0c-43.269 0-78.47 35.201-78.47 78.47a78.37 78.37 0 002.404 19.285c-14.402-16.775-35.739-27.433-59.531-27.433-43.268 0-78.469 35.202-78.469 78.47 0 7.005.923 13.865 2.699 20.469h-51.4c-21.692 0-39.339 17.647-39.339 39.34v264.06c0 21.692 17.647 39.339 39.339 39.339h359.671c21.692 0 39.34-17.647 39.34-39.339v-66.057c18.074-2.112 32.148-17.51 32.148-36.141v-59.662c.001-18.634-14.074-34.032-32.148-36.143z"></path>
              <circle cx="340.154" cy="340.627" r="21.92"></circle>
            </svg>
            Wallets
          </a>
          <a
            class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800 w-full md:w-auto md:w-64"
            href="https://discord.gg/vZ9XrTSRYr"
            target="_blank"
          >
            <svg
              class="flex-shrink-0 w-4.5 h-4.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 a8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
            </svg>
            Discord
          </a>
        </div>
        <div class="mt-4 flex flex-col items-center justify-center">
          <div class="flex flex-col md:flex-row gap-3 items-center justify-center">
            <a
              class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400"
              href="https://pool.aipowergrid.io/"
              target="_blank"
            >
              Official Mining Pool
              <span class="flex items-center gap-x-1">
                <span class="border-s border-gray-200 text-blue-600 ps-2 dark:text-blue-500">
                  Explore
                </span>
                <svg
                  class="flex-shrink-0 w-4 h-4 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
