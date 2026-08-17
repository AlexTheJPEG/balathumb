import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Disable unnecessary features
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
};

export default nextConfig;
