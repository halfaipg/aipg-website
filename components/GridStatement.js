"use client";

const GridStatement = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          <span className="text-gray-400">The last revolution was metered in</span>{" "}
          <span className="text-white">kilowatt-hours.</span>
          <br />
          <span className="text-gray-400">This one is metered in</span>{" "}
          <span
            style={{
              color: "#f8991d",
              textShadow:
                "0 0 30px rgba(248, 153, 29, 0.5), 0 0 60px rgba(248, 153, 29, 0.3)",
            }}
          >
            tokens.
          </span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
          AI Power Grid meters intelligence by the token — drawn from GPUs anyone
          can plug in, and settled on-chain. The meter stays honest, and no one
          owns the off switch.
        </p>
      </div>
    </section>
  );
};

export default GridStatement;
