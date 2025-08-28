/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Catch React issues in dev
  swcMinify: true,       // Faster + smaller builds
  poweredByHeader: false, // Security: hides "X-Powered-By"

  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"], // Faster images
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Applies to all routes
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Encoding", value: "br" }, // Brotli
          { key: "Content-Encoding", value: "gzip" }, // Gzip
        ],
      },
    ];
  },
};

module.exports = nextConfig;
