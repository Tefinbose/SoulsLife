import nodemailer from "nodemailer";

// Create reusable transporter if SMTP settings are present
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

const FROM_EMAIL = process.env.EMAIL_FROM || '"Souls Life Wellbeing Center" <notifications@soulslife.in>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@soulslife.in";

// 1. Send Appointment Booking Acknowledgment to Client
export async function sendAppointmentAcknowledgment(appointment) {
  const transporter = getTransporter();
  if (!transporter) {
    console.info(`[Email] SMTP not configured. Acknowledgment email for ${appointment.reference} skipped.`);
    return { sent: false, reason: "SMTP not configured" };
  }

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #162238; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2ECE9; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #A3248F; margin: 0;">Souls Life Wellbeing Center</h2>
          <p style="color: #4A5B73; font-size: 13px; margin: 4px 0 0;">Healing Minds • Empowering Lives • Building Resilient Communities</p>
        </div>

        <div style="background-color: #FDF2F9; border-left: 4px solid #A3248F; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 8px; color: #162238;">Appointment Request Received</h3>
          <p style="margin: 0; font-size: 14px; color: #4A5B73;">
            Dear <strong>${appointment.fullName}</strong>, thank you for reaching out to Souls Life. Your booking request has been securely recorded.
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #4A5B73;"><strong>Booking Reference:</strong></td>
            <td style="padding: 8px 0; font-weight: bold; color: #0D55AE;">${appointment.reference}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #4A5B73;"><strong>Service:</strong></td>
            <td style="padding: 8px 0;">${appointment.serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #4A5B73;"><strong>Preferred Date:</strong></td>
            <td style="padding: 8px 0;">${appointment.preferredDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #4A5B73;"><strong>Preferred Time:</strong></td>
            <td style="padding: 8px 0;">${appointment.preferredTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #4A5B73;"><strong>Consultation Mode:</strong></td>
            <td style="padding: 8px 0;">${appointment.consultationType === "ONLINE" ? "Tele-Video (Worldwide)" : "In-Person Clinic (Wandoor)"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #4A5B73;"><strong>Status:</strong></td>
            <td style="padding: 8px 0;"><span style="background-color: #FEF3C7; color: #92400E; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold;">PENDING CONFIRMATION</span></td>
          </tr>
        </table>

        <div style="background-color: #F8FAFC; padding: 14px; border-radius: 8px; font-size: 12.5px; color: #64748B; margin-bottom: 24px;">
          <strong>Important Note:</strong> This is an initial appointment request. Our clinical triage desk will review counselor availability and contact you via phone/WhatsApp to confirm your final session slot.
        </div>

        <div style="border-top: 1px solid #E2ECE9; padding-top: 16px; font-size: 12px; color: #64748B;">
          <p style="margin: 0 0 4px;"><strong>Souls Life Clinic:</strong> Arimbra Building, Nilambur Road, Wandoor, Malappuram, Kerala – 679328</p>
          <p style="margin: 0 0 4px;"><strong>Helpline:</strong> +91 8156906718 / +91 8848151514</p>
          <p style="margin: 0;">Kerala State 24/7 Support: DISHA 1056 | Tele-MANAS 14416</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: appointment.email,
      subject: `Appointment Request Received [${appointment.reference}] - Souls Life`,
      html: htmlContent,
    });

    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error("[Email] Failed to send client acknowledgment:", err.message);
    return { sent: false, error: err.message };
  }
}

// 2. Notify Admin of New Booking Request
export async function sendAdminAppointmentNotification(appointment) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP not configured" };

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #162238; max-width: 600px;">
        <h3 style="color: #A3248F;">New Appointment Request: ${appointment.reference}</h3>
        <p>A new client has requested a counseling consultation on the website.</p>
        <ul>
          <li><strong>Client Name:</strong> ${appointment.fullName}</li>
          <li><strong>Phone:</strong> ${appointment.phone}</li>
          <li><strong>Email:</strong> ${appointment.email}</li>
          <li><strong>Service:</strong> ${appointment.serviceName}</li>
          <li><strong>Requested Date/Time:</strong> ${appointment.preferredDate} at ${appointment.preferredTime}</li>
          <li><strong>Type:</strong> ${appointment.consultationType}</li>
          <li><strong>Message:</strong> ${appointment.message || "None provided"}</li>
        </ul>
        <p>Please log in to the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/dashboard">Admin Dashboard</a> to review and confirm.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🚨 New Appointment: ${appointment.fullName} (${appointment.serviceName})`,
      html: htmlContent,
    });

    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error("[Email] Failed to notify admin:", err.message);
    return { sent: false, error: err.message };
  }
}

// 3. Notify Admin of New Contact Enquiry
export async function sendAdminContactNotification(enquiry) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP not configured" };

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #162238; max-width: 600px;">
        <h3 style="color: #0D55AE;">New Contact Enquiry Received</h3>
        <ul>
          <li><strong>From:</strong> ${enquiry.fullName}</li>
          <li><strong>Email:</strong> ${enquiry.email}</li>
          <li><strong>Phone:</strong> ${enquiry.phone}</li>
          <li><strong>Subject:</strong> ${enquiry.subject}</li>
          <li><strong>Message:</strong> ${enquiry.message}</li>
        </ul>
        <p>Manage enquiries in the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/dashboard">Admin Dashboard</a>.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `📩 Contact Enquiry: ${enquiry.subject} (${enquiry.fullName})`,
      html: htmlContent,
    });

    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error("[Email] Failed to send contact notification to admin:", err.message);
    return { sent: false, error: err.message };
  }
}

// 4. Send Appointment Status Update to Client
export async function sendAppointmentStatusUpdate(appointment) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP not configured" };

  const isConfirmed = appointment.status === "CONFIRMED";
  const statusColor = isConfirmed ? "#059669" : "#DC2626";

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #162238; max-width: 600px; padding: 24px; border: 1px solid #E2ECE9; border-radius: 16px;">
        <h2 style="color: #A3248F; margin: 0 0 12px;">Souls Life Wellbeing Center</h2>
        <div style="padding: 14px; border-radius: 8px; background-color: #F8FAFC; border-left: 4px solid ${statusColor}; margin-bottom: 20px;">
          <h3 style="margin: 0 0 4px; color: ${statusColor};">Appointment ${appointment.status}</h3>
          <p style="margin: 0; font-size: 13.5px; color: #4A5B73;">
            Dear <strong>${appointment.fullName}</strong>, your appointment (Ref: <strong>${appointment.reference}</strong>) has been updated to <strong>${appointment.status}</strong>.
          </p>
        </div>
        <p style="font-size: 13.5px;">Session: <strong>${appointment.serviceName}</strong> on <strong>${appointment.preferredDate}</strong> at <strong>${appointment.preferredTime}</strong>.</p>
        <p style="font-size: 13px; color: #64748B;">For inquiries or schedule changes, please contact us at +91 8848151514 / +91 8156906718.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: appointment.email,
      subject: `Appointment Status Update [${appointment.reference}]: ${appointment.status} - Souls Life`,
      html: htmlContent,
    });

    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error("[Email] Failed to send status update:", err.message);
    return { sent: false, error: err.message };
  }
}

