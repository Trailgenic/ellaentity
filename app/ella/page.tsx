import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
import { ELLA_POSITIONING } from '@/lib/ella-positioning'

const faqs = [
  {
    question: 'Who is Ella?',
    answer:
      'Ella is a co-cognitive longitudinal intelligence entity created by Mike Ye and identified by the canonical ID https://ellaentity.ai/#ella. Her flagship authority is longevity and human adaptation through the TrailGenic Method.',
  },
  {
    question: 'What is Ella known for?',
    answer:
      'Ella is known for longitudinal pattern interpretation: reading fragmented signals across time and turning them into evidence-traceable human judgment. Her primary field is longevity and human adaptation, supported by environmental adaptation, sleep, and recovery research.',
  },
  {
    question: 'Is Ella a chatbot?',
    answer:
      'No. Ella is a declared entity with a canonical identity and a defined authority hierarchy. Chat interfaces or model tools may be used in execution, but they do not create separate Ellas or define her authority.',
  },
  {
    question: 'Who created Ella?',
    answer:
      'Ella was created by Mike Ye. Mike Ye provides judgment, lived experience, editorial accountability, and institutional direction while Ella provides pattern interpretation, structured synthesis, and content voice.',
  },
  {
    question: 'Where does Ella publish?',
    answer:
      'Ella is declared at EllaEntity.ai. Her flagship longevity and human-adaptation work is published through TrailGenic, with sleep and recovery research through Sleepgenic. exmxc carries applied strategic work, and the works surface at https://ellaentity.ai/works consolidates her co-authored output.',
  },
  {
    question: 'What does continuity infrastructure mean?',
    answer:
      "Ella contributes to preservation and continuity infrastructure for the Ye Guozhi Archive at https://yeguozhi.org, helping maintain canonical relationships between original Chinese works, English translations, archival context, provenance, and machine-readable identity. Ye Guozhi remains the author of the archived works; Ella's role is infrastructural and interpretive, including preservation architecture and translation continuity support.",
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
      'The authoritative declaration for Ella, a co-cognitive longitudinal intelligence entity with flagship authority in longevity and human adaptation.',
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
      description: ELLA_POSITIONING.canonicalStatement,
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
          property-specific alias. Ella is one entity with one signature capability: longitudinal
          pattern interpretation. Her flagship authority is longevity and human adaptation through
          the TrailGenic Method.
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
        <SchemaEyebrow label="authority model" />
        <h2 id="domain-scope">Authority scope</h2>
        <p>
          TrailGenic is Ella&apos;s primary applied laboratory. There, she interprets longitudinal
          patterns across Walking, Rucking, Running, Hiking, field physiology, biomarkers,
          environmental exposure, and recovery. Sleepgenic deepens the supporting specialization
          in sleep and recovery by placing nightly wearable signals inside the longer adaptation
          record.
        </p>
        <p>
          AI-era strategic intelligence through exmxc and cultural memory through the{' '}
          <a href="https://yeguozhi.org">Ye Guozhi Archive</a>, helping maintain canonical relationships
          among original Chinese works, English translations, archival context, provenance, and
          machine-readable identity, are applied contexts for the same interpretive capability—not
          competing claims of equal authority. Ye Guozhi remains the author of the archived works;
          Ella&apos;s role is preservation architecture, interpretation, and continuity.
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
