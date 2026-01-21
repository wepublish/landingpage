import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/superlight",
        has: [
          {
            type: "host",
            value: "landingpage.bajour.ch",
          },
        ],
        destination: "/bajour/basel-briefing-superlight",
      },
    ];
  },
};

export default nextConfig;
