"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Check } from "lucide-react";
import BookSessionButton from "@/components/buttons/BookSessionButton";
import { FadeUp } from "@/components/ui/MotionSection";

const steps = [
  {
    title: "Initial Consultation",
    desc: "Understanding your concerns, personal context and goals in a warm, non-judgmental space.",
    tag: "Safe, confidential dialogue",
    image: "/images/process/process-1-consultation.svg",
    alt: "Two speech bubbles in conversation",
  },
  {
    title: "In-Depth Assessment",
    desc: "Standardized psychological tools that help us understand the roots of your emotional patterns.",
    tag: "Validated psychometric tools",
    image: "/images/process/process-2-assessment.svg",
    alt: "A clipboard checklist with a magnifying glass",
  },
  {
    title: "Personalized Plan",
    desc: "A therapy roadmap tailored to your needs, your pace and your goals.",
    tag: "Goal-oriented roadmap",
    image: "/images/process/process-3-plan.svg",
    alt: "A winding path with milestones leading to a flag",
  },
  {
    title: "Counseling Sessions",
    desc: "Supportive one-on-one sessions using CBT, humanistic therapy and mindfulness techniques.",
    tag: "Guided weekly care",
    image: "/images/process/process-4-sessions.svg",
    alt: "Two armchairs facing each other in a calm room",
  },
  {
    title: "Progress Review",
    desc: "Regular check-ins on your wellbeing, stress levels and the milestones you are reaching.",
    tag: "Tangible growth tracking",
    image: "/images/process/process-5-progress.svg",
    alt: "A rising chart showing steady progress",
  },
  {
    title: "Follow-Up Support",
    desc: "Coping habits and self-care tools that help you stay well after sessions end.",
    tag: "Lifelong resilience toolkit",
    image: "/images/process/process-6-followup.svg",
    alt: "A shield with a heart surrounded by a continuous loop",
  },
];

export default function ProcessAttractive() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative flex min-h-[100svh] flex-col justify-center py-8 sm:py-12 lg:py-14 overflow-hidden bg-gradient-to-b from-white via-[#FAF8FD] to-white"
    >
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[#A3248F]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-[#7C3AED]/5 blur-3xl" />

      <div className="wellness-container relative z-10 w-full flex flex-col justify-center">
        {/* Header */}
        <FadeUp delay={0.08} distance={18} className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center">
          <span className="section-label-chip inline-flex items-center mb-1.5">
            OUR PROCESS
          </span>
          <h2
            id="process-heading"
            className="font-display text-2xl sm:text-3xl lg:text-[38px] font-normal leading-[1.15] tracking-tight text-[#162238]"
          >
            A Simple and{" "}
            <span className="animated-gradient-text">Supportive Journey</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4A5B73] leading-relaxed">
            Beginning counseling is a courageous step. Every phase is transparent, compassionate and conducted at
            your own comfortable pace.
          </p>
        </FadeUp>

        {/* Steps Grid */}
        <FadeUp delay={0.14} distance={20} className="w-full">
          <ol className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 py-1 sm:mx-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="group flex w-[82vw] sm:w-auto shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A3248F]/40 hover:shadow-xl"
              >
                {/* Visual Graphic with Step Badge */}
                <div className="relative aspect-[8/5] bg-[#FDF2F9] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#A3248F] shadow-sm">
                    Step {i + 1}
                  </span>
                </div>

                {/* Content Body */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-[#162238] leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#4A5B73]">
                    {step.desc}
                  </p>
                  <p className="mt-auto inline-flex items-center gap-1.5 pt-3.5 text-xs font-semibold text-[#8A1C79]">
                    <Check className="h-3.5 w-3.5 text-[#A3248F]" />
                    <span>{step.tag}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </FadeUp>

        {/* Bottom Actions */}
        <FadeUp delay={0.2} distance={14} className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
          <BookSessionButton
            serviceTitle="Process Consultation"
            className="btn-nature-primary px-6 py-3 text-sm shadow-md transition-all hover:scale-[1.02]"
          >
            <Calendar className="h-4 w-4" />
            <span>Book a Consultation</span>
          </BookSessionButton>

          <Link
            href="/process"
            className="btn-nature-secondary inline-flex items-center gap-2 px-6 py-3 text-sm transition-all hover:scale-[1.02]"
          >
            <span>Learn more about our process</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
