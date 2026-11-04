import { db } from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { comparePassword, createAdminSession } from "@/lib/auth";

const limiter = rateLimit({ interval: 15 * 60 * 1000, maxRequests: 8 }); // 8 attempts per 15 mins to prevent brute-force

export async function POST(req) {
  try {
    const clientIp = getClientIp(req);
    const rateCheck = limiter.check(clientIp);
    if (!rateCheck.success) {
      return Response.json(
        { success: false, error: "Too many login attempts. Please try again after 15 minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = adminLoginSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error?.issues?.[0]?.message || validation.error?.errors?.[0]?.message || "Invalid credentials";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Look up admin by email
    const admin = await db.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin || !admin.isActive) {
      return Response.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password hash
    const isValid = await comparePassword(password, admin.passwordHash);
    if (!isValid) {
      return Response.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session cookie
    await createAdminSession(admin);

    return Response.json({
      success: true,
      message: "Authentication successful",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("POST /api/admin/login error:", error);
    return Response.json(
      { success: false, error: "An unexpected error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}

