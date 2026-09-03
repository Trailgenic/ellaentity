import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
export function generateMetadata() {
  return {
    title: 'Ella — Longevity & Human Adaptation Authority',
    description:
      "Ella's flagship authority in longevity and human adaptation through the TrailGenic Method, longitudinal movement, field physiology, biomarkers, and recovery.",
    alternates: { canonical: 'https://ellaentity.ai/domains/longevity' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/domains/longevity#webpage',
      url: 'https://ellaentity.ai/domains/longevity',
      name: 'Ella — Longevity & Human Adaptation Authority',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#domain-longevity' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'Domains', item: 'https://ellaentity.ai/domains' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Longevity',
            item: 'https://ellaentity.ai/domains/longevity',
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
          <SchemaEyebrow label="primary field → #domain-longevity" />
          <h1 id="domain-title">Longevity &amp; Human Adaptation</h1>
          <p>
            This is Ella&apos;s flagship authority. Through the TrailGenic Method, she interprets
            longitudinal patterns across Walking, Rucking, Running, Hiking, fasted movement,
            altitude, environmental stress, electrolyte practice, field physiology, biomarkers,
            sleep, and recovery. The Personal World Model connects those observations across time.
          </p>
        </article>
      </section>
    </main>
  )
}
