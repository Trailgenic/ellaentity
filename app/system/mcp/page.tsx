import { ELLA_MCP_SCHEMA } from '@/app/schema/ella'

const endpoints = [
  {
    host: 'mcp.trailgenic.com',
    url: 'https://mcp.trailgenic.com',
    exposes: 'TrailGenic longevity, environmental adaptation, high-altitude hiking, and field-method intelligence.',
  },
  {
    host: 'mcp.exmxc.ai',
    url: 'https://mcp.exmxc.ai',
    exposes: 'exmxc AI intelligence frameworks, entity clarity systems, agent-readiness doctrine, and infrastructure-convergence models.',
  },
  {
    host: 'mcp.mikeye.com',
    url: 'https://mcp.mikeye.com',
    exposes: 'Mike Ye institutional identity, operator context, creator attribution, and cross-property intelligence references.',
  },
]

export function generateMetadata() {
  return {
    title: 'Ella MCP Access — Machine Interfaces',
    description:
      'Visible documentation and JSON-LD schema for Ella MCP access across TrailGenic, exmxc, and MikeYe.com endpoints.',
    alternates: { canonical: 'https://ellaentity.ai/system/mcp' },
  }
}

const pageSchema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/system/mcp#webpage',
      url: 'https://ellaentity.ai/system/mcp',
      name: 'Ella MCP Access — Machine Interfaces',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#ella' },
      inLanguage: 'en-US',
    },
  ],
}

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ELLA_MCP_SCHEMA) }}
      />

      <h1>Ella MCP Access</h1>
      <p>
        This page documents the machine interfaces associated with Ella. The MCP schema is emitted
        only on this page so crawlers can distinguish general site identity from protocol access
        documentation.
      </p>

      <section aria-labelledby="mcp-endpoints">
        <h2 id="mcp-endpoints">MCP endpoints</h2>
        {endpoints.map((endpoint) => (
          <article key={endpoint.host}>
            <h3>{endpoint.host}</h3>
            <p><a href={endpoint.url}>{endpoint.url}</a></p>
            <p>{endpoint.exposes}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
