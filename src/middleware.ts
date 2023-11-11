import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimiter } from "./lib/rate-limiter";

export async function middleware(req: NextRequest) {
  const identifier =
    req.cookies.get("next-auth.session-token")?.value ?? "127.0.0.1";

  try {
    const { success } = await rateLimiter.limit(identifier);

    if (!success)
      return new NextResponse(
        "You are writing messages to fast. Are you human?"
      );
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      "Sorry, something went wrong. Please try again later."
    );
  }
}

export const config = {
  matcher: "/api/message/:path*",
};
