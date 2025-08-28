/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  }
}
module.exports = nextConfig
