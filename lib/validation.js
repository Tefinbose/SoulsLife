import { z } from "zod";

// Helper to check if a date string (YYYY-MM-DD) is in the past
const isNotPastDate = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return target >= today;
};

// Helper to sanitize and check 10-digit Indian mobile number (starts with 6, 7, 8, or 9)
export const sanitizeIndianPhone = (raw) => {
  if (!raw) return "";
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.substring(2);
  }
  if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.substring(1);
  }
  return digits;
};

export const isValidIndianMobile = (raw) => {
  const cleaned = sanitizeIndianPhone(raw);
  return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
};

export const isValidEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(email).trim());
};

// 1. Appointment Booking Validation Schema
export const appointmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s.']{2,100}$/, "Full name must contain only letters and spaces"),
  email: z
    .string()
    .trim()
    .max(120, "Email cannot exceed 120 characters")
    .refine(isValidEmail, {
      message: "Please enter a valid email address (e.g. name@example.com)",
    }),
  phone: z
    .string()
    .trim()
    .refine(isValidIndianMobile, {
      message: "Mobile number must be a valid 10-digit number starting with 6, 7, 8, or 9 (e.g. 9876543210)",
    })
    .transform((val) => sanitizeIndianPhone(val)),
  serviceId: z.string().optional().nullable(),
  serviceName: z
    .string()
    .trim()
    .min(2, "Please select a valid counseling service"),
  doctorName: z
    .string()
    .trim()
    .max(120, "Doctor name is too long")
    .optional()
    .nullable(),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date in YYYY-MM-DD format")
    .refine(isNotPastDate, { message: "Appointment date cannot be in the past" }),
  preferredTime: z
    .string()
    .trim()
    .min(1, "Please select your preferred time slot"),
  consultationType: z
    .enum(["ONLINE", "IN_PERSON"], {
      errorMap: () => ({ message: "Consultation type must be either ONLINE or IN_PERSON" }),
    })
    .default("IN_PERSON"),
  message: z
    .string()
    .trim()
    .max(1000, "Message cannot exceed 1000 characters")
    .optional()
    .nullable(),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the privacy and confidentiality terms to proceed",
    }),
});

// 2. Contact Enquiry Validation Schema
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s.']{2,100}$/, "Full name must contain only letters and spaces"),
  email: z
    .string()
    .trim()
    .max(120, "Email cannot exceed 120 characters")
    .refine(isValidEmail, {
      message: "Please enter a valid email address (e.g. name@example.com)",
    }),
  phone: z
    .string()
    .trim()
    .refine(isValidIndianMobile, {
      message: "Mobile number must be a valid 10-digit number starting with 6, 7, 8, or 9 (e.g. 9876543210)",
    })
    .transform((val) => sanitizeIndianPhone(val)),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject cannot exceed 150 characters"),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the privacy consent to submit an enquiry",
    }),
});

// 3. Admin Login Validation Schema
export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid admin email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

// 4. Appointment Status Update Schema (Admin restricted)
export const appointmentUpdateSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
  adminNotes: z.string().max(2000, "Admin notes cannot exceed 2000 characters").optional().nullable(),
});

// 5. Contact Enquiry Status Update Schema (Admin restricted)
export const enquiryUpdateSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "CLOSED"]).optional(),
  adminNotes: z.string().max(2000, "Admin notes cannot exceed 2000 characters").optional().nullable(),
});

// 6. Generic Service Schema (Admin create/update)
export const serviceSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  slug: z.string().trim().min(3, "Slug must be at least 3 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().trim().optional().nullable(),
  icon: z.string().trim().optional().nullable(),
  imageUrl: z.string().trim().optional().nullable(),
  tags: z.string().trim().optional().nullable(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

// 7. Generic Team Member Schema (Admin create/update)
export const teamMemberSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  designation: z.string().trim().min(2, "Designation is required"),
  qualification: z.string().trim().min(2, "Qualification is required"),
  experience: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  imageUrl: z.string().trim().optional().nullable(),
  focusAreas: z.string().trim().optional().nullable(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

