import { db } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const [
      allAppointments,
      allEnquiries,
      services,
      teamMembers,
    ] = await Promise.all([
      db.appointment.findMany(),
      db.contactEnquiry.findMany(),
      db.service.findMany({ where: { isActive: true } }),
      db.teamMember.findMany({ where: { isActive: true } }),
    ]);

    const appointmentCounts = {
      total: allAppointments.length,
      pending: allAppointments.filter((a) => a.status === "PENDING").length,
      confirmed: allAppointments.filter((a) => a.status === "CONFIRMED").length,
      completed: allAppointments.filter((a) => a.status === "COMPLETED").length,
      cancelled: allAppointments.filter((a) => a.status === "CANCELLED").length,
    };

    const enquiryCounts = {
      total: allEnquiries.length,
      new: allEnquiries.filter((e) => e.status === "NEW").length,
      read: allEnquiries.filter((e) => e.status === "READ").length,
      replied: allEnquiries.filter((e) => e.status === "REPLIED").length,
      closed: allEnquiries.filter((e) => e.status === "CLOSED").length,
    };

    return Response.json({
      success: true,
      data: {
        appointments: appointmentCounts,
        enquiries: enquiryCounts,
        servicesCount: services.length,
        teamCount: teamMembers.length,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return Response.json(
      { success: false, error: "Failed to load dashboard metrics" },
      { status: 500 }
    );
  }
}

