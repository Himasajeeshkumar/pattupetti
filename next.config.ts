import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/Paattupetti",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
