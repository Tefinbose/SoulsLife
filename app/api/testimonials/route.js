import { db } from "@/lib/prisma";

export async function GET(req) {
  try {
    const testimonials = await db.testimonial.findMany({
      where: {
        isApproved: true,
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return Response.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

