import { db } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { enquiryUpdateSchema } from "@/lib/validation";

export async function GET(req, { params }) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const { id } = await params;
    const enquiry = await db.contactEnquiry.findUnique({
      where: { id },
    });

    if (!enquiry) {
      return Response.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error("GET /api/admin/enquiries/[id] error:", error);
    return Response.json(
      { success: false, error: "Failed to load enquiry details" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const validation = enquiryUpdateSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        { success: false, error: validation.error.errors[0]?.message || "Invalid update data" },
        { status: 400 }
      );
    }

    const { status, adminNotes } = validation.data;
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const updated = await db.contactEnquiry.update({
      where: { id },
      data: updateData,
    });

    return Response.json({
      success: true,
      message: "Enquiry updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/admin/enquiries/[id] error:", error);
    return Response.json(
      { success: false, error: error.message || "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const { id } = await params;
    await db.contactEnquiry.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/admin/enquiries/[id] error:", error);
    return Response.json(
      { success: false, error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}

