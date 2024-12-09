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
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`,
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // Allow all paths under Cloudinary domain
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, "jsdom"];
    return config;
  },
};

export default nextConfig;
