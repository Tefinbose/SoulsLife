"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Compass,
  Users,
  HeartPulse,
  Smile,
  HandHeart,
  BrainCircuit,
  Video,
  Presentation,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BookSessionButton from "@/components/buttons/BookSessionButton";
import { FadeUp } from "@/components/ui/MotionSection";

const AUTO_SCROLL_INTERVAL = 3800;

const services = [
  {
    id: "student",
    category: "students",
    title: "Student Counseling & Academic Support",
    desc: "Support for exam anxiety, concentration problems, study habits and low motivation.",
    tags: ["Exam anxiety", "Focus & study habits", "Adolescent care"],
    image: "/images/student-guidance.jpg",
    icon: GraduationCap,
  },
  {
    id: "career",
    category: "students",
    title: "Career Guidance & Skill Development",
    desc: "Career assessments, stream selection after 10th and 12th, and a clear roadmap for your next step.",
    tags: ["Stream selection", "Aptitude testing", "Career roadmap"],
    image: "/images/counseling-assessment.png",
    icon: Compass,
  },
  {
    id: "family",
    category: "relationships",
    title: "Family & Marital Counseling",
    desc: "Conflict resolution, couple mediation and pre-marital counseling for healthier relationships.",
    tags: ["Couple mediation", "Pre-marital", "Family harmony"],
    image: "/images/couples-therapy.jpg",
    icon: Users,
  },
  {
    id: "mental-health",
    category: "wellness",
    title: "Mental Health & Emotional Wellness",
    desc: "Evidence-based therapy for anxiety, depression, chronic stress, burnout, trauma and grief.",
    tags: ["Anxiety & depression", "Burnout", "Trauma recovery"],
    image: "/images/mindful-healing.jpg",
    icon: HeartPulse,
  },
  {
    id: "child",
    category: "specialized",
    title: "Child Development & Learning Support",
    desc: "Screening for ADHD and learning difficulties, behavioural support and parenting guidance.",
    tags: ["ADHD screening", "Learning delays", "Parenting"],
    image: "/images/child-play-therapy.jpg",
    icon: Smile,
  },
  {
    id: "elderly",
    category: "specialized",
    title: "Elderly Emotional Support",
    desc: "Counseling for senior citizens dealing with loneliness, health worries, loss and life changes.",
    tags: ["Loneliness", "Ageing & health", "Grief"],
    image: "/images/counselling-interior.jpg",
    icon: HandHeart,
  },
  {
    id: "assessment",
    category: "assessments",
    title: "Psychological Assessments & IQ Testing",
    desc: "Standardized IQ, aptitude and cognitive tests with a written clinical report.",
    tags: ["IQ tests", "Aptitude tests", "Written report"],
    image: "/images/clinic-sanctuary.jpg",
    icon: BrainCircuit,
  },
  {
    id: "tele",
    category: "wellness",
    title: "Tele-Counseling & Remote Support",
    desc: "Confidential video and audio sessions for clients across Kerala and worldwide.",
    tags: ["Video or phone", "Malayalam & English", "Confidential"],
    image: "/images/hero-therapy-session.jpg",
    icon: Video,
  },
  {
    id: "workshops",
    category: "specialized",
    title: "Workshops & Training Programs",
    desc: "Dynamic institutional and corporate training in stress mastery, emotional intelligence, and life skills.",
    tags: ["Schools & colleges", "Workplaces", "Life skills"],
    image: "/images/community-support.jpg",
    icon: Presentation,
  },
];

const categoryTabs = [
  { id: "all", label: "All Services (9)" },
  { id: "students", label: "Students & Youth" },
  { id: "relationships", label: "Couples & Family" },
  { id: "wellness", label: "Emotional Wellness" },
  { id: "specialized", label: "Child & Elderly" },
  { id: "assessments", label: "Psychological Testing" },
];

export default function ServicesAttractive() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const filtered =
    selectedCategory === "all" ? services : services.filter((s) => s.category === selectedCategory);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < max - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, filtered]);

  const selectCategory = (id) => {
    setSelectedCategory(id);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth || 320;
    const scrollAmount = cardWidth + 20; // card + gap
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  // Subtle auto-advance in a single viewport view
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      if (el.scrollLeft >= max - 15) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = el.querySelector("article")?.offsetWidth || 320;
        el.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, filtered]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-8 sm:py-12 lg:py-14 overflow-hidden bg-gradient-to-b from-[#FAF8FD] via-white to-[#FAF8FD]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="wellness-container w-full">
        {/* Header Row */}
        <FadeUp delay={0.08} distance={18}>
          <div className="mb-4 sm:mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="section-label-chip inline-flex mb-1.5">
                OUR SPECIALIZATIONS
              </span>
              <h2
                id="services-heading"
                className="font-display text-2xl sm:text-3xl lg:text-[38px] font-normal leading-[1.15] tracking-tight text-[#162238]"
              >
                Care That Meets You{" "}
                <span className="animated-gradient-text">Where You Are</span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#4A5B73]">
                Personalized, evidence-based psychological support across nine core specialized areas.
              </p>
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard("left")}
                disabled={!canScrollLeft}
                aria-label="Previous services"
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3248F]/50 ${
                  canScrollLeft
                    ? "border-[#A3248F]/30 bg-white text-[#A3248F] shadow-sm hover:bg-[#FDF2F9] active:scale-95"
                    : "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-300"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard("right")}
                disabled={!canScrollRight}
                aria-label="Next services"
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3248F]/50 ${
                  canScrollRight
                    ? "border-[#A3248F]/30 bg-white text-[#A3248F] shadow-sm hover:bg-[#FDF2F9] active:scale-95"
                    : "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-300"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </FadeUp>

        {/* Filter Category Chips */}
        <FadeUp delay={0.12} distance={14}>
          <div
            role="group"
            aria-label="Filter services by category"
            className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1"
          >
            {categoryTabs.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => selectCategory(tab.id)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3248F]/50 ${
                    active
                      ? "bg-[#A3248F] text-white shadow-md shadow-[#A3248F]/20"
                      : "border border-neutral-200 bg-white text-[#162238] hover:border-[#A3248F]/40 hover:text-[#A3248F]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Viewport-Tuned Horizontal Services Carousel */}
        <FadeUp delay={0.16} distance={18}>
          <div
            ref={trackRef}
            role="region"
            aria-label="Services carousel track"
            tabIndex={0}
            className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-4 sm:gap-5 overflow-x-auto scroll-smooth py-1 focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filtered.map(({ id, title, desc, tags, image }) => (
              <article
                key={id}
                className="group flex w-[82vw] sm:w-[310px] lg:w-[330px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-[#A3248F]/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Card Media Preview */}
                <div className="relative h-36 sm:h-40 bg-neutral-100 overflow-hidden">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82vw, 330px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold leading-snug text-[#162238] line-clamp-1">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#4A5B73] line-clamp-2">
                    {desc}
                  </p>

                  {/* Micro-tags */}
                  <ul className="mt-2.5 flex flex-wrap gap-1">
                    {tags.slice(0, 2).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-[#FDF2F9] px-2 py-0.5 text-[10.5px] font-medium text-[#8A1C79]"
                      >
                        {tag}
                      </li>
                    ))}
                    {tags.length > 2 && (
                      <li className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10.5px] text-[#4A5B73]">
                        +{tags.length - 2}
                      </li>
                    )}
                  </ul>

                  {/* Card Bottom CTA Bar */}
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-3">
                    <BookSessionButton
                      serviceTitle={title}
                      className="btn-nature-primary px-3 py-1.5 text-xs font-semibold"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Book</span>
                    </BookSessionButton>

                    <Link
                      href={`/services#${id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#A3248F] underline-offset-4 hover:underline focus-visible:outline-none"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FadeUp>

        {/* Bottom Utility Bar */}
        <FadeUp delay={0.2} distance={12}>
          <div className="mt-3 sm:mt-4 flex items-center justify-between gap-4 px-1">
            <span className="text-xs font-medium text-[#4A5B73]">
              {filtered.length} {filtered.length === 1 ? "specialization" : "specializations"} • Swipe or arrows to browse
            </span>

            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#A3248F] underline-offset-4 hover:underline"
            >
              <span>Explore all services</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
