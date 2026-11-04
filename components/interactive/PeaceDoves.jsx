"use client";

import { useEffect, useRef, useState } from "react";

// Modern Peace Dove SVG Component with 3D Wing Animation
export function ModernPeaceDove({
  size = 54,
  className = "",
  style = {},
  glowColor = "rgba(163, 36, 143, 0.2)",
  flapSpeed = "1.8s",
  isGliding = false,
}) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size * 0.78,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 78"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        style={{
          filter: `drop-shadow(0 4px 14px ${glowColor}) drop-shadow(0 1px 3px rgba(0,0,0,0.06))`,
        }}
      >
        <defs>
          {/* Luminous Pearl Feather Gradient */}
          <linearGradient id="dovePearlBody" x1="15" y1="20" x2="85" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Near Wing Gradient (Illuminated Top Edge) */}
          <linearGradient id="doveNearWingGrad" x1="35" y1="5" x2="75" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Far Wing Gradient (Soft Atmosphere Shading) */}
          <linearGradient id="doveFarWingGrad" x1="45" y1="8" x2="85" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Fresh Emerald Olive Leaf */}
          <linearGradient id="oliveLeafGrad" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Far Wing (Back) */}
        <g
          className="dove-wing-right-flap"
          style={{
            transformOrigin: "42px 34px",
            animation: isGliding ? "none" : `doveWingFlapRight ${flapSpeed} ease-in-out infinite`,
          }}
        >
          <path
            d="M 44 34 C 48 18 62 4 82 2 C 78 14 68 26 56 36 C 50 37 46 36 44 34 Z"
            fill="url(#doveFarWingGrad)"
            stroke="rgba(163, 36, 143, 0.15)"
            strokeWidth="0.8"
          />
          {/* Feather accents */}
          <path d="M 52 30 C 58 20 68 12 78 6" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M 50 33 C 58 24 66 18 73 14" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Main Body, Neck, Head, Beak & Olive Branch */}
        <g className="dove-body-group">
          {/* Tail Feathers (Layer 1) */}
          <path
            d="M 60 48 C 72 52 86 58 92 64 C 86 64 76 60 68 56 C 64 54 62 50 60 48 Z"
            fill="url(#dovePearlBody)"
            stroke="rgba(13, 85, 174, 0.12)"
            strokeWidth="0.8"
          />
          {/* Tail Feathers (Layer 2) */}
          <path
            d="M 62 49 C 74 56 88 65 96 70 C 88 68 76 62 67 56"
            fill="url(#dovePearlBody)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="0.8"
          />

          {/* Aerodynamic Body Contour */}
          <path
            d="M 22 36 C 26 31 32 30 38 33 C 44 36 50 42 62 48 C 54 50 44 50 36 46 C 28 42 24 38 22 36 Z"
            fill="url(#dovePearlBody)"
            stroke="rgba(163, 36, 143, 0.12)"
            strokeWidth="0.8"
          />

          {/* Beak (Golden Amber) */}
          <path d="M 22 36 L 14 38 L 21 39 Z" fill="#F59E0B" />

          {/* Gentle Eye */}
          <circle cx="25" cy="34" r="1.3" fill="#1E293B" />
          <circle cx="24.6" cy="33.6" r="0.45" fill="#FFFFFF" />

          {/* Olive Branch in Beak (Symbol of Peace & Reconciliation) */}
          <g>
            <path d="M 17 38 C 12 40 8 45 4 52" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 12 40 C 9 37 6 38 7 42 C 9 43 11 42 12 40 Z" fill="url(#oliveLeafGrad)" />
            <path d="M 8 44 C 4 43 3 47 6 49 C 8 48 8 45 8 44 Z" fill="url(#oliveLeafGrad)" />
            <path d="M 4 52 C 1 51 1 55 4 56 C 5 55 5 53 4 52 Z" fill="url(#oliveLeafGrad)" />
          </g>
        </g>

        {/* Near Wing (Front - Luminous & Prominent) */}
        <g
          className="dove-wing-left-flap"
          style={{
            transformOrigin: "38px 35px",
            animation: isGliding ? "none" : `doveWingFlapLeft ${flapSpeed} ease-in-out infinite`,
          }}
        >
          <path
            d="M 38 35 C 40 16 54 2 76 0 C 72 14 62 28 48 40 C 42 41 39 38 38 35 Z"
            fill="url(#doveNearWingGrad)"
            stroke="rgba(163, 36, 143, 0.18)"
            strokeWidth="1"
          />
          {/* Wing Feathers Details */}
          <path
            d="M 46 32 C 52 18 64 8 76 0 C 70 12 60 22 52 30"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M 44 36 C 50 24 58 16 70 8 C 64 18 56 26 48 34"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M 42 39 C 48 30 54 22 64 16 C 58 24 52 32 46 38"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

// Dove Configuration Data for Ambient Page Flight
const DOVE_CONFIGS = [
  {
    id: "dove-alpha",
    size: 58,
    speed: 1.15,
    flapSpeed: "1.7s",
    glowColor: "rgba(163, 36, 143, 0.22)",
    glideChance: 0.65,
    startXPercent: 0.15,
    startYPercent: 0.22,
  },
  {
    id: "dove-beta",
    size: 44,
    speed: 1.35,
    flapSpeed: "1.5s",
    glowColor: "rgba(13, 85, 174, 0.22)",
    glideChance: 0.55,
    startXPercent: 0.75,
    startYPercent: 0.38,
  },
  {
    id: "dove-gamma",
    size: 34,
    speed: 0.95,
    flapSpeed: "1.9s",
    glowColor: "rgba(16, 185, 129, 0.2)",
    glideChance: 0.75,
    startXPercent: 0.45,
    startYPercent: 0.7,
  },
];

export default function PeaceDoves() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const dovesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    setMounted(true);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Initialize doves physics state
    dovesRef.current = DOVE_CONFIGS.map((cfg) => {
      const startX = cfg.startXPercent * w;
      const startY = cfg.startYPercent * h;
      const angle = Math.random() * Math.PI * 2;

      return {
        ...cfg,
        x: startX,
        y: startY,
        vx: Math.cos(angle) * cfg.speed,
        vy: Math.sin(angle) * cfg.speed,
        targetX: Math.random() * (w - 200) + 100,
        targetY: Math.random() * (h - 200) + 100,
        rotation: 0,
        bankAngle: 0,
        glideTimer: 0,
        isGliding: false,
        element: null,
      };
    });

    // Pointer tracking for gentle cursor interaction
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

    // Main 60FPS Flight Physics Loop
    const loop = () => {
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      dovesRef.current.forEach((d, idx) => {
        d.glideTimer += 1;

        // Waypoint navigation along gentle curving paths
        const distToTarget = Math.hypot(d.x - d.targetX, d.y - d.targetY);
        if (d.glideTimer > 240 || distToTarget < 80) {
          d.targetX = Math.random() * (screenW - 240) + 120;
          d.targetY = Math.random() * (screenH - 240) + 120;
          d.glideTimer = 0;
          d.isGliding = Math.random() < d.glideChance;
        }

        // Steer toward target waypoint smoothly
        const toX = d.targetX - d.x;
        const toY = d.targetY - d.y;
        const dist = Math.hypot(toX, toY) || 1;

        d.vx += (toX / dist) * 0.032;
        d.vy += (toY / dist) * 0.032;

        // Gentle cursor interaction: softly glides away if cursor approaches
        if (mouseRef.current.active) {
          const dxMouse = d.x - mouseRef.current.x;
          const dyMouse = d.y - mouseRef.current.y;
          const distMouse = Math.hypot(dxMouse, dyMouse);

          if (distMouse < 180 && distMouse > 1) {
            const force = (1 - distMouse / 180) * 0.45;
            d.vx += (dxMouse / distMouse) * force * 2.8;
            d.vy += (dyMouse / distMouse) * force * 2.8;
            d.isGliding = true; // Dove glides gracefully away
          }
        }

        // Speed regulation
        const currentSpeed = Math.hypot(d.vx, d.vy);
        const maxSpeed = d.speed * 2.2;
        const minSpeed = d.speed * 0.65;
        if (currentSpeed > maxSpeed) {
          d.vx = (d.vx / currentSpeed) * maxSpeed;
          d.vy = (d.vy / currentSpeed) * maxSpeed;
        } else if (currentSpeed < minSpeed) {
          d.vx = (d.vx / currentSpeed) * minSpeed;
          d.vy = (d.vy / currentSpeed) * minSpeed;
        }

        // Update position
        d.x += d.vx;
        d.y += d.vy;

        // Wrap around viewport edges softly
        const pad = 80;
        if (d.x < -pad) d.x = screenW + pad;
        if (d.x > screenW + pad) d.x = -pad;
        if (d.y < -pad) d.y = screenH + pad;
        if (d.y > screenH + pad) d.y = -pad;

        // Natural flight banking & heading angle
        const targetAngle = Math.atan2(d.vy, d.vx) * (180 / Math.PI);
        let diff = targetAngle - d.rotation;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        d.rotation += diff * 0.06;

        // Banking roll angle proportional to turn rate
        d.bankAngle = Math.max(-25, Math.min(25, diff * 0.45));

        // Direct hardware-accelerated transform update
        if (d.element) {
          // If flying leftward, flip horizontally so dove naturally faces forward
          const isFlipped = Math.cos(d.rotation * (Math.PI / 180)) < 0;
          const flipScale = isFlipped ? -1 : 1;
          const pitch = isFlipped ? -d.bankAngle : d.bankAngle;

          d.element.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) scaleX(${flipScale}) rotate(${pitch}deg)`;
        }
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-20 overflow-hidden"
      aria-hidden="true"
    >
      {DOVE_CONFIGS.map((cfg, idx) => (
        <div
          key={cfg.id}
          ref={(el) => {
            if (dovesRef.current[idx]) {
              dovesRef.current[idx].element = el;
            }
          }}
          className="absolute top-0 left-0 will-change-transform transition-opacity duration-700"
          style={{
            transform: `translate3d(${cfg.startXPercent * 800}px, ${cfg.startYPercent * 600}px, 0)`,
          }}
        >
          <ModernPeaceDove
            size={cfg.size}
            glowColor={cfg.glowColor}
            flapSpeed={cfg.flapSpeed}
          />
        </div>
      ))}
    </div>
  );
}

