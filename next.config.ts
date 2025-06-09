import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import createMDX from "@next/mdx";

setupDevPlatform().catch(console.error);

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
