import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import jobportal from "../../Assets/Projects/jobportal.png";
import vibeguru from "../../Assets/Projects/vibeguru.png";
import garageservice from "../../Assets/Projects/garageservice.png";
import bankmanagement from "../../Assets/Projects/bankmanagement.png";
import smartagriculture from "../../Assets/Projects/leaf.png";
import "../../project-animations.css";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white", marginBottom: "40px", fontSize: "1.2rem" }}>
          Here are a few projects I've worked on recently.
        </p>

        {/* Featured Project */}
        <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
          <Col md={12}>
            <ProjectCard
              isFeatured={true}
              imgPath={smartagriculture}
              isBlog={false}
              title="Smart Agriculture Assistant"
              description="An AI-powered agriculture platform built to empower farmers. Features include machine-learning crop recommendations, real-time disease detection, localized weather insights, live market prices, profit estimation, fertilizer calculation, and a comprehensive suite of government scheme alerts. Built with full multilingual support for diverse agricultural communities."
              techStack={["React", "TypeScript", "Express", "MongoDB", "Gemini AI", "Socket.IO"]}
              ghLink="https://github.com/BUSANAMONI-PAVAN/Smart-Agriculture-Assistant.git"
            />
          </Col>
        </Row>

        {/* Grid Projects */}
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={6} lg={4} className="project-card mb-4">
            <ProjectCard
              imgPath={jobportal}
              isBlog={false}
              title="Job Portal Web App"
              description="A full-stack job portal application with robust authentication, role-based access control, and dynamic job listings. Streamlines the hiring process for both applicants and employers."
              techStack={["React", "Spring Boot", "MySQL", "JWT"]}
              ghLink="https://github.com/BUSANAMONI-PAVAN/WebAppProject.git"
            />
          </Col>

          <Col md={6} lg={4} className="project-card mb-4">
            <ProjectCard
              imgPath={vibeguru}
              isBlog={false}
              title="Vibe Guru — Music Streaming"
              description="A seamless music streaming application that allows users to upload songs, curate personal playlists, and enjoy a modern, uninterrupted listening experience with a custom audio player UI."
              techStack={["React", "Node.js", "MongoDB", "Express"]}
              ghLink="https://github.com/BUSANAMONI-PAVAN/Vibe-Guru-Music-Streaming.git"
            />
          </Col>

          <Col md={6} lg={4} className="project-card mb-4">
            <ProjectCard
              imgPath={garageservice}
              isBlog={false}
              title="Garage Service Booking"
              description="A service booking platform designed for garages, featuring automated slot booking, real-time contact integration using the Twilio API, and a clean, highly responsive dashboard interface."
              techStack={["Next.js", "TypeScript", "Tailwind CSS", "Twilio"]}
              ghLink="https://github.com/BUSANAMONI-PAVAN/garage-services.me.git"
            />
          </Col>

          <Col md={6} lg={4} className="project-card mb-4">
            <ProjectCard
              imgPath={bankmanagement}
              isBlog={false}
              title="Bank Management System"
              description="A comprehensive bank management and core banking system handling account creation, secure fund transfers, balance enquiries, and immutable transaction history logging."
              techStack={["HTML/JS", "Java", "MySQL", "JDBC"]}
              ghLink="https://github.com/BUSANAMONI-PAVAN"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
