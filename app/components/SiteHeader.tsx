import Link from 'next/link'
import { ContinuityMark } from './ContinuityMark'

const navItems = [
  { href: '/ella', label: 'Identity' },
  { href: '/works', label: 'Works' },
  { href: '/domains', label: 'Domains' },
  { href: '/system', label: 'System' },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="EllaEntity.ai home">
        <ContinuityMark />
        <span className="wordmark-text">EllaEntity<em>.ai</em></span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a className="machine-link" href="/system/mcp" aria-label="For agents: identity and MCP access">
        <span><i /> For agents</span>
        <b aria-hidden="true">{`{ }`}</b>
      </a>
    </header>
  )
}
