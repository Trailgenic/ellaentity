import { readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";
import { lookupAssets } from "./registry";
import { ContextBundleSchema } from "./types";
import type { ContextBundle } from "./types";
import type { ClassificationOutput } from "../types/domain";
import type { Source } from "../types/request";
import { generateBundleId } from "../lib/ids";

// --- Config loaders ---

const DomainConfigSchema = z.array(
  z.object({
    name: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    routing_notes: z.string(),
  })
);

const ModeConfigSchema = z.array(
  z.object({
    name: z.string(),
    description: z.string(),
    prompt_fragment: z.string(),
    safety_constraints: z.array(z.string()),
  })
);

function loadDomains() {
  const filePath = join(process.cwd(), "config", "domains.json");
  const raw = readFileSync(filePath, "utf-8");
  const parsed = DomainConfigSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error(`domains.json validation failed: ${JSON.stringify(parsed.error.issues)}`);
  }
  return parsed.data;
}

function loadModes() {
  const filePath = join(process.cwd(), "config", "modes.json");
  const raw = readFileSync(filePath, "utf-8");
  const parsed = ModeConfigSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error(`modes.json validation failed: ${JSON.stringify(parsed.error.issues)}`);
  }
  return parsed.data;
}

// Module-level caches
let _domainsCache: ReturnType<typeof loadDomains> | null = null;
let _modesCache: ReturnType<typeof loadModes> | null = null;

function getDomains() {
  if (!_domainsCache) _domainsCache = loadDomains();
  return _domainsCache;
}

function getModes() {
  if (!_modesCache) _modesCache = loadModes();
  return _modesCache;
}

// --- Assembler ---

export async function assembleContext(
  classification: ClassificationOutput,
  source: Source
): Promise<ContextBundle> {
  const { domains, reasoning_mode } = classification;

  // Use primary domain (first in array) for domain_context
  const primaryDomain = domains[0];

  const domainConfig = getDomains().find((d) => d.name === primaryDomain);
  if (!domainConfig) {
    throw new Error(`Domain config not found for: ${primaryDomain}`);
  }

  const modeConfig = getModes().find((m) => m.name === reasoning_mode);
  if (!modeConfig) {
    throw new Error(`Mode config not found for: ${reasoning_mode}`);
  }

  const assets = lookupAssets(domains, reasoning_mode, source);

  const bundle = {
    bundle_id: generateBundleId(),
    assets,
    domain_context: domainConfig.description,
    mode_instruction: modeConfig.prompt_fragment,
  };

  // Validate before returning
  const result = ContextBundleSchema.safeParse(bundle);
  if (!result.success) {
    throw new Error(`ContextBundle validation failed: ${JSON.stringify(result.error.issues)}`);
  }

  return result.data;
}
