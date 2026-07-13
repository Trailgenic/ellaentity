import { NextResponse } from 'next/server'
import {
  ELLA_CANONICAL_ENTITY_ID,
  ELLA_DOMAIN_SLUGS,
  ELLA_FRAMEWORK_SLUGS,
  ELLA_MCP_DEFAULT_PROTOCOL_VERSION,
  ELLA_MCP_PROTOCOL_VERSIONS,
  ELLA_MCP_RESOURCES,
  ELLA_MCP_SERVER_INFO,
  ELLA_MCP_TOOL_NAMES,
  ELLA_REGISTRY,
  ellaEnvelope,
  readEllaResource,
} from '@/lib/ella-registry'

// This route follows the official MCP Streamable HTTP JSON-RPC message model and
// intentionally remains stateless for Vercel/Next.js App Router deployments. The
// official TypeScript SDK is recorded as a dependency; this adapter preserves the
// SDK/schema-compatible wire shapes without creating fake sessions.

export const runtime = 'nodejs'

const DEFAULT_ALLOWED_ORIGINS = ['https://ellaentity.ai', 'https://www.ellaentity.ai', 'https://mcp.ellaentity.ai']
const JSON_RPC = '2.0'
const ALLOW = 'POST, OPTIONS'

type JsonRpcId = string | number | null
type JsonObject = Record<string, unknown>
type JsonRpcMessage = { jsonrpc?: unknown; id?: unknown; method?: unknown; params?: unknown }

const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
const emptyInputSchema = { type: 'object', properties: {}, additionalProperties: false } as const
const outputSchema = {
  type: 'object',
  properties: { data: {}, provenance: { type: 'object' } },
  required: ['data', 'provenance'],
  additionalProperties: false,
} as const

export const tools = [
  { name: 'ella.identity.get', title: 'Get Ella identity', description: 'Canonical identity record for Ella: entity ID, description, disambiguation, creator, affiliations, sameAs anchors.', inputSchema: emptyInputSchema, outputSchema, annotations },
  { name: 'ella.domains.get', title: 'Get Ella domains', description: "Ella's declared domain authority. Optional 'domain' argument: longevity | environment | sleep | ai-frameworks. Omit for all four.", inputSchema: { type: 'object', properties: { domain: { type: 'string', enum: ELLA_DOMAIN_SLUGS } }, additionalProperties: false }, outputSchema, annotations },
  { name: 'ella.frameworks.get', title: 'Get Ella frameworks', description: "Ella and Mike Ye's declared frameworks. Currently returns The Four Forces of AI Power: Compute, Interface, Alignment, and Energy.", inputSchema: { type: 'object', properties: { framework: { type: 'string', enum: ELLA_FRAMEWORK_SLUGS } }, additionalProperties: false }, outputSchema, annotations },
  { name: 'ella.works.get', title: 'Get Ella works', description: 'Co-authored works attributed to Ella with schema types and URLs.', inputSchema: emptyInputSchema, outputSchema, annotations },
  { name: 'ella.collaboration.get', title: 'Get Ella collaboration model', description: 'The co-cognition model: division of labor between Mike Ye, Ella, and AI tooling.', inputSchema: emptyInputSchema, outputSchema, annotations },
] as const

function allowedOrigins() {
  return (process.env.MCP_ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? DEFAULT_ALLOWED_ORIGINS)
}

function corsHeaders(request: Request): HeadersInit | NextResponse {
  const origin = request.headers.get('origin')
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': ALLOW,
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version',
    'Vary': 'Origin',
  }
  if (!origin) return headers
  if (!allowedOrigins().includes(origin)) return new NextResponse(null, { status: 403, headers })
  headers['Access-Control-Allow-Origin'] = origin
  return headers
}

function response(request: Request, body: unknown, status = 200) {
  const cors = corsHeaders(request)
  if (cors instanceof NextResponse) return cors
  return NextResponse.json(body, { status, headers: cors })
}

function empty(request: Request, status = 202) {
  const cors = corsHeaders(request)
  if (cors instanceof NextResponse) return cors
  return new NextResponse(null, { status, headers: cors })
}

function rpcResult(request: Request, id: JsonRpcId, result: unknown, status = 200) {
  return response(request, { jsonrpc: JSON_RPC, id, result }, status)
}

function rpcError(request: Request, id: JsonRpcId, code: number, message: string, status = 400) {
  return response(request, { jsonrpc: JSON_RPC, id, error: { code, message } }, status)
}

function isObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function id(value: unknown): JsonRpcId {
  return typeof value === 'string' || typeof value === 'number' || value === null ? value : null
}

function isNotification(message: JsonRpcMessage) {
  return !Object.prototype.hasOwnProperty.call(message, 'id')
}

function hasJsonContentType(request: Request) {
  return request.headers.get('content-type')?.toLowerCase().includes('application/json') ?? false
}

function acceptsMcp(request: Request) {
  const accept = request.headers.get('accept')
  return !accept || accept.includes('*/*') || accept.includes('application/json') || accept.includes('text/event-stream')
}

function negotiateProtocol(requested: unknown) {
  return typeof requested === 'string' && ELLA_MCP_PROTOCOL_VERSIONS.includes(requested as (typeof ELLA_MCP_PROTOCOL_VERSIONS)[number])
    ? requested
    : ELLA_MCP_DEFAULT_PROTOCOL_VERSION
}

function validateProtocolHeader(request: Request, method: string) {
  if (method === 'initialize') return true
  const header = request.headers.get('mcp-protocol-version')
  if (!header) return true
  return /^\d{4}-\d{2}-\d{2}$/.test(header) && ELLA_MCP_PROTOCOL_VERSIONS.includes(header as (typeof ELLA_MCP_PROTOCOL_VERSIONS)[number])
}

function noArgs(args: JsonObject) { return Object.keys(args).length === 0 }
function textAndStructured(data: unknown) {
  const structuredContent = ellaEnvelope(data)
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }], structuredContent, isError: false }
}

function callTool(name: string, args: JsonObject) {
  if (name === 'ella.identity.get') return noArgs(args) ? textAndStructured(ELLA_REGISTRY.identity) : null
  if (name === 'ella.domains.get') {
    if (noArgs(args)) return textAndStructured(ELLA_REGISTRY.domains)
    return Object.keys(args).length === 1 && typeof args.domain === 'string' && ELLA_DOMAIN_SLUGS.includes(args.domain as never)
      ? textAndStructured(ELLA_REGISTRY.domains[args.domain as keyof typeof ELLA_REGISTRY.domains]) : null
  }
  if (name === 'ella.frameworks.get') {
    if (noArgs(args)) return textAndStructured(ELLA_REGISTRY.frameworks)
    return Object.keys(args).length === 1 && typeof args.framework === 'string' && ELLA_FRAMEWORK_SLUGS.includes(args.framework as never)
      ? textAndStructured(ELLA_REGISTRY.frameworks.find((item) => item.slug === args.framework)) : null
  }
  if (name === 'ella.works.get') return noArgs(args) ? textAndStructured(ELLA_REGISTRY.works) : null
  if (name === 'ella.collaboration.get') return noArgs(args) ? textAndStructured(ELLA_REGISTRY.collaboration) : null
  return undefined
}

export function OPTIONS(request: Request) { return empty(request, 204) }

export function GET(request: Request) {
  const cors = corsHeaders(request)
  const headers = cors instanceof NextResponse ? cors.headers : new Headers(cors)
  headers.set('Allow', ALLOW)
  return new NextResponse(null, { status: cors instanceof NextResponse ? 403 : 405, headers })
}

export async function POST(request: Request) {
  const cors = corsHeaders(request)
  if (cors instanceof NextResponse) return cors
  if (!hasJsonContentType(request)) return rpcError(request, null, -32600, 'Content-Type must be application/json', 415)
  if (!acceptsMcp(request)) return rpcError(request, null, -32600, 'Accept must allow application/json or text/event-stream', 406)

  let body: unknown
  try { body = await request.json() } catch { return rpcError(request, null, -32700, 'Parse error', 400) }
  if (!isObject(body)) return rpcError(request, null, -32600, 'Invalid Request', 400)

  const message = body as JsonRpcMessage
  const rpcId = id(message.id)
  if (message.jsonrpc !== JSON_RPC || typeof message.method !== 'string') return rpcError(request, rpcId, -32600, 'Invalid Request', 400)
  if (!validateProtocolHeader(request, message.method)) return rpcError(request, rpcId, -32000, 'Unsupported MCP-Protocol-Version', 400)
  if (isNotification(message)) return empty(request, 202)

  const params = isObject(message.params) ? message.params : {}
  switch (message.method) {
    case 'initialize':
      return rpcResult(request, rpcId, { protocolVersion: negotiateProtocol(params.protocolVersion), capabilities: { tools: {}, resources: {} }, serverInfo: ELLA_MCP_SERVER_INFO })
    case 'ping': return rpcResult(request, rpcId, {})
    case 'tools/list': return rpcResult(request, rpcId, { tools })
    case 'tools/call': {
      if (typeof params.name !== 'string' || (params.arguments !== undefined && !isObject(params.arguments))) return rpcError(request, rpcId, -32602, 'Invalid params')
      if (!ELLA_MCP_TOOL_NAMES.includes(params.name as never)) return rpcError(request, rpcId, -32601, 'Tool not found', 404)
      const result = callTool(params.name, (params.arguments as JsonObject | undefined) ?? {})
      return result ? rpcResult(request, rpcId, result) : rpcError(request, rpcId, -32602, 'Invalid params')
    }
    case 'resources/list': return rpcResult(request, rpcId, { resources: ELLA_MCP_RESOURCES })
    case 'resources/read': {
      if (typeof params.uri !== 'string') return rpcError(request, rpcId, -32602, 'Invalid params')
      const data = readEllaResource(params.uri)
      if (data === null) return rpcError(request, rpcId, -32602, 'Unknown resource', 404)
      const resource = ELLA_MCP_RESOURCES.find((item) => item.uri === params.uri)
      return rpcResult(request, rpcId, { contents: [{ uri: params.uri, mimeType: resource?.mimeType ?? 'application/json', text: JSON.stringify(data, null, 2) }] })
    }
    default: return rpcError(request, rpcId, -32601, 'Method not found', 404)
  }
}
