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
  Calendar,
  MessageCircle,
  PhoneCall,
  Check,
} from "lucide-react";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/interactive/InteractiveBackground";
import BookSessionButton from "@/components/buttons/BookSessionButton";
import { siteConfig } from "@/data/homeData";
import { FadeUp, FadeIn, StaggerList } from "@/components/ui/MotionSection";

export const metadata = {
  title: "Counseling Services | Souls Life Wellbeing Center",
  description:
    "Counseling and psychotherapy in Wandoor, Malappuram: student support, career guidance, family and marital counseling, child development, assessments and online sessions.",
};

const services = [
  {
    id: "student",
    short: "Students",
    title: "Student Counseling",
    desc: "Support for students dealing with exam stress, low motivation and difficulty concentrating.",
    icon: GraduationCap,
    accent: "#A3248F",
    details: ["Exam anxiety and confidence", "Study habits and time management", "Motivation and focus"],
  },
  {
    id: "career",
    short: "Career",
    title: "Career Guidance",
    desc: "Help choosing a stream or course after 10th and 12th, based on your strengths and interests.",
    icon: Compass,
    accent: "#0D55AE",
    details: ["Career aptitude assessment", "Stream and course selection", "Interview and soft skills"],
  },
  {
    id: "family",
    short: "Family & Marital",
    title: "Family & Marital Counseling",
    desc: "A neutral space for couples and families to work through conflict and communicate better.",
    icon: Users,
    accent: "#7C3AED",
    details: ["Family mediation", "Pre-marital and post-marital counseling", "Resolving recurring conflicts"],
  },
  {
    id: "mental-health",
    short: "Mental Health",
    title: "Mental Health & Emotional Wellness",
    desc: "Psychotherapy for anxiety, depression, stress, grief and other emotional difficulties.",
    icon: HeartPulse,
    accent: "#DC2626",
    details: ["Anxiety and panic (CBT)", "Depression and mood", "Burnout, trauma and bereavement"],
  },
  {
    id: "child",
    short: "Child Development",
    title: "Child Development & Learning",
    desc: "Screening and support for children with attention, learning or behavioural concerns, plus guidance for parents.",
    icon: Smile,
    accent: "#059669",
    details: ["Learning disability screening", "Behaviour and attention support", "Parenting guidance"],
  },
  {
    id: "elderly",
    short: "Elderly Support",
    title: "Elderly Emotional Support",
    desc: "Companionship and counseling for senior citizens coping with loneliness, loss or health changes.",
    icon: HandHeart,
    accent: "#D97706",
    details: ["Loneliness and bereavement", "Adjusting to ageing and health changes", "Guidance for caregivers"],
  },
  {
    id: "assessment",
    short: "Assessments",
    title: "Psychological Assessments",
    desc: "Standardized tests that give a clear picture of cognitive, academic and emotional needs.",
    icon: BrainCircuit,
    accent: "#0891B2",
    details: ["IQ and cognitive assessment", "Aptitude and personality testing", "Written assessment report"],
  },
  {
    id: "tele",
    short: "Online Sessions",
    title: "Online Counseling",
    desc: "Video or phone sessions for clients elsewhere in Kerala, in the Gulf or anywhere else.",
    icon: Video,
    accent: "#4F46E5",
    details: ["Video or phone sessions", "Malayalam or English", "Evening and weekend slots"],
  },
  {
    id: "workshops",
    short: "Workshops",
    title: "Workshops & Training",
    desc: "Talks and programs on mental health for schools, colleges and workplaces.",
    icon: Presentation,
    accent: "#BE185D",
    details: ["Life skills and emotional literacy", "Stress management for staff", "Awareness programs"],
  },
];

export default function ServicesPage() {
  const whatsappUrl = `https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
    "Hello Souls Life, I would like to book a counseling appointment."
  )}`;

  return (
    <div className="wellness-page-wrap page-root relative">
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10">

        {/* ── Hero ── */}
        <section className="pb-8 pt-12 lg:pb-10 lg:pt-20">
          <div className="wellness-container">
            <div className="mx-auto max-w-2xl text-center">

              {/* Chip */}
              <FadeIn delay={0}>
                <span className="mb-4 inline-flex items-center rounded-full border border-[#A3248F]/25 bg-[#A3248F]/8 px-4 py-1.5 text-xs font-bold tracking-widest text-[#A3248F]">
                  OUR SPECIALIZATIONS
                </span>
              </FadeIn>

              {/* Heading */}
              <FadeUp delay={0.1}>
                <h1 className="page-display mt-3 text-3xl font-normal leading-tight tracking-tight text-[#162238] sm:text-4xl lg:text-5xl">
                  Care That Meets You{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg,#A3248F,#0D55AE)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Where You Are
                  </span>
                </h1>
              </FadeUp>

              {/* Sub-text */}
              <FadeUp delay={0.2}>
                <p className="mt-4 text-sm leading-7 text-[#4A5B73] sm:text-base">
                  Personalized, evidence-based psychological support across nine core specialized areas.
                  Pick a service below, or contact us and we&apos;ll help you choose.
                </p>
              </FadeUp>

              {/* Jump-link pills */}
              <FadeUp delay={0.3}>
                <nav
                  aria-label="Jump to a service"
                  className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2"
                >
                  {services.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="rounded-full border border-[#A3248F]/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#162238] shadow-sm transition-all duration-200 hover:border-[#A3248F] hover:bg-[#FDF2F9] hover:text-[#A3248F] hover:shadow-md sm:text-sm"
                    >
                      {s.short}
                    </a>
                  ))}
                </nav>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── Services grid ── */}
        <section className="pb-16 lg:pb-20">
          <div className="wellness-container">
            <StaggerList
              stagger={0.07}
              baseDelay={0.05}
              distance={32}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map(({ id, title, desc, icon: Icon, details, accent }) => (
                <article
                  key={id}
                  id={id}
                  className="group flex scroll-mt-28 flex-col rounded-3xl border border-[#A3248F]/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl target:border-[#A3248F] target:shadow-lg"
                  style={{ "--accent": accent }}
                >
                  {/* Icon box */}
                  <span
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: `${accent}18`,
                      color: accent,
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <h2
                    className="text-lg font-bold leading-snug text-[#162238] transition-colors duration-200 group-hover:text-[var(--accent)]"
                    style={{ "--accent": accent }}
                  >
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#4A5B73]">{desc}</p>

                  <ul className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                    {details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm text-[#243746]">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: accent }}
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Animated bottom bar on hover */}
                  <div
                    className="mt-4 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, #0D55AE)` }}
                  />

                  <div className="mt-auto pt-5">
                    <BookSessionButton
                      serviceTitle={title}
                      className="btn-nature-primary w-full justify-center px-4 py-2.5 text-sm"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book This Service</span>
                    </BookSessionButton>
                  </div>
                </article>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="pb-16 lg:pb-24">
          <div className="wellness-container">
            <FadeUp distance={36}>
              <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#162238] via-[#2A1650] to-[#0D55AE] p-8 text-center text-white shadow-2xl sm:p-12">
                {/* Decorative orbs */}
                <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-[#A3248F]/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-[#4C93F0]/25 blur-3xl" />

                <div className="relative">
                  <span className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-widest backdrop-blur-sm">
                    FREE FIRST CONSULTATION
                  </span>

                  <h2 className="page-display mt-2 text-2xl font-normal sm:text-3xl lg:text-4xl">
                    Not sure which service you need?
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                    Tell us what you&apos;re going through and we&apos;ll point you to the right counselor — in person or online.
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
                      <span>WhatsApp</span>
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
                    100% Confidential · RCI & MSW Certified · In-Person & Online
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
