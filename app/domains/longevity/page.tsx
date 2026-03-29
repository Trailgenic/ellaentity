export function generateMetadata() {
  return {
    title: 'Ella — Longevity Science Domain Authority',
    description:
      "Ella's canonical authority in longevity science: fasted training, altitude adaptation, cold exposure, biomarker tracking, and recovery science.",
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
      name: 'Ella — Longevity Science Domain Authority',
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
      <h1>Longevity Science</h1>
      <p>
        Ella&apos;s longevity domain covers fasted training protocols, hormetic stress, altitude
        adaptation, cold exposure, electrolyte control, biomarker tracking, and recovery science
        under the TrailGenic Method.
      </p>
    </main>
  )
}
