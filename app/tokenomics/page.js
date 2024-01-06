import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4 mx-auto text-center">
        <h1 className="text-4xl mb-6">Tokenomics</h1>
        <section>
          <h2 className="text-xl font-bold mb-2">Distribution over time</h2>
          {/* Add the content for the "Distribution over time" section here */}
        </section>
        <section>
          <h2 className="text-xl font-bold mb-2">Find a good distribution</h2>
          {/* Add the content for the "Find a good distribution" section here */}
        </section>
        <section>
          <h2 className="text-xl font-bold mb-2">Microhalving</h2>
          {/* Add the content for the "Microhalving" section here */}
        </section>
        <section>
          <h2 className="text-xl font-bold mb-2">Distribution Tables</h2>
          {/* Add the distribution tables here */}
        </section>
      </main>
    </div>
  );
};

export default Page;
