"use client";
import React, { useEffect, useRef } from 'react';
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Infrastructure from "@/components/Infrastructure";
import LiveDemo from "@/components/LiveDemo";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Timeline from "@/components/Timeline";
import TimelineNew from "@/components/Timeline-New"; // Import the Timeline-New component

export default function Home() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const infrastructureRef = useRef(null);
  const liveDemoRef = useRef(null);
  const featuresRef = useRef(null);
  const teamRef = useRef(null);
  const servicesRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineNewRef = useRef(null);

  useEffect(() => {
    const generalThreshold = 0.001;
    const teamThreshold = 0.001;
    const roadmapThreshold = 0.001;

    const observerOptions = {
      general: { threshold: generalThreshold, rootMargin: "0px 0px -50px 0px" },
      team: { threshold: teamThreshold, rootMargin: "0px 0px -50px 0px" },
      roadmap: { threshold: roadmapThreshold, rootMargin: "0px 0px -50px 0px" }
    };

    const handleVisibilityChange = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    };

    const generalObserver = new IntersectionObserver(handleVisibilityChange, observerOptions.general);
    const teamObserver = new IntersectionObserver(handleVisibilityChange, observerOptions.team);
    const roadmapObserver = new IntersectionObserver(handleVisibilityChange, observerOptions.roadmap);

    const refs = [heroRef, problemRef, infrastructureRef, liveDemoRef, featuresRef, servicesRef, teamRef, timelineRef, timelineNewRef];
    refs.forEach(ref => {
      if (ref.current) {
        generalObserver.observe(ref.current);
        roadmapObserver.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          generalObserver.unobserve(ref.current);
          roadmapObserver.unobserve(ref.current);
        }
      });
      generalObserver.disconnect();
      teamObserver.disconnect();
      roadmapObserver.disconnect();
    };
  }, []);

  return (
    <main className="dark">
      <div ref={heroRef} className="fadeInSection"><Hero /></div>
      <div ref={problemRef} className="fadeInSection"><Problem /></div>
      <div ref={infrastructureRef} className="fadeInSection"><Infrastructure /></div>
      <div ref={liveDemoRef} className="fadeInSection"><LiveDemo /></div>
      <div ref={featuresRef} className="fadeInSection"><Features /></div>
      <div className="flex flex-1 self-center w-full justify-center items-center" style={{ paddingTop: '2rem' }}>
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-0 section-header">
          Positive-Sum Impact
        </span>
      </div>
      <div ref={servicesRef} className="fadeInSection"><Services /></div>
      <div className="flex flex-1 self-center w-full justify-center items-center" style={{ paddingTop: '2rem' }}>
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-0 section-header">
          The Team
        </span>
      </div>
      <div ref={teamRef} className="fadeInSection"><Team /></div>
      <div className="flex flex-1 self-center w-full justify-center items-center" style={{ paddingTop: '2rem' }}>
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-0 section-header">
          Roadmap
        </span>
      </div>
      <div ref={timelineRef} className="fadeInSection"><Timeline /></div>
      <div className="flex flex-1 self-center w-full justify-center items-center" style={{ paddingTop: '2rem' }}>
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-0 section-header">
        </span>
      </div>
    </main>
  );
}
