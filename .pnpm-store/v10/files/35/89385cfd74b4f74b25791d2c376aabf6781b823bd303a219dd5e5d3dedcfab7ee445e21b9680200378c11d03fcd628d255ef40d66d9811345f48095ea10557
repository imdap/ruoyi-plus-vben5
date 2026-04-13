import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
/**
 * JSON schema for the newlines between option. Validates configuration for
 * adding newlines between different groups.
 */
export declare let newlinesBetweenJsonSchema: JSONSchema4
/**
 * JSON schema for the newlines inside option.
 */
export declare let newlinesInsideJsonSchema: JSONSchema4
export declare function buildGroupsJsonSchema({
  allowedAdditionalTypeValues,
  additionalSortProperties,
}: {
  additionalSortProperties: Record<string, JSONSchema4> | undefined
  allowedAdditionalTypeValues: undefined | string[]
}): JSONSchema4
/**
 * Builds JSON schema for custom groups array configuration.
 *
 * Creates a schema that validates an array of custom group definitions.
 * Supports both single custom groups and "anyOf" groups containing multiple
 * subgroups. Each group must have a groupName and can include various matching
 * criteria.
 *
 * @example
 *
 * ```ts
 * // Valid configuration:
 * ;[
 *   {
 *     groupName: 'react',
 *     anyOf: [{ elementNamePattern: 'use*' }, { selector: 'hook' }],
 *   },
 *   {
 *     groupName: 'utils',
 *     elementNamePattern: '*Utils',
 *   },
 * ]
 * ```
 *
 * @param options - Configuration options.
 * @param options.additionalSortProperties - Extra properties for sorting.
 * @param options.additionalCustomGroupMatchProperties - Extra properties for
 *   matching custom groups.
 * @returns JSON schema for custom groups array validation.
 */
export declare function buildCustomGroupsArrayJsonSchema({
  additionalCustomGroupMatchProperties,
  allowedAdditionalTypeValues,
  additionalSortProperties,
}: {
  additionalCustomGroupMatchProperties: Record<string, JSONSchema4> | undefined
  additionalSortProperties: Record<string, JSONSchema4> | undefined
  allowedAdditionalTypeValues: undefined | string[]
}): JSONSchema4
export declare function buildCommonGroupsJsonSchemas({
  additionalCustomGroupMatchProperties,
  allowedAdditionalTypeValues,
  additionalSortProperties,
}?: {
  additionalCustomGroupMatchProperties?: Record<string, JSONSchema4>
  additionalSortProperties?: Record<string, JSONSchema4>
  allowedAdditionalTypeValues?: string[]
}): Record<string, JSONSchema4>
/**
 * Builds JSON schema for custom group modifiers configuration.
 *
 * Creates a schema that validates an array of modifiers that must be present on
 * an element for it to match a custom group.
 *
 * @example
 *
 * ```ts
 * // For TypeScript class members:
 * buildCustomGroupModifiersJsonSchema([
 *   'static',
 *   'private',
 *   'readonly',
 *   'async',
 * ])
 * ```
 *
 * @param modifiers - Array of valid modifier names.
 * @returns JSON schema for modifiers array validation.
 */
export declare function buildCustomGroupModifiersJsonSchema(
  modifiers: readonly string[],
): JSONSchema4
/**
 * Builds JSON schema for custom group selector configuration.
 *
 * Creates a schema that validates a selector string used to match specific
 * types of elements in a custom group.
 *
 * @example
 *
 * ```ts
 * // For class members:
 * buildCustomGroupSelectorJsonSchema([
 *   'property',
 *   'method',
 *   'constructor',
 *   'accessor',
 * ])
 * ```
 *
 * @param selectors - Array of valid selector names.
 * @returns JSON schema for selector validation.
 */
export declare function buildCustomGroupSelectorJsonSchema(
  selectors: readonly string[],
): JSONSchema4
