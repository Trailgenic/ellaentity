import { z } from "zod";
import { DomainSchema } from "./domain";
import { ReasoningModeSchema } from "./mode";

export const RouteDecisionSchema = z.enum([
  "clarify",
  "classify_only",
  "execute_with_claude",
]);
export type RouteDecision = z.infer<typeof RouteDecisionSchema>;

export const ProcessResponseSchema = z.object({
  request_id: z.string().uuid(),
  intent: z.string(),
  task_type: z.string(),
  domains: z.array(DomainSchema),
  reasoning_mode: ReasoningModeSchema,
  context_bundle_id: z.string(),
  route: RouteDecisionSchema,
  confidence: z.number(),
  review_required: z.boolean(),
  draft: z.string().nullable(),
  clarification_prompt: z.string().nullable(),
  trace: z
    .object({
      classification: z.record(z.string(), z.unknown()).nullable(),
      context_bundle: z.record(z.string(), z.unknown()).nullable(),
      decision: z.record(z.string(), z.unknown()).nullable(),
    })
    .nullable(),
});

export type ProcessResponse = z.infer<typeof ProcessResponseSchema>;
