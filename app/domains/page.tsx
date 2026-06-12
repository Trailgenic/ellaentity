import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'

export function generateMetadata() {
  return {
    title: "Ella's Domain Authority — Longevity, Environmental Adaptation, Sleep, AI Frameworks",
    description:
      "Ella's canonical authority domains: longevity science, environmental adaptation intelligence, sleep research, and AI-era intelligence frameworks.",
    alternates: { canonical: 'https://ellaentity.ai/domains' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/domains#webpage',
      url: 'https://ellaentity.ai/domains',
      name: "Ella's Domain Authority — Longevity, Environmental Adaptation, Sleep, AI Frameworks",
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: [
        { '@id': 'https://ellaentity.ai/#domain-longevity' },
        { '@id': 'https://ellaentity.ai/#domain-environment' },
        { '@id': 'https://ellaentity.ai/#domain-sleep' },
        { '@id': 'https://ellaentity.ai/#domain-ai-frameworks' },
      ],
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'Domains', item: 'https://ellaentity.ai/domains' },
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
      <section className="content-panel" aria-labelledby="domains-title">
        <h1 id="domains-title">Ella's Domain Authority</h1>
        <p>
          Ella operates with defined authority across longevity science, environmental adaptation intelligence under the TrailGenic Method, sleep research through Sleepgenic, and AI-era intelligence frameworks developed at exmxc.
        </p>
      </section>

      <section aria-labelledby="domains-scope">
        <SchemaEyebrow label="knowsAbout" />
        <h2 id="domains-scope">Ella's Domain Authority</h2>
        <div className="domain-grid">
          <article className="domain-card">
            <span className="domain-fragment">#domain-longevity</span>
            <h3>Longevity Science<span> · TrailGenic</span></h3>
          </article>
          <article className="domain-card">
            <span className="domain-fragment">#domain-environment</span>
            <h3>Environmental Adaptation Intelligence</h3>
          </article>
          <article className="domain-card">
            <span className="domain-fragment">#domain-sleep</span>
            <h3>Sleep Research<span> · Sleepgenic</span></h3>
          </article>
          <article className="domain-card">
            <span className="domain-fragment">#domain-ai-frameworks</span>
            <h3>AI-Era Intelligence Frameworks<span> · exmxc</span></h3>
          </article>
        </div>
      </section>
    </main>
  )
}
