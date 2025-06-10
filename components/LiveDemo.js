"use client";
import React, { useState } from "react";
import Modal from "./Modal";

const LiveDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArtModalOpen, setIsArtModalOpen] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Experience the Grid in Action
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Test our distributed worker network with powerful, developer-friendly frontends that showcase the full capabilities of the AIPG ecosystem.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Chat Interface */}
          <div>
            <div 
              className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/chat-ss.png" 
                alt="Chat Interface Screenshot" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="text-center mb-4">
              <a
                href="https://chat.aipowergrid.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 bg-blue-600 text-white text-sm font-medium rounded-full px-6 py-3 hover:bg-blue-700 transition-colors"
              >
                Try Chat Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Four Versatile Modes:</strong> Story Mode for creative fiction, Adventure Mode for interactive fiction, Chat Mode for AI personas, and Instruct Mode for ChatGPT-style responses.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Full Features:</strong> Model selection, worker management, export/share stories, text-to-speech, memory support, and advanced sampling configurations.
              </p>
            </div>
          </div>

          {/* Art Gallery */}
          <div>
            <div 
              className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsArtModalOpen(true)}
            >
              <img 
                src="/art-ss.png" 
                alt="Art Gallery Screenshot" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="text-center mb-4">
              <a
                href="https://aipg.art"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 bg-purple-600 text-white text-sm font-medium rounded-full px-6 py-3 hover:bg-purple-700 transition-colors"
              >
                Try Art Generator
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Advanced Features:</strong> Text2img, img2img, and inpainting capabilities powered by Grid workers running Stable Diffusion models.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Coming Soon:</strong> NFT minting with deterministic metadata—mint the actual AI generation parameters instead of just links to images!
              </p>
            </div>
          </div>
        </div>

        {/* Discord Integration */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 lg:p-8">
          <div className="flex flex-col items-center text-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 a8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Discord Grid Bots
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Experience AIPG workers directly in our community Discord
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl mb-2">🖼️</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Image Gen Bot</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Generate images directly in Discord</p>
              <a
                href="https://github.com/AIPowerGrid/grid-discord-image-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </a>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl mb-2">📰</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">AI News Bot</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Latest AI developments and updates</p>
              <a
                href="https://github.com/AIPowerGrid/grid-discord-news-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </a>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">AI Knowledge Bot</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Answer questions about AI and tech</p>
              <a
                href="https://github.com/AIPowerGrid/grid-discord-rag-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <a
              href="https://discord.gg/W9D8j6HCtC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 bg-indigo-600 text-white text-sm font-medium rounded-full px-6 py-3 hover:bg-indigo-700 transition-colors"
            >
              Join Discord Community
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img 
          src="/chat-ss.png" 
          alt="Chat Interface Screenshot Full Resolution" 
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
      </Modal>

      {/* Art Gallery Modal */}
      <Modal isOpen={isArtModalOpen} onClose={() => setIsArtModalOpen(false)}>
        <img 
          src="/art-ss.png" 
          alt="Art Gallery Screenshot Full Resolution" 
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
      </Modal>
    </div>
  );
};

export default LiveDemo; 