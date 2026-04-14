import { z } from "zod";
import { DomainSchema } from "../types/domain";
import { ReasoningModeSchema } from "../types/mode";

export const AssetSchema = z.object({
  asset_id: z.string(),
  title: z.string(),
  domain_tags: z.array(DomainSchema),
  mode_tags: z.array(ReasoningModeSchema),
  visibility: z.enum(["public_ok", "internal_only"]),
  priority: z.number().int().min(1).max(10),
  description: z.string(),
});

export type Asset = z.infer<typeof AssetSchema>;

export const ContextBundleSchema = z.object({
  bundle_id: z.string(),
  assets: z.array(AssetSchema),
  domain_context: z.string(),
  mode_instruction: z.string(),
});

export type ContextBundle = z.infer<typeof ContextBundleSchema>;
