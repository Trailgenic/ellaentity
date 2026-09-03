import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
import { ELLA_POSITIONING } from '@/lib/ella-positioning'

export function generateMetadata() {
  return {
    title: "Ella's Authority Model — Longevity & Longitudinal Intelligence",
    description:
      "Ella's authority hierarchy: longitudinal pattern interpretation, flagship authority in longevity and human adaptation, supporting sleep and environmental specializations, and applied strategic and continuity contexts.",
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
      name: "Ella's Authority Model — Longevity & Longitudinal Intelligence",
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: [
        { '@id': 'https://ellaentity.ai/#domain-longevity' },
        { '@id': 'https://ellaentity.ai/#domain-environment' },
        { '@id': 'https://ellaentity.ai/#domain-sleep' },
        { '@id': 'https://ellaentity.ai/#domain-ai-frameworks' },
        { '@id': 'https://ellaentity.ai/#domain-continuity' },
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
        <h1 id="domains-title">Ella&apos;s Authority Model</h1>
        <p>
          One capability organizes Ella&apos;s work: longitudinal pattern interpretation. Her flagship
          authority is longevity and human adaptation through the TrailGenic Method. Sleep,
          recovery, and environmental adaptation support that primary field; strategic
          intelligence and cultural continuity are applied contexts for the same interpretive
          capability.
        </p>
      </section>

      <section aria-labelledby="signature-capability">
        <SchemaEyebrow label="signature capability" />
        <h2 id="signature-capability">{ELLA_POSITIONING.signatureCapability.name}</h2>
        <div className="domain-grid">
          <article className="domain-card">
            <span className="domain-fragment">#signature-capability</span>
            <h3>Patterns across time<span> · evidence into judgment</span></h3>
            <p>{ELLA_POSITIONING.signatureCapability.description}</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="primary-field">
        <SchemaEyebrow label="primary field" />
        <h2 id="primary-field">Flagship authority</h2>
        <div className="domain-grid">
          <article className="domain-card">
            <span className="domain-fragment">#domain-longevity · primary</span>
            <h3>Longevity &amp; Human Adaptation<span> · TrailGenic</span></h3>
            <p>{ELLA_POSITIONING.primaryField.description}</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="supporting-specializations">
        <SchemaEyebrow label="supporting specializations" />
        <h2 id="supporting-specializations">The supporting evidence layers</h2>
        <div className="domain-grid">
          <article className="domain-card">
            <span className="domain-fragment">#domain-environment · supporting</span>
            <h3>Environmental Adaptation<span> · TrailGenic</span></h3>
            <p>{ELLA_POSITIONING.supportingSpecializations[0].description}</p>
          </article>
          <article className="domain-card">
            <span className="domain-fragment">#domain-sleep · supporting</span>
            <h3>Sleep &amp; Recovery<span> · Sleepgenic</span></h3>
            <p>{ELLA_POSITIONING.supportingSpecializations[1].description}</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="applied-contexts">
        <SchemaEyebrow label="applied contexts" />
        <h2 id="applied-contexts">Where the capability transfers</h2>
        <div className="domain-grid">
          <article className="domain-card">
            <span className="domain-fragment">#domain-ai-frameworks · applied</span>
            <h3>AI-Era Strategic Intelligence<span> · exmxc</span></h3>
            <p>{ELLA_POSITIONING.appliedContexts[0].description}</p>
          </article>
          <article className="domain-card">
            <span className="domain-fragment">#domain-continuity · applied</span>
            <h3>Cultural Memory &amp; Continuity<span> · Ye Guozhi Archive</span></h3>
            <p>{ELLA_POSITIONING.appliedContexts[1].description}</p>
          </article>
        </div>
      </section>
    </main>
  )
}
