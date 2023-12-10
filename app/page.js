import BlogsSection from "@/components/BlogsSection";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import MiningPoolSection from "@/components/MiningPoolSection";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="">
      <Hero />
      {/* </Stats /> */}
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50 dark:bg-black">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Features
        </span>
      </div>
      <Services />
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50 dark:bg-black">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Features
        </span>
      </div>
      <Features />
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50 dark:bg-black">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Roadmap
        </span>
      </div>
      <Timeline />
      <FAQ />
      {/* <BlogsSection /> */}
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50 dark:bg-black">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Mining Pools
        </span>
      </div>
      <MiningPoolSection />
    </main>
  );
}
