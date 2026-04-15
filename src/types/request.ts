import { z } from "zod";

export const SourceSchema = z.enum(["chat", "api", "internal"]);
export type Source = z.infer<typeof SourceSchema>;

export const RequestInputSchema = z.object({
  raw_input: z.string().trim().min(1, "Input cannot be empty"),
  source: SourceSchema,
  draft: z.boolean().optional().default(false),
  trace: z.boolean().optional().default(false),
});

export type RequestInput = z.infer<typeof RequestInputSchema>;
