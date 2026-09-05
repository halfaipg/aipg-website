import Image from "next/image";
import { FiArrowUpRight, FiMessageSquare, FiMusic, FiCode, FiLock } from "react-icons/fi";

const products = [
  { title: "Talk it through", description: "Write, explore ideas, and work with open language models.", href: "https://aipg.chat", label: "Open chat", icon: FiMessageSquare },
  { title: "Make a soundtrack", description: "Turn a musical idea and your lyrics into a track.", href: "https://aipg.music", label: "Open music studio", icon: FiMusic },
  { title: "Build it into your app", description: "Compatible text APIs plus native Grid image, video, and audio endpoints.", href: "https://aipowergrid.io/use", label: "Start in 60 seconds", icon: FiCode },
];

export default function Products() {
  return (
    <section aria-labelledby="products-title" className="bg-[#101114] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="products-title" className="text-2xl font-semibold text-white sm:text-3xl">From an idea to something you can share.</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-gray-300">Start with an image. Explore video in the Director, or find your next idea in the gallery.</p>
          </div>
          <a href="https://aipg.art/create" className="inline-flex items-center gap-2 py-2 font-semibold text-orange-300 hover:text-orange-200">Open image studio <FiArrowUpRight aria-hidden="true" /></a>
        </div>
        <a href="https://aipg.art" aria-label="Explore the AIPG art gallery" className="block overflow-hidden rounded-lg border border-white/20">
          <div aria-hidden="true" className="flex h-10 items-center gap-4 border-b border-white/10 bg-[#202125] px-3 sm:px-4">
            <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#f27770]" /><span className="h-2.5 w-2.5 rounded-full bg-[#e8c15c]" /><span className="h-2.5 w-2.5 rounded-full bg-[#69bf82]" /></div>
            <span className="flex flex-1 items-center justify-center gap-2 text-xs text-gray-300"><FiLock /> aipg.art</span>
            <FiArrowUpRight className="text-gray-400" />
          </div>
          <Image src="/gallery-preview.png" alt="AIPG gallery preview showing the live gallery and landscape search results" width={1440} height={900} sizes="(max-width: 1280px) 100vw, 1280px" className="h-auto w-full" />
        </a>
        <p className="mt-2 text-sm text-gray-400">Gallery preview. Model availability and generation settings vary.</p>
        <div className="mt-8 grid divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {products.map(({ title, description, href, label, icon: Icon }) => (
            <div key={href} className="flex min-w-0 flex-col py-6 first:pt-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:first:pt-0 sm:last:pr-0">
              <Icon aria-hidden="true" className="mb-3 h-6 w-6 text-cyan-300" />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mb-4 mt-2 leading-relaxed text-gray-300">{description}</p>
              <a href={href} className="mt-auto inline-flex items-center gap-2 py-2 font-medium text-orange-300 hover:text-orange-200">{label} <FiArrowUpRight aria-hidden="true" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
