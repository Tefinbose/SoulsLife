import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  HeartHandshake,
  ShieldAlert,
  Heart,
  Compass,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { FadeUp, StaggerList } from "@/components/ui/MotionSection";

const activities = [
  {
    title: "School Mental Health Programs",
    desc: "Emotional literacy, anti-bullying workshops, and study habit seminars.",
    icon: GraduationCap,
    tag: "Adolescent Care",
  },
  {
    title: "College Awareness Campaigns",
    desc: "Stress management, career transitions, and mental hygiene on campus.",
    icon: Users,
    tag: "Campus Drive",
  },
  {
    title: "Community Counseling Camps",
    desc: "Accessible free mental wellness screening and triage in local panchayaths.",
    icon: HeartHandshake,
    tag: "Grassroots Care",
  },
  {
    title: "Suicide Prevention Programs",
    desc: "Lifeline crisis intervention training, gatekeeper programs, and destigmatization.",
    icon: ShieldAlert,
    tag: "Crisis Lifeline",
  },
  {
    title: "Women Empowerment Sessions",
    desc: "Support groups for self-worth, domestic resilience, and emotional healing.",
    icon: Heart,
    tag: "Women & Family",
  },
  {
    title: "Youth Development Programs",
    desc: "Emotional intelligence, leadership mindset, and healthy coping mechanisms.",
    icon: Compass,
    tag: "Future Mindset",
  },
];

export default function CommunityNature() {
  return (
    <section id="community" className="relative py-8 sm:py-12 lg:py-16">
      <div className="wellness-container">
        {/* Heading */}
        <FadeUp delay={0.1} distance={24}>
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#A3248F]">Community impact</p>
              <h2 className="font-display text-3xl font-normal leading-[1.15] tracking-tight text-[#162238] sm:text-4xl lg:text-[42px]">
                Souls Life in the <span className="text-[#A3248F]">community</span>
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5B73] sm:text-base">
                Beyond private clinic rooms, we take part in grassroots initiatives across schools, colleges and rural areas to make mental healthcare easier to ask for.
              </p>
            </div>

            <Link
              href="/community"
              className="hidden shrink-0 items-center gap-2 self-start rounded-full border border-[#162238]/20 px-5 py-3 text-sm font-semibold text-[#162238] transition-all duration-300 hover:border-[#A3248F] hover:bg-[#A3248F] hover:text-white hover:shadow-md hover:scale-[1.02] lg:inline-flex group"
            >
              <span>Explore all initiatives</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Image with Subtle Hover Depth */}
          <FadeUp delay={0.15} distance={24} className="lg:sticky lg:top-28 lg:col-span-5">
            <figure className="group mx-auto max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#EDE4D8] shadow-md transition-all duration-500 group-hover:shadow-xl sm:aspect-[16/10] lg:aspect-[4/5]">
                <Image
                  src="/images/community-support.jpg"
                  alt="Souls Life active community outreach and mental health awareness programs in Kerala"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162238]/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none" />
              </div>
              <figcaption className="mt-3 flex items-start gap-2 text-sm text-[#4A5B73]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A3248F] animate-bounce-subtle" />
                <span>
                  <strong className="font-semibold text-[#162238]">Empowering communities.</strong> Schools, colleges &amp; rural panchayaths.
                </span>
              </figcaption>
            </figure>
          </FadeUp>

          {/* Right Column: Animated Community Impact Cards (Clean, Professional, No Emojis) */}
          <div className="lg:col-span-7">
            <StaggerList stagger={0.07} baseDelay={0.08} distance={20} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {activities.map(({ title, desc, icon: Icon, tag }) => (
                <div
                  key={title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#A3248F]/40 hover:shadow-xl hover:shadow-[#A3248F]/10 cursor-default"
                >
                  {/* Top Illuminated Brand Gradient Accent on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A3248F] via-[#0D55AE] to-[#A3248F] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                  {/* Ambient Calming Radial Glow behind Card */}
                  <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-[#A3248F]/5 to-[#0D55AE]/10 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

                  <div className="relative z-10">
                    {/* Header Row: Icon + Professional Category Tag */}
                    <div className="mb-3.5 flex items-center justify-between gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FDF2F9] text-[#A3248F] shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:from-[#A3248F] group-hover:to-[#0D55AE] group-hover:text-white group-hover:shadow-md">
                        <Icon className="h-5 w-5 transition-transform duration-300" strokeWidth={1.8} />
                      </span>

                      <span className="rounded-full bg-[#FAF8FD] border border-neutral-100/90 px-2.5 py-1 text-[11px] font-semibold text-[#8A1C79]/85 group-hover:text-[#A3248F] group-hover:border-[#A3248F]/30 transition-colors">
                        {tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-snug text-[#162238] transition-colors duration-200 group-hover:text-[#A3248F]">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-[#4A5B73]">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Micro Footer Row & Smooth Hover Action Indicator */}
                  <div className="relative z-10 mt-3.5 flex items-center justify-end border-t border-neutral-100 pt-2.5 text-xs">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#0D55AE] opacity-0 transition-all duration-300 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0">
                      <span>Explore initiative</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))}
            </StaggerList>

            {/* Mobile and tablet link */}
            <FadeUp delay={0.2} distance={16} className="mt-6 lg:hidden">
              <Link
                href="/community"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#162238] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0D55AE] active:scale-95 shadow-md sm:w-auto"
              >
                <span>Explore all initiatives</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
