import { z } from "zod";
import { SourceSchema } from "./request";
import { DomainSchema } from "./domain";
import { ReasoningModeSchema } from "./mode";

export const TraceRecordSchema = z.object({
  request_id: z.string().uuid(),
  timestamp: z.string().datetime(),
  source: SourceSchema,
  raw_input: z.string(),
  intent: z.string(),
  task_type: z.string(),
  domains: z.array(DomainSchema),
  reasoning_mode: ReasoningModeSchema,
  confidence: z.number(),
  context_bundle_id: z.string(),
  context_asset_ids: z.array(z.string()),
  route: z.string(),
  model_used: z.string().nullable(),
  response_hash: z.string().nullable(),
  latency_ms: z.number(),
  error_code: z.string().optional(),
});

export type TraceRecord = z.infer<typeof TraceRecordSchema>;
