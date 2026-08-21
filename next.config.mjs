import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/docs/general', destination: '/docs/java/intro', permanent: true },
      { source: '/docs/general/:path*', destination: '/docs/java/intro/:path*', permanent: true },
      { source: '/docs/network', destination: '/docs/java/network', permanent: true },
      { source: '/docs/network/:path*', destination: '/docs/java/network/:path*', permanent: true },
      { source: '/docs/config', destination: '/docs/java/configuration', permanent: true },
      { source: '/docs/config/:path*', destination: '/docs/java/configuration/:path*', permanent: true },
      { source: '/docs/maintenance', destination: '/docs/java/operations', permanent: true },
      { source: '/docs/maintenance/:path*', destination: '/docs/java/operations/:path*', permanent: true },
      { source: '/docs/plugins', destination: '/docs/java/extensions/plugins', permanent: true },
      { source: '/docs/plugins/:path*', destination: '/docs/java/extensions/plugins/:path*', permanent: true },
      { source: '/docs/mods', destination: '/docs/java/extensions/mods', permanent: true },
      { source: '/docs/mods/:path*', destination: '/docs/java/extensions/mods/:path*', permanent: true },
      { source: '/docs/faq', destination: '/docs/java/faq', permanent: true },
      { source: '/docs/faq/:path*', destination: '/docs/java/faq/:path*', permanent: true },
    ];
  },
};

export default withMDX(config);
