import { z } from "zod";
import { ReasoningModeSchema } from "./mode";

export const DomainSchema = z.enum([
  "trailgenic",
  "exmxc",
  "mikeye",
  "ella_entity",
  "hybrid",
]);
export type Domain = z.infer<typeof DomainSchema>;

export const ClassificationOutputSchema = z.object({
  intent: z.string().min(1),
  task_type: z.string().min(1),
  domains: z.array(DomainSchema).min(1),
  reasoning_mode: ReasoningModeSchema,
  confidence: z.number().min(0).max(1),
  ambiguity_score: z.number().min(0).max(1),
  requires_clarification: z.boolean(),
});

export type ClassificationOutput = z.infer<typeof ClassificationOutputSchema>;
