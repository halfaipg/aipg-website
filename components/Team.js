"use client";
import React from "react";
import "./Team.css"; // Import your CSS file here

// Example team member data
const teamMembers = [
  {
    name: "Half",
    position: "Founder",
    imageUrl: "/team-photos/Half_240x240.png", 
    featureText: "Half leverages over 20 years of experience in DevOps and IT infrastructure, and with a love for open source AI tech, he gives visionary leadership for strategic advancement. <span title='United States'>🇺🇸</span>",
  },
  {
    name: "Raz",
    position: "Operations and Communications Manager",
    imageUrl: "/team-photos/Raz_240x240.png", 
    featureText: "Raz is a seasoned professional with vast expertise in operations, public relations, and community engagement, supported by a Master of Engineering Degree. <span title='United States'>🇺🇸</span>",
  },
  {
    name: "Mandark",
    position: "Network/Server Infrastructure & Datacenter Architect",
    imageUrl: "/team-photos/Mandark_240x240.png", 
    featureText: "Mandark is a highly skilled expert in network engineering and datacenter management, playing a pivotal role in the architecture, security, and implementation of our AI systems. <span title='United States'>🇺🇸</span>",
  },
  {
    name: "Professor",
    position: "AI Art/Stable Diffusion Engineer",
    imageUrl: "/team-photos/Professor_240x240.png", 
    featureText: "Professor is an expert in AI-generated art. He guides the development of the AI Art Gallery and idealizes creative strategies through model training, fine-tuning, and his unmatched expertise. <span title='Mexico'>🇲🇽</span>",
  },
  {
    name: "Infinity",
    position: "Backend Systems and Blockchain Infrastructure Wizard",
    imageUrl: "/team-photos/Infinity_240x240.png",
    featureText: "Infinity, our lead blockchain engineer based in Germany, elevates our backend architecture and blockchain functionality with exceptional expertise. <span title='Netherlands'>🇳🇱</span>",
  },
  {
    name: "JoJo",
    position: "AI Researcher",
    imageUrl: "/team-photos/JoJo_240x240.png", 
    featureText: "JoJo, with over 4 years of experience in machine learning and language models, aims to bridge AIPG with the open-source LLM Dev communities and assist in developing the future of open source AI. <span title='South Africa'>🇿🇦</span>",
  },
  {
    name: "MrSchmiklz",
    position: "AI Tech Scout & Python Developer",
    imageUrl: "/team-photos/MrSchmiklz_240x240.png",
    featureText: "MrSchmiklz is an expert in identifying and evaluating emerging AI technologies for potential integration into our AI network, with extensive experience in Python and Discord bot development. <span title='United States'>🇺🇸</span>",
  },
  {
    name: "Zach",
    position: "Full stack developer",
    imageUrl: "/team-photos/Zach_240x240.png",
    featureText: "Zach is a versatile full stack developer with expertise in Next.js, front-end, back-end, and AI development, contributing to both the user experience and the technical backbone of our projects. <span title='United States'>🇺🇸</span>",
  },
  {
    name: "Warrior",
    position: "Full stack developer",
    imageUrl: "/team-photos/Zach_240x240.png",
    featureText: "Warrior is a skilled full stack and front end developer from Japan. He excels in problem-solving and tackling tough coding challenges, consistently delivering high-quality solutions.",
  },
  {
    name: "Urek",
    position: "Front End Developer",
    imageUrl: "",
    featureText: "Experienced Infrastructure Specialist with a strong background in building scalable applications and optimizing server performance. 🇮🇳",
  },
  {
    name: "Switchgrass",
    position: "Discord Moderator",
    imageUrl: "/team-photos/Switchgrass_240x240.png",
    featureText: "As a U.S. Army Veteran and experienced Discord Admin for RavenMiner, his unique blend of experience in security and moderation assures a harmonious and secure community for our users. <span title='United States'>🇺🇸</span>",
  },
  {
    name: "OvErLoDe",
    position: "Discord Moderator",
    imageUrl: "/team-photos/OvErLoDe_240x240.png",
    featureText: "OvErLoDe, an IT instructor with a specialism in Microelectronics, OvErLoDe brings a potent blend of knowledge and passion to bear. He is dedicated to fostering a supportive community through his tech-savvy approach. 🇬🇧",
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
              <p className="text-blk name">
                {member.name}
              </p>
              <p className="text-blk position">
                {member.position}
              </p>
              <p className="text-blk feature-text">
                {member.featureText} {/* Use featureText from the array */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team; // Export your Team component