export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { classify } from "../../../src/classifier";
import { assembleContext } from "../../../src/context";
import { executeWithClaude } from "../../../src/executor/claude";
import { logTrace } from "../../../src/logger";
import { validateRequest } from "../../../src/lib/validation";
import { resolveRoute } from "../../../src/lib/router";
import { buildResponse } from "../../../src/lib/response";
import { generateRequestId } from "../../../src/lib/ids";
import { nowISO, startTimer } from "../../../src/lib/time";
import { EllaError } from "../../../src/lib/errors";
import type { TraceRecord } from "../../../src/types/trace";

export async function POST(req: NextRequest) {
  const request_id = generateRequestId();
  const elapsed = startTimer();
  const timestamp = nowISO();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "INVALID_JSON", message: "Request body must be valid JSON" },
      { status: 400 }
    );
  }

  // 1. Validate
  let input;
  try {
    input = validateRequest(body);
  } catch (err) {
    return NextResponse.json(
      {
        error: "VALIDATION_ERROR",
        message: err instanceof Error ? err.message : "Invalid request",
      },
      { status: 400 }
    );
  }

  // 2. Classify
  let classification;
  try {
    classification = await classify(input.raw_input);
  } catch (err) {
    const latency_ms = elapsed();
    logTrace({
      request_id,
      timestamp,
      source: input.source,
      raw_input: input.raw_input,
      intent: "",
      task_type: "",
      domains: ["hybrid"],
      reasoning_mode: "truth_model",
      confidence: 0,
      context_bundle_id: "",
      context_asset_ids: [],
      route: "clarify",
      model_used: null,
      response_hash: null,
      latency_ms,
      error_code: "CLASSIFICATION_ERROR",
    });
    return NextResponse.json(
      {
        error: "CLASSIFICATION_ERROR",
        message: err instanceof Error ? err.message : "Classification failed",
        details: (err as any)?.details ?? null,
      },
      { status: 502 }
    );
  }

  // 3. Assemble context
  let contextBundle;
  try {
    contextBundle = await assembleContext(classification, input.source);
  } catch (err) {
    const latency_ms = elapsed();
    logTrace({
      request_id,
      timestamp,
      source: input.source,
      raw_input: input.raw_input,
      intent: classification.intent,
      task_type: classification.task_type,
      domains: classification.domains,
      reasoning_mode: classification.reasoning_mode,
      confidence: classification.confidence,
      context_bundle_id: "",
      context_asset_ids: [],
      route: "clarify",
      model_used: null,
      response_hash: null,
      latency_ms,
      error_code: "CONTEXT_ERROR",
    });
    return NextResponse.json(
      {
        error: "CONTEXT_ERROR",
        message: err instanceof Error ? err.message : "Context assembly failed",
      },
      { status: 502 }
    );
  }

  // 4. Resolve route
  const route = resolveRoute(classification, { draft: input.draft ?? false });

  // 5. Execute (only if route is execute_with_claude)
  let draft: string | null = null;
  let model_used: string | null = null;
  let clarification_prompt: string | null = null;

  if (route === "execute_with_claude") {
    try {
      const executorOutput = await executeWithClaude(classification, contextBundle);
      draft = executorOutput.draft;
      model_used = executorOutput.model_used;
    } catch (err) {
      const latency_ms = elapsed();
      logTrace({
        request_id,
        timestamp,
        source: input.source,
        raw_input: input.raw_input,
        intent: classification.intent,
        task_type: classification.task_type,
        domains: classification.domains,
        reasoning_mode: classification.reasoning_mode,
        confidence: classification.confidence,
        context_bundle_id: contextBundle.bundle_id,
        context_asset_ids: contextBundle.assets.map((a) => a.asset_id),
        route,
        model_used: null,
        response_hash: null,
        latency_ms,
        error_code: "EXECUTION_ERROR",
      });
      return NextResponse.json(
        {
          error: "EXECUTION_ERROR",
          message: err instanceof Error ? err.message : "Execution failed",
        },
        { status: 502 }
      );
    }
  }

  if (route === "clarify") {
    clarification_prompt =
      "Your request needs a bit more context. Could you clarify which area you're focused on - physiological methodology, institutional intelligence, advisory services, or system architecture?";
  }

  // 6. Build response
  const review_required =
    classification.confidence < 0.9 || route === "execute_with_claude";

  const response = buildResponse({
    request_id,
    classification,
    context_bundle_id: contextBundle.bundle_id,
    route,
    review_required,
    draft,
    clarification_prompt,
    trace: input.trace
      ? {
          classification: classification as unknown as Record<string, unknown>,
          context_bundle: contextBundle as unknown as Record<string, unknown>,
          decision: { route, review_required },
        }
      : null,
  });

  // 7. Log trace
  const latency_ms = elapsed();
  const traceRecord: TraceRecord = {
    request_id,
    timestamp,
    source: input.source,
    raw_input: input.raw_input,
    intent: classification.intent,
    task_type: classification.task_type,
    domains: classification.domains,
    reasoning_mode: classification.reasoning_mode,
    confidence: classification.confidence,
    context_bundle_id: contextBundle.bundle_id,
    context_asset_ids: contextBundle.assets.map((a) => a.asset_id),
    route,
    model_used,
    response_hash: null,
    latency_ms,
  };
  logTrace(traceRecord);

  return NextResponse.json(response, { status: 200 });
}
