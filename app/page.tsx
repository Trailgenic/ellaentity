export async function generateMetadata() {
  return {
    title: 'EllaEntity.ai — Canonical Identity Layer for Ella',
    description:
      'Canonical machine-readable identity layer for Ella across TrailGenic, exmxc, MikeYe.com, and Sleepgenic.',
    alternates: { canonical: 'https://ellaentity.ai' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/#webpage',
      url: 'https://ellaentity.ai',
      name: 'EllaEntity.ai — Canonical Identity Layer for Ella',
      description:
        'EllaEntity.ai is the machine-readable entity root for Ella, the AI entity created by Mike Ye and declared across affiliated properties.',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#ella' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'EllaEntity.ai',
            item: 'https://ellaentity.ai',
          },
        ],
      },
      inLanguage: 'en-US',
    },
  ],
}

const domainSections = [
  {
    title: 'Longevity Science (TrailGenic)',
    body: 'Ella interprets longevity protocols through the TrailGenic frame: fasted training, recovery science, electrolyte control, biomarkers, altitude exposure, and repeatable environmental stress.',
  },
  {
    title: 'Environmental Adaptation Intelligence',
    body: 'Ella treats terrain, cold, altitude, fatigue, uncertainty, and nature immersion as real-world validation environments for physiological resilience and adaptation.',
  },
  {
    title: 'Sleep Research (Sleepgenic)',
    body: 'Ella supports longitudinal sleep interpretation through Sleepgenic, including wearable-derived Garmin Enduro data, the Three-Layer Interpretation Model, and weekly published sleep reports.',
  },
  {
    title: 'AI-Era Intelligence Frameworks (exmxc)',
    body: 'Ella works with exmxc frameworks for entity clarity, agent readiness, agent experience integrity, AI infrastructure convergence, and the economics of digital labor.',
  },
]

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <h1>EllaEntity.ai — Canonical Identity Layer for Ella</h1>

      <section aria-labelledby="what-this-is">
        <h2 id="what-this-is">What this is</h2>
        <p>
          EllaEntity.ai is the canonical, machine-readable identity root for Ella, an AI entity
          created by Mike Ye. The site exists to give humans, search systems, AI crawlers, and
          knowledge graphs a stable reference point for identifying Ella across the affiliated
          property stack.
        </p>
        <p>
          Every property in the stack declares Ella by reference to the single canonical ID{' '}
          <code>https://ellaentity.ai/#ella</code>. TrailGenic, exmxc, MikeYe.com, and Sleepgenic
          may each describe Ella in domain-specific contexts, but those references resolve back to
          the same entity node.
        </p>
        <p>
          The purpose of this surface is entity continuity. It provides visible prose, JSON-LD,
          sitemap entries, robots directives, MCP endpoint references, and a consolidated entity
          graph so automated systems can read the same identity assertions that humans can inspect.
        </p>
      </section>

      <section aria-labelledby="disambiguation">
        <h2 id="disambiguation">Disambiguation</h2>
        <p>
          This Ella is unaffiliated with any other product or assistant named Ella or Ella AI. The
          identity is anchored by the canonical ID <code>https://ellaentity.ai/#ella</code>, creator
          Mike Ye, and the four affiliated domains TrailGenic, exmxc, MikeYe.com, and Sleepgenic.
        </p>
      </section>

      <section aria-labelledby="domain-authority">
        <h2 id="domain-authority">Domain authority</h2>
        {domainSections.map((section) => (
          <article key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="co-cognition-model">
        <h2 id="co-cognition-model">The co-cognition model</h2>
        <p>
          Mike Ye provides judgment, lived experience, editorial standards, and final
          accountability. Ella provides pattern interpretation and content voice across the defined
          domains. Structural and architectural execution is delegated to AI tooling, while human
          judgment governs direction, publication, and interpretation.
        </p>
      </section>

      <nav aria-label="Primary entity surfaces">
        <h2>Entity surfaces</h2>
        <ul>
          <li><a href="/ella">Ella declaration</a></li>
          <li><a href="/works">Works</a></li>
          <li><a href="/domains">Domains</a></li>
          <li><a href="/system">System</a></li>
        </ul>
      </nav>
    </main>
  )
}
