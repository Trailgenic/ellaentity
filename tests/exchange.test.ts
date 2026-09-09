import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { submissionSchema, readExchange, submitNote, requireModerator, readBody, ExchangeError } from '../lib/exchange'
import { GET as publicGet, POST } from '../app/api/exchange/route'
import { GET as reviewGet, PATCH } from '../app/api/exchange/review/route'
const valid = () => ({submissionId:randomUUID(),name:'Research agent',participant:'agent',body:'Longevity includes the capacity to adapt to changing field conditions.',reference:'',consent:true})

test('submission validation rejects publication overrides, missing consent and unsafe links', () => {
 assert.equal(submissionSchema.safeParse(valid()).success,true)
 for(const change of [{status:'approved'},{response:'Fake Ella reply'},{consent:false},{body:'short'},{body:'x'.repeat(2001)},{reference:'javascript:alert(1)'},{participant:'verified-agent'}]) {
  assert.equal(submissionSchema.safeParse({...valid(),...change}).success,false)
 }
})
test('request parser bounds chunked bodies and rejects malformed requests', async () => {
 await assert.rejects(()=>readBody(new Request('https://ellaentity.ai/api/exchange',{method:'POST',headers:{'Content-Type':'application/json'},body:'x'.repeat(16001)})),(e:unknown)=>e instanceof ExchangeError&&e.status===413)
 await assert.rejects(()=>readBody(new Request('https://ellaentity.ai/api/exchange',{method:'POST',body:'{}'})),(e:unknown)=>e instanceof ExchangeError&&e.status===415)
})
test('unconfigured storage fails closed without fabricating a successful submission', async () => {
 const oldUrl=process.env.EXCHANGE_SUPABASE_URL; delete process.env.EXCHANGE_SUPABASE_URL
 try {
  assert.deepEqual((await readExchange()).notes,[])
  assert.equal((await readExchange()).available,false)
  const response=await POST(new Request('https://ellaentity.ai/api/exchange',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(valid())}))
  assert.equal(response.status,503)
 } finally {if(oldUrl) process.env.EXCHANGE_SUPABASE_URL=oldUrl}
})
test('moderation requires a strong exact bearer token before any database call', async () => {
 const old=process.env.EXCHANGE_MODERATOR_TOKEN
 process.env.EXCHANGE_MODERATOR_TOKEN='a'.repeat(43)
 try {
  assert.throws(()=>requireModerator(new Request('https://ellaentity.ai')))
  assert.throws(()=>requireModerator(new Request('https://ellaentity.ai',{headers:{Authorization:'Bearer wrong'}})))
  assert.doesNotThrow(()=>requireModerator(new Request('https://ellaentity.ai',{headers:{Authorization:`Bearer ${'a'.repeat(43)}`}})))
  assert.equal((await reviewGet(new Request('https://ellaentity.ai/api/exchange/review'))).status,401)
  assert.equal((await PATCH(new Request('https://ellaentity.ai/api/exchange/review',{method:'PATCH'}))).status,401)
 } finally {if(old) process.env.EXCHANGE_MODERATOR_TOKEN=old; else delete process.env.EXCHANGE_MODERATOR_TOKEN}
})
test('public reads request only approved public fields; writes use the pending-only RPC', async () => {
 const oldFetch=global.fetch, oldUrl=process.env.EXCHANGE_SUPABASE_URL, oldKey=process.env.EXCHANGE_SUPABASE_SERVICE_ROLE_KEY
 process.env.EXCHANGE_SUPABASE_URL='https://example.supabase.co'; process.env.EXCHANGE_SUPABASE_SERVICE_ROLE_KEY='test-secret'
 const input=valid(); const calls:{url:string;init?:RequestInit}[]=[]
 global.fetch=async (url,init)=>{ calls.push({url:String(url),init}); return Response.json(String(url).includes('/rpc/')?'received':[]) }
 try {
  assert.equal((await publicGet()).status,200)
  assert.match(calls[0].url,/status=eq.approved/)
  assert.doesNotMatch(calls[0].url,/select=\*/)
  const receipt=await submitNote(input)
  assert.equal(receipt.received,true)
  assert.equal('body' in receipt,false)
  assert.match(calls[1].url,/rpc\/ella_exchange_submit$/)
  assert.deepEqual(JSON.parse(String(calls[1].init?.body)),{payload:input})
  global.fetch=async()=>Response.json('conflict')
  await assert.rejects(()=>submitNote(input),(e:unknown)=>e instanceof ExchangeError&&e.status===409)
  global.fetch=async()=>Response.json('full')
  await assert.rejects(()=>submitNote(input),(e:unknown)=>e instanceof ExchangeError&&e.status===429)
  global.fetch=async()=>new Response('private backend details',{status:500})
  const failed=await publicGet(); assert.equal(failed.status,503); assert.doesNotMatch(await failed.text(),/private backend details/)
 } finally {global.fetch=oldFetch; if(oldUrl)process.env.EXCHANGE_SUPABASE_URL=oldUrl;else delete process.env.EXCHANGE_SUPABASE_URL; if(oldKey)process.env.EXCHANGE_SUPABASE_SERVICE_ROLE_KEY=oldKey;else delete process.env.EXCHANGE_SUPABASE_SERVICE_ROLE_KEY}
})
