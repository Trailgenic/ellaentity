import type { RouteDecision } from "../types/output";

interface RouteInput {
  confidence: number;
  requires_clarification: boolean;
}

interface RouteOptions {
  draft: boolean;
}

const DEFAULT_CONFIDENCE_THRESHOLD = 0.75;

export function resolveRoute(
  classification: RouteInput,
  options: RouteOptions,
  confidenceThreshold: number = parseFloat(
    process.env.DEFAULT_CONFIDENCE_THRESHOLD ?? ""
  ) || DEFAULT_CONFIDENCE_THRESHOLD
): RouteDecision {
  if (
    classification.confidence < confidenceThreshold ||
    classification.requires_clarification
  ) {
    return "clarify";
  }

  if (!options.draft) {
    return "classify_only";
  }

  return "execute_with_claude";
}
