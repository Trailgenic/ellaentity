import { z } from "zod";

export const ExecutorOutputSchema = z.object({
  draft: z.string(),
  model_used: z.string(),
  token_usage: z.object({
    input_tokens: z.number(),
    output_tokens: z.number(),
  }),
});

export type ExecutorOutput = z.infer<typeof ExecutorOutputSchema>;
