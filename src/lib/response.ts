import type { ProcessResponse } from "../types/output";
import type { ClassificationOutput } from "../types/domain";
import type { RouteDecision } from "../types/output";

export function buildResponse(params: {
  request_id: string;
  classification: ClassificationOutput;
  context_bundle_id: string;
  route: RouteDecision;
  review_required: boolean;
  draft: string | null;
  clarification_prompt: string | null;
  trace: ProcessResponse["trace"];
}): ProcessResponse {
  return {
    request_id: params.request_id,
    intent: params.classification.intent,
    task_type: params.classification.task_type,
    domains: params.classification.domains,
    reasoning_mode: params.classification.reasoning_mode,
    context_bundle_id: params.context_bundle_id,
    route: params.route,
    confidence: params.classification.confidence,
    review_required: params.review_required,
    draft: params.draft,
    clarification_prompt: params.clarification_prompt,
    trace: params.trace,
  };
}
