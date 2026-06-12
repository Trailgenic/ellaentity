import { MetadataRoute } from 'next'

const BASE_URL = 'https://ellaentity.ai'

const ROUTES = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/ella', changeFrequency: 'monthly', priority: 1 },
  { path: '/works', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/domains', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/domains/longevity', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/domains/hiking', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/domains/ai-frameworks', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/domains/sleep', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/system', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/system/mcp', changeFrequency: 'monthly', priority: 0.8 },
] as const

// Update a route's date only when its content materially changes.
const LAST_MODIFIED: Record<(typeof ROUTES)[number]['path'], string> = {
  '/': '2026-06-11',
  '/ella': '2026-06-11',
  '/works': '2026-06-11',
  '/domains': '2026-06-11',
  '/domains/longevity': '2026-06-11',
  '/domains/hiking': '2026-06-11',
  '/domains/ai-frameworks': '2026-06-11',
  '/domains/sleep': '2026-06-11',
  '/system': '2026-06-11',
  '/system/mcp': '2026-06-11',
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? BASE_URL : `${BASE_URL}${path}`,
    lastModified: new Date(LAST_MODIFIED[path]),
    changeFrequency,
    priority,
  }))
}
