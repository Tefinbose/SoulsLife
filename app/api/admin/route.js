import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  return Response.json({
    status: "healthy",
    authenticated: true,
    admin: {
      id: auth.admin.id,
      name: auth.admin.name,
      email: auth.admin.email,
      role: auth.admin.role,
    },
    endpoints: {
      stats: "/api/admin/stats",
      appointments: "/api/admin/appointments",
      enquiries: "/api/admin/enquiries",
      services: "/api/admin/services",
      me: "/api/admin/me",
      logout: "/api/admin/logout",
    },
    timestamp: new Date().toISOString(),
  });
}

