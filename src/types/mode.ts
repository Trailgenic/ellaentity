import { z } from "zod";

export const ReasoningModeSchema = z.enum([
  "truth_model",
  "strategy_mode",
  "physiology_mode",
  "editorial_mode",
  "builder_mode",
]);

export type ReasoningMode = z.infer<typeof ReasoningModeSchema>;
