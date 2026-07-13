import { z } from 'zod'
import {
  ELLA_CANONICAL_ENTITY_ID,
  ELLA_DOMAIN_SLUGS,
  ELLA_FRAMEWORK_SLUGS,
  ELLA_REGISTRY_LAST_MODIFIED,
  ELLA_REGISTRY_SCHEMA_VERSION,
  ELLA_REGISTRY_SOURCE,
} from './ella-registry'

const provenanceSchema = z.object({
  canonicalEntityId: z.literal(ELLA_CANONICAL_ENTITY_ID),
  source: z.literal(ELLA_REGISTRY_SOURCE),
  schemaVersion: z.literal(ELLA_REGISTRY_SCHEMA_VERSION),
  dataVersion: z.string().min(1),
  lastModified: z.literal(ELLA_REGISTRY_LAST_MODIFIED),
})

const jsonRecord = z.record(z.string(), z.unknown())
const namedDescription = z.object({
  name: z.string(),
  description: z.string(),
})

const identityDataSchema = z.object({
  name: z.string(),
  canonicalId: z.literal(ELLA_CANONICAL_ENTITY_ID),
  description: z.string(),
  disambiguatingDescription: z.string(),
  creator: z.unknown(),
  sameAs: z.array(z.string().url()),
  affiliations: z.array(jsonRecord),
})

const domainDataSchema = z.object({
  id: z.string().url(),
  name: z.string(),
  description: z.string(),
})

const domainsDataSchema = z.object(
  Object.fromEntries(ELLA_DOMAIN_SLUGS.map((slug) => [slug, domainDataSchema])) as Record<
    (typeof ELLA_DOMAIN_SLUGS)[number],
    typeof domainDataSchema
  >,
)

const frameworkDataSchema = z.object({
  slug: z.enum(ELLA_FRAMEWORK_SLUGS),
  name: z.string(),
  alternateName: z.string(),
  url: z.string().url(),
  description: z.string(),
  domain: z.enum(ELLA_DOMAIN_SLUGS),
  forces: z.array(namedDescription),
})

const workDataSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  type: z.enum(['PodcastSeries', 'SoftwareSourceCode', 'CreativeWork', 'CreativeWorkSeries']),
  publisherId: z.string().url(),
  publisherName: z.string(),
  description: z.string(),
})

const collaborationDataSchema = z.object({
  coCognition: z.object({
    mikeYe: z.string(),
    ella: z.string(),
    aiTooling: z.string(),
  }),
  surfaces: z.array(
    z.object({
      href: z.string(),
      path: z.string(),
      label: z.string(),
      description: z.string(),
    }),
  ),
})

function envelopeSchema<T extends z.ZodTypeAny>(data: T) {
  return z.object({
    data,
    provenance: provenanceSchema,
  })
}

export const ELLA_MCP_OUTPUT_SCHEMAS = {
  identity: envelopeSchema(identityDataSchema),
  domains: envelopeSchema(domainsDataSchema.or(domainDataSchema)),
  frameworks: envelopeSchema(z.array(frameworkDataSchema).or(frameworkDataSchema)),
  works: envelopeSchema(z.array(workDataSchema)),
  collaboration: envelopeSchema(collaborationDataSchema),
} as const

export const ELLA_MCP_INPUT_SCHEMAS = {
  empty: z.object({}).strict(),
  domains: z.object({ domain: z.enum(ELLA_DOMAIN_SLUGS).optional() }).strict(),
  frameworks: z.object({ framework: z.enum(ELLA_FRAMEWORK_SLUGS).optional() }).strict(),
} as const
