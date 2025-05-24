import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
                stream: false,
                crypto: false,
            };
        }
        return config;
    },
    // Disable unnecessary features
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
};

export default nextConfig;
