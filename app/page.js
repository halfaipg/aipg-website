"use client";
import React, { useEffect, useRef } from 'react';
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Timeline from "@/components/Timeline";

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const teamRef = useRef(null);
  const servicesRef = useRef(null);
  const timelineRef = useRef(null);

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
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    };

    const generalObserver = new IntersectionObserver(
      handleVisibilityChange,
      observerOptions.general
    );

    const teamObserver = new IntersectionObserver(
      handleVisibilityChange,
      observerOptions.team
    );

    const roadmapObserver = new IntersectionObserver(
      handleVisibilityChange,
      observerOptions.roadmap
    );

    const refs = [heroRef, featuresRef, servicesRef];
    refs.forEach((ref) => {
      if (ref.current) {
        generalObserver.observe(ref.current);
      }
    });

    if (teamRef.current) {
      teamObserver.observe(teamRef.current);
    }

    if (timelineRef.current) {
      roadmapObserver.observe(timelineRef.current);
    }

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          generalObserver.unobserve(ref.current);
        }
      });
      if (teamRef.current) {
        teamObserver.unobserve(teamRef.current);
      }
      if (timelineRef.current) {
        roadmapObserver.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <main className="dark">
      <div ref={heroRef} className="fadeInSection"><Hero /></div>
      <div ref={featuresRef} className="fadeInSection"><Features /></div>
      <div className="flex flex-1 self-center w-full justify-center items-center" style={{ paddingTop: '2rem' }}>
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-0 section-header">
          The Team
        </span>
      </div>
      <div ref={teamRef} className="fadeInSection"><Team /></div>
      <div className="flex flex-1 self-center w-full justify-center items-center" style={{ paddingTop: '2rem' }}>
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-0 section-header">
          Our Vision
        </span>
      </div>
      <div ref={servicesRef} className="fadeInSection"><Services /></div>
      <div className="flex flex-1 self-center w-full justify-center items-center" style={{ paddingTop: '2rem' }}>
        <span className="text-2xl sm:text-4xl font-semibold py-4 sm:py-0 section-header">
          Roadmap
        </span>
      </div>
      <div ref={timelineRef} className="fadeInSection"><Timeline /></div>
    </main>
  );
}
