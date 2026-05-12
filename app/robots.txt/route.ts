import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const protocol = request.headers.get("x-forwarded-proto") ?? "https";

  const body = `User-agent: *
Allow: /
Sitemap: ${protocol}://${host}/sitemap.xml`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
