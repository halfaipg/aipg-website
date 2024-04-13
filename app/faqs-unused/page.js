"use client";

import Link from "next/link";
import React, { useEffect } from "react";

const page = () => {
  const FAQ_Questions = [
    {
      id: 1,
      question: "Q. What is AI Power Grid (AIPG)?",
      answer:
        "A. AIPG is a pioneering blockchain-based platform designed to democratize access to advanced AI technologies, including Large Language Models (LLM) for natural language processing and Stable Diffusion for AI-generated art. It provides free AI services for individuals and developers, validated and secured by the blockchain.",
    },
    {
      id: 2,
      question: "Q. How does AIPG benefit developers and creators?",
      answer:
        "A. AIPG allows developers to deploy and improve their AI models with community feedback rapidly. For creators, especially artists, AIPG offers AI art generation tools and a platform, the NFT AI Gallery, to mint, showcase, and sell their AI-generated artwork as NFTs.",
    },
    {
      id: 3,
      question: "Q. Is it free to use the AI services on AIPG?",
      answer:
        "A. Yes, AIPG provides free access to LLM inference and AI Art generation, enabling users to take advantage of these cutting-edge technologies without any cost.",
    },
    {
      id: 4,
      question: "Q. How does the AIPG NFT AI Gallery work?",
      answer:
        "A. The NFT AI Gallery is a digital space where creators can display their AI-generated art, mint it as NFTs, and put it up for sale or auction within the AIPG marketplace. This allows for direct engagement between artists and collectors within the platform.",
    },
    {
      id: 5,
      question: "Q. What is the AIPG coin and what are its uses?",
      answer:
        "A. The AIPG coin is the native cryptocurrency of the AI Power Grid platform. It can be used for transactions within the platform, such as purchasing AI-generated NFT artwork and accessing premium AI services.",
    },
    {
      id: 6,
      question: "Q. How is blockchain technology utilized in AIPG?",
      answer:
        "A. Blockchain technology is crucial to AIPG for validating and recording AI service interactions, ensuring transparency in AI model deployments, and providing a secure framework for the NFT marketplace.",
    },
    {
      id: 7,
      question: "Q. Can I contribute my AI model to AIPG?",
      answer:
        "A. Yes, AIPG supports and encourages open-source contributions. Developers can submit and deploy their AI models on the platform, where they can be accessed, used, and reviewed by the community.",
    },
    {
      id: 8,
      question:
        "Q. How does AIPG ensure the originality of AI-generated artwork?",
      answer:
        "A. AI-generated artworks are validated and timestamped on the blockchain to ensure originality. Once minted as NFTs, they are assigned unique identifiers that provide proof of authenticity and ownership.",
    },
    {
      id: 9,
      question:
        "Q. Can AIPG's AI services be integrated into existing projects or applications?",
      answer:
        "A. Yes, AIPG provides APIs that allow for seamless integration of its AI services into existing projects or applications, enabling developers to enhance their offerings with powerful AI capabilities.",
    },
    {
      id: 10,
      question: "Q. What type of AI models are available on AIPG?",
      answer:
        "A. AIPG aims to offer a diverse range of AI models, including but not limited to, language understanding, text generation, and AI art generation. Models are constantly updated and expanded based on open-source contributions and community feedback.",
    },
  ];
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <div>
      <section className="w-full h-96 flex flex-row items-end justify-end sm:justify-start p-4 sm:py-12 sm:px-32 relative">
        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="bg-white p-6 text-black w-full sm:h-full h-auto sm:w-[30%]">
          <h1 className="text-3xl sm:text-4xl  font-extrabold">FAQs</h1>
          <p className="my-4 text-sm font-medium">
            Our ecosystem thrives on open-source collaboration, fostering
            innovation and creativity, while our marketplace and NFT AI Gallery
            enable artists and AI enthusiasts to monetize their work and
            contribute to the rapidly evolving AI landscape.
          </p>
          <Link
            href="https://github.com/AIPowerGrid/AI-Power-Grid-Core/releases/tag/v1.1.2"
            className="my-4 px-6 py-2 sm:py-4 font-semibold flex flex-row space-x-2 border-b-2 border-cyan-300 max-w-[80%] hover:scale-90 duration-300 ease-in-out"
          >
            Download our Wallets
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-white dark:bg-transparent">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Your questions, answered
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Have a question not answered? Please{" "}
            <span>
              <Link
                href="#"
                className="py-2 transition duration-150 ease-in-out px-auto hover:underline text-blue-600 hover:text-black"
              >
                {" "}
                contact us
              </Link>{" "}
            </span>
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="hs-accordion-group">
            {FAQ_Questions.map((items) => (
              <div
                className="hs-accordion rounded-xl p-6 dark:bg-white/[.05] active"
                id="hs-basic-with-title-and-arrow-stretched-heading-one"
                key={items.id}
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                >
                  {items.question}
                  <svg
                    className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    {items.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
