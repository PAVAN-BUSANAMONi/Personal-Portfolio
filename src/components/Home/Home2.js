import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/myAvatar.png";
import Tilt from "react-parallax-tilt";
import AchievementDashboard from "./AchievementDashboard";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a Computer Science Engineering student at{" "}
              <b className="purple">KL University, Vijayawada</b>, passionate
              about learning new technologies and building real-world
              applications.
              <br />
              <br />
              I'm proficient in
              <i>
                <b className="purple">
                  {" "}
                  Python, Java, C, JavaScript, and React{" "}
                </b>
              </i>
              — and I enjoy working across both backend and frontend stacks.
              <br />
              <br />
              My key areas of interest include developing
              <i>
                <b className="purple">
                  {" "}
                  Full Stack Web Applications, DevOps Pipelines,{" "}
                </b>
              </i>
              and exploring new ways to solve real-world problems through
              technology.
              <br />
              <br />
              I love building projects with
              <b className="purple"> Spring Boot </b> and{" "}
              <b className="purple">Node.js</b> on the backend, and{" "}
              <i>
                <b className="purple">React.js</b> and{" "}
                <b className="purple">Next.js</b>
              </i>{" "}
              on the frontend.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" style={{ borderRadius: "50%" }} />
            </Tilt>
          </Col>
        </Row>
      </Container>
      
      {/* Achievement Dashboard Rendered Directly Below */}
      <AchievementDashboard />
    </Container>
  );
}
export default Home2;
