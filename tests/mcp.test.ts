import assert from 'node:assert/strict'
import test from 'node:test'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { GET, OPTIONS, POST } from '../app/mcp/route'
import { ELLA_CANONICAL_ENTITY_ID, ELLA_MCP_PROTOCOL_VERSIONS, ELLA_MCP_RESOURCES, ELLA_MCP_SERVER_INFO, ELLA_MCP_TOOL_NAMES } from '../lib/ella-registry'

const endpoint = 'https://ellaentity.ai/mcp'
const mcpRootEndpoint = 'https://mcp.ellaentity.ai/'
const accept = 'application/json, text/event-stream'
const contentType = 'application/json'
const defaultProtocolVersion = ELLA_MCP_PROTOCOL_VERSIONS[0]

function request(method: string, body?: unknown, headers: HeadersInit = {}, protocolVersion: (typeof ELLA_MCP_PROTOCOL_VERSIONS)[number] = defaultProtocolVersion) {
  return new Request(endpoint, {
    method,
    headers: {
      accept,
      'content-type': contentType,
      'mcp-protocol-version': protocolVersion,
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

async function rpc(method: string, params: unknown = {}, id: string | number = 1, headers: HeadersInit = {}, protocolVersion: (typeof ELLA_MCP_PROTOCOL_VERSIONS)[number] = defaultProtocolVersion) {
  const response = await POST(
    request(
      'POST',
      {
        jsonrpc: '2.0',
        id,
        method,
        params,
      },
      headers,
      protocolVersion,
    ),
  )
  const text = await response.text()
  return {
    response,
    body: text ? JSON.parse(text) : null,
  }
}

test('GET and OPTIONS implement method and CORS behavior', async () => {
  const get = await GET(new Request(endpoint, { method: 'GET', headers: { origin: 'https://ellaentity.ai' } }))
  assert.equal(get.status, 405)
  assert.equal(await get.text(), '')
  assert.equal(get.headers.get('allow'), 'POST, OPTIONS')
  assert.equal(get.headers.get('access-control-allow-origin'), 'https://ellaentity.ai')
  assert.notEqual(get.headers.get('access-control-allow-origin'), '*')

  const options = await OPTIONS(new Request(endpoint, { method: 'OPTIONS', headers: { origin: 'https://ellaentity.ai' } }))
  assert.equal(options.status, 204)
  assert.equal(await options.text(), '')
  assert.equal(options.headers.get('access-control-allow-origin'), 'https://ellaentity.ai')

  const blocked = await OPTIONS(new Request(endpoint, { method: 'OPTIONS', headers: { origin: 'https://evil.example' } }))
  assert.equal(blocked.status, 403)
})

async function pingWithHeaders(headers: HeadersInit, includeDefaultAccept = true) {
  const response = await POST(
    new Request(endpoint, {
      method: 'POST',
      headers: {
        ...(includeDefaultAccept ? { accept } : {}),
        'content-type': contentType,
        origin: 'https://ellaentity.ai',
        'mcp-protocol-version': defaultProtocolVersion,
        'x-test-preserved': 'preserved-value',
        ...headers,
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 'ping-accept', method: 'ping', params: {} }),
    }),
  )
  const text = await response.text()
  return { response, body: text ? JSON.parse(text) : null }
}

test('POST validates content negotiation and origins', async () => {
  const accepted = [
    await pingWithHeaders({}, false),
    await pingWithHeaders({ accept: '' }),
    await pingWithHeaders({ accept: '*/*' }),
    await pingWithHeaders({ accept: 'Application/Json; charset=utf-8' }),
    await pingWithHeaders({ accept }),
  ]

  for (const result of accepted) {
    assert.equal(result.response.status, 200)
    assert.equal(result.body.result, {})
    assert.equal(result.body.id, 'ping-accept')
    assert.equal(result.response.headers.get('access-control-allow-origin'), 'https://ellaentity.ai')
  }

  assert.equal((await pingWithHeaders({ accept: 'text/event-stream' })).response.status, 406)
  assert.equal((await pingWithHeaders({ accept: 'text/plain' })).response.status, 406)
  assert.equal((await POST(request('POST', { jsonrpc: '2.0', id: 1, method: 'ping', params: {} }, { 'content-type': 'text/plain' }))).status, 415)
  assert.equal((await POST(request('POST', { jsonrpc: '2.0', id: 1, method: 'ping', params: {} }, { origin: 'https://evil.example' }))).status, 403)
})


test('canonical MCP root discovery and route aliases are preserved', async () => {
  const discovery = await GET(new Request(mcpRootEndpoint, { method: 'GET', headers: { host: 'mcp.ellaentity.ai' } }))
  assert.equal(discovery.status, 200)
  assert.match(discovery.headers.get('content-type') ?? '', /application\/json/)
  const body = await discovery.json()

  assert.equal(body.canonicalEntityId, ELLA_CANONICAL_ENTITY_ID)
  assert.deepEqual(body.tools, ELLA_MCP_TOOL_NAMES)
  assert.deepEqual(body.resources, ELLA_MCP_RESOURCES.map((resource) => resource.uri))
  assert.deepEqual(body.supportedProtocolVersions, ELLA_MCP_PROTOCOL_VERSIONS)
  assert.equal(body.server.version, ELLA_MCP_SERVER_INFO.version)
  assert.equal(body.documentationUrl, 'https://ellaentity.ai/system/mcp')
  assert.equal(body.entityGraphUrl, 'https://ellaentity.ai/entity.json')
  assert.match(body.scope, /Public read-only/)

  const rewrittenDiscovery = await GET(new Request('https://mcp.ellaentity.ai/mcp?mcpRoot=1', { method: 'GET', headers: { host: 'mcp.ellaentity.ai' } }))
  assert.equal(rewrittenDiscovery.status, 200)

  const getMcp = await GET(new Request('https://mcp.ellaentity.ai/mcp', { method: 'GET', headers: { host: 'mcp.ellaentity.ai' } }))
  assert.equal(getMcp.status, 405)
  assert.equal(getMcp.headers.get('allow'), 'POST, OPTIONS')

  const rootInitialize = await POST(new Request(mcpRootEndpoint, {
    method: 'POST',
    headers: { accept, 'content-type': contentType, origin: 'https://mcp.ellaentity.ai', 'mcp-protocol-version': defaultProtocolVersion },
    body: JSON.stringify({ jsonrpc: '2.0', id: 'root-init', method: 'initialize', params: { protocolVersion: defaultProtocolVersion, capabilities: {}, clientInfo: { name: 'root-test-client', version: '1.0.0' } } }),
  }))
  assert.equal(rootInitialize.status, 200)
  const rootInitializeBody = await rootInitialize.json()
  assert.equal(rootInitializeBody.result.serverInfo.version, ELLA_MCP_SERVER_INFO.version)

  const aliasTools = await POST(new Request('https://mcp.ellaentity.ai/mcp', {
    method: 'POST',
    headers: { accept, 'content-type': contentType, origin: 'https://mcp.ellaentity.ai', 'mcp-protocol-version': defaultProtocolVersion },
    body: JSON.stringify({ jsonrpc: '2.0', id: 'alias-tools', method: 'tools/list', params: {} }),
  }))
  assert.equal(aliasTools.status, 200)
  const aliasToolsBody = await aliasTools.json()
  assert.deepEqual(aliasToolsBody.result.tools.map((tool: { name: string }) => tool.name), ELLA_MCP_TOOL_NAMES)
})

test('initialize validates official params and reports server capabilities', async () => {
  for (const protocolVersion of ELLA_MCP_PROTOCOL_VERSIONS) {
    const valid = await rpc(
      'initialize',
      {
        protocolVersion,
        capabilities: {},
        clientInfo: { name: 'behavior-test-client', version: '1.0.0' },
      },
      1,
      {},
      protocolVersion,
    )

    assert.equal(valid.response.status, 200)
    assert.equal(valid.body.result.serverInfo.name, 'ellaentity-mcp')
    assert.equal(valid.body.result.protocolVersion, protocolVersion)
    assert.ok(valid.body.result.capabilities.tools)
    assert.ok(valid.body.result.capabilities.resources)
  }

  const missingProtocol = await rpc('initialize', {
    capabilities: {},
    clientInfo: { name: 'behavior-test-client', version: '1.0.0' },
  })
  assert.ok(missingProtocol.body.error || missingProtocol.body.result.protocolVersion === defaultProtocolVersion)

  const invalidId = await POST(request('POST', { jsonrpc: '2.0', id: null, method: 'ping', params: {} }))
  assert.notEqual(invalidId.status, 200)
})

test('notifications return no JSON-RPC body', async () => {
  const response = await POST(
    request('POST', {
      jsonrpc: '2.0',
      method: 'notifications/initialized',
      params: {},
    }),
  )

  assert.equal(response.status, 202)
  assert.equal(await response.text(), '')
})

test('tools list and calls are behavioral and schema-valid', async () => {
  const list = await rpc('tools/list', {}, 1, { 'mcp-protocol-version': '2025-11-25' }, '2025-11-25')
  const tools = list.body.result.tools

  assert.deepEqual(tools.map((tool: { name: string }) => tool.name), ELLA_MCP_TOOL_NAMES)

  const ajv = new Ajv()
  addFormats(ajv)

  for (const tool of tools) {
    assert.ok(tool.title)
    assert.ok(tool.description)
    assert.ok(tool.inputSchema)
    assert.ok(tool.outputSchema)
    assert.deepEqual(tool.annotations, {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    })

    const call = await rpc('tools/call', { name: tool.name, arguments: {} })
    assert.equal(call.response.status, 200)
    assert.equal(call.body.result.isError, false)
    assert.ok(call.body.result.content[0].text)
    assert.ok(call.body.result.structuredContent.provenance.canonicalEntityId === 'https://ellaentity.ai/#ella')
    assert.equal(ajv.validate(tool.outputSchema, call.body.result.structuredContent), true, ajv.errorsText())
  }

  const domain = await rpc('tools/call', { name: 'ella.domains.get', arguments: { domain: 'sleep' } })
  assert.equal(domain.body.result.structuredContent.data.name.length > 0, true)

  const badDomain = await rpc('tools/call', { name: 'ella.domains.get', arguments: { domain: 'bad' } })
  assert.equal(badDomain.body.result.isError, true)

  const unknown = await rpc('tools/call', { name: 'unknown.tool', arguments: {} })
  assert.equal(unknown.body.result.isError, true)
})

test('resources list and reads expose only canonical public resources', async () => {
  const list = await rpc('resources/list')
  const uris = list.body.result.resources.map((resource: { uri: string }) => resource.uri)

  assert.deepEqual(uris, ELLA_MCP_RESOURCES.map((resource) => resource.uri))

  for (const resource of ELLA_MCP_RESOURCES) {
    const read = await rpc('resources/read', { uri: resource.uri })
    assert.equal(read.response.status, 200)
    assert.equal(read.body.result.contents[0].mimeType, resource.mimeType)
    assert.doesNotMatch(read.body.result.contents[0].text, /api\/process|credential|private memory|internal prompt/i)
  }

  const graph = await rpc('resources/read', { uri: 'ella://entity-graph' })
  assert.match(graph.body.result.contents[0].text, /https:\/\/ellaentity\.ai\/#ella/)

  const unknown = await rpc('resources/read', { uri: 'ella://unknown' })
  assert.ok(unknown.body.error || unknown.body.result.isError)
})

test('canonical MCP URL parity is preserved', async () => {
  const docs = await import('../app/system/mcp/page')
  const llms = await import('node:fs').then((fs) => fs.readFileSync('public/llms.txt', 'utf8'))
  const schema = await import('../app/schema/ella')

  assert.match(String(docs.default), /Page/)
  assert.match(llms, /https:\/\/mcp\.ellaentity\.ai/)
  assert.doesNotMatch(llms, /https:\/\/mcp\.ellaentity\.ai\/mcp/)
  assert.match(JSON.stringify(schema.ELLA_MCP_SCHEMA), /https:\/\/mcp\.ellaentity\.ai/)
})
