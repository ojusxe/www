import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  compress: true, // Enable gzip compression (default: true)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    // Image optimization settings
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache optimized images for 30 days
    formats: ['image/avif', 'image/webp'], // Prefer modern formats
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
