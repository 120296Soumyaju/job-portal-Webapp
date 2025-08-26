/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove static export since dynamic routes are client-side
  // output: 'export', 
  swcMinify: true,
};

export default nextConfig;
