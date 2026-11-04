// ========================================================
// SOULS LIFE WELLBEING CENTER - WHATSAPP MESSAGING SERVICE
// ========================================================

import { siteConfig } from "@/data/homeData";

/**
 * Clean phone number into standard 10-digit or E.164 format
 */
export function cleanPhoneNumber(rawPhone, defaultCountryCode = "91") {
  if (!rawPhone) return "";
  let digits = rawPhone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.substring(1);
  if (digits.length === 10) {
    return `${defaultCountryCode}${digits}`;
  }
  return digits;
}

/**
 * 1. Build WhatsApp message URL directly for Client
 * (No website links, clean bullets, no emoji corruption)
 */
export function buildClientSelfWhatsAppUrl(appointment) {
  const cleanedPhone = cleanPhoneNumber(appointment.phone);
  const ref = appointment.reference || "N/A";
  const service = appointment.serviceName || "Counseling Consultation";
  const doctor = appointment.doctorName ? `\n*• Specialist / Doctor:* ${appointment.doctorName}` : "";
  const date = appointment.preferredDate || "Upcoming Date";
  const time = appointment.preferredTime || "";
  const mode = appointment.consultationType === "ONLINE" ? "Online Consultation (Worldwide Video)" : "In-Clinic (Wandoor Center)";

  const message = `*Souls Life Wellbeing Center — Appointment Booking*\n\nDear ${appointment.fullName},\nYour appointment request has been received!\n\n*• Booking Reference ID:* ${ref}\n*• Service:* ${service}${doctor}\n*• Preferred Date:* ${date} (${time})\n*• Consultation Mode:* ${mode}\n\nOur clinical coordinator will contact you shortly to confirm your session.\nHelpline: +91 8848151514 / +91 8156906718`;

  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * 2. Build WhatsApp message URL for Client to reach the Souls Life Care Desk
 */
export function buildClientToClinicWhatsAppUrl(appointment) {
  const clinicPhone = siteConfig.phone || "8848151514";
  const ref = appointment.reference || "N/A";
  const service = appointment.serviceName || "Counseling Consultation";
  const doctor = appointment.doctorName ? `\n*• Specialist / Doctor:* ${appointment.doctorName}` : "";
  const date = appointment.preferredDate || "Upcoming Date";
  const time = appointment.preferredTime || "";
  const mode = appointment.consultationType === "ONLINE" ? "Online Video" : "In-Clinic (Wandoor)";

  const message = `Hello Souls Life Wellbeing Center, I just submitted an appointment request.\n\n*• Booking Reference:* ${ref}\n*• Name:* ${appointment.fullName}\n*• Service:* ${service}${doctor}\n*• Preferred Date:* ${date} (${time})\n*• Mode:* ${mode}\n\nPlease confirm my slot at your earliest convenience. Thank you!`;

  return `https://wa.me/91${clinicPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * 3. Build WhatsApp message URL for Admin to send status update to Client
 * (No website links, clean bullets, no emoji corruption)
 */
export function buildAdminToClientWhatsAppUrl(appointment, status, adminNotes = "") {
  const cleanedPhone = cleanPhoneNumber(appointment.phone);
  const ref = appointment.reference || "N/A";
  let message = "";

  switch (status) {
    case "CONFIRMED":
      message = `*Souls Life Wellbeing Center*\n\nDear ${appointment.fullName},\nYour appointment request has been *CONFIRMED*!\n\n*• Reference Code:* ${ref}\n*• Service:* ${appointment.serviceName}\n${appointment.doctorName ? `*• Specialist / Doctor:* ${appointment.doctorName}\n` : ""}*• Date & Time:* ${appointment.preferredDate} (${appointment.preferredTime})\n*• Consultation Mode:* ${appointment.consultationType === "ONLINE" ? "Online Consultation (Worldwide Video)" : "In-Clinic Session (Wandoor Center)"}\n${adminNotes ? `*• Note:* ${adminNotes}\n` : ""}*• Clinic Address:* Arimbra Building, Nilambur Road, Wandoor, Malappuram\nHelpline: +91 8848151514 / +91 8156906718\nWe look forward to supporting your journey.`;
      break;

    case "COMPLETED":
      message = `*Souls Life Wellbeing Center*\n\nDear ${appointment.fullName},\nThank you for completing your counseling session (Ref: ${ref}).\nWe wish you lasting peace, mental clarity, and resilience.\nOur care desk is always here whenever you need support.\nHelpline: +91 8848151514.`;
      break;

    case "CANCELLED":
      message = `*Souls Life Wellbeing Center*\n\nDear ${appointment.fullName},\nYour appointment request (Ref: ${ref}) has been *CANCELLED*.\n${adminNotes ? `Reason: ${adminNotes}\n` : ""}If you wish to reschedule or have questions, please call us at +91 8848151514.`;
      break;

    default:
      message = `*Souls Life Wellbeing Center*\n\nDear ${appointment.fullName},\nYour appointment request (Ref: ${ref}) status has been updated to *${status}*.\nHelpline: +91 8848151514.`;
      break;
  }

  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * 4. Automated Backend WhatsApp Sender (Supports UltraMsg or Twilio WhatsApp if configured)
 */
export async function sendAutomatedWhatsAppMessage(phone, message) {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) return { sent: false, error: "Invalid phone number" };

  // A. UltraMsg Gateway (Popular plug-and-play WhatsApp Gateway)
  const ultramsgInstance = process.env.ULTRAMSG_INSTANCE_ID;
  const ultramsgToken = process.env.ULTRAMSG_TOKEN;
  if (ultramsgInstance && ultramsgToken) {
    try {
      const res = await fetch(`https://api.ultramsg.com/${ultramsgInstance}/messages/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          token: ultramsgToken,
          to: cleaned,
          body: message,
        }),
      });
      const data = await res.json();
      console.info(`[WhatsApp Service - UltraMsg] Dispatched to +${cleaned}:`, data);
      return { sent: data.sent === "true" || !!data.id, provider: "UltraMsg", data };
    } catch (err) {
      console.error("[WhatsApp Service - UltraMsg] Error:", err.message);
    }
  }

  // B. Twilio WhatsApp API
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_WHATSAPP_NUMBER || process.env.TWILIO_PHONE_NUMBER;
  if (twilioSid && twilioAuth && twilioFrom) {
    try {
      const fromFormatted = twilioFrom.startsWith("whatsapp:") ? twilioFrom : `whatsapp:${twilioFrom}`;
      const toFormatted = `whatsapp:+${cleaned}`;
      const authHeader = Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64");
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: toFormatted,
          From: fromFormatted,
          Body: message,
        }),
      });
      const data = await res.json();
      console.info(`[WhatsApp Service - Twilio] Dispatched to ${toFormatted}:`, data.sid);
      return { sent: !data.error_code, provider: "Twilio WhatsApp", sid: data.sid };
    } catch (err) {
      console.error("[WhatsApp Service - Twilio] Error:", err.message);
    }
  }

  // C. Fallback Simulated Console Logger
  console.info("========================================================");
  console.info(`💬 [WHATSAPP MESSAGE PREPARED FOR CLIENT]`);
  console.info(`To: +${cleaned}`);
  console.info(`Message: \n${message}`);
  console.info("========================================================");

  return {
    sent: true,
    simulated: true,
    phone: `+${cleaned}`,
    message,
  };
}

/**
 * Backward compatibility stubs
 */
export async function sendBookingPhoneMessage(appointment) {
  const message = `Souls Life: Dear ${appointment.fullName}, your booking reference is ${appointment.reference} for ${appointment.serviceName} on ${appointment.preferredDate}. Helpline: +91 8848151514`;
  return sendAutomatedWhatsAppMessage(appointment.phone, message);
}

export async function sendStatusPhoneMessage(appointment, newStatus, adminNotes = "") {
  const message = `Souls Life: Dear ${appointment.fullName}, your appointment (${appointment.reference}) is ${newStatus}. Helpline: +91 8848151514`;
  return sendAutomatedWhatsAppMessage(appointment.phone, message);
}
