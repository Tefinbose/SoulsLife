"use client";

import { Calendar, MessageCircle, Phone, MapPin, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/data/homeData";
import { FadeUp, FadeIn } from "@/components/ui/MotionSection";

export default function FinalCtaNature() {
  const whatsappUrl = `https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
    "Hello Souls Life, I would like to book an appointment."
  )}`;

  return (
    <section className="py-10 lg:py-16 relative overflow-hidden">
      <div className="wellness-container">
        <div className="relative rounded-[2rem] p-8 sm:p-12 text-center bg-white/95 backdrop-blur-md border border-[#A3248F]/25 shadow-xl overflow-hidden max-w-4xl mx-auto">
          {/* Subtle Ambient Orbs in the CTA Card */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#A3248F]/15 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#0D55AE]/15 rounded-full blur-3xl -z-0 pointer-events-none" />

          <FadeUp delay={0.1} distance={24} className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="section-label-chip inline-flex mb-1">
              TAKE THE FIRST STEP
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#162238] tracking-tight leading-[1.12]">
              Your Wellbeing Journey{" "}
              <span className="animated-gradient-text">Starts Here</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#4A5B73] leading-relaxed max-w-lg mx-auto">
              Take the first step towards a healthier, happier and more fulfilling tomorrow.
              Everything you share with our qualified team is held in absolute, ethical confidentiality.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex items-center justify-center flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-booking-modal"));
                  }
                }}
                className="btn-nature-primary text-xs sm:text-sm px-7 py-3.5 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={`https://wa.me/91${siteConfig.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nature-whatsapp text-xs sm:text-sm px-6 py-3.5 transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {siteConfig.phone}</span>
              </a>

              <a
                href="tel:+918156906718"
                className="btn-nature-secondary text-xs sm:text-sm px-6 py-3.5 transition-transform hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 text-[#A3248F]" />
                <span>Call: 8156906718</span>
              </a>
            </div>

            {/* Location & Emergency Support Badges */}
            <div className="pt-4 border-t border-[#A3248F]/15 flex flex-wrap items-center justify-center gap-5 text-xs text-[#4A5B73]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A3248F]" />
                <span>Arimbra Building, Nilambur Road, Wandoor, Malappuram</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>Kerala DISHA: 1056 | Tele-MANAS: 14416</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
