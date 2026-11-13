import Image from "next/image";
import {
  Calendar,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  GraduationCap,
  Award,
  Languages,
  Sparkles,
  Video,
} from "lucide-react";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/interactive/InteractiveBackground";
import BookSessionButton from "@/components/buttons/BookSessionButton";
import { siteConfig } from "@/data/homeData";
import { FadeUp, FadeIn, StaggerList } from "@/components/ui/MotionSection";

export const metadata = {
  title: "Our Team | Souls Life Wellbeing Center",
  description:
    "Meet the clinical psychologists and psychiatric social workers at Souls Life Wellbeing Center in Wandoor, Malappuram, Kerala.",
};

const fontCss = `
@import url('https://api.fontshare.com/v2/css?f[]=plein@400&f[]=satoshi@400,500,700&display=swap');
.team-root { font-family: 'Satoshi', system-ui, -apple-system, 'Segoe UI', sans-serif; }
.team-display { font-family: 'Plein', 'Satoshi', system-ui, sans-serif; font-weight: 400; letter-spacing: -0.015em; }
`;

const specialists = [
  {
    name: "Psychologist & Psychological Support Lead",
    role: "Psychologist & Behavioral Therapist",
    qualification: "MSc – Psychology",
    focus: ["Anxiety & depression counseling", "Emotional regulation", "Trauma & grief support", "Behavioral therapy", "Self-esteem building"],
    languages: "Malayalam, English",
    image: "/images/dr-counselor-portrait.jpg",
    badge: "MSc Psychology Specialist",
    accent: "#A3248F",
  },
  {
    name: "Nimisha A S",
    role: "Counsellor & Co-Founder, Souls Life",
    qualification: "MSW – Community Development",
    focus: [
      "Community & youth counseling",
      "Career aptitude & guidance",
      "Life skills & leadership",
      "Soft skills & confidence building",
    ],
    languages: "Malayalam, English",
    image: "/images/team-nimisha.jpg",
    badge: "Community Development",
    isCoFounder: true,
    accent: "#A3248F",
  },
  {
    name: "Anu Jose",
    role: "Counsellor — Medical & Psychiatric Social Work",
    qualification: "MSW – Medical & Psychiatric Social Work",
    focus: [
      "Anxiety & emotional distress",
      "Psychiatric social work support",
      "Stress & coping strategies",
      "Individual & crisis counseling",
    ],
    languages: "Malayalam, English",
    image: "/images/team-anu-jose.jpg",
    badge: "Medical & Psychiatric Social Work",
    accent: "#0D55AE",
  },
  {
    name: "Sherin C Jaleel",
    role: "Counsellor — Family Social Work Practice",
    qualification: "MSW – Family Social Work Practice",
    focus: [
      "Family conflict resolution",
      "Pre-marital & marital counseling",
      "Couple & relationship therapy",
      "Parenting & child emotional care",
    ],
    languages: "Malayalam, English",
    image: "/images/team-sherin.jpg",
    badge: "Family Social Work Practice",
    accent: "#059669",
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "100% Confidential Care",
    desc: "Strict clinical code of ethics ensuring every conversation remains safe, private, and non-judgmental.",
  },
  {
    icon: Award,
    title: "Licensed Practitioners",
    desc: "Certified specialists holding accredited RCI and Medical Social Work credentials.",
  },
  {
    icon: Languages,
    title: "Bilingual Sessions",
    desc: "Therapy and counseling fluently conducted in native Malayalam or English according to your comfort.",
  },
  {
    icon: HeartHandshake,
    title: "Multidisciplinary Care",
    desc: "Comprehensive approach integrating clinical psychology with social and familial environmental context.",
  },
];

function FocusTags({ items, accent = "#0D55AE" }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-neutral-200/80 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-[#243746] transition-colors hover:border-[#A3248F]/40"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TeamPage() {
  const [lead, ...others] = specialists;

  const whatsappUrl = `https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
    "Hello Souls Life, I would like to book a consultation."
  )}`;

  return (
    <div className="wellness-page-wrap team-root relative">
      <style dangerouslySetInnerHTML={{ __html: fontCss }} />
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="pb-8 pt-12 lg:pb-12 lg:pt-20">
          <div className="wellness-container">
            <div className="mx-auto max-w-3xl text-center">
              <FadeIn delay={0}>
                <span className="mb-4 inline-flex items-center rounded-full border border-[#A3248F]/25 bg-[#A3248F]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#A3248F]">
                  QUALIFIED CLINICAL SPECIALISTS • WANDOOR, KERALA
                </span>
              </FadeIn>

              <FadeUp delay={0.1}>
                <h1 className="team-display mt-3 text-3xl leading-tight text-[#162238] sm:text-4xl lg:text-5xl">
                  Guided by Compassionate &amp;{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #A3248F, #0D55AE)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Licensed Experts
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="mt-4 text-sm leading-relaxed text-[#4A5B73] sm:text-base">
                  Our team consists of qualified professionals with MSc in Psychology and MSW postgraduates with specializations in Medical Social Work, Child Development, and Community Development. All team members follow strict ethical and professional standards.
                </p>
              </FadeUp>

              {/* Trust badges */}
              <FadeUp delay={0.3}>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#4A5B73]">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#A3248F]" />
                    MSc Psychology &amp; MSW Postgraduates
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0D55AE]" />
                    Malayalam &amp; English Fluent
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#059669]" />
                    Strict Ethical &amp; Professional Standards
                  </span>
                </div>

                {/* Quick Team Highlights */}
                <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { value: "4", label: "Clinical Specialists" },
                    { value: "MSc & MSW", label: "Postgraduate Faculty" },
                    { value: "100%", label: "Confidential Care" },
                    { value: "In-Clinic & Online", label: "Flexible Sessions" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[#A3248F]/15 bg-white/80 px-3 py-3 shadow-sm backdrop-blur-sm"
                    >
                      <p className="text-sm font-bold text-[#162238] sm:text-base">{stat.value}</p>
                      <p className="mt-0.5 text-[11px] font-medium text-[#4A5B73]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Lead specialist */}
        <section className="pb-10 lg:pb-16">
          <div className="wellness-container">
            <FadeUp distance={32}>
              <article className="group relative overflow-hidden rounded-3xl border border-[#A3248F]/20 bg-white shadow-md transition-all duration-300 hover:shadow-2xl lg:grid lg:grid-cols-12">
                {/* Decorative background glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#A3248F]/10 blur-3xl" />

                {/* Portrait */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 sm:aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-[460px]">
                  <Image
                    src={lead.image}
                    alt={`Portrait of ${lead.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162238]/60 via-transparent to-transparent lg:hidden" />
                  <div className="absolute bottom-4 left-4 lg:hidden">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#A3248F] shadow">
                      {lead.badge}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:p-12">
                  <div className="hidden lg:block">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A3248F]/25 bg-[#A3248F]/10 px-3 py-1 text-xs font-bold text-[#A3248F]">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {lead.badge}
                    </span>
                  </div>

                  <h2 className="team-display mt-3 text-2xl font-bold text-[#162238] sm:text-3xl lg:text-4xl">
                    {lead.name}
                  </h2>
                  <p className="mt-1 text-base font-semibold text-[#0D55AE]">{lead.role}</p>
                  <p className="mt-1 text-xs text-[#4A5B73] sm:text-sm">{lead.qualification}</p>

                  <div className="mt-6 border-t border-neutral-100 pt-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#162238]">
                      Specialized Areas &amp; Modalities
                    </p>
                    <FocusTags items={lead.focus} />
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-[#4A5B73] sm:text-sm">
                    <Languages className="h-4 w-4 text-[#A3248F]" />
                    <span>Languages: </span>
                    <span className="font-semibold text-[#162238]">{lead.languages}</span>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <BookSessionButton
                      serviceTitle={lead.role}
                      doctorName={lead.name}
                      className="btn-nature-primary px-6 py-3 text-sm shadow-md transition-all hover:scale-[1.02]"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book Consultation with {lead.name.split(" ").slice(0, 2).join(" ")}</span>
                    </BookSessionButton>
                    <a
                      href={`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
                        `Hello Souls Life, I would like to inquire about booking a session with ${lead.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-nature-whatsapp px-5 py-3 text-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp Inquiries</span>
                    </a>
                  </div>
                </div>
              </article>
            </FadeUp>
          </div>
        </section>

        {/* Other specialists section */}
        <section className="pb-16 lg:pb-24">
          <div className="wellness-container">
            <FadeUp>
              <div className="mb-10 text-center">
                <span className="section-label-chip mb-3 inline-flex">CORE SPECIALIST FACULTY</span>
                <h2 className="team-display text-2xl text-[#162238] sm:text-3xl lg:text-4xl">
                  Dedicated Psychological Care for Every Life Stage
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#4A5B73]">
                  Tailored support addressing marriage, child behavioral development, academic stressors, and
                  standardized psychometric profiling.
                </p>
              </div>
            </FadeUp>

            <StaggerList
              stagger={0.1}
              baseDelay={0.05}
              distance={28}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {others.map((doc) => (
                <article
                  key={doc.name}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A3248F]/40 hover:shadow-xl"
                >
                  {/* Portrait container */}
                  <div className="relative aspect-[5/6] overflow-hidden bg-neutral-100">
                    <Image
                      src={doc.image}
                      alt={`Portrait of ${doc.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162238]/45 via-transparent to-transparent" />
                    {doc.isCoFounder && (
                      <div className="absolute right-3 top-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#A3248F] to-[#0D55AE] px-3 py-1 text-[11px] font-bold text-white shadow-md">
                          <Sparkles className="h-3 w-3" />
                          Co-Founder
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#162238] shadow backdrop-blur-sm">
                        {doc.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-xl font-bold text-[#162238] transition-colors group-hover:text-[#A3248F]">
                      {doc.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[#0D55AE]">{doc.role}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#4A5B73]">
                      <GraduationCap className="h-3.5 w-3.5 text-[#A3248F]" />
                      <span>{doc.qualification}</span>
                    </p>

                    <div className="mt-5 border-t border-neutral-100 pt-4">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#162238]/70">
                        Focus Areas
                      </p>
                      <FocusTags items={doc.focus} accent={doc.accent} />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#4A5B73]">
                      <span className="inline-flex items-center gap-1.5">
                        <Languages className="h-3.5 w-3.5 text-[#A3248F]" />
                        <span>{doc.languages}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Video className="h-3.5 w-3.5 text-[#0D55AE]" />
                        <span>In-Clinic &amp; Online</span>
                      </span>
                    </div>

                    {/* Animated accent divider */}
                    <div
                      className="mt-5 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ background: `linear-gradient(90deg, ${doc.accent}, #0D55AE)` }}
                    />

                    <div className="mt-auto flex items-center gap-2.5 pt-6">
                      <BookSessionButton
                        serviceTitle={doc.role}
                        doctorName={doc.name}
                        className="btn-nature-primary flex-1 justify-center px-4 py-2.5 text-sm shadow-sm"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Book Session</span>
                      </BookSessionButton>
                      <a
                        href={`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
                          `Hello Souls Life, I would like to book a session with ${doc.name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp inquiry for ${doc.name}`}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#25D366]/35 bg-[#25D366]/10 text-[#128C7E] transition hover:bg-[#25D366] hover:text-white"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* Pillars / Ethics */}
        <section className="border-t border-neutral-100 bg-gradient-to-b from-[#FAF8FD] to-white py-14 lg:py-20">
          <div className="wellness-container">
            <FadeUp>
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <span className="section-label-chip mb-3 inline-flex">ETHICAL STANDARDS</span>
                <h2 className="team-display text-2xl text-[#162238] sm:text-3xl lg:text-4xl">
                  Our Multidisciplinary Care Philosophy
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4A5B73]">
                  We believe mental health care is most effective when science, compassion, and the client&apos;s
                  cultural context are seamlessly blended together.
                </p>
              </div>
            </FadeUp>

            <StaggerList
              stagger={0.08}
              distance={24}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-[#A3248F]/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A3248F]/10 to-[#0D55AE]/10 text-[#A3248F]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-1.5 text-base font-bold text-[#162238]">{title}</h3>
                  <p className="text-xs leading-relaxed text-[#4A5B73]">{desc}</p>
                </div>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 lg:pb-24">
          <div className="wellness-container">
            <FadeUp distance={36}>
              <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#162238] via-[#2A1650] to-[#0D55AE] p-8 text-center text-white shadow-2xl sm:p-12">
                <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-[#A3248F]/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-[#4C93F0]/25 blur-3xl" />

                <div className="relative">
                  <span className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-widest backdrop-blur-sm">
                    CARE COORDINATION DESK
                  </span>

                  <h2 className="team-display mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Not Sure Which Specialist Fits Your Need?
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                    Contact our counseling intake desk. We&apos;ll help evaluate your circumstances and match you
                    with the most suitable therapist for your goals.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <BookSessionButton className="btn-nature-primary px-6 py-3 text-sm shadow-lg">
                      <Calendar className="h-4 w-4" />
                      <span>Book a Consultation</span>
                    </BookSessionButton>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-nature-whatsapp px-5 py-3 text-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp Intake</span>
                    </a>
                    <a
                      href="tel:+918848151514"
                      className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/20"
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span>+91 8848151514</span>
                    </a>
                  </div>

                  <p className="mt-5 text-[11px] text-white/50">
                    100% Confidential · RCI &amp; MSW Certified · In-Clinic &amp; Worldwide Video Sessions
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
