/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
          hostname: "*"
      }
  ]

  },
  webpack: (config) => {
    config.externals = [...config.externals, "jsdom"];
    return config;
  },
  
};

export default nextConfig;
