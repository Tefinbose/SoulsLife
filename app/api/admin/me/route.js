import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  return Response.json({
    success: true,
    admin: auth.admin,
  });
}

