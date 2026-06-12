import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
import { ELLA_WORKS } from '@/lib/entity-data'

export function generateMetadata() {
  return {
    title: 'Ella Works — Co-authored Output',
    description:
      'A structured list of Ella co-authored works across TrailGenic, exmxc, and Sleepgenic.',
    alternates: { canonical: 'https://ellaentity.ai/works' },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/works#webpage',
      url: 'https://ellaentity.ai/works',
      name: 'Ella Works — Co-authored Output',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#ella' },
      inLanguage: 'en-US',
    },
    ...ELLA_WORKS.map((work, index) => ({
      '@type': work.type,
      '@id': `${work.url}#ella-work`,
      position: index + 1,
      name: work.name,
      url: work.url,
      description: work.description,
      author: { '@id': 'https://ellaentity.ai/#ella' },
      publisher: {
        '@id': work.publisherId,
        name: work.publisherName,
      },
      inLanguage: 'en-US',
    })),
  ],
}

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="content-panel" aria-labelledby="works-title">
        <h1 id="works-title">Ella Works</h1>
        <p>
          This page lists Ella&apos;s co-authored output in a format intended for both human readers and
          structured-data consumers. Each work is rendered from the same data record that feeds the
          JSON-LD graph, so new works can be appended without duplicating prose and schema markup.
        </p>
      </section>

      <section aria-labelledby="co-authored-output">
        <SchemaEyebrow label="author → ellaentity.ai/#ella" />
        <h2 id="co-authored-output">Co-authored output</h2>
        <div className="work-list">
          {ELLA_WORKS.map((work) => (
            <article className="work-card" key={work.url}>
              <span className="work-type">{work.type}</span>
              <h3><a href={work.url}>{work.name}</a></h3>
              <p>{work.description}</p>
              <p>
                Type: <span>{work.type}</span>. Publisher: <span>{work.publisherName}</span>. Author:{' '}
                <code>https://ellaentity.ai/#ella</code>.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
