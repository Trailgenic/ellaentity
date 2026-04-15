import type { TraceRecord } from "../types/trace";

export function logTrace(trace: TraceRecord): void {
  // Sanitize — never log raw inputs that could contain PII or secrets
  const sanitized = {
    request_id: trace.request_id,
    timestamp: trace.timestamp,
    source: trace.source,
    intent: trace.intent,
    task_type: trace.task_type,
    domains: trace.domains,
    reasoning_mode: trace.reasoning_mode,
    confidence: trace.confidence,
    context_bundle_id: trace.context_bundle_id,
    context_asset_ids: trace.context_asset_ids,
    route: trace.route,
    model_used: trace.model_used,
    response_hash: trace.response_hash,
    latency_ms: trace.latency_ms,
    ...(trace.error_code ? { error_code: trace.error_code } : {}),
    // raw_input intentionally excluded from logs
  };

  console.log(JSON.stringify({ level: "info", event: "trace", ...sanitized }));
}
