import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section aria-labelledby="home-title" className="overflow-hidden border-b border-white/15 bg-black">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-3xl text-center">
          <Image src="/AIPGsimplelogo.png" alt="AI Power Grid emblem" width={112} height={112} priority className="mx-auto mb-4 h-24 w-24 object-contain sm:h-28 sm:w-28" />
          <h1 id="home-title" className="text-4xl font-bold leading-tight text-white sm:text-5xl">AI Power Grid</h1>
          <p className="mt-3 text-2xl font-semibold leading-snug text-orange-400">AI powered by people.</p>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-gray-300">
            Open models for chat, images, video, and music.
            Create, build, or connect your own AI setup.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#try-grid" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-400 px-6 py-3 font-semibold text-black hover:bg-orange-300">
              Try the Grid <FiArrowRight aria-hidden="true" />
            </a>
            <a href="/run" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20">Provide compute</a>
          </div>
          <a href="/use" className="mt-3 inline-flex items-center gap-2 py-2 font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
            Build with the API <FiArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
