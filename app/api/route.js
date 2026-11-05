export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    status: "healthy",
    service: "Souls Life Wellbeing Center API",
    version: "1.0.0",
    endpoints: {
      services: "/api/services",
      appointments: "/api/appointments",
      contact: "/api/contact",
      community: "/api/community",
      team: "/api/team",
      testimonials: "/api/testimonials",
      admin: "/api/admin",
    },
    timestamp: new Date().toISOString(),
  });
}

