import Link from 'next/link'

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
        <span className="wordmark-sigil">E</span>
        <span className="wordmark-text">EllaEntity<em>.ai</em></span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a className="machine-link" href="/entity.json">
        <span><i /> entity resolved</span>
        <b aria-hidden="true">{`{ }`}</b>
      </a>
    </header>
  )
}
