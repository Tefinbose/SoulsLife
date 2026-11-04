import { db } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { serviceSchema } from "@/lib/validation";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const services = await db.service.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return Response.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("GET /api/admin/services error:", error);
    return Response.json(
      { success: false, error: "Failed to load services" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const body = await req.json();
    const validation = serviceSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error?.issues?.[0]?.message || validation.error?.errors?.[0]?.message || "Invalid service data";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const newService = await db.service.create({
      data: validation.data,
    });

    return Response.json({
      success: true,
      data: newService,
    });
  } catch (error) {
    console.error("POST /api/admin/services error:", error);
    return Response.json(
      { success: false, error: error.message || "Failed to create service" },
      { status: 500 }
    );
  }
}

