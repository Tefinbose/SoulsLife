"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Loader2,
  AlertCircle,
  User,
  MessageSquare,
} from "lucide-react";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/interactive/InteractiveBackground";
import BookSessionButton from "@/components/buttons/BookSessionButton";
import ContactBirds, { CompanionBirdsPair } from "@/components/interactive/ContactBirds";
import { siteConfig } from "@/data/homeData";
import { FadeUp, FadeIn } from "@/components/ui/MotionSection";

const ENQUIRY_SUBJECTS = [
  "General Counseling Inquiry",
  "Student Counseling & Academic Support",
  "Family & Marital Reconciliation",
  "Child Development & Parenting Guidance",
  "Mental Health & Emotional Wellness",
  "Career Guidance & Psychometric Assessment",
  "Workshops, Seminars & Institutional Training",
  "Clinic Timings, Fees & Procedures",
  "Other Questions",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: ENQUIRY_SUBJECTS[0],
    message: "",
    privacyConsent: true,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Automatically reset back to the original form after 5 seconds of success alert
  useEffect(() => {
    if (!submitted) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSubmitted(false);
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            subject: ENQUIRY_SUBJECTS[0],
            message: "",
            privacyConsent: true,
          });
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = formData.fullName.trim();
    if (trimmedName.length < 2 || !/^[a-zA-Z\s.']{2,}$/.test(trimmedName)) {
      setErrorMessage("Please enter a valid full name (letters only, at least 2 characters).");
      return;
    }

    const cleanedPhone = (formData.phone || "").replace(/\D/g, "");
    if (cleanedPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setErrorMessage("Mobile number must be exactly 10 digits starting with 6, 7, 8, or 9 (e.g. 9876543210).");
      return;
    }

    const trimmedEmail = formData.email.trim();
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    const trimmedMessage = formData.message.trim();
    if (trimmedMessage.length < 5) {
      setErrorMessage("Please enter an enquiry message of at least 5 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fullName: trimmedName,
          phone: cleanedPhone,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to send your message. Please try again.");
      }

      setCountdown(5);
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || "An error occurred while submitting your enquiry.");
    } finally {
      setLoading(false);
    }
  };

  const directWhatsAppUrl = `https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
    "Hello Souls Life Wellbeing Center, I have an inquiry regarding your services."
  )}`;

  return (
    <div className="wellness-page-wrap page-root relative">
      <InteractiveBackground />
      {/* Companion Birds (Pink & Blue) Flying Across Contact Page */}
      <ContactBirds />
      <Navbar />

      <main className="relative z-10">
        {/* ========================================================
            CONTACT HERO SECTION (CLEAN & VIEWPORT OPTIMIZED)
            ======================================================== */}
        <section className="pt-5 sm:pt-7 pb-2 relative">
          <div className="wellness-container">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              {/* Feature Companion Birds Pair Hovering Cheerfully Above Header */}
              <div className="flex justify-center -mb-1">
                <CompanionBirdsPair size={48} />
              </div>

              <FadeIn delay={0}>
                <span className="section-label-chip inline-flex">
                  GET IN TOUCH &amp; ENQUIRIES
                </span>
              </FadeIn>
              <FadeUp delay={0.08}>
                <h1 className="page-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#162238] tracking-tight leading-tight">
                  We Are Here to <span className="animated-gradient-text">Listen &amp; Guide</span> You
                </h1>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p className="text-xs sm:text-sm text-[#4A5B73] leading-relaxed max-w-xl mx-auto">
                  Have questions regarding our counseling services, workshops, or clinic programs?
                  Reach out to our clinical desk in Wandoor or submit your confidential enquiry below.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ========================================================
            TWO-COLUMN MAIN SECTION: CLINIC DETAILS + ENQUIRY FORM
            ======================================================== */}
        <section id="contact" className="pt-2 pb-10 sm:pb-14">
          <div className="wellness-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
              {/* ----------------------------------------------------
                  LEFT COLUMN: CLINIC CONTACT & LOCATION
                  ---------------------------------------------------- */}
              <FadeUp delay={0.1} distance={20} className="lg:col-span-5 space-y-3.5">
                <div>
                  <span className="section-label-chip inline-flex mb-1.5">
                    IN-CLINIC CENTER
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#162238] tracking-tight">
                    Visit Our Wandoor Center
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4A5B73] mt-1 leading-relaxed">
                    Designed with utmost privacy, tranquil acoustic isolation, and welcoming warmth.
                    Walk in for personal, marital, or child consultations.
                  </p>
                </div>

                {/* Book Session CTA Card */}
                <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-[#A3248F]/10 via-[#0D55AE]/10 to-transparent border border-[#A3248F]/25 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3248F] bg-white px-2 py-0.5 rounded-md border border-[#A3248F]/20">
                      CONSULTATION BOOKING
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#162238]">
                    Looking to Book an Appointment?
                  </h3>
                  <p className="text-xs text-[#4A5B73] leading-relaxed">
                    Choose your doctor, session date, and time slot directly in our interactive booking portal.
                  </p>
                  <div className="pt-0.5">
                    <BookSessionButton className="btn-nature-primary text-xs py-2 px-4 shadow-sm flex items-center gap-2 cursor-pointer">
                      <Calendar className="w-4 h-4" />
                      <span>Book Consultation Session</span>
                    </BookSessionButton>
                  </div>
                </div>

                {/* Contact Detail Cards */}
                <div className="space-y-3">
                  {/* Address Card */}
                  <div className="group p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#A3248F]/15 shadow-xs hover:shadow-md hover:border-[#A3248F]/35 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#A3248F]/10 text-[#A3248F] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#162238] tracking-wide mb-0.5">
                        Physical Clinic Address
                      </p>
                      <p className="text-xs sm:text-sm text-[#243746] leading-relaxed">
                        {siteConfig.address.full}
                      </p>
                      <a
                        href={siteConfig.address.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3248F] hover:text-[#0D55AE] mt-1.5 transition-colors"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Phone & Helplines */}
                  <div className="group p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#A3248F]/15 shadow-xs hover:shadow-md hover:border-[#A3248F]/35 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0D55AE]/10 text-[#0D55AE] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#162238] tracking-wide mb-0.5">
                        Helplines &amp; Calls
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#243746]">
                        <a href={`tel:+91${siteConfig.phone}`} className="hover:text-[#A3248F] transition-colors">
                          {siteConfig.phoneFormatted}
                        </a>
                        <span className="text-xs text-[#4A5B73] font-normal ml-2">(Primary Helpline)</span>
                      </p>
                      <p className="text-xs text-[#4A5B73] mt-0.5">
                        <a href={`tel:+91${siteConfig.altPhone}`} className="hover:text-[#A3248F] transition-colors">
                          {siteConfig.altPhoneFormatted}
                        </a>
                        <span className="ml-2">(Secondary Desk)</span>
                      </p>
                    </div>
                  </div>

                  {/* Consultation Timings */}
                  <div className="group p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#A3248F]/15 shadow-xs hover:shadow-md hover:border-[#A3248F]/35 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#059669]/10 text-[#059669] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#162238] tracking-wide mb-0.5">
                        Consultation Timings
                      </p>
                      <p className="text-xs sm:text-sm text-[#243746] font-medium">
                        {siteConfig.timings.weekdays}
                      </p>
                      <p className="text-xs text-[#4A5B73] mt-0.5">
                        {siteConfig.timings.special}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Action Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/25 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                    <MessageCircle className="w-4 h-4" />
                    <span>Direct WhatsApp Desk</span>
                  </div>
                  <p className="text-xs text-[#243746] leading-relaxed">
                    Prefer direct messaging? Connect instantly with our clinic intake coordinator on WhatsApp.
                  </p>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-nature-whatsapp text-xs sm:text-sm py-2 px-3.5 text-center justify-center shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp: +91 {siteConfig.phone}</span>
                  </a>
                </div>
              </FadeUp>

              {/* ----------------------------------------------------
                  RIGHT COLUMN: CONTACT & ENQUIRY FORM (STICKY IN SCREEN)
                  ---------------------------------------------------- */}
              <div className="lg:col-span-7 lg:sticky lg:top-20 z-20 self-start">
                <FadeUp delay={0.12} distance={20} className="w-full">
                  <div className="bg-white rounded-3xl border border-[#A3248F]/20 shadow-xl contact-sticky-glow p-4.5 sm:p-6 relative overflow-hidden lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    {/* Subtle Ambient Orb */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#A3248F]/10 to-[#0D55AE]/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Form Header */}
                    <div className="mb-4 sm:mb-5 relative z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A3248F]/10 text-[#A3248F] text-[11px] font-semibold tracking-wider uppercase mb-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send an Enquiry</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-[#162238] tracking-tight">
                        Send Us a Message
                      </h2>
                      <p className="text-xs sm:text-sm text-[#4A5B73] mt-1.5 leading-relaxed font-normal">
                        Have questions about our counseling programs, corporate workshops, or services?
                        Fill out the form below and our care desk will respond promptly.
                      </p>
                    </div>

                    {/* Error Feedback Alert */}
                    {errorMessage && (
                      <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2 relative z-10">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {submitted ? (
                      /* ========================================================
                         ENQUIRY SUBMITTED CONFIRMATION VIEW
                         ======================================================== */
                      <div className="py-6 text-center space-y-5 relative z-10 animate-in fade-in duration-300">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                          <CheckCircle2 className="w-9 h-9" />
                        </div>

                        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 text-left space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                              </span>
                              <p className="font-bold text-sm sm:text-base text-emerald-900">
                                Enquiry Message Received!
                              </p>
                            </div>
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              Resetting in {countdown}s
                            </span>
                          </div>
                          <p className="text-xs text-emerald-800/90 leading-relaxed pl-4.5 font-normal">
                            Thank you, <strong>{formData.fullName}</strong>. Your enquiry regarding <strong>{formData.subject}</strong> has been received by our clinical desk at Wandoor. Our coordinator will contact you via phone or email shortly.
                          </p>
                        </div>

                        {/* Returning to form countdown status bar */}
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/80 border border-emerald-200/70 py-2 px-4 rounded-xl">
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>Form will automatically return in {countdown} seconds...</span>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setSubmitted(false);
                              setFormData({
                                fullName: "",
                                email: "",
                                phone: "",
                                subject: ENQUIRY_SUBJECTS[0],
                                message: "",
                                privacyConsent: true,
                              });
                            }}
                            className="flex-1 btn-nature-secondary text-xs sm:text-sm py-3 text-center justify-center font-semibold cursor-pointer"
                          >
                            Reset to Form Now
                          </button>

                          <BookSessionButton className="flex-1 btn-nature-primary text-xs sm:text-sm py-3 text-center justify-center font-semibold cursor-pointer shadow-md">
                            <Calendar className="w-4 h-4" />
                            <span>Book an Appointment</span>
                          </BookSessionButton>
                        </div>
                      </div>
                    ) : (
                      /* ========================================================
                         ACTIVE ENQUIRY FORM
                         ======================================================== */
                      <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
                        {/* Full Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs sm:text-[13px] font-semibold text-[#162238] mb-1.5 tracking-tight">
                              Full Name <span className="text-[#A3248F]">*</span>
                            </label>
                            <div className="relative">
                              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                              <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder="Your full name"
                                className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-[#162238] font-normal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3248F]/30 focus:border-[#A3248F] transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs sm:text-[13px] font-semibold text-[#162238] mb-1.5 tracking-tight">
                              Mobile / WhatsApp (10 Digits) <span className="text-[#A3248F]">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-500 pointer-events-none">
                                +91
                              </span>
                              <input
                                type="tel"
                                required
                                maxLength={10}
                                value={formData.phone}
                                onChange={(e) => {
                                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                                  setFormData({ ...formData, phone: digits });
                                }}
                                placeholder="9876543210"
                                className="w-full pl-12 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-[#162238] font-normal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3248F]/30 focus:border-[#A3248F] transition-all tracking-wide"
                              />
                            </div>
                            <p className="text-[11px] text-neutral-400 mt-1 font-normal">Starts with 6, 7, 8, or 9</p>
                          </div>
                        </div>

                        {/* Email Address & Subject */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs sm:text-[13px] font-semibold text-[#162238] mb-1.5 tracking-tight">
                              Email Address <span className="text-[#A3248F]">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-[#162238] font-normal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3248F]/30 focus:border-[#A3248F] transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs sm:text-[13px] font-semibold text-[#162238] mb-1.5 tracking-tight">
                              Nature of Enquiry <span className="text-[#A3248F]">*</span>
                            </label>
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full px-3 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm font-normal text-[#162238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3248F]/30 focus:border-[#A3248F] transition-all"
                            >
                              {ENQUIRY_SUBJECTS.map((subj) => (
                                <option key={subj} value={subj}>
                                  {subj}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Detailed Message */}
                        <div>
                          <label className="block text-xs sm:text-[13px] font-semibold text-[#162238] mb-1.5 tracking-tight">
                            Your Message / Questions <span className="text-[#A3248F]">*</span>
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us what you would like to know or how we can assist you..."
                            className="w-full p-3 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-[#162238] font-normal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3248F]/30 focus:border-[#A3248F] transition-all resize-none leading-relaxed"
                          />
                        </div>

                        {/* Privacy Consent */}
                        <div className="flex items-start gap-2.5 pt-0.5">
                          <input
                            type="checkbox"
                            id="contactPrivacy"
                            required
                            checked={formData.privacyConsent}
                            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-[#A3248F] focus:ring-[#A3248F] cursor-pointer"
                          />
                          <label htmlFor="contactPrivacy" className="text-xs text-[#4A5B73] leading-relaxed cursor-pointer select-none font-normal">
                            I consent to Souls Life contacting me regarding this enquiry in accordance with ethical privacy principles.
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-shimmer w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#A3248F] via-[#911D7F] to-[#0D55AE] hover:from-[#8B1E7A] hover:to-[#0A4794] text-white font-semibold text-sm sm:text-[15px] tracking-[0.015em] shadow-lg shadow-[#A3248F]/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="font-semibold">Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span className="font-semibold tracking-wide">Submit Enquiry Message</span>
                            </>
                          )}
                        </button>

                        <p className="text-center text-xs text-[#5B6B82] pt-0.5 flex items-center justify-center gap-1.5 font-normal">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#A3248F] inline shrink-0" />
                          <span>100% Confidential • Direct clinical desk intake • Zero spam</span>
                        </p>
                      </form>
                    )}
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
