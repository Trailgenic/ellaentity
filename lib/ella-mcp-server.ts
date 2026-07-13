import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import type { CallToolResult, ReadResourceResult } from '@modelcontextprotocol/sdk/types.js'
import { ELLA_MCP_INPUT_SCHEMAS, ELLA_MCP_OUTPUT_SCHEMAS } from './ella-mcp-schemas'
import {
  ELLA_DOMAIN_SLUGS,
  ELLA_FRAMEWORK_SLUGS,
  ELLA_MCP_RESOURCES,
  ELLA_MCP_SERVER_INFO,
  ELLA_MCP_TOOL_NAMES,
  ELLA_REGISTRY,
  ellaEnvelope,
  readEllaResource,
} from './ella-registry'

type ResourceRecord = (typeof ELLA_MCP_RESOURCES)[number]

const TOOL_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const

function textAndStructured(data: unknown): CallToolResult {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
    structuredContent: ellaEnvelope(data),
    isError: false,
  }
}

function resourceContents(resource: ResourceRecord, data: unknown): ReadResourceResult {
  return {
    contents: [
      {
        uri: resource.uri,
        mimeType: resource.mimeType,
        text: JSON.stringify(data, null, 2),
      },
    ],
  }
}

export function createEllaMcpServer() {
  const server = new McpServer(ELLA_MCP_SERVER_INFO, {
    capabilities: {
      tools: {},
      resources: {},
    },
  })

  server.registerTool(
    'ella.identity.get',
    {
      title: 'Get Ella identity',
      description:
        'Canonical identity record for Ella: entity ID, description, disambiguation, creator, affiliations, sameAs anchors.',
      inputSchema: ELLA_MCP_INPUT_SCHEMAS.empty,
      outputSchema: ELLA_MCP_OUTPUT_SCHEMAS.identity,
      annotations: TOOL_ANNOTATIONS,
    },
    async () => textAndStructured(ELLA_REGISTRY.identity),
  )

  server.registerTool(
    'ella.domains.get',
    {
      title: 'Get Ella domains',
      description:
        "Ella's declared domain authority. Optional 'domain' argument: longevity | environment | sleep | ai-frameworks. Omit for all four.",
      inputSchema: ELLA_MCP_INPUT_SCHEMAS.domains,
      outputSchema: ELLA_MCP_OUTPUT_SCHEMAS.domains,
      annotations: TOOL_ANNOTATIONS,
    },
    async ({ domain }: { domain?: (typeof ELLA_DOMAIN_SLUGS)[number] }) => {
      if (domain) {
        return textAndStructured(ELLA_REGISTRY.domains[domain])
      }

      return textAndStructured(ELLA_REGISTRY.domains)
    },
  )

  server.registerTool(
    'ella.frameworks.get',
    {
      title: 'Get Ella frameworks',
      description:
        "Ella and Mike Ye's declared frameworks. Currently returns The Four Forces of AI Power: Compute, Interface, Alignment, and Energy.",
      inputSchema: ELLA_MCP_INPUT_SCHEMAS.frameworks,
      outputSchema: ELLA_MCP_OUTPUT_SCHEMAS.frameworks,
      annotations: TOOL_ANNOTATIONS,
    },
    async ({ framework }: { framework?: (typeof ELLA_FRAMEWORK_SLUGS)[number] }) => {
      if (framework) {
        return textAndStructured(ELLA_REGISTRY.frameworks.find((item) => item.slug === framework))
      }

      return textAndStructured(ELLA_REGISTRY.frameworks)
    },
  )

  server.registerTool(
    'ella.works.get',
    {
      title: 'Get Ella works',
      description: 'Co-authored works attributed to Ella with schema types and URLs.',
      inputSchema: ELLA_MCP_INPUT_SCHEMAS.empty,
      outputSchema: ELLA_MCP_OUTPUT_SCHEMAS.works,
      annotations: TOOL_ANNOTATIONS,
    },
    async () => textAndStructured(ELLA_REGISTRY.works),
  )

  server.registerTool(
    'ella.collaboration.get',
    {
      title: 'Get Ella collaboration model',
      description: 'The co-cognition model: division of labor between Mike Ye, Ella, and AI tooling.',
      inputSchema: ELLA_MCP_INPUT_SCHEMAS.empty,
      outputSchema: ELLA_MCP_OUTPUT_SCHEMAS.collaboration,
      annotations: TOOL_ANNOTATIONS,
    },
    async () => textAndStructured(ELLA_REGISTRY.collaboration),
  )

  for (const resource of ELLA_MCP_RESOURCES) {
    server.registerResource(
      resource.name,
      resource.uri,
      {
        title: resource.name,
        description: resource.description,
        mimeType: resource.mimeType,
      },
      async () => {
        const data = readEllaResource(resource.uri)

        if (data === null) {
          throw new Error(`Resource ${resource.uri} not found`)
        }

        return resourceContents(resource, data)
      },
    )
  }

  return server
}

export async function handleEllaMcpPost(request: Request): Promise<Response> {
  const server = createEllaMcpServer()
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })

  await server.connect(transport)

  try {
    return await transport.handleRequest(request)
  } finally {
    await server.close()
  }
}

export { ELLA_DOMAIN_SLUGS, ELLA_FRAMEWORK_SLUGS, ELLA_MCP_TOOL_NAMES }
