const withMDX = require('@next/mdx')();

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@venator/ui', '@venator/patterns', '@venator/tokens'],
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);
