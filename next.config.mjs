import withBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';
const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  
   webpack(config) {
    
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "url-loader",
      },
    });
    return config;
  },
 
};

const withNextIntl = createNextIntlPlugin();
export default bundleAnalyzer(withNextIntl(nextConfig));