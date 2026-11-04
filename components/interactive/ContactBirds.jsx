"use client";

import { useEffect, useRef, useState } from "react";

// 1. Soft Rose-Pink Bird (from reference)
export function PinkBird({ size = 56, className = "", style = {} }) {
  return (
    <div
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{ width: size, height: size * 0.9, ...style }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        {/* Back Wing (3 rounded feather fingers) */}
        <g className="bird-wing-back-flutter">
          <path
            d="M 46 36 C 42 26 40 16 46 12 C 50 16 48 24 47 30 C 51 22 56 16 61 17 C 62 23 58 30 54 34 C 58 26 64 22 68 25 C 69 31 63 36 54 40 Z"
            fill="#F68EA2"
            stroke="#4A0E4E"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Tail (2 cute rounded tail feathers with accent flecks) */}
        <g>
          <path
            d="M 37 54 C 36 64 34 74 38 80 C 42 78 45 68 47 62 C 48 70 51 77 56 79 C 58 74 56 65 52 57 Z"
            fill="#F68EA2"
            stroke="#4A0E4E"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Decorative flecks on tail */}
          <path d="M 43 65 L 43 70 M 47 62 L 47 67" stroke="#FFE4E6" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Main Body & Head */}
        <path
          d="M 46 58 C 38 58 33 50 35 40 C 37 30 46 24 57 26 C 68 28 75 34 74 43 C 72 52 60 58 46 58 Z"
          fill="#F68EA2"
          stroke="#4A0E4E"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cream Belly Patch */}
        <path
          d="M 52 57 C 58 55 65 50 63 43 C 60 38 55 42 50 48 C 47 52 49 56 52 57 Z"
          fill="#FFF1F2"
          stroke="#4A0E4E"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orange Beak */}
        <path d="M 73 36 L 82 38 L 73 42 Z" fill="#F59E0B" stroke="#4A0E4E" strokeWidth="2.2" strokeLinejoin="round" />

        {/* Smiling Crescent Eye */}
        <path d="M 62 33 C 64 30 68 30 70 33" stroke="#4A0E4E" strokeWidth="2.4" strokeLinecap="round" fill="none" />

        {/* Front Wing (3 rounded fanned feathers pointing back/left) */}
        <g className="bird-wing-front-flutter">
          <path
            d="M 46 44 C 36 41 24 38 18 31 C 23 29 32 34 38 39 C 30 33 21 28 17 22 C 23 22 34 30 40 37 C 32 29 24 23 21 16 C 27 17 38 27 45 36 Z"
            fill="#F68EA2"
            stroke="#4A0E4E"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Feet (2 little dark purple stick feet) */}
        <path d="M 54 58 L 57 65 M 57 58 L 60 65" stroke="#4A0E4E" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 2. Soft Mint-Cyan Blue Bird (from reference)
export function BlueBird({ size = 56, className = "", style = {} }) {
  return (
    <div
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{ width: size, height: size * 0.9, ...style }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        {/* Back Wing (3 rounded feather fingers) */}
        <g className="bird-wing-back-flutter">
          <path
            d="M 54 36 C 58 26 60 16 54 12 C 50 16 52 24 53 30 C 49 22 44 16 39 17 C 38 23 42 30 46 34 C 42 26 36 22 32 25 C 31 31 37 36 46 40 Z"
            fill="#5EEAD4"
            stroke="#1E1B4B"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Tail (3 rounded tail feathers pointing down) */}
        <g>
          <path
            d="M 63 54 C 64 64 66 74 62 80 C 58 78 55 68 53 62 C 52 70 49 77 44 79 C 42 74 44 65 48 57 Z"
            fill="#5EEAD4"
            stroke="#1E1B4B"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Decorative flecks on tail */}
          <path d="M 57 65 L 57 70 M 53 62 L 53 67" stroke="#CCFBF1" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Main Body & Head */}
        <path
          d="M 54 58 C 62 58 67 50 65 40 C 63 30 54 24 43 26 C 32 28 25 34 26 43 C 28 52 40 58 54 58 Z"
          fill="#5EEAD4"
          stroke="#1E1B4B"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cream Belly Patch */}
        <path
          d="M 48 57 C 42 55 35 50 37 43 C 40 38 45 42 50 48 C 53 52 51 56 48 57 Z"
          fill="#F0FDFA"
          stroke="#1E1B4B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orange Beak */}
        <path d="M 27 36 L 18 38 L 27 42 Z" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />

        {/* Smiling Crescent Eye */}
        <path d="M 38 33 C 36 30 32 30 30 33" stroke="#1E1B4B" strokeWidth="2.4" strokeLinecap="round" fill="none" />

        {/* Front Wing (3 rounded fanned feathers pointing back/right) */}
        <g className="bird-wing-front-flutter">
          <path
            d="M 54 44 C 64 41 76 38 82 31 C 77 29 68 34 62 39 C 70 33 79 28 83 22 C 77 22 66 30 60 37 C 68 29 76 23 79 16 C 73 17 62 27 55 36 Z"
            fill="#5EEAD4"
            stroke="#1E1B4B"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Feet (2 little dark stick feet) */}
        <path d="M 46 58 L 43 65 M 43 58 L 40 65" stroke="#1E1B4B" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 3. Companion Birds Feature Pair with Floating Heart
export function CompanionBirdsPair({
  size = 56,
  className = "",
  style = {},
}) {
  return (
    <div
      className={`pointer-events-none select-none inline-flex items-center gap-1.5 sm:gap-3 ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div className="companion-bob-pink">
        <PinkBird size={size} />
      </div>

      {/* Sweet floating heart connecting the companion birds */}
      <div className="relative -mx-1 sm:-mx-2 -mt-3 heart-pop-pulse">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#FB7185"
            stroke="#4A0E4E"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="companion-bob-blue -mt-2">
        <BlueBird size={size * 0.94} />
      </div>
    </div>
  );
}

// 4. Full Page Interactive Flying Companion Birds with Floating Hearts
export default function ContactBirds() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const pinkRef = useRef(null);
  const blueRef = useRef(null);
  const heartsContainerRef = useRef(null);
  const heartsPoolRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    setMounted(true);

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    // Leader: Pink bird physics state
    const pink = {
      x: screenW * 0.22,
      y: screenH * 0.25,
      vx: 1.3,
      vy: 0.65,
      targetX: screenW * 0.58,
      targetY: screenH * 0.42,
      timer: 0,
    };

    // Follower: Blue bird physics state (tethered warmly to the pink bird)
    const blue = {
      x: pink.x + 68,
      y: pink.y + 24,
      vx: 1.2,
      vy: 0.55,
    };

    const handlePointerMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    // Click anywhere on page causes birds to chirp and emit a burst of hearts
    const handleWindowClick = (e) => {
      spawnHeartParticle(pink.x, pink.y, "#FB7185");
      spawnHeartParticle(blue.x, blue.y, "#2DD4BF");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("click", handleWindowClick, { passive: true });

    // Spawn heart particle helper
    const spawnHeartParticle = (x, y, color = "#FB7185") => {
      if (!heartsContainerRef.current || heartsPoolRef.current.length >= 7) return;

      const heartEl = document.createElement("div");
      heartEl.className = "absolute top-0 left-0 pointer-events-none will-change-transform";
      heartEl.style.opacity = "0.9";
      heartEl.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

      heartsContainerRef.current.appendChild(heartEl);

      heartsPoolRef.current.push({
        x: x + 24,
        y: y + 16,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -(Math.random() * 0.7 + 0.9),
        opacity: 0.95,
        scale: 0.75,
        rot: (Math.random() - 0.5) * 22,
        el: heartEl,
      });
    };

    // Main 60FPS Flight Physics Loop
    const loop = () => {
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;

      pink.timer += 1;

      // Update Pink leader target waypoint smoothly
      const distToTarget = Math.hypot(pink.x - pink.targetX, pink.y - pink.targetY);
      if (pink.timer > 190 || distToTarget < 90) {
        pink.targetX = Math.random() * (w - 240) + 120;
        pink.targetY = Math.random() * (h - 220) + 100;
        pink.timer = 0;
      }

      // Steer pink toward target
      const toX = pink.targetX - pink.x;
      const toY = pink.targetY - pink.y;
      const distP = Math.hypot(toX, toY) || 1;
      pink.vx += (toX / distP) * 0.048;
      pink.vy += (toY / distP) * 0.048;

      // Periodically spawn sweet floating heart between companion birds
      if (pink.timer % 65 === 0) {
        const midX = (pink.x + blue.x) / 2;
        const midY = (pink.y + blue.y) / 2;
        const heartColor = Math.random() > 0.5 ? "#FB7185" : "#2DD4BF";
        spawnHeartParticle(midX, midY, heartColor);
      }

      // Cursor interaction: softly flutter upward if user cursor comes near
      if (mouseRef.current.active) {
        const dxM = pink.x - mouseRef.current.x;
        const dyM = pink.y - mouseRef.current.y;
        const distM = Math.hypot(dxM, dyM);
        if (distM < 170 && distM > 1) {
          const force = (1 - distM / 170) * 0.65;
          pink.vx += (dxM / distM) * force * 3.4;
          pink.vy += (dyM / distM) * force * 3.4;

          if (pink.timer % 30 === 0) {
            spawnHeartParticle(pink.x, pink.y, "#FB7185");
          }
        }
      }

      // Speed regulation
      const spdP = Math.hypot(pink.vx, pink.vy);
      const maxSpd = 2.5;
      const minSpd = 0.85;
      if (spdP > maxSpd) {
        pink.vx = (pink.vx / spdP) * maxSpd;
        pink.vy = (pink.vy / spdP) * maxSpd;
      } else if (spdP < minSpd) {
        pink.vx = (pink.vx / spdP) * minSpd;
        pink.vy = (pink.vy / spdP) * minSpd;
      }

      pink.x += pink.vx;
      pink.y += pink.vy;

      // Wrap boundaries smoothly
      const pad = 100;
      if (pink.x < -pad) pink.x = w + pad;
      if (pink.x > w + pad) pink.x = -pad;
      if (pink.y < -pad) pink.y = h + pad;
      if (pink.y > h + pad) pink.y = -pad;

      // Blue bird playfully follows pink bird (companion spring physics)
      const idealOffsetX = Math.sin(pink.timer * 0.04) * 36 + 68;
      const idealOffsetY = Math.cos(pink.timer * 0.035) * 26 + 22;
      const blueTargetX = pink.x + idealOffsetX;
      const blueTargetY = pink.y + idealOffsetY;

      const toBlueX = blueTargetX - blue.x;
      const toBlueY = blueTargetY - blue.y;
      blue.vx += toBlueX * 0.042;
      blue.vy += toBlueY * 0.042;

      blue.vx *= 0.94;
      blue.vy *= 0.94;

      blue.x += blue.vx;
      blue.y += blue.vy;

      // Direct DOM hardware-accelerated transform updates
      const pinkAngle = Math.atan2(pink.vy, pink.vx) * (180 / Math.PI);
      const blueAngle = Math.atan2(blue.vy, blue.vx) * (180 / Math.PI);

      if (pinkRef.current) {
        const isFlipped = Math.cos(pinkAngle * (Math.PI / 180)) < 0;
        const scale = isFlipped ? -1 : 1;
        const tilt = Math.max(-20, Math.min(20, (pink.vy / maxSpd) * 18));
        pinkRef.current.style.transform = `translate3d(${pink.x}px, ${pink.y}px, 0) scaleX(${scale}) rotate(${scale * tilt}deg)`;
      }

      if (blueRef.current) {
        const dxToPink = pink.x - blue.x;
        const scale = dxToPink < 0 ? 1 : -1;
        const tilt = Math.max(-18, Math.min(18, (blue.vy / maxSpd) * 15));
        blueRef.current.style.transform = `translate3d(${blue.x}px, ${blue.y}px, 0) scaleX(${scale}) rotate(${scale * tilt}deg)`;
      }

      // Update floating hearts particles
      for (let i = heartsPoolRef.current.length - 1; i >= 0; i--) {
        const p = heartsPoolRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.014;
        p.scale += 0.005;

        if (p.opacity <= 0) {
          if (p.el && p.el.parentNode) {
            p.el.parentNode.removeChild(p.el);
          }
          heartsPoolRef.current.splice(i, 1);
        } else if (p.el) {
          p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.scale}) rotate(${p.rot}deg)`;
          p.el.style.opacity = p.opacity;
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("click", handleWindowClick);

      // Clean up any remaining hearts from DOM
      if (heartsContainerRef.current) {
        heartsContainerRef.current.innerHTML = "";
      }
      heartsPoolRef.current = [];
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Floating Hearts Particle Container */}
      <div ref={heartsContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* Pink Bird Entity */}
      <div
        ref={pinkRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: "translate3d(15vw, 25vh, 0)" }}
      >
        <PinkBird size={58} />
      </div>

      {/* Blue Bird Entity */}
      <div
        ref={blueRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: "translate3d(22vw, 30vh, 0)" }}
      >
        <BlueBird size={54} />
      </div>
    </div>
  );
}
