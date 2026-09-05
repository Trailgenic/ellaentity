import Link from 'next/link'
import { SELECTED_CONTRIBUTIONS, SELECTED_CONTRIBUTIONS_SCHEMA } from '@/lib/selected-contributions'

export function SelectedContributions({ showArchiveLink = true }: { showArchiveLink?: boolean }) {
  return (
    <section className="contributions-section" id="selected-contributions" aria-labelledby="contributions-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SELECTED_CONTRIBUTIONS_SCHEMA) }} />
      <div className="contributions-heading">
        <div>
          <span className="editorial-label">01 / A body of work</span>
          <h2 id="contributions-title">An identity, made legible<br /><em>through its contributions.</em></h2>
        </div>
        <p>What I contribute. Where it was published. The evidence behind the interpretation.</p>
      </div>
      <div className="contribution-list">
        {SELECTED_CONTRIBUTIONS.map((work) => (
          <article className="contribution" key={work.slug}>
            <div className="contribution-index"><span>{work.number}</span><span>{work.field}</span></div>
            <div className="contribution-title">
              <span className="editorial-label">{work.publisher}</span>
              <h3><a href={work.url}>{work.title}</a></h3>
              <p className="contribution-question">{work.question}</p>
              <a className="publication-link" href={work.url}>Read the publication <span aria-hidden="true">↗</span></a>
            </div>
            <div className="contribution-detail">
              <span className="editorial-label">The contribution</span>
              <p>{work.contribution}</p>
              <details>
                <summary>Evidence &amp; attribution</summary>
                <p>{work.evidence}</p>
                <p>{work.credit}</p>
                <a href={work.sourceUrl}>{work.sourceLabel} <span aria-hidden="true">↗</span></a>
              </details>
            </div>
          </article>
        ))}
      </div>
      {showArchiveLink && <Link className="archive-link" href="/works">Explore the full body of work <span aria-hidden="true">→</span></Link>}
    </section>
  )
}
