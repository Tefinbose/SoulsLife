import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck, Heart, Eye, Target, Users, Calendar, MessageCircle, GraduationCap, ShieldAlert,
  Compass, HeartHandshake, CheckCircle2, Check, ArrowRight, Activity, Smile, PhoneCall, Lock, MapPin,
  Languages, Sparkles,
} from "lucide-react";
import "@/app/wellness-theme.css";
import "@/app/souls-animated.css";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/interactive/InteractiveBackground";
import BookSessionButton from "@/components/buttons/BookSessionButton";
import PeaceDoves, { ModernPeaceDove } from "@/components/interactive/PeaceDoves";
import { siteConfig } from "@/data/homeData";
import { FadeUp, FadeIn, StaggerList } from "@/components/ui/MotionSection";

export const metadata = {
  title: "About Us | Souls Life Wellbeing Center",
  description:
    "Learn about Souls Life Wellbeing Center — our story, vision, multidisciplinary approach, and community mental health initiatives in Wandoor, Malappuram, Kerala.",
};

const keyStrengths = [
  { icon: ShieldCheck, title: "100% Confidential", desc: "Strict clinical privacy and compassionate, non-judgmental guidance." },
  { icon: Users, title: "Multidisciplinary Care", desc: "Clinical Psychologists & Medical Social Workers collaborating together." },
  { icon: Activity, title: "Dual Mode Accessibility", desc: "Peaceful clinic in Wandoor + encrypted worldwide tele-video sessions." },
  { icon: Smile, title: "Community Impact", desc: "Grassroots outreach across schools, colleges, and families in Kerala." },
];

const approachPillars = [
  { number: "01", title: "Scientific Psychology", badge: "Clinical Rigor", desc: "Evidence-based therapeutic modalities including Cognitive Behavioral Therapy (CBT), standardized psychometric tests, and mindfulness techniques." },
  { number: "02", title: "Medical Social Work", badge: "Holistic Context", desc: "A holistic, psychosocial perspective that evaluates family environments, marital dynamics, and social pressures affecting mental wellness." },
  { number: "03", title: "Emotional Intelligence", badge: "Self-Awareness", desc: "Guiding clients to identify, acknowledge, and regulate challenging feelings, transforming overwhelm into self-awareness and inner peace." },
  { number: "04", title: "Life Skills Training", badge: "Lifelong Resilience", desc: "Practical daily coping tools, healthy boundary setting, assertive communication, and proactive problem-solving strategies for all ages." },
];

const missionPoints = [
  "Provide accessible, ethical, and affordable psychological services to every section of society.",
  "Promote emotional literacy and dismantle social stigmas surrounding counseling in Kerala.",
  "Equip students, adolescents, and adults with healthy coping habits, self-worth, and resilience.",
  "Strengthen marital harmony and familial understanding through empathetic, structured mediation.",
  "Actively collaborate with schools, colleges, and grassroots organizations to build resilient communities.",
];

const coreValues = [
  { icon: Heart, title: "Unconditional Positive Regard", desc: "Every person entering our doors is treated with absolute dignity, deep empathy, and unbiased warmth." },
  { icon: Lock, title: "Strict Ethical Privacy", desc: "Zero judgment and complete clinical confidentiality protected under healthcare ethics standards." },
  { icon: Sparkles, title: "Client-Centered Empowerment", desc: "We do not dictate choices; we gently guide you to discover your own clarity, strength, and answers." },
  { icon: Languages, title: "Culturally Grounded Care", desc: "Compassionate bilingual counseling in native Malayalam and English, deeply attuned to local family values." },
];

const communityList = [
  { title: "School Mental Health Programs", icon: GraduationCap, desc: "Workshops for adolescent emotional regulation, exam stress reduction, and healthy screen habits." },
  { title: "College Awareness Campaigns", icon: Users, desc: "Interactive youth dialogues on peer relationships, career dilemmas, anxiety, and depression awareness." },
  { title: "Community Counseling Camps", icon: HeartHandshake, desc: "Free and subsidized emotional wellness check-ins conducted in rural and semi-urban pockets of Malappuram." },
  { title: "Suicide Prevention Initiatives", icon: ShieldAlert, desc: "Community gatekeeper training, crisis sensitization, and distress helpline advocacy." },
  { title: "Women & Family Empowerment", icon: Smile, desc: "Dedicated support circles addressing postpartum stress, work-life balance, and domestic harmony." },
  { title: "Youth Career & Aptitude Profiling", icon: Compass, desc: "Scientific psychometric testing and personalized stream guidance after 10th & 12th standards." },
];

const fontCss = `
@import url('https://api.fontshare.com/v2/css?f[]=plein@400&f[]=satoshi@400,500,700&display=swap');
.about-root { font-family: 'Satoshi', system-ui, -apple-system, 'Segoe UI', sans-serif; }
.about-display { font-family: 'Plein', 'Satoshi', system-ui, sans-serif; font-weight: 400; letter-spacing: -0.015em; }
@keyframes about-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
.about-up { animation: about-up .8s cubic-bezier(.22,1,.36,1) both; }
@media (prefers-reduced-motion: reduce) { .about-up { animation: none; } }
`;

const card = "rounded-3xl border border-[#A3248F]/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";
const iconBox = "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A3248F]/10 to-[#0D55AE]/10 text-[#A3248F]";
const h2Cls = "about-display text-3xl leading-[1.12] text-[#162238] sm:text-4xl lg:text-[44px]";

function SectionHead({ chip, title, text }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
      <span className="section-label-chip mb-3 inline-flex">{chip}</span>
      <h2 className={h2Cls}>{title}</h2>
      {text && <p className="mt-3 text-sm leading-7 text-[#4A5B73] sm:text-base">{text}</p>}
    </div>
  );
}

export default function AboutPage() {
  const whatsappUrl = `https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent("Hello Souls Life Wellbeing Center, I would like to learn more about your counseling programs.")}`;

  return (
    <div className="wellness-page-wrap about-root relative">
      <style dangerouslySetInnerHTML={{ __html: fontCss }} />
      <InteractiveBackground />
      {/* Modern Ambient Peace Doves Gliding Across About Page */}
      <PeaceDoves />
      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden py-12 lg:py-20">
          <div className="wellness-container">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              <FadeUp className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A3248F]/25 bg-[#A3248F]/10 px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#A3248F]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>ETHICAL &amp; CONFIDENTIAL MENTAL WELLNESS</span>
                </div>

                <h1 className="about-display text-4xl leading-[1.08] text-[#162238] sm:text-5xl lg:text-[58px]">
                  A Safe Sanctuary to <span className="animated-gradient-text">Heal, Grow</span> &amp; Reclaim Inner Harmony
                </h1>

                <p className="text-base font-medium leading-relaxed text-[#243746] sm:text-lg">
                  Souls Life Wellbeing Center is a professionally established mental health institution in Wandoor, Malappuram. We provide empathetic, scientific counseling and psychotherapy for individuals, couples, students, and families navigating life&apos;s complex emotional landscapes.
                </p>

                <p className="text-sm leading-relaxed text-[#4A5B73] sm:text-base">
                  Led by certified specialists across Medical Social Work, Clinical Psychology, Child Development, and Community Health, our mission is to make confidential, compassionate psychological support readily accessible to everyone — without judgment, stigma, or pressure.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <BookSessionButton className="btn-nature-primary px-6 py-3 text-sm shadow-md">
                    <Calendar className="h-4 w-4" />
                    <span>Book a Consultation</span>
                  </BookSessionButton>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-nature-whatsapp px-5 py-3 text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Desk</span>
                  </a>
                  <Link href="/services" className="btn-nature-secondary px-5 py-3 text-sm">
                    <span>Explore Services</span>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-medium text-[#4A5B73]">
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#A3248F]" />In-Clinic &amp; Worldwide Tele-Video</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#0D55AE]" />RCI Reg. &amp; MSW Professionals</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#059669]" />100% Confidential</span>
                </div>
              </FadeUp>

              <FadeIn delay={0.2} className="relative lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Modern Peace Dove Hovering Accent carrying Olive Sprig */}
                  <div className="absolute -top-7 -left-5 sm:-top-9 sm:-left-7 z-20 pointer-events-none dove-gentle-hover">
                    <ModernPeaceDove size={64} glowColor="rgba(163, 36, 143, 0.28)" flapSpeed="2.2s" />
                  </div>

                  <div className="absolute -inset-3 -z-10 rounded-[36px] bg-gradient-to-tr from-[#A3248F]/25 via-[#0D55AE]/20 to-transparent blur-2xl" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border-2 border-white/80 shadow-2xl">
                    <Image src="/images/about-center.jpg" alt="Souls Life modern and tranquil counseling sanctuary in Wandoor" fill priority sizes="(max-width: 1024px) 90vw, 480px" className="object-cover transition-transform duration-[1200ms] hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162238]/60 via-transparent to-transparent" />
                  </div>

                  <div className="absolute -right-3 top-8 flex items-center gap-2.5 rounded-2xl border border-[#A3248F]/20 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-md sm:-right-6">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#A3248F]/10 text-[#A3248F]"><MapPin className="h-4 w-4" /></span>
                    <div>
                      <p className="text-xs font-bold leading-tight text-[#162238]">Sanctuary of Peace</p>
                      <p className="text-[10px] text-[#4A5B73]">Wandoor, Malappuram</p>
                    </div>
                  </div>

                  <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border border-neutral-200/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md sm:left-6 sm:right-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A3248F] to-[#0D55AE] text-white"><ShieldCheck className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-[#162238]">Ethical Clinical Guidance</p>
                      <p className="truncate text-[11px] text-[#4A5B73]">Private, quiet, acoustically insulated rooms</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Key strengths */}
        <section className="relative py-6">
          <div className="wellness-container">
            <StaggerList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {keyStrengths.map(({ icon: Icon, title, desc }) => (
                <div key={title} className={`${card} p-5`}>
                  <span className={`${iconBox} mb-3`}><Icon className="h-5 w-5" /></span>
                  <h3 className="mb-1 text-sm font-bold text-[#162238]">{title}</h3>
                  <p className="text-xs leading-relaxed text-[#4A5B73]">{desc}</p>
                </div>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* Story */}
        <section className="relative py-14 lg:py-24">
          <div className="wellness-container">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <FadeIn delay={0.1} className="order-2 lg:order-1 lg:col-span-5">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-[#A3248F]/30" />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200 shadow-xl">
                    <Image src="/images/clinic-sanctuary.jpg" alt="Souls Life serene and welcoming interior" fill sizes="(max-width: 1024px) 90vw, 480px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162238]/70 via-transparent to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 text-white">
                      <p className="text-xs font-semibold text-[#FDF2F9]">Arimbra Building, Nilambur Road, Wandoor</p>
                      <p className="text-[11px] text-white/80">Designed to feel like entering a peaceful home, not a clinic.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeUp delay={0.15} className="order-1 space-y-5 lg:order-2 lg:col-span-7">
                <span className="section-label-chip inline-flex">OUR STORY &amp; PHILOSOPHY</span>
                <h2 className={h2Cls}>Where Healing Begins With <span className="animated-gradient-text">Being Truly Heard</span></h2>
                <p className="text-sm leading-relaxed text-[#243746] sm:text-base">
                  In today&apos;s fast-moving world, individuals, students, and families frequently carry silent, unspoken burdens — chronic exam anxiety, marital discord, career confusion, relationship breakdowns, or the overwhelming weight of loss.
                </p>
                <p className="text-sm leading-relaxed text-[#4A5B73] sm:text-base">
                  Too often, these struggles are dismissed or met with stigma. Souls Life Wellbeing Center was founded to change this reality. We set out to create a sanctuary where mental healthcare is approached with scientific rigor, warmth, and unshakeable confidentiality.
                </p>
                <blockquote className="rounded-2xl border-l-4 border-[#A3248F] bg-gradient-to-r from-[#FDF2F9] to-[#F0F6FF] p-5 sm:p-6">
                  <p className="about-display text-lg leading-relaxed text-[#162238] sm:text-xl">
                    &ldquo;Healing is not about fixing something that is broken; it is about rediscovering your inner resilience, understanding your emotions, and stepping forward with clarity and courage.&rdquo;
                  </p>
                </blockquote>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          {/* Subtle Ambient Soaring Dove Accent */}
          <div className="pointer-events-none absolute right-10 top-12 hidden lg:block opacity-75 dove-gentle-hover" style={{ animationDelay: "1.8s" }}>
            <ModernPeaceDove size={50} glowColor="rgba(13, 85, 174, 0.22)" flapSpeed="2.4s" />
          </div>

          <div className="wellness-container">
            <FadeUp>
              <SectionHead chip="OUR GUIDING COMPASS" title="Vision & Mission" text="Our long-term aspiration and everyday clinical commitment to our community." />
            </FadeUp>

            <StaggerList className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#A3248F]/20 bg-white p-8 shadow-md transition-all hover:shadow-xl sm:p-10">
                <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[#A3248F]/10 blur-2xl" />
                <div className="relative">
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A3248F]/15 text-[#A3248F]"><Compass className="h-6 w-6" /></span>
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#A3248F]">OUR ASPIRATION</span>
                  <h3 className="about-display mb-4 text-3xl text-[#162238]">Our Vision</h3>
                  <p className="text-sm leading-relaxed text-[#243746] sm:text-base">
                    To evolve into a leading, trusted mental wellbeing institution in Kerala that inspires individuals, couples, and youth to lead emotionally balanced, courageous, and deeply purposeful lives — free from the shadows of mental health stigma.
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-2 border-t border-neutral-100 pt-6 text-xs font-semibold text-[#A3248F]">
                  <Heart className="h-4 w-4" />
                  <span>Empowering healthy minds across generations</span>
                </div>
              </div>

              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#0D55AE]/20 bg-white p-8 shadow-md transition-all hover:shadow-xl sm:p-10">
                <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[#0D55AE]/10 blur-2xl" />
                <div className="relative">
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D55AE]/15 text-[#0D55AE]"><HeartHandshake className="h-6 w-6" /></span>
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#0D55AE]">OUR DAILY PURPOSE</span>
                  <h3 className="about-display mb-4 text-3xl text-[#162238]">Our Mission</h3>
                  <ul className="space-y-3">
                    {missionPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0D55AE] text-white"><Check className="h-3 w-3 stroke-[3]" /></span>
                        <span className="text-xs font-medium leading-relaxed text-[#243746] sm:text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-8 flex items-center gap-2 border-t border-neutral-100 pt-6 text-xs font-semibold text-[#0D55AE]">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Ethical, affordable, and holistic care for all</span>
                </div>
              </div>
            </StaggerList>
          </div>
        </section>

        {/* Pillars */}
        <section className="relative bg-gradient-to-b from-transparent via-[#FDF2F9]/40 to-transparent py-14 lg:py-24">
          <div className="wellness-container">
            <FadeUp>
              <SectionHead chip="INTEGRATED METHODOLOGY" title="Our 4 Pillars of Holistic Care" text="We combine scientific psychological methods with medical social work to ensure deep, lasting transformation." />
            </FadeUp>

            <StaggerList className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {approachPillars.map((p) => (
                <div key={p.number} className={`${card} group relative overflow-hidden p-6`}>
                  <span className="about-display pointer-events-none absolute -right-2 -top-3 select-none text-8xl text-[#A3248F]/[0.06] transition-transform duration-500 group-hover:scale-110">{p.number}</span>
                  <div className="relative">
                    <span className="mb-4 inline-block rounded-full bg-[#F0F6FF] px-2.5 py-1 text-[10px] font-bold text-[#0D55AE]">{p.badge}</span>
                    <h3 className="mb-2 text-base font-bold text-[#162238] transition-colors group-hover:text-[#A3248F]">{p.title}</h3>
                    <p className="text-xs leading-relaxed text-[#4A5B73]">{p.desc}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-semibold text-[#A3248F]">
                      <span>Evidence-Based</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* Core values */}
        <section className="relative py-12 lg:py-16">
          <div className="wellness-container">
            <FadeUp>
              <SectionHead chip="CLINICAL ETHICS" title="Our Core Values & Commitments" text="The ethical principles that guide every consultation and therapy session at Souls Life." />
            </FadeUp>

            <StaggerList className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {coreValues.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-neutral-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#A3248F]/30 hover:shadow-lg">
                  <span className={`${iconBox} mb-3`}><Icon className="h-5 w-5" /></span>
                  <h3 className="mb-1.5 text-sm font-bold text-[#162238]">{title}</h3>
                  <p className="text-xs leading-relaxed text-[#4A5B73]">{desc}</p>
                </div>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* Community */}
        <section className="relative bg-white/70 py-14 lg:py-24">
          <div className="wellness-container">
            <FadeUp>
              <SectionHead chip="GRASSROOTS ACTION" title="Active Community Initiatives" text="We believe mental wellness extends beyond clinic walls. Souls Life actively conducts community workshops, awareness drives, and youth counseling across Kerala." />
            </FadeUp>

            <StaggerList className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {communityList.map(({ icon: Icon, title, desc }) => (
                <div key={title} className={`${card} flex items-start gap-4 p-6`}>
                  <span className={`${iconBox} h-12 w-12`}><Icon className="h-6 w-6" /></span>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-[#162238]">{title}</h3>
                    <p className="text-xs leading-relaxed text-[#4A5B73]">{desc}</p>
                  </div>
                </div>
              ))}
            </StaggerList>

            <FadeUp delay={0.2} className="mt-10 text-center">
              <Link href="/community" className="btn-nature-secondary inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm">
                <span>Explore All Community Programs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* Team teaser */}
        <section className="relative py-12">
          <div className="wellness-container">
            <FadeUp>
              <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#A3248F]/20 bg-gradient-to-r from-[#FAF8FD] to-[#F0F6FF] p-8 shadow-md sm:p-12 md:flex-row">
                <div className="space-y-3 text-center md:text-left">
                  <span className="section-label-chip inline-flex">QUALIFIED CLINICAL SPECIALISTS</span>
                  <h3 className="about-display text-2xl text-[#162238] sm:text-3xl">Guided by Compassionate &amp; Licensed Experts</h3>
                  <p className="max-w-xl text-sm leading-7 text-[#4A5B73]">
                    Our clinical team comprises RCI Registered Clinical Psychologists, Senior Psychiatric Social Workers, and Child Guidance specialists dedicated to your wellbeing.
                  </p>
                </div>
                <Link href="/team" className="btn-nature-primary shrink-0 px-6 py-3 text-sm shadow-md">
                  <Users className="mr-1.5 h-4 w-4" />
                  <span>Meet Our Team</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden py-12 lg:py-20">
          <div className="wellness-container">
            <FadeUp>
              <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#162238] via-[#3A1D5C] to-[#0D55AE] p-8 text-center text-white shadow-2xl sm:p-14">
                <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#A3248F]/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#4C93F0]/30 blur-3xl" />

                <div className="relative mx-auto max-w-2xl space-y-4">
                  <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] backdrop-blur-sm">TAKE THE FIRST COURAGEOUS STEP</span>
                  <h2 className="about-display text-3xl leading-[1.12] sm:text-4xl lg:text-5xl">Your Journey to Wholeness Starts With a Gentle Conversation</h2>
                  <p className="text-sm leading-7 text-white/80 sm:text-base">
                    You don&apos;t have to carry emotional weight alone. Schedule a confidential in-clinic consultation at our Wandoor center or book a secure video consultation from wherever you are.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <BookSessionButton className="btn-nature-primary px-6 py-3 text-xs shadow-md sm:text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Book Appointment Online</span>
                    </BookSessionButton>
                    <a href={`https://wa.me/91${siteConfig.phone}`} target="_blank" rel="noopener noreferrer" className="btn-nature-whatsapp px-5 py-3 text-xs sm:text-sm">
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp Desk: {siteConfig.phone}</span>
                    </a>
                    <a href={`tel:+91${siteConfig.phone}`} className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-xs font-medium backdrop-blur-md transition hover:bg-white/20 sm:text-sm">
                      <PhoneCall className="h-4 w-4 text-[#F3CEEC]" />
                      <span>Helpline: +91 8848151514</span>
                    </a>
                  </div>

                  <p className="inline-flex items-center gap-1.5 pt-2 text-[11px] text-white/70">
                    <Lock className="h-3 w-3" /> 100% Confidential • Professional Ethical Healthcare Code
                  </p>
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
