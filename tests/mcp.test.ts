import assert from 'node:assert/strict'
import test from 'node:test'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { GET, OPTIONS, POST } from '../app/mcp/route'
import { ELLA_MCP_RESOURCES, ELLA_MCP_TOOL_NAMES } from '../lib/ella-registry'

const endpoint = 'https://ellaentity.ai/mcp'
const accept = 'application/json, text/event-stream'
const contentType = 'application/json'
const protocolVersion = '2025-06-18'

function request(method: string, body?: unknown, headers: HeadersInit = {}) {
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

async function rpc(method: string, params: unknown = {}, id: string | number = 1, headers: HeadersInit = {}) {
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

test('POST validates content negotiation and origins', async () => {
  const body = { jsonrpc: '2.0', id: 1, method: 'ping', params: {} }

  assert.equal((await POST(request('POST', body, { accept: '' }))).status, 406)
  assert.equal((await POST(request('POST', body, { accept: 'application/json' }))).status, 406)
  assert.equal((await POST(request('POST', body, { accept: 'text/event-stream' }))).status, 406)
  assert.equal((await POST(request('POST', body, { accept: 'text/plain' }))).status, 406)
  assert.equal((await POST(request('POST', body, { 'content-type': 'text/plain' }))).status, 415)
  assert.equal((await POST(request('POST', body, { origin: 'https://evil.example' }))).status, 403)
})

test('initialize validates official params and reports server capabilities', async () => {
  const valid = await rpc('initialize', {
    protocolVersion,
    capabilities: {},
    clientInfo: { name: 'behavior-test-client', version: '1.0.0' },
  })

  assert.equal(valid.response.status, 200)
  assert.equal(valid.body.result.serverInfo.name, 'ellaentity-mcp')
  assert.equal(valid.body.result.protocolVersion, protocolVersion)
  assert.ok(valid.body.result.capabilities.tools)
  assert.ok(valid.body.result.capabilities.resources)

  const missingProtocol = await rpc('initialize', {
    capabilities: {},
    clientInfo: { name: 'behavior-test-client', version: '1.0.0' },
  })
  assert.ok(missingProtocol.body.error || missingProtocol.body.result.protocolVersion === protocolVersion)

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
  const list = await rpc('tools/list')
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
