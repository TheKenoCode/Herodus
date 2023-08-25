/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      /mongodb-client-encryption/
    )

    return config
  },
}

module.exports = nextConfig
