# EllaEntity MCP deployment checklist

- Set `MCP_ALLOWED_ORIGINS` to the comma-separated browser origins permitted to call `/mcp`.
- Keep `/mcp` public, read-only, unauthenticated, and separate from `/api/process`.
- Configure durable platform rate limiting at Vercel/edge level. Recommended baseline rule: match path `/mcp`, limit POST requests per source IP to a conservative burst (for example 60 requests/minute) with a higher trusted-client allowance if needed.
- Do not rely on process-local counters for serverless rate limiting; they reset across cold starts and instances.
- Verify `GET /mcp` returns 405, `POST /mcp` handles Streamable HTTP JSON-RPC, and `/system/mcp` remains the human-readable documentation page.

- The canonical public MCP endpoint URL is `https://mcp.ellaentity.ai`; the Next.js route remains `/mcp` internally for host-based routing.
