import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminRootPage() {
  const admin = await getAuthenticatedAdmin();

  if (admin) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}

