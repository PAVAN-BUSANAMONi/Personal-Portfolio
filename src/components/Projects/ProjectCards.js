import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Tilt from "react-parallax-tilt";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";

function ProjectCards(props) {
  const { isFeatured, imgPath, title, description, ghLink, isBlog, demoLink, techStack } = props;

  if (isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2000} className="w-100 mb-5">
          <Card className="featured-project-card">
            <div className="featured-img-container">
              <img src={imgPath} alt="project-img" />
            </div>
            <Card.Body className="featured-body">
              <Card.Title style={{ fontSize: "2rem", fontWeight: "700", color: "#fff", marginBottom: "1rem" }}>{title}</Card.Title>
              <Card.Text style={{ textAlign: "justify", fontSize: "1.1rem", lineHeight: "1.6", color: "rgba(255,255,255,0.8)" }}>
                {description}
              </Card.Text>
              
              {techStack && (
                <div className="tech-stack-container">
                  {techStack.map((tech, index) => (
                    <span key={index} className="tech-pill">{tech}</span>
                  ))}
                </div>
              )}

              <div className="d-flex mt-4" style={{ gap: "15px" }}>
                <Button className="project-btn" href={ghLink} target="_blank">
                  <BsGithub /> {isBlog ? "Blog" : "GitHub"}
                </Button>
                {!isBlog && demoLink && (
                  <Button className="project-btn" href={demoLink} target="_blank">
                    <CgWebsite /> Live Demo
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Tilt>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-100"
    >
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.03} transitionSpeed={1500} style={{ height: "100%" }}>
        <Card className="project-card-view h-100 premium-glass-card">
          <Card.Img variant="top" src={imgPath} alt="card-img" style={{ height: "220px" }} className="card-img-top" />
          <Card.Body className="d-flex flex-column">
            <Card.Title style={{ fontWeight: "600", fontSize: "1.3rem" }}>{title}</Card.Title>
            <Card.Text style={{ textAlign: "justify", flexGrow: 1, color: "rgba(255,255,255,0.7)" }}>
              {description}
            </Card.Text>
            
            {techStack && (
              <div className="tech-stack-container">
                {techStack.map((tech, index) => (
                  <span key={index} className="tech-pill">{tech}</span>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-center mt-auto" style={{ gap: "10px" }}>
              <Button className="project-btn" href={ghLink} target="_blank">
                <BsGithub /> {isBlog ? "Blog" : "GitHub"}
              </Button>
              {!isBlog && demoLink && (
                <Button className="project-btn" href={demoLink} target="_blank">
                  <CgWebsite /> Demo
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </Tilt>
    </motion.div>
  );
}

export default ProjectCards;
