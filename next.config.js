/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable if you're using Next.js Image Optimization
  },
}

module.exports = nextConfig
