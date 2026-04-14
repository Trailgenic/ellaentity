import type { ClassificationOutput } from "../types/domain";

// TODO (Step 2): Implement classify() function.
// - Takes raw_input string
// - Calls Claude with CLASSIFIER_SYSTEM_PROMPT
// - Parses and validates response against ClassificationOutputSchema
// - Returns typed ClassificationOutput

export async function classify(
  _rawInput: string
): Promise<ClassificationOutput> {
  throw new Error("Not implemented — Step 2");
}
