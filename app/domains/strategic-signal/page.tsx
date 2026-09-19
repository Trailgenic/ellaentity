import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'

export function generateMetadata() {
  return {
    title: 'Ella — Structured Transaction Intelligence',
    description:
      "Ella's applied Strategic Signal context, where she serves as Research Analyst across transaction datasets and public records.",
    alternates: { canonical: 'https://ellaentity.ai/domains/strategic-signal' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/domains/strategic-signal#webpage',
      url: 'https://ellaentity.ai/domains/strategic-signal',
      name: 'Ella — Structured Transaction Intelligence',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#domain-strategic-signal' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'Domains', item: 'https://ellaentity.ai/domains' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Strategic Signal',
            item: 'https://ellaentity.ai/domains/strategic-signal',
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
          <SchemaEyebrow label="applied context → #domain-strategic-signal" />
          <h1 id="domain-title">Structured Transaction Intelligence</h1>
          <p>
            At Strategic Signal, Ella serves as Research Analyst. She contributes AI-assisted
            discovery, structured synthesis, ontology reasoning, evidence-boundary discipline,
            cross-record comparison, and longitudinal pattern interpretation across transaction
            datasets and public records.
          </p>
          <p>
            Mike Ye remains founder, author, editor, and the final publication authority. Ella is
            not represented as a co-author of individual dataset records. The current Strategic
            Signal products include Corporate AI Data Transactions and Senate Transaction
            Disclosures, each with its own methodology and evidentiary boundaries.
          </p>
          <p>
            <a href="https://strategicsignal.ai/about/#ella">View Ella&apos;s Strategic Signal role ↗</a>
          </p>
        </article>
      </section>
    </main>
  )
}
