import { destroyAdminSession } from "@/lib/auth";

export async function POST() {
  try {
    await destroyAdminSession();
    return Response.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("POST /api/admin/logout error:", error);
    return Response.json(
      { success: false, error: "Failed to log out cleanly" },
      { status: 500 }
    );
  }
}

