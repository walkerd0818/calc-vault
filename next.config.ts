import type { NextConfig } from "next";

// When deploying to a subpath (GitHub Pages, Vercel with custom basePath, etc.),
// set NEXT_PUBLIC_BASE_PATH in your environment (e.g. "/calc-vault").
// Leave it empty to run at the root path.
const basePath = "/calc-vault"; // process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

if (basePath) {
  nextConfig.basePath = basePath;
  if (process.env.NODE_ENV === 'production') {
    nextConfig.redirects = async () => [
      {
        source: "/",
        destination: `${basePath}/`,
        permanent: false,
      },
    ];
  }
}

export default nextConfig;
