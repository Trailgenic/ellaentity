export function RidgeFooter() {
  return (
    <footer className="ridge-footer">
      <svg
        className="ridge-svg"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ridge-alpenglow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="28%" stopColor="var(--alpenglow)" stopOpacity="0.22" />
            <stop offset="50%" stopColor="var(--alpenglow-hi)" stopOpacity="0.95" />
            <stop offset="72%" stopColor="var(--alpenglow)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M0 122 L95 102 L178 118 L278 72 L363 107 L472 56 L558 100 L650 82 L748 32 L858 96 L948 70 L1058 112 L1162 62 L1260 96 L1345 78 L1440 104 L1440 220 L0 220 Z"
          fill="var(--twilight)"
        />
        <path
          d="M0 122 L95 102 L178 118 L278 72 L363 107 L472 56 L558 100 L650 82 L748 32 L858 96 L948 70 L1058 112 L1162 62 L1260 96 L1345 78 L1440 104"
          fill="none"
          stroke="url(#ridge-alpenglow)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 162 L132 126 L234 148 L348 108 L462 142 L584 94 L710 145 L814 118 L922 154 L1030 104 L1135 138 L1250 112 L1366 152 L1440 130 L1440 220 L0 220 Z"
          fill="var(--twilight-deep)"
        />
      </svg>
      <div className="footer-colophon">
        declared once · referenced everywhere —{' '}
        <a href="/entity.json">entity.json</a> · created by{' '}
        <a href="https://www.mikeye.com">Mike Ye</a>
      </div>
    </footer>
  )
}
