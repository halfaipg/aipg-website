"use client";
import React from "react";
import "./Team.css"; // Import your CSS file here

// Example team member data
const teamMembers = [
  {
    name: "Half",
    position: "Founder",
    imageUrl: "", // Add image URL
    featureText: "Brings extensive experience in blockchain and AI technologies. Provides visionary leadership, guiding the project's direction.",
  },
  {
    name: "Raz",
    position: "Operations and Communications Manager",
    imageUrl: "", // Add image URL
    featureText: "10 years experience. Manages public relations and community engagement. Key in narrating project's vision and building relationships.",
  },
  {
    name: "Mandark",
    position: "Blockchain Network and Infrastructure Architect",
    imageUrl: "", // Add image URL
    featureText: "10 Years experience. Expert in network engineering. Critical in the architecture and security of blockchain implementation.",
  },
  {
    name: "Professor",
    position: "AI Art/Stable Diffusion Engineer",
    imageUrl: "", // Add image URL
    featureText: "Specialized in AI-generated art, model training and fine-tuning. Leads the AI Art Gallery development.",
  },
  {
    name: "Infinity",
    position: "Backend Systems and Blockchain Infrastructure Wizard",
    imageUrl: "", // Add image URL
    featureText: "3.5 years experience. Based in Germany with exceptional backend systems skills. Enhances backend architecture and blockchain functionality.",
  },
  {
    name: "winddude",
    position: "AI Developer",
    imageUrl: "", // Add image URL
    featureText: "Focus on Python and generative models. Enjoys windsurfing and is based in Canada.",
  },
  {
    name: "JoJo",
    position: "Full Stack LLM Engineer",
    imageUrl: "", // Add image URL
    featureText: "4 years experience. Software Engineer with experience in machine learning and working with language models. One of my goals is bringing AIPG and the open source LLM Dev communities together.",
  },
  {
    name: "Seal Clubber",
    position: "Release Manager",
    imageUrl: "", // Add image URL
    featureText: "6 years experience. Blockchain and GPU proof-of-work enthusiast. Part-time coder with experience in C++, Python, openCV, and JS.",
  },
  {
    name: "MrSchmiklz",
    position: "Python/Discord bot dev.",
    imageUrl: "", // Add image URL
    featureText: "4 yrs experience. Connecting you to your favorite experimental repos.",
  },
  {
    name: "topper",
    position: "Sys Linux Adm / Blockchain Dev",
    imageUrl: "", // Add image URL
    featureText: "22 yrs experience. Electronics engineer with 22+ years of experience in hardware design, blockchain technology development, and Linux system management for cryptocurrency projects. Proven expertise in programming languages such as Python, Java, and C++. Ph. D. Electrical Machines",
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
