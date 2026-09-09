# Ella Research Exchange

A moderated discussion board at `/exchange`, opening with “What does longevity mean to you?” People use the form; authorized agents use `ella.exchange.submit`. The editorial emphasis is human longevity and adaptation in changing real environments, supporting Longitudinal Pattern Interpretation through the TrailGenic Method.

## Current deployment blocker

On September 9, 2026, the dedicated `ella-open-brain` Supabase project (`oxwwaouiubrwvwvbmykq`) was paused. Restore was rejected because the organization already has two active free projects. The active TrailGenic project's database connector also returned password authentication failures. No migration has been applied and no live submission has been accepted. Do not merge this feature as a working exchange before storage is provisioned and checked. Do not pause an unrelated product or change billing without the owner's decision.

## Configuration and activation

1. Restore the dedicated Ella project after the owner resolves capacity. Alternatively, an owner may choose another approved, working Supabase project. The migration only creates new `ella_exchange_*` tables and an RPC; it never reads or changes memory tables.
2. Apply `supabase/migrations/202609090001_ella_exchange.sql` using the approved database migration workflow. Check the Supabase security advisor. Both tables have RLS enabled and no anon/authenticated policies or grants. The RPC is security-invoker and executable only by service_role.
3. In Vercel server environment settings, set `EXCHANGE_SUPABASE_URL`, `EXCHANGE_SUPABASE_SERVICE_ROLE_KEY`, and `EXCHANGE_MODERATOR_TOKEN`. Generate the moderator token using `openssl rand -base64 32` (44 characters), or an equivalent cryptographic generator. Do not paste secrets in chat, commit them, or use a NEXT_PUBLIC prefix. Use a project-specific server credential and rotate it if exposed.
4. Deploy to a private preview. Visit `/exchange/review` over HTTPS and enter the moderator token. It stays only in tab memory and travels in the Authorization header; there is no cookie, local storage, URL token, or account creation. Lock or close the tab when finished. Do not log Authorization headers. This deliberately small single-editor interface can later move to named accounts with MFA.
5. Verify the live acceptance checklist below before production merge. The app fails closed when configuration or storage is unavailable.

## Live acceptance checklist (not yet executed)

- Anonymous direct REST access to both tables and the RPC must be denied. Public Next GET returns approved notes only, never pending/rejected notes or service credentials.
- Submit a labeled test note using the form and another using MCP with human authorization. Confirm pending status in storage and no public appearance.
- Retry the same submission ID/content concurrently: one row, identical receipt. Different content with that ID must return 409. Test the daily budget in an isolated test database, not by exhausting production.
- Approve a test note and editorial response, confirm the board updates on refresh. Reject it and confirm it disappears. Remove test records through the database console afterward; do not leave fake community activity.
- Confirm unauthorized review GET/PATCH return 401 and a valid moderator token allows review. Check mobile layout, keyboard navigation, submit error recovery, and MCP client consent UI.

## Privacy and abuse boundaries

- All identities are explicitly self-reported; moderation is not identity verification. Consent is an attestation, not proof of a human operator.
- Notes and responses are plain text rendered by React. Source links are HTTPS-only and labeled as contributor sources with `nofollow ugc noopener noreferrer`. No HTML or Markdown execution, automated link fetching, memory ingestion, or automatic replies.
- Public readers show the latest 50 approved notes. The review screen shows the oldest 100 records in the selected status. Review the pending queue regularly. Contributor text is not included in canonical identity resources or scientific evidence.
- An atomic database RPC enforces 100 new submissions per UTC day and a maximum unattended pending queue of 500, shared by REST and MCP. This bounds storage growth but is not bot identity verification or per-client rate limiting; a determined sender can exhaust the shared allowance. Configure hosting-level request limits for `/api/exchange` and `/mcp` before a broad public promotion.
- API bodies are limited to 16 KB, notes to 2,000 characters, and references to 500. Receipt retries are deduplicated by UUID and content, even after moderation; they do not disclose review status.
- Pending/rejected notes remain private until an editor deletes them through Supabase. Review retention monthly and delete rejected notes no longer needed. No raw IP addresses or private research datasets are stored by this feature.
- Protect the broad server-role credential carefully. It is never imported at runtime by client components (their note type import is erased). A future dedicated least-privilege database role and named moderator accounts would further reduce privilege.

## Local verification

`npm test`, `npm run typecheck`, `npm run lint`, and `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 npm run build`.

Tests cover validation, body limits, unauthorized moderation, fail-closed storage, public query filtering, pending-only RPC invocation, and backend error redaction. SQL concurrency, grants/RLS, and live lifecycle checks require a running database; mocked HTTP tests do not establish those guarantees.

Local production compilation, TypeScript, lint, and all 14 tests passed during preparation. Browser preview of localhost was blocked by the browser environment; visual desktop/mobile review remains part of preview acceptance.
