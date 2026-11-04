import { db } from "@/lib/prisma";

export async function GET(req) {
  try {
    const teamMembers = await db.teamMember.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    return Response.json({
      success: true,
      count: teamMembers.length,
      data: teamMembers,
    });
  } catch (error) {
    console.error("GET /api/team error:", error);
    return Response.json(
      { success: false, error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

