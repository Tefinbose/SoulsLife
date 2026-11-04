const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Souls Life Wellbeing Center database...");

  // 1. Seed Initial Admin
  const adminEmail = process.env.ADMIN_EMAIL || "admin@soulslife.in";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "Admin@SoulsLife2026";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        name: "Souls Life Administrator",
        email: adminEmail,
        passwordHash: passwordHash,
        role: "SUPERADMIN",
        isActive: true,
      },
    });
    console.log(`✅ Admin created: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Admin already exists: ${adminEmail}`);
  }

  // 2. Seed 9 Real Services
  const services = [
    {
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

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✅ Seeded ${services.length} services`);

  // 3. Seed 4 Team Members
  const team = [
    {
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

  for (let i = 0; i < team.length; i++) {
    const t = team[i];
    const existing = await prisma.teamMember.findFirst({
      where: { name: t.name },
    });
    if (!existing) {
      await prisma.teamMember.create({ data: t });
    }
  }
  console.log(`✅ Seeded ${team.length} team members`);

  // 4. Seed 6 Community Programs
  const community = [
    {
      title: "School Mental Health Programs",
      slug: "school-mental-health",
      description: "Emotional literacy, anti-bullying workshops, and study habit seminars across high schools in Malappuram.",
      imageUrl: "/images/community-support.jpg",
      isActive: true,
      displayOrder: 1,
    },
    {
      title: "College Awareness Campaigns",
      slug: "college-awareness",
      description: "Stress management, career transitions, and mental hygiene on campus for undergraduate students.",
      imageUrl: "/images/community-support.jpg",
      isActive: true,
      displayOrder: 2,
    },
    {
      title: "Community Counseling Camps",
      slug: "community-camps",
      description: "Accessible free mental wellness screening and triage in local panchayaths around Wandoor and Nilambur.",
      imageUrl: "/images/community-support.jpg",
      isActive: true,
      displayOrder: 3,
    },
    {
      title: "Suicide Prevention Programs",
      slug: "suicide-prevention",
      description: "Lifeline crisis intervention training, gatekeeper programs, and destigmatization initiatives.",
      imageUrl: "/images/community-support.jpg",
      isActive: true,
      displayOrder: 4,
    },
    {
      title: "Women Empowerment Sessions",
      slug: "women-empowerment",
      description: "Support groups for self-worth, domestic resilience, and emotional healing.",
      imageUrl: "/images/community-support.jpg",
      isActive: true,
      displayOrder: 5,
    },
    {
      title: "Youth Development Programs",
      slug: "youth-development",
      description: "Emotional intelligence, leadership mindset, and healthy coping mechanisms for young adults.",
      imageUrl: "/images/community-support.jpg",
      isActive: true,
      displayOrder: 6,
    },
  ];

  for (const c of community) {
    await prisma.communityProgram.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log(`✅ Seeded ${community.length} community programs`);
  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

