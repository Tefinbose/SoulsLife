import { db } from "@/lib/prisma";

export async function GET(req) {
  try {
    const programs = await db.communityProgram.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    return Response.json({
      success: true,
      count: programs.length,
      data: programs,
    });
  } catch (error) {
    console.error("GET /api/community error:", error);
    return Response.json(
      { success: false, error: "Failed to fetch community programs" },
      { status: 500 }
    );
  }
}

