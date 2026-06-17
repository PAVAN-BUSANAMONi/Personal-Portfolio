import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import "../../dashboard-animations.css";

const metrics = [
  { label: "CGPA", value: 8.9, decimals: 1, suffix: "" },
  { label: "Projects Completed", value: 10, decimals: 0, suffix: "+" },
  { label: "Global Certifications", value: 5, decimals: 0, suffix: "+" },
  { label: "Technical Skills", value: 14, decimals: 0, suffix: "+" },
  { label: "Internships", value: 2, decimals: 0, suffix: "+" },
];

function AchievementDashboard() {
  return (
    <Container fluid className="achievement-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <h1 className="project-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
              My <strong className="purple">Impact </strong> Dashboard
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {metrics.map((metric, index) => (
            <Col md={4} lg={2} sm={6} xs={12} key={index} className="mb-4">
              <div className="achievement-card">
                <h2 className="achievement-number">
                  <CountUp
                    start={0}
                    end={metric.value}
                    duration={3}
                    decimals={metric.decimals}
                    suffix={metric.suffix}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </h2>
                <p className="achievement-label">{metric.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default AchievementDashboard;
