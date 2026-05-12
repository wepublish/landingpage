import { NextRequest } from "next/server";

const PLZ_PARAMS = [
  "4147", "4123", "4144", "4102", "4103",
  "4142", "4132", "4133", "4153", "4125",
];

const BAJOUR_PATHS = [
  "",
  "/mini",
  "/light",
  "/fcb",
  "/fcb/mini",
  "/fcb/light",
  "/fasnacht",
  "/fasnacht/mini",
  "/fasnacht/light",
];

const GANZGRAZ_PATHS = [""];

function generateSitemapXml(domain: string, protocol: string, paths: string[], plzParams?: string[]) {
  const urls: string[] = [];

  for (const path of paths) {
    urls.push(`${protocol}://${domain}${path}`);
    if (plzParams) {
      for (const plz of plzParams) {
        urls.push(`${protocol}://${domain}${path}?plz=${plz}`);
      }
    }
  }

  const xmlUrls = urls.map(
    (loc) => `  <url>
    <loc>${loc}</loc>
  </url>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export function GET(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const protocol = request.headers.get("x-forwarded-proto") ?? "https";

  let domain: string;
  let paths: string[];
  let plzParams: string[] | undefined;

  switch (host) {
    case "briefing.bajour.ch":
      domain = "briefing.bajour.ch";
      paths = BAJOUR_PATHS;
      plzParams = PLZ_PARAMS;
      break;
    case "news.ganzgraz.at":
      domain = "news.ganzgraz.at";
      paths = GANZGRAZ_PATHS;
      break;
    default:
      domain = host;
      paths = [];
  }

  const xml = generateSitemapXml(domain, protocol, paths, plzParams);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
