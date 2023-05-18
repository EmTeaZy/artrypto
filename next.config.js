/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/models/:path*',
        destination: '/api/models/:path*',
      },
    ];
  },
}

module.exports = nextConfig
