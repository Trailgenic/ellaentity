// @ts-ignore -- package may be unavailable in restricted install environments; runtime integration validated in later steps.
import Anthropic from "@anthropic-ai/sdk";
import { CLASSIFIER_SYSTEM_PROMPT } from "./prompt";
import { ClassificationOutputSchema } from "../types/domain";
import type { ClassificationOutput } from "../types/domain";
import { ClassificationError } from "../lib/errors";

const client = new Anthropic();

export async function classify(rawInput: string): Promise<ClassificationOutput> {
  let responseText: string;

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: CLASSIFIER_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: rawInput,
        },
      ],
    });

    const textBlock = response.content.find((block: { type: string }) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new ClassificationError("No text block in classifier response");
    }

    responseText = textBlock.text.trim();
  } catch (err) {
    if (err instanceof ClassificationError) throw err;
    const message = err instanceof Error ? err.message : String(err);
    const status = (err as any)?.status;
    const errBody = (err as any)?.error;
    throw new ClassificationError("Anthropic API call failed", {
      cause: message,
      status,
      errBody,
    });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new ClassificationError("Classifier response is not valid JSON", {
      raw: responseText,
    });
  }

  const result = ClassificationOutputSchema.safeParse(parsed);
  if (!result.success) {
    throw new ClassificationError("Classifier response failed schema validation", {
      issues: result.error.issues,
      raw: responseText,
    });
  }

  return result.data;
}
