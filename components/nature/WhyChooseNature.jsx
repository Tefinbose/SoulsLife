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

// Meadow Grass for Card 1
function MeadowGrass({ className = "", color = "#A3248F" }) {
  return (
    <svg
      viewBox="0 0 110 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M10 90 C22 55 35 38 52 20 M28 90 C36 65 48 48 64 26 M55 90 C58 62 68 45 80 32 M82 90 C78 68 74 50 68 28 M98 90 C88 56 80 40 70 22 M40 90 C45 72 50 58 58 42 M70 90 C68 76 65 62 60 48"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.22"
      />
    </svg>
  );
}

// 2. Card 2 Graphic: Blooming Zen Lotus & Calming Water Ripple
function ZenLotusGraphic({ color = "#059669", className = "" }) {
  return (
    <div className={`pointer-events-none select-none relative ${className}`} aria-hidden="true">
      <svg
        width="78"
        height="78"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="lotusCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.38" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Calming Glow */}
        <circle cx="32" cy="40" r="22" fill="url(#lotusCenterGlow)" />

        {/* Water Ripple Ring */}
        <circle
          cx="32"
          cy="44"
          r="10"
          stroke={color}
          strokeWidth="1.2"
          className="lotus-ripple"
        />

        {/* Outer Base Lily Pad Contour */}
        <path
          d="M10 46 C16 52 48 52 54 46 C48 48 16 48 10 46 Z"
          fill={color}
          fillOpacity="0.18"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Lotus Bloom Group */}
        <g className="lotus-bloom">
          {/* Back Outspread Petals */}
          <path
            d="M32 40 C20 36 8 30 14 20 C22 18 28 28 32 40 Z"
            fill={color}
            fillOpacity="0.15"
            stroke={color}
            strokeWidth="1.1"
            className="lotus-petal-left"
          />
          <path
            d="M32 40 C44 36 56 30 50 20 C42 18 36 28 32 40 Z"
            fill={color}
            fillOpacity="0.15"
            stroke={color}
            strokeWidth="1.1"
            className="lotus-petal-right"
          />

          {/* Mid Layer Petals */}
          <path
            d="M32 42 C24 34 16 26 22 16 C28 14 30 26 32 42 Z"
            fill={color}
            fillOpacity="0.24"
            stroke={color}
            strokeWidth="1.2"
            className="lotus-petal-left"
          />
          <path
            d="M32 42 C40 34 48 26 42 16 C36 14 34 26 32 42 Z"
            fill={color}
            fillOpacity="0.24"
            stroke={color}
            strokeWidth="1.2"
            className="lotus-petal-right"
          />

          {/* Center Crown Petal */}
          <path
            d="M32 42 C28 30 26 22 32 12 C38 22 36 30 32 42 Z"
            fill={color}
            fillOpacity="0.32"
            stroke={color}
            strokeWidth="1.3"
          />

          {/* Inner Golden Stamen Glow */}
          <circle cx="32" cy="36" r="3" fill="#10B981" fillOpacity="0.75" />
        </g>

        {/* Floating Dewdrop / Small Leaf drifting */}
        <g className="lotus-leaf-drift">
          <path
            d="M48 44 C52 40 56 42 54 48 C50 50 46 48 48 44 Z"
            fill={color}
            fillOpacity="0.3"
            stroke={color}
            strokeWidth="0.9"
          />
        </g>
      </svg>
    </div>
  );
}

// 3. Card 3 Graphic: Zen Cairn River Stones & Floating Fireflies
function ZenCairnFirefliesGraphic({ color = "#7C3AED", className = "" }) {
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
          <filter id="fireflyGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
          <radialGradient id="zenAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Calming Sanctuary Aura */}
        <circle
          cx="32"
          cy="34"
          r="26"
          fill="url(#zenAuraGrad)"
          className="zen-aura"
        />

        {/* Ambient Circular Halo */}
        <circle
          cx="32"
          cy="34"
          r="24"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.25"
          strokeDasharray="3 3"
        />

        {/* Base Grounding Shadow */}
        <ellipse cx="32" cy="53" rx="20" ry="4" fill={color} fillOpacity="0.12" />

        {/* Zen Stone Cairn (3 Balanced River Pebbles) */}
        {/* Bottom Foundation Stone */}
        <ellipse
          cx="32"
          cy="47"
          rx="18"
          ry="6.5"
          fill={color}
          fillOpacity="0.24"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
        <path
          d="M20 46 C24 44 40 44 44 46"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />

        {/* Middle Balance Stone */}
        <ellipse
          cx="32"
          cy="37"
          rx="13.5"
          ry="5.5"
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
        <path
          d="M23 36 C26 35 38 35 41 36"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />

        {/* Top Serenity Stone */}
        <ellipse
          cx="32"
          cy="28"
          rx="8.5"
          ry="4.5"
          fill={color}
          fillOpacity="0.38"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.9"
        />

        {/* Floating Glowing Fireflies (3 Orbs with Glow) */}
        <g className="firefly-orb-1">
          <circle cx="18" cy="24" r="5" fill="#FDE047" fillOpacity="0.45" filter="url(#fireflyGlow)" />
          <circle cx="18" cy="24" r="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" />
        </g>

        <g className="firefly-orb-2">
          <circle cx="48" cy="30" r="4.5" fill="#C4B5FD" fillOpacity="0.45" filter="url(#fireflyGlow)" />
          <circle cx="48" cy="30" r="1.8" fill="#EDE9FE" stroke={color} strokeWidth="0.5" />
        </g>

        <g className="firefly-orb-3">
          <circle cx="28" cy="14" r="4" fill="#FDE047" fillOpacity="0.4" filter="url(#fireflyGlow)" />
          <circle cx="28" cy="14" r="1.6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

// 4. Card 4 Graphic: Harmonic Calming Waves & Warm Sunbeams
function HarmonicWavesGraphic({ color = "#D97706", className = "" }) {
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
          <filter id="sunMoteGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Calming Harmonic Sound Waves (Expanding gentle voice resonance arcs) */}
        <g className="harmonic-wave-3">
          <path
            d="M 52 14 C 40 22 40 42 52 50"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.32"
            strokeDasharray="4 2"
          />
        </g>

        <g className="harmonic-wave-2">
          <path
            d="M 44 20 C 34 26 34 38 44 44"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
        </g>

        <g className="harmonic-wave-1">
          <path
            d="M 36 25 C 30 28 30 36 36 39"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </g>

        {/* Central Source of Voice / Compassion (Warm Sound Origin) */}
        <circle cx="28" cy="32" r="3.5" fill={color} fillOpacity="0.3" />
        <circle cx="28" cy="32" r="2" fill={color} fillOpacity="0.85" />

        {/* Floating Warm Golden Sunbeam Motes */}
        <g className="sunbeam-mote-1">
          <circle cx="22" cy="44" r="3" fill="#FDE68A" fillOpacity="0.5" filter="url(#sunMoteGlow)" />
          <circle cx="22" cy="44" r="1.5" fill="#FEF3C7" stroke={color} strokeWidth="0.4" />
        </g>

        <g className="sunbeam-mote-2">
          <circle cx="38" cy="18" r="3.5" fill="#FDE68A" fillOpacity="0.5" filter="url(#sunMoteGlow)" />
          <circle cx="38" cy="18" r="1.8" fill="#FEF3C7" stroke={color} strokeWidth="0.4" />
        </g>

        <g className="sunbeam-mote-3">
          <circle cx="48" cy="34" r="2.5" fill="#FDE68A" fillOpacity="0.4" filter="url(#sunMoteGlow)" />
          <circle cx="48" cy="34" r="1.2" fill="#FEF3C7" stroke={color} strokeWidth="0.4" />
        </g>
      </svg>
    </div>
  );
}

// 5. Card 5 Graphic: Mindful 4-4 Breathing Beacon & Infinity Flow
function MindfulBreathBeaconGraphic({ color = "#A3248F", className = "" }) {
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
          <radialGradient id="beaconGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Calming Breath Wave (Ring 2) */}
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke={color}
          strokeWidth="0.9"
          strokeOpacity="0.3"
          className="breath-beacon-ring-2"
        />

        {/* Mid Rhythm Wave (Ring 1) */}
        <circle
          cx="32"
          cy="32"
          r="19"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.5"
          className="breath-beacon-ring-1"
        />

        {/* Infinite Ribbon Flow (24/7 Continuity) */}
        <path
          d="M 22 32 C 22 25 28 25 32 32 C 36 39 42 39 42 32 C 42 25 36 25 32 32 C 28 39 22 39 22 32 Z"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.55"
          fill="none"
          className="infinity-path-flow"
        />

        {/* Center Mindful Pulse Core with Radiance */}
        <circle
          cx="32"
          cy="32"
          r="13"
          fill="url(#beaconGlowGrad)"
          className="breath-beacon-core"
        />
        <circle
          cx="32"
          cy="32"
          r="4.5"
          fill={color}
          fillOpacity="0.85"
          className="breath-beacon-core"
        />
        <circle cx="32" cy="32" r="2" fill="#FFFFFF" fillOpacity="0.95" />
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
    type: "butterfly",
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
    type: "lotus",
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
    type: "zen-cairn",
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
    type: "harmonic-waves",
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
    type: "breath-beacon",
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
                  {/* Dedicated Calming Animation Graphic for Each Card */}
                  {card.type === "butterfly" && (
                    <>
                      <MeadowGrass
                        color={card.color}
                        className="absolute right-0 bottom-0 w-28 h-24 sm:w-32 sm:h-28 pointer-events-none select-none z-0"
                      />
                      <div className="absolute right-2 top-2 sm:right-4 sm:top-3 pointer-events-none select-none z-0">
                        <AnimatedButterfly
                          color={card.color}
                          size={54}
                          driftClass="butterfly-drift-1"
                          angle={12}
                        />
                      </div>
                    </>
                  )}

                  {card.type === "lotus" && (
                    <ZenLotusGraphic
                      color={card.color}
                      className="absolute right-2 top-1 sm:right-3 sm:top-2 z-0"
                    />
                  )}

                  {card.type === "zen-cairn" && (
                    <ZenCairnFirefliesGraphic
                      color={card.color}
                      className="absolute right-2 top-1 sm:right-3 sm:top-2 z-0"
                    />
                  )}

                  {card.type === "harmonic-waves" && (
                    <HarmonicWavesGraphic
                      color={card.color}
                      className="absolute right-2 top-1 sm:right-3 sm:top-2 z-0"
                    />
                  )}

                  {card.type === "breath-beacon" && (
                    <MindfulBreathBeaconGraphic
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
