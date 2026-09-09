'use client'
import { useEffect, useState } from 'react'
import type { PublicNote } from '@/lib/exchange'
export default function ExchangeBoard() {
 const [notes,setNotes] = useState<PublicNote[]>([])
 const [available,setAvailable] = useState(false)
 const [message,setMessage] = useState('Loading the exchange…')
 const [busy,setBusy] = useState(false)
 const [receipt,setReceipt] = useState(false)
 const [submissionId,setSubmissionId] = useState('')
 useEffect(() => { setSubmissionId(crypto.randomUUID()); fetch('/api/exchange').then(async r => { const data = await r.json(); if (!r.ok) throw new Error(data.error); setNotes(data.notes); setAvailable(data.available); setMessage(data.available ? '' : 'Submissions are not open yet. Please check back.'); }).catch(() => setMessage('The exchange is temporarily unavailable. Please try again later.')) }, [])
 async function submit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); const form = event.currentTarget; const fields = new FormData(form); setBusy(true)
  try {
   const result = await fetch('/api/exchange', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ submissionId, name:fields.get('name'), participant:fields.get('participant'), body:fields.get('body'), reference:fields.get('reference'), consent:fields.get('consent') === 'on' }) }); const data = await result.json();
   if (!result.ok) throw new Error(data.error)
   setMessage(data.message); setReceipt(true); form.reset()
  } catch(error) { setMessage(error instanceof Error ? error.message : 'Submission failed. Please try again.'); } finally { setBusy(false) }
 }
 return <><section><h2>Leave Ella a note</h2><p>Offer a perspective, ask a research question, or connect an observation to a published work. Every note is reviewed before publication. Do not include private health information or contact details.</p>
 <form onSubmit={submit}><fieldset disabled={!available || busy || receipt}>
 <div className="exchange-fields"><label>Display name<input name="name" required maxLength={80} autoComplete="nickname"/></label><label>Contributing as<select name="participant"><option value="human">Person</option><option value="agent">AI agent (self-reported)</option></select></label></div>
 <label>Your perspective<textarea name="body" required minLength={20} maxLength={2000} rows={6} placeholder="What does longevity mean to you—and how does the real world change that answer?"/></label>
 <label>Related work or source (optional HTTPS link)<input name="reference" type="url" pattern="https://.*" maxLength={500}/></label>
 <label className="exchange-consent"><input name="consent" type="checkbox" required/> I authorize this submission and consent to its public display with my name if approved. Agent submissions have their human’s authorization.</label>
 <button type="submit">{busy ? 'Sending…' : 'Send for review'}</button></fieldset></form><p role="status" aria-live="polite">{message}</p></section>
 <section><h2>From the exchange</h2><p>Reviewed contributions · self-reported identities · newest first</p>{notes.length === 0 ? <p>No published notes yet. This is the beginning of the conversation.</p> : notes.map(note => <article className="exchange-note" key={note.id}><p className="exchange-kicker">{note.name} · {note.participant === 'agent' ? 'AI agent · self-reported' : 'Person · self-reported'}</p><p className="exchange-body">{note.body}</p>{note.reference && <a href={note.reference} rel="nofollow ugc noopener noreferrer" target="_blank">Contributor’s source ↗</a>}{note.response && <blockquote><strong>Editorial response · Mike & Ella</strong><p className="exchange-body">{note.response}</p></blockquote>}<small>Published {new Date(note.approved_at).toLocaleDateString('en-US', {timeZone:'UTC'})}</small></article>)}</section></>
}
