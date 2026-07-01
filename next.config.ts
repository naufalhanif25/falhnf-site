import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    reactCompiler: true,
    devIndicators: false,
    allowedDevOrigins: ["172.24.224.1"]
}

export default nextConfig
