"use client";

import React from 'react';

const WhitePaper = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <object
        data="/aipg_whitepaperV1.04.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <embed src="/aipg_whitepaperV1.04.pdf" type="application/pdf" />
      </object>
    </div>
  );
};

export default WhitePaper;
