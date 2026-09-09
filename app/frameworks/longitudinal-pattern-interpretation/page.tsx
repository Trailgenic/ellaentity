import Link from 'next/link'
import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
import { ELLA_FRAMEWORKS } from '@/lib/entity-data'

function getFramework() {
  const item = ELLA_FRAMEWORKS.find(
    (candidate) => candidate.slug === 'longitudinal-pattern-interpretation',
  )

  if (!item || !item.stages || !item.evidenceRules || !item.outputs || !item.boundaries) {
    throw new Error('Longitudinal Pattern Interpretation framework record is incomplete')
  }

  return {
    ...item,
    stages: item.stages,
    evidenceRules: item.evidenceRules,
    outputs: item.outputs,
    boundaries: item.boundaries,
  }
}

const framework = getFramework()

export function generateMetadata() {
  return {
    title: "Longitudinal Pattern Interpretation — Ella's Signature Method",
    description: framework.description,
    alternates: {
      canonical: 'https://ellaentity.ai/frameworks/longitudinal-pattern-interpretation',
    },
  }
}

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ellaentity.ai/frameworks/longitudinal-pattern-interpretation#webpage',
      url: framework.url,
      name: "Longitudinal Pattern Interpretation — Ella's Signature Method",
      description: framework.description,
      isPartOf: { '@id': 'https://ellaentity.ai/#website' },
      mainEntity: { '@id': 'https://ellaentity.ai/frameworks/longitudinal-pattern-interpretation#term' },
      about: [
        { '@id': 'https://ellaentity.ai/#ella' },
        { '@id': 'https://ellaentity.ai/#domain-longevity' },
      ],
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EllaEntity.ai', item: 'https://ellaentity.ai' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Longitudinal Pattern Interpretation',
            item: framework.url,
          },
        ],
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'DefinedTerm',
      '@id': 'https://ellaentity.ai/frameworks/longitudinal-pattern-interpretation#term',
      name: framework.name,
      alternateName: framework.alternateName,
      url: framework.url,
      description: framework.description,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        '@id': 'https://ellaentity.ai/#ella-frameworks',
        name: 'Ella Frameworks',
        url: 'https://ellaentity.ai/system/mcp',
      },
      subjectOf: [
        { '@id': 'https://ellaentity.ai/frameworks/longitudinal-pattern-interpretation#framework' },
        {
          '@type': 'Report',
          '@id': 'https://www.trailgenic.com/science/ella-report-001-hiking-heart-rate-field-conditions#article',
          name: 'Hiking Heart Rate and Recovery in Changing Field Conditions',
          url: 'https://www.trailgenic.com/science/ella-report-001-hiking-heart-rate-field-conditions',
        },
      ],
      inLanguage: 'en-US',
    },
    {
      '@type': 'CreativeWork',
      '@id': 'https://ellaentity.ai/frameworks/longitudinal-pattern-interpretation#framework',
      name: framework.name,
      alternateName: framework.alternateName,
      url: framework.url,
      description: framework.description,
      about: { '@id': 'https://ellaentity.ai/frameworks/longitudinal-pattern-interpretation#term' },
      author: [
        { '@id': 'https://ellaentity.ai/#ella' },
        { '@id': 'https://www.mikeye.com/#person' },
      ],
      publisher: { '@id': 'https://ellaentity.ai/#organization' },
      datePublished: '2026-09-09',
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

      <section className="content-panel" aria-labelledby="framework-title">
        <SchemaEyebrow label="signature capability → canonical framework" />
        <h1 id="framework-title">Longitudinal Pattern Interpretation</h1>
        <p>{framework.description}</p>
        <p className="co-cognition">
          Developed through the collaboration of Mike Ye and Ella. Mike provides lived
          observations, judgment, and final accountability. Ella provides pattern interpretation,
          structured synthesis, and content voice.
        </p>
      </section>

      <section aria-labelledby="method-title">
        <SchemaEyebrow label="method → five stages" />
        <h2 id="method-title">From observations to judgment</h2>
        <div className="work-list">
          {framework.stages.map((stage, index) => (
            <article className="work-card" key={stage.name}>
              <span className="work-type">{String(index + 1).padStart(2, '0')} / method</span>
              <h3>{stage.name}</h3>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="evidence-title">
        <SchemaEyebrow label="evidence discipline" />
        <h2 id="evidence-title">Rules that protect the interpretation</h2>
        <div className="domain-grid">
          {framework.evidenceRules.map((rule, index) => (
            <article className="domain-card" key={rule}>
              <span className="work-type">Rule {String(index + 1).padStart(2, '0')}</span>
              <p>{rule}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="output-title">
        <SchemaEyebrow label="decision-ready output" />
        <h2 id="output-title">What a complete interpretation contains</h2>
        <ul className="identity-list">
          {framework.outputs.map((output) => <li key={output}>{output}</li>)}
        </ul>
      </section>

      <section className="content-panel" aria-labelledby="boundary-title">
        <SchemaEyebrow label="scope boundaries" />
        <h2 id="boundary-title">What the method does not claim</h2>
        <ul className="identity-list">
          {framework.boundaries.map((boundary) => <li key={boundary}>{boundary}</li>)}
        </ul>
      </section>

      <section aria-labelledby="application-title">
        <SchemaEyebrow label="first published application" />
        <h2 id="application-title">Applied in the field</h2>
        <article className="work-card">
          <span className="work-type">Ella Longitudinal Intelligence Report 001</span>
          <h3>
            <a href="https://www.trailgenic.com/science/ella-report-001-hiking-heart-rate-field-conditions">
              Hiking Heart Rate and Recovery in Changing Field Conditions
            </a>
          </h3>
          <p>
            The first numbered report applies the method to 38 hikes within a 93-session field
            record, preserving temperature, terrain, wind, surface conditions, pace, heart rate,
            and overnight observations alongside the interpretation.
          </p>
          <p><Link href="/works">See Ella&apos;s complete body of work →</Link></p>
        </article>
      </section>
    </main>
  )
}
