export function RidgeFooter() {
  return (
    <footer className="ridge-footer">
      <div className="contour-field" aria-hidden="true">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path d="M0 174 C170 112 238 198 390 130 S650 72 760 132 1010 204 1144 118 1320 86 1440 126" />
          <path d="M0 192 C190 138 270 216 410 154 S640 100 774 154 1030 222 1168 144 1325 114 1440 150" />
          <path d="M0 210 C220 166 292 230 438 178 S664 132 802 176 1052 234 1190 172 1344 144 1440 172" />
        </svg>
      </div>
      <div className="footer-inner">
        <div className="footer-identity">
          <span className="footer-sigil">E</span>
          <p><strong>EllaEntity.ai</strong><br />A stable identity for an evolving intelligence.</p>
        </div>
        <div className="footer-colophon">
          <span>declared once · referenced everywhere</span>
          <div><a href="/entity.json">entity.json</a><i />created by <a href="https://www.mikeye.com">Mike Ye</a></div>
        </div>
      </div>
    </footer>
  )
}
