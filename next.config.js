/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-**',
      },
    ],
    unoptimized: true
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig