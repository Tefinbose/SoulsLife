import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  HeartHandshake,
  ShieldAlert,
  Heart,
  Compass,
  Calendar,
  MessageCircle,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/interactive/InteractiveBackground";
import BookSessionButton from "@/components/buttons/BookSessionButton";
import { siteConfig } from "@/data/homeData";
import { FadeUp, FadeIn, StaggerList } from "@/components/ui/MotionSection";

export const metadata = {
  title: "Community Initiatives | Souls Life Wellbeing Center",
  description:
    "Explore Souls Life community mental health outreach, school programs, suicide prevention campaigns, and women empowerment sessions across Kerala.",
};

const programs = [
  {
    title: "School Mental Health Programs",
    desc: "Empowering high school students to manage exam panic, build emotional regulation, prevent bullying, and enhance concentration and learning confidence.",
    icon: GraduationCap,
    badge: "Schools & Academics",
  },
  {
    title: "College Awareness Campaigns",
    desc: "Interactive seminars on campus mental health, overcoming procrastination, relationship hygiene, substance abuse awareness, and stress resilience.",
    icon: Users,
    badge: "Youth & Campuses",
  },
  {
    title: "Community Counseling Camps",
    desc: "Free and subsidized grassroots psychological screening and counseling camps in rural villages and underprivileged neighborhoods across Malappuram.",
    icon: HeartHandshake,
    badge: "Grassroots Outreach",
  },
  {
    title: "Suicide Prevention Programs",
    desc: "Community gatekeeper training, emotional first-aid workshops, and proactive suicide awareness initiatives in collaboration with local healthcare institutions.",
    icon: ShieldAlert,
    badge: "Crisis Intervention",
  },
  {
    title: "Women Empowerment Sessions",
    desc: "Safe spaces for homemakers and working women to discuss domestic stress, self-worth, emotional boundaries, parenting challenges, and mental health.",
    icon: Heart,
    badge: "Family & Women",
  },
  {
    title: "Youth Development Programs",
    desc: "Holistic life skills camps, leadership training, emotional intelligence development, and career orientation programs for adolescent youths.",
    icon: Compass,
    badge: "Adolescent Life Skills",
  },
];

export default function CommunityPage() {
  const whatsappUrl = `https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
    "Hello Souls Life, I would like to inquire about hosting a community workshop / school program."
  )}`;

  return (
    <div className="wellness-page-wrap page-root relative">
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10">
        {/* ========================================================
            COMMUNITY HERO SECTION
            ======================================================== */}
        <section className="py-12 lg:py-18 relative">
          <div className="wellness-container">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <FadeIn delay={0}>
                <span className="section-label-chip inline-flex">
                  GRASSROOTS ACTION &amp; REACH
                </span>
              </FadeIn>
              <FadeUp delay={0.1}>
                <h1 className="page-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#162238] tracking-tight leading-tight">
                  Building <span className="animated-gradient-text">Resilient Communities</span> Across Kerala
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-sm sm:text-base text-[#4A5B73] leading-relaxed max-w-2xl mx-auto">
                  Mental healthcare must not be confined to private clinic suites. Souls Life Wellbeing
                  Center actively conducts community outreach programs across Kerala to build empathy, literacy, and resilience.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ========================================================
            6 PROGRAMS SYMMETRIC GRID
            ======================================================== */}
        <section className="pb-16 lg:pb-24">
          <div className="wellness-container">
            <StaggerList
              stagger={0.08}
              baseDelay={0.05}
              distance={28}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
            >
              {programs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-3xl bg-white border border-[#A3248F]/15 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top Glow Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A3248F] via-[#0D55AE] to-[#A3248F] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A3248F]/10 to-[#0D55AE]/10 text-[#A3248F] flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#A3248F] group-hover:to-[#0D55AE] group-hover:text-white group-hover:scale-105 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                          <Icon className="w-6 h-6 stroke-[2]" />
                        </div>

                        <span className="text-[11px] font-semibold text-[#0D55AE] bg-[#F0F6FF] px-2.5 py-1 rounded-full border border-[#0D55AE]/15">
                          {item.badge}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-[#162238] mb-2 group-hover:text-[#A3248F] transition-colors leading-snug">
                        {item.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#4A5B73] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#A3248F]">
                      <span>Community Impact</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </StaggerList>

            {/* Partner / Collaborate Banner */}
            <FadeUp distance={32}>
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#FAF8FD] to-[#F0F6FF] border border-[#A3248F]/20 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="section-label-chip inline-flex">
                    COLLABORATE WITH US
                  </span>
                  <h3 className="page-display text-2xl sm:text-3xl font-normal text-[#162238] leading-tight">
                    Host a Mental Wellness Camp at Your Institution
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5B73] leading-relaxed max-w-xl">
                    We collaborate with schools, colleges, Kudumbashree units, youth clubs, and NGOs
                    to conduct tailor-made awareness workshops, psychological screenings, and life skills sessions.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <BookSessionButton
                      serviceTitle="Workshops & Institutional Training"
                      className="btn-nature-primary text-xs sm:text-sm px-6 py-3 shadow-md"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Request an Institutional Session</span>
                    </BookSessionButton>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-nature-whatsapp text-xs sm:text-sm px-5 py-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Inquiry Desk</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/community-support.jpg"
                    alt="Souls Life community workshop in progress"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ========================================================
            REASSURING BOTTOM CTA
            ======================================================== */}
        <section className="py-12 lg:py-18 relative overflow-hidden">
          <div className="wellness-container">
            <FadeUp distance={28}>
              <div className="relative rounded-3xl p-8 sm:p-12 text-center bg-white/95 backdrop-blur-md border border-[#A3248F]/25 shadow-xl overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 right-0 w-60 h-60 bg-[#A3248F]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#0D55AE]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                  <span className="section-label-chip inline-flex mb-1">
                    JOIN OUR MISSION
                  </span>

                  <h2 className="page-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#162238] tracking-tight">
                    Together, Let&apos;s Build a Healthier Tomorrow
                  </h2>

                  <p className="text-sm sm:text-base text-[#4A5B73] leading-relaxed">
                    Whether you are an educator, student union leader, or community volunteer, reach out to bring
                    empathy and professional emotional support to your community.
                  </p>

                  <div className="flex items-center justify-center flex-wrap gap-3 pt-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-nature-whatsapp text-xs sm:text-sm px-6 py-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Connect on WhatsApp: {siteConfig.phone}</span>
                    </a>

                    <a
                      href={`tel:+91${siteConfig.phone}`}
                      className="btn-nature-secondary text-xs sm:text-sm px-5 py-3"
                    >
                      <PhoneCall className="w-4 h-4 text-[#A3248F]" />
                      <span>Call Helpline: +91 8848151514</span>
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
