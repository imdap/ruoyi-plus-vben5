/**
 * Walks a value and converts it into a JSON-serializable representation.
 *
 * This function recursively traverses complex structures and normalizes them
 * so they can be safely passed to {@link JSON.stringify}. The following
 * conversions are applied:
 *
 * - Primitive types (`string`, `number`, `boolean`, `undefined`) are returned as-is.
 * - `null` is returned as `null`.
 * - Objects implementing `toJSON()` are serialized using that method.
 * - `RegExp` instances are converted to their string form (e.g. `/pattern/gi`).
 * - `Map` instances become arrays of `[key, value]` entry pairs, with both keys
 *   and values processed through `walkToJSONObj`.
 * - `Set` instances become arrays of their values, each processed through
 *   `walkToJSONObj`.
 * - Boxed `String` objects are converted to primitive strings.
 * - Arrays are mapped element-wise via `walkToJSONObj`.
 * - Plain objects are converted to new objects whose property values are
 *   processed via `walkToJSONObj`.
 * - `bigint` values are currently returned as-is (note: not natively supported
 *   by `JSON.stringify`).
 * - Functions are converted to `undefined`.
 *
 * @param value - The value to transform into a JSON-serializable structure.
 * @returns A JSON-serializable representation of the input value.
 */
export declare function walkToJSONObj(value: unknown): unknown;
//# sourceMappingURL=settingsToJson.d.ts.map