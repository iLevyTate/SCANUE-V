export const runtime = "edge";
export const revalidate = 0;

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit, RATE_LIMIT } from "@/lib/rate-limit";
import { sanitizeInput } from "@/lib/sanitize";

export const maxDuration = 5; // 5 seconds timeout

interface ChatRequestBody {
  message: string;
  agent: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
    }

    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    let body: ChatRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
    const { message, agent } = body;

    if (typeof message !== "string" || typeof agent !== "string") {
      return NextResponse.json({ error: "Invalid field types" }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedMessage = sanitizeInput(message);

    if (!message || !agent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (sanitizedMessage.length === 0) {
      return NextResponse.json({ error: "Invalid message format or length" }, { status: 400 });
    }

    if (!["General", "PFC"].includes(agent)) {
      return NextResponse.json({ error: "Invalid agent type" }, { status: 400 });
    }

    const headers = new Headers({
      "X-RateLimit-Limit": RATE_LIMIT.toString(),
      "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
    });

    const mockResponse = {
      message: `${agent} agent response: ${sanitizedMessage}`,
      agentResponse: `This is a detailed analysis from the ${agent} agent regarding: "${sanitizedMessage}"`,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(mockResponse, {
      headers: {
        ...headers,
        "Cache-Control": "no-store",
        "Content-Security-Policy": "default-src 'self'; script-src 'self'",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to process request: ${errorMessage}` },
      { status: 500 },
    );
  }
}
