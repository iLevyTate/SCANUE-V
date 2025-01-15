import type { NextRequest } from "next/server";

const RATE_LIMIT = Number(process.env.RATE_LIMIT ?? 100);
const RATE_LIMIT_WINDOW = Number(process.env.RATE_LIMIT_WINDOW ?? 60000);

interface RateLimitResult {
  success: boolean;
  remaining: number;
}

interface RateLimitState {
  timestamp: number;
  count: number;
}

const states = new Map<string, RateLimitState>();

export function rateLimit(req: NextRequest): RateLimitResult {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
  const now = Date.now();
  const state = states.get(ip);

  if (!state) {
    states.set(ip, { timestamp: now, count: 1 });
    return { success: true, remaining: RATE_LIMIT - 1 };
  }

  if (now - state.timestamp > RATE_LIMIT_WINDOW) {
    state.timestamp = now;
    state.count = 1;
    return { success: true, remaining: RATE_LIMIT - 1 };
  }

  state.count++;
  return {
    success: state.count <= RATE_LIMIT,
    remaining: Math.max(0, RATE_LIMIT - state.count),
  };
}

export { RATE_LIMIT };
