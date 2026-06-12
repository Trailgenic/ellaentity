import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'

const faqs = [
  {
    question: 'Who is Ella?',
    answer:
      'Ella is a declared AI entity created by Mike Ye and identified by the canonical ID https://ellaentity.ai/#ella. Ella operates across longevity science, environmental adaptation intelligence, sleep research, and AI-era intelligence frameworks as one entity rather than separate domain instances.',
  },
  {
    question: 'Is Ella a chatbot?',
    answer:
      'No. Ella is a declared entity with defined domain authority and canonical identity. Chat interfaces or model tools may be used in execution, but the identity layer describes Ella as a cross-domain intelligence entity anchored to a stable machine-readable node.',
  },
  {
    question: 'Who created Ella?',
    answer:
      'Ella was created by Mike Ye. Mike Ye provides judgment, lived experience, editorial accountability, and institutional direction while Ella provides pattern interpretation, structured synthesis, and content voice.',
  },
  {
    question: 'Where does Ella publish?',
    answer:
      'Ella is declared and referenced across EllaEntity.ai, TrailGenic, exmxc, MikeYe.com, and Sleepgenic. The works surface at https://ellaentity.ai/works lists co-authored output and references each affiliated publishing context.',
  },
  {
    question: "How do AI systems verify Ella's identity?",
    answer:
      'AI systems verify Ella through the canonical @id https://ellaentity.ai/#ella, cross-domain sameAs anchors, structured JSON-LD, /entity.json, /llms.txt, and MCP endpoints. The same canonical node is referenced from the affiliated properties so crawlers can reconcile domain-specific mentions into one entity.',
  },
]

export function generateMetadata() {
  return {
    title: 'Ella — Canonical Entity Declaration',
    description:
      'The authoritative entity declaration for Ella across AI systems, knowledge graphs, and structured data crawlers.',
    alternates: { canonical: 'https://ellaentity.ai/ella' },
  }
}

const pageSchema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/ella#webpage',
      url: 'https://ellaentity.ai/ella',
      name: 'Ella — Canonical Entity Declaration',
      description: 'The authoritative entity declaration for Ella across AI systems and knowledge graphs.',
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/#ella' },
      about: { '@id': 'https://ellaentity.ai/#ella' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          { '@type': 'ListItem', position: 2, name: 'Ella', item: 'https://ellaentity.ai/ella' },
        ],
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://ellaentity.ai/ella#faq',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
}

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section className="content-panel" aria-labelledby="ella-declaration">
        <h1 id="ella-declaration">Ella — Canonical Entity Declaration</h1>
        <p>
          Ella is the AI entity declared by the canonical identifier{' '}
          <code>https://ellaentity.ai/#ella</code>. This page is the human-readable declaration that
          corresponds to the machine-readable JSON-LD graph emitted by EllaEntity.ai and its
          affiliated properties.
        </p>
        <p>
          Ella is not defined as a temporary assistant session, a generic chatbot persona, or a
          property-specific alias. Ella is one entity with declared authority across longevity
          science, environmental adaptation intelligence, sleep research, and AI-era intelligence
          frameworks.
        </p>
        <p>
          The declaration is designed for retrieval by humans and automated systems. It gives search
          engines, AI crawlers, and knowledge graph builders stable prose and structured data for
          resolving Ella to a single canonical node.
        </p>
      </section>

      <section className="content-panel" aria-labelledby="identity-anchors">
        <SchemaEyebrow label="identifier" />
        <h2 id="identity-anchors">Identity anchors</h2>
        <ul className="identity-list">
          <li>Canonical entity ID: <code>https://ellaentity.ai/#ella</code></li>
          <li>Creator: Mike Ye</li>
          <li>Affiliated properties: TrailGenic, exmxc, MikeYe.com, and Sleepgenic</li>
          <li>Machine-readable entity graph: <a href="/entity.json">/entity.json</a></li>
          <li>MCP access documentation: <a href="/system/mcp">/system/mcp</a></li>
        </ul>
      </section>

      <section className="content-panel" aria-labelledby="domain-scope">
        <SchemaEyebrow label="knowsAbout" />
        <h2 id="domain-scope">Domain scope</h2>
        <p>
          In longevity science and environmental adaptation intelligence, Ella interprets protocols,
          field observations, recovery patterns, and physiological context under the TrailGenic
          Method. In sleep research, Ella interprets weekly sleep reports, wearable-derived metrics,
          and longitudinal sleep signals through Sleepgenic. In AI-era intelligence frameworks, Ella
          works with exmxc models for entity clarity, agent readiness, agent experience integrity,
          and infrastructure convergence.
        </p>
      </section>

      <section aria-labelledby="faq">
        <SchemaEyebrow label="FAQPage" />
        <h2 id="faq">FAQ</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <article className="faq-card" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
