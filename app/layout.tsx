import type { Metadata } from 'next'
import { Fragment_Mono, Newsreader, Young_Serif } from 'next/font/google'
import { RidgeFooter } from '@/app/components/RidgeFooter'
import { SiteHeader } from '@/app/components/SiteHeader'
import { ELLA_GLOBAL_SCHEMA, ELLA_ORG_SCHEMA } from '@/app/schema/ella'
import './globals.css'

const display = Young_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const body = Newsreader({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
})

const machine = Fragment_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-machine',
})

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
    <html lang="en" className={`${display.variable} ${body.variable} ${machine.variable}`}>
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
      <body>
        <SiteHeader />
        {children}
        <RidgeFooter />
      </body>
    </html>
  )
}
