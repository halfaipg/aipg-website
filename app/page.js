import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
// import Team from "@/components/Team"; // Re-added Team import
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="dark">
      <Hero />
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50 dark:bg-black">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Features
        </span>
      </div>
      <Features />
      {/* <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50 dark:bg-black">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          The Team
        </span>
      </div>
      <Team /> */}
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50 dark:bg-black">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Our Vision
        </span>
      </div>
      <Services />
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50 dark:bg-black">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Roadmap
        </span>
      </div>
      <Timeline />
    </main>
  );
}
