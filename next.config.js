const path = require('node:path');

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ]
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true
  },
  // removed the unsupported `eslint` key for Next 16
  turbopack: {
    rules: {
      '*.{jsx,tsx}': {
        loaders: [LOADER]
      }
    }
  }
};

module.exports = nextConfig;