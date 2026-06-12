import { MetadataRoute } from 'next'

const allowedBots = ['*', 'GPTBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedBots.map((userAgent) => ({
      userAgent,
      allow: '/',
    })),
    sitemap: 'https://ellaentity.ai/sitemap.xml',
  }
}
