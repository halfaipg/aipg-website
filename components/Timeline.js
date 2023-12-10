"use client";
import { inView } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaStar } from "react-icons/fa6";

const Timeline = () => {
  return (
    <div class="container bg-gray-50 mx-auto w-full h-full p-8 dark:bg-transparent">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="Phase 1"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<FaStar />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Establishing the Foundation with PoW
          </h3>
          <p>
            At its inception, AIPG prioritizes the launch of a dependable Proof
            of Work (PoW) blockchain network to ensure integrity and security.
            This initial phase also sees the introduction of fundamental AI
            services, free LLM inference, and AI art generation, to gather early
            support and encourage widespread participation within the fledgling
            AIPG community.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="Phase 2"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<FaStar />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Scaling Up and Enhancing Experiences
          </h3>

          <p>
            Building upon the stable PoW foundation, AIPG begins expanding its
            features to include the much-anticipated NFT AI Gallery and
            marketplace. At the same time, the platform evolves with significant
            UX improvements and resilient smart contracts, preparing for the
            gradual transition away from PoW towards a more sustainable
            consensus mechanism.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="Phase 3"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<FaStar />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Transition to Proof of Useful Work (PoUW)
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
          date="Phase 4"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<FaStar />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Infrastructure Optimization and Sustainable Practices
          </h3>

          <p>
            With the greener PoUW in place, AIPG doubles down on optimizing its
            blockchain infrastructure to support scalability in the wake of
            expanding services. This phase underscores the platform's commitment
            to sustainability and the thoughtful integration of environmentally
            conscious practices into its operations.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Phase 5"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<FaStar />}
          visible={inView}
        >
          <h3 className="vertical-timeline-element-title">
            Building Authority and Commencing Education
          </h3>
          <p>
            AIPG, now a more sustainable and efficient platform, focuses on
            reinforcing its leadership position in AI and blockchain. It
            achieves this through pioneering R&D, launching educational
            initiatives, and increasing community-driven development,
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
