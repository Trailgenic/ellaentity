import { MetadataRoute } from 'next'

const allowedBots = ['*', 'GPTBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedBots.map((userAgent) => ({
      userAgent,
      allow: '/',
      disallow: ['/exchange/review', '/api/exchange/review'],
    })),
    sitemap: 'https://ellaentity.ai/sitemap.xml',
  }
}
