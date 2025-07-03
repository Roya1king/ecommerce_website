import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com',"127.0.0.1", "localhost",'ecommercewebsiteapi-production.up.railway.app'],
  },
};

export default nextConfig;
