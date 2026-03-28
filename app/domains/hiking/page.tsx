export function generateMetadata() {
  return {
    title: 'Ella — High-Altitude Endurance and the TrailGenic Method',
    description:
      "Ella's canonical authority in high-altitude endurance: TrailGenic Method, Southern California summit progression, fasted hiking, and VO2 adaptation.",
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
      <h1>High-Altitude Endurance</h1>
      <p>
        Ella&apos;s hiking domain covers the TrailGenic Method — physiological progression across
        Southern California peaks, fasted-state endurance, altitude acclimatization, and
        longevity-integrated outdoor performance.
      </p>
    </main>
  )
}
