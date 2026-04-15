import rawDomains from "../../config/domains.json";
import rawModes from "../../config/modes.json";
import { z } from "zod";
import { lookupAssets } from "./registry";
import { ContextBundleSchema } from "./types";
import type { ContextBundle } from "./types";
import type { ClassificationOutput } from "../types/domain";
import type { Source } from "../types/request";
import { generateBundleId } from "../lib/ids";

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

const domainsResult = DomainConfigSchema.safeParse(rawDomains);
if (!domainsResult.success) {
  throw new Error(`domains.json validation failed: ${JSON.stringify(domainsResult.error.issues)}`);
}

const modesResult = ModeConfigSchema.safeParse(rawModes);
if (!modesResult.success) {
  throw new Error(`modes.json validation failed: ${JSON.stringify(modesResult.error.issues)}`);
}

const domains = domainsResult.data;
const modes = modesResult.data;

export async function assembleContext(
  classification: ClassificationOutput,
  source: Source
): Promise<ContextBundle> {
  const { domains: classifiedDomains, reasoning_mode } = classification;

  const primaryDomain = classifiedDomains[0];

  const domainConfig = domains.find((d) => d.name === primaryDomain);
  if (!domainConfig) {
    throw new Error(`Domain config not found for: ${primaryDomain}`);
  }

  const modeConfig = modes.find((m) => m.name === reasoning_mode);
  if (!modeConfig) {
    throw new Error(`Mode config not found for: ${reasoning_mode}`);
  }

  const assets = lookupAssets(classifiedDomains, reasoning_mode, source);

  const bundle = {
    bundle_id: generateBundleId(),
    assets,
    domain_context: domainConfig.description,
    mode_instruction: modeConfig.prompt_fragment,
  };

  const result = ContextBundleSchema.safeParse(bundle);
  if (!result.success) {
    throw new Error(`ContextBundle validation failed: ${JSON.stringify(result.error.issues)}`);
  }

  return result.data;
}
