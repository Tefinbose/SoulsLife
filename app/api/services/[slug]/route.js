import { db } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return Response.json(
        { success: false, error: "Service slug is required" },
        { status: 400 }
      );
    }

    const service = await db.service.findUnique({
      where: { slug },
    });

    if (!service || !service.isActive) {
      return Response.json(
        { success: false, error: "Service not found or inactive" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("GET /api/services/[slug] error:", error);
    return Response.json(
      { success: false, error: "Failed to fetch service details" },
      { status: 500 }
    );
  }
}

