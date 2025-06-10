/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  async headers() {
    return [
      {
        source: '/:path*', // Apply these headers to all routes
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development'
              ? "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://omnivox.io https://cdn.jsdelivr.net; media-src 'self' blob: https://omnivox.io;"
              : "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://omnivox.io https://cdn.jsdelivr.net; media-src 'self' blob: https://omnivox.io;",
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=*, geolocation=(), browsing-topics=()'
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig;
