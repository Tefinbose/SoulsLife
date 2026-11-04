"use client";

import { useEffect, useRef, useState } from "react";

const BUTTERFLY_CONFIGS = [
  {
    id: "amethyst",
    name: "Royal Amethyst",
    gradientId: "bfly-amethyst",
    // Base, Mid, Luminous edge, Accent vein
    colors: {
      base: "#4A0E4E",
      primary: "#A3248F",
      secondary: "#E879F9",
      highlight: "#FDF2F9",
      vein: "rgba(255, 230, 250, 0.75)",
      pearl: "#FFFFFF",
      jewel: "#FBBF24",
    },
    sparkleColor: "#F472B6",
    size: 46,
    baseSpeed: 1.35,
    flapDuration: "0.34s",
  },
  {
    id: "sunset",
    name: "Golden Swallowtail",
    gradientId: "bfly-sunset",
    colors: {
      base: "#78350F",
      primary: "#F59E0B",
      secondary: "#FB923C",
      highlight: "#FEF08A",
      vein: "rgba(254, 243, 199, 0.8)",
      pearl: "#FFFFFF",
      jewel: "#EC4899",
    },
    sparkleColor: "#FBBF24",
    size: 40,
    baseSpeed: 1.6,
    flapDuration: "0.30s",
  },
  {
    id: "emerald",
    name: "Mystic Emerald",
    gradientId: "bfly-emerald",
    colors: {
      base: "#064E3B",
      primary: "#059669",
      secondary: "#2DD4BF",
      highlight: "#CCFBF1",
      vein: "rgba(204, 251, 241, 0.75)",
      pearl: "#FFFFFF",
      jewel: "#A7F3D0",
    },
    sparkleColor: "#34D399",
    size: 42,
    baseSpeed: 1.45,
    flapDuration: "0.32s",
  },
  {
    id: "violet",
    name: "Celestial Lavender",
    gradientId: "bfly-violet",
    colors: {
      base: "#2E1065",
      primary: "#7C3AED",
      secondary: "#A78BFA",
      highlight: "#EDE9FE",
      vein: "rgba(237, 233, 254, 0.75)",
      pearl: "#FFFFFF",
      jewel: "#F43F5E",
    },
    sparkleColor: "#C084FC",
    size: 36,
    baseSpeed: 1.8,
    flapDuration: "0.28s",
  },
];

export default function FlyingButterflies() {
  const containerRef = useRef(null);
  const butterfliesRef = useRef([]);
  const sparklesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Distribute butterflies gracefully across the screen
    butterfliesRef.current = BUTTERFLY_CONFIGS.map((cfg, idx) => {
      const startX = (width / (BUTTERFLY_CONFIGS.length + 1)) * (idx + 1) + (Math.random() * 60 - 30);
      const startY = height * 0.2 + idx * height * 0.18 + (Math.random() * 40 - 20);
      const angle = Math.random() * Math.PI * 2;

      return {
        ...cfg,
        x: startX,
        y: startY,
        vx: Math.cos(angle) * cfg.baseSpeed,
        vy: Math.sin(angle) * cfg.baseSpeed,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        rotation: 0,
        tilt: 0,
        bobPhase: Math.random() * Math.PI * 2,
        turnTimer: Math.random() * 120,
        element: null,
      };
    });

    const handlePointerMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    let lastSparkleTime = 0;

    const loop = (timestamp) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const shouldDropSparkle = timestamp - lastSparkleTime > 110;

      butterfliesRef.current.forEach((b) => {
        b.turnTimer += 1;
        b.bobPhase += 0.085;

        // Waypoint navigation with gentle organic curves
        if (b.turnTimer > 170 || Math.hypot(b.x - b.targetX, b.y - b.targetY) < 70) {
          b.targetX = Math.random() * (w - 140) + 70;
          b.targetY = Math.random() * (h - 140) + 70;
          b.turnTimer = 0;
        }

        // Steer toward target waypoint
        const toTargetX = b.targetX - b.x;
        const toTargetY = b.targetY - b.y;
        const distToTarget = Math.hypot(toTargetX, toTargetY) || 1;

        b.vx += (toTargetX / distToTarget) * 0.048;
        b.vy += (toTargetY / distToTarget) * 0.048;

        // Interactive gentle cursor repulsion (flutter away when mouse nears)
        let isNearMouse = false;
        if (mouseRef.current.active) {
          const dxMouse = b.x - mouseRef.current.x;
          const dyMouse = b.y - mouseRef.current.y;
          const distMouse = Math.hypot(dxMouse, dyMouse);

          if (distMouse < 150 && distMouse > 1) {
            isNearMouse = true;
            const force = (1 - distMouse / 150) * 0.55;
            b.vx += (dxMouse / distMouse) * force * 3.5;
            b.vy += (dyMouse / distMouse) * force * 3.5;
          }
        }

        // Speed limit regulation
        const speed = Math.hypot(b.vx, b.vy);
        const maxSpeed = b.baseSpeed * 2.3;
        const minSpeed = b.baseSpeed * 0.75;
        if (speed > maxSpeed) {
          b.vx = (b.vx / speed) * maxSpeed;
          b.vy = (b.vy / speed) * maxSpeed;
        } else if (speed < minSpeed) {
          b.vx = (b.vx / speed) * minSpeed;
          b.vy = (b.vy / speed) * minSpeed;
        }

        // Update positions
        b.x += b.vx;
        b.y += b.vy;

        // Aerodynamic vertical bobbing imitating wing lift
        const bob = Math.sin(b.bobPhase) * 1.8;
        const drawX = b.x - (b.vy / speed) * bob;
        const drawY = b.y + (b.vx / speed) * bob;

        // Screen boundary wrap-around
        const pad = 70;
        if (b.x < -pad) b.x = w + pad;
        if (b.x > w + pad) b.x = -pad;
        if (b.y < -pad) b.y = h + pad;
        if (b.y > h + pad) b.y = -pad;

        // Calculate heading angle
        const targetAngle = Math.atan2(b.vy, b.vx) * (180 / Math.PI) + 90;

        // Angle interpolation
        let diff = targetAngle - b.rotation;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        b.rotation += diff * 0.085;

        // Aerodynamic banking tilt
        b.tilt = Math.max(-20, Math.min(20, diff * 1.6));

        // GPU composite layer transform update
        if (b.element) {
          b.element.style.transform = `translate3d(${drawX}px, ${drawY}px, 0) rotate(${b.rotation}deg) skewX(${b.tilt * 0.28}deg)`;
        }

        // Fairy stardust trail
        if (shouldDropSparkle && (Math.random() < 0.65 || isNearMouse)) {
          createSparkle(drawX, drawY, b.sparkleColor);
        }
      });

      if (shouldDropSparkle) lastSparkleTime = timestamp;

      // Update sparkles
      updateSparkles();

      animFrameRef.current = requestAnimationFrame(loop);
    };

    const createSparkle = (x, y, color) => {
      if (!containerRef.current || sparklesRef.current.length > 28) return;
      const el = document.createElement("div");
      el.className = "butterfly-stardust";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.backgroundColor = color;
      el.style.boxShadow = `0 0 8px 1px ${color}, 0 0 2px #FFFFFF`;
      containerRef.current.appendChild(el);

      sparklesRef.current.push({
        el,
        life: 1.0,
        decay: 0.03 + Math.random() * 0.02,
        x,
        y: y + (Math.random() - 0.5) * 4,
        driftX: (Math.random() - 0.5) * 0.9,
      });
    };

    const updateSparkles = () => {
      const remaining = [];
      for (const s of sparklesRef.current) {
        s.life -= s.decay;
        s.x += s.driftX;
        s.y += 0.55;
        if (s.life > 0 && s.el) {
          s.el.style.opacity = s.life;
          s.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) scale(${s.life * 1.15})`;
          remaining.push(s);
        } else if (s.el && s.el.parentNode) {
          s.el.parentNode.removeChild(s.el);
        }
      }
      sparklesRef.current = remaining;
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      sparklesRef.current.forEach((s) => {
        if (s.el && s.el.parentNode) s.el.parentNode.removeChild(s.el);
      });
      sparklesRef.current = [];
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: butterflyStyles }} />
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      >
        {BUTTERFLY_CONFIGS.map((cfg, idx) => (
          <div
            key={cfg.id}
            ref={(node) => {
              if (butterfliesRef.current[idx]) {
                butterfliesRef.current[idx].element = node;
              }
            }}
            className="butterfly-unit absolute top-0 left-0 will-change-transform"
            style={{ width: cfg.size, height: cfg.size }}
          >
            <div
              className="butterfly-3d-stage relative flex items-center justify-center w-full h-full"
              style={{ perspective: 600 }}
            >
              {/* Left Wing (Natural 3D Flap + Glide Cycle) */}
              <div
                className="butterfly-wing-left absolute right-1/2 top-0 h-full origin-right"
                style={{
                  width: cfg.size * 0.54,
                  animation: `butterflyFlapGlideLeft ${cfg.flapDuration} ease-in-out infinite alternate`,
                }}
              >
                <svg
                  viewBox="0 0 50 60"
                  className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)] overflow-visible"
                >
                  <defs>
                    {/* Multi-stage iridescent gradient */}
                    <linearGradient id={`bfly-left-grad-${cfg.id}`} x1="100%" y1="50%" x2="0%" y2="50%">
                      <stop offset="0%" stopColor={cfg.colors.base} stopOpacity="0.96" />
                      <stop offset="40%" stopColor={cfg.colors.primary} stopOpacity="0.94" />
                      <stop offset="80%" stopColor={cfg.colors.secondary} stopOpacity="0.90" />
                      <stop offset="100%" stopColor={cfg.colors.highlight} stopOpacity="0.95" />
                    </linearGradient>

                    {/* Radial Wing Jewel Shimmer */}
                    <radialGradient id={`bfly-left-shimmer-${cfg.id}`} cx="70%" cy="40%" r="55%">
                      <stop offset="0%" stopColor={cfg.colors.jewel} stopOpacity="0.8" />
                      <stop offset="50%" stopColor={cfg.colors.primary} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={cfg.colors.base} stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Forewing: Organic Arched Contour with Soft Scalloping */}
                  <path
                    d="M48 26 C42 12, 22 2, 8 6 C2 9, 1 18, 10 24 C2 28, 4 36, 20 34 C36 34, 44 30, 48 26 Z"
                    fill={`url(#bfly-left-grad-${cfg.id})`}
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="0.85"
                    strokeLinejoin="round"
                  />

                  {/* Luminous Core Shimmer */}
                  <ellipse cx="32" cy="20" rx="12" ry="8" fill={`url(#bfly-left-shimmer-${cfg.id})`} />

                  {/* Intricate Wing Vein Lattice */}
                  <path
                    d="M44 26 C36 18, 22 12, 12 10 M38 24 C30 18, 16 18, 8 20 M42 26 C34 26, 22 28, 16 31 M30 20 C24 14, 18 12, 14 11"
                    stroke={cfg.colors.vein}
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Scalloped Margin Velvet Edge */}
                  <path
                    d="M8 6 C2 9, 1 18, 10 24 C2 28, 4 36, 20 34"
                    stroke="rgba(20, 10, 30, 0.45)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Delicate Pearl Luminescence Dots */}
                  <circle cx="8" cy="7" r="1.1" fill={cfg.colors.pearl} />
                  <circle cx="3" cy="13" r="0.9" fill={cfg.colors.pearl} />
                  <circle cx="4" cy="19" r="0.9" fill={cfg.colors.pearl} />
                  <circle cx="9" cy="24" r="0.8" fill={cfg.colors.pearl} />
                  <circle cx="5" cy="30" r="0.8" fill={cfg.colors.pearl} />
                  <circle cx="12" cy="34" r="0.9" fill={cfg.colors.pearl} />

                  {/* Hindwing: Swallowtail Scalloped Extension */}
                  <path
                    d="M48 30 C40 34, 16 38, 18 48 C19 54, 25 56, 28 50 C30 46, 33 46, 38 42 C44 38, 46 34, 48 30 Z"
                    fill={`url(#bfly-left-grad-${cfg.id})`}
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="0.85"
                    strokeLinejoin="round"
                  />

                  {/* Hindwing Veins */}
                  <path
                    d="M42 34 C34 40, 24 44, 20 48 M40 36 C34 42, 28 48, 26 51"
                    stroke={cfg.colors.vein}
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Hindwing Pearl Dots & Jewel Spot */}
                  <circle cx="19" cy="48" r="1" fill={cfg.colors.pearl} />
                  <circle cx="23" cy="53" r="0.85" fill={cfg.colors.pearl} />
                  <circle cx="30" cy="48" r="1.4" fill={cfg.colors.jewel} />
                  <circle cx="30" cy="48" r="0.6" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Right Wing (Natural 3D Flap + Glide Cycle) */}
              <div
                className="butterfly-wing-right absolute left-1/2 top-0 h-full origin-left"
                style={{
                  width: cfg.size * 0.54,
                  animation: `butterflyFlapGlideRight ${cfg.flapDuration} ease-in-out infinite alternate`,
                }}
              >
                <svg
                  viewBox="0 0 50 60"
                  className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)] overflow-visible"
                >
                  <defs>
                    <linearGradient id={`bfly-right-grad-${cfg.id}`} x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor={cfg.colors.base} stopOpacity="0.96" />
                      <stop offset="40%" stopColor={cfg.colors.primary} stopOpacity="0.94" />
                      <stop offset="80%" stopColor={cfg.colors.secondary} stopOpacity="0.90" />
                      <stop offset="100%" stopColor={cfg.colors.highlight} stopOpacity="0.95" />
                    </linearGradient>

                    <radialGradient id={`bfly-right-shimmer-${cfg.id}`} cx="30%" cy="40%" r="55%">
                      <stop offset="0%" stopColor={cfg.colors.jewel} stopOpacity="0.8" />
                      <stop offset="50%" stopColor={cfg.colors.primary} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={cfg.colors.base} stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Forewing */}
                  <path
                    d="M2 26 C8 12, 28 2, 42 6 C48 9, 49 18, 40 24 C48 28, 46 36, 30 34 C14 34, 6 30, 2 26 Z"
                    fill={`url(#bfly-right-grad-${cfg.id})`}
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="0.85"
                    strokeLinejoin="round"
                  />

                  {/* Luminous Core Shimmer */}
                  <ellipse cx="18" cy="20" rx="12" ry="8" fill={`url(#bfly-right-shimmer-${cfg.id})`} />

                  {/* Veins */}
                  <path
                    d="M6 26 C14 18, 28 12, 38 10 M12 24 C20 18, 34 18, 42 20 M8 26 C16 26, 28 28, 34 31 M20 20 C26 14, 32 12, 36 11"
                    stroke={cfg.colors.vein}
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Scalloped Margin Velvet Edge */}
                  <path
                    d="M42 6 C48 9, 49 18, 40 24 C48 28, 46 36, 30 34"
                    stroke="rgba(20, 10, 30, 0.45)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Pearls */}
                  <circle cx="42" cy="7" r="1.1" fill={cfg.colors.pearl} />
                  <circle cx="47" cy="13" r="0.9" fill={cfg.colors.pearl} />
                  <circle cx="46" cy="19" r="0.9" fill={cfg.colors.pearl} />
                  <circle cx="41" cy="24" r="0.8" fill={cfg.colors.pearl} />
                  <circle cx="45" cy="30" r="0.8" fill={cfg.colors.pearl} />
                  <circle cx="38" cy="34" r="0.9" fill={cfg.colors.pearl} />

                  {/* Hindwing */}
                  <path
                    d="M2 30 C10 34, 34 38, 32 48 C31 54, 25 56, 22 50 C20 46, 17 46, 12 42 C6 38, 4 34, 2 30 Z"
                    fill={`url(#bfly-right-grad-${cfg.id})`}
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="0.85"
                    strokeLinejoin="round"
                  />

                  {/* Hindwing Veins */}
                  <path
                    d="M8 34 C16 40, 26 44, 30 48 M10 36 C16 42, 22 48, 24 51"
                    stroke={cfg.colors.vein}
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Pearls & Jewel Spot */}
                  <circle cx="31" cy="48" r="1" fill={cfg.colors.pearl} />
                  <circle cx="27" cy="53" r="0.85" fill={cfg.colors.pearl} />
                  <circle cx="20" cy="48" r="1.4" fill={cfg.colors.jewel} />
                  <circle cx="20" cy="48" r="0.6" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Slender Segmented Torso & Curving Antennae */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{ width: 8, height: cfg.size * 0.72 }}
              >
                <svg viewBox="0 0 12 36" className="w-full h-full overflow-visible">
                  {/* Abdomen segments */}
                  <ellipse cx="6" cy="24" rx="1.6" ry="7" fill="#1A102A" />
                  <ellipse cx="6" cy="18" rx="1.9" ry="3.5" fill="#2D124D" />
                  <ellipse cx="6" cy="12" rx="2.1" ry="3" fill="#1A102A" />
                  <ellipse cx="6" cy="6.5" rx="1.6" ry="2" fill="#3B0764" />

                  {/* Left Antenna with Nectar Pearl */}
                  <path
                    d="M5 5 C3 2, 0 0, -3 1"
                    stroke="#1A102A"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="-3" cy="1" r="0.9" fill={cfg.colors.jewel} />

                  {/* Right Antenna with Nectar Pearl */}
                  <path
                    d="M7 5 C9 2, 12 0, 15 1"
                    stroke="#1A102A"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="15" cy="1" r="0.9" fill={cfg.colors.jewel} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const butterflyStyles = `
.butterfly-3d-stage {
  transform-style: preserve-3d;
}

/* Natural 3D Flap with periodic micro-pause */
@keyframes butterflyFlapGlideLeft {
  0% {
    transform: rotateY(0deg) translateZ(0);
  }
  20% {
    transform: rotateY(76deg) translateZ(3px);
  }
  40% {
    transform: rotateY(-10deg) translateZ(0);
  }
  60% {
    transform: rotateY(74deg) translateZ(3px);
  }
  80% {
    transform: rotateY(15deg) translateZ(1px);
  }
  100% {
    transform: rotateY(65deg) translateZ(2px);
  }
}

@keyframes butterflyFlapGlideRight {
  0% {
    transform: rotateY(0deg) translateZ(0);
  }
  20% {
    transform: rotateY(-76deg) translateZ(3px);
  }
  40% {
    transform: rotateY(10deg) translateZ(0);
  }
  60% {
    transform: rotateY(-74deg) translateZ(3px);
  }
  80% {
    transform: rotateY(-15deg) translateZ(1px);
  }
  100% {
    transform: rotateY(-65deg) translateZ(2px);
  }
}

/* Diamond 4-point fairy stardust particle */
.butterfly-stardust {
  position: absolute;
  width: 5px;
  height: 5px;
  clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%);
  pointer-events: none;
  z-index: 29;
  will-change: transform, opacity;
  animation: starTwinkle 0.8s ease-in-out infinite alternate;
}

@keyframes starTwinkle {
  0% {
    filter: brightness(1) drop-shadow(0 0 2px currentColor);
  }
  100% {
    filter: brightness(1.6) drop-shadow(0 0 6px currentColor);
  }
}

@media (prefers-reduced-motion: reduce) {
  .butterfly-unit {
    display: none !important;
  }
}
`;
