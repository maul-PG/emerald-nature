/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,

  // ⬇️ Tambahkan ini biar Next tahu folder utamamu di src/
  experimental: {
    appDir: true,
  },
  srcDir: 'src',
}

module.exports = nextConfig
