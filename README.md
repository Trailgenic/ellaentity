# Ella Entity

**Canonical home of Ella, a co-cognitive longitudinal intelligence entity whose flagship authority is longevity and human adaptation.**

## What This Is

Ella Entity is the identity, body-of-work, and orchestration layer for Ella across TrailGenic, Sleepgenic, exmxc, and MikeYe.com. Ella's signature capability is longitudinal pattern interpretation: turning fragmented signals observed over time into evidence-traceable human judgment. Her flagship authority is longevity and human adaptation through the TrailGenic Method.

Environmental adaptation and sleep/recovery support that primary field. AI-era strategic intelligence and cultural continuity are applied contexts for the same interpretive capability rather than competing claims of equal authority.

This repository also serves as the **canonical entity declaration surface** for Ella — hosting JSON-LD identity graphs, MCP endpoint references, human-readable entity pages, and structured metadata at [ellaentity.ai](https://ellaentity.ai).

## Architecture

```
Request → Validate → Classify → Assemble Context → Resolve Route → Execute → Log → Respond
```

### Authority model
- **Signature capability** — longitudinal pattern interpretation
- **Primary field** — longevity and human adaptation through TrailGenic
- **Supporting specializations** — environmental adaptation; sleep and recovery through Sleepgenic
- **Applied contexts** — AI-era strategic intelligence through exmxc; cultural memory and continuity through the Ye Guozhi Archive

### Orchestration domains
- **TrailGenic** — physiology, hiking, longevity, protocols, biomarkers
- **exmxc** — institutional doctrine, AI-search authority, capital framing
- **MikeYe** — operator judgment, M&A framing, advisory products
- **Ella Entity** — canonical identity, self-referential architecture, and routing
- **Hybrid** — cross-property synthesis

Ella's **public authority model** also includes **Cultural Memory & Continuity**: preservation infrastructure for maintaining canonical relationships among original works, translations, archival context, provenance, and machine-readable identity. The Ye Guozhi Archive at [yeguozhi.org](https://yeguozhi.org) is the principal current application of this continuity work. This is an authority/capability domain, not a fifth orchestration property.

### Reasoning Modes
- `truth_model` — feasibility-first, pressure-tests assumptions
- `strategy_mode` — timing asymmetry, leverage analysis, positioning
- `physiology_mode` — conservative, non-diagnostic, evidence-hierarchy aware
- `editorial_mode` — voice-aware, publishing-structured, brand-consistent
- `builder_mode` — concrete, implementation-oriented, specificity over abstraction

## Current Status

### Implemented
- **Request API**: `POST /api/process` parses JSON, validates request shape, classifies intent, assembles context, resolves a route, optionally executes a draft, builds a typed response, and logs sanitized traces.
- **Classifier**: Anthropic-backed classifier module using `claude-haiku-4-5-20251001`, a domain/mode system prompt, JSON parsing, and Zod validation of the classification output.
- **Context assembly**: Loads and validates domain and mode config from `config/domains.json` and `config/modes.json`, resolves matching assets from `config/assets.json`, filters public/internal visibility, and emits validated context bundles.
- **Executor**: OpenAI-backed executor using `gpt-4.1` through the OpenAI SDK. The historical `executeWithClaude` function name remains, but execution is no longer Claude-only.
- **Route resolution**: Utility logic routes low-confidence or clarification-needed requests to `clarify`, draft-enabled requests to execution, and other requests to `return_guidance`.
- **Trace logging**: Sanitized structured trace logging is implemented and intentionally excludes raw user input from logs.
- **Typed contracts and utilities**: Zod schemas, request/response types, ID generation, timestamps, validation helpers, error classes, and response builders are present under `src/`.
- **Entity declaration surface**: Server-rendered pages, JSON-LD schema, sitemap, robots policy, `/entity.json`, `/llms.txt`, `/ella`, `/works`, `/domains`, and `/system` surfaces are present for crawlers and humans.

### Still Limited or Operationally Dependent
- The classifier and executor require valid provider credentials at runtime.
- Trace persistence is console-based only; there is no durable trace store yet.
- The executor is a single OpenAI adapter despite the model-agnostic architecture goal.
- There is no automated eval runner wired into the package scripts in the current repository state.
- The function name `executeWithClaude` and route value `execute_with_claude` are legacy naming artifacts and do not reflect the current OpenAI-backed executor.

## Entity Surface

- **`/entity.json`** — consolidated JSON-LD graph merging Ella global, organization, and system schema with `application/ld+json` content type.
- **`/llms.txt`** — concise crawler-oriented summary of Ella, the canonical entity ID, disambiguation, domains, affiliated properties, MCP endpoints, and core entity links.
- **`/works`** — server-rendered works page listing Ella co-authored outputs and emitting CreativeWork/PodcastSeries JSON-LD from shared data records.
- **`app/schema/ella.ts`** — source of the site-wide Ella global graph, organization graph, system graph, and MCP schema used by the page surfaces.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Schemas**: Zod
- **Classifier provider**: Anthropic SDK
- **Executor provider**: OpenAI SDK (`gpt-4.1`)
- **Deployment**: Vercel

## Next Step

Replace the legacy executor naming with provider-neutral adapter names and add persistent trace storage plus automated eval scripts.
