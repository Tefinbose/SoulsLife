"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Video,
  Wind,
  ShieldCheck,
  Clock,
  Heart,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { FadeUp } from "@/components/ui/MotionSection";

const openBooking = (e) => {
  if (e) e.preventDefault();
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-booking-modal", {
        detail: { service: "Mindful Counseling Consultation" },
      })
    );
  }
};

const reassurances = [
  { icon: ShieldCheck, text: "100% Confidential" },
  { icon: Video, text: "In-Clinic & Online Video" },
  { icon: Clock, text: "Mon to Sat, 9:30 AM to 5:30 PM" },
];

const PHASES = [
  {
    name: "Inhale",
    duration: 4,
    scale: 1.15,
    instruction: "Breathe in deeply through your nose...",
    badgeColor: "bg-[#A3248F]/30 text-[#F3CEEC] border-[#F3CEEC]/40",
    glowColor: "rgba(243, 206, 236, 0.4)",
    ringGradient: ["#E879F9", "#A3248F"],
  },
  {
    name: "Hold",
    duration: 7,
    scale: 1.15,
    instruction: "Hold gently. Let your shoulders drop...",
    badgeColor: "bg-[#7C3AED]/30 text-[#DDD6FE] border-[#C4B5FD]/40",
    glowColor: "rgba(196, 181, 253, 0.4)",
    ringGradient: ["#C4B5FD", "#7C3AED"],
  },
  {
    name: "Exhale",
    duration: 8,
    scale: 0.92,
    instruction: "Release slowly through your mouth. Let go...",
    badgeColor: "bg-[#059669]/30 text-[#A7F3D0] border-[#6EE7B7]/40",
    glowColor: "rgba(110, 231, 183, 0.35)",
    ringGradient: ["#6EE7B7", "#059669"],
  },
];

// Ethereal forest fireflies
const FIREFLIES = [
  { left: "12%", top: "25%", delay: "0s", duration: "7s", size: 3.5, color: "#FDE047" },
  { left: "22%", top: "70%", delay: "1.5s", duration: "9s", size: 3, color: "#F472B6" },
  { left: "35%", top: "40%", delay: "3s", duration: "8s", size: 4, color: "#C084FC" },
  { left: "48%", top: "18%", delay: "0.8s", duration: "10s", size: 3, color: "#FDE047" },
  { left: "62%", top: "75%", delay: "2.2s", duration: "7.5s", size: 3.5, color: "#67E8F9" },
  { left: "75%", top: "30%", delay: "4s", duration: "9s", size: 3, color: "#F472B6" },
  { left: "85%", top: "60%", delay: "1s", duration: "8.5s", size: 4, color: "#FDE047" },
  { left: "92%", top: "20%", delay: "2.8s", duration: "6.5s", size: 3.5, color: "#C084FC" },
];

export default function RelaxationNature() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cycleCount, setCycleCount] = useState(1);
  const timerRef = useRef(null);

  const currentPhase = PHASES[phaseIndex];

  // Real-time 4-7-8 breathing engine
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhaseIndex((currIdx) => {
            const nextIdx = (currIdx + 1) % PHASES.length;
            if (nextIdx === 0) {
              setCycleCount((c) => c + 1);
            }
            return nextIdx;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  useEffect(() => {
    setSecondsLeft(PHASES[phaseIndex].duration);
  }, [phaseIndex]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const resetBreathing = () => {
    setPhaseIndex(0);
    setSecondsLeft(PHASES[0].duration);
    setCycleCount(1);
    setIsPlaying(true);
  };

  const phaseProgress =
    (currentPhase.duration - secondsLeft + 1) / currentPhase.duration;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - phaseProgress * circumference;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: relaxationAnimStyles }} />

      <section
        id="relaxation"
        aria-label="Relaxation & Mindful Pause"
        className="relative isolate overflow-hidden flex min-h-[100svh] flex-col justify-center py-6 sm:py-8 lg:py-10 text-white"
      >
        {/* 1. Scenic Nature Background + Calming Twilight Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/images/wellness-nature.jpg"
            alt="Peaceful nature landscape with warm sunbeams in serene green forest"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-center scale-105 filter brightness-90 transition-transform duration-1000"
          />

          {/* Deep Twilight Overlays */}
          <div className="absolute inset-0 bg-[#0A1424]/85 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#162238]/95 via-transparent to-[#162238]/95" />

          {/* Floating Ethereal Forest Fireflies */}
          {FIREFLIES.map((ff, i) => (
            <div
              key={i}
              className="firefly-particle absolute rounded-full pointer-events-none"
              style={{
                left: ff.left,
                top: ff.top,
                width: ff.size,
                height: ff.size,
                backgroundColor: ff.color,
                boxShadow: `0 0 ${ff.size * 2}px ${ff.color}`,
                animation: `fireflyDrift ${ff.duration} ease-in-out infinite ${ff.delay}`,
              }}
            />
          ))}
        </div>

        {/* 2. Interactive Mindful Content (Viewport-Tuned Layout) */}
        <div className="wellness-container relative z-10 w-full flex flex-col justify-center">
          <FadeUp delay={0.08} distance={18} className="max-w-xl mx-auto text-center space-y-3 sm:space-y-4">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider text-[#F3CEEC] uppercase shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-current text-[#F3CEEC]" />
              <span>A Safe Haven for Your Heart</span>
            </div>

            {/* Heading with Luminous Shimmer */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-normal leading-[1.16] tracking-tight text-white">
              You Don&apos;t Have to Navigate{" "}
              <span className="mindful-glow-text">Everything Alone.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light max-w-lg mx-auto">
              Professional counseling and psychological support delivered with compassion,
              confidentiality, and scientific expertise. Take the first step toward lasting peace of mind.
            </p>

            {/* 3. Mindful 4-7-8 Breathing Guide Card */}
            <div className="pt-1">
              <div
                className="mindful-breathing-card relative p-4 sm:p-5 rounded-[28px] bg-white/[0.08] backdrop-blur-xl border border-white/20 max-w-sm mx-auto shadow-2xl text-center overflow-hidden transition-all duration-700"
                style={{
                  boxShadow: `0 16px 40px -8px rgba(10, 20, 36, 0.8), 0 0 28px ${currentPhase.glowColor}`,
                }}
              >
                {/* Ambient Shifting Backlight */}
                <div
                  className="absolute -inset-1 rounded-[30px] opacity-25 blur-xl pointer-events-none transition-all duration-1000"
                  style={{
                    background: `radial-gradient(circle, ${currentPhase.glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Card Header Row */}
                <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#F3CEEC]">
                    <Wind className="w-3.5 h-3.5 text-[#F3CEEC] animate-spin-slow" />
                    <span>Mindful Pause • 4-7-8 Rhythm</span>
                  </div>

                  <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                    Cycle {cycleCount}
                  </span>
                </div>

                {/* Animated Breathing Circle Assembly */}
                <div className="relative my-3 sm:my-4 flex items-center justify-center">
                  {/* Outer Concentric Echo Waves */}
                  {isPlaying && (
                    <>
                      <div
                        className="absolute w-28 h-28 rounded-full pointer-events-none breathing-echo-ring"
                        style={{
                          borderColor: currentPhase.ringGradient[0],
                          animationDuration: `${currentPhase.duration}s`,
                        }}
                      />
                      <div
                        className="absolute w-28 h-28 rounded-full pointer-events-none breathing-echo-ring-delayed"
                        style={{
                          borderColor: currentPhase.ringGradient[1],
                          animationDuration: `${currentPhase.duration}s`,
                        }}
                      />
                    </>
                  )}

                  {/* SVG Animated Circular Progress Ring */}
                  <svg
                    className="w-32 h-32 -rotate-90 transform pointer-events-none"
                    viewBox="0 0 128 128"
                  >
                    <defs>
                      <linearGradient id="breathingRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={currentPhase.ringGradient[0]} />
                        <stop offset="100%" stopColor={currentPhase.ringGradient[1]} />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="url(#breathingRingGrad)"
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>

                  {/* Main Breathing Core Orb */}
                  <div
                    onClick={togglePlay}
                    role="button"
                    tabIndex={0}
                    aria-label={`${currentPhase.name}: ${secondsLeft} seconds remaining. Click to pause or resume`}
                    className="absolute w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer select-none transition-transform duration-1000 ease-in-out shadow-xl active:scale-95"
                    style={{
                      transform: `scale(${isPlaying ? currentPhase.scale : 1})`,
                      background: `linear-gradient(135deg, ${currentPhase.ringGradient[1]} 0%, #0D55AE 100%)`,
                      boxShadow: `0 0 22px ${currentPhase.glowColor}, inset 0 2px 8px rgba(255,255,255,0.35)`,
                    }}
                  >
                    <span className="text-xs font-extrabold tracking-wider uppercase text-white drop-shadow-sm">
                      {currentPhase.name}
                    </span>
                    <span className="font-mono text-lg font-bold text-white/95 leading-tight">
                      {secondsLeft}s
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-white/70">
                      {isPlaying ? "Active" : "Paused"}
                    </span>
                  </div>
                </div>

                {/* Real-time Dynamic Breath Guidance Instruction */}
                <div className="min-h-[2rem] flex items-center justify-center px-1">
                  <p className="text-xs text-white/90 font-medium leading-relaxed">
                    {currentPhase.instruction}
                  </p>
                </div>

                {/* 4-7-8 Phase Step Pills Bar */}
                <div className="mt-2.5 flex items-center justify-center gap-1.5">
                  {PHASES.map((p, idx) => {
                    const isActive = idx === phaseIndex;
                    return (
                      <div
                        key={p.name}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border transition-all duration-300 ${
                          isActive
                            ? `${p.badgeColor} shadow-sm scale-105`
                            : "bg-white/5 border-white/10 text-white/50"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            isActive ? "bg-white" : "bg-white/30"
                          }`}
                        />
                        <span>
                          {p.duration}s {p.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Controls Row */}
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/75 px-1">
                  <span>Scientific 4-7-8 vagus calming</span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause breathing" : "Resume breathing"}
                      className="p-1 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>

                    <button
                      type="button"
                      onClick={resetBreathing}
                      aria-label="Restart cycle"
                      className="p-1 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#A3248F] to-[#8A1C79] hover:from-[#B82B9F] hover:to-[#9B2189] px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-[#A3248F]/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </button>

              <Link
                href="/services#tele"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Video className="h-4 w-4" />
                <span>Online Consultation</span>
              </Link>
            </div>

            {/* Reassurances List */}
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-1 text-[11px] sm:text-xs text-white/75">
              {reassurances.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[#E8B4DC]" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

const relaxationAnimStyles = `
/* Luminous Gradient Shimmer Text */
.mindful-glow-text {
  background: linear-gradient(100deg, #F3CEEC 0%, #E8B4DC 40%, #FFFFFF 65%, #E8B4DC 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shineGlow 5s linear infinite;
}

@keyframes shineGlow {
  to {
    background-position: 200% center;
  }
}

/* Floating Ethereal Fireflies in Background */
@keyframes fireflyDrift {
  0% {
    transform: translateY(0) translateX(0) scale(0.8);
    opacity: 0.15;
  }
  30% {
    opacity: 0.85;
    transform: translateY(-24px) translateX(10px) scale(1.1);
  }
  60% {
    opacity: 0.35;
    transform: translateY(-50px) translateX(-8px) scale(0.9);
  }
  100% {
    transform: translateY(-90px) translateX(12px) scale(0.6);
    opacity: 0;
  }
}

/* Concentric Echo Ripple Waves */
.breathing-echo-ring {
  border: 1.5px solid;
  animation: echoWave 4s ease-out infinite;
}

.breathing-echo-ring-delayed {
  border: 1px dashed;
  animation: echoWave 4s ease-out infinite 1.5s;
}

@keyframes echoWave {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  60% {
    transform: scale(1.25);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

.animate-spin-slow {
  animation: spin 12s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .firefly-particle,
  .breathing-echo-ring,
  .breathing-echo-ring-delayed,
  .animate-spin-slow {
    animation: none !important;
  }
}
`;
