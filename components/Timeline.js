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
    <div class="container mx-auto w-full h-full p-8">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span style={{ color: "#fff" }}>Current</span>}
          contentStyle={{ background: "#0f172a", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)" }}
          contentArrowStyle={{ borderRight: "7px solid  #0f172a" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }}
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Current - Developing a PoUW model
          </h3>
          <p style={{ color: "grey" }}>
            In the current phase following the launch of AIPG, our focus is on laying the groundwork
            for robust AI services within the blockchain environment. This foundational period is dedicated
            to solidifying the Proof of Useful Work (POUW) infrastructure, fostering the transition of GPU
            miners into AI node operators, and ensuring the stability and security of the network with the integration of validator nodes.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Q1 2024"
          contentStyle={{ background: "#0f172a", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)" }}
          contentArrowStyle={{ borderRight: "7px solid  #0f172a" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q1 2024 - Scaling Up and Enhancing Experiences
          </h3>
          <p style={{ color: "grey" }}>
            Building upon the stable PoW foundation, AIPG begins expanding its
            features to include the much-anticipated NFT AI Art Gallery and
            marketplace. At the same time, the platform evolves with significant
            UX improvements and resilient smart contracts, preparing for the
            gradual transition away from PoW towards a more sustainable
            consensus mechanism.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Q3 2024"
          contentStyle={{ background: "#0f172a", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)" }}
          contentArrowStyle={{ borderRight: "7px solid  #0f172a" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q3 2024 - Transition to Proof of Useful Work (PoUW)
          </h3>
          <p style={{ color: "grey" }}>
            In this crucial phase, AIPG takes a significant leap forward by
            transitioning from the original PoW to a novel Proof of Useful Work
            (PoUW) protocol. This shift is not only eco-friendlier but also
            aligns with AIPG's mission of democratizing AI, as the work
            performed by miners now directly contributes to the AI services
            provided by the platform, creating value for the entire network.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Q4 2024"
          contentStyle={{ background: "#0f172a", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)" }}
          contentArrowStyle={{ borderRight: "7px solid  #0f172a" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q4 2024 - Adding trusted nodes and API functionality
          </h3>
          <p style={{ color: "grey" }}>
            Users or developers who demand reliability, consistent uptime, and professional-grade API access,
            AIPG offers a paid tier. This premium offering guarantees service levels through contracts with
            secured and trusted nodes, catering to enterprise users and applications where high availability and predictable performance are required.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Q2 2025"
          contentStyle={{ background: "#0f172a", color: "#fff", boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.5)" }}
          contentArrowStyle={{ borderRight: "7px solid  #0f172a" }}
          iconStyle={{ background: "#ADD8E6", color: "#1E40AF" }} // Changed to light blue
          icon={<img src="/aipg logo V3 All White_232x240.png" alt="AIPG Logo" style={{ width: '100%', height: 'auto' }} />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fff" }}>
            Q2 2025 - Interchain AI Service Protocol Layer
          </h3>
          <p style={{ color: "grey" }}>
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