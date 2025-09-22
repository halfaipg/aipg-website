"use client";
import { useState, useEffect } from "react";

const Hero = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const fullText = "A New Kind of Power Grid";

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 1); // Adjust this duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden pt-5 before:absolute before:top-16 before:start-1/2 before:bg-[url('/squared-bg-element.svg')] before:bg-no-repeat before:bg-center before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('/squared-bg-element.svg')]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-3 md:pt-6 pb-8">
        <div className="flex justify-center items-center mb-4">
          <img
            src="/aipg-main.png"
            alt="aipg"
            className="w-40 h-40 md:w-56 md:h-56 object-contain p-1"
          />
        </div>
        <div className={`mt-5 max-w-xl text-center mx-auto ${contentVisible ? 'fade-in' : 'hidden-initially'}`} style={{ minHeight: '8rem' }}>
          <h1 className="block font-bold text-gray-800 text-2xl md:text-3xl lg:text-4xl dark:text-white">
            {fullText}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-200 mt-5">
            Electricity changed the industrial world—an open AI grid can change the digital one. AIPG transforms idle GPUs into a permissionless, censorship-resistant AI utility that lights up open-source creativity everywhere.
          </p>
        </div>

        <div className={`mt-12 flex flex-col sm:flex-row gap-3 justify-center mb-4 ${contentVisible ? 'fade-in' : 'hidden-initially'}`}>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://discord.gg/W9D8j6HCtC"
            target="_blank"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 127.14 96.36"
            >
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
            Discord
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://t.me/aipowergrid"
            target="_blank"
          >
            <img
              src="/telegram.svg"
              alt="Telegram"
              className="flex-shrink-0 w-4 h-4 fill-current text-white"
            />
            Telegram
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://x.com/AIPowerGrid"
            target="_blank"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>
            </svg>
            Twitter
          </a>
        </div>
        <div className={`mt-4 flex flex-col sm:flex-row gap-3 justify-center ${contentVisible ? 'fade-in' : 'hidden-initially'}`}>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://www.youtube.com/@AIPowerGrid"
            target="_blank"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.174c-.23-1.626-1.615-2.894-3.225-3.115C18.625 2.666 12 2.666 12 2.666s-6.625 0-8.273.393c-1.61.221-2.995 1.489-3.225 3.115-.23 1.54-.23 4.771-.23 4.771s0 3.231.23 4.771c.23 1.626 1.615 2.894 3.225 3.115 1.648.393 8.273.393 8.273.393s6.625 0 8.273-.393c1.61-.221 2.995-1.489 3.225-3.115.23-1.54.23-4.771.23-4.771s0-3.231-.23-4.771zM9.545 15.454V8.545l6.58 3.455-6.58 3.454z"/>
            </svg>
            YouTube
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://www.instagram.com/aipowergrid"
            target="_blank"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm6.25 2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm-3.25 1a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
            </svg>
            Instagram
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-auto w-1/2"
            href="https://www.reddit.com/r/AIPowerGrid/"
            target="_blank"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.24 11.24c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2zm-8.48 0c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2zm4.24 2.4c1.32 0 2.4 1.08 2.4 2.4s-1.08 2.4-2.4 2.4-2.4-1.08-2.4-2.4 1.08-2.4 2.4-2.4zm0-1.2c-1.98 0-3.6 1.62-3.6 3.6s1.62 3.6 3.6 3.6 3.6-1.62 3.6-3.6-1.62-3.6-3.6-3.6zm0-2.4c-3.18 0-5.76 2.58-5.76 5.76s2.58 5.76 5.76 5.76 5.76-2.58 5.76-5.76-2.58-5.76-5.76-5.76zm0-1.2c3.84 0 6.96 3.12 6.96 6.96s-3.12 6.96-6.96 6.96-6.96-3.12-6.96-6.96 3.12-6.96 6.96-6.96zm0-2.4C6.72 4.44 4.44 6.72 4.44 9.6v4.8c0 2.88 2.28 5.16 5.16 5.16h4.8c2.88 0 5.16-2.28 5.16-5.16V9.6c0-2.88-2.28-5.16-5.16-5.16h-4.8z"/>
            </svg>
            Reddit
          </a>
        </div>
        <div className={`mt-4 flex flex-col items-center justify-center md:pb-10 ${contentVisible ? 'fade-in' : 'hidden-initially'}`} style={{ paddingBottom: '15px', paddingTop: '25px' }}>
          <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
            <a
              className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400"
              href="https://github.com/aipowergrid"
              target="_blank"
            >
              Explore Our Code
              <span className="flex items-center gap-x-1">
                <span className="border-s border-gray-200 text-blue-600 ps-2 dark:text-blue-500">
                  GitHub
                </span>
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
