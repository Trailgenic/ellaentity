import { NextResponse } from 'next/server'
import { ELLA_GLOBAL_SCHEMA, ELLA_ORG_SCHEMA, ELLA_SYSTEM_SCHEMA } from '@/app/schema/ella'

export function GET() {
  const graph = {
    '@context': 'https://schema.org/',
    '@graph': [ELLA_GLOBAL_SCHEMA, ELLA_ORG_SCHEMA, ELLA_SYSTEM_SCHEMA].flatMap((schema) => {
      if (Array.isArray(schema)) {
        return schema.flatMap((entry) => {
          if (entry && typeof entry === 'object' && '@graph' in entry) {
            return (entry as { '@graph': unknown[] })['@graph']
          }
          return [entry]
        })
      }

      if (schema && typeof schema === 'object' && '@graph' in schema) {
        return (schema as { '@graph': unknown[] })['@graph']
      }

      return [schema]
    }),
  }

  return NextResponse.json(graph, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
