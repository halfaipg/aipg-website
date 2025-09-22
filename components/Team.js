"use client";
import React from "react";
import "./Team.css"; // Import your CSS file here

// Example team member data
const teamMembers = [
  {
    name: "Half <span title='United States'>🇺🇸</span>",
    position: "Founder and Core Developer",
    imageUrl: "/team-photos/Half_240x240.png", 
    featureText: "Half leverages over 20 years of unparalleled experience in DevOps and IT infrastructure, and with a profound love for open source AI tech, he gives visionary leadership for strategic advancement.",
  },
  {
    name: "Raz <span title='United States'>🇺🇸</span>",
    position: "Operations Manager",
    imageUrl: "/team-photos/Raz_240x240.png", 
    featureText: "Raz is a seasoned professional with vast expertise in operations, public relations, and community engagement, supported by a Master of Engineering Degree.",
  },
  // {
  //   name: "MrSchmiklz <span title='United States'>🇺🇸</span>",
  //   position: "Full stack AI and Python Developer",
  //   imageUrl: "/team-photos/MrSchmiklz_240x240.png",
  //   featureText: "MrSchmiklz is an expert in identifying and evaluating emerging AI technologies for potential integration into our AI network, with extensive experience in Python and Discord bot development.",
  // },
  {
    name: "Zach <span title='United States'>🇺🇸</span>",
    position: "Full stack developer",
    imageUrl: "/team-photos/Zach_240x240.png",
    featureText: "Zach is a versatile full stack developer with expertise in Next.js, front-end, back-end, and AI development, contributing to both the user experience and the technical backbone of our projects.",
  },
  // {
  //   name: "Infinity <span title='Netherlands'>🇳🇱</span>",
  //   position: "Backend Systems and Blockchain",
  //   imageUrl: "/team-photos/Infinity_240x240.png",
  //   featureText: "Infinity, our lead blockchain engineer based in Germany, elevates our backend architecture and blockchain functionality with exceptional expertise.",
  // },
  // {
  //   name: "JoJo <span title='South Africa'>🇿🇦</span>",
  //   position: "Full Stack Dev and AI Researcher",
  //   imageUrl: "/team-photos/JoJo_240x240.png", 
  //   featureText: "JoJo, with over 4 years of experience in machine learning and language models, aims to bridge AIPG with the open-source LLM Dev communities and assist in developing the future of open source AI.",
  // },
  {
    name: "Urek <span title='India'>🇮🇳</span>",
    position: "Full Stack Developer",
    imageUrl: "/team-photos/Urek_240x240.png",
    featureText: "Urek is an experienced Infrastructure Specialist with a strong background in building scalable applications and optimizing server performance. His expertise ensures our systems run smoothly.",
  },
  // Add more team members here...
];

const Team = () => {
  return (
    <div className="responsive-container-block container">
      <div className="responsive-container-block">
        {teamMembers.map((member, index) => (
          <div key={index} className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
            <div className="card">
              <div className="team-image-wrapper">
                <img className="team-member-image" src={member.imageUrl} />
              </div>
              <div className="text-blk name" dangerouslySetInnerHTML={{ __html: member.name }} />
              <p className="text-blk position">
                {member.position}
              </p>
              <p className="text-blk feature-text" dangerouslySetInnerHTML={{ __html: member.featureText }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team; // Export your Team component
