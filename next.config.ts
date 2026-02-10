import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.104:3000",
  ],
};

export default nextConfig;
