import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import TopBar from "@/components/TopBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Stats />
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Our Services
        </span>
      </div>
      <Services />
      <div className="flex flex-1 self-center w-full justify-center items-center bg-gray-50">
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-8">
          Features
        </span>
      </div>
      <Features />
    </main>
  );
}
