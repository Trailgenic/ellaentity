// @ts-ignore -- package install may be restricted in this environment
import OpenAI from "openai";
import { EXECUTOR_MODEL } from "./types";
import type { ExecutorOutput } from "./types";
import type { ContextBundle } from "../context/types";
import type { ClassificationOutput } from "../types/domain";
import { ExecutionError } from "../lib/errors";

const client = new OpenAI();

function buildSystemPrompt(contextBundle: ContextBundle): string {
  const assetDescriptions = contextBundle.assets
    .map((a) => `- [${a.title}]: ${a.description}`)
    .join("\n");

  return [
    contextBundle.domain_context,
    "",
    contextBundle.mode_instruction,
    "",
    "## Available Context Assets",
    assetDescriptions.length > 0
      ? assetDescriptions
      : "No specific assets matched for this request.",
    "",
    "Respond directly and substantively. Do not explain your reasoning mode or reference the system architecture.",
  ].join("\n");
}

export async function executeWithClaude(
  classification: ClassificationOutput,
  contextBundle: ContextBundle
): Promise<ExecutorOutput> {
  const systemPrompt = buildSystemPrompt(contextBundle);

  let response: OpenAI.Chat.ChatCompletion;

  try {
    response = await client.chat.completions.create({
      model: EXECUTOR_MODEL,
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: classification.intent,
        },
      ],
    });
  } catch (err) {
    throw new ExecutionError("OpenAI API call failed", {
      cause: err instanceof Error ? err.message : String(err),
    });
  }

  const choice = response.choices[0];
  if (!choice?.message?.content) {
    throw new ExecutionError("No content in executor response");
  }

  return {
    draft: choice.message.content,
    model_used: EXECUTOR_MODEL,
    token_usage: {
      input_tokens: response.usage?.prompt_tokens ?? 0,
      output_tokens: response.usage?.completion_tokens ?? 0,
    },
  };
}
