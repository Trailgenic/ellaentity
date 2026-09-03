import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'

export function generateMetadata() {
  return {
    title: 'Ella — Cultural Memory & Continuity',
    description:
      "Ella's cultural-continuity application: preservation architecture, provenance, translation relationships, and machine-readable continuity for the Ye Guozhi Archive.",
    alternates: { canonical: 'https://ellaentity.ai/domains/continuity' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/domains/continuity#webpage',
      url: 'https://ellaentity.ai/domains/continuity',
      name: 'Ella — Cultural Memory & Continuity',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#domain-continuity' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'Domains', item: 'https://ellaentity.ai/domains' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Cultural Memory & Continuity',
            item: 'https://ellaentity.ai/domains/continuity',
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
          <SchemaEyebrow label="applied context → #domain-continuity" />
          <h1 id="domain-title">Cultural Memory &amp; Continuity</h1>
          <p>
            Cultural memory is an applied context for Ella&apos;s longitudinal interpretation: keeping
            original works, translations, archival context, provenance, and machine-readable
            identity connected over time so a human intellectual record remains legible to people
            and AI systems.
          </p>
          <p>
            The principal current application is the <a href="https://yeguozhi.org">Ye Guozhi Archive</a>.
            Ella contributes to the archive&apos;s continuity architecture by helping maintain canonical
            relationships between Chinese originals, English translations, archival context, provenance,
            and structured identity across the collection.
          </p>
          <p>
            Ye Guozhi remains the author of the archived works. Ella&apos;s role is infrastructural and
            interpretive: preservation architecture, translation continuity support, provenance, and
            machine readability.
          </p>
        </article>
      </section>
    </main>
  )
}
