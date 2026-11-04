import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "./prisma";

const COOKIE_NAME = "souls_admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "souls-life-secure-jwt-secret-key-change-in-env-2026";
const SESSION_EXPIRY = "7d";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

// Hash password with bcrypt
export async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
}

// Compare plain password with hash
export async function comparePassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

// Create secure session token and set HTTP-only cookie
export async function createAdminSession(admin) {
  const token = jwt.sign(
    {
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
    SESSION_SECRET,
    { expiresIn: SESSION_EXPIRY }
  );

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return token;
}

// Clear session cookie
export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Get and verify currently authenticated admin
export async function getAuthenticatedAdmin() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const decoded = jwt.verify(sessionCookie.value, SESSION_SECRET);
    if (!decoded || !decoded.adminId) {
      return null;
    }

    const admin = await db.admin.findUnique({
      where: { id: decoded.adminId },
    });

    if (!admin || !admin.isActive) {
      return null;
    }

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
  } catch (error) {
    return null;
  }
}

// Require admin authentication helper
export async function requireAdmin() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return {
      authorized: false,
      response: Response.json(
        { success: false, error: "Unauthorized access. Please log in as an administrator." },
        { status: 401 }
      ),
    };
  }
  return { authorized: true, admin };
}

