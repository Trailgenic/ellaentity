import { NextResponse } from 'next/server'
import { handleEllaMcpPost } from '../../lib/ella-mcp-server'

export const runtime = 'nodejs'

const DEFAULT_ALLOWED_ORIGINS = ['https://ellaentity.ai', 'https://www.ellaentity.ai', 'https://mcp.ellaentity.ai']
const ALLOW_METHODS = 'POST, OPTIONS'
const ALLOW_HEADERS = 'Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version'
const ACCEPTED_RESPONSE_TYPES = ['application/json', 'text/event-stream'] as const

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

function hasCompatibleAcceptType(request: Request) {
  const accept = request.headers.get('accept')?.toLowerCase()

  if (!accept) {
    return true
  }

  return accept.includes('*/*') || ACCEPTED_RESPONSE_TYPES.some((type) => accept.includes(type))
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

  headers.set('Allow', ALLOW_METHODS)

  return new NextResponse(null, {
    status: cors instanceof NextResponse ? 403 : 405,
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

  if (!hasCompatibleAcceptType(request)) {
    return jsonRpcError(request, 406, -32600, 'Accept must include application/json, text/event-stream, or */*')
  }

  try {
    const sdkResponse = await handleEllaMcpPost(request)
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
