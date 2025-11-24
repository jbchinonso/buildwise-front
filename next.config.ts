import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://ui-avatars.com/**")],
  },
  
  async rewrites() {
    return [
      {
        source: "/admin/settings",
        destination: "/admin/settings/user-management",
      },
    ];
  },
};

export default nextConfig;
