import { failure, readBody, readExchange, submitNote } from '@/lib/exchange'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET() {
  try { return Response.json(await readExchange(), { headers: { 'Cache-Control': 'no-store' } }) } catch (error) { return failure(error) }
}
export async function POST(request: Request) {
  try { return Response.json(await submitNote(await readBody(request)), { status: 202, headers: { 'Cache-Control': 'no-store' } }) } catch (error) { return failure(error) }
}
