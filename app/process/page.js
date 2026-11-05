import { Calendar, MessageCircle, PhoneCall, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/interactive/InteractiveBackground";
import BookSessionButton from "@/components/buttons/BookSessionButton";
import { siteConfig } from "@/data/homeData";
import { FadeUp, FadeIn, StaggerList } from "@/components/ui/MotionSection";

export const metadata = {
  title: "Counseling Process | Souls Life Wellbeing Center",
  description:
    "How counseling works at Souls Life: from the first consultation and assessment to your therapy plan, regular sessions, progress reviews and follow-up, in Wandoor, Malappuram.",
};

const steps = [
  {
    title: "Step 1 – Initial Consultation",
    desc: "Understanding the client's concerns and background.",
    points: [
      "Confidential discussion of challenges, expectations, and goals",
      "Compassionate, non-judgmental active listening by qualified experts",
    ],
  },
  {
    title: "Step 2 – Assessment",
    desc: "Scientific evaluation and psychological assessment.",
    points: [
      "Evidence-based cognitive, emotional, and aptitude evaluation",
      "Identification of core emotional patterns and situational factors",
    ],
  },
  {
    title: "Step 3 – Personalized Plan",
    desc: "Customized therapy or counseling approach.",
    points: [
      "Tailored therapeutic approach matching client needs and goals",
      "Clear milestones for in-person or remote tele-counseling",
    ],
  },
  {
    title: "Step 4 – Counseling Sessions",
    desc: "One-on-one or group sessions.",
    points: [
      "Structured counseling and life skills interventions",
      "Practical exercises and emotional regulation techniques",
    ],
  },
  {
    title: "Step 5 – Progress Review",
    desc: "Monitoring emotional and behavioral improvement.",
    points: [
      "Periodic review of emotional resilience and behavioral outcomes",
      "Adaptive adjustment of counseling plans to the client's pace",
    ],
  },
  {
    title: "Step 6 – Follow-Up Support",
    desc: "Ensuring long-term emotional stability and growth.",
    points: [
      "Reinforcing sustainable coping mechanisms and self-reliance",
      "Ongoing check-in sessions whenever support is needed",
    ],
  },
];

export default function ProcessPage() {
  const whatsappUrl = `https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
    "Hello Souls Life, I would like to book an initial consultation."
  )}`;

  return (
    <div className="wellness-page-wrap page-root relative">
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="pb-8 pt-12 lg:pb-10 lg:pt-16">
          <div className="wellness-container">
            <div className="mx-auto max-w-2xl text-center">
              <FadeIn delay={0}>
                <span className="section-label-chip mb-3 inline-flex">
                  STEP-BY-STEP ROADMAP
                </span>
              </FadeIn>
              <FadeUp delay={0.1}>
                <h1 className="page-display text-3xl font-normal leading-tight tracking-tight text-[#162238] sm:text-4xl lg:text-5xl">
                  How Counseling <span className="animated-gradient-text">Works</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-4 text-sm leading-7 text-[#4A5B73] sm:text-base">
                  Starting counseling can feel like a big step. Here is what to expect, from your first
                  conversation to follow-up, at a pace that suits you.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="pb-14 lg:pb-20">
          <div className="wellness-container">
            <ol className="mx-auto max-w-3xl">
              {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <li key={step.title} className="relative flex gap-4 sm:gap-6">
                    {/* Number + connector line */}
                    <div className="flex flex-col items-center">
                      <span
                        aria-hidden="true"
                        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#A3248F]/25 bg-gradient-to-br from-[#A3248F]/10 to-[#0D55AE]/10 text-sm font-bold text-[#A3248F] shadow-xs"
                      >
                        {i + 1}
                      </span>
                      {!isLast && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-gradient-to-b from-[#A3248F]/40 to-[#0D55AE]/20" />}
                    </div>

                    {/* Content */}
                    <FadeUp delay={i * 0.08} distance={20} className={isLast ? "pb-0 flex-1" : "pb-8 flex-1"}>
                      <div className="rounded-3xl border border-[#A3248F]/15 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <h2 className="page-display text-lg font-normal text-[#162238] sm:text-xl">
                          <span className="sr-only">Step {i + 1}: </span>
                          {step.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-[#4A5B73]">{step.desc}</p>
                        <ul className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                          {step.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5 text-sm text-[#243746]">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A3248F]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </FadeUp>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 lg:pb-24">
          <div className="wellness-container">
            <FadeUp distance={32}>
              <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#162238] via-[#2A1650] to-[#0D55AE] p-8 text-center text-white shadow-2xl sm:p-12">
                <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-[#A3248F]/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-[#4C93F0]/25 blur-3xl" />

                <div className="relative z-10">
                  <span className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-widest backdrop-blur-sm">
                    START YOUR HEALING
                  </span>
                  <h2 className="page-display mt-2 text-2xl font-normal sm:text-3xl lg:text-4xl">
                    Ready to take the first step?
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                    You decide the pace. Visit us in Wandoor or start with an online video consultation from home.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <BookSessionButton className="btn-nature-primary px-6 py-3 text-sm shadow-md">
                      <Calendar className="h-4 w-4" />
                      <span>Book Initial Consultation</span>
                    </BookSessionButton>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-nature-whatsapp px-5 py-3 text-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="tel:+918848151514"
                      className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span>+91 8848151514</span>
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
