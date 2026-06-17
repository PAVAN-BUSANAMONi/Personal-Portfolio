import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { Link } from "react-router-dom";
import { AiFillGithub, AiOutlineMail, AiOutlineSend, AiOutlineFileText } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import "../../contact-animations.css";

function getContactApiUrls() {
  const urls = [];
  const configuredUrl = process.env.REACT_APP_CONTACT_API_URL;
  const isLocalBrowser =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (configuredUrl) {
    urls.push(configuredUrl);
  }

  // Use Vercel Serverless Function
  urls.push("/api/contact");

  if (isLocalBrowser) {
    urls.push("http://localhost:5000/api/contact");
  }

  return [...new Set(urls)];
}

async function readJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return {};
  }

  return response.json().catch(() => ({}));
}

function Contact() {
  const contactApiUrls = getContactApiUrls();
  const [formStatus, setFormStatus] = useState({
    type: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setFormStatus({
      type: "",
      message: "",
    });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      need: formData.get("need"),
      priority: formData.get("priority"),
      reply: formData.get("reply"),
      message: formData.get("message"),
    };

    let lastErrorMessage =
      "The contact mail server is not reachable. Start the project with npm start, then try again.";

    for (const apiUrl of contactApiUrls) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await readJsonResponse(response);

        if (response.ok) {
          form.reset();
          setFormStatus({
            type: "success",
            message:
              result.message ||
            "Message sent successfully. PAVAN BUSANAMONi will receive your details, and you will get an auto-response email.",
          });
          setIsSending(false);
          return;
        }

        lastErrorMessage =
          result.message ||
          `Mail server returned ${response.status}. Please try again.`;

        if (result.message) {
          break;
        }
      } catch (error) {
        lastErrorMessage =
          "The contact mail server is not reachable. Start the project with npm start, then try again.";
      }
    }

    setFormStatus({
      type: "error",
      message: lastErrorMessage,
    });
    setIsSending(false);
  };

  return (
    <Container fluid className="contact-section">
      <Particle />
      <Container>
        <Row className="contact-hero-row">
          <Col lg={5} className="contact-intro">
            <p className="section-eyebrow">Contact</p>
            <h1>
              Like my profile? <span className="purple">Let's talk.</span>
            </h1>
            <p>
              Send your name, email, contact number, company or college details,
              and a short message. The submission is delivered to my email inbox
              through my Nodemailer mail server.
            </p>

            <div className="contact-info-grid">
              <a href="mailto:pavan.busanamoni@gmail.com" className="contact-info-card glass-card hover-glow">
                <AiOutlineMail />
                <span>
                  <strong>Email</strong>
                  pavan.busanamoni@gmail.com
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/busanamoni-pavan-3180812b5"
                target="_blank"
                rel="noreferrer"
                className="contact-info-card glass-card hover-glow"
              >
                <FaLinkedinIn />
                <span>
                  <strong>LinkedIn</strong>
                  busanamoni-pavan-3180812b5
                </span>
              </a>
              <a
                href="https://github.com/PAVAN-BUSANAMONi"
                target="_blank"
                rel="noreferrer"
                className="contact-info-card glass-card hover-glow"
              >
                <AiFillGithub />
                <span>
                  <strong>GitHub</strong>
                  PAVAN-BUSANAMONi
                </span>
              </a>
              <Link to="/resume" className="contact-info-card glass-card hover-glow">
                <AiOutlineFileText />
                <span>
                  <strong>Resume</strong>
                  View My Qualifications
                </span>
              </Link>
            </div>
          </Col>

          <Col lg={7}>
            <form
              className="contact-form glass-form"
              action={contactApiUrls[0]}
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="contact-form-header">
                <span>Portfolio Message</span>
                <strong>Priority contact request</strong>
              </div>

              <div className="contact-form-grid">
                <label>
                  Sender Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  Sender Email
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </label>

                <label>
                  Phone / WhatsApp
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 ..."
                    autoComplete="tel"
                  />
                </label>

                <label>
                  Company / College
                  <input
                    type="text"
                    name="company"
                    placeholder="Organization name"
                  />
                </label>

                <label>
                  Contact Need
                  <select name="need" defaultValue="Hiring / internship">
                    <option>Hiring / internship</option>
                    <option>Freelance project</option>
                    <option>Collaboration</option>
                    <option>Technical discussion</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  Priority
                  <select name="priority" defaultValue="High priority">
                    <option>High priority</option>
                    <option>Normal priority</option>
                    <option>Quick question</option>
                    <option>Future opportunity</option>
                  </select>
                </label>

                <label>
                  Preferred Reply
                  <select name="reply" defaultValue="Email">
                    <option>Email</option>
                    <option>Phone</option>
                    <option>LinkedIn</option>
                    <option>WhatsApp</option>
                  </select>
                </label>
              </div>

              <label>
                Message / Opportunity Details
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell me about the opportunity, project, timeline, or anything you want me to know."
                  required
                />
              </label>

              <div className={`validation-container ${formStatus.type ? "show" : ""}`}>
                {formStatus.message && (
                  <p className={`contact-status ${formStatus.type}`}>
                    {formStatus.message}
                  </p>
                )}
              </div>

              <button type="submit" className="contact-submit" disabled={isSending}>
                <AiOutlineSend />{" "}
                {isSending ? "Sending..." : "Send Contact Request"}
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;
