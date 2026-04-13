import { ZodSchema, output, input, ParseParams } from 'zod';
import { PartialDeep } from 'type-fest';
import { TypedSchema } from 'vee-validate';

/**
 * Transforms a Zod object schema to Yup's schema
 */
declare function toTypedSchema<TSchema extends ZodSchema, TOutput = output<TSchema>, TInput = PartialDeep<input<TSchema>>>(zodSchema: TSchema, opts?: Partial<ParseParams>): TypedSchema<TInput, TOutput>;
/**
 * @deprecated use toTypedSchema instead.
 */
declare const toFieldValidator: typeof toTypedSchema;
/**
 * @deprecated use toTypedSchema instead.
 */
declare const toFormValidator: typeof toTypedSchema;

export { toFieldValidator, toFormValidator, toTypedSchema };
