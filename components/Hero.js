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
    <div className="relative overflow-hidden pt-5 before:absolute before:top-[89px] before:start-1/2 before:bg-[url('/squared-bg-element.svg')] before:bg-no-repeat before:bg-center before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-[calc(50%+5px)] dark:before:bg-[url('/squared-bg-element.svg')]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-3 md:pt-6 pb-8">
        <div className="flex justify-center items-center mb-4">
          <img
            src="/AIPGsimplelogo.png"
            alt="aipg"
            className="w-40 h-40 md:w-56 md:h-56 object-contain p-1"
          />
        </div>
        <div className={`mt-5 max-w-4xl text-center mx-auto ${contentVisible ? 'fade-in' : 'hidden-initially'}`} style={{ minHeight: '8rem' }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
            <span className="text-white">A New Kind of</span>
            <br className="sm:hidden" />
            <span className="text-white hidden sm:inline"> </span>
            <span style={{
                    color: '#f8991d',
                    textShadow: '0 0 30px rgba(248, 153, 29, 0.5), 0 0 60px rgba(248, 153, 29, 0.3)',
                    animation: 'glow 2s ease-in-out infinite alternate'
                  }}>
              Power Grid
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-200 mt-5">
            Electricity changed the industrial world—an open AI grid can change the digital one. AIPG transforms idle GPUs into a permissionless, censorship-resistant AI utility that lights up open-source creativity everywhere.
          </p>
        </div>

        <div className={`mt-12 flex flex-wrap justify-center gap-3 mb-4 ${contentVisible ? 'fade-in' : 'hidden-initially'}`}>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 w-[160px]"
            href="https://discord.gg/W9D8j6HCtC"
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
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 w-[160px]"
            href="https://t.me/aipowergrid"
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
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Telegram
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 w-[160px]"
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
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Twitter
          </a>
        </div>
        <div className={`mt-4 flex flex-wrap justify-center gap-3 ${contentVisible ? 'fade-in' : 'hidden-initially'}`}>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 w-[160px]"
            href="https://www.youtube.com/@AIPowerGrid"
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
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 w-[160px]"
            href="https://www.instagram.com/aipowergrid"
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
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="18.5" cy="5.5" r="2" fill="currentColor"/>
            </svg>
            Instagram
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 w-[160px]"
            href="https://www.reddit.com/r/AIPowerGrid/"
            target="_blank"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 90 90"
            >
              <path d="M 45.19 84.802 c -21.821 0 -39.58 -12.617 -39.63 -28.14 c -0.038 -0.584 -0.053 -1.17 -0.046 -1.757 c -0.654 -0.398 -1.28 -0.876 -1.87 -1.427 c -2.223 -2.082 -3.498 -4.902 -3.594 -7.943 c -0.096 -3.045 1 -5.944 3.086 -8.162 c 2.077 -2.217 4.897 -3.493 7.938 -3.589 c 2.517 -0.08 4.933 0.655 6.948 2.09 c 7.07 -4.481 15.131 -7.034 23.485 -7.437 l 4.429 -20.818 c 0.007 -0.054 0.016 -0.107 0.027 -0.156 c 0.228 -1.037 0.847 -1.923 1.742 -2.492 c 0.893 -0.569 1.957 -0.754 2.991 -0.523 L 66.49 7.604 c 1.059 0.212 1.747 1.242 1.535 2.302 c -0.211 1.059 -1.244 1.745 -2.301 1.535 L 49.799 8.259 c -0.004 0.021 -0.008 0.043 -0.012 0.063 l -4.292 20.175 c 8.266 0.582 19.14 3.267 26.48 7.764 c 1.829 -1.32 4.002 -2.075 6.258 -2.154 c 6.28 -0.203 11.576 4.711 11.808 10.976 c 0.07 3.952 -1.928 7.647 -5.176 9.771 c 0.009 0.604 -0.007 1.208 -0.046 1.808 C 84.767 72.184 67.01 84.802 45.19 84.802 z"/>
              <circle cx="29.928" cy="51.63" r="6.475"/>
              <circle cx="59.842" cy="51.63" r="6.475"/>
              <circle cx="72.514" cy="10.648" r="4.235" fill="none" stroke="currentColor" strokeWidth="3.913"/>
              <path d="M 44.004 75.379 c -5.779 0 -11.464 -1.896 -16.12 -5.396 c -0.864 -0.649 -1.037 -1.875 -0.388 -2.739 c 0.65 -0.865 1.875 -1.037 2.739 -0.389 c 4.232 3.181 9.455 4.818 14.712 4.59 c 0.054 -0.002 0.109 -0.002 0.164 0 c 5.261 0.205 10.484 -1.411 14.713 -4.59 c 0.593 -0.445 1.386 -0.519 2.05 -0.186 c 0.663 0.331 1.082 1.009 1.082 1.75 v 0.257 c 0 0.975 -0.715 1.785 -1.649 1.933 c -4.765 3.292 -10.51 4.961 -16.277 4.75 C 44.688 75.372 44.345 75.379 44.004 75.379 z"/>
            </svg>
            Reddit
          </a>
          <a
            className="button-43 inline-flex justify-center items-center gap-x-3 text-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 w-[160px]"
            href="https://github.com/aipowergrid"
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
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
        
        {/* Base Announcement */}
        <div className={`mt-8 flex justify-center ${contentVisible ? 'fade-in' : 'hidden-initially'}`}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-x-2">
            <span className="text-white font-medium text-sm">AI Power Grid is moving to</span>
            <a 
              href="https://www.base.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-x-1 hover:opacity-80 transition-opacity"
            >
              <svg 
                className="w-3 h-3" 
                viewBox="0 0 1280 1280"
                fill="none"
              >
                <path 
                  fill="#1652F0" 
                  d="M0,101.12c0-34.64,0-51.95,6.53-65.28,6.25-12.76,16.56-23.07,29.32-29.32C49.17,0,66.48,0,101.12,0h1077.76c34.63,0,51.96,0,65.28,6.53,12.75,6.25,23.06,16.56,29.32,29.32,6.52,13.32,6.52,30.64,6.52,65.28v1077.76c0,34.63,0,51.96-6.52,65.28-6.26,12.75-16.57,23.06-29.32,29.32-13.32,6.52-30.65,6.52-65.28,6.52H101.12c-34.64,0-51.95,0-65.28-6.52-12.76-6.26-23.07-16.57-29.32-29.32-6.53-13.32-6.53-30.65-6.53-65.28V101.12Z"
                />
              </svg>
              <span className="text-white font-semibold text-sm">base!</span>
            </a>
          </div>
        </div>
        
        {/* Contract Address */}
        <div className={`mt-4 flex justify-center ${contentVisible ? 'fade-in' : 'hidden-initially'}`}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-x-2">
            <svg 
              className="w-3 h-3" 
              viewBox="0 0 1280 1280"
              fill="none"
            >
              <path 
                fill="#1652F0" 
                d="M0,101.12c0-34.64,0-51.95,6.53-65.28,6.25-12.76,16.56-23.07,29.32-29.32C49.17,0,66.48,0,101.12,0h1077.76c34.63,0,51.96,0,65.28,6.53,12.75,6.25,23.06,16.56,29.32,29.32,6.52,13.32,6.52,30.64,6.52,65.28v1077.76c0,34.63,0,51.96-6.52,65.28-6.26,12.75-16.57,23.06-29.32,29.32-13.32,6.52-30.65,6.52-65.28,6.52H101.12c-34.64,0-51.95,0-65.28-6.52-12.76-6.26-23.07-16.57-29.32-29.32-6.53-13.32-6.53-30.65-6.53-65.28V101.12Z"
              />
            </svg>
            <a 
              href="https://basescan.org/address/0xa1c0deCaFE3E9Bf06A5F29B7015CD373a9854608" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white font-medium text-sm hover:opacity-80 transition-opacity"
            >
              0xa1c0deCaFE...54608
            </a>
          </div>
        </div>
      </div>
      <div className="pb-16 md:pb-20 lg:pb-24"></div>
    </div>
  );
};

export default Hero;
