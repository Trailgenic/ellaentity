import type { ExecutorOutput } from "./types";
import type { ContextBundle } from "../context/types";
import type { ClassificationOutput } from "../types/domain";

// TODO (Step 4): Implement Claude executor.
// - Takes ClassificationOutput + ContextBundle
// - Builds system prompt from context bundle (domain_context + mode_instruction + asset descriptions)
// - Calls Anthropic SDK with assembled prompt
// - Parses response and returns ExecutorOutput
// - Architecture must remain model-agnostic (adapter pattern)

export async function executeWithClaude(
  _classification: ClassificationOutput,
  _contextBundle: ContextBundle
): Promise<ExecutorOutput> {
  throw new Error("Not implemented — Step 4");
}
