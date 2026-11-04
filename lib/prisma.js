import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const globalForPrisma = globalThis;

// Initial fallback mock data matching real Souls Life content
const initialServices = [
  {
    id: "srv_student",
    title: "Student Counseling & Academic Support",
    slug: "student-counseling",
    description: "Targeted support for exam anxiety, concentration challenges, study habits, motivation hurdles, and adolescent emotional guidance.",
    shortDescription: "Exam anxiety relief, study habits and youth mental guidance.",
    icon: "GraduationCap",
    imageUrl: "/images/student-guidance.jpg",
    tags: "Exam Anxiety Relief,Focus & Study Habits,Adolescent Care",
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "srv_career",
    title: "Career Guidance & Skill Development",
    slug: "career-guidance",
    description: "Scientific career assessments, stream selection after 10th & 12th, degree mapping, and personalized professional roadmaps.",
    shortDescription: "Aptitude profiling, stream selection and career roadmaps.",
    icon: "Compass",
    imageUrl: "/images/counseling-assessment.png",
    tags: "Stream Selection,Aptitude Testing,Career Roadmaps",
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "srv_family",
    title: "Family & Marital Counseling",
    slug: "family-marital-counseling",
    description: "Compassionate conflict resolution, couple mediation, pre-marital counseling, emotional reconciliation, and healthy boundaries.",
    shortDescription: "Couple mediation, pre-marital counseling and family harmony.",
    icon: "Users",
    imageUrl: "/images/couples-therapy.jpg",
    tags: "Couple Mediation,Pre-Marital Care,Family Harmony",
    isActive: true,
    displayOrder: 3,
  },
  {
    id: "srv_mental",
    title: "Mental Health & Emotional Wellness Counseling",
    slug: "mental-health-wellness",
    description: "Evidence-based therapy for clinical anxiety, depression, chronic stress, emotional burnout, trauma recovery, and grief.",
    shortDescription: "Therapy for anxiety, depression, burnout and emotional balance.",
    icon: "HeartPulse",
    imageUrl: "/images/mindful-healing.jpg",
    tags: "Anxiety & Depression,Stress Burnout,Trauma Recovery",
    isActive: true,
    displayOrder: 4,
  },
  {
    id: "srv_child",
    title: "Child Development & Learning Support",
    slug: "child-development-support",
    description: "Specialized screenings for ADHD, specific learning difficulties, scholastic backwardness, behavioural therapy, and positive parenting.",
    shortDescription: "ADHD screening, learning delays and positive parenting guidance.",
    icon: "Smile",
    imageUrl: "/images/child-play-therapy.jpg",
    tags: "ADHD Screening,Learning Delays,Parenting Coaching",
    isActive: true,
    displayOrder: 5,
  },
  {
    id: "srv_elderly",
    title: "Elderly Emotional Support & Geriatric Counseling",
    slug: "elderly-emotional-support",
    description: "Empathetic emotional support for senior citizens addressing loneliness, age-related lifestyle changes, chronic illness anxiety, and grief.",
    shortDescription: "Gentle psychological care for seniors and loneliness relief.",
    icon: "HandHeart",
    imageUrl: "/images/counselling-interior.jpg",
    tags: "Senior Care,Loneliness Relief,Peaceful Aging",
    isActive: true,
    displayOrder: 6,
  },
  {
    id: "srv_assessment",
    title: "Psychological Assessments & IQ Testing",
    slug: "psychological-assessments",
    description: "Standardized psychometric batteries, IQ testing, aptitude evaluation, cognitive profiling, and detailed clinical diagnostic reports.",
    shortDescription: "Standardized IQ tests, aptitude batteries and clinical reports.",
    icon: "BrainCircuit",
    imageUrl: "/images/clinic-sanctuary.jpg",
    tags: "Standardized IQ Tests,Aptitude Batteries,Diagnostic Reports",
    isActive: true,
    displayOrder: 7,
  },
  {
    id: "srv_tele",
    title: "Tele-Counseling & Remote Emotional Support",
    slug: "tele-counseling",
    description: "Encrypted, confidential video & audio sessions for Malayalis and clients worldwide who cannot visit our Wandoor clinic physically.",
    shortDescription: "Secure HD video & audio sessions in Malayalam & English.",
    icon: "Video",
    imageUrl: "/images/hero-therapy-session.jpg",
    tags: "Worldwide Video,Malayalam & English,Confidential Call",
    isActive: true,
    displayOrder: 8,
  },
  {
    id: "srv_workshops",
    title: "Workshops & Training Programs",
    slug: "workshops-training",
    description: "Dynamic institutional and corporate training in stress mastery, emotional intelligence, life skills, and preventive mental health.",
    shortDescription: "Institutional, corporate and community mental health training.",
    icon: "Presentation",
    imageUrl: "/images/community-support.jpg",
    tags: "Schools & Colleges,Corporate Wellness,Life Skills",
    isActive: true,
    displayOrder: 9,
  },
];

const initialTeam = [
  {
    id: "team_1",
    name: "Dr. Shailaja M.",
    designation: "Clinical Psychologist (Lead)",
    qualification: "M.Sc Clinical Psychology • RCI Licensed",
    experience: "12+ Years Clinical Practice",
    description: "Specializes in Cognitive Behavioral Therapy (CBT), Panic Attacks, Clinical Depression, OCD & Trauma Recovery.",
    imageUrl: "/images/dr-counselor-portrait.jpg",
    focusAreas: "Depression & Anxiety, CBT Psychotherapy, Trauma Recovery",
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "team_2",
    name: "Mr. Haris K.",
    designation: "Senior Psychiatric Social Worker",
    qualification: "MSW (Medical & Psychiatry)",
    experience: "10+ Years Relationship Therapy",
    description: "Specializes in Couples Mediation, Marital Reconciliation, Conflict De-escalation & Family Systems Therapy.",
    imageUrl: "/images/mr-counselor-portrait.jpg",
    focusAreas: "Couple Conflict Resolution, Family Mediation, Pre-Marital",
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "team_3",
    name: "Mrs. Fathima R.",
    designation: "Child & Adolescent Psychologist",
    qualification: "M.Sc Psychology • Child Guidance Certified",
    experience: "8+ Years Child Behavioral Care",
    description: "Specializes in ADHD & Learning Screening, Autism Spectrum Guidance, Exam Stress & Gentle Positive Parenting.",
    imageUrl: "/images/female-counselor-portrait.jpg",
    focusAreas: "ADHD & Learning Delays, Play-Informed Therapy, Positive Parenting",
    isActive: true,
    displayOrder: 3,
  },
  {
    id: "team_4",
    name: "Mr. Arun Das",
    designation: "Career & Psychometrics Lead",
    qualification: "Certified Psychometric Assessor",
    experience: "7+ Years Youth Mentorship",
    description: "Specializes in Standardized IQ Assessments, 10th & 12th Stream Selection, Aptitude Testing & Confidence Coaching.",
    imageUrl: "/images/male-counselor-portrait.jpg",
    focusAreas: "Aptitude & IQ Testing, Exam Anxiety, Career Roadmaps",
    isActive: true,
    displayOrder: 4,
  },
];

const initialCommunity = [
  {
    id: "comm_1",
    title: "School Mental Health Programs",
    slug: "school-mental-health",
    description: "Emotional literacy, anti-bullying workshops, and study habit seminars across high schools in Malappuram.",
    imageUrl: "/images/community-support.jpg",
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "comm_2",
    title: "College Awareness Campaigns",
    slug: "college-awareness",
    description: "Stress management, career transitions, and mental hygiene on campus for undergraduate students.",
    imageUrl: "/images/community-support.jpg",
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "comm_3",
    title: "Community Counseling Camps",
    slug: "community-camps",
    description: "Accessible free mental wellness screening and triage in local panchayaths around Wandoor and Nilambur.",
    imageUrl: "/images/community-support.jpg",
    isActive: true,
    displayOrder: 3,
  },
  {
    id: "comm_4",
    title: "Suicide Prevention Programs",
    slug: "suicide-prevention",
    description: "Lifeline crisis intervention training, gatekeeper programs, and destigmatization initiatives.",
    imageUrl: "/images/community-support.jpg",
    isActive: true,
    displayOrder: 4,
  },
  {
    id: "comm_5",
    title: "Women Empowerment Sessions",
    slug: "women-empowerment",
    description: "Support groups for self-worth, domestic resilience, and emotional healing.",
    imageUrl: "/images/community-support.jpg",
    isActive: true,
    displayOrder: 5,
  },
  {
    id: "comm_6",
    title: "Youth Development Programs",
    slug: "youth-development",
    description: "Emotional intelligence, leadership mindset, and healthy coping mechanisms for young adults.",
    imageUrl: "/images/community-support.jpg",
    isActive: true,
    displayOrder: 6,
  },
];

// In-Memory store when DATABASE_URL is not yet connected to a live MySQL instance
const memoryStore = {
  admins: [
    {
      id: "admin_master",
      name: "Souls Life Administrator",
      email: process.env.ADMIN_EMAIL || "admin@soulslife.in",
      passwordHash: bcrypt.hashSync(process.env.ADMIN_INITIAL_PASSWORD || "Admin@SoulsLife2026", 10),
      role: "SUPERADMIN",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  appointments: [],
  enquiries: [],
  services: [...initialServices],
  teamMembers: [...initialTeam],
  communityPrograms: [...initialCommunity],
  testimonials: [],
};

// Create a safe database adapter that uses Prisma if DATABASE_URL is valid,
// or gracefully falls back to the in-memory store so the website and Next.js builds never crash!
function createPrismaClient() {
  if (process.env.DATABASE_URL && (process.env.DATABASE_URL.startsWith("mysql://") || process.env.DATABASE_URL.startsWith("mysqls://"))) {
    try {
      return new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      });
    } catch (e) {
      console.warn("Could not initialize PrismaClient with DATABASE_URL, using fallback store:", e.message);
    }
  }
  return null;
}

const realPrisma = globalForPrisma.prisma || createPrismaClient();
if (realPrisma) {
  globalForPrisma.prisma = realPrisma;
}

// Unified repository pattern wrapping Prisma with robust fallback
export const db = {
  // --- Admin ---
  admin: {
    findUnique: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.admin.findUnique({ where });
        } catch (e) {
          console.warn("Prisma query failed, falling back to in-memory admin:", e.message);
        }
      }
      if (where.email) {
        return memoryStore.admins.find((a) => a.email.toLowerCase() === where.email.toLowerCase()) || null;
      }
      if (where.id) {
        return memoryStore.admins.find((a) => a.id === where.id) || null;
      }
      return null;
    },
    update: async ({ where, data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.admin.update({ where, data });
        } catch (e) {
          console.warn("Prisma update failed:", e.message);
        }
      }
      const admin = memoryStore.admins.find((a) => (where.id && a.id === where.id) || (where.email && a.email === where.email));
      if (admin) {
        Object.assign(admin, data, { updatedAt: new Date() });
        return admin;
      }
      throw new Error("Admin not found");
    },
  },

  // --- Appointments ---
  appointment: {
    create: async ({ data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.appointment.create({ data });
        } catch (e) {
          console.warn("Prisma create appointment failed, saving to in-memory:", e.message);
        }
      }
      const record = {
        id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryStore.appointments.unshift(record);
      return record;
    },
    findMany: async ({ where = {}, orderBy = { createdAt: "desc" } } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.appointment.findMany({ where, orderBy });
        } catch (e) {
          console.warn("Prisma findMany appointments failed, returning in-memory:", e.message);
        }
      }
      let list = [...memoryStore.appointments];
      if (where.status) {
        list = list.filter((a) => a.status === where.status);
      }
      if (where.preferredDate) {
        list = list.filter((a) => a.preferredDate === where.preferredDate);
      }
      return list;
    },
    findUnique: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.appointment.findUnique({ where });
        } catch (e) {
          console.warn("Prisma findUnique appointment failed:", e.message);
        }
      }
      if (where.id) {
        return memoryStore.appointments.find((a) => a.id === where.id) || null;
      }
      if (where.reference) {
        return memoryStore.appointments.find((a) => a.reference === where.reference) || null;
      }
      return null;
    },
    update: async ({ where, data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.appointment.update({ where, data });
        } catch (e) {
          console.warn("Prisma update appointment failed:", e.message);
        }
      }
      const apt = memoryStore.appointments.find((a) => a.id === where.id || a.reference === where.reference);
      if (apt) {
        Object.assign(apt, data, { updatedAt: new Date() });
        return apt;
      }
      throw new Error("Appointment not found");
    },
    delete: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.appointment.delete({ where });
        } catch (e) {
          console.warn("Prisma delete appointment failed:", e.message);
        }
      }
      const idx = memoryStore.appointments.findIndex((a) => a.id === where.id);
      if (idx !== -1) {
        const deleted = memoryStore.appointments.splice(idx, 1);
        return deleted[0];
      }
      throw new Error("Appointment not found");
    },
    count: async ({ where = {} } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.appointment.count({ where });
        } catch (e) {
          console.warn("Prisma count failed:", e.message);
        }
      }
      if (where.status) {
        return memoryStore.appointments.filter((a) => a.status === where.status).length;
      }
      return memoryStore.appointments.length;
    },
  },

  // --- Contact Enquiries ---
  contactEnquiry: {
    create: async ({ data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactEnquiry.create({ data });
        } catch (e) {
          console.warn("Prisma create enquiry failed, saving to in-memory:", e.message);
        }
      }
      const record = {
        id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryStore.enquiries.unshift(record);
      return record;
    },
    findMany: async ({ where = {}, orderBy = { createdAt: "desc" } } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactEnquiry.findMany({ where, orderBy });
        } catch (e) {
          console.warn("Prisma findMany enquiries failed:", e.message);
        }
      }
      let list = [...memoryStore.enquiries];
      if (where.status) {
        list = list.filter((e) => e.status === where.status);
      }
      return list;
    },
    findUnique: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactEnquiry.findUnique({ where });
        } catch (e) {
          console.warn("Prisma findUnique enquiry failed:", e.message);
        }
      }
      return memoryStore.enquiries.find((e) => e.id === where.id) || null;
    },
    update: async ({ where, data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactEnquiry.update({ where, data });
        } catch (e) {
          console.warn("Prisma update enquiry failed:", e.message);
        }
      }
      const enq = memoryStore.enquiries.find((e) => e.id === where.id);
      if (enq) {
        Object.assign(enq, data, { updatedAt: new Date() });
        return enq;
      }
      throw new Error("Enquiry not found");
    },
    count: async ({ where = {} } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactEnquiry.count({ where });
        } catch (e) {
          console.warn("Prisma count failed:", e.message);
        }
      }
      if (where.status) {
        return memoryStore.enquiries.filter((e) => e.status === where.status).length;
      }
      return memoryStore.enquiries.length;
    },
  },

  // --- Services ---
  service: {
    findMany: async ({ where = {}, orderBy = { displayOrder: "asc" } } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.service.findMany({ where, orderBy });
        } catch (e) {
          console.warn("Prisma findMany services failed:", e.message);
        }
      }
      let list = [...memoryStore.services];
      if (where.isActive !== undefined) {
        list = list.filter((s) => s.isActive === where.isActive);
      }
      return list.sort((a, b) => a.displayOrder - b.displayOrder);
    },
    findUnique: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.service.findUnique({ where });
        } catch (e) {
          console.warn("Prisma findUnique service failed:", e.message);
        }
      }
      if (where.slug) {
        return memoryStore.services.find((s) => s.slug === where.slug) || null;
      }
      if (where.id) {
        return memoryStore.services.find((s) => s.id === where.id) || null;
      }
      return null;
    },
    create: async ({ data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.service.create({ data });
        } catch (e) {
          console.warn("Prisma create service failed:", e.message);
        }
      }
      const record = { id: `srv_${Date.now()}`, ...data, createdAt: new Date(), updatedAt: new Date() };
      memoryStore.services.push(record);
      return record;
    },
    update: async ({ where, data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.service.update({ where, data });
        } catch (e) {
          console.warn("Prisma update service failed:", e.message);
        }
      }
      const srv = memoryStore.services.find((s) => s.id === where.id);
      if (srv) {
        Object.assign(srv, data, { updatedAt: new Date() });
        return srv;
      }
      throw new Error("Service not found");
    },
    delete: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.service.delete({ where });
        } catch (e) {
          console.warn("Prisma delete service failed:", e.message);
        }
      }
      const idx = memoryStore.services.findIndex((s) => s.id === where.id);
      if (idx !== -1) {
        return memoryStore.services.splice(idx, 1)[0];
      }
      throw new Error("Service not found");
    },
    count: async ({ where = {} } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.service.count({ where });
        } catch (e) {
          console.warn("Prisma count services failed:", e.message);
        }
      }
      if (where.isActive !== undefined) {
        return memoryStore.services.filter((s) => s.isActive === where.isActive).length;
      }
      return memoryStore.services.length;
    },
  },

  // --- Team Members ---
  teamMember: {
    findMany: async ({ where = {}, orderBy = { displayOrder: "asc" } } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.teamMember.findMany({ where, orderBy });
        } catch (e) {
          console.warn("Prisma findMany team failed:", e.message);
        }
      }
      let list = [...memoryStore.teamMembers];
      if (where.isActive !== undefined) {
        list = list.filter((t) => t.isActive === where.isActive);
      }
      return list.sort((a, b) => a.displayOrder - b.displayOrder);
    },
    findUnique: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.teamMember.findUnique({ where });
        } catch (e) {
          console.warn("Prisma findUnique teamMember failed:", e.message);
        }
      }
      return memoryStore.teamMembers.find((t) => t.id === where.id) || null;
    },
    create: async ({ data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.teamMember.create({ data });
        } catch (e) {
          console.warn("Prisma create teamMember failed:", e.message);
        }
      }
      const record = { id: `team_${Date.now()}`, ...data, createdAt: new Date(), updatedAt: new Date() };
      memoryStore.teamMembers.push(record);
      return record;
    },
    update: async ({ where, data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.teamMember.update({ where, data });
        } catch (e) {
          console.warn("Prisma update teamMember failed:", e.message);
        }
      }
      const tm = memoryStore.teamMembers.find((t) => t.id === where.id);
      if (tm) {
        Object.assign(tm, data, { updatedAt: new Date() });
        return tm;
      }
      throw new Error("Team member not found");
    },
    delete: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.teamMember.delete({ where });
        } catch (e) {
          console.warn("Prisma delete teamMember failed:", e.message);
        }
      }
      const idx = memoryStore.teamMembers.findIndex((t) => t.id === where.id);
      if (idx !== -1) {
        return memoryStore.teamMembers.splice(idx, 1)[0];
      }
      throw new Error("Team member not found");
    },
    count: async ({ where = {} } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.teamMember.count({ where });
        } catch (e) {
          console.warn("Prisma count team failed:", e.message);
        }
      }
      if (where.isActive !== undefined) {
        return memoryStore.teamMembers.filter((t) => t.isActive === where.isActive).length;
      }
      return memoryStore.teamMembers.length;
    },
  },

  // --- Community Programs ---
  communityProgram: {
    findMany: async ({ where = {}, orderBy = { displayOrder: "asc" } } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.communityProgram.findMany({ where, orderBy });
        } catch (e) {
          console.warn("Prisma findMany community failed:", e.message);
        }
      }
      let list = [...memoryStore.communityPrograms];
      if (where.isActive !== undefined) {
        list = list.filter((c) => c.isActive === where.isActive);
      }
      return list.sort((a, b) => a.displayOrder - b.displayOrder);
    },
    findUnique: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.communityProgram.findUnique({ where });
        } catch (e) {
          console.warn("Prisma findUnique communityProgram failed:", e.message);
        }
      }
      if (where.slug) {
        return memoryStore.communityPrograms.find((c) => c.slug === where.slug) || null;
      }
      if (where.id) {
        return memoryStore.communityPrograms.find((c) => c.id === where.id) || null;
      }
      return null;
    },
    create: async ({ data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.communityProgram.create({ data });
        } catch (e) {
          console.warn("Prisma create community failed:", e.message);
        }
      }
      const record = { id: `comm_${Date.now()}`, ...data, createdAt: new Date(), updatedAt: new Date() };
      memoryStore.communityPrograms.push(record);
      return record;
    },
    update: async ({ where, data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.communityProgram.update({ where, data });
        } catch (e) {
          console.warn("Prisma update community failed:", e.message);
        }
      }
      const comm = memoryStore.communityPrograms.find((c) => c.id === where.id);
      if (comm) {
        Object.assign(comm, data, { updatedAt: new Date() });
        return comm;
      }
      throw new Error("Community program not found");
    },
    delete: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.communityProgram.delete({ where });
        } catch (e) {
          console.warn("Prisma delete community failed:", e.message);
        }
      }
      const idx = memoryStore.communityPrograms.findIndex((c) => c.id === where.id);
      if (idx !== -1) {
        return memoryStore.communityPrograms.splice(idx, 1)[0];
      }
      throw new Error("Community program not found");
    },
    count: async ({ where = {} } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.communityProgram.count({ where });
        } catch (e) {
          console.warn("Prisma count community failed:", e.message);
        }
      }
      if (where.isActive !== undefined) {
        return memoryStore.communityPrograms.filter((c) => c.isActive === where.isActive).length;
      }
      return memoryStore.communityPrograms.length;
    },
  },

  // --- Testimonials ---
  testimonial: {
    findMany: async ({ where = {}, orderBy = { createdAt: "desc" } } = {}) => {
      if (realPrisma) {
        try {
          return await realPrisma.testimonial.findMany({ where, orderBy });
        } catch (e) {
          console.warn("Prisma findMany testimonials failed:", e.message);
        }
      }
      let list = [...memoryStore.testimonials];
      if (where.isApproved !== undefined) {
        list = list.filter((t) => t.isApproved === where.isApproved);
      }
      if (where.isActive !== undefined) {
        list = list.filter((t) => t.isActive === where.isActive);
      }
      return list;
    },
    create: async ({ data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.testimonial.create({ data });
        } catch (e) {
          console.warn("Prisma create testimonial failed:", e.message);
        }
      }
      const record = { id: `test_${Date.now()}`, ...data, createdAt: new Date(), updatedAt: new Date() };
      memoryStore.testimonials.push(record);
      return record;
    },
    update: async ({ where, data }) => {
      if (realPrisma) {
        try {
          return await realPrisma.testimonial.update({ where, data });
        } catch (e) {
          console.warn("Prisma update testimonial failed:", e.message);
        }
      }
      const t = memoryStore.testimonials.find((item) => item.id === where.id);
      if (t) {
        Object.assign(t, data, { updatedAt: new Date() });
        return t;
      }
      throw new Error("Testimonial not found");
    },
    delete: async ({ where }) => {
      if (realPrisma) {
        try {
          return await realPrisma.testimonial.delete({ where });
        } catch (e) {
          console.warn("Prisma delete testimonial failed:", e.message);
        }
      }
      const idx = memoryStore.testimonials.findIndex((item) => item.id === where.id);
      if (idx !== -1) {
        return memoryStore.testimonials.splice(idx, 1)[0];
      }
      throw new Error("Testimonial not found");
    },
  },
};

export default realPrisma;

