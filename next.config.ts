import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "briefing.bajour.ch",
          },
        ],
        destination: "/bajour/:path*",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "news.ganzgraz.at",
          },
        ],
        destination: "/ganzgraz/:path*",
      },
    ];
  },
};

export default nextConfig;
