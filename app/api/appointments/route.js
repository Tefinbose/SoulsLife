import { db } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sendAppointmentAcknowledgment, sendAdminAppointmentNotification } from "@/lib/email";
import { buildClientSelfWhatsAppUrl, buildClientToClinicWhatsAppUrl, sendBookingPhoneMessage } from "@/lib/sms";

const limiter = rateLimit({ interval: 15 * 60 * 1000, maxRequests: 10 }); // 10 requests per 15 mins

export async function POST(req) {
  try {
    const clientIp = getClientIp(req);
    const rateCheck = limiter.check(clientIp);
    if (!rateCheck.success) {
      return Response.json(
        { success: false, error: "Too many booking requests from this connection. Please try again after 15 minutes or call us directly." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 1. Zod Server-side Validation
    const validationResult = appointmentSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError =
        validationResult.error?.issues?.[0]?.message ||
        validationResult.error?.errors?.[0]?.message ||
        "Invalid input data";
      return Response.json(
        { success: false, error: firstError, errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Prevent duplicate pending requests for the same date, time and phone
    const existingAppointments = await db.appointment.findMany({
      where: {
        phone: data.phone,
        preferredDate: data.preferredDate,
      },
    });

    const isDuplicate = existingAppointments.some(
      (apt) => apt.preferredTime === data.preferredTime && apt.status === "PENDING"
    );

    if (isDuplicate) {
      return Response.json(
        { success: false, error: "You already have a pending booking request for this date and time. Our team will contact you shortly." },
        { status: 409 }
      );
    }

    // 3. Generate Unique Human-Readable Reference Code
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `SL-${year}-${randomSuffix}`;

    // 4. Save to Database
    const newAppointment = await db.appointment.create({
      data: {
        reference,
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        doctorName: data.doctorName || null,
        serviceId: data.serviceId || null,
        serviceName: data.serviceName,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        consultationType: data.consultationType,
        message: data.message || null,
        status: "PENDING",
        privacyConsent: true,
      },
    });

    // 5. Trigger Asynchronous Notifications (Email & WhatsApp automated message)
    Promise.allSettled([
      sendAppointmentAcknowledgment(newAppointment),
      sendAdminAppointmentNotification(newAppointment),
      sendBookingPhoneMessage(newAppointment),
    ]).catch((err) => console.warn("[Appointments] Background notification warning:", err));

    const clientWhatsAppUrl = buildClientSelfWhatsAppUrl(newAppointment);
    const clinicWhatsAppUrl = buildClientToClinicWhatsAppUrl(newAppointment);

    return Response.json(
      {
        success: true,
        reference: newAppointment.reference,
        clientWhatsAppUrl,
        clinicWhatsAppUrl,
        whatsappUrl: clientWhatsAppUrl,
        message: "Your appointment request has been successfully submitted! Our triage desk will review counselor schedules and reach out to confirm your session.",
        appointment: {
          reference: newAppointment.reference,
          fullName: newAppointment.fullName,
          phone: newAppointment.phone,
          doctorName: newAppointment.doctorName || null,
          serviceName: newAppointment.serviceName,
          preferredDate: newAppointment.preferredDate,
          preferredTime: newAppointment.preferredTime,
          consultationType: newAppointment.consultationType,
          status: newAppointment.status,
          clientWhatsAppUrl,
          clinicWhatsAppUrl,
          whatsappUrl: clientWhatsAppUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/appointments] Error:", error);
    return Response.json(
      { success: false, error: "An unexpected error occurred while processing your appointment. Please call our helpline directly at +91 8848151514." },
      { status: 500 }
    );
  }
}

