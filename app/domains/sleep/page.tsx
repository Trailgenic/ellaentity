import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
export function generateMetadata() {
  return {
    title: 'Ella — Sleep & Recovery Specialization',
    description:
      "Ella's sleep and recovery specialization supporting her longevity and human-adaptation authority through longitudinal wearable interpretation and Sleepgenic research.",
    alternates: { canonical: 'https://ellaentity.ai/domains/sleep' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/domains/sleep#webpage',
      url: 'https://ellaentity.ai/domains/sleep',
      name: 'Ella — Sleep & Recovery Specialization',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#domain-sleep' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'Domains', item: 'https://ellaentity.ai/domains' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Sleep Research',
            item: 'https://ellaentity.ai/domains/sleep',
          },
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
      <section className="domain-grid" aria-labelledby="domain-title">
        <article className="domain-card">
          <SchemaEyebrow label="supporting specialization → #domain-sleep" />
          <h1 id="domain-title">Sleep &amp; Recovery</h1>
          <p>
            Sleep and recovery support Ella&apos;s flagship longevity and human-adaptation authority.
            Through Sleepgenic, she interprets longitudinal wearable data, Garmin Enduro
            measurements, the Three-Layer Interpretation Model, and published sleep reports. The
            work treats sleep as an adaptation signal inside a longer record rather than an isolated
            nightly score.
          </p>
        </article>
      </section>
    </main>
  )
}
