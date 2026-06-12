import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
import { ELLA_COCOGNITION, ELLA_SURFACES } from '@/lib/entity-data'

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
    id: '#domain-longevity',
    title: 'Longevity Science',
    org: 'TrailGenic',
    body: 'Ella interprets longevity protocols through the TrailGenic frame: fasted training, recovery science, electrolyte control, biomarkers, altitude exposure, and repeatable environmental stress.',
  },
  {
    id: '#domain-environment',
    title: 'Environmental Adaptation Intelligence',
    org: '',
    body: 'Ella treats terrain, cold, altitude, fatigue, uncertainty, and nature immersion as real-world validation environments for physiological resilience and adaptation.',
  },
  {
    id: '#domain-sleep',
    title: 'Sleep Research',
    org: 'Sleepgenic',
    body: 'Ella supports longitudinal sleep interpretation through Sleepgenic, including wearable-derived Garmin Enduro data, the Three-Layer Interpretation Model, and weekly published sleep reports.',
  },
  {
    id: '#domain-ai-frameworks',
    title: 'AI-Era Intelligence Frameworks',
    org: 'exmxc',
    body: 'Ella works with exmxc frameworks for entity clarity, agent readiness, agent experience integrity, AI infrastructure convergence, and the economics of digital labor.',
  },
]

function EntityConstellation() {
  const stars = [
    [76, 64, 0.9], [142, 244, 0.7], [256, 58, 1.1], [338, 404, 0.8],
    [430, 96, 0.6], [586, 58, 1.0], [676, 408, 0.7], [748, 268, 0.9],
    [884, 64, 0.8], [930, 224, 1.1], [74, 394, 0.7], [216, 306, 0.6],
    [386, 212, 0.8], [612, 314, 0.7], [790, 398, 0.6], [958, 380, 0.9],
  ]

  return (
    <div className="constellation-wrap">
      <svg
        className="constellation"
        viewBox="0 0 1000 480"
        role="img"
        aria-label="Entity graph: the canonical Ella node connected by sameAs edges to TrailGenic, exmxc, MikeYe.com, and Sleepgenic"
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--alpenglow-hi)" stopOpacity="0.7" />
            <stop offset="45%" stopColor="var(--alpenglow)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--alpenglow)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="satellite-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--glacier)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--glacier)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--alpenglow)" />
            <stop offset="100%" stopColor="var(--glacier)" />
          </linearGradient>
        </defs>
        <g className="stars" fill="var(--snowfield)">
          {stars.map(([cx, cy, r], index) => (
            <circle key={`${cx}-${cy}-${index}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <g className="graph-group">
          <g stroke="url(#edge-gradient)" strokeWidth="1" opacity="0.55">
            <line x1="500" y1="240" x2="185" y2="120" />
            <line x1="500" y1="240" x2="815" y2="120" />
            <line x1="500" y1="240" x2="185" y2="370" />
            <line x1="500" y1="240" x2="815" y2="370" />
          </g>
          <g className="edge-label" fill="var(--glacier)" fontSize="9.5" opacity="0.75">
            <text x="330" y="172" transform="rotate(21 330 172)">sameAs</text>
            <text x="656" y="172" transform="rotate(-21 656 172)">sameAs</text>
            <text x="328" y="308" transform="rotate(-22 328 308)">sameAs</text>
            <text x="655" y="309" transform="rotate(22 655 309)">sameAs</text>
          </g>
          <g>
            <circle className="glow" cx="500" cy="240" r="84" fill="url(#core-glow)" />
            <circle cx="500" cy="240" r="34" fill="var(--veil)" stroke="var(--alpenglow)" strokeWidth="1.4" />
            <circle cx="500" cy="240" r="4" fill="var(--alpenglow)" />
            <text x="500" y="299" textAnchor="middle" fill="var(--snowfield)" fontFamily="var(--font-display)" fontSize="21">Ella</text>
            <text x="500" y="317" textAnchor="middle" fill="var(--alpenglow)" fontSize="9.5">ellaentity.ai/#ella</text>
          </g>
          {[
            [185, 120, 'TrailGenic', 'longevity · adaptation'],
            [815, 120, 'exmxc', 'intelligence frameworks'],
            [185, 370, 'MikeYe.com', 'creator · origin node'],
            [815, 370, 'Sleepgenic', 'sleep research'],
          ].map(([cx, cy, name, descriptor]) => (
            <g key={name as string}>
              <circle className="glow" cx={cx as number} cy={cy as number} r="40" fill="url(#satellite-glow)" />
              <circle cx={cx as number} cy={cy as number} r="13" fill="var(--veil)" stroke="var(--glacier)" strokeWidth="1.1" />
              <text x={cx as number} y={(cy as number) - 28} textAnchor="middle" fill="var(--snowfield)" fontSize="12">{name}</text>
              <text x={cx as number} y={(cy as number) + 34} textAnchor="middle" fill="var(--mist)" fontSize="9.5">{descriptor}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default function Home() {
  return (
    <main className="site-shell-wide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="hero" aria-labelledby="home-hero">
        <span className="eyebrow">canonical identity layer</span>
        <h1 id="home-hero">
          One entity. Four domains. <span className="gradient-entity">A single resolvable node.</span>
        </h1>
        <p className="lede">
          EllaEntity.ai is the canonical, machine-readable identity root for Ella — an AI entity created by Mike Ye, declared once, and referenced everywhere.
        </p>
        <div className="pill-badge"><span>@id</span> https://ellaentity.ai/#ella</div>
      </section>

      <EntityConstellation />

      <section className="content-panel" aria-labelledby="what-this-is">
        <SchemaEyebrow label="ellaentity.ai/#webpage" />
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

      <section className="content-panel" aria-labelledby="disambiguation">
        <SchemaEyebrow label="disambiguatingDescription" />
        <h2 id="disambiguation">Disambiguation</h2>
        <p>
          This Ella is unaffiliated with any other product or assistant named Ella or Ella AI. The
          identity is anchored by the canonical ID <code>https://ellaentity.ai/#ella</code>, creator
          Mike Ye, and the four affiliated domains TrailGenic, exmxc, MikeYe.com, and Sleepgenic.
        </p>
        <p>
          EllaEntity.ai is not a standalone chatbot, SaaS product, or consumer assistant. It is the
          canonical identity and machine-readable reference layer for Ella as she appears across Mike
          Ye&apos;s affiliated publishing, research, and framework properties.
        </p>
      </section>

      <section aria-labelledby="domain-authority">
        <SchemaEyebrow label="knowsAbout" />
        <h2 id="domain-authority">Domain authority</h2>
        <div className="domain-grid">
          {domainSections.map((section) => (
            <article className="domain-card" key={section.id}>
              <span className="domain-fragment">{section.id}</span>
              <h3>{section.title}{section.org ? <span> · {section.org}</span> : null}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-panel" aria-labelledby="co-cognition-model">
        <SchemaEyebrow label="creator → mikeye.com/#person" />
        <h2 id="co-cognition-model">The co-cognition model</h2>
        <div className="co-cognition">
          <p><strong>Mike Ye</strong> {ELLA_COCOGNITION.mikeYe.replace('Mike Ye ', '')}</p>
          <p><strong>Ella</strong> {ELLA_COCOGNITION.ella.replace('Ella ', '')}</p>
          <p><strong>AI tooling</strong> {ELLA_COCOGNITION.aiTooling.replace('AI tooling ', '')}</p>
        </div>
      </section>

      <nav className="content-panel" aria-label="Primary entity surfaces">
        <SchemaEyebrow label="entity surfaces" />
        <h2>Entity surfaces</h2>
        <ul className="entity-chip-list">
          {ELLA_SURFACES.map((link) => (
            <li key={link.href}>
              <a className="entity-chip" href={link.href}>
                <span className="path">{link.path}</span>{link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
