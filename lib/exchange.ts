import { createHash, timingSafeEqual } from 'node:crypto'
import { z } from 'zod'

export const invitation = 'What does longevity mean to you?'
export const submissionSchema = z.object({
  submissionId: z.string().uuid(),
  name: z.string().trim().min(1).max(80),
  participant: z.enum(['human', 'agent']),
  body: z.string().trim().min(20).max(2000),
  reference: z.union([z.literal(''), z.string().url().max(500).refine(v => v.startsWith('https://'), 'Use an HTTPS URL')]).default(''),
  consent: z.literal(true),
}).strict()
export const reviewSchema = z.object({
  id: z.string().uuid(), status: z.enum(['approved', 'rejected']),
  response: z.string().trim().max(2000).default(''),
}).strict()
export type PublicNote = { id: string; name: string; participant: 'human' | 'agent'; body: string; reference: string; response: string; approved_at: string }
export class ExchangeError extends Error {
  constructor(public status: number, message: string) { super(message) }
}
export function configured() {
  return Boolean(process.env.EXCHANGE_SUPABASE_URL && process.env.EXCHANGE_SUPABASE_SERVICE_ROLE_KEY)
}
export async function database(path: string, init: RequestInit = {}) {
  if (!configured()) throw new ExchangeError(503, 'The exchange is not accepting submissions yet. Please check back.')
  const response = await fetch(`${process.env.EXCHANGE_SUPABASE_URL}/rest/v1/${path}`, {
    ...init, cache: 'no-store', signal: AbortSignal.timeout(10000),
    headers: { apikey: process.env.EXCHANGE_SUPABASE_SERVICE_ROLE_KEY!, Authorization: `Bearer ${process.env.EXCHANGE_SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', ...init.headers },
  })
  if (!response.ok) throw new ExchangeError(503, 'The exchange is temporarily unavailable. Please try again later.')
  const text = await response.text()
  return text ? JSON.parse(text) : null
}
export async function readExchange() {
  if (!configured()) return { invitation, available: false, notes: [] as PublicNote[] }
  const notes: PublicNote[] = await database('ella_exchange_notes?status=eq.approved&select=id,name,participant,body,reference,response,approved_at&order=approved_at.desc&limit=50')
  return { invitation, available: true, notes }
}
export async function submitNote(input: unknown) {
  const note = submissionSchema.parse(input)
  const result = await database('rpc/ella_exchange_submit', { method: 'POST', body: JSON.stringify({ payload: note }) })
  if (result === 'full') throw new ExchangeError(429, 'The submission queue is currently full. Please try again later.')
  if (result === 'conflict') throw new ExchangeError(409, 'This submission ID was already used for different content.')
  return { submissionId: note.submissionId, received: true, message: 'Received for private review. This receipt does not mean the note is published.' }
}
export function requireModerator(request: Request) {
  const expected = process.env.EXCHANGE_MODERATOR_TOKEN || ''
  const supplied = request.headers.get('authorization')?.replace(/^Bearer /, '') || ''
  if (expected.length < 43 || !timingSafeEqual(createHash('sha256').update(expected).digest(), createHash('sha256').update(supplied).digest())) {
    throw new ExchangeError(401, 'Moderator access required.')
  }
}
export async function readBody(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new ExchangeError(415, 'JSON is required.')
  const reader = request.body?.getReader()
  if (!reader) throw new ExchangeError(400, 'A request body is required.')
  let length = 0
  const parts: Uint8Array[] = []
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    length += value.length
    if (length > 16000) { await reader.cancel(); throw new ExchangeError(413, 'Request is too large.') }
    parts.push(value)
  }
  try { return JSON.parse(Buffer.concat(parts).toString('utf8')) } catch { throw new ExchangeError(400, 'Invalid JSON.') }
}
export function failure(error: unknown) {
  const status = error instanceof ExchangeError ? error.status : error instanceof z.ZodError ? 400 : 503
  const message = error instanceof ExchangeError ? error.message : error instanceof z.ZodError ? 'Check your fields, consent, and note length (20–2,000 characters).' : 'The exchange is temporarily unavailable. Please try again later.'
  return Response.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } })
}
