import type { Asset } from "./types";

// TODO (Step 3): Implement asset registry.
// - Loads assets from /config/assets.json
// - Provides lookup by domain_tags and mode_tags
// - Filters by visibility based on request source
// - Returns sorted by priority (descending)

export function lookupAssets(
  _domains: string[],
  _mode: string,
  _source: string
): Asset[] {
  throw new Error("Not implemented — Step 3");
}
