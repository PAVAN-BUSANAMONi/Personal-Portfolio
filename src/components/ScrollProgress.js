import React from "react";
import { motion, useViewportScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useViewportScroll();
  
  // Add a spring physics effect to make it buttery smooth
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
