"use client";

import React, { useState } from 'react';

const WhitePaper = () => {
  const totalPages = 9;
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const pdfImages = Array.from({ length: totalPages }, (_, i) => 
    `/whitepaper-images/aipg_whitepaperV1.06-${i + 1}.png`
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4 mt-24"> {/* Adjust mt-4 to whatever suits your navbar height */}
      {/* PDF Object will be hidden on small screens */}
      <div className="hidden sm:block w-full h-full">
        <object
          data="/whitepaper-images/aipg_whitepaperV1.06.pdf"
          type="application/pdf"
          width="100%"
          height="91%" // Adjusted from 97% to 80%
        >
          <embed src="/whitepaper-images/aipg_whitepaperV1.05.pdf" type="application/pdf" />
        </object>
      </div>
      {/* Image gallery and buttons will be shown on small screens */}
      <div className="sm:hidden w-full h-full flex flex-col items-center">
        <img
          src={pdfImages[currentPage]}
          alt={`Whitepaper Page ${currentPage + 1}`}
          className="mb-4"
        />
        <div className="flex justify-between w-full px-0">
          <button
            onClick={prevPage}
            className="w-32 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            disabled={currentPage === 0}
          >
            Previous<br />Page
          </button>
          <button
            onClick={nextPage}
            className="w-32 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            disabled={currentPage === totalPages - 1}
          >
            Next<br />Page
          </button>
        </div>
        {/* Download button */}
        <a
          href="/whitepaper-images/aipg_whitepaperV1.05.pdf"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          download
        >
          Download Whitepaper
        </a>
      </div>
    </div>
  );
};

export default WhitePaper;