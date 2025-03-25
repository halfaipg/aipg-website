"use client";
import React from "react";

const Features = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
            Democratizing AI Through Open Source
            </h2>
            <p className="mt-3 text-gray-800 dark:text-gray-400">
            AI Power Grid (AIPG) is driven by the belief that generative AI should be accessible to all developers, not just large corporations with massive resources. Our community-driven approach focuses on building transparent, ethical, and freely available AI models that respect user privacy and freedom. By combining the power of open source development with distributed computing, we're creating a future where developers can build, deploy, and improve AI systems without reliance on proprietary black-box solutions.
            </p>
            <p className="mt-3 text-gray-800 dark:text-gray-400">
            We stand firm against the monopolization of AI by tech giants. As powerful models become increasingly centralized, we're building an alternative ecosystem where knowledge isn't siloed but shared. Join our movement of passionate developers working to ensure that the transformative power of generative AI remains in the hands of the many, not the few. Together, we're not just building tools—we're championing a vision where AI advancement benefits humanity through openness, transparency, and collective wisdom.
            </p>
          </div>

          <div className="space-y-6 lg:space-y-10">
            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  className="flex-shrink-0 w-5 h-5"
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Open Source Ethos
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                We believe in the power of transparency and community collaboration. All our core technologies are open source, allowing developers to inspect, modify, and enhance our AI models. This approach fosters trust, accelerates innovation, and ensures that our technology evolves based on real developer needs rather than corporate interests.
                </p>
              </div>
            </div>

            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  className="flex-shrink-0 w-5 h-5"
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
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Developer-First Community
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                Our community consists of passionate developers, researchers, and AI enthusiasts committed to democratizing generative AI. We provide comprehensive documentation, development tools, and support channels to ensure that developers of all skill levels can contribute to and benefit from our ecosystem. Your voice matters in shaping the future of open source AI.
                </p>
              </div>
            </div>

            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  className="flex-shrink-0 w-5 h-5"
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
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Ethical AI Development
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                We're committed to developing AI technologies that are not only powerful but also ethical and responsible. Our transparent development process enables ongoing discussions about data privacy, bias mitigation, and responsible AI deployment. By joining AIPG, you become part of a movement that values the ethical implications of AI as much as its technical capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;