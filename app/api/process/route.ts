import { NextResponse } from "next/server";

// TODO (Step 4): Wire up the /process endpoint.
// Pipeline: validate → classify → assemble context → resolve route → execute (if draft) → log trace → respond
// For now, returns a stub response indicating the endpoint exists but is not yet implemented.

export async function POST() {
  return NextResponse.json(
    {
      status: "not_implemented",
      message:
        "Ella Entity /process endpoint — scaffold only. Implementation begins at Step 2.",
      step: 1,
      pipeline: [
        "validate",
        "classify",
        "assemble_context",
        "resolve_route",
        "execute",
        "log_trace",
        "respond",
      ],
    },
    { status: 501 }
  );
}
