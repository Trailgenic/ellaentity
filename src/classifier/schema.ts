import { z } from "zod";
import { ClassificationOutputSchema } from "../types/domain";

// Re-export for classifier-internal and cross-module use
export { ClassificationOutputSchema };

// Classifier request envelope (used in eval harness)
export const ClassifierRequestSchema = z.object({
  raw_input: z.string().trim().min(1),
});

export type ClassifierRequest = z.infer<typeof ClassifierRequestSchema>;
