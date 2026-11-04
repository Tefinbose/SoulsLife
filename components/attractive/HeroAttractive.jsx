"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/homeData";

const SLIDE_DURATION = 7000;

const slides = [
  {
    id: 1,
    image: "/images/soulslife-sanctuary-hero.jpg",
    alt: "Warm and peaceful therapy sanctuary with cozy armchair and ambient light at Souls Life Wellbeing Center",
    chip: "WELCOME TO SOULS LIFE",
    titleLine1: "A quiet space for the",
    titleLine2: "mind to heal.",
    description:
      "One-on-one mental health care in a supportive, empathetic, and confidential environment — by Kerala's dedicated psychology professionals.",
  },
  {
    id: 2,
    image: "/images/hero-therapy-session.jpg",
    alt: "Confidential individual and family counseling in Wandoor Malappuram",
    chip: "COMPASSIONATE PSYCHOLOGICAL CARE",
    titleLine1: "Confidential guidance",
    titleLine2: "when you need it most.",
    description:
      "Empathetic therapy for anxiety, student stress, marital harmony, and emotional resilience tailored to your unique life journey.",
  },
  {
    id: 3,
    image: "/images/clinic-sanctuary.jpg",
    alt: "Souls Life clinic sanctuary in Wandoor Kerala",
    chip: "IN-CLINIC & TELE-HEALTH SESSIONS",
    titleLine1: "Restoring balance & peace",
    titleLine2: "to your daily life.",
    description:
      "Visit our tranquil clinic in Wandoor, Malappuram or connect seamlessly with licensed clinical counselors worldwide via encrypted video call.",
  },
];

/*
 * Plein (headings), Britney (badge) and Satoshi (body) are loaded from the
 * Fontshare CDN, so no new folders or font files are needed in the project.
 */
const heroStyles = `
.hero-root {
  font-family: 'Satoshi', system-ui, -apple-system, 'Segoe UI', sans-serif;
}
.font-display {
  font-family: 'Plein', 'Satoshi', system-ui, sans-serif;
}
.hero-chip {
  font-family: 'Britney', 'Satoshi', system-ui, sans-serif;
  font-weight: 400;
}

/* Full viewport layout on all screen sizes */
.hero-stage {
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 100vh;
}
@media (min-width: 640px) {
  .hero-stage {
    height: 100vh;
    min-height: 100vh;
  }
}
@media (min-width: 1024px) {
  .hero-stage {
    height: 100vh;
    min-height: 100vh;
  }
}

.hero-title {
  font-family: 'Plein', 'Satoshi', system-ui, sans-serif;
  font-size: clamp(2.2rem, 1.2rem + 4vw, 5.2rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 400;
  color: #fff;
  margin: 0;
}
.hero-title-accent {
  font-weight: 400;
  font-style: normal;
}

.hero-stack > * + * { margin-top: 1.1rem; }

.hero-trust {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 0.9rem;
  row-gap: 0.5rem;
}
.hero-trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,.2);
  background: rgba(255,255,255,.1);
}

@keyframes hero-rise {
  from { opacity: 0; transform: translateY(14px); filter: blur(3px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
@keyframes hero-fade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes hero-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes hero-kenburns {
  from { transform: scale(1) translate3d(0, 0, 0); }
  to   { transform: scale(1.09) translate3d(-1.2%, -0.8%, 0); }
}
@keyframes hero-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

.hero-anim-chip  { animation: hero-fade 0.45s 0.02s cubic-bezier(.22,1,.36,1) both; }
.hero-anim-l1    { animation: hero-rise 0.55s 0.06s cubic-bezier(.22,1,.36,1) both; }
.hero-anim-l2    { animation: hero-rise 0.55s 0.12s cubic-bezier(.22,1,.36,1) both; }
.hero-anim-desc  { animation: hero-fade 0.55s 0.18s cubic-bezier(.22,1,.36,1) both; }
.hero-anim-trust { animation: hero-fade 0.55s 0.24s cubic-bezier(.22,1,.36,1) both; }
.hero-anim-cta   { animation: hero-fade 0.55s 0.28s cubic-bezier(.22,1,.36,1) both; }

.hero-kenburns { animation: hero-kenburns ${SLIDE_DURATION + 1500}ms ease-out both; }

.hero-progress-fill {
  transform-origin: left center;
  animation: hero-progress ${SLIDE_DURATION}ms linear both;
}

.hero-shimmer-btn { position: relative; overflow: hidden; }
.hero-shimmer-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.28) 50%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 0.9s ease;
}
.hero-shimmer-btn:hover::after { transform: translateX(120%); }

@media (prefers-reduced-motion: reduce) {
  .hero-anim-chip, .hero-anim-l1, .hero-anim-l2, .hero-anim-desc,
  .hero-anim-trust, .hero-anim-cta, .hero-kenburns {
    animation: none !important;
  }
}
`;

export default function HeroAttractive() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play slideshow every 7 seconds when not hovered / focused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentSlide]);

  // Keyboard navigation (left / right arrows)
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const handleOpenBooking = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-booking-modal"));
    }
  };

  const active = slides[currentSlide];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section
      className="hero-root relative w-full min-h-screen overflow-hidden bg-[#162238]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Hero Section"
    >
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />

      {/* Background Image Slider Container with Viewport-Optimized Height */}
      <div className="hero-stage">
        {slides.map((slide, index) => {
          const isCurrent = index === currentSlide;
          return (
            <div
              key={slide.id}
              aria-hidden={!isCurrent}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className={`object-cover object-center will-change-transform ${isCurrent ? "hero-kenburns" : ""
                  }`}
                sizes="100vw"
              />
            </div>
          );
        })}

        {/* Brand Harmonized Twilight Overlay (Deep Midnight + Berry Plum + Royal Blue Gradient) */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(22, 34, 56, 0.95) 0%, rgba(35, 22, 52, 0.88) 40%, rgba(22, 34, 56, 0.55) 70%, rgba(22, 34, 56, 0.30) 100%)",
          }}
        />

        {/* Soft Vignette and Ambient Depth */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#162238]/50 via-transparent to-[#162238]/40 pointer-events-none" />

        {/* Soft ambient glow orbs for a calming, premium feel */}
        <div className="absolute -left-24 top-1/4 z-20 h-72 w-72 rounded-full bg-[#A3248F]/15 blur-3xl pointer-events-none" />

        {/* Content Container — keyed so text re-animates on every slide change */}
        <div className="relative z-30 h-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 flex flex-col justify-center">
          <div
            key={active.id}
            className="hero-stack max-w-2xl lg:max-w-3xl pt-16 sm:pt-12 lg:pt-8"
            aria-live="polite"
          >
            {/* Badge */}
            <div className="hero-anim-chip hero-chip inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-gradient-to-r from-white/15 to-white/5 py-1.5 px-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md">
              <span className="text-[12px] uppercase tracking-[0.12em] text-white sm:text-[13px]">
                {active.chip}
              </span>
              <span className="hidden h-3.5 w-px bg-white/30 sm:block" />
              <span className="hidden text-[13px] text-white/75 sm:inline">Wandoor, Kerala</span>
            </div>

            {/* Headline: Plein, white first line + gradient second line */}
            <h1 className="hero-title drop-shadow-sm">
              <span className="hero-anim-l1 block">{active.titleLine1}</span>
              <span className="hero-anim-l2 hero-title-accent block text-[#F3CEEC] pb-1">
                {active.titleLine2}
              </span>
            </h1>



            {/* Sub-headline description */}
            <p className="hero-anim-desc text-white/85 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-xl font-normal drop-shadow-xs">
              {active.description}
            </p>

            {/* Trust Micro-Badges */}
            <div className="hero-anim-trust hero-trust text-xs text-white/85">
              <div className="hero-trust-badge backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E27BD2]" />
                <span>100% Confidential</span>
              </div>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span>RCI &amp; MSW Certified Specialists</span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span>In-Person &amp; Video</span>
            </div>

            {/* Call To Action Buttons Styled with Logo Brand Colors */}
            <div className="hero-anim-cta flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleOpenBooking}
                className="hero-shimmer-btn group inline-flex items-center gap-2.5 bg-[#A3248F] hover:bg-[#8A1C79] text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-lg shadow-[#A3248F]/25 hover:shadow-xl hover:shadow-[#A3248F]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#162238]"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href={`tel:+91${siteConfig.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/35 text-white font-medium text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <Phone className="w-3.5 h-3.5 text-[#F3CEEC]" />
                <span>Call Helpline</span>
              </a>

              <a
                href="#services"
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors ml-2 py-2"
              >
                <span>View Specializations</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Edge Arrow Controls — hidden on mobile (swipe to navigate) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-5 top-1/2 -translate-y-1/2 z-30 hidden sm:flex w-11 h-11 rounded-full border border-white/25 bg-white/10 hover:bg-white/25 backdrop-blur-md text-white items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-5 top-1/2 -translate-y-1/2 z-30 hidden sm:flex w-11 h-11 rounded-full border border-white/25 bg-white/10 hover:bg-white/25 backdrop-blur-md text-white items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Pagination Dashes with Live Autoplay Progress */}
        <div className="absolute bottom-6 sm:bottom-9 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((slide, index) => {
            const isCurrent = index === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isCurrent}
                className={`relative overflow-hidden h-1.5 transition-all duration-500 rounded-full cursor-pointer ${isCurrent ? "w-10 sm:w-12 bg-white/30" : "w-4 sm:w-5 bg-white/35 hover:bg-white/70"
                  }`}
              >
                {isCurrent && (
                  <span
                    key={`progress-${currentSlide}`}
                    className="hero-progress-fill absolute inset-0 rounded-full bg-white"
                    style={{ animationPlayState: isPaused ? "paused" : "running" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Organic Curved Wave Transition into Next Section */}
        <div className="absolute -bottom-1 left-0 right-0 z-30 pointer-events-none">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8 sm:h-10 lg:h-12 text-[#FAF8FD]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C320,55 680,10 1020,38 C1220,55 1380,35 1440,25 L1440,60 L0,60 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}