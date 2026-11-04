// Simple in-memory sliding window rate limiter for Next.js App Router API routes
const tracker = new Map();

export function rateLimit({ interval = 60 * 1000, maxRequests = 10 } = {}) {
  return {
    check: (identifier) => {
      const now = Date.now();
      const clientRecord = tracker.get(identifier);

      if (!clientRecord) {
        tracker.set(identifier, {
          timestamp: now,
          count: 1,
        });
        return { success: true, remaining: maxRequests - 1 };
      }

      // If the window has expired, reset counter
      if (now - clientRecord.timestamp > interval) {
        tracker.set(identifier, {
          timestamp: now,
          count: 1,
        });
        return { success: true, remaining: maxRequests - 1 };
      }

      // Check if within limit
      if (clientRecord.count < maxRequests) {
        clientRecord.count += 1;
        return { success: true, remaining: maxRequests - clientRecord.count };
      }

      // Limit exceeded
      return { success: false, remaining: 0 };
    },
  };
}

// Helper to extract client IP from Next.js Request headers
export function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

