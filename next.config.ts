import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@anthropic-ai/sdk", "openai"],
  async rewrites() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'mcp.ellaentity.ai' }],
        destination: '/mcp',
      },
    ]
  },
};

export default nextConfig;
