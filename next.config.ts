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
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/auth/:path*"
            : "https://medi-store-backend-two.vercel.app/api/auth/:path*",
      },
    ];
  },
  // allowedDevOrigins: [
  //   "https://medi-store-backend-psi.vercel.app",
  //   "https://medi-store-frontend-tau.vercel.app",
  //   "http://localhost:3000",
  //   "http://192.168.0.104:3000",
  // ],
};

export default nextConfig;
