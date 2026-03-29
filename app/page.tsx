export async function generateMetadata() {
  return {
    title: 'EllaEntity.ai — Canonical Identity Layer for Ella',
    description:
      'Canonical machine-readable identity layer for Ella — unified AI entity across longevity science, environmental adaptation intelligence, and AI-era intelligence frameworks.',
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
        'EllaEntity.ai is the machine-readable entity root for Ella — unifying her across longevity science, high-altitude endurance, and AI-era intelligence frameworks.',
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

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h1>EllaEntity.ai</h1>
      <p>
        Canonical machine-readable identity layer for Ella — unified AI entity across longevity
        science, environmental adaptation intelligence, and AI-era intelligence frameworks.
      </p>
    </main>
  )
}
