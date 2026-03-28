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
      <h1>Ella System Architecture</h1>
      <p>
        Ella integrates across TrailGenic.com, exmxc.ai, and MikeYe.com via live MCP endpoints at
        mcp.trailgenic.com and mcp.exmxc.ai — forming a tri-property co-cognition system for
        longevity, hiking, and AI intelligence.
      </p>
    </main>
  )
}
