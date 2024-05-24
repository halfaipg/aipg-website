"use client";
import { useState, useEffect } from "react";

const Hero = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const fullText = "Empowering the architects of tomorrow with the freedom of open source generative AI";

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 1); // Adjust this duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('/squared-bg-element.svg')]">
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 pb-10">
        <div className="flex justify-center items-center mb-8" style={{ paddingTop: '80px' }}>
          <img
            src="/aipg-main.png"
            alt="aipg"
            className="w-48 h-48 md:w-64 md:h-64 object-contain p-2"
          />
        </div>
        <div class={`mt-5 max-w-xl text-center mx-auto ${contentVisible ? 'fade-in' : 'hidden-initially'}`} style={{ minHeight: '8rem' }}>
          <h1 class="block font-bold text-gray-800 text-2xl md:text-3xl lg:text-4xl dark:text-gray-200">
            {fullText}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 mt-5">
            Revolutionizing the AI landscape with open access to
            blockchain-validated and incentivized generative AI models, fostering adoption, innovation, creativity, and
            community-driven growth.
          </p>
        </div>

        <div class={`mt-12 flex flex-col sm:flex-row gap-3 justify-center mb-4 ${contentVisible ? 'fade-in' : 'hidden-initially'}`}>
          <a
            class="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://discord.gg/vZ9XrTSRYr"
            target="_blank"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
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
          <a
            class="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://t.me/aipowergrid"
            target="_blank"
          >
            <img
              src="/telegram.svg"
              alt="Telegram"
              class="flex-shrink-0 w-4 h-4 fill-current text-white"
            />
            Telegram
          </a>
          <a
            class="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://x.com/AIPowerGrid"
            target="_blank"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>
            </svg>
            formerly Twitter
          </a>
        </div>
        <div class={`mt-4 flex flex-col sm:flex-row gap-3 justify-center ${contentVisible ? 'fade-in' : 'hidden-initially'}`}>
          <a
            class="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://www.youtube.com/@AIPowerGrid"
            target="_blank"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.174c-.23-1.626-1.615-2.894-3.225-3.115C18.625 2.666 12 2.666 12 2.666s-6.625 0-8.273.393c-1.61.221-2.995 1.489-3.225 3.115-.23 1.54-.23 4.771-.23 4.771s0 3.231.23 4.771c.23 1.626 1.615 2.894 3.225 3.115 1.648.393 8.273.393 8.273.393s6.625 0 8.273-.393c1.61-.221 2.995-1.489 3.225-3.115.23-1.54.23-4.771.23-4.771s0-3.231-.23-4.771zM9.545 15.454V8.545l6.58 3.455-6.58 3.454z"/>
            </svg>
            YouTube
          </a>
          <a
            class="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://www.instagram.com/aipowergrid"
            target="_blank"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm6.25 2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm-3.25 1a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
            </svg>
            Instagram
          </a>
          <a
            class="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://www.reddit.com/r/AIPowerGrid/"
            target="_blank"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.24 11.24c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2zm-8.48 0c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2zm4.24 2.4c1.32 0 2.4 1.08 2.4 2.4s-1.08 2.4-2.4 2.4-2.4-1.08-2.4-2.4 1.08-2.4 2.4-2.4zm0-1.2c-1.98 0-3.6 1.62-3.6 3.6s1.62 3.6 3.6 3.6 3.6-1.62 3.6-3.6-1.62-3.6-3.6-3.6zm0-2.4c-3.18 0-5.76 2.58-5.76 5.76s2.58 5.76 5.76 5.76 5.76-2.58 5.76-5.76-2.58-5.76-5.76-5.76zm0-1.2c3.84 0 6.96 3.12 6.96 6.96s-3.12 6.96-6.96 6.96-6.96-3.12-6.96-6.96 3.12-6.96 6.96-6.96zm0-2.4C6.72 4.44 4.44 6.72 4.44 9.6v4.8c0 2.88 2.28 5.16 5.16 5.16h4.8c2.88 0 5.16-2.28 5.16-5.16V9.6c0-2.88-2.28-5.16-5.16-5.16h-4.8z"/>
            </svg>
            Reddit
          </a>
        </div>
        <div class={`mt-4 flex flex-col items-center justify-center md:pb-20 ${contentVisible ? 'fade-in' : 'hidden-initially'}`} style={{ paddingBottom: '25px', paddingTop: '50px' }}>
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
