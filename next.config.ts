import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "landing.bajour.ch",
          },
        ],
        destination: "/bajour/:path*",
      },
    ];
  },
};

export default nextConfig;
