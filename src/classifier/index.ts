import Anthropic from "@anthropic-ai/sdk";
import { CLASSIFIER_SYSTEM_PROMPT } from "./prompt";
import { ClassificationOutputSchema } from "../types/domain";
import type { ClassificationOutput } from "../types/domain";
import { ClassificationError } from "../lib/errors";

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new ClassificationError("ANTHROPIC_API_KEY is not configured");
  }

  return new Anthropic({ apiKey });
}

export async function classify(rawInput: string): Promise<ClassificationOutput> {
  const client = getAnthropicClient();
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

    responseText = textBlock.text.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
  } catch (err) {
    if (err instanceof ClassificationError) throw err;
    const message = err instanceof Error ? err.message : String(err);
    const status = typeof err === "object" && err !== null && "status" in err ? (err as Record<string, unknown>).status : undefined;
    const errBody = typeof err === "object" && err !== null && "error" in err ? (err as Record<string, unknown>).error : undefined;
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
