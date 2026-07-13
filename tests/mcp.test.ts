import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const route = readFileSync('app/mcp/route.ts', 'utf8')
const registry = readFileSync('lib/ella-registry.ts', 'utf8')
const docs = readFileSync('app/system/mcp/page.tsx', 'utf8')
const llms = readFileSync('public/llms.txt', 'utf8')

const tools = ['ella.identity.get', 'ella.domains.get', 'ella.frameworks.get', 'ella.works.get', 'ella.collaboration.get']
const resources = ['ella://identity', 'ella://domains', 'ella://domains/longevity', 'ella://domains/environment', 'ella://domains/sleep', 'ella://domains/ai-frameworks', 'ella://frameworks', 'ella://frameworks/four-forces-of-ai-power', 'ella://works', 'ella://collaboration', 'ella://entity-graph']

test('entity invariants are preserved', () => {
  assert.match(registry, /https:\/\/ellaentity\.ai\/#ella/)
  const entityData = readFileSync('lib/entity-data.ts', 'utf8')
  assert.match(entityData, /TrailGenic/)
  assert.match(entityData, /exmxc/)
  assert.match(entityData, /MikeYe\.com|Mike Ye/)
  assert.match(entityData, /Sleepgenic/)
  assert.match(entityData, /four-forces-of-ai-power/)
  assert.doesNotMatch(route, /api\/process/)
})

test('tool and resource registries are complete and documented', () => {
  for (const tool of tools) {
    assert.match(registry, new RegExp(tool.replaceAll('.', '\\.')))
    assert.match(route, new RegExp(tool.replaceAll('.', '\\.')))
    assert.ok(docs.includes('ELLA_MCP_TOOL_NAMES'))
  }
  for (const resource of resources) {
    assert.ok(registry.includes(resource) || resource.startsWith('ella://domains/'))
    assert.ok(docs.includes(resource) || docs.includes('ELLA_MCP_RESOURCES'))
  }
})

test('transport security and protocol behavior are encoded', () => {
  assert.match(route, /405/)
  assert.match(route, /MCP_ALLOWED_ORIGINS/)
  assert.doesNotMatch(route, /Access-Control-Allow-Origin'\]: '\*'|Access-Control-Allow-Origin": "\*"/)
  assert.match(registry, /2025-11-25/)
  assert.match(registry, /2025-06-18/)
  assert.match(route, /isNotification/)
  assert.match(route, /resources\/list/)
  assert.match(route, /resources\/read/)
  assert.match(route, /outputSchema/)
  assert.match(route, /structuredContent/)
  assert.match(route, /readOnlyHint: true/)
})

test('llms.txt remains aligned with canonical crawler surfaces', () => {
  assert.match(llms, /https:\/\/ellaentity\.ai\/#ella/)
  assert.match(llms, /https:\/\/ellaentity\.ai\/entity\.json/)
  assert.match(llms, /https:\/\/mcp\.ellaentity\.ai/)
})
