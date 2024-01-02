"use client";
import { inView } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaFirstOrder } from "react-icons/fa6";

const Timeline = () => {
  return (
    <div class="container bg-white dark:bg-gray-50 mx-auto w-full h-full p-8">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Current"
          contentStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(0, 70, 140)" }}
          iconStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          icon={<FaFirstOrder />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Current - Developing a PoUW model
          </h3>
          <p>
            In the current phase following the launch of AIPG, our focus is on laying the groundwork
            for robust AI services within the blockchain environment. This foundational period is dedicated
            to solidifying the Proof of Useful Work (POUW) infrastructure, fostering the transition of GPU
            miners into AI node operators, and ensuring the stability and security of the network with the integration of validator nodes.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Q1 2024"
          contentStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(0, 70, 140)" }}
          iconStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          icon={<FaFirstOrder />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Q1 2024 - Scaling Up and Enhancing Experiences
          </h3>

          <p>
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
          contentStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(0, 70, 140)" }}
          iconStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          icon={<FaFirstOrder />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Q3 2024 - Transition to Proof of Useful Work (PoUW)
          </h3>
          <p>
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
          contentStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(0, 70, 140)" }}
          iconStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          icon={<FaFirstOrder />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Q4 2024 - Adding trusted nodes and API functionality
          </h3>

          <p>
            users or developers who demand reliability, consistent uptime, and professional-grade API access,
            AIPG offers a paid tier. This premium offering guarantees service levels through contracts with
            secured and trusted nodes, catering to enterprise users and applications where high availability and predictable performance are required.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Q2 2025"
          contentStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(0, 70, 140)" }}
          iconStyle={{ background: "rgb(0, 70, 140)", color: "#fff" }}
          icon={<FaFirstOrder />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Q2 2025 - Interchain AI Service Protocol Layer
          </h3>
          <p>
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

