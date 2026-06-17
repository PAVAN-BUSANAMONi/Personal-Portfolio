import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdOutlineSchool, MdWork, MdOutlineEmojiEvents } from "react-vertical-timeline-component";
import { FaGraduationCap, FaTrophy, FaBriefcase, FaCode } from "react-icons/fa";
import { SiAmazonaws, SiSalesforce, SiOracle, SiGoogle } from "react-icons/si";

import "../../timeline-animations.css";

function CareerTimeline() {
  return (
    <div className="career-timeline-container">
      <h1 className="project-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
        My <strong className="purple">Career Journey</strong>
      </h1>

      <VerticalTimeline lineColor="rgba(0, 242, 254, 0.3)">
        {/* Certification: Oracle */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
          date="2025"
          iconStyle={{ background: "#050505", color: "#f80000", border: "2px solid #f80000", boxShadow: "0 0 15px rgba(248, 0, 0, 0.5)" }}
          icon={<SiOracle />}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#f80000" }}>Oracle Certified Associate</h3>
          <h4 className="vertical-timeline-element-subtitle">Cloud Infrastructure Architect Associate</h4>
          <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Demonstrated core expertise in deploying and managing cloud infrastructure using Oracle technologies.
          </p>
        </VerticalTimelineElement>

        {/* Certification: Salesforce */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
          date="2024"
          iconStyle={{ background: "#050505", color: "#00a1e0", border: "2px solid #00a1e0", boxShadow: "0 0 15px rgba(0, 161, 224, 0.5)" }}
          icon={<SiSalesforce />}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#00a1e0" }}>Salesforce Certified</h3>
          <h4 className="vertical-timeline-element-subtitle">AI Associate</h4>
          <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Validated knowledge in AI concepts, data management, and ethical AI practices within the Salesforce ecosystem.
          </p>
        </VerticalTimelineElement>

        {/* Internship: EduSkills */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
          date="2024"
          iconStyle={{ background: "#050505", color: "#b026ff", border: "2px solid #b026ff", boxShadow: "0 0 15px rgba(176, 38, 255, 0.5)" }}
          icon={<FaBriefcase />}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#b026ff" }}>EduSkills AP Internship</h3>
          <h4 className="vertical-timeline-element-subtitle">Short-Term Intern (120 Hours)</h4>
          <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Completed intensive, hands-on training and real-world project development in modern web technologies.
          </p>
        </VerticalTimelineElement>

        {/* Education: B.Tech */}
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          contentStyle={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
          date="2024 - 2027"
          iconStyle={{ background: "#050505", color: "#00f2fe", border: "2px solid #00f2fe", boxShadow: "0 0 15px rgba(0, 242, 254, 0.5)" }}
          icon={<FaGraduationCap />}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#00f2fe" }}>B.Tech Computer Science</h3>
          <h4 className="vertical-timeline-element-subtitle">KL University</h4>
          <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            CGPA: 8.9. Leading academic projects and building a strong foundation in Data Structures, AI, and Full-Stack Engineering.
          </p>
        </VerticalTimelineElement>

        {/* Internship: Google */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
          date="2023"
          iconStyle={{ background: "#050505", color: "#fbbc05", border: "2px solid #fbbc05", boxShadow: "0 0 15px rgba(251, 188, 5, 0.5)" }}
          icon={<SiGoogle />}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#fbbc05" }}>Google Generative AI</h3>
          <h4 className="vertical-timeline-element-subtitle">Virtual Internship (AICTE Verified)</h4>
          <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Explored Large Language Models, prompt engineering, and GenAI integration into software products.
          </p>
        </VerticalTimelineElement>

        {/* Education: Diploma */}
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          contentStyle={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
          date="2022 - 2024"
          iconStyle={{ background: "#050505", color: "#00f2fe", border: "2px solid #00f2fe", boxShadow: "0 0 15px rgba(0, 242, 254, 0.5)" }}
          icon={<FaGraduationCap />}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#00f2fe" }}>Diploma in Engineering</h3>
          <h4 className="vertical-timeline-element-subtitle">Govt. Polytechnic Gadwal</h4>
          <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Achieved 70%. Gained core technical knowledge and practical programming experience.
          </p>
        </VerticalTimelineElement>

        {/* Future Goal */}
        <VerticalTimelineElement
          iconStyle={{ background: "#00f2fe", color: "#fff", boxShadow: "0 0 20px rgba(0, 242, 254, 0.8)" }}
          icon={<FaCode />}
        />
      </VerticalTimeline>
    </div>
  );
}

export default CareerTimeline;
