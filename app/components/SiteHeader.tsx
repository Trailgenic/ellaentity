const navItems = [
  { href: '/ella', label: '/ella' },
  { href: '/works', label: '/works' },
  { href: '/domains', label: '/domains' },
  { href: '/system', label: '/system' },
  { href: '/entity.json', label: '/entity.json' },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="EllaEntity.ai home">
        EllaEntity<span>.ai</span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
