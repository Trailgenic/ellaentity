import type { TraceRecord } from "../types/trace";

// TODO (Step 4): Implement logger.
// - Accepts TraceRecord and writes to console (JSON format)
// - Pluggable: interface allows swapping to DB/file/external service later
// - Must sanitize: no secrets, no raw API keys in logs
// - Must include: request_id, timestamp, latency_ms, route, error_code

export function logTrace(_trace: TraceRecord): void {
  throw new Error("Not implemented — Step 4");
}
