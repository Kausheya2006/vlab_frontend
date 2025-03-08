/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*", // Frontend requests `/api/...`
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Proxy to backend
        },
      ];
    },
  };
  
  export default nextConfig;
  