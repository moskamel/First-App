import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Rivyoz",
  assetPrefix: "/Rivyoz/",
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
