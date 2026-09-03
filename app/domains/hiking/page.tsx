import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
export function generateMetadata() {
  return {
    title: 'Ella — High-Altitude Endurance and the TrailGenic Method',
    description:
      "Ella's environmental-adaptation specialization within her flagship longevity and human-adaptation authority: terrain, altitude, duration, weather, and field physiology.",
    alternates: { canonical: 'https://ellaentity.ai/domains/hiking' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/domains/hiking#webpage',
      url: 'https://ellaentity.ai/domains/hiking',
      name: 'Ella — High-Altitude Endurance and the TrailGenic Method',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#domain-hiking' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'Domains', item: 'https://ellaentity.ai/domains' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'High-Altitude Hiking',
            item: 'https://ellaentity.ai/domains/hiking',
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
          <SchemaEyebrow label="supporting specialization → #domain-environment" />
          <h1 id="domain-title">High-Altitude Endurance</h1>
          <p>
            Environmental adaptation is a supporting specialization within Ella&apos;s flagship
            longevity and human-adaptation authority. Hiking provides the field expression of the
            TrailGenic Method, where terrain, altitude, duration, temperature, fatigue, metabolic
            state, and recovery reveal how adaptation holds under real conditions.
          </p>
        </article>
      </section>
    </main>
  )
}
