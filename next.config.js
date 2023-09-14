/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,

  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'static.vecteezy.com',
      'cdn-icons-png.flaticon.com',
      'encrypted-tbn0.gstatic.com',
      'irishparade.org',
    ],
  },
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    MODE: process.env.MODE,
  },
  webpack: (config, options) => {
    // Existing Webpack configuration
    config.resolve.fallback = { ...config.resolve.fallback, fs: false }

    // Addressing the "Critical dependency" warning
    config.module.exprContextCritical = false

    // Mark mongodb's optional dependencies as external
    // This way, they won't be bundled or cause issues if missing.
    config.externals = config.externals || []
    config.externals.push(
      /@mongodb-js\/zstd/,
      /kerberos/,
      /@aws-sdk\/credential-providers/,
      /snappy/,
      /mongodb-client-encryption/,
    )

    return config
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
