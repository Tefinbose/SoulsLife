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
  const isHome = pathname === "/" || pathname === "";
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

  // Track scroll position for subtle elevation transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // External open-booking-modal event listener
  useEffect(() => {
    const onOpen = (e) => {
      const detail = e.detail;
      openBooking(detail?.service, detail?.doctor);
    };
    window.addEventListener("open-booking-modal", onOpen);
    return () => window.removeEventListener("open-booking-modal", onOpen);
  }, [openBooking]);

  // Mobile menu: close on Escape and lock body scroll
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
    <>
      {/* Spacer on non-home pages so content starts naturally below the floating island navbar */}
      {!isHome && <div className="h-16 sm:h-20 w-full" aria-hidden="true" />}

      <header
        className={`fixed top-0 inset-x-0 z-50 w-full px-3 sm:px-6 transition-all duration-300 pointer-events-none ${
          scrolled ? "pt-2 pb-1" : "pt-2.5 sm:pt-3.5 pb-1.5"
        }`}
      >
        <div className="mx-auto max-w-6xl w-full">
          {/* Modern Round-Shaped Capsule Island */}
          <div
            className={`pointer-events-auto flex items-center justify-between rounded-full border transition-all duration-300 px-3 sm:px-4 py-1.5 sm:py-2 ${
              scrolled
                ? "bg-white/95 backdrop-blur-xl border-[#A3248F]/25 shadow-[0_12px_36px_rgba(22,34,56,0.12)]"
                : "bg-white/90 backdrop-blur-lg border-white/80 shadow-[0_8px_30px_rgba(22,34,56,0.06)] hover:border-[#A3248F]/20"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Souls Life Wellbeing Center home"
              className="flex shrink-0 items-center pl-1 sm:pl-2"
            >
              <Image
                src="/images/logo-transparent.png"
                alt="Souls Life Wellbeing Center"
                width={140}
                height={42}
                className="h-8 w-auto object-contain sm:h-9 transition-transform duration-200 hover:scale-[1.02]"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {navLinks.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
                      active
                        ? "bg-[#A3248F]/10 text-[#A3248F] font-bold shadow-2xs"
                        : "text-[#162238]/85 hover:bg-[#FDF2F9] hover:text-[#A3248F]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pr-1">
              <button
                type="button"
                onClick={() => openBooking()}
                className="hidden cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#A3248F] to-[#0D55AE] px-4.5 py-2 text-xs sm:text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] sm:inline-flex"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book a Session</span>
              </button>

              {/* Mobile Menu Rounded Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A3248F]/20 bg-[#FDF2F9] text-[#A3248F] transition-all duration-200 hover:bg-[#F3CEEC] hover:scale-105 active:scale-95 lg:hidden cursor-pointer"
              >
                {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Card */}
          <div
            id="mobile-menu"
            aria-hidden={!mobileOpen}
            className={`pointer-events-auto transition-all duration-300 ease-out lg:hidden ${
              mobileOpen
                ? "visible opacity-100 translate-y-0"
                : "invisible opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="mt-2.5 overflow-hidden rounded-3xl border border-[#A3248F]/20 bg-white/95 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {navLinks.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-[#A3248F]/10 text-[#A3248F]"
                          : "text-[#162238] hover:bg-[#FDF2F9]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#A3248F]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-3 flex flex-col gap-2 border-t border-[#A3248F]/15 pt-3">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="btn-nature-primary cursor-pointer justify-center py-2.5 text-center text-sm font-bold shadow-md rounded-full"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </button>
                <a
                  href={`https://wa.me/91${siteConfig.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-nature-whatsapp justify-center py-2.5 text-center text-sm font-semibold rounded-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+918848151514"
                  className="btn-nature-secondary justify-center py-2.5 text-center text-sm font-semibold rounded-full"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call +91 8848151514</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dimmed backdrop when mobile menu is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        initialService={selectedService}
        initialDoctor={selectedDoctor}
      />
    </>
  );
}
