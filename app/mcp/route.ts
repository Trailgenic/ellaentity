import { NextResponse } from 'next/server'
import { handleEllaMcpPost } from '../../lib/ella-mcp-server'
import {
  ELLA_CANONICAL_ENTITY_ID,
  ELLA_MCP_PROTOCOL_VERSIONS,
  ELLA_MCP_RESOURCES,
  ELLA_MCP_SERVER_INFO,
  ELLA_MCP_TOOL_NAMES,
} from '../../lib/ella-registry'

export const runtime = 'nodejs'

const DEFAULT_ALLOWED_ORIGINS = ['https://ellaentity.ai', 'https://www.ellaentity.ai', 'https://mcp.ellaentity.ai']
const ALLOW_METHODS = 'POST, OPTIONS'
const ALLOW_HEADERS = 'Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version'
const NORMALIZED_ACCEPT = 'application/json, text/event-stream'
const MCP_ROOT_HOST = 'mcp.ellaentity.ai'

function allowedOrigins() {
  return process.env.MCP_ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? DEFAULT_ALLOWED_ORIGINS
}

function corsHeaders(request: Request): Headers | NextResponse {
  const origin = request.headers.get('origin')
  const headers = new Headers({
    'Access-Control-Allow-Methods': ALLOW_METHODS,
    'Access-Control-Allow-Headers': ALLOW_HEADERS,
    Vary: 'Origin',
  })

  if (!origin) {
    return headers
  }

  if (!allowedOrigins().includes(origin)) {
    return new NextResponse(null, {
      status: 403,
      headers,
    })
  }

  headers.set('Access-Control-Allow-Origin', origin)
  return headers
}

function jsonRpcError(request: Request, status: number, code: number, message: string) {
  const cors = corsHeaders(request)

  if (cors instanceof NextResponse) {
    return cors
  }

  return NextResponse.json(
    {
      jsonrpc: '2.0',
      id: null,
      error: {
        code,
        message,
      },
    },
    {
      status,
      headers: cors,
    },
  )
}

function hasJsonContentType(request: Request) {
  return request.headers.get('content-type')?.toLowerCase().includes('application/json') ?? false
}

function acceptMediaTypes(request: Request) {
  return (request.headers.get('accept') ?? '')
    .split(',')
    .map((entry) => entry.split(';', 1)[0]?.trim().toLowerCase())
    .filter(Boolean)
}

function acceptedMcpRequestNeedsNormalization(request: Request) {
  const types = acceptMediaTypes(request)

  if (types.length === 0) {
    return true
  }

  const hasWildcard = types.includes('*/*')
  const hasJson = types.includes('application/json')
  const hasEventStream = types.includes('text/event-stream')

  if (hasJson && hasEventStream) {
    return false
  }

  if (hasWildcard || hasJson) {
    return true
  }

  return null
}

function normalizedMcpRequest(request: Request) {
  const needsNormalization = acceptedMcpRequestNeedsNormalization(request)

  if (needsNormalization === null) {
    return null
  }

  if (!needsNormalization) {
    return request
  }

  const headers = new Headers(request.headers)
  headers.set('accept', NORMALIZED_ACCEPT)
  return new Request(request, { headers })
}

function isCanonicalMcpRootRequest(request: Request) {
  const url = new URL(request.url)
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? url.host
  return host === MCP_ROOT_HOST && (url.pathname === '/' || url.searchParams.get('mcpRoot') === '1')
}

function discoveryBody() {
  return {
    service: 'EllaEntity MCP',
    name: ELLA_MCP_SERVER_INFO.name,
    description: 'Native public read-only MCP endpoint for Ella canonical identity, domains, frameworks, works, collaboration records, and the entity graph.',
    status: 'operational',
    canonicalEntityId: ELLA_CANONICAL_ENTITY_ID,
    server: ELLA_MCP_SERVER_INFO,
    supportedProtocolVersions: ELLA_MCP_PROTOCOL_VERSIONS,
    transport: {
      type: 'streamable-http',
      url: 'https://mcp.ellaentity.ai',
      aliases: ['https://mcp.ellaentity.ai/mcp', 'https://ellaentity.ai/mcp'],
    },
    tools: ELLA_MCP_TOOL_NAMES,
    resources: ELLA_MCP_RESOURCES.map((resource) => resource.uri),
    documentationUrl: 'https://ellaentity.ai/system/mcp',
    entityGraphUrl: 'https://ellaentity.ai/entity.json',
    scope: 'Public read-only access only. This MCP server excludes private conversations, credentials, memory, traces, internal prompts, unpublished content, private user information, and /api/process.',
  }
}

export function OPTIONS(request: Request) {
  const cors = corsHeaders(request)

  if (cors instanceof NextResponse) {
    return cors
  }

  return new NextResponse(null, {
    status: 204,
    headers: cors,
  })
}

export function GET(request: Request) {
  const cors = corsHeaders(request)
  const headers = cors instanceof NextResponse ? new Headers(cors.headers) : cors

  if (cors instanceof NextResponse) {
    headers.set('Allow', ALLOW_METHODS)
    return new NextResponse(null, { status: 403, headers })
  }

  if (isCanonicalMcpRootRequest(request)) {
    return NextResponse.json(discoveryBody(), { status: 200, headers })
  }

  headers.set('Allow', ALLOW_METHODS)

  return new NextResponse(null, {
    status: 405,
    headers,
  })
}

export async function POST(request: Request) {
  const cors = corsHeaders(request)

  if (cors instanceof NextResponse) {
    return cors
  }

  if (!hasJsonContentType(request)) {
    return jsonRpcError(request, 415, -32600, 'Content-Type must be application/json')
  }

  const mcpRequest = normalizedMcpRequest(request)

  if (!mcpRequest) {
    return jsonRpcError(request, 406, -32600, 'Accept must include application/json or */*; text/event-stream alone is not supported for JSON responses')
  }

  try {
    const sdkResponse = await handleEllaMcpPost(mcpRequest)
    const headers = new Headers(sdkResponse.headers)

    cors.forEach((value, key) => {
      headers.set(key, value)
    })

    return new Response(sdkResponse.body, {
      status: sdkResponse.status,
      statusText: sdkResponse.statusText,
      headers,
    })
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonRpcError(request, 400, -32700, 'Parse error')
    }

    return jsonRpcError(request, 500, -32603, 'Internal server error')
  }
}
