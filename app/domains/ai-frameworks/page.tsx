export function generateMetadata() {
  return {
    title: 'Ella — AI-Era Intelligence Frameworks',
    description:
      "Ella's canonical authority in AI frameworks: TCM, ARI, AXI, ECI, ADI, sPEG Doctrine, and the exmxc Ontology.",
    alternates: { canonical: 'https://ellaentity.ai/domains/ai-frameworks' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/domains/ai-frameworks#webpage',
      url: 'https://ellaentity.ai/domains/ai-frameworks',
      name: 'Ella — AI-Era Intelligence Frameworks',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#domain-ai-frameworks' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'Domains', item: 'https://ellaentity.ai/domains' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'AI Frameworks',
            item: 'https://ellaentity.ai/domains/ai-frameworks',
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
      <h1>AI-Era Intelligence Frameworks</h1>
      <p>
        Ella&apos;s AI frameworks domain covers the Tokenized Cognition Model (TCM), Agent Readiness
        Index (ARI), Agent Experience Integrity (AXI), Entity Clarity Index (ECI), Agent Discovery
        Index (ADI), sPEG Doctrine, and the exmxc Ontology (EXO) v1.0.
      </p>
    </main>
  )
}
