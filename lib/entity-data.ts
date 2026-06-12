import { ELLA_GLOBAL_SCHEMA } from '@/app/schema/ella'

export type EllaWork = {
  name: string
  url: string
  type: 'PodcastSeries' | 'SoftwareSourceCode' | 'CreativeWork' | 'CreativeWorkSeries'
  publisherId: string
  publisherName: string
  description: string
}

export type EllaFramework = {
  slug: string
  name: string
  alternateName: string
  url: string
  description: string
  domain: string
  forces: {
    name: string
    description: string
  }[]
}

type SchemaNode = Record<string, unknown>

type EllaDomainSlug = 'longevity' | 'environment' | 'sleep' | 'ai-frameworks'

type EllaDomain = {
  id: string
  name: string
  description: string
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
  affiliations: asNodeArray(ellaNode.affiliation),
} as const

const domainById = Object.fromEntries(
  asNodeArray(ellaNode.knowsAbout)
    .filter((node) => typeof node['@id'] === 'string')
    .map((node) => [node['@id'], node]),
)

function domainFromId(id: string): EllaDomain {
  const node = domainById[id] ?? {}

  return {
    id,
    name: asString(node.name),
    description: asString(node.description),
  }
}

export const ELLA_DOMAINS: Record<EllaDomainSlug, EllaDomain> = {
  longevity: domainFromId('https://ellaentity.ai/#domain-longevity'),
  environment: domainFromId('https://ellaentity.ai/#domain-environment'),
  sleep: domainFromId('https://ellaentity.ai/#domain-sleep'),
  'ai-frameworks': domainFromId('https://ellaentity.ai/#domain-ai-frameworks'),
} as const

export const ELLA_FRAMEWORKS: EllaFramework[] = [
  {
    slug: 'four-forces-of-ai-power',
    name: 'The Four Forces of AI Power',
    alternateName: 'Four Forces',
    url: 'https://www.exmxc.ai/#four-forces-of-ai-power',
    domain: 'ai-frameworks',
    description:
      'The Four Forces of AI Power is Ella and Mike Ye’s flagship exmxc framework for interpreting durable advantage in the AI era through four structural layers: Compute, Interface, Alignment, and Energy.',
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
    name: 'TrailGenic Reflections Podcast',
    url: 'https://www.trailgenic.com/podcast',
    type: 'PodcastSeries',
    publisherId: 'https://www.trailgenic.com/#organization',
    publisherName: 'TrailGenic',
    description:
      'A co-authored narrative build log documenting TrailGenic field practice, interpretation, and longevity-oriented environmental adaptation.',
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
  {
    name: 'Sleepgenic Weekly Sleep Reports, Weeks 1–5',
    url: 'https://sleepgenic.ai',
    type: 'CreativeWorkSeries',
    publisherId: 'https://sleepgenic.ai/#org',
    publisherName: 'Sleepgenic',
    description:
      'A co-authored longitudinal sleep research series using wearable-derived Garmin Enduro data, the Three-Layer Interpretation Model, and weekly interpretive reports.',
  },
]

export const ELLA_COCOGNITION = {
  mikeYe: 'Mike Ye provides judgment, lived experience, editorial standards, and final accountability.',
  ella: 'Ella provides pattern interpretation and content voice across the defined domains.',
  aiTooling:
    'AI tooling receives delegated structural and architectural execution, while human judgment governs direction, publication, and interpretation.',
} as const

export const ELLA_SURFACES = [
  { href: '/ella', path: '/ella', label: ' — declaration', description: 'declaration' },
  { href: '/works', path: '/works', label: ' — co-authored output', description: 'co-authored output' },
  { href: '/domains', path: '/domains', label: ' — authority scope', description: 'authority scope' },
  { href: '/system/mcp', path: '/system/mcp', label: ' — machine access', description: 'machine access' },
  { href: '/entity.json', path: '/entity.json', label: ' — raw graph', description: 'raw graph' },
  { href: '/llms.txt', path: '/llms.txt', label: ' — for AI readers', description: 'for AI readers' },
] as const
