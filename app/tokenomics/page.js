"use client";

import React, { useState } from 'react';

const Page = () => {
  const totalPages = 6; // Total number of tokenomics explanation images
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const tokenomicsImages = Array.from({ length: totalPages }, (_, i) => 
    `/tokenomics-images/Tokenomics_WP_Version-${i + 1}.png`
  );

  return (
    <div>
      {/* Video Banner Section */}
      <section className="w-full sm:h-96 h-22 flex flex-row items-end justify-end sm:justify-start relative pb-6 sm:pb-0">
        <picture className="absolute top-0 left-1/2 -translate-x-1/2 w-full -z-10">
          <source 
            srcSet="/tokenomics-images/aipg_tokenomics_banner_mobile.png" 
            media="(max-width: 640px)"
          />
          <img
            src="/tokenomics-images/aipg_tokenomics_banner.png"
            alt="Tokenomics Banner"
            className="w-full h-auto sm:h-96 m-0 p-0"
          />
        </picture>
        <div className="bg-transparent p-6 text-white w-full sm:h-full h-auto sm:w-[30%] flex items-center justify-center">
          {/* Heading removed from here */}
        </div>
      </section>

      {/* Rest of the Tokenomics Page Content */}
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow text-center">
          <h1 className="text-4xl mt-8 mb-12">Tokenomics</h1>
          <h2 className="text-xl font-bold mb-2">Distribution Over Time</h2>
          <img src="/Tokenomics_Graph.png" alt="Tokenomics Graph" className="w-full sm:w-1/2 mx-auto" />
          <section className="pt-16 pb-16">
            <h2 className="text-xl font-bold mb-2">Tokenomics Change</h2>
            {/* Image gallery for mobile */}
            <div className="sm:hidden flex flex-col items-center">
              <img
                src={tokenomicsImages[currentPage]}
                alt={`Tokenomics Explanation Page ${currentPage + 1}`}
                className="mb-4"
              />
              <div className="flex justify-between w-full px-0">
                <button
                  onClick={prevPage}
                  className="w-32 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                  disabled={currentPage === 0}
                >
                  Previous Page
                </button>
                <button
                  onClick={nextPage}
                  className="w-32 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                  disabled={currentPage === totalPages - 1}
                >
                  Next<br />Page
                </button>
              </div>
              {/* Download button for mobile */}
              <a
                href="/tokenomics-images/Tokenomics.pdf"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                download
              >
                Download Tokenomics
              </a>
            </div>
            {/* PDF Embed for larger screens */}
            <div className="hidden sm:block text-center">
              <embed
                src="/tokenomics-images/Tokenomics.pdf"
                type="application/pdf"
                className="mx-auto"
                style={{ width: '54%', height: '950px' }}
              />
            </div>
          </section>
          <section className="pt-16 pb-16">
            <div className="">
              <h2 className="text-xl font-bold mb-2">Distribution Table</h2>
              {/* Add the distribution tables here */}
              <img src="/Tokenomics_Chart.png" alt="Tokenomics Chart" className="w-full md:w-3/4 lg:w-2/3 mx-auto"/>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;