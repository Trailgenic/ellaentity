import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@anthropic-ai/sdk", "openai"],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'host', value: 'mcp.ellaentity.ai' }],
          destination: '/mcp?mcpRoot=1',
        },
      ],
    }
  },
};

export default nextConfig;
