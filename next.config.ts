import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Two images of up to 2MB each in one save.
    serverActions: { bodySizeLimit: "5mb" },
  },
  async redirects() {
    // The old demo's booking placeholder now points at the demo's contact form.
    return [{ source: "/book", destination: "/hanoch#contact", permanent: true }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
