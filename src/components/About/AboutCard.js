import React from "react";
import Card from "react-bootstrap/Card";
import Tilt from "react-parallax-tilt";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="about-tilt-wrapper">
      <Card className="quote-card-view premium-glass-card">
        <Card.Body>
          <div className="about-story">
            
            <div className="story-section reveal-1">
              <h3 className="story-heading">The Journey</h3>
              <p>
                Hi everyone! I'm <span className="purple font-weight-bold">PAVAN BUSANAMONi</span> from <span className="purple">Vijayawada, India</span>. 
                I'm currently a 3rd year <span className="purple">B.Tech CSE</span> student at <span className="purple">KL University</span>.
              </p>
              <p>
                I am deeply passionate about engineering robust solutions, learning emerging technologies, and building scalable real-world applications. My foundation is built on strong problem-solving skills across programming, modern web development, and database architecture.
              </p>
            </div>

            <div className="story-section reveal-2">
              <h3 className="story-heading">Education</h3>
              <ul className="education-list">
                <li><span className="edu-icon">🎓</span> <strong>B.Tech CSE</strong>, KL University (2024–2027) <span className="edu-score">— CGPA: 8.9</span></li>
                <li><span className="edu-icon">🎓</span> <strong>Diploma</strong>, Govt. Polytechnic Gadwal (2022–2024) <span className="edu-score">— 70%</span></li>
                <li><span className="edu-icon">🎓</span> <strong>Schooling</strong>, ZPHS Kalwarala <span className="edu-score">— 10 GPA</span></li>
              </ul>
            </div>

            <div className="story-section reveal-3">
              <h3 className="story-heading">Interests</h3>
              <p>Outside of coding, I engage in activities that keep me creative, strategic, and inspired:</p>
              <ul className="interests-list">
                <li className="about-activity">
                  <ImPointRight className="purple" /> Reading Tech Articles 📖
                </li>
                <li className="about-activity">
                  <ImPointRight className="purple" /> Playing Cricket & Chess 🏏♟️
                </li>
                <li className="about-activity">
                  <ImPointRight className="purple" /> Gaming 🎮
                </li>
                <li className="about-activity">
                  <ImPointRight className="purple" /> Solving Rubik's Cube 🧩
                </li>
              </ul>
            </div>

            <div className="story-footer reveal-4">
              <p className="quote-text">
                "Strive to build things that make a difference!"
              </p>
              <footer className="blockquote-footer text-right">Pavan</footer>
            </div>

          </div>
        </Card.Body>
      </Card>
    </Tilt>
  );
}

export default AboutCard;
