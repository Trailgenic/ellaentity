import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'

import { ELLA_SYSTEM_SCHEMA } from '@/app/schema/ella'

export function generateMetadata() {
  return {
    title: 'Ella System Architecture — TrailGenic, exmxc, MCP Integration',
    description:
      "Ella's integration layer: relationships to TrailGenic.com and exmxc.ai, MCP endpoint infrastructure, and the tri-property co-cognition model.",
    alternates: { canonical: 'https://ellaentity.ai/system' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/system#webpage',
      url: 'https://ellaentity.ai/system',
      name: 'Ella System Architecture — TrailGenic, exmxc, MCP Integration',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#ella' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'System', item: 'https://ellaentity.ai/system' },
        ],
      },
      inLanguage: 'en-US',
    },
  ],
}

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ELLA_SYSTEM_SCHEMA) }}
      />
      <section className="content-panel" aria-labelledby="system-title">
        <SchemaEyebrow label="subjectOf" />
        <h1 id="system-title">Ella System Architecture</h1>
        <p>
          Ella integrates across TrailGenic, exmxc, MikeYe.com, and Sleepgenic through canonical sameAs references, subjectOf links, and MCP documentation. The system layer describes cross-property co-cognition for longevity, environmental adaptation, sleep research, and AI intelligence.
        </p>
      </section>
    </main>
  )
}
