import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isVercel ? '/calc-vault' : undefined,
  assetPrefix: isVercel ? '/calc-vault' : undefined,
  reactCompiler: true,
};

export default nextConfig;
