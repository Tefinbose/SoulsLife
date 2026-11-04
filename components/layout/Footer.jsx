import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/data/homeData";

const exploreLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Counseling Process", href: "/process" },
  { label: "Community", href: "/community" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Student Counseling", href: "/services#student" },
  { label: "Career Guidance", href: "/services#career" },
  { label: "Family & Marital Counseling", href: "/services#family" },
  { label: "Mental Health & Wellness", href: "/services#mental-health" },
  { label: "Psychological Assessments", href: "/services#assessment" },
  { label: "Tele-Counseling", href: "/services#tele" },
];

const headingCls = "mb-4 text-sm font-semibold text-white";
const linkCls =
  "text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-slate-800 bg-[#0F172A] pt-14 text-slate-300">
      <div className="wellness-container">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-4">
            <Link
              href="/"
              className="inline-block rounded-2xl bg-white px-3.5 py-2 transition-opacity hover:opacity-90"
            >
              <Image
                src="/images/logo-transparent.png"
                alt="Souls Life Wellbeing Center"
                width={160}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">{siteConfig.tagline}</p>
            <p className="flex max-w-xs items-start gap-2 text-sm text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E8B4DC]" />
              <span>Arimbra Building, Nilambur Road, Wandoor, Malappuram, Kerala – 679328</span>
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="lg:col-span-2">
            <h4 className={headingCls}>Explore</h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h4 className={headingCls}>Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className={headingCls}>Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E8B4DC]" />
                <span>
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                    {siteConfig.phoneFormatted}
                  </a>
                  <br />
                  <a href={`tel:${siteConfig.altPhone}`} className="hover:text-white">
                    {siteConfig.altPhoneFormatted}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E8B4DC]" />
                <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#E8B4DC]" />
                <span>
                  {siteConfig.timings.weekdays}
                  <span className="mt-0.5 block text-xs text-slate-500">{siteConfig.timings.special}</span>
                </span>
              </li>
              <li>
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#E8B4DC] underline-offset-4 hover:text-white hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency helplines */}
        <div className="flex flex-col gap-2 border-t border-slate-800 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" />
            <span>In a crisis? Free support is available 24/7.</span>
          </p>
          <p className="text-slate-400">
            DISHA <a href="tel:1056" className="font-semibold text-emerald-400 hover:text-emerald-300">1056</a>
            <span className="mx-2 text-slate-600">|</span>
            Tele-MANAS <a href="tel:14416" className="font-semibold text-emerald-400 hover:text-emerald-300">14416</a>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-5 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Souls Life Wellbeing Center. All rights reserved.
        </div>
      </div>
    </footer>
  );
}