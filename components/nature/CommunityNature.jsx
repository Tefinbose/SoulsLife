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
  { title: "School Mental Health Programs", desc: "Emotional literacy, anti-bullying workshops, and study habit seminars.", icon: GraduationCap },
  { title: "College Awareness Campaigns", desc: "Stress management, career transitions, and mental hygiene on campus.", icon: Users },
  { title: "Community Counseling Camps", desc: "Accessible free mental wellness screening and triage in local panchayaths.", icon: HeartHandshake },
  { title: "Suicide Prevention Programs", desc: "Lifeline crisis intervention training, gatekeeper programs, and destigmatization.", icon: ShieldAlert },
  { title: "Women Empowerment Sessions", desc: "Support groups for self-worth, domestic resilience, and emotional healing.", icon: Heart },
  { title: "Youth Development Programs", desc: "Emotional intelligence, leadership mindset, and healthy coping mechanisms.", icon: Compass },
];

export default function CommunityNature() {
  return (
    <section id="community" className="relative py-12 sm:py-16 lg:py-20">
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
              className="hidden shrink-0 items-center gap-2 self-start rounded-full border border-[#162238]/20 px-5 py-3 text-sm font-semibold text-[#162238] transition-colors hover:border-[#162238] hover:bg-[#162238] hover:text-white lg:inline-flex"
            >
              Explore all initiatives
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Image */}
          <FadeUp delay={0.15} distance={24} className="lg:sticky lg:top-28 lg:col-span-5">
            <figure className="mx-auto max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#EDE4D8] sm:aspect-[16/10] lg:aspect-[4/5]">
                <Image
                  src="/images/community-support.jpg"
                  alt="Souls Life active community outreach and mental health awareness programs in Kerala"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-start gap-2 text-sm text-[#4A5B73]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A3248F]" />
                <span>
                  <strong className="font-semibold text-[#162238]">Empowering communities.</strong> Schools, colleges &amp; rural panchayaths.
                </span>
              </figcaption>
            </figure>
          </FadeUp>

          {/* Programs */}
          <div className="lg:col-span-7">
            <StaggerList stagger={0.07} baseDelay={0.08} distance={20} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {activities.map(({ title, desc, icon: Icon }) => (
                <div
                  key={title}
                  className="group flex gap-4 rounded-2xl border border-[#162238]/10 bg-white p-5 transition-colors duration-200 hover:border-[#A3248F]/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FDF2F9] text-[#A3248F] transition-colors duration-200 group-hover:bg-[#A3248F] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug text-[#162238]">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#4A5B73]">{desc}</p>
                  </div>
                </div>
              ))}
            </StaggerList>

            {/* Mobile and tablet link */}
            <FadeUp delay={0.2} distance={16} className="mt-6 lg:hidden">
              <Link
                href="/community"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#162238] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0D55AE] sm:w-auto"
              >
                Explore all initiatives
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}