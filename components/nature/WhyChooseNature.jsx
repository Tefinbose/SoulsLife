"use client";

import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/ui/MotionSection";

// 1. Card 1 Graphic: Animated Fluttering Butterfly
function AnimatedButterfly({
  className = "",
  color = "#A3248F",
  size = 48,
  driftClass = "butterfly-drift-1",
  angle = 8,
}) {
  return (
    <div
      className={`pointer-events-none select-none ${driftClass} ${className}`}
      style={{ transform: `rotate(${angle}deg)` }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-xs"
      >
        {/* Left Wing Group */}
        <g className="butterfly-wing-left">
          <path
            d="M32 30 C28 16 14 10 7 16 C1 21 6 34 18 34 C26 34 30 32 32 30 Z"
            fill={color}
            fillOpacity="0.25"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 28 C21 22 14 18 10 20 C8 22 10 27 19 29"
            stroke={color}
            strokeWidth="0.8"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          <path
            d="M32 33 C27 36 12 40 14 48 C16 54 26 50 29 42 C30 38 31 35 32 33 Z"
            fill={color}
            fillOpacity="0.18"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Right Wing Group */}
        <g className="butterfly-wing-right">
          <path
            d="M32 30 C36 16 50 10 57 16 C63 21 58 34 46 34 C38 34 34 32 32 30 Z"
            fill={color}
            fillOpacity="0.25"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 28 C43 22 50 18 54 20 C56 22 54 27 45 29"
            stroke={color}
            strokeWidth="0.8"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          <path
            d="M32 33 C37 36 52 40 50 48 C48 54 38 50 35 42 C34 38 33 35 32 33 Z"
            fill={color}
            fillOpacity="0.18"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Slender Body & Antennae */}
        <path
          d="M32 23 C32.7 28 32.7 38 32 44"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32 23 C30 19 26 17 23 17"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M32 23 C34 19 38 17 41 17"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// 1. Card 1 Graphic: Qualified & Experienced Professionals (Graduation Cap, Degree Scroll & Credential Stars)
function QualifiedProfessionalGraphic({ color = "#C443B0", className = "" }) {
  return (
    <div className={`pointer-events-none select-none relative ${className}`} aria-hidden="true">
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="qualifiedAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Scholarly Halo */}
        <circle cx="32" cy="32" r="26" fill="url(#qualifiedAuraGrad)" className="qualified-aura" />

        {/* Diploma / Degree Certificate Scroll */}
        <g className="diploma-scroll">
          <rect
            x="20"
            y="43"
            width="24"
            height="8"
            rx="4"
            fill={color}
            fillOpacity="0.22"
            stroke={color}
            strokeWidth="1.2"
          />
          <path d="M30 43 L30 51 M34 43 L34 51" stroke={color} strokeWidth="1.1" strokeOpacity="0.6" />
          {/* Ribbon Tie */}
          <circle cx="32" cy="47" r="1.8" fill={color} />
          <path d="M32 49 L30 54 M32 49 L34 54" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Academic Graduation Cap (Mortarboard) */}
        <g className="cap-floating-group">
          {/* Cap Skull Cap Base */}
          <path
            d="M24 28 C24 33 40 33 40 28"
            fill={color}
            fillOpacity="0.35"
            stroke={color}
            strokeWidth="1.3"
          />

          {/* Diamond Mortarboard Top */}
          <polygon
            points="32,15 48,22 32,29 16,22"
            fill={color}
            fillOpacity="0.28"
            stroke={color}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Center Button */}
          <circle cx="32" cy="22" r="1.6" fill={color} />

          {/* Swinging Silk Tassel */}
          <g className="cap-tassel">
            <path
              d="M32 22 C37 23 42 26 42 33"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Tassel Fringe */}
            <ellipse cx="42" cy="35" rx="1.8" ry="3" fill={color} fillOpacity="0.8" />
          </g>
        </g>

        {/* Twinkling Academic Credential Stars */}
        <g className="sparkle-star-1">
          <path
            d="M16 18 Q16 22 20 22 Q16 22 16 26 Q16 22 12 22 Q16 22 16 18 Z"
            fill={color}
            fillOpacity="0.75"
          />
        </g>
        <g className="sparkle-star-2">
          <path
            d="M48 14 Q48 17 51 17 Q48 17 48 20 Q48 17 45 17 Q48 17 48 14 Z"
            fill={color}
            fillOpacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}

// 2. Card 2 Graphic: 100% Confidential & Ethical Practice (Clinical Security Shield & Keyhole Privacy Lock)
function ConfidentialShieldGraphic({ color = "#059669", className = "" }) {
  return (
    <div className={`pointer-events-none select-none relative ${className}`} aria-hidden="true">
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="shieldAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Protective Sanctuary Aura */}
        <circle cx="32" cy="32" r="26" fill="url(#shieldAuraGrad)" className="shield-aura" />

        {/* Expanding Privacy Ripple */}
        <path
          d="M32 10 C42 15 50 17 50 29 C50 42 38 49 32 54 C26 49 14 42 14 29 C14 17 22 15 32 10 Z"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.3"
          strokeDasharray="3 3"
          className="shield-ripple"
        />

        {/* Main Clinical Security Shield Body */}
        <g className="shield-breathe">
          <path
            d="M32 14 C40 18 46 20 46 30 C46 40 37 46 32 50 C27 46 18 40 18 30 C18 20 24 18 32 14 Z"
            fill={color}
            fillOpacity="0.22"
            stroke={color}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Inner Safety Lock & Keyhole */}
          <rect
            x="26"
            y="30"
            width="12"
            height="10"
            rx="2.5"
            fill={color}
            fillOpacity="0.45"
            stroke={color}
            strokeWidth="1.2"
          />

          {/* Shackle */}
          <path
            d="M28 30 V25 C28 22.8 29.8 21 32 21 C34.2 21 36 22.8 36 25 V30"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            className="lock-shackle"
          />

          {/* Keyhole */}
          <circle cx="32" cy="34" r="1.5" fill="#FFFFFF" />
          <path d="M32 35.5 V38" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" />
        </g>

        {/* Verified Privacy Check Spark */}
        <g className="privacy-badge-check">
          <circle cx="44" cy="20" r="4.5" fill={color} fillOpacity="0.85" />
          <path d="M42 20 L43.5 21.5 L46.5 18.5" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// 3. Card 3 Graphic: Personalized Counseling Plans (Therapeutic Growth Roadmap & Calibration Sliders)
function PersonalizedPlanGraphic({ color = "#7C3AED", className = "" }) {
  return (
    <div className={`pointer-events-none select-none relative ${className}`} aria-hidden="true">
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="planAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Roadmap Aura */}
        <circle cx="32" cy="32" r="26" fill="url(#planAuraGrad)" className="plan-aura" />

        {/* Assessment Sheet / Personalized Clipboard Outline */}
        <rect
          x="14"
          y="12"
          width="36"
          height="44"
          rx="5"
          fill={color}
          fillOpacity="0.18"
          stroke={color}
          strokeWidth="1.3"
        />

        {/* Clipboard Top Tab */}
        <rect x="25" y="9" width="14" height="5" rx="2" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1" />
        <circle cx="32" cy="11.5" r="1" fill="#FFFFFF" />

        {/* Ascending Therapeutic Growth Pathway Line */}
        <path
          d="M20 42 C 24 38, 28 32, 34 30 C 38 28, 42 22, 44 20"
          stroke={color}
          strokeWidth="1.4"
          strokeDasharray="3 2"
          strokeLinecap="round"
          className="plan-path-flow"
        />

        {/* Milestone Node 1 (Assessment) */}
        <g className="plan-node-1">
          <circle cx="21" cy="41" r="3.5" fill={color} fillOpacity="0.3" />
          <circle cx="21" cy="41" r="2" fill={color} />
          <path d="M20 41 L20.8 41.8 L22.2 40.2" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Milestone Node 2 (Custom Strategy) */}
        <g className="plan-node-2">
          <circle cx="33" cy="30" r="3.5" fill={color} fillOpacity="0.3" />
          <circle cx="33" cy="30" r="2" fill={color} />
          <path d="M32 30 L32.8 30.8 L34.2 29.2" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Milestone Node 3 (Goal & Resilience) */}
        <g className="plan-node-3">
          <circle cx="43" cy="21" r="4.5" fill={color} fillOpacity="0.3" />
          <circle cx="43" cy="21" r="2.5" fill={color} />
          <path d="M41.8 21 L42.8 22 L44.4 20" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
        </g>

        {/* Calibration Slider Track (Personalized Custom Tuning) */}
        <line x1="20" y1="48" x2="44" y2="48" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        <g className="plan-slider-knob">
          <circle cx="34" cy="48" r="2.8" fill={color} />
          <circle cx="34" cy="48" r="1" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

// 4. Card 4 Graphic: Online & Offline Care (Physical Clinic Sanctuary + Digital Tele-Video Signal Arcs)
function HybridCareGraphic({ color = "#D97706", className = "" }) {
  return (
    <div className={`pointer-events-none select-none relative ${className}`} aria-hidden="true">
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="hybridAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Warm Ambient Halo */}
        <circle cx="32" cy="32" r="26" fill="url(#hybridAuraGrad)" className="hybrid-aura" />

        {/* Physical Clinic Sanctuary Building (Left Side) */}
        <g className="clinic-building">
          {/* Clinic Roof Triangle */}
          <path d="M14 30 L25 20 L36 30 Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
          {/* Clinic Walls */}
          <rect x="17" y="30" width="16" height="18" rx="1.5" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.2" />
          {/* Clinic Door */}
          <rect x="22" y="38" width="6" height="10" rx="1" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1" />
          {/* Clinical Cross */}
          <path d="M25 24 V28 M23 26 H27" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Digital Video / Remote Connectivity Broadcast Waves (Right Side) */}
        <g className="hybrid-signal-3">
          <path
            d="M 40 20 C 47 24 47 38 40 42"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.35"
            strokeDasharray="3 2"
          />
        </g>
        <g className="hybrid-signal-2">
          <path
            d="M 37 23 C 42 26 42 35 37 39"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeOpacity="0.55"
          />
        </g>
        <g className="hybrid-signal-1">
          <path
            d="M 34 26 C 37 28 37 33 34 35"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </g>

        {/* Live Video Camera / Tele-Broadcast Node */}
        <g className="hybrid-camera-node">
          <rect x="42" y="27" width="12" height="9" rx="2" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1" />
          <polygon points="54,29 59,26 59,37 54,34" fill={color} fillOpacity="0.75" />
          {/* Live Recording Dot */}
          <circle cx="46" cy="31.5" r="1.3" fill="#FFFFFF" className="live-rec-dot" />
        </g>
      </svg>
    </div>
  );
}

// 5. Card 5 Graphic: Community-Oriented Care (Interconnected Circle of Care & Radiant Central Heart)
function CommunityCareGraphic({ color = "#A3248F", className = "" }) {
  return (
    <div className={`pointer-events-none select-none relative ${className}`} aria-hidden="true">
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="communityAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Community Circle Halo */}
        <circle cx="32" cy="32" r="26" fill="url(#communityAuraGrad)" className="community-aura" />

        {/* Expanding Solidarity Support Ripple */}
        <circle cx="32" cy="32" r="22" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 3" className="community-ripple" />

        {/* Interconnected Community Figures (Circle of Support) */}
        {/* Left Figure */}
        <g className="community-person-left">
          <circle cx="18" cy="25" r="3.2" fill={color} fillOpacity="0.75" />
          <path d="M12 40 C12 33 24 33 24 40" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.22" />
        </g>

        {/* Right Figure */}
        <g className="community-person-right">
          <circle cx="46" cy="25" r="3.2" fill={color} fillOpacity="0.75" />
          <path d="M40 40 C40 33 52 33 52 40" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.22" />
        </g>

        {/* Center Guide / Family Pillar */}
        <g className="community-person-center">
          <circle cx="32" cy="20" r="3.8" fill={color} fillOpacity="0.9" />
          <path d="M24 37 C24 28 40 28 40 37" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.3" />
        </g>

        {/* Connected Hands of Care (Connecting Arc) */}
        <path
          d="M 18 36 C 24 34, 40 34, 46 36"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.65"
          className="community-hands"
        />

        {/* Beating Central Empathy Heart */}
        <g className="community-heart">
          <path
            d="M32 40 C32 37 28 35 28 32 C28 29.5 30 28 32 30 C34 28 36 29.5 36 32 C36 35 32 37 32 40 Z"
            fill={color}
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  );
}

const metricsCards = [
  {
    id: "professionals",
    number: "Qualified",
    label: "Experienced Professionals",
    subtext: "MSc Psychology & MSW postgraduates with clinical expertise",
    colSpan: "lg:col-span-3",
    bg: "bg-[#FDF4F8]",
    border: "border-[#A3248F]/15",
    color: "#C443B0",
    type: "qualified",
  },
  {
    id: "confidential",
    number: "100%",
    label: "Confidential & Ethical Practice",
    subtext: "Strict ethical and professional standards in every session",
    colSpan: "lg:col-span-3",
    bg: "bg-[#F0FAF7]",
    border: "border-[#059669]/15",
    color: "#059669",
    type: "confidential",
  },
  {
    id: "personalized",
    number: "Custom",
    label: "Personalized Counseling Plans",
    subtext: "Scientific assessment tools and customized approaches",
    colSpan: "lg:col-span-2",
    bg: "bg-[#F4F8FD]",
    border: "border-[#7C3AED]/15",
    color: "#7C3AED",
    type: "personalized",
  },
  {
    id: "hybrid",
    number: "Hybrid",
    label: "Online & Offline Care",
    subtext: "In-person clinic visits and remote tele-counseling",
    colSpan: "lg:col-span-2",
    bg: "bg-[#FFF9F2]",
    border: "border-[#D97706]/15",
    color: "#D97706",
    type: "hybrid",
  },
  {
    id: "community",
    number: "Affordable",
    label: "Community-Oriented Care",
    subtext: "Accessible care building resilient families and communities",
    colSpan: "lg:col-span-2",
    bg: "bg-[#FAF3FA]",
    border: "border-[#A3248F]/15",
    color: "#A3248F",
    type: "community",
  },
];

export default function WhyChooseNature() {
  const handleOpenBooking = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-booking-modal", {
          detail: { service: "General Consultation" },
        })
      );
    }
  };

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-heading"
      className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-white"
    >
      {/* Content-matched card animations (scoped strictly to this section) */}
      <style>{`
        /* ───── Card 1 · Qualified Professionals (Academic Cap, Degree Scroll & Credential Stars) ───── */
        #why-choose-us .cap-tassel {
          transform-box: fill-box;
          transform-origin: top left;
          animation: wc-tassel 2.6s ease-in-out infinite;
        }
        #why-choose-us .cap-floating-group {
          animation: wc-float-cap 5s ease-in-out infinite;
        }
        #why-choose-us .sparkle-star-1 {
          animation: wc-star-twinkle 3s ease-in-out infinite;
        }
        #why-choose-us .sparkle-star-2 {
          animation: wc-star-twinkle 3s ease-in-out 1.5s infinite;
        }
        #why-choose-us .qualified-aura {
          transform-box: fill-box;
          transform-origin: center;
          animation: wc-aura-breathe 6s ease-in-out infinite;
        }
        @keyframes wc-tassel {
          0%, 100% { transform: rotate(-8deg); }
          50%      { transform: rotate(14deg); }
        }
        @keyframes wc-float-cap {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3.5px); }
        }
        @keyframes wc-star-twinkle {
          0%, 100% { transform: scale(0.85); opacity: 0.4; }
          50%      { transform: scale(1.25); opacity: 1; }
        }
        @keyframes wc-aura-breathe {
          0%, 100% { transform: scale(0.92); opacity: 0.7; }
          50%      { transform: scale(1.08); opacity: 1; }
        }

        /* ───── Card 2 · 100% Confidential & Ethical (Clinical Security Shield & Keyhole Privacy Lock) ───── */
        #why-choose-us .shield-breathe {
          transform-box: fill-box;
          transform-origin: center;
          animation: wc-shield 4.8s ease-in-out infinite;
        }
        #why-choose-us .shield-ripple {
          transform-box: fill-box;
          transform-origin: center;
          animation: wc-shield-pulse 3.6s ease-out infinite;
        }
        #why-choose-us .privacy-badge-check {
          animation: wc-badge-bob 4s ease-in-out infinite;
        }
        @keyframes wc-shield {
          0%, 100% { transform: scale(0.97); }
          50%      { transform: scale(1.02); }
        }
        @keyframes wc-shield-pulse {
          0%   { transform: scale(0.8); opacity: 0.75; }
          100% { transform: scale(1.28); opacity: 0; }
        }
        @keyframes wc-badge-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2.5px); }
        }

        /* ───── Card 3 · Personalized Plans (Therapy Growth Roadmap & Calibration Tuning) ───── */
        #why-choose-us .plan-path-flow {
          stroke-dasharray: 6 3;
          animation: wc-path-flow 4s linear infinite;
        }
        #why-choose-us .plan-slider-knob {
          animation: wc-slider-tune 4.2s ease-in-out infinite;
        }
        #why-choose-us .plan-node-1 { animation: wc-node-pulse 3s ease-in-out infinite; }
        #why-choose-us .plan-node-2 { animation: wc-node-pulse 3s ease-in-out 1s infinite; }
        #why-choose-us .plan-node-3 { animation: wc-node-pulse 3s ease-in-out 2s infinite; }
        @keyframes wc-path-flow {
          to { stroke-dashoffset: -18; }
        }
        @keyframes wc-slider-tune {
          0%, 100% { transform: translateX(-4px); }
          50%      { transform: translateX(5px); }
        }
        @keyframes wc-node-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.7; }
          50%      { transform: scale(1.18); opacity: 1; }
        }

        /* ───── Card 4 · Online & Offline Care (Clinic Sanctuary + Tele-Video Broadcast Signal) ───── */
        #why-choose-us .hybrid-signal-1 { animation: wc-signal 2.2s ease-out infinite; }
        #why-choose-us .hybrid-signal-2 { animation: wc-signal 2.2s ease-out 0.35s infinite; }
        #why-choose-us .hybrid-signal-3 { animation: wc-signal 2.2s ease-out 0.7s infinite; }
        #why-choose-us .live-rec-dot { animation: wc-rec-blink 1.4s ease-in-out infinite; }
        @keyframes wc-signal {
          0%   { transform: translateX(-2px); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(6px); opacity: 0; }
        }
        @keyframes wc-rec-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.2; }
        }

        /* ───── Card 5 · Community-Oriented Care (Family Solidarity Circle & Radiating Empathy Heart) ───── */
        #why-choose-us .community-heart {
          transform-box: fill-box;
          transform-origin: center;
          animation: wc-heartbeat 1.8s ease-in-out infinite;
        }
        #why-choose-us .community-ripple {
          transform-box: fill-box;
          transform-origin: center;
          animation: wc-comm-ripple 3.6s ease-out infinite;
        }
        #why-choose-us .community-person-left,
        #why-choose-us .community-person-right {
          transform-box: fill-box;
          transform-origin: bottom center;
        }
        #why-choose-us .community-person-left  { animation: wc-sway-person 5s ease-in-out infinite; }
        #why-choose-us .community-person-right { animation: wc-sway-person 5s ease-in-out 0.5s infinite; }
        @keyframes wc-heartbeat {
          0%, 100% { transform: scale(0.92); }
          25%      { transform: scale(1.14); }
          40%      { transform: scale(0.95); }
          60%      { transform: scale(1.10); }
        }
        @keyframes wc-comm-ripple {
          0%   { transform: scale(0.7); opacity: 0.75; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes wc-sway-person {
          0%, 100% { transform: rotate(-2deg); }
          50%      { transform: rotate(2deg); }
        }

        /* Chip butterflies */
        #why-choose-us .butterfly-drift-1 { animation: wc-drift-1 7s ease-in-out infinite; }
        #why-choose-us .butterfly-drift-2 { animation: wc-drift-2 8s ease-in-out -2s infinite; }
        #why-choose-us .butterfly-wing-left,
        #why-choose-us .butterfly-wing-right {
          transform-box: view-box;
          transform-origin: 32px 30px;
        }
        #why-choose-us .butterfly-wing-left  { animation: wc-flap-l 1.6s ease-in-out infinite; }
        #why-choose-us .butterfly-wing-right { animation: wc-flap-r 1.6s ease-in-out infinite; }
        @keyframes wc-flap-l { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(0.55); } }
        @keyframes wc-flap-r { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(0.55); } }
        @keyframes wc-drift-1 {
          0%,100% { translate: 0 0; }
          33% { translate: 6px -5px; }
          66% { translate: -3px -9px; }
        }
        @keyframes wc-drift-2 {
          0%,100% { translate: 0 0; }
          40% { translate: -4px -4px; }
          70% { translate: 3px -7px; }
        }

        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          #why-choose-us svg *,
          #why-choose-us [class*="butterfly-drift"] { animation: none !important; }
        }
      `}</style>

      {/* Background ambient wellness glows */}
      <div className="pointer-events-none absolute -left-28 top-1/3 h-80 w-80 rounded-full bg-[#A3248F]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/3 h-80 w-80 rounded-full bg-[#059669]/5 blur-3xl" />

      <div className="wellness-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Book Action */}
          <FadeUp delay={0.08} distance={20} className="lg:col-span-5 flex flex-col justify-center">
            {/* Chip with mini fluttering twin butterflies */}
            <span className="section-label-chip inline-flex items-center gap-1.5 self-start mb-2.5">
              <span>WHY CHOOSE SOULS LIFE</span>
              <span className="inline-flex items-center gap-0.5 ml-0.5" aria-hidden="true">
                <AnimatedButterfly color="#A3248F" size={16} driftClass="butterfly-drift-1" angle={14} />
                <AnimatedButterfly color="#0D55AE" size={13} driftClass="butterfly-drift-2" angle={-8} />
              </span>
            </span>

            <h2
              id="why-choose-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.14] tracking-tight text-[#162238]"
            >
              Why choose{" "}
              <span className="animated-gradient-text">Souls Life</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A5B73]">
              Souls Life Wellbeing Center is a professionally managed mental health and counseling institution dedicated to promoting emotional balance, psychological strength, and holistic wellbeing. Led by qualified experts in Medical Social Work, Psychology, Child Development, and Community Development, we provide evidence-based, ethical, and confidential support services for individuals and families.
            </p>

            <div className="mt-6 sm:mt-8">
              <button
                type="button"
                onClick={handleOpenBooking}
                className="btn-nature-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <span>Book a session</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </FadeUp>

          {/* Right Column: 5 Mind-Calming Stats Cards */}
          <FadeUp delay={0.15} distance={24} className="lg:col-span-7 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {metricsCards.map((card) => (
                <div
                  key={card.id}
                  className={`group relative overflow-hidden rounded-[26px] sm:rounded-[30px] border ${card.border} ${card.bg} p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.colSpan} flex flex-col justify-between min-h-[155px] sm:min-h-[170px]`}
                >
                  {/* Dedicated Content-Matched Animation Graphic for Each Card */}
                  {card.type === "qualified" && (
                    <QualifiedProfessionalGraphic
                      color={card.color}
                      className="absolute right-2 top-1 sm:right-3 sm:top-2 z-0"
                    />
                  )}

                  {card.type === "confidential" && (
                    <ConfidentialShieldGraphic
                      color={card.color}
                      className="absolute right-2 top-1 sm:right-3 sm:top-2 z-0"
                    />
                  )}

                  {card.type === "personalized" && (
                    <PersonalizedPlanGraphic
                      color={card.color}
                      className="absolute right-2 top-1 sm:right-3 sm:top-2 z-0"
                    />
                  )}

                  {card.type === "hybrid" && (
                    <HybridCareGraphic
                      color={card.color}
                      className="absolute right-2 top-1 sm:right-3 sm:top-2 z-0"
                    />
                  )}

                  {card.type === "community" && (
                    <CommunityCareGraphic
                      color={card.color}
                      className="absolute right-2 top-1 sm:right-3 sm:top-2 z-0"
                    />
                  )}

                  {/* Top Content: Metric & Label */}
                  <div className="relative z-10 max-w-[78%]">
                    <span className="font-display block text-3xl sm:text-4xl lg:text-[40px] font-normal leading-none tracking-tight text-[#162238]">
                      {card.number}
                    </span>
                    <h3 className="mt-2 text-xs sm:text-sm font-semibold leading-snug text-[#162238]">
                      {card.label}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-[#4A5B73] leading-relaxed">
                      {card.subtext}
                    </p>
                  </div>

                  {/* Bottom Action Indicator */}
                  <div className="relative z-10 mt-4 flex items-center">
                    <button
                      type="button"
                      onClick={handleOpenBooking}
                      aria-label={`Learn more about ${card.label}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-[#162238] shadow-xs transition-all duration-300 group-hover:border-[#A3248F]/40 group-hover:bg-[#A3248F] group-hover:text-white group-hover:scale-105 cursor-pointer"
                    >
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}