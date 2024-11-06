import createNextIntlPlugin from 'next-intl/plugin'; 
const withNextIntl = createNextIntlPlugin();
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
 
export default withNextIntl(nextConfig);