import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import Contact from "./components/Contact/Contact";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import PageWrapper from "./components/PageWrapper";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "./animation-styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

// We extract Routes into a component so we can use useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence exitBeforeEnter={true}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/project" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <Router>
        <Analytics />
        <ScrollProgress />
        <CustomCursor />
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <Navbar />
          <ScrollToTop />
          <AnimatedRoutes />
          <Footer />
        </div>
      </Router>
    </SmoothScroll>
  );
}

export default App;
