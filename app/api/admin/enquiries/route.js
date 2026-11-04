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

    const where = {};
    if (status && ["NEW", "READ", "REPLIED", "CLOSED"].includes(status)) {
      where.status = status;
    }

    let enquiries = await db.contactEnquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (search) {
      enquiries = enquiries.filter(
        (e) =>
          e.fullName?.toLowerCase().includes(search) ||
          e.email?.toLowerCase().includes(search) ||
          e.phone?.toLowerCase().includes(search) ||
          e.subject?.toLowerCase().includes(search) ||
          e.message?.toLowerCase().includes(search)
      );
    }

    return Response.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("GET /api/admin/enquiries error:", error);
    return Response.json(
      { success: false, error: "Failed to retrieve contact enquiries" },
      { status: 500 }
    );
  }
}

