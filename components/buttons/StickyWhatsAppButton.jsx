"use client";

import { useState } from "react";
import { siteConfig } from "@/data/homeData";

export default function StickyWhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappPhone = siteConfig?.phone || "8156906718";
  const defaultMessage = encodeURIComponent(
    "Hello Souls Life! I would like to inquire about counseling sessions."
  );
  const whatsappUrl = `https://wa.me/91${whatsappPhone}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="WhatsApp quick contact"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 print:hidden select-none"
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0px)",
      }}
    >
      {/* Desktop / Tablet Hover Pill Tooltip */}
      <div
        className={`hidden sm:flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-neutral-200/80 transition-all duration-300 pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-3 scale-95 pointer-events-none"
        }`}
        aria-hidden="true"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
        </span>
        <span className="text-xs font-semibold text-[#162238] whitespace-nowrap">
          Chat with us on WhatsApp
        </span>
      </div>

      {/* Floating Sticky WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Souls Life Wellbeing Center on WhatsApp (opens in new tab)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#20ba59] via-[#25D366] to-[#2ee272] text-white shadow-[0_10px_28px_rgba(37,211,102,0.42)] transition-all duration-300 hover:scale-110 hover:shadow-[0_14px_36px_rgba(37,211,102,0.6)] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Subtle breathing ripple wave */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none"
          style={{ animationDuration: "3s" }}
        />

        {/* Ambient Glow Aura */}
        <span className="absolute -inset-2 rounded-full bg-[#25D366]/20 blur-md -z-10 group-hover:bg-[#25D366]/35 transition-colors" />

        {/* Official WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          className="relative z-10 h-7 w-7 sm:h-8 sm:w-8 fill-white drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.507 14.307l-.009.075c-.238-.12-1.406-.693-1.624-.772-.219-.08-.378-.12-.538.12-.16.239-.617.772-.756.932-.14.16-.279.18-.518.06-.239-.12-1.01-.372-1.924-1.187-.711-.635-1.192-1.42-1.331-1.659-.14-.24-.015-.37.105-.489.108-.107.239-.279.359-.419.12-.14.16-.24.239-.399.08-.16.04-.3-.02-.42-.06-.12-.538-1.297-.738-1.777-.194-.467-.393-.404-.539-.411l-.46-.008c-.16 0-.418.06-.638.3-.219.24-.837.818-.837 1.996 0 1.178.857 2.316.977 2.476.12.16 1.687 2.576 4.088 3.613.571.247 1.017.394 1.365.505.574.183 1.096.157 1.509.095.46-.069 1.406-.575 1.605-1.13.199-.556.199-1.032.14-1.131-.06-.1-.219-.16-.458-.28zM12.04 2C6.545 2 2.08 6.465 2.08 11.96c0 1.968.57 3.799 1.554 5.344L2 22l4.832-1.583a9.92 9.92 0 005.208 1.464c5.495 0 9.96-4.465 9.96-9.96C22 6.465 17.535 2 12.04 2zm0 18.238a8.26 8.26 0 01-4.437-1.282l-.318-.189-2.868.94.956-2.795-.207-.329A8.24 8.24 0 013.78 11.96c0-4.555 3.706-8.26 8.26-8.26 4.555 0 8.26 3.705 8.26 8.26 0 4.556-3.705 8.278-8.26 8.278z" />
        </svg>

        {/* Online Status Micro Dot */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400 shadow-sm" />
        </span>
      </a>
    </aside>
  );
}

