import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import Particle from "../Particle";
import Github from "./Github";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import SkillsGalaxy from "./SkillsGalaxy";
import CareerTimeline from "./CareerTimeline";
import "../../about-animations.css";
import {
  AiOutlineSafetyCertificate,
  AiOutlineTeam,
  AiOutlineTool,
  AiOutlineBug,
} from "react-icons/ai";
import { SiAmazonaws, SiSalesforce, SiOracle, SiGoogle } from "react-icons/si";

function About() {
  return (
    <>
      {" "}
      <Particle />
      <Container fluid className="about-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
              className="about-content-col"
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }} className="reveal-text">
                Know Who <strong className="purple">I'M</strong>
              </h1>
              <Aboutcard />
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "80px", paddingBottom: "50px", position: "relative" }}
              className="about-img reveal-img"
            >
              {/* Floating decorative elements */}
              <div className="about-decorator orb-1"></div>
              <div className="about-decorator orb-2"></div>
              
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={1500} className="about-tilt-wrapper">
                <img src={laptopImg} alt="about" className="img-fluid floating-img" />
              </Tilt>
            </Col>
          </Row>

          <CareerTimeline />

          <h1 className="project-heading" style={{ marginTop: "30px" }}>
            Professional <strong className="purple">Skills Galaxy </strong>
          </h1>
          
          <SkillsGalaxy />

          <Github />
        </Container>
      </Container>
    </>
  );
}

export default About;
