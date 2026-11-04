import { db } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { appointmentUpdateSchema } from "@/lib/validation";
import { sendAppointmentStatusUpdate } from "@/lib/email";
import { buildAdminToClientWhatsAppUrl, sendStatusPhoneMessage } from "@/lib/sms";

export async function GET(req, { params }) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const { id } = await params;
    const appointment = await db.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      return Response.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("GET /api/admin/appointments/[id] error:", error);
    return Response.json(
      { success: false, error: "Failed to load appointment details" },
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

    const validation = appointmentUpdateSchema.safeParse(body);
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

    const updated = await db.appointment.update({
      where: { id },
      data: updateData,
    });

    // If status changed, notify client via Email and Automated WhatsApp
    if (status !== undefined) {
      Promise.allSettled([
        sendAppointmentStatusUpdate(updated),
        sendStatusPhoneMessage(updated, status, adminNotes || ""),
      ]).catch((err) => console.warn("[Admin Appointments] Background client notification warning:", err));
    }

    const whatsappUrl = buildAdminToClientWhatsAppUrl(updated, status || updated.status, adminNotes || updated.adminNotes || "");

    return Response.json({
      success: true,
      message: `Appointment updated to ${status || updated.status}`,
      whatsappUrl,
      data: {
        ...updated,
        whatsappUrl,
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/appointments/[id] error:", error);
    return Response.json(
      { success: false, error: error.message || "Failed to update appointment" },
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
    await db.appointment.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/admin/appointments/[id] error:", error);
    return Response.json(
      { success: false, error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}

