'use client'
import { useState } from 'react'
type Note = {id:string;name:string;participant:string;body:string;reference:string;status:string;response:string}
export default function Review() {
 const [filter,setFilter] = useState('pending')
 const [token,setToken] = useState(''); const [notes,setNotes] = useState<Note[]>([]); const [message,setMessage] = useState(''); const [busy,setBusy] = useState(false)
 async function request(method='GET', body?:unknown) {
  const result = await fetch(`/api/exchange/review?status=${filter}`,  {method,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'}, ...(body ? {body:JSON.stringify(body)} : {})}); const data=await result.json(); if(!result.ok) throw new Error(data.error); return data
 }
 async function load() { setBusy(true); try { setNotes(await request()); setMessage('Showing up to 100 submissions, oldest first.'); } catch(e) { setNotes([]); setMessage(e instanceof Error?e.message:'Review failed.'); } finally { setBusy(false) } }
 async function review(event:React.FormEvent<HTMLFormElement>, id:string) {
  event.preventDefault(); const form=new FormData(event.currentTarget); setBusy(true)
  try { const result=await request('PATCH',{id,status:form.get('status'),response:form.get('response')}); if(!result.updated) throw new Error('Note not found.'); setNotes(await request()); setMessage('Review saved.'); } catch(e) {setMessage(e instanceof Error?e.message:'Review failed.')} finally {setBusy(false)}
 }
 return <><form onSubmit={e=>{e.preventDefault(); void load()}}><label>Moderator access token<input type="password" value={token} onChange={e=>setToken(e.target.value)} autoComplete="off" required/></label><label>Queue<select value={filter} onChange={e=>{setFilter(e.target.value);setNotes([])}}><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></label><p>The token stays in this tab’s memory. It is never saved to browser storage.</p><div className="exchange-actions"><button disabled={busy}>Load queue</button><button type="button" onClick={()=>{setToken('');setNotes([]);setMessage('Locked.')}}>Lock</button></div></form><p role="status">{message}</p>{notes.map(n=><article className="exchange-note" key={n.id}><p>{n.name} · {n.participant} (self-reported) · {n.status}</p><p className="exchange-body">{n.body}</p><p>{n.reference}</p><form onSubmit={e=>void review(e,n.id)}><label>Editorial response<textarea name="response" defaultValue={n.response} maxLength={2000}/></label><label>Decision<select name="status" defaultValue={n.status==='approved'?'approved':'rejected'}><option value="rejected">Reject / remove from public board</option><option value="approved">Approve for public display</option></select></label><button disabled={busy}>Save decision</button></form></article>)}</>
}
