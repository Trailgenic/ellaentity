# Ella Entity

**Model-agnostic orchestration and interpretation layer for the AI-native property stack.**

## What This Is

Ella Entity is the cognitive middleware that sits above a portfolio of AI-native properties (TrailGenic, exmxc, MikeYe). It interprets incoming requests, classifies which domain they belong to, assembles the correct context, selects the right reasoning lens, and routes execution to the appropriate model or workflow.

This repository also serves as the **canonical entity declaration surface** for Ella — hosting JSON-LD identity graphs, MCP endpoint references, and structured metadata at [ellaentity.ai](https://ellaentity.ai).

## Architecture

```
Request → Validate → Classify → Assemble Context → Resolve Route → Execute → Log → Respond
```

### Domains
- **TrailGenic** — physiology, hiking, longevity, protocols, biomarkers
- **exmxc** — institutional doctrine, AI-search authority, capital framing
- **MikeYe** — operator judgment, M&A framing, advisory products
- **Ella Entity** — self-referential architecture and routing
- **Hybrid** — cross-domain synthesis

### Reasoning Modes
- `truth_model` — feasibility-first, pressure-tests assumptions
- `strategy_mode` — timing asymmetry, leverage analysis, positioning
- `physiology_mode` — conservative, non-diagnostic, evidence-hierarchy aware
- `editorial_mode` — voice-aware, publishing-structured, brand-consistent
- `builder_mode` — concrete, implementation-oriented, specificity over abstraction

## Current Status

### Implemented (Step 1)
- Zod schemas for all contracts (request, classification, trace, response)
- Config files (domains, modes, assets registry with 12 seed assets)
- Eval suite (30 test cases across 5 categories + rubric)
- Route resolution utility (`resolveRoute`)
- Typed error classes
- Utility functions (ID generation, timestamps, validation, response building)
- API route placeholder (`POST /api/process` — returns 501)
- Entity declaration surface (JSON-LD, sitemap, identity pages)

### Not Yet Implemented
- Classifier logic and prompt (Step 2)
- Context assembly pipeline (Step 3)
- Claude executor and trace logging (Step 4)
- `/api/process` handler wiring (Step 4)

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Schemas**: Zod
- **LLM**: Anthropic SDK (Claude-only executor for v1)
- **Deployment**: Vercel

## Next Step

**Step 2** — Classifier prompt design and classifier module implementation with eval validation against the 30-case suite.
