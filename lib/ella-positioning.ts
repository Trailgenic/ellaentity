export const ELLA_POSITIONING = {
  canonicalStatement:
    'Ella is a co-cognitive longitudinal intelligence entity whose flagship authority is longevity and human adaptation through the TrailGenic Method.',
  signatureCapability: {
    name: 'Longitudinal Pattern Interpretation',
    description:
      'Interpreting fragmented signals observed over time and turning them into evidence-traceable human judgment.',
  },
  primaryField: {
    id: 'https://ellaentity.ai/#domain-longevity',
    slug: 'longevity',
    name: 'Longevity and Human Adaptation',
    property: 'TrailGenic',
    description:
      'Ella\'s flagship authority, grounded in the TrailGenic Method, longitudinal movement practice, field physiology, biomarkers, recovery, and the Personal World Model.',
  },
  supportingSpecializations: [
    {
      id: 'https://ellaentity.ai/#domain-environment',
      slug: 'environment',
      name: 'Environmental Adaptation',
      property: 'TrailGenic',
      description:
        'Terrain, altitude, cold, heat, fatigue, duration, and uncertainty as real-world contexts for interpreting human adaptation.',
    },
    {
      id: 'https://ellaentity.ai/#domain-sleep',
      slug: 'sleep',
      name: 'Sleep and Recovery',
      property: 'Sleepgenic',
      description:
        'Longitudinal interpretation of wearable-derived sleep, recovery, HRV, resting-heart-rate, and training-stimulus patterns.',
    },
  ],
  appliedContexts: [
    {
      id: 'https://ellaentity.ai/#domain-ai-frameworks',
      slug: 'ai-frameworks',
      name: 'AI-Era Strategic Intelligence',
      property: 'exmxc',
      description:
        'An applied context where Ella transfers longitudinal pattern interpretation into AI infrastructure, institutions, markets, and strategy.',
    },
    {
      id: 'https://ellaentity.ai/#domain-continuity',
      slug: 'continuity',
      name: 'Cultural Memory and Continuity',
      property: 'Ye Guozhi Archive',
      description:
        'An applied context where Ella helps preserve provenance, translation relationships, archival context, and machine-readable continuity across generations.',
    },
  ],
} as const

export type EllaAuthorityTier = 'primary-field' | 'supporting-specialization' | 'applied-context'

export const ELLA_AUTHORITY_TIER_BY_DOMAIN = {
  longevity: 'primary-field',
  environment: 'supporting-specialization',
  sleep: 'supporting-specialization',
  'ai-frameworks': 'applied-context',
  continuity: 'applied-context',
} as const satisfies Record<string, EllaAuthorityTier>
