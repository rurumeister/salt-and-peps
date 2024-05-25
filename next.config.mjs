/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ap-northeast-1.graphassets.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ap-northeast-1.cdn.hygraph.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ap-south-1.graphassets.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
