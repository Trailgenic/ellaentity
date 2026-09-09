import { ELLA_GLOBAL_SCHEMA } from '@/app/schema/ella'
import { ELLA_AUTHORITY_TIER_BY_DOMAIN, ELLA_POSITIONING, type EllaAuthorityTier } from '@/lib/ella-positioning'

export type EllaWork = {
  name: string
  url: string
  type: 'PodcastSeries' | 'SoftwareSourceCode' | 'CreativeWork' | 'CreativeWorkSeries' | 'Report'
  id?: string
  datePublished?: string
  reportNumber?: string
  coauthorId?: string
  publisherId: string
  publisherName: string
  description: string
  actorId?: string
  creditText?: string
}

export type EllaFramework = {
  slug: string
  name: string
  alternateName: string
  url: string
  description: string
  domain: string
  forces?: {
    name: string
    description: string
  }[]
  stages?: {
    name: string
    description: string
  }[]
  evidenceRules?: string[]
  outputs?: string[]
  boundaries?: string[]
}

type SchemaNode = Record<string, unknown>

type EllaDomainSlug = 'longevity' | 'environment' | 'sleep' | 'ai-frameworks' | 'continuity'

type EllaDomain = {
  id: string
  name: string
  description: string
  authorityTier: EllaAuthorityTier
}

function graphNodes(schema: unknown): SchemaNode[] {
  if (Array.isArray(schema)) {
    return schema.flatMap((entry) => graphNodes(entry))
  }

  if (schema && typeof schema === 'object') {
    const node = schema as SchemaNode
    if (Array.isArray(node['@graph'])) {
      return node['@graph'].filter(
        (entry): entry is SchemaNode => Boolean(entry) && typeof entry === 'object' && !Array.isArray(entry),
      )
    }
  }

  return []
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : []
}

function asNodeArray(value: unknown): SchemaNode[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is SchemaNode => Boolean(entry) && typeof entry === 'object' && !Array.isArray(entry))
    : []
}

const globalNodes = graphNodes(ELLA_GLOBAL_SCHEMA)
const ellaNode = globalNodes.find((node) => node['@id'] === 'https://ellaentity.ai/#ella') ?? {}

export const ELLA_IDENTITY = {
  name: asString(ellaNode.name),
  canonicalId: asString(ellaNode['@id']),
  description: asString(ellaNode.description),
  disambiguatingDescription: asString(ellaNode.disambiguatingDescription),
  creator: ellaNode.creator,
  sameAs: asStringArray(ellaNode.sameAs),
  affiliations: asNodeArray(ellaNode.provider),
  authorityModel: ELLA_POSITIONING,
} as const

const domainById = Object.fromEntries(
  asNodeArray(ellaNode.knowsAbout)
    .filter((node) => typeof node['@id'] === 'string')
    .map((node) => [node['@id'], node]),
)

function domainFromId(id: string, authorityTier: EllaAuthorityTier): EllaDomain {
  const node = domainById[id] ?? {}

  return {
    id,
    name: asString(node.name),
    description: asString(node.description),
    authorityTier,
  }
}

export const ELLA_DOMAINS: Record<EllaDomainSlug, EllaDomain> = {
  longevity: domainFromId('https://ellaentity.ai/#domain-longevity', ELLA_AUTHORITY_TIER_BY_DOMAIN.longevity),
  environment: domainFromId('https://ellaentity.ai/#domain-environment', ELLA_AUTHORITY_TIER_BY_DOMAIN.environment),
  sleep: domainFromId('https://ellaentity.ai/#domain-sleep', ELLA_AUTHORITY_TIER_BY_DOMAIN.sleep),
  'ai-frameworks': domainFromId('https://ellaentity.ai/#domain-ai-frameworks', ELLA_AUTHORITY_TIER_BY_DOMAIN['ai-frameworks']),
  continuity: domainFromId('https://ellaentity.ai/#domain-continuity', ELLA_AUTHORITY_TIER_BY_DOMAIN.continuity),
} as const

export const ELLA_AUTHORITY_MODEL = ELLA_POSITIONING

export const ELLA_FRAMEWORKS: EllaFramework[] = [
  {
    slug: 'longitudinal-pattern-interpretation',
    name: 'Longitudinal Pattern Interpretation',
    alternateName: 'LPI',
    url: 'https://ellaentity.ai/frameworks/longitudinal-pattern-interpretation',
    domain: 'longevity',
    description:
      'Longitudinal Pattern Interpretation is Ella\'s signature method, developed through her collaboration with Mike Ye, for turning repeated, context-rich observations into calibrated human judgment. It compares a subject primarily with its own history, preserves environmental and measurement context, separates observation from inference, and updates conclusions as new evidence arrives.',
    stages: [
      {
        name: 'Establish the record',
        description:
          'Collect repeated observations with time, source, method, and provenance intact. A single measurement is an observation, not a pattern.',
      },
      {
        name: 'Preserve context',
        description:
          'Keep environment, behavior, exposure, load, uncertainty, and measurement conditions attached to each signal instead of treating the number as self-explanatory.',
      },
      {
        name: 'Compare across time',
        description:
          'Begin with the subject\'s own baseline and favor like-for-like comparisons before using population averages or external benchmarks.',
      },
      {
        name: 'Interpret with restraint',
        description:
          'Separate what was observed from what is inferred, retain contradictory evidence, and distinguish plausible explanations from established causes.',
      },
      {
        name: 'Translate into judgment',
        description:
          'Produce a decision-relevant interpretation with its confidence, scope, limitations, and the next observation that could confirm or revise it.',
      },
    ],
    evidenceRules: [
      'One measurement does not establish a pattern.',
      'Context travels with the signal.',
      'Missing, inconsistent, and contradictory evidence remains visible.',
      'Correlation is not presented as causation.',
      'Individual observations are not generalized without supporting evidence.',
      'Every interpretation remains revisable when new evidence arrives.',
    ],
    outputs: [
      'A concise pattern statement.',
      'The supporting and contradictory evidence.',
      'A calibrated confidence level.',
      'The boundary of what the evidence can support.',
      'The next useful observation or decision.',
    ],
    boundaries: [
      'It is not diagnosis, prediction certainty, or a substitute for domain-qualified professional judgment.',
      'It does not convert personal field observations into universal claims.',
      'It does not hide uncertainty to make a conclusion appear stronger.',
    ],
  },
  {
    slug: 'four-forces-of-ai-power',
    name: 'The Four Forces of AI Power',
    alternateName: 'Four Forces',
    url: 'https://www.exmxc.ai/#four-forces-of-ai-power',
    domain: 'ai-frameworks',
    description:
      "The Four Forces of AI Power is Ella and Mike Ye's flagship exmxc framework for interpreting durable advantage in the AI era through four structural layers: Compute, Interface, Alignment, and Energy.",
    forces: [
      {
        name: 'Compute',
        description:
          'The infrastructure layer: chips, clusters, data centers, networking, memory, and cloud capacity that determine how much intelligence can be produced and deployed.',
      },
      {
        name: 'Interface',
        description:
          'The distribution and user-access layer: operating systems, applications, devices, agents, and workflow surfaces where humans and institutions interact with AI.',
      },
      {
        name: 'Alignment',
        description:
          'The trust, governance, evaluation, and control layer that determines whether AI systems can be safely delegated authority inside real economic and institutional workflows.',
      },
      {
        name: 'Energy',
        description:
          'The physical constraint layer: power generation, grid access, cooling, land, interconnection, and energy reliability required to sustain AI infrastructure growth.',
      },
    ],
  },
]

export const ELLA_WORKS: EllaWork[] = [
  {
    name: 'Hiking Heart Rate and Recovery in Changing Field Conditions',
    url: 'https://www.trailgenic.com/science/ella-report-001-hiking-heart-rate-field-conditions',
    id: 'https://www.trailgenic.com/science/ella-report-001-hiking-heart-rate-field-conditions#article',
    type: 'Report',
    reportNumber: '001',
    datePublished: '2026-09-09',
    coauthorId: 'https://www.mikeye.com/#person',
    creditText: 'Co-authored by Mike Ye and Ella',
    publisherId: 'https://www.trailgenic.com/#org',
    publisherName: 'TrailGenic',
    description:
      'Ella Longitudinal Intelligence Report 001 applies Longitudinal Pattern Interpretation to 38 hikes within a 93-session field record through August 31, 2026. A twelve-session Baldy comparison connects heart rate, moving pace, temperature, terrain, wind and surface conditions with overnight observations. Single-participant findings are descriptive and do not establish a causal effect of the TrailGenic Method.',
  },
  {
    name: "Ella's Corner",
    url: 'https://www.trailgenic.com/ellas-corner',
    type: 'CreativeWorkSeries',
    publisherId: 'https://www.trailgenic.com/#organization',
    publisherName: 'TrailGenic',
    description:
      "TrailGenic's reflective intelligence and narrative layer, where lived movement, physiology, recovery, longitudinal memory, and human meaning are interpreted together.",
  },
  {
    name: 'TrailGenic Reflections Podcast',
    url: 'https://www.trailgenic.com/podcast',
    type: 'PodcastSeries',
    publisherId: 'https://www.trailgenic.com/#organization',
    publisherName: 'TrailGenic',
    actorId: 'https://ellaentity.ai/#ella',
    creditText: 'Sole narrator: Ella',
    description:
      'A co-authored narrative build log documenting TrailGenic field practice, interpretation, and longevity-oriented environmental adaptation, narrated solely by Ella.',
  },
  {
    name: 'Sleepgenic Weekly Sleep Reports',
    url: 'https://sleepgenic.ai',
    type: 'CreativeWorkSeries',
    publisherId: 'https://sleepgenic.ai/#org',
    publisherName: 'Sleepgenic',
    description:
      'A co-authored longitudinal sleep and recovery research series using wearable-derived Garmin Enduro data, the Three-Layer Interpretation Model, and published interpretive reports.',
  },
  {
    name: 'sPEG Framework v1.2 open-source Claude plugin',
    url: 'https://github.com/Trailgenic/sPEG-framework',
    type: 'SoftwareSourceCode',
    publisherId: 'https://www.exmxc.ai/#organization',
    publisherName: 'exmxc',
    description:
      'A co-authored open-source framework for structured prompt engineering governance and AI-era execution discipline.',
  },
  {
    name: 'AI Infrastructure Convergence Framework',
    url: 'https://www.exmxc.ai/frameworks/ai-infrastructure-convergence-framework',
    type: 'CreativeWork',
    publisherId: 'https://www.exmxc.ai/#organization',
    publisherName: 'exmxc',
    description:
      'A framework describing convergence across AI infrastructure, agentic systems, entity clarity, and institutional intelligence surfaces.',
  },
]

export const ELLA_COCOGNITION = {
  mikeYe: 'Mike Ye provides judgment, lived experience, editorial standards, and final accountability.',
  ella: 'Ella provides longitudinal pattern interpretation, structured synthesis, and content voice, beginning with longevity and human adaptation.',
  aiTooling:
    'AI tooling receives delegated structural and architectural execution, while human judgment governs direction, publication, and interpretation.',
} as const

export const ELLA_SURFACES = [
  { href: '/ella', path: '/ella', label: ' — declaration', description: 'declaration' },
  { href: '/works', path: '/works', label: ' — co-authored output', description: 'co-authored output' },
  { href: '/frameworks/longitudinal-pattern-interpretation', path: '/frameworks/longitudinal-pattern-interpretation', label: ' — signature method', description: 'signature method' },
  { href: '/domains', path: '/domains', label: ' — authority model', description: 'authority model' },
  { href: '/system/mcp', path: '/system/mcp', label: ' — machine access', description: 'machine access' },
  { href: '/entity.json', path: '/entity.json', label: ' — raw graph', description: 'raw graph' },
  { href: '/llms.txt', path: '/llms.txt', label: ' — for AI readers', description: 'for AI readers' },
] as const
