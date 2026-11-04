"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
  MessageCircle,
  Sparkles,
  FileText,
  Trash2,
  Edit,
  X,
  Check,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Tabs: "appointments" | "enquiries"
  const [activeTab, setActiveTab] = useState("appointments");

  // Data states
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  // Search & Filter
  const [aptSearch, setAptSearch] = useState("");
  const [aptStatusFilter, setAptStatusFilter] = useState("ALL");
  const [enqSearch, setEnqSearch] = useState("");
  const [enqStatusFilter, setEnqStatusFilter] = useState("ALL");

  // Selected for viewing / modal editing
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // 1. Verify Session & Load Initial Data
  useEffect(() => {
    async function init() {
      try {
        const meRes = await fetch("/api/admin/me");
        if (!meRes.ok) {
          router.push("/admin/login");
          return;
        }
        const meData = await meRes.json();
        setAdmin(meData.admin);

        await fetchAllData();
      } catch (err) {
        console.error("Session verification failed:", err);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  async function fetchAllData() {
    setRefreshing(true);
    try {
      const [statsRes, aptsRes, enqsRes] = await Promise.all([
        fetch("/api/admin/stats", { cache: "no-store" }),
        fetch("/api/admin/appointments", { cache: "no-store" }),
        fetch("/api/admin/enquiries", { cache: "no-store" }),
      ]);

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.data);
      }
      if (aptsRes.ok) {
        const data = await aptsRes.json();
        setAppointments(data.data || []);
      }
      if (enqsRes.ok) {
        const data = await enqsRes.json();
        setEnquiries(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching admin dashboard data:", err);
    } finally {
      setRefreshing(false);
    }
  }

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (err) {
      router.push("/admin/login");
    }
  };

  // Update Appointment Status / Notes
  const handleUpdateAppointment = async (id, newStatus, newNotes) => {
    setIsUpdating(true);
    setUpdateFeedback(null);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes: newNotes }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update appointment");
      }

      setUpdateFeedback({
        type: "success",
        message: `Appointment updated to ${newStatus}! Click the WhatsApp button below if you wish to message the client.`,
        whatsappUrl: data.whatsappUrl,
      });

      // Update state locally
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus, adminNotes: newNotes } : a))
      );
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment((prev) => ({ ...prev, status: newStatus, adminNotes: newNotes }));
      }
      // Refresh stats in background
      fetch("/api/admin/stats").then((r) => r.json()).then((d) => d.success && setStats(d.data));
    } catch (err) {
      setUpdateFeedback({ type: "error", message: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Appointment
  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment request?")) return;
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        setSelectedAppointment(null);
        fetchAllData();
      }
    } catch (err) {
      alert("Failed to delete appointment");
    }
  };

  // Quick Appointment Status Change via Table Dropdown
  const handleQuickStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }

      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );

      setToastMessage({
        type: "success",
        text: `Appointment status updated to ${newStatus}! Click the WhatsApp icon to send message.`,
        whatsappUrl: data.whatsappUrl,
      });

      // Refresh stats in background
      fetch("/api/admin/stats").then((r) => r.json()).then((d) => d.success && setStats(d.data));
    } catch (err) {
      setToastMessage({ type: "error", text: err.message });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setToastMessage(null), 7000);
    }
  };

  // Update Enquiry Status / Notes
  const handleUpdateEnquiry = async (id, newStatus, newNotes) => {
    setIsUpdating(true);
    setUpdateFeedback(null);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes: newNotes }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update enquiry");
      }

      setUpdateFeedback({ type: "success", message: "Enquiry updated successfully!" });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus, adminNotes: newNotes } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus, adminNotes: newNotes }));
      }
      fetch("/api/admin/stats").then((r) => r.json()).then((d) => d.success && setStats(d.data));
    } catch (err) {
      setUpdateFeedback({ type: "error", message: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = aptStatusFilter === "ALL" || apt.status === aptStatusFilter;
    const query = aptSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      apt.fullName?.toLowerCase().includes(query) ||
      apt.reference?.toLowerCase().includes(query) ||
      apt.phone?.toLowerCase().includes(query) ||
      apt.email?.toLowerCase().includes(query) ||
      apt.doctorName?.toLowerCase().includes(query) ||
      apt.serviceName?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus = enqStatusFilter === "ALL" || enq.status === enqStatusFilter;
    const query = enqSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      enq.fullName?.toLowerCase().includes(query) ||
      enq.subject?.toLowerCase().includes(query) ||
      enq.phone?.toLowerCase().includes(query) ||
      enq.email?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#A3248F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-neutral-600">Verifying administrator session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-neutral-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo-transparent.png"
                alt="Souls Life"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <span className="hidden md:inline-block h-5 w-[1px] bg-neutral-300" />
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#A3248F]/10 text-[#A3248F] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Administrative Portal
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-[#A3248F]" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-[#0D55AE] hover:bg-neutral-100 rounded-xl transition"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="h-5 w-[1px] bg-neutral-200 hidden sm:block" />

            {/* Admin identity & Logout */}
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-neutral-900 leading-none">{admin?.name}</p>
                <p className="text-[10px] text-neutral-500 leading-tight mt-0.5">{admin?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Souls Life Operations Center</h1>
            <p className="text-sm text-neutral-500 mt-1">
              Real-time management of counseling sessions, client requests, and patient appointments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Database Online & Operational
            </span>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Bookings</span>
              <Calendar className="w-4 h-4 text-[#A3248F]" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stats?.appointments?.total ?? appointments.length}</p>
            <p className="text-[11px] text-neutral-400 mt-1">All-time booking requests</p>
          </div>

          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-amber-700 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Pending Action</span>
              <Clock3 className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-900">
              {stats?.appointments?.pending ?? appointments.filter((a) => a.status === "PENDING").length}
            </p>
            <p className="text-[11px] text-amber-700/80 mt-1">Needs confirmation call</p>
          </div>

          <div className="bg-blue-50/60 rounded-2xl border border-blue-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-blue-700 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Confirmed</span>
              <CheckCircle2 className="w-4 h-4 text-[#0D55AE]" />
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {stats?.appointments?.confirmed ?? appointments.filter((a) => a.status === "CONFIRMED").length}
            </p>
            <p className="text-[11px] text-blue-700/80 mt-1">Scheduled appointments</p>
          </div>

          <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-emerald-700 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900">
              {stats?.appointments?.completed ?? appointments.filter((a) => a.status === "COMPLETED").length}
            </p>
            <p className="text-[11px] text-emerald-700/80 mt-1">Care provided</p>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Enquiries</span>
              <MessageSquare className="w-4 h-4 text-[#A3248F]" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-neutral-900">
                {stats?.enquiries?.total ?? enquiries.length}
              </p>
              {(stats?.enquiries?.new ?? 0) > 0 && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  +{stats.enquiries.new} new
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">Website contact messages</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-neutral-200 mb-6">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`pb-3 px-2 text-sm font-semibold transition-all relative cursor-pointer ${
              activeTab === "appointments"
                ? "text-[#A3248F] border-b-2 border-[#A3248F]"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Appointments & Bookings ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`pb-3 px-2 text-sm font-semibold transition-all relative cursor-pointer ${
              activeTab === "enquiries"
                ? "text-[#A3248F] border-b-2 border-[#A3248F]"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Contact Enquiries ({enquiries.length})
          </button>
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={aptSearch}
                  onChange={(e) => setAptSearch(e.target.value)}
                  placeholder="Search reference, client name, phone..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A3248F]"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setAptStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                      aptStatusFilter === st
                        ? "bg-[#A3248F] text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50/75 border-b border-neutral-200 text-neutral-500 text-xs font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Ref Code</th>
                      <th className="py-3.5 px-4">Client</th>
                      <th className="py-3.5 px-4">Service</th>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4">Mode</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-neutral-400 text-sm">
                          No appointment records found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-neutral-50/60 transition">
                          <td className="py-3.5 px-4 font-mono font-semibold text-xs text-[#0D55AE]">
                            {apt.reference || "N/A"}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-neutral-900">{apt.fullName}</p>
                            <p className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-neutral-400" />
                                {apt.phone}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-neutral-400" />
                                {apt.email}
                              </span>
                            </p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-xs font-medium text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md inline-block max-w-[200px] truncate">
                              {apt.serviceName}
                            </span>
                            {apt.doctorName && (
                              <p className="text-[11px] font-bold text-[#A3248F] mt-1 flex items-center gap-1">
                                <User className="w-3 h-3 text-[#A3248F] shrink-0" />
                                <span>{apt.doctorName}</span>
                              </p>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 text-xs text-neutral-800 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                              {apt.preferredDate}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5">
                              <Clock className="w-3.5 h-3.5 text-neutral-400" />
                              {apt.preferredTime}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                apt.consultationType === "ONLINE"
                                  ? "bg-sky-50 text-sky-700 border border-sky-200"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              }`}
                            >
                              {apt.consultationType === "ONLINE" ? "Video (Online)" : "In-Clinic"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <StatusDropdown
                              status={apt.status}
                              disabled={updatingId === apt.id}
                              onChange={(newStatus) => handleQuickStatusChange(apt.id, newStatus)}
                            />
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {/* Direct WhatsApp Action Button */}
                              <a
                                href={getAppointmentWhatsAppUrl(apt)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                                title="Send / Open WhatsApp for Client"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => {
                                  setSelectedAppointment(apt);
                                  setUpdateFeedback(null);
                                }}
                                className="px-3 py-1.5 bg-[#A3248F]/10 hover:bg-[#A3248F]/20 text-[#A3248F] rounded-lg text-xs font-semibold transition cursor-pointer"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => handleDeleteAppointment(apt.id)}
                                className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-4">
            {/* Search & Filter */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={enqSearch}
                  onChange={(e) => setEnqSearch(e.target.value)}
                  placeholder="Search enquiry subject, sender name, message..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A3248F]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                {["ALL", "NEW", "READ", "REPLIED", "CLOSED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEnqStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                      enqStatusFilter === st
                        ? "bg-[#A3248F] text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquiries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEnquiries.length === 0 ? (
                <div className="col-span-full py-16 text-center text-neutral-400 text-sm bg-white rounded-2xl border border-neutral-200">
                  No contact messages match your current filters.
                </div>
              ) : (
                filteredEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <EnquiryStatusBadge status={enq.status} />
                        <span className="text-[11px] text-neutral-400">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-bold text-neutral-900 text-base mb-1">{enq.subject}</h3>
                      <p className="text-xs text-neutral-600 font-medium mb-3">From: {enq.fullName}</p>
                      <p className="text-xs text-neutral-500 line-clamp-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                        &ldquo;{enq.message}&rdquo;
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-xs text-neutral-500">{enq.phone}</span>
                      <button
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setUpdateFeedback(null);
                        }}
                        className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                      >
                        View & Reply
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Status Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div
            className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3 max-w-md ${
              toastMessage.type === "success"
                ? "bg-white text-neutral-900 border-emerald-300 ring-2 ring-emerald-500/20"
                : "bg-rose-50 text-rose-900 border-rose-200"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                toastMessage.type === "success"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-rose-100 text-rose-600"
              }`}
            >
              {toastMessage.type === "success" ? (
                <Check className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
            </div>
            <div className="text-xs">
              <p className="font-bold">{toastMessage.text}</p>
              {toastMessage.whatsappUrl && (
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  WhatsApp notification prepared for client.
                </p>
              )}
            </div>
            {toastMessage.whatsappUrl && (
              <a
                href={toastMessage.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 ml-auto flex items-center gap-1 text-[11px] font-bold shadow-xs cursor-pointer"
                title="Open WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* APPOINTMENT REVIEW MODAL */}
      {selectedAppointment && (
        <AppointmentDetailModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onUpdate={handleUpdateAppointment}
          isUpdating={isUpdating}
          feedback={updateFeedback}
        />
      )}

      {/* ENQUIRY REVIEW MODAL */}
      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onUpdate={handleUpdateEnquiry}
          isUpdating={isUpdating}
          feedback={updateFeedback}
        />
      )}
    </div>
  );
}

// Global WhatsApp URL Generator for Admin to message client
function getAppointmentWhatsAppUrl(apt, customStatus, customNotes) {
  if (!apt) return "";
  const raw = (apt.phone || "").replace(/\D/g, "");
  const phone = raw.length === 10 ? `91${raw}` : raw;
  const status = customStatus || apt.status || "PENDING";
  const ref = apt.reference || "N/A";
  const doctor = apt.doctorName ? `*• Specialist / Doctor:* ${apt.doctorName}\n` : "";
  let message = "";

  if (status === "CONFIRMED") {
    message = `*Souls Life Wellbeing Center*\n\nDear ${apt.fullName},\nYour appointment request has been *CONFIRMED*!\n\n*• Reference Code:* ${ref}\n*• Service:* ${apt.serviceName}\n${doctor}*• Date & Time:* ${apt.preferredDate} (${apt.preferredTime})\n*• Consultation Mode:* ${apt.consultationType === "ONLINE" ? "Online Consultation (Worldwide Video)" : "In-Clinic Session (Wandoor Center)"}\n${customNotes ? `*• Note:* ${customNotes}\n` : ""}*• Clinic Address:* Arimbra Building, Nilambur Road, Wandoor, Malappuram\nHelpline: +91 8848151514 / +91 8156906718\nWe look forward to supporting your journey.`;
  } else if (status === "COMPLETED") {
    message = `*Souls Life Wellbeing Center*\n\nDear ${apt.fullName},\nThank you for completing your counseling session (Ref: ${ref}).\nWe wish you lasting peace, mental clarity, and resilience.\nHelpline: +91 8848151514`;
  } else if (status === "CANCELLED") {
    message = `*Souls Life Wellbeing Center*\n\nDear ${apt.fullName},\nYour appointment request (Ref: ${ref}) has been *CANCELLED*.\n${customNotes ? `Reason: ${customNotes}\n` : ""}If you wish to reschedule or have questions, please reach out at +91 8848151514.`;
  } else {
    message = `*Souls Life Wellbeing Center*\n\nDear ${apt.fullName},\nYour appointment request (Ref: ${ref}) status is *${status}*.\nHelpline: +91 8848151514`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Status Badges
function StatusBadge({ status }) {
  switch (status) {
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Clock3 className="w-3 h-3" /> Pending
        </span>
      );
    case "CONFIRMED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <CheckCircle2 className="w-3 h-3" /> Confirmed
        </span>
      );
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Check className="w-3 h-3" /> Completed
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle className="w-3 h-3" /> Cancelled
        </span>
      );
    default:
      return <span>{status}</span>;
  }
}

// Interactive Status Dropdown for Appointment Table
function StatusDropdown({ status, onChange, disabled }) {
  const styles = {
    PENDING: "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100/80",
    CONFIRMED: "bg-sky-50 text-sky-800 border-sky-300 hover:bg-sky-100/80",
    COMPLETED: "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/80",
    CANCELLED: "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100/80",
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={status}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`text-xs font-bold py-1.5 pl-2.5 pr-7 rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A3248F] transition shadow-xs ${
          styles[status] || "bg-neutral-50 text-neutral-700 border-neutral-200"
        } disabled:opacity-50`}
      >
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none opacity-60" />
    </div>
  );
}

function EnquiryStatusBadge({ status }) {
  switch (status) {
    case "NEW":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-100 text-rose-700">
          New
        </span>
      );
    case "READ":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neutral-100 text-neutral-700">
          Read
        </span>
      );
    case "REPLIED":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
          Replied
        </span>
      );
    case "CLOSED":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
          Closed
        </span>
      );
    default:
      return <span>{status}</span>;
  }
}

// Appointment Modal
function AppointmentDetailModal({ appointment, onClose, onUpdate, isUpdating, feedback }) {
  const [status, setStatus] = useState(appointment.status || "PENDING");
  const [adminNotes, setAdminNotes] = useState(appointment.adminNotes || "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#0D55AE]/10 text-[#0D55AE]">
            {appointment.reference || "APPOINTMENT DETAILS"}
          </span>
          <h2 className="text-xl font-bold text-neutral-900 mt-2">{appointment.fullName}</h2>
          <p className="text-xs text-neutral-500">
            Booked on {new Date(appointment.createdAt).toLocaleString()}
          </p>
        </div>

        {feedback && (
          <div
            className={`mb-4 p-3.5 rounded-xl text-xs font-medium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            <span className="font-semibold">{feedback.message}</span>
            {feedback.whatsappUrl && (
              <a
                href={feedback.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-sm transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Now</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Client Details */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Phone</p>
              <a href={`tel:${appointment.phone}`} className="font-semibold text-[#0D55AE] hover:underline">
                {appointment.phone}
              </a>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Email</p>
              <a href={`mailto:${appointment.email}`} className="font-semibold text-[#0D55AE] hover:underline">
                {appointment.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Service</p>
              <p className="font-semibold text-neutral-900">{appointment.serviceName}</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Consulting Specialist</p>
              <p className="font-bold text-[#A3248F]">{appointment.doctorName || "Any Available Specialist"}</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Consultation Mode</p>
              <p className="font-semibold text-neutral-900">
                {appointment.consultationType === "ONLINE" ? "Online Video" : "In-Clinic (Wandoor)"}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Requested Date</p>
              <p className="font-semibold text-neutral-900">{appointment.preferredDate}</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Time Slot</p>
              <p className="font-semibold text-neutral-900">{appointment.preferredTime}</p>
            </div>
          </div>

          {/* Client Message */}
          {appointment.message && (
            <div>
              <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Client&apos;s Reason / Note
              </p>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-neutral-700 text-xs">
                &ldquo;{appointment.message}&rdquo;
              </div>
            </div>
          )}

          {/* Status Selector */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Appointment Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#A3248F]"
            >
              <option value="PENDING">PENDING (Action Required)</option>
              <option value="CONFIRMED">CONFIRMED (Slot Confirmed with Counselor)</option>
              <option value="COMPLETED">COMPLETED (Session Finished)</option>
              <option value="CANCELLED">CANCELLED (Client / Clinic Cancelled)</option>
            </select>
            <p className="text-[11px] text-neutral-500 mt-1">
              Status updates can be sent directly to client&apos;s phone ({appointment.phone}) using the 1-click WhatsApp button below.
            </p>
          </div>

          {/* Direct Phone / WhatsApp Dispatch Card */}
          <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant Message to Client&apos;s Phone</span>
              </p>
              <p className="text-[11px] text-emerald-700/90 mt-0.5">
                Pre-formatted <strong>{status}</strong> notification with Ref ID ({appointment.reference})
              </p>
            </div>
            <a
              href={getAppointmentWhatsAppUrl(appointment, status, adminNotes)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send to Phone (WhatsApp)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Administrative Internal Notes */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Internal Administrative Notes (Restricted)
            </label>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="e.g. Called client at 4:30 PM, confirmed slot with Dr. Naseeda for 11:00 AM..."
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A3248F]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition"
          >
            Close
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onUpdate(appointment.id, status, adminNotes)}
            className="px-5 py-2.5 rounded-xl bg-[#A3248F] hover:bg-[#8B1E7A] text-white font-semibold text-xs sm:text-sm shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Enquiry Modal
function EnquiryDetailModal({ enquiry, onClose, onUpdate, isUpdating, feedback }) {
  const [status, setStatus] = useState(enquiry.status || "NEW");
  const [adminNotes, setAdminNotes] = useState(enquiry.adminNotes || "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#A3248F]/10 text-[#A3248F]">
            CONTACT ENQUIRY
          </span>
          <h2 className="text-xl font-bold text-neutral-900 mt-2">{enquiry.subject}</h2>
          <p className="text-xs text-neutral-500">
            From {enquiry.fullName} on {new Date(enquiry.createdAt).toLocaleString()}
          </p>
        </div>

        {feedback && (
          <div
            className={`mb-4 p-3.5 rounded-xl text-xs font-medium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            <span className="font-semibold">{feedback.message}</span>
            {feedback.whatsappUrl && (
              <a
                href={feedback.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-sm transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Now</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Phone</p>
              <a href={`tel:${enquiry.phone}`} className="font-semibold text-[#0D55AE] hover:underline">
                {enquiry.phone}
              </a>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase font-semibold">Email</p>
              <a href={`mailto:${enquiry.email}`} className="font-semibold text-[#0D55AE] hover:underline">
                {enquiry.email}
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
              Message Content
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-neutral-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Enquiry Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#A3248F]"
            >
              <option value="NEW">NEW (Unreviewed)</option>
              <option value="READ">READ (Viewed by Staff)</option>
              <option value="REPLIED">REPLIED (Email / WhatsApp sent to client)</option>
              <option value="CLOSED">CLOSED (Resolved)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Internal Admin Notes
            </label>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Record follow-up actions..."
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A3248F]"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition"
          >
            Close
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onUpdate(enquiry.id, status, adminNotes)}
            className="px-5 py-2.5 rounded-xl bg-[#A3248F] hover:bg-[#8B1E7A] text-white font-semibold text-xs sm:text-sm shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

