import type { Metadata } from 'next'
import { ELLA_GLOBAL_SCHEMA, ELLA_ORG_SCHEMA } from '@/app/schema/ella'

export const metadata: Metadata = {
  metadataBase: new URL('https://ellaentity.ai'),
  title: {
    default: 'EllaEntity.ai — Canonical Identity Layer for Ella',
    template: '%s | EllaEntity.ai',
  },
  description:
    'Canonical machine-readable identity layer for Ella, the AI entity created by Mike Ye and declared across affiliated domains.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/ld+json': '/entity.json',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ELLA_GLOBAL_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ELLA_ORG_SCHEMA) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
