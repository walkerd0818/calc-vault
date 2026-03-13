import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    if (!isVercel) {
      return [
        {
          source: '/calc-vault/:path*',
          destination: '/:path*',
          permanent: false,
        },
      ];
    }
    return [];
  },
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
