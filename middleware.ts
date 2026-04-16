import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (host === "briefing.bajour.ch") {
    return NextResponse.rewrite(new URL(`/bajour${pathname}`, request.url));
  }
  if (host === "news.ganzgraz.at") {
    return NextResponse.rewrite(new URL(`/ganzgraz${pathname}`, request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
