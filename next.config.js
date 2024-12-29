/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.durable.co', 'images.unsplash.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
}

module.exports = nextConfig

