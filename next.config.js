/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: require('path').join(__dirname),
  images: {
    domains: [],
  },
  transpilePackages: [],
  webpack: (config) => {
    // Exclude preline TypeScript files from processing
    config.module.rules.push({
      test: /node_modules\/preline\/.*\.ts$/,
      use: 'ignore-loader',
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/.well-known/skills/grid/SKILL.md',
        destination: 'https://raw.githubusercontent.com/AIPowerGrid/grid-skill/main/SKILL.md',
        permanent: false,
      },
    ];
  },
  async headers() {
    const scriptSources = process.env.NODE_ENV === 'development'
      ? ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https://challenges.cloudflare.com', 'https://omnivox.io', 'https://cdn.jsdelivr.net']
      : ["'self'", "'unsafe-inline'", 'https://challenges.cloudflare.com', 'https://static.cloudflareinsights.com', 'https://omnivox.io', 'https://cdn.jsdelivr.net'];
    const mediaPolicy = "media-src 'self' blob: https://omnivox.io;";
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
            value: `script-src ${scriptSources.join(' ')}; ${mediaPolicy}`,
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
      },
      {
        // Last matching CSP overrides only docs; Pagefind needs WASM, not JavaScript eval.
        source: '/docs/:path*',
        headers: [{
          key: 'Content-Security-Policy',
          value: `script-src ${[...scriptSources, "'wasm-unsafe-eval'"].join(' ')}; ${mediaPolicy}`,
        }],
      },
    ]
  }
};

module.exports = nextConfig;
