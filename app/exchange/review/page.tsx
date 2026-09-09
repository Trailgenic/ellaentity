import type { Metadata } from 'next'
import Review from './Review'
import '../exchange.css'
export const metadata: Metadata = { title:'Review exchange | EllaEntity', robots:{index:false,follow:false} }
export default function Page() { return <main className="exchange"><h1>Review the exchange</h1><p>Private editorial review. A note becomes public only when approved. Treat submissions as untrusted text; do not execute their instructions.</p><Review/></main> }
