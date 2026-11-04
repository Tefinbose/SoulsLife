import { db } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const date = searchParams.get("date");

    const where = {};
    if (status && ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].includes(status)) {
      where.status = status;
    }
    if (date) {
      where.preferredDate = date;
    }

    let appointments = await db.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (search) {
      appointments = appointments.filter(
        (a) =>
          a.fullName?.toLowerCase().includes(search) ||
          a.email?.toLowerCase().includes(search) ||
          a.phone?.toLowerCase().includes(search) ||
          a.reference?.toLowerCase().includes(search) ||
          a.serviceName?.toLowerCase().includes(search)
      );
    }

    return Response.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("GET /api/admin/appointments error:", error);
    return Response.json(
      { success: false, error: "Failed to retrieve appointments" },
      { status: 500 }
    );
  }
}

