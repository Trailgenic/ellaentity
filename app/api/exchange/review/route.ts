import { database, failure, readBody, requireModerator, reviewSchema } from '@/lib/exchange'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  try {
    requireModerator(request)
    const status = new URL(request.url).searchParams.get('status') || 'pending'
    if (!['pending','approved','rejected'].includes(status)) return Response.json({error:'Invalid status'}, {status:400})
    return Response.json(await database(`ella_exchange_notes?status=eq.${status}&select=*&order=created_at.asc&limit=100`), { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return failure(error) }
}
export async function PATCH(request: Request) {
  try {
    requireModerator(request)
    const { id, status, response } = reviewSchema.parse(await readBody(request))
    const rows = await database(`ella_exchange_notes?id=eq.${id}&select=id`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ status, response, approved_at: status === 'approved' ? new Date().toISOString() : null }) })
    return Response.json({ updated: rows.length === 1 }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return failure(error) }
}
