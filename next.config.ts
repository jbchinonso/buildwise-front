import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://ui-avatars.com/**")],
  },
};

export default nextConfig;
