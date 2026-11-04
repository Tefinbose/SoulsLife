"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveBackground() {
  const spotlightRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hueShift, setHueShift] = useState(0);

  useEffect(() => {
    // Initial center position
    if (typeof window !== "undefined") {
      posRef.current.x = window.innerWidth / 2;
      posRef.current.y = window.innerHeight / 2;
      posRef.current.targetX = window.innerWidth / 2;
      posRef.current.targetY = window.innerHeight / 2;
    }

    let animationFrameId;

    const handlePointerMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      // Calculate hue shift based on cursor position (-20deg to +20deg)
      const ratioX = e.clientX / window.innerWidth;
      setHueShift(Math.round((ratioX - 0.5) * 40));
    };

    const animate = () => {
      // Smooth lerp (linear interpolation) for fluid following
      posRef.current.x += (posRef.current.targetX - posRef.current.x) * 0.08;
      posRef.current.y += (posRef.current.targetY - posRef.current.y) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      style={{
        background: "radial-gradient(120% 120% at 50% 0%, #FFFFFF 0%, #FAF7FC 50%, #F5F0FA 100%)",
      }}
    >
      {/* 1. Interactive Cursor-Following Luminous Aurora Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -ml-[300px] -mt-[300px] w-[600px] h-[600px] rounded-full will-change-transform opacity-60"
        style={{
          background: `radial-gradient(circle, 
            rgba(163, 36, 143, 0.18) 0%, 
            rgba(13, 85, 174, 0.16) 45%, 
            rgba(240, 246, 255, 0.05) 75%, 
            transparent 100%)`,
          filter: "blur(60px)",
          filterHueRotate: `${hueShift}deg`,
          transition: "filter 0.3s ease",
        }}
      />

      {/* 2. Secondary Offset Aura (Blue Spotlight) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-40 will-change-transform"
        style={{
          top: "20%",
          right: "5%",
          background: "radial-gradient(circle, rgba(13, 85, 174, 0.18) 0%, rgba(163, 36, 143, 0.12) 60%, transparent 100%)",
          filter: "blur(90px)",
          animation: "orbFloat1 20s ease-in-out infinite alternate",
        }}
      />

      {/* 3. Ambient Breathing Magenta Orb (Left) */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full opacity-45 will-change-transform"
        style={{
          bottom: "10%",
          left: "-100px",
          background: "radial-gradient(circle, rgba(163, 36, 143, 0.20) 0%, rgba(253, 242, 249, 0.3) 60%, transparent 100%)",
          filter: "blur(100px)",
          animation: "orbFloat2 24s ease-in-out infinite alternate",
        }}
      />

      {/* 4. Subtle Ambient Ethereal Glow at Center */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full opacity-35 will-change-transform"
        style={{
          top: "55%",
          right: "20%",
          background: "radial-gradient(circle, rgba(13, 85, 174, 0.15) 0%, rgba(163, 36, 143, 0.12) 50%, transparent 100%)",
          filter: "blur(80px)",
          animation: "orbFloat3 18s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

