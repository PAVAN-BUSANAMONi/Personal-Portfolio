import React, { useState, useEffect } from "react";
import "../preloader-animations.css";

function Pre({ load }) {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Loading Portfolio...",
    "Loading Projects...",
    "Loading Experience..."
  ];

  useEffect(() => {
    if (!load) return;
    
    // Cycle text every 700ms
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 700);

    return () => clearInterval(interval);
  }, [load, loadingTexts.length]);

  return (
    <div id={load ? "preloader" : "preloader-none"} className="premium-preloader">
      <div className="preloader-content">
        <h1 className="preloader-name">PAVAN BUSANAMONI</h1>
        
        <div className="preloader-progress-container">
          <div className="preloader-progress-bar"></div>
        </div>
        
        <div className="preloader-text-container">
          <p className="preloader-text" key={textIndex}>
            {loadingTexts[textIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pre;
