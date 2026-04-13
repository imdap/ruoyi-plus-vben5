import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
/**
 * JSON schema for the sort order option. Validates ascending or descending sort
 * direction.
 */
export declare let orderJsonSchema: JSONSchema4
export declare let matchesAstSelectorJsonSchema: JSONSchema4
/**
 * Builds a collection of common JSON schemas used across sorting rules.
 *
 * Creates schemas for standard sorting options that are shared by multiple
 * rules. This ensures consistent validation across the plugin.
 *
 * @param options - Configuration options.
 * @param options.additionalSortProperties - Extra sort-related option schemas
 *   to add at the root level and inside fallbackSort.
 * @returns Object containing common JSON schemas for rule validation.
 */
export declare function buildCommonJsonSchemas({
  allowedAdditionalTypeValues,
  additionalSortProperties,
}?: {
  additionalSortProperties?: Record<string, JSONSchema4>
  allowedAdditionalTypeValues?: string[]
}): Record<string, JSONSchema4>
/**
 * Builds JSON schema for fallback sort configuration.
 *
 * Creates a schema for the fallback sorting option that is applied when the
 * primary sort results in equality. Allows customization through additional
 * properties.
 *
 * @param options - Configuration options.
 * @param options.additionalProperties - Extra properties to include in the
 *   schema.
 * @returns JSON schema for fallback sort validation.
 */
export declare function buildFallbackSortJsonSchema({
  allowedAdditionalTypeValues,
  additionalProperties,
}: {
  additionalProperties: Record<string, JSONSchema4> | undefined
  allowedAdditionalTypeValues: undefined | string[]
}): JSONSchema4
/**
 * Builds JSON schema for conditional configuration blocks.
 *
 * Creates a schema for configuration that is applied only when certain
 * conditions are met. Used for context-specific sorting rules where different
 * configurations apply based on element patterns.
 *
 * @param options - Configuration options for the conditional block.
 * @param options.additionalProperties - Extra properties to include in the
 *   schema.
 * @returns JSON schema for conditional configuration validation.
 */
export declare function buildUseConfigurationIfJsonSchema({
  additionalProperties,
}?: {
  additionalProperties?: Record<string, JSONSchema4>
}): JSONSchema4
export declare function buildTypeJsonSchema({
  allowedAdditionalValues,
}: {
  allowedAdditionalValues: undefined | string[]
}): JSONSchema4
export declare function buildRegexJsonSchema({
  additionalProperties,
}?: {
  additionalProperties?: Record<string, JSONSchema4>
}): JSONSchema4
export declare let useExperimentalDependencyDetectionJsonSchema: JSONSchema4
