"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Calendar, Menu, X, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/homeData";
import AppointmentBookingModal from "@/components/forms/AppointmentBookingModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Our Process", href: "/process" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const openBooking = useCallback((service = "", doctor = "") => {
    setSelectedService(service);
    setSelectedDoctor(doctor);
    setMobileOpen(false);
    setIsBookingOpen(true);
  }, []);

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedService("");
    setSelectedDoctor("");
  };

  // Close the mobile menu after navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Other components can open the booking modal with a service/doctor preselected
  useEffect(() => {
    const onOpen = (e) => {
      const detail = e.detail;
      openBooking(detail?.service, detail?.doctor);
    };
    window.addEventListener("open-booking-modal", onOpen);
    return () => window.removeEventListener("open-booking-modal", onOpen);
  }, [openBooking]);

  // Mobile menu: close on Escape and stop the page behind it from scrolling
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#A3248F]/15 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "py-2 shadow-sm" : "py-3.5"
      }`}
    >
      <div className="wellness-container">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" aria-label="Souls Life Wellbeing Center home" className="flex shrink-0 items-center">
            <Image
              src="/images/logo-transparent.png"
              alt="Souls Life Wellbeing Center"
              width={160}
              height={50}
              className="h-10 w-auto object-contain sm:h-11"
              priority
            />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#A3248F]/10 text-[#A3248F]"
                      : "text-[#162238] hover:bg-[#FDF2F9] hover:text-[#A3248F]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#A3248F] to-[#0D55AE] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-95 sm:inline-flex"
            >
              <Calendar className="h-4 w-4" />
              <span>Book a Session</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="rounded-xl border border-[#A3248F]/25 bg-[#FDF2F9] p-2 text-[#A3248F] transition-colors hover:bg-[#F3CEEC] lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          aria-hidden={!mobileOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
            mobileOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-3 max-h-[calc(100vh-6rem)] space-y-3 overflow-y-auto rounded-2xl border border-[#A3248F]/15 bg-white p-4 shadow-xl">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {navLinks.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active ? "bg-[#A3248F]/10 text-[#A3248F]" : "text-[#162238] hover:bg-[#FDF2F9]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-2 border-t border-[#A3248F]/15 pt-3">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="btn-nature-primary cursor-pointer justify-center py-2.5 text-center text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </button>
                <a
                  href={`https://wa.me/91${siteConfig.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-nature-whatsapp justify-center py-2.5 text-center text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+918848151514"
                  className="btn-nature-secondary justify-center py-2.5 text-center text-sm"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call +91 8848151514</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentBookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        initialService={selectedService}
        initialDoctor={selectedDoctor}
      />
    </header>
  );
}