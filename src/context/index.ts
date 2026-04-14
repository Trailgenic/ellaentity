import type { ContextBundle } from "./types";
import type { ClassificationOutput } from "../types/domain";
import type { Source } from "../types/request";

// TODO (Step 3): Implement assembleContext() function.
// - Takes classification result and request source
// - Calls lookupAssets with domains, mode, source
// - Loads domain description and mode prompt_fragment from config
// - Assembles ContextBundle with selected assets, domain_context, mode_instruction
// - Returns typed ContextBundle

export async function assembleContext(
  _classification: ClassificationOutput,
  _source: Source
): Promise<ContextBundle> {
  throw new Error("Not implemented — Step 3");
}
