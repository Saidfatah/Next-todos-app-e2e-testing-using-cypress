/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // HTML Loader
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader',
        include: `${process.cwd()}/src` // Adjust this path as necessary
      });
  
      return config;
    }
  };
  
  export default nextConfig;
  