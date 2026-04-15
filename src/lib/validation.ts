import { RequestInputSchema } from "../types/request";
import type { RequestInput } from "../types/request";
import { ValidationError } from "./errors";

export function validateRequest(input: unknown): RequestInput {
  const result = RequestInputSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError("Invalid request input", {
      issues: result.error.issues,
    });
  }
  return result.data;
}
