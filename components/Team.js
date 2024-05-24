"use client";
import React from "react";
import "./Team.css"; // Import your CSS file here

// Example team member data
const teamMembers = [
  {
    name: "Half",
    position: "Founder",
    imageUrl: "/team-photos/Half_240x240.png", 
    featureText: "Half leverages over 20 years of experience in DevOps and IT infrastructure, and with a love for open source AI tech, he gives visionary leadership for strategic advancement.",
  },
  {
    name: "Raz",
    position: "Operations and Communications Manager",
    imageUrl: "/team-photos/Raz_240x240.png", 
    featureText: "Raz is a seasoned professional with vast expertise in operations, public relations, and community engagement, supported by a Master of Engineering Degree.",
  },
  {
    name: "Mandark",
    position: "Network/Server Infrastructure & Datacenter Architect",
    imageUrl: "/team-photos/Mandark_240x240.png", 
    featureText: "Mandark is a highly skilled expert in network engineering and datacenter management, playing a pivotal role in the architecture, security, and implementation of our AI systems.",
  },
  {
    name: "Professor",
    position: "AI Art/Stable Diffusion Engineer",
    imageUrl: "/team-photos/Professor_240x240.png", 
    featureText: "Professor is an expert in AI-generated art. He guides the development of the AI Art Gallery and idealizes creative strategies through model training, fine-tuning, and his unmatched expertise.",
  },
  {
    name: "Infinity",
    position: "Backend Systems and Blockchain Infrastructure Wizard",
    imageUrl: "/team-photos/Infinity_240x240.png",
    featureText: "Infinity, our lead blockchain engineer based in Germany, elevates our backend architecture and blockchain functionality with exceptional expertise.",
  },
  {
    name: "Winddude",
    position: "AI Developer & Full Stack Engineer",
    imageUrl: "/team-photos/Winddude_240x240.png",
    featureText: "With over 20 years of full-stack engineering expertise, and a love for open-source AI tech, Winddude brings a comprehensive understanding of technology to guide our development.",
  },
  {
    name: "JoJo",
    position: "AI Researcher",
    imageUrl: "/team-photos/JoJo_240x240.png", 
    featureText: "JoJo, with over 4 years of experience in machine learning and language models, aims to bridge AIPG with the open-source LLM Dev communities and assist in developing the future of open source AI.",
  },
  {
    name: "Seal Clubber",
    position: "Release Manager",
    imageUrl: "/team-photos/SealClubber_240x240.png", 
    featureText: "With a wealth of expertise in blockchain technology, Seal Clubber leverages his extensive coding experience to drive innovation and excellence within the project.",
  },
  {
    name: "MrSchmiklz",
    position: "AI Tech Scout & Python Developer",
    imageUrl: "/team-photos/MrSchmiklz_240x240.png",
    featureText: "MrSchmiklz is an expert in identifying and evaluating emerging AI technologies for potential integration into our AI network, with extensive experience in Python and Discord bot development.",
  },
  {
    name: "Topper",
    position: "Blockchain Development Expert & Ph.D.",
    imageUrl: "/team-photos/Topper_240x240.png",
    featureText: "With an impressive 22 years in software engineering, Topper stands out in backend systems and blockchain development. His unmatched skills spearhead our progress, making him an invaluable pillar of our project.",
  },
  {
    name: "Switchgrass",
    position: "Discord Moderator",
    imageUrl: "/team-photos/Switchgrass_240x240.png",
    featureText: "As a U.S. Army Veteran and experienced Discord Admin for RavenMiner, his unique blend of experience in security and moderation assures a harmonious and secure community for our users.",
  },
  {
    name: "OvErLoDe",
    position: "Discord Moderator",
    imageUrl: "/team-photos/OvErLoDe_240x240.png",
    featureText: "OvErLoDe, an IT instructor with a specialism in Microelectronics, OvErLoDe brings a potent blend of knowledge and passion to bear. He is dedicated to fostering a supportive community through his tech-savvy approach.",
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