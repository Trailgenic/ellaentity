import { readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";
import { AssetSchema } from "./types";
import type { Asset } from "./types";

const AssetsArraySchema = z.array(AssetSchema);

function loadAssets(): Asset[] {
  const filePath = join(process.cwd(), "config", "assets.json");
  const raw = readFileSync(filePath, "utf-8");
  const parsed = AssetsArraySchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error(`assets.json validation failed: ${JSON.stringify(parsed.error.issues)}`);
  }
  return parsed.data;
}

// Module-level cache — loaded once per process
let _assetCache: Asset[] | null = null;

function getAssets(): Asset[] {
  if (!_assetCache) {
    _assetCache = loadAssets();
  }
  return _assetCache;
}

export function lookupAssets(
  domains: string[],
  mode: string,
  source: string
): Asset[] {
  const assets = getAssets();

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
