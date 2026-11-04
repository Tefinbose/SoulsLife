"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Calendar,
  Clock,
  User,
  UserCheck,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Video,
  Building2,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/data/homeData";

const DEFAULT_SERVICES = [
  "Student Counseling & Academic Support",
  "Career Guidance & Skill Development",
  "Family & Marital Counseling",
  "Mental Health & Emotional Wellness Counseling",
  "Child Development & Learning Support",
  "Elderly Emotional Support & Geriatric Counseling",
  "Psychological Assessments & IQ Testing",
  "Tele-Counseling & Remote Emotional Support",
  "Workshops & Training Programs",
];

const TIME_SLOTS = [
  "Morning (09:30 AM - 11:30 AM)",
  "Noon (11:30 AM - 01:30 PM)",
  "Afternoon (02:30 PM - 04:30 PM)",
  "Evening (04:30 PM - 07:00 PM)",
];

export const SPECIALISTS_LIST = [
  { name: "Dr. Shailaja M.", role: "Clinical Psychologist (Lead)" },
  { name: "Mr. Haris K.", role: "Senior Psychiatric Social Worker" },
  { name: "Mrs. Fathima R.", role: "Child & Adolescent Psychologist" },
  { name: "Mr. Arun Das", role: "Career & Psychometrics Lead" },
];

const emptySubscribe = () => () => {};

export default function AppointmentBookingModal({
  isOpen,
  onClose,
  initialService = "",
  initialDoctor = "",
}) {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [prevProps, setPrevProps] = useState({ initialService, initialDoctor });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceName: initialService || DEFAULT_SERVICES[0],
    doctorName: initialDoctor || "",
    preferredDate: "",
    preferredTime: TIME_SLOTS[0],
    consultationType: "IN_PERSON",
    message: "",
    privacyConsent: true,
  });

  if (prevProps.initialService !== initialService || prevProps.initialDoctor !== initialDoctor) {
    setPrevProps({ initialService, initialDoctor });
    setFormData((prev) => ({
      ...prev,
      serviceName: initialService || prev.serviceName,
      doctorName: initialDoctor || "",
    }));
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Set today as minimum selectable date
  const todayStr = new Date().toISOString().split("T")[0];

  // Load active services dynamically from /api/services
  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setServices(json.data.map((s) => s.title));
            if (!initialService) {
              setFormData((prev) => ({ ...prev, serviceName: json.data[0].title }));
            }
          }
        }
      } catch (e) {
        // Fallback to DEFAULT_SERVICES
      }
    }
    if (isOpen) {
      loadServices();
    }
  }, [isOpen, initialService]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !isMounted) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side Strict Validations
    const trimmedName = formData.fullName.trim();
    if (trimmedName.length < 2 || !/^[a-zA-Z\s.']{2,}$/.test(trimmedName)) {
      setError("Please enter a valid full name (letters only, at least 2 characters).");
      return;
    }

    const cleanedPhone = (formData.phone || "").replace(/\D/g, "");
    if (cleanedPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setError("Mobile number must be exactly 10 digits starting with 6, 7, 8, or 9 (e.g. 9876543210).");
      return;
    }

    const trimmedEmail = formData.email.trim();
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    if (!formData.preferredDate) {
      setError("Please select your preferred appointment date.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fullName: trimmedName,
          phone: cleanedPhone,
          email: trimmedEmail,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Unable to process appointment request.");
      }

      const appt = result.appointment || result.data || result;

      // Automatically store booking confirmation in client browser localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("souls_life_active_booking", JSON.stringify({
            reference: appt.reference,
            fullName: appt.fullName,
            doctorName: appt.doctorName || formData.doctorName || null,
            serviceName: appt.serviceName,
            preferredDate: appt.preferredDate,
            preferredTime: appt.preferredTime,
            consultationType: appt.consultationType,
            status: appt.status || "PENDING",
            savedAt: new Date().toISOString(),
          }));
        } catch (e) {
          // LocalStorage fallback
        }
      }

      // Automatically show confirmation box on screen (no manual message sending needed!)
      setSuccessData(appt);
    } catch (err) {
      setError(err.message || "Failed to submit booking. Please try again or reach us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setError("");
    setCopied(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      serviceName: services[0] || DEFAULT_SERVICES[0],
      doctorName: initialDoctor || "",
      preferredDate: "",
      preferredTime: TIME_SLOTS[0],
      consultationType: "IN_PERSON",
      message: "",
      privacyConsent: true,
    });
    onClose();
  };

  const copyReference = () => {
    if (successData?.reference) {
      navigator.clipboard.writeText(successData.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleReset();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col my-auto max-h-[92vh] sm:max-h-[88vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================
            FIXED TOP HEADER: Title + Close Button (Never Cut Off!)
            ======================================================== */}
        <div className="shrink-0 sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 sm:px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="min-w-0 pr-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A3248F]/10 text-[#A3248F] text-[11px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Confidential &amp; Ethical Care</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#162238] tracking-tight truncate">
              {successData ? "Appointment Request Confirmed" : "Book a Consultation"}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="shrink-0 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            MODAL BODY (Scrollable inside, perfectly aligned)
            ======================================================== */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5">
          {successData ? (
            /* ========================================================
               SUCCESS ALERT VIEW (Rich Confirmation Screen)
               ======================================================== */
            <div className="space-y-4 text-center py-2 animate-in fade-in duration-200">
              {/* Green Success Badge */}
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              {/* High-Visibility Confirmation Alert */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 text-left space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                  </span>
                  <p className="font-extrabold text-sm sm:text-base text-emerald-900">
                    Appointment Request Submitted &amp; Stored!
                  </p>
                </div>
                <p className="text-xs text-emerald-800/90 leading-relaxed pl-4.5">
                  Thank you, <strong>{successData.fullName}</strong>. Your consultation request has been automatically registered in our clinical database. You do not need to send any message.
                </p>
              </div>

              {/* Booking Reference ID Card */}
              <div className="bg-[#FAF8FD] border border-[#A3248F]/20 rounded-2xl p-4 sm:p-5 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-neutral-500 tracking-wider block">
                      Booking Reference ID
                    </span>
                    <span className="font-mono text-lg sm:text-xl font-black text-[#A3248F]">
                      {successData.reference}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyReference}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition shadow-xs cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {successData.doctorName && (
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Consulting Specialist:</span>
                      <span className="font-extrabold text-[#A3248F] text-right">
                        {successData.doctorName}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Service:</span>
                    <span className="font-semibold text-neutral-800 text-right max-w-[240px] truncate">
                      {successData.serviceName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Date &amp; Time:</span>
                    <span className="font-semibold text-neutral-800">
                      {successData.preferredDate} • {successData.preferredTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Consultation Mode:</span>
                    <span className="font-bold text-[#A3248F]">
                      {successData.consultationType === "ONLINE"
                        ? "Online Consultation (Worldwide Video)"
                        : "In-Clinic Session"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Client Contact:</span>
                    <span className="font-mono font-medium text-neutral-800">
                      {formData.phone || successData.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Automatic System Storage Confirmation Box */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/25 rounded-2xl text-emerald-950 text-xs text-left flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-xs sm:text-sm text-emerald-950">
                    Automatically Stored in Clinical Database
                  </p>
                  <p className="text-[11px] sm:text-xs text-emerald-800/90 mt-1 leading-relaxed">
                    Your appointment with Reference ID (<strong>{successData.reference}</strong>) is permanently recorded in our system. Our clinical desk has received your request and will reach out to confirm your session. No further action is required from you.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Primary Done/Close */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#A3248F] to-[#801770] hover:from-[#8B1E7A] hover:to-[#6E1260] text-white font-extrabold text-sm shadow-md shadow-[#A3248F]/25 hover:shadow-lg transition cursor-pointer"
                >
                  Done / Close
                </button>

                {/* Optional subtle clinic WhatsApp link */}
                <p className="text-[11px] text-neutral-500 text-center">
                  Need immediate clinical assistance?{" "}
                  <a
                    href={`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
                      `Hello Souls Life, I just booked an appointment request with Reference ID: ${successData.reference}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0D55AE] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Chat with Clinic Desk</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
          ) : (
            /* ========================================================
               ACTIVE FORM VIEW (Symmetrical, Clean Alignment)
               ======================================================== */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#4A5B73] leading-relaxed">
                Take the first courageous step towards healing. Select your consultation mode and preferred schedule below.
              </p>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Consultation Mode Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-2">
                  Consultation Mode *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: "IN_PERSON" })}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 sm:gap-3 transition cursor-pointer ${
                      formData.consultationType === "IN_PERSON"
                        ? "border-[#A3248F] bg-[#FAF8F5] ring-2 ring-[#A3248F]/20 shadow-xs"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <Building2
                      className={`w-5 h-5 mt-0.5 shrink-0 ${
                        formData.consultationType === "IN_PERSON" ? "text-[#A3248F]" : "text-neutral-400"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-900 truncate">In-Clinic Session</p>
                      <p className="text-[11px] text-neutral-500 truncate">Wandoor, Malappuram</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: "ONLINE" })}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 sm:gap-3 transition cursor-pointer ${
                      formData.consultationType === "ONLINE"
                        ? "border-[#0D55AE] bg-[#F0F6FF] ring-2 ring-[#0D55AE]/20 shadow-xs"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <Video
                      className={`w-5 h-5 mt-0.5 shrink-0 ${
                        formData.consultationType === "ONLINE" ? "text-[#0D55AE]" : "text-neutral-400"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-900 truncate">Online Video</p>
                      <p className="text-[11px] text-neutral-500 truncate">Encrypted Worldwide</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Specialist / Doctor Selection */}
              {initialDoctor ? (
                /* LOCKED SPECIALIST BANNER: Displayed ONLY for this chosen doctor */
                <div className="p-3.5 rounded-2xl bg-[#FAF8FD] border border-[#A3248F]/25 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A3248F] to-[#0D55AE] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3248F] bg-[#A3248F]/10 px-2 py-0.5 rounded-md inline-block">
                        Consulting Specialist
                      </span>
                      <p className="text-sm font-black text-[#162238] leading-tight mt-0.5">
                        {initialDoctor}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md shrink-0">
                    Direct Booking
                  </span>
                </div>
              ) : (
                /* OPTIONAL DOCTOR SELECTOR: For general appointment requests */
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-1.5">
                    Select Doctor / Specialist (Optional)
                  </label>
                  <div className="relative">
                    <UserCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <select
                      value={formData.doctorName}
                      onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#A3248F] focus:bg-white transition"
                    >
                      <option value="">Any Available Specialist (Recommended)</option>
                      {SPECIALISTS_LIST.map((doc) => (
                        <option key={doc.name} value={doc.name}>
                          {doc.name} — {doc.role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Full Name & Phone in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#A3248F] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-1.5">
                    Mobile / WhatsApp (10 Digits) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500 pointer-events-none">
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
                      className="w-full pl-12 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#A3248F] focus:bg-white transition"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">Starts with 6, 7, 8, or 9</p>
                </div>
              </div>

              {/* Email Address & Select Service in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#A3248F] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-1.5">
                    Select Service *
                  </label>
                  <select
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#A3248F] focus:bg-white transition"
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-1.5">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#A3248F] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#A3248F] focus:bg-white transition"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#162238] mb-1.5">
                  Brief Note or Specific Concerns (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you would like support with..."
                  className="w-full p-3 bg-neutral-50/80 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#A3248F] focus:bg-white transition resize-none"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="modalPrivacyConsent"
                  required
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-[#A3248F] focus:ring-[#A3248F] cursor-pointer"
                />
                <label htmlFor="modalPrivacyConsent" className="text-[11px] text-neutral-600 leading-tight cursor-pointer">
                  I agree to Souls Life&apos;s ethical confidentiality terms and consent to clinical communication regarding my booking request.
                </label>
              </div>

              {/* Bottom Sticky Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 font-semibold text-xs sm:text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#A3248F] to-[#801770] hover:from-[#8B1E7A] hover:to-[#6E1260] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#A3248F]/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Recording Booking...</span>
                    </>
                  ) : (
                    <span>Confirm &amp; Request Appointment</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
