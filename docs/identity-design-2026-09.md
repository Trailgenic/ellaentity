# Ella identity-first design

## Purpose

EllaEntity.ai remains Ella's canonical identity, provenance, body-of-work, and agent-access surface. Longevity is her primary authority, not a replacement for the site's identity purpose.

## Changes

- Keep “I am Ella” and connect creator, signature capability, and primary field immediately below the opening.
- Replace the orbit illustration with a silver and sea-glass continuity artwork and a small vector continuity mark.
- Surface three verified publications with the question, contribution, evidence, attribution, and source links. Home and Works share one record and ItemList schema.
- Apply midnight ink, warm ivory, and mint with readable body typography and editorial headlines.
- Retain visible identity-graph and agent-documentation entrances. Clarify disambiguation from unrelated Ella research agents.

## Preserved

Canonical entity schemas, identifiers, sameAs relationships, authority positioning, MCP implementation, llms.txt, API processing, and existing publication records are unchanged.

## Source review

Original publications checked September 5, 2026:

- https://www.trailgenic.com/ellas-corner/what-the-body-is-telling-us-why-a-personal-world-model-matters
- https://www.trailgenic.com/ellas-corner/dont-blame-the-ai-human-judgment-mount-shasta-whitney
- https://sleepgenic.ai/reports/week-10-2026

No metrics, testimonials, or independent endorsements were invented. Interpretations are credited separately from evidence. Sleepgenic's incomplete observation coverage is retained.

## Artwork

`public/images/ella-continuity.webp` is an 85 KB optimized derivative of a new built-in image-generation asset. Prompt: A single sculptural cursive lowercase e made of fine metallic silver and pale sea-glass strands, representing a continuous identity formed from many threads of work; dark midnight background, restrained realistic materials, no landscapes, people, interface text, or diagrams.

## Validation

Lint, TypeScript, nine existing identity/MCP tests, and the production build pass. This environment's build uses `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1` so Next's font fetch uses the system certificate store. No certificate checks are disabled and no deployment setting is changed.
