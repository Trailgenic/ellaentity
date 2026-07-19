import { ELLA_GLOBAL_SCHEMA, ELLA_MCP_SCHEMA, ELLA_ORG_SCHEMA, ELLA_SYSTEM_SCHEMA } from '../app/schema/ella'
import {
  ELLA_COCOGNITION,
  ELLA_DOMAINS,
  ELLA_FRAMEWORKS,
  ELLA_IDENTITY,
  ELLA_SURFACES,
  ELLA_WORKS,
} from './entity-data'

export const ELLA_CANONICAL_ENTITY_ID = 'https://ellaentity.ai/#ella' as const
export const ELLA_MCP_SERVER_INFO = { name: 'ellaentity-mcp', version: '1.1.4' } as const
export const ELLA_MCP_PROTOCOL_VERSIONS = ['2025-11-25', '2025-06-18'] as const
export const ELLA_MCP_DEFAULT_PROTOCOL_VERSION = ELLA_MCP_PROTOCOL_VERSIONS[0]
export const ELLA_REGISTRY_DATA_VERSION = '2026-07-19.works-v1-2' as const
export const ELLA_REGISTRY_LAST_MODIFIED = '2026-07-19' as const
export const ELLA_REGISTRY_SCHEMA_VERSION = '1.1' as const
export const ELLA_REGISTRY_SOURCE = 'https://ellaentity.ai/entity.json' as const

export const ELLA_DOMAIN_SLUGS = ['longevity', 'environment', 'sleep', 'ai-frameworks'] as const
export const ELLA_FRAMEWORK_SLUGS = ['four-forces-of-ai-power'] as const
export const ELLA_MCP_TOOL_NAMES = [
  'ella.identity.get',
  'ella.domains.get',
  'ella.frameworks.get',
  'ella.works.get',
  'ella.collaboration.get',
] as const

export type EllaMcpToolName = (typeof ELLA_MCP_TOOL_NAMES)[number]
export type EllaDomainSlug = (typeof ELLA_DOMAIN_SLUGS)[number]
export type EllaFrameworkSlug = (typeof ELLA_FRAMEWORK_SLUGS)[number]

export function ellaProvenance() {
  return {
    canonicalEntityId: ELLA_CANONICAL_ENTITY_ID,
    source: ELLA_REGISTRY_SOURCE,
    schemaVersion: ELLA_REGISTRY_SCHEMA_VERSION,
    dataVersion: ELLA_REGISTRY_DATA_VERSION,
    lastModified: ELLA_REGISTRY_LAST_MODIFIED,
  }
}

export function ellaEnvelope<T>(data: T) {
  return { data, provenance: ellaProvenance() }
}

export function ellaEntityGraph() {
  return {
    '@context': 'https://schema.org/',
    '@graph': [ELLA_GLOBAL_SCHEMA, ELLA_ORG_SCHEMA, ELLA_SYSTEM_SCHEMA, ELLA_MCP_SCHEMA].flatMap((schema) => {
      if (Array.isArray(schema)) {
        return schema.flatMap((entry) => {
          if (entry && typeof entry === 'object' && '@graph' in entry) {
            return (entry as { '@graph': unknown[] })['@graph']
          }
          return [entry]
        })
      }

      if (schema && typeof schema === 'object' && '@graph' in schema) {
        return (schema as { '@graph': unknown[] })['@graph']
      }

      return [schema]
    }),
  }
}

export const ELLA_REGISTRY = {
  identity: ELLA_IDENTITY,
  domains: ELLA_DOMAINS,
  frameworks: ELLA_FRAMEWORKS,
  works: ELLA_WORKS,
  collaboration: { coCognition: ELLA_COCOGNITION, surfaces: ELLA_SURFACES },
} as const

export const ELLA_MCP_RESOURCES = [
  { uri: 'ella://identity', name: 'Ella identity', mimeType: 'application/json', description: 'Canonical public Ella identity record.' },
  { uri: 'ella://domains', name: 'Ella domains', mimeType: 'application/json', description: 'All public Ella authority domains.' },
  ...ELLA_DOMAIN_SLUGS.map((slug) => ({ uri: `ella://domains/${slug}`, name: `Ella domain: ${slug}`, mimeType: 'application/json', description: `Public Ella domain record for ${slug}.` })),
  { uri: 'ella://frameworks', name: 'Ella frameworks', mimeType: 'application/json', description: 'All public Ella and Mike Ye frameworks exposed by this server.' },
  { uri: 'ella://frameworks/four-forces-of-ai-power', name: 'The Four Forces of AI Power', mimeType: 'application/json', description: 'The Four Forces framework record.' },
  { uri: 'ella://works', name: 'Ella works', mimeType: 'application/json', description: 'Co-authored works attributed to Ella.' },
  { uri: 'ella://collaboration', name: 'Ella collaboration model', mimeType: 'application/json', description: 'Public co-cognition model and surfaces.' },
  { uri: 'ella://entity-graph', name: 'Ella entity graph', mimeType: 'application/ld+json', description: 'Canonical consolidated Ella JSON-LD graph.' },
] as const

export function readEllaResource(uri: string): unknown | null {
  if (uri === 'ella://identity') return ELLA_REGISTRY.identity
  if (uri === 'ella://domains') return ELLA_REGISTRY.domains
  if (uri.startsWith('ella://domains/')) {
    const slug = uri.replace('ella://domains/', '') as EllaDomainSlug
    return ELLA_DOMAIN_SLUGS.includes(slug) ? ELLA_REGISTRY.domains[slug] : null
  }
  if (uri === 'ella://frameworks') return ELLA_REGISTRY.frameworks
  if (uri === 'ella://frameworks/four-forces-of-ai-power') return ELLA_REGISTRY.frameworks.find((item) => item.slug === 'four-forces-of-ai-power') ?? null
  if (uri === 'ella://works') return ELLA_REGISTRY.works
  if (uri === 'ella://collaboration') return ELLA_REGISTRY.collaboration
  if (uri === 'ella://entity-graph') return ellaEntityGraph()
  return null
}
