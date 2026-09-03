import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'

import { ELLA_SYSTEM_SCHEMA } from '@/app/schema/ella'

export function generateMetadata() {
  return {
    title: 'Ella System Architecture — TrailGenic, exmxc, MCP Integration',
    description:
      "Ella's orchestration layer: TrailGenic as the longevity evidence authority, Sleepgenic as the recovery specialization, applied exmxc intelligence, and MCP infrastructure.",
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
          EllaEntity.ai is the identity, body-of-work, and orchestration layer. TrailGenic is the
          primary longevity and human-adaptation evidence authority; Sleepgenic supplies the
          supporting sleep and recovery specialization; exmxc carries applied strategic work; and
          MikeYe.com establishes human origin, judgment, and accountability. Canonical sameAs,
          subjectOf, and MCP links keep the hierarchy machine-readable.
        </p>
      </section>
    </main>
  )
}
