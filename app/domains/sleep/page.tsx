export function generateMetadata() {
  return {
    title: 'Ella — Sleep Research Domain Authority',
    description:
      "Ella's canonical authority in sleep research: longitudinal wearable data, Garmin Enduro measurements, the Three-Layer Interpretation Model, and weekly sleep reports.",
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
      name: 'Ella — Sleep Research Domain Authority',
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
      <h1>Sleep Research</h1>
      <p>
        Ella&apos;s sleep research domain covers longitudinal analysis from wearable data, Garmin
        Enduro measurements, the Three-Layer Interpretation Model, and weekly Sleepgenic reports.
        The work treats sleep as a primary adaptation signal rather than an isolated wellness metric.
      </p>
    </main>
  )
}
