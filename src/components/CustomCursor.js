import React, { useEffect, useRef } from "react";
import "../cursor-animations.css";

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  

  // Use refs for mouse coordinates to avoid re-renders
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trailing = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    document.body.classList.add("custom-cursor-active");
    
    // Store states in refs for the animation loop
    const state = { hovering: false, magnetic: false, rect: null };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const clickable = target.closest("a, button, [role='button'], input[type='submit'], .project-btn, .tech-icons, .magnetic-target");
      
      if (clickable) {
        state.hovering = true;
        const rect = clickable.getBoundingClientRect();
        if (rect.width < 250 && rect.height < 100) {
          state.magnetic = true;
          state.rect = rect;
        } else {
          state.magnetic = false;
          state.rect = null;
        }
      } else {
        state.hovering = false;
        state.magnetic = false;
        state.rect = null;
      }
      
      // Update classes directly for lowest latency
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.classList.toggle("cursor-hovering", state.hovering);
        cursorOutlineRef.current.classList.toggle("cursor-magnetic", state.magnetic);
      }
    };

    let rafId;
    const animate = () => {
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      if (state.magnetic && state.rect) {
        targetX = state.rect.left + state.rect.width / 2;
        targetY = state.rect.top + state.rect.height / 2;
      }

      trailing.current.x += (targetX - trailing.current.x) * 0.15;
      trailing.current.y += (targetY - trailing.current.y) * 0.15;

      if (cursorOutlineRef.current) {
        let scale = 1;
        if (state.magnetic) scale = 1.8;
        else if (state.hovering) scale = 1.5;

        cursorOutlineRef.current.style.transform = `translate3d(${trailing.current.x}px, ${trailing.current.y}px, 0) scale(${scale})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorOutlineRef} 
        className="cursor-outline"
      />
      <div ref={cursorDotRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;
