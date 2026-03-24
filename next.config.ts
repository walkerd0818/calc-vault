import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/calc-vault", 
  trailingSlash: false, // Optional: Adds a trailing slash to all routes 
};

module.exports = nextConfig;
// export default nextConfig;

