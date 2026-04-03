"use client";
import React, { useEffect, useRef } from 'react';
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Problem from "@/components/Problem";
import Infrastructure from "@/components/Infrastructure";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Timeline from "@/components/Timeline";

export default function Home() {
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const problemRef = useRef(null);
  const infrastructureRef = useRef(null);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.001,
      rootMargin: "0px 0px -50px 0px",
    };

    const handleVisibilityChange = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibilityChange, observerOptions);

    const refs = [heroRef, productsRef, problemRef, infrastructureRef, featuresRef, servicesRef, timelineRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <main className="dark">
      <div ref={heroRef} className="fadeInSection"><Hero /></div>
      <div ref={productsRef} className="fadeInSection"><Products /></div>
      <div ref={problemRef} className="fadeInSection"><Problem /></div>
      <div ref={infrastructureRef} className="fadeInSection"><Infrastructure /></div>
      <div ref={featuresRef} className="fadeInSection"><Features /></div>
      <div className="w-full py-8 md:py-12">
        <div className="flex justify-center items-center">
          <span className="text-2xl sm:text-4xl font-semibold text-white">
            Positive-Sum Impact
          </span>
        </div>
      </div>
      <div ref={servicesRef} className="fadeInSection"><Services /></div>
      <div className="w-full py-8 md:py-12">
        <div className="flex justify-center items-center">
          <span className="text-2xl sm:text-4xl font-semibold text-white">
            Roadmap
          </span>
        </div>
      </div>
      <div ref={timelineRef} className="fadeInSection"><Timeline /></div>
      <div className="pb-16 md:pb-20 lg:pb-24"></div>
    </main>
  );
}
