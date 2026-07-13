import { NextResponse } from 'next/server'
import { ellaEntityGraph } from '@/lib/ella-registry'

export function GET() {
  return NextResponse.json(ellaEntityGraph(), {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
