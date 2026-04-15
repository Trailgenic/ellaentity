import rawAssets from "../../config/assets.json";
import { z } from "zod";
import { AssetSchema } from "./types";
import type { Asset } from "./types";

const AssetsArraySchema = z.array(AssetSchema);

const parsed = AssetsArraySchema.safeParse(rawAssets);
if (!parsed.success) {
  throw new Error(`assets.json validation failed: ${JSON.stringify(parsed.error.issues)}`);
}

const assets: Asset[] = parsed.data;

export function lookupAssets(
  domains: string[],
  mode: string,
  source: string
): Asset[] {
  const visibilityAllowed = (asset: Asset): boolean => {
    if (source === "internal") return true;
    return asset.visibility === "public_ok";
  };

  const domainMatch = (asset: Asset): boolean =>
    asset.domain_tags.some((tag) => domains.includes(tag));

  const modeMatch = (asset: Asset): boolean =>
    asset.mode_tags.includes(mode as Asset["mode_tags"][number]);

  return assets
    .filter((asset) => visibilityAllowed(asset) && domainMatch(asset) && modeMatch(asset))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);
}
