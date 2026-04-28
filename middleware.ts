import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (host === "briefing.bajour.ch") {
    if (!pathname.startsWith("/bajour")) {
      const url = request.nextUrl.clone();
      url.pathname = `/bajour${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }
  if (host === "news.ganzgraz.at") {
    if (!pathname.startsWith("/ganzgraz")) {
      const url = request.nextUrl.clone();
      url.pathname = `/ganzgraz${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
