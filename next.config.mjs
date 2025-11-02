import withBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  turbopack: {
    rules: {
      "*.mp3": {
        loaders: ["url-loader"],
        as: "*.js",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default bundleAnalyzer(withNextIntl(nextConfig));
