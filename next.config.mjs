import createNextIntlPlugin from 'next-intl/plugin';
import  withVideos from  'next-videos';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {

   webpack(config, options) {
    
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "url-loader",
      },
    });
    return config;
  },
 
};
 
export default withNextIntl(withVideos(nextConfig));