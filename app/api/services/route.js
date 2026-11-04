import { db } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit"), 10) : undefined;

    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
      take: limit,
    });

    return Response.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return Response.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

