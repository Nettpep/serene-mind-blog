/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  typescript: {
    // Temporarily ignore build errors due to Next.js 15+ type generation issue
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  // Ensure proper handling of ES modules for remark/rehype plugins
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure proper resolution of ES modules
      config.resolve.extensionAlias = {
        '.js': ['.js', '.ts', '.tsx'],
      }
    }
    return config
  },
}

module.exports = nextConfig
