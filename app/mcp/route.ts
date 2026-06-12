import { NextResponse } from 'next/server'
import {
  ELLA_COCOGNITION,
  ELLA_DOMAINS,
  ELLA_FRAMEWORKS,
  ELLA_IDENTITY,
  ELLA_SURFACES,
  ELLA_WORKS,
} from '@/lib/entity-data'

const PROTOCOL_VERSION = '2025-06-18'
const SERVER_INFO = { name: 'ellaentity-mcp', version: '1.0.0' }
const TOOL_NAMES = [
  'ella.identity.get',
  'ella.domains.get',
  'ella.frameworks.get',
  'ella.works.get',
  'ella.collaboration.get',
] as const
const DOMAIN_NAMES = ['longevity', 'environment', 'sleep', 'ai-frameworks'] as const
const FRAMEWORK_SLUGS = ['four-forces-of-ai-power'] as const

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Mcp-Session-Id, MCP-Protocol-Version',
}

type JsonRpcId = string | number | null
type JsonObject = Record<string, unknown>

type JsonRpcRequest = {
  jsonrpc?: unknown
  id?: unknown
  method?: unknown
  params?: unknown
}

const tools = [
  {
    name: 'ella.identity.get',
    description:
      'Canonical identity record for Ella: entity ID, description, disambiguation, creator, affiliations, sameAs anchors.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'ella.domains.get',
    description:
      "Ella's declared domain authority. Optional 'domain' argument: longevity | environment | sleep | ai-frameworks. Omit for all four.",
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', enum: DOMAIN_NAMES },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'ella.frameworks.get',
    description:
      "Ella and Mike Ye's declared frameworks. Currently returns The Four Forces of AI Power: Compute, Interface, Alignment, and Energy.",
    inputSchema: {
      type: 'object',
      properties: {
        framework: { type: 'string', enum: FRAMEWORK_SLUGS },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'ella.works.get',
    description: 'Co-authored works attributed to Ella with schema types and URLs.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'ella.collaboration.get',
    description: 'The co-cognition model: division of labor between Mike Ye, Ella, and AI tooling.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
] as const

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: corsHeaders })
}

function emptyResponse(status = 202) {
  return new NextResponse(null, { status, headers: corsHeaders })
}

function normalizeId(id: unknown): JsonRpcId {
  return typeof id === 'string' || typeof id === 'number' || id === null ? id : null
}

function rpcResult(id: JsonRpcId, result: unknown) {
  return jsonResponse({ jsonrpc: '2.0', id, result })
}

function rpcError(id: JsonRpcId, code: number, message: string) {
  return jsonResponse({ jsonrpc: '2.0', id, error: { code, message } })
}

function isJsonObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function readParams(params: unknown): JsonObject {
  return isJsonObject(params) ? params : {}
}

function noUnexpectedArguments(args: JsonObject): boolean {
  return Object.keys(args).length === 0
}

function toolContent(payload: unknown) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(payload, null, 2),
      },
    ],
  }
}

function callTool(name: unknown, args: JsonObject) {
  if (name === 'ella.identity.get') {
    return noUnexpectedArguments(args) ? toolContent(ELLA_IDENTITY) : null
  }

  if (name === 'ella.domains.get') {
    const keys = Object.keys(args)
    const domain = args.domain

    if (keys.length === 0) {
      return toolContent(ELLA_DOMAINS)
    }

    if (
      keys.length === 1 &&
      typeof domain === 'string' &&
      DOMAIN_NAMES.includes(domain as (typeof DOMAIN_NAMES)[number])
    ) {
      return toolContent(ELLA_DOMAINS[domain as keyof typeof ELLA_DOMAINS])
    }

    return null
  }

  if (name === 'ella.frameworks.get') {
    const keys = Object.keys(args)
    const framework = args.framework

    if (keys.length === 0) {
      return toolContent(ELLA_FRAMEWORKS)
    }

    if (
      keys.length === 1 &&
      typeof framework === 'string' &&
      FRAMEWORK_SLUGS.includes(framework as (typeof FRAMEWORK_SLUGS)[number])
    ) {
      return toolContent(ELLA_FRAMEWORKS.find((item) => item.slug === framework))
    }

    return null
  }

  if (name === 'ella.works.get') {
    return noUnexpectedArguments(args) ? toolContent(ELLA_WORKS) : null
  }

  if (name === 'ella.collaboration.get') {
    return noUnexpectedArguments(args)
      ? toolContent({ coCognition: ELLA_COCOGNITION, surfaces: ELLA_SURFACES })
      : null
  }

  return null
}

export function OPTIONS() {
  return emptyResponse(204)
}

export function GET() {
  return jsonResponse({
    name: SERVER_INFO.name,
    description: 'Read-only MCP server for the canonical Ella identity layer.',
    canonicalEntity: 'https://ellaentity.ai/#ella',
    transport: 'streamable-http',
    tools: [...TOOL_NAMES],
    documentation: 'https://ellaentity.ai/system/mcp',
  })
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return rpcError(null, -32700, 'Parse error')
  }

  if (!isJsonObject(body)) {
    return rpcError(null, -32600, 'Invalid Request')
  }

  const rpcRequest = body as JsonRpcRequest
  const id = normalizeId(rpcRequest.id)

  if (rpcRequest.jsonrpc !== '2.0' || typeof rpcRequest.method !== 'string') {
    return rpcError(id, -32600, 'Invalid Request')
  }

  if (rpcRequest.method === 'notifications/initialized') {
    return emptyResponse(202)
  }

  if (rpcRequest.method === 'initialize') {
    const params = readParams(rpcRequest.params)
    const requestedProtocolVersion =
      typeof params.protocolVersion === 'string' ? params.protocolVersion : PROTOCOL_VERSION

    return rpcResult(id, {
      protocolVersion: requestedProtocolVersion,
      capabilities: { tools: {} },
      serverInfo: SERVER_INFO,
    })
  }

  if (rpcRequest.method === 'ping') {
    return rpcResult(id, {})
  }

  if (rpcRequest.method === 'tools/list') {
    return rpcResult(id, { tools })
  }

  if (rpcRequest.method === 'tools/call') {
    const params = readParams(rpcRequest.params)
    const args = params.arguments

    if (typeof params.name !== 'string' || (args !== undefined && !isJsonObject(args))) {
      return rpcError(id, -32602, 'Invalid params')
    }

    const toolArgs: JsonObject = args === undefined ? {} : args
    const result = callTool(params.name, toolArgs)

    if (!result) {
      return rpcError(id, -32602, 'Invalid params')
    }

    return rpcResult(id, result)
  }

  return rpcError(id, -32601, 'Method not found')
}
