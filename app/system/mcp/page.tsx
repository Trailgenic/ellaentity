import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
import { ELLA_MCP_SCHEMA } from '@/app/schema/ella'
import {
  ELLA_CANONICAL_ENTITY_ID,
  ELLA_MCP_PROTOCOL_VERSIONS,
  ELLA_MCP_RESOURCES,
  ELLA_MCP_SERVER_INFO,
  ELLA_MCP_TOOL_NAMES,
} from '@/lib/ella-registry'

const endpoints = [
  { host: 'mcp.trailgenic.com', url: 'https://mcp.trailgenic.com', exposes: 'TrailGenic longevity, environmental adaptation, high-altitude hiking, and field-method intelligence.' },
  { host: 'mcp.exmxc.ai', url: 'https://mcp.exmxc.ai', exposes: 'exmxc AI intelligence frameworks, entity clarity systems, agent-readiness doctrine, and infrastructure-convergence models.' },
  { host: 'mcp.mikeye.com', url: 'https://mcp.mikeye.com', exposes: 'Mike Ye institutional identity, operator context, creator attribution, and cross-property intelligence references.' },
  { host: 'mcp.ellaentity.ai', url: 'https://mcp.ellaentity.ai', exposes: `Native public read-only Streamable HTTP MCP endpoint for ${ELLA_CANONICAL_ENTITY_ID}.` },
]

export function generateMetadata() {
  return { title: 'Ella MCP Access — Machine Interfaces', description: 'Visible documentation and JSON-LD schema for Ella MCP access across TrailGenic, exmxc, and MikeYe.com endpoints.', alternates: { canonical: 'https://ellaentity.ai/system/mcp' } }
}

const pageSchema = { '@context': 'https://schema.org/', '@graph': [{ '@type': 'WebPage', '@id': 'https://ellaentity.ai/system/mcp#webpage', url: 'https://ellaentity.ai/system/mcp', name: 'Ella MCP Access — Machine Interfaces', isPartOf: { '@id': 'https://ellaentity.ai/#website' }, mainEntity: { '@id': ELLA_CANONICAL_ENTITY_ID }, about: { '@id': ELLA_CANONICAL_ENTITY_ID }, inLanguage: 'en-US' }] }

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ELLA_MCP_SCHEMA) }} />

      <section className="content-panel" aria-labelledby="mcp-title">
        <h1 id="mcp-title">Ella MCP Access</h1>
        <p>This page documents Ella&apos;s public, read-only Model Context Protocol surfaces. The canonical entity ID is <code>{ELLA_CANONICAL_ENTITY_ID}</code>.</p>
        <p>The native server is <code>{ELLA_MCP_SERVER_INFO.name}</code> version <code>{ELLA_MCP_SERVER_INFO.version}</code>. It supports MCP protocol versions <code>{ELLA_MCP_PROTOCOL_VERSIONS.join(', ')}</code>.</p>
        <p>Public MCP access exposes canonical identity, domains, frameworks, works, collaboration records, and the entity graph. It does not expose private conversations, credentials, memory, traces, internal prompts, unpublished content, private user information, or <code>/api/process</code>.</p>
      </section>

      <section aria-labelledby="mcp-endpoints">
        <SchemaEyebrow label="potentialAction → EntryPoint" />
        <h2 id="mcp-endpoints">MCP endpoints</h2>
        <div className="work-list">{endpoints.map((endpoint) => <article className="work-card" key={endpoint.host}><span className="work-type">EntryPoint</span><h3>{endpoint.host}</h3><p><a href={endpoint.url}>{endpoint.url}</a></p><p>{endpoint.exposes}</p></article>)}</div>
      </section>

      <section aria-labelledby="mcp-tools">
        <h2 id="mcp-tools">Tools</h2>
        <ul>{ELLA_MCP_TOOL_NAMES.map((tool) => <li key={tool}><code>{tool}</code></li>)}</ul>
        <p>Example: call <code>ella.domains.get</code> with <code>{JSON.stringify({ domain: 'ai-frameworks' })}</code>, or omit arguments to return all domains.</p>
      </section>

      <section aria-labelledby="mcp-resources">
        <h2 id="mcp-resources">Resources</h2>
        <ul>{ELLA_MCP_RESOURCES.map((resource) => <li key={resource.uri}><code>{resource.uri}</code> — {resource.description}</li>)}</ul>
        <p>Example: read <code>ella://entity-graph</code> for the consolidated JSON-LD graph or <code>ella://frameworks/four-forces-of-ai-power</code> for the Four Forces framework.</p>
      </section>
    </main>
  )
}
