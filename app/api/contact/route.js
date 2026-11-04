import { db } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sendAdminContactNotification } from "@/lib/email";

const limiter = rateLimit({ interval: 15 * 60 * 1000, maxRequests: 10 });

export async function POST(req) {
  try {
    const clientIp = getClientIp(req);
    const rateCheck = limiter.check(clientIp);
    if (!rateCheck.success) {
      return Response.json(
        { success: false, error: "Too many enquiries submitted from this network. Please try again after 15 minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError =
        validationResult.error?.issues?.[0]?.message ||
        validationResult.error?.errors?.[0]?.message ||
        "Invalid contact input";
      return Response.json(
        { success: false, error: firstError, errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const newEnquiry = await db.contactEnquiry.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: "NEW",
        privacyConsent: true,
      },
    });

    // Notify admin
    sendAdminContactNotification(newEnquiry).catch((err) =>
      console.warn("[Contact] Email dispatch notice:", err)
    );

    return Response.json(
      {
        success: true,
        message: "Thank you for contacting Souls Life Wellbeing Center. Your message has been received, and our team will get back to you promptly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/contact] Error:", error);
    return Response.json(
      { success: false, error: "Unable to submit your message at this moment. Please call our clinic directly at +91 8848151514." },
      { status: 500 }
    );
  }
}

