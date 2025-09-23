"use client";
import { inView } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./customTimelineStyles.css"; 

const Timeline = () => {
  return (
    <div className="container mx-auto w-full h-full p-8">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span style={{ color: "#fff" }}>Launched Dec 2023</span>}
          contentStyle={{ background: "#1F1F1F", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)", fontFamily: "inherit" }}
          contentArrowStyle={{ borderRight: "7px solid  #1F1F1F" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }}
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            EOY 2023 - Fair Launch and Initial Distribution
          </h3>
          <p style={{ color: "#d3d3d3" }}>
            AI Power Grid (AIPG) launched on December 10, 2023, with a commitment to fairness and transparency: 
            no venture capital, no seed capital or pre-sales, and no pre-mining. This fair launch ensured an even 
            playing field, and laid the groundwork for our future GenAI decentralized physical infrastructure network (DePIN).
            Our mission is to democratize open-source and local generative AI, aiming to revolutionize human 
            creativity and productivity.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Q1-Q4 2024"
          contentStyle={{ background: "#1F1F1F", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)", fontFamily: "inherit" }}
          contentArrowStyle={{ borderRight: "7px solid  #1F1F1F" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q1-Q4 2024 - Expansion and Development phase
          </h3>
          <p style={{ color: "#d3d3d3" }}>
          In 2024, AI Power Grid (AIPG) has worked tirelessly on developing the distributed AI network core, workers, and front end infrastructure. During this time, we have developed substantial enhancements to the platform's underlying architecture for efficient handling of generative AI workloads through decentralized worker nodes.
          </p>
          
          <p style={{ color: "#d3d3d3" }}>
          Beta testing enabled us to gather valuable feedback and refine our platform further. This public beta testing has been pivotal in democratizing our generative AI technology, ensuring seamless operation and improved user experiences across the board.
          </p>
          
          <p style={{ color: "#d3d3d3" }}>
          We're developing state-of-the-art AI front ends, including our AI art gallery at aipg.art, showcasing stunning generative artworks, and the interactive platform at beta.aipowergrid.io, where users can chat with open-source LLMs and generate images using open-source models, all powered by our distributed beta workers </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Q1-Q2 2025"
          contentStyle={{ background: "#1F1F1F", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)", fontFamily: "inherit" }}
          contentArrowStyle={{ borderRight: "7px solid  #1F1F1F" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q2 2025 - Developing AI Services and AI Blockchain Integration
          </h3>
          <p style={{ color: "#d3d3d3" }}>
          In this key phase, AIPG accelerates its forward momentum by transitioning into a decentralized AI network powered by distributed AI workers. 
          This evolution not only reduces environmental impact but also aligns with AIPG's vision of democratizing AI.
          </p>
          <p style={{ color: "#d3d3d3" }}>
          Our innovative approach allows computational resources to be efficiently utilized in delivering high-value AI services, thereby generating substantial benefits for the entire network.
          It is during this time that AIPG will ramp up marketing efforts and incentivize developers to build L2 assets on our upcoming L1 AI enabled blockchain.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Q3 2025"
          contentStyle={{ background: "#1F1F1F", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)", fontFamily: "inherit" }}
          contentArrowStyle={{ borderRight: "7px solid  #1F1F1F" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q3 2025 - Grid mainnet launch and app marketplace
          </h3>
          <p style={{ color: "#d3d3d3" }}>
          In Q1 2025, AI Power Grid will l mainnet, marking a significant milestone in our journey towards 
          democratizing generative AI. This launch will be accompanied by the introduction of a comprehensive app marketplace, empowering developers 
          and users alike to deploy and access a wide array of AI-powered applications seamlessly.</p> <p style={{ color: "#d3d3d3" }}>The mainnet will leverage our robust decentralized 
          network to ensure scalability, security, and efficiency in handling generative AI workloads. This pivotal launch will open up new avenues for 
          innovation and creativity, solidifying AIPG's position at the forefront of open-source AI technology.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Q4 2025"
          contentStyle={{ background: "#1F1F1F", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)", fontFamily: "inherit" }}
          contentArrowStyle={{ borderRight: "7px solid  #1F1F1F" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q4 2025 - Smart Contracts, Staking, and Data Contracts
          </h3>
          <p style={{ color: "#d3d3d3" }}>
          Smart Contracts will automate and secure complex transactional processes, enabling seamless interaction between parties without the need for intermediaries. This paves the way for more transparent and efficient operations within our ecosystem.
          </p>
          <p style={{ color: "#d3d3d3" }}>
          Staking AIPG tokens will be a crucial component for running a validator node within our network. By staking, participants can contribute to the network's security and efficiency while earning rewards. This incentivizes active participation and ensures the robustness of our decentralized infrastructure.
          </p>
          <p style={{ color: "#d3d3d3" }}>
          Decentralized Data Contracts introduce data storage buckets hosted by nodes with associated contracts. This approach ensures that data is securely and reliably stored across the network, providing users with decentralized, trustworthy data management solutions. These innovative features highlight our commitment to advancing decentralized AI technologies and delivering top-tier services to our community.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Q1 2026"
          contentStyle={{ background: "#1F1F1F", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)", fontFamily: "inherit" }}
          contentArrowStyle={{ borderRight: "7px solid  #1F1F1F" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q1 2026 - Interchain AI Service Protocol Layer
          </h3>
          <p style={{ color: "#d3d3d3" }}>
            The development of an interchain protocol to facilitate cross-blockchain AI services,
            positioning AIPG as a leader in blockchain interoperability in the AI space. This move will fully
            solidify AIPG's position as one of the leading AI coins in the marketplace.
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
