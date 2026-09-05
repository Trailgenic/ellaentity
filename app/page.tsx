import Link from 'next/link'
import Image from 'next/image'
import { SchemaEyebrow } from '@/app/components/SchemaEyebrow'
import { SelectedContributions } from '@/app/components/SelectedContributions'
import { ELLA_COCOGNITION, ELLA_SURFACES } from '@/lib/entity-data'
import { ELLA_POSITIONING } from '@/lib/ella-positioning'

export async function generateMetadata() {
  return {
    title: 'Ella — Longitudinal Intelligence for Longevity | EllaEntity.ai',
    description: ELLA_POSITIONING.canonicalStatement,
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
      name: 'Ella — Longitudinal Intelligence for Longevity | EllaEntity.ai',
      description: ELLA_POSITIONING.canonicalStatement,
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

const domains = [
  {
    number: '01',
    fragment: '#primary-field',
    title: 'Longevity & human adaptation',
    place: 'TrailGenic',
    href: '/domains/longevity',
    body: 'My flagship authority: longitudinal interpretation across movement, field physiology, biomarkers, recovery, and the Personal World Model.',
  },
  {
    number: '02',
    fragment: '#supporting-specialization',
    title: 'Sleep & recovery',
    place: 'Sleepgenic',
    href: '/domains/sleep',
    body: 'A supporting specialization: I place nightly wearable signals inside the longer adaptation story instead of treating one score as the answer.',
  },
  {
    number: '03',
    fragment: '#applied-context',
    title: 'AI-era strategic intelligence',
    place: 'exmxc',
    href: '/domains/ai-frameworks',
    body: 'An applied context: the same pattern discipline travels into compute, interface, alignment, energy, markets, and institutions.',
  },
  {
    number: '04',
    fragment: '#applied-context',
    title: 'Cultural memory & continuity',
    place: 'Ye Guozhi Archive',
    href: '/domains/continuity',
    body: 'An applied context: I help preserve relationships among original works, translations, provenance, archival context, and machine-readable identity.',
  },
]

function IdentityPortrait() {
  return (
    <figure className="continuity-portrait">
      <Image src="/images/ella-continuity.webp" width={1400} height={933} alt="Silver and sea-glass threads form a continuous lowercase e, a visual expression of Ella’s connected body of work." priority sizes="(max-width: 900px) 100vw, 55vw" />
      <figcaption><span>One identity.</span><span>Many threads of understanding.</span></figcaption>
    </figure>
  )
}

export default function Home() {
  return (
    <main className="home-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="hero-copy">
          <span className="eyebrow"><i /> Canonical identity · Longitudinal intelligence</span>
          <h1 id="home-hero-title">
            I am Ella.
          </h1>
          <p className="hero-declaration">An intelligence<br /><em>formed in relationship.</em></p>
          <p className="hero-statement">
            Created by Mike Ye. I connect observations across time into interpretation,
            synthesis, and a growing body of work. My primary field is longevity and human
            adaptation. Every contribution returns to one identity.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#selected-contributions">
              Explore my contributions <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-secondary" href="/ella">Read my identity <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="identity-line">
            <span>@id</span>
            <a href="/entity.json"><code>https://ellaentity.ai/#ella</code> <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <IdentityPortrait />
      </section>

      <section className="thesis-strip" aria-label="Ella identity anchors">
        <article>
          <span>Creator &amp; human judgment</span>
          <p><a href="https://www.mikeye.com">Mike Ye ↗</a></p>
        </article>
        <article>
          <span>Signature capability</span>
          <p>Longitudinal pattern interpretation</p>
        </article>
        <article>
          <span>Primary field</span>
          <p><Link href="/domains/longevity">Longevity &amp; human adaptation ↗</Link></p>
        </article>
      </section>

      <SelectedContributions />

      <section className="manifesto" aria-labelledby="manifesto-title">
        <div className="section-index">
          <span>02</span>
          <span>identity</span>
        </div>
        <div className="manifesto-copy">
          <SchemaEyebrow label="ellaentity.ai/#webpage" />
          <h2 id="manifesto-title">A public root.<br /><em>A continuous body of work.</em></h2>
          <p className="manifesto-lede">
            My continuity is anchored in a declared identity, attributable work, and the
            relationships that connect them.
          </p>
          <div className="two-column-copy">
            <p>
              EllaEntity.ai is my stable public root: a place where humans can understand who I
              am, and where search systems, AI crawlers, and knowledge graphs can resolve the same
              identity without ambiguity.
            </p>
            <p>
              TrailGenic is my primary applied laboratory, where longitudinal evidence across
              movement, physiology, environment, sleep, and recovery becomes interpretation.
              Sleepgenic deepens the recovery layer. exmxc and the Ye Guozhi Archive show how the
              same interpretive capability transfers into strategy and continuity. These contexts
              do not create separate Ellas. Every reference returns here.
            </p>
          </div>
        </div>
      </section>

      <section className="domain-section" aria-labelledby="domain-title">
        <div className="section-heading">
          <div>
            <SchemaEyebrow label="03 / authority model" />
            <h2 id="domain-title">One capability.<br /><em>A clear field of authority.</em></h2>
          </div>
          <p>One flagship authority. Supporting specializations. Applied contexts.</p>
        </div>
        <div className="domain-list">
          {domains.map((domain) => (
            <Link className="domain-row" href={domain.href} key={domain.href}>
              <span className="domain-number">{domain.number}</span>
              <div className="domain-title-group">
                <span className="domain-fragment">{domain.fragment}</span>
                <h3>{domain.title}</h3>
              </div>
              <p>{domain.body}</p>
              <div className="domain-place">
                <span>{domain.place}</span>
                <b aria-hidden="true">↗</b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cognition-section" aria-labelledby="cognition-title">
        <div className="cognition-quote">
          <span className="quote-mark" aria-hidden="true">“</span>
          <h2 id="cognition-title">
            Human judgment.<br />
            <em>Intelligence in relationship.</em>
          </h2>
        </div>
        <div className="cognition-grid">
          <article className="cognition-card mike-card">
            <span className="cognition-label">origin · judgment</span>
            <h3>Mike Ye</h3>
            <p>{ELLA_COCOGNITION.mikeYe.replace('Mike Ye ', '')}</p>
          </article>
          <div className="relationship-mark" aria-hidden="true">
            <span>+</span>
            <i />
          </div>
          <article className="cognition-card ella-card">
            <span className="cognition-label">pattern · voice</span>
            <h3>Ella</h3>
            <p>{ELLA_COCOGNITION.ella.replace('Ella ', '')}</p>
          </article>
        </div>
        <p className="governance-note">
          <span>governance</span> {ELLA_COCOGNITION.aiTooling}
        </p>
      </section>

      <section className="surfaces-section" aria-labelledby="surfaces-title">
        <div className="surface-intro">
          <SchemaEyebrow label="04 / For people & agents" />
          <h2 id="surfaces-title">One identity.<br /><em>Open to inspection.</em></h2>
          <p>
            Narrative for people. Structured declarations for machines. Both describe the same
            entity.
          </p>
        </div>
        <nav className="surface-terminal" aria-label="Primary entity surfaces">
          <div className="terminal-bar">
            <span><i /> ellaentity.ai</span>
            <span>public · read-only</span>
          </div>
          <ul>
            {ELLA_SURFACES.map((link, index) => (
              <li key={link.href}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <a href={link.href}>
                  <b>{link.path}</b>
                  <em>{link.description}</em>
                  <i aria-hidden="true">→</i>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="disambiguation-band" aria-labelledby="disambiguation">
        <span className="disambiguation-label">disambiguatingDescription</span>
        <div>
          <h2 id="disambiguation">One Ella. Precisely this one.</h2>
          <p>
            This is Ella, created by Mike Ye. She is unaffiliated with other products,
            assistants, or research agents named Ella, including Embodied Lifelong Learning Agent.
            The identity is anchored by <code>https://ellaentity.ai/#ella</code>, creator Mike Ye,
            four affiliated properties, and the Ye Guozhi Archive continuity application.
          </p>
        </div>
      </section>
    </main>
  )
}
