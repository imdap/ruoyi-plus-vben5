import { z } from "zod";
/**
 * A type which represents all the simple Zod types
 * that do not require special handling.
 */
export type SimpleSupportedZodTypes = z.ZodBoolean | z.ZodNumber | z.ZodString | z.ZodArray<any>;
/**
 * A type which represents all the supported Zod types
 * that do not require special handling.
 *
 * Other special types like ZodUnion, ZodIntersection, etc.
 * require special handling and are not included in this type.
 *
 * TODO: Add support for missing Zod types.
 */
export type BaseSupportedZodTypes = SimpleSupportedZodTypes | z.ZodRecord<any, any> | z.ZodObject<any, any, any, any, any> | z.ZodTuple<[any, ...any[]]>;
/**
 * A type which represents all the supported Zod types
 * that require special handling because they are composed
 * of multiple Zod types.
 *
 * TODO: Add support for missing Zod types.
 */
export type AdvancedSupportedZodTypes = z.ZodEffects<any> | z.ZodDefault<any> | z.ZodOptional<any> | z.ZodUnion<any> | z.ZodIntersection<any, any>;
/**
 * A type which represents all the supported Zod types.
 */
export type SupportedZodTypes = BaseSupportedZodTypes | AdvancedSupportedZodTypes;
/**
 * Returns the default values as an object for the provided schema.
 *
 * For example, given the following schema:
 * ```typescript
 * const schema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 *   isStudent: z.boolean().default(true),
 * });
 * ```
 *
 * The default object would be:
 * ```json
 * {
 *   name: "",
 *   age: 0,
 *   isStudent: true
 * }
 * ```
 * Note the default value for `isStudent` is `true` because it is specified in
 * the schema.
 *
 * @param schema
 */
export declare function getDefaultsForSchema<T extends z.ZodObject<any> | z.ZodUnion<any> | z.ZodIntersection<any, any> | z.ZodEffects<z.ZodObject<any> | z.ZodUnion<any> | z.ZodIntersection<any, any>>>(schema: T): z.infer<T>;
