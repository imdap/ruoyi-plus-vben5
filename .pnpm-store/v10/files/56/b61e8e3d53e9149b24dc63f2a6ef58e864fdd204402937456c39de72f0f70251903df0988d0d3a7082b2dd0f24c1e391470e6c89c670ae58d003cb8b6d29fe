//#region ../../library/src/types/metadata.d.ts
/**
* Base metadata interface.
*/
interface BaseMetadata<TInput$1> {
  /**
  * The object kind.
  */
  readonly kind: "metadata";
  /**
  * The metadata type.
  */
  readonly type: string;
  /**
  * The metadata reference.
  */
  readonly reference: (...args: any[]) => BaseMetadata<any>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: TInput$1;
    readonly output: TInput$1;
    readonly issue: never;
  } | undefined;
}
//#endregion
//#region ../../library/src/types/dataset.d.ts
/**
* Unknown dataset interface.
*/
interface UnknownDataset {
  /**
  * Whether is's typed.
  */
  typed?: false;
  /**
  * The dataset value.
  */
  value: unknown;
  /**
  * The dataset issues.
  */
  issues?: undefined;
}
/**
* Success dataset interface.
*/
interface SuccessDataset<TValue$1> {
  /**
  * Whether is's typed.
  */
  typed: true;
  /**
  * The dataset value.
  */
  value: TValue$1;
  /**
  * The dataset issues.
  */
  issues?: undefined;
}
/**
* Partial dataset interface.
*/
interface PartialDataset<TValue$1, TIssue extends BaseIssue<unknown>> {
  /**
  * Whether is's typed.
  */
  typed: true;
  /**
  * The dataset value.
  */
  value: TValue$1;
  /**
  * The dataset issues.
  */
  issues: [TIssue, ...TIssue[]];
}
/**
* Failure dataset interface.
*/
interface FailureDataset<TIssue extends BaseIssue<unknown>> {
  /**
  * Whether is's typed.
  */
  typed: false;
  /**
  * The dataset value.
  */
  value: unknown;
  /**
  * The dataset issues.
  */
  issues: [TIssue, ...TIssue[]];
}
/**
* Output dataset type.
*/
type OutputDataset<TValue$1, TIssue extends BaseIssue<unknown>> = SuccessDataset<TValue$1> | PartialDataset<TValue$1, TIssue> | FailureDataset<TIssue>;
//#endregion
//#region ../../library/src/types/standard.d.ts
/**
* The Standard Schema properties interface.
*/
interface StandardProps<TInput$1, TOutput> {
  /**
  * The version number of the standard.
  */
  readonly version: 1;
  /**
  * The vendor name of the schema library.
  */
  readonly vendor: "valibot";
  /**
  * Validates unknown input values.
  */
  readonly validate: (value: unknown) => StandardResult<TOutput> | Promise<StandardResult<TOutput>>;
  /**
  * Inferred types associated with the schema.
  */
  readonly types?: StandardTypes<TInput$1, TOutput> | undefined;
}
/**
* The result interface of the validate function.
*/
type StandardResult<TOutput> = StandardSuccessResult<TOutput> | StandardFailureResult;
/**
* The result interface if validation succeeds.
*/
interface StandardSuccessResult<TOutput> {
  /**
  * The typed output value.
  */
  readonly value: TOutput;
  /**
  * The non-existent issues.
  */
  readonly issues?: undefined;
}
/**
* The result interface if validation fails.
*/
interface StandardFailureResult {
  /**
  * The issues of failed validation.
  */
  readonly issues: readonly StandardIssue[];
}
/**
* The issue interface of the failure output.
*/
interface StandardIssue {
  /**
  * The error message of the issue.
  */
  readonly message: string;
  /**
  * The path of the issue, if any.
  */
  readonly path?: readonly (PropertyKey | StandardPathItem)[] | undefined;
}
/**
* The path item interface of the issue.
*/
interface StandardPathItem {
  /**
  * The key of the path item.
  */
  readonly key: PropertyKey;
}
/**
* The Standard Schema types interface.
*/
interface StandardTypes<TInput$1, TOutput> {
  /**
  * The input type of the schema.
  */
  readonly input: TInput$1;
  /**
  * The output type of the schema.
  */
  readonly output: TOutput;
}
//#endregion
//#region ../../library/src/types/schema.d.ts
/**
* Base schema interface.
*/
interface BaseSchema<TInput$1, TOutput, TIssue extends BaseIssue<unknown>> {
  /**
  * The object kind.
  */
  readonly kind: "schema";
  /**
  * The schema type.
  */
  readonly type: string;
  /**
  * The schema reference.
  */
  readonly reference: (...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>>;
  /**
  * The expected property.
  */
  readonly expects: string;
  /**
  * Whether it's async.
  */
  readonly async: false;
  /**
  * The Standard Schema properties.
  *
  * @internal
  */
  readonly "~standard": StandardProps<TInput$1, TOutput>;
  /**
  * Parses unknown input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, TIssue>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: TInput$1;
    readonly output: TOutput;
    readonly issue: TIssue;
  } | undefined;
}
/**
* Base schema async interface.
*/
interface BaseSchemaAsync<TInput$1, TOutput, TIssue extends BaseIssue<unknown>> extends Omit<BaseSchema<TInput$1, TOutput, TIssue>, "reference" | "async" | "~run"> {
  /**
  * The schema reference.
  */
  readonly reference: (...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;
  /**
  * Whether it's async.
  */
  readonly async: true;
  /**
  * Parses unknown input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, TIssue>>;
}
//#endregion
//#region ../../library/src/types/transformation.d.ts
/**
* Base transformation interface.
*/
interface BaseTransformation<TInput$1, TOutput, TIssue extends BaseIssue<unknown>> {
  /**
  * The object kind.
  */
  readonly kind: "transformation";
  /**
  * The transformation type.
  */
  readonly type: string;
  /**
  * The transformation reference.
  */
  readonly reference: (...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>>;
  /**
  * Whether it's async.
  */
  readonly async: false;
  /**
  * Transforms known input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: SuccessDataset<TInput$1>, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: TInput$1;
    readonly output: TOutput;
    readonly issue: TIssue;
  } | undefined;
}
/**
* Base transformation async interface.
*/
interface BaseTransformationAsync<TInput$1, TOutput, TIssue extends BaseIssue<unknown>> extends Omit<BaseTransformation<TInput$1, TOutput, TIssue>, "reference" | "async" | "~run"> {
  /**
  * The transformation reference.
  */
  readonly reference: (...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>> | BaseTransformationAsync<any, any, BaseIssue<unknown>>;
  /**
  * Whether it's async.
  */
  readonly async: true;
  /**
  * Transforms known input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: SuccessDataset<TInput$1>, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>;
}
//#endregion
//#region ../../library/src/types/validation.d.ts
/**
* Base validation interface.
*/
interface BaseValidation<TInput$1, TOutput, TIssue extends BaseIssue<unknown>> {
  /**
  * The object kind.
  */
  readonly kind: "validation";
  /**
  * The validation type.
  */
  readonly type: string;
  /**
  * The validation reference.
  */
  readonly reference: (...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>>;
  /**
  * The expected property.
  */
  readonly expects: string | null;
  /**
  * Whether it's async.
  */
  readonly async: false;
  /**
  * Validates known input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: OutputDataset<TInput$1, BaseIssue<unknown>>, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: TInput$1;
    readonly output: TOutput;
    readonly issue: TIssue;
  } | undefined;
}
/**
* Base validation async interface.
*/
interface BaseValidationAsync<TInput$1, TOutput, TIssue extends BaseIssue<unknown>> extends Omit<BaseValidation<TInput$1, TOutput, TIssue>, "reference" | "async" | "~run"> {
  /**
  * The validation reference.
  */
  readonly reference: (...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>> | BaseValidationAsync<any, any, BaseIssue<unknown>>;
  /**
  * Whether it's async.
  */
  readonly async: true;
  /**
  * Validates known input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: OutputDataset<TInput$1, BaseIssue<unknown>>, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>;
}
//#endregion
//#region ../../library/src/types/infer.d.ts
/**
* Infer input type.
*/
type InferInput<TItem$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>> = NonNullable<TItem$1["~types"]>["input"];
/**
* Infer output type.
*/
type InferOutput<TItem$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>> = NonNullable<TItem$1["~types"]>["output"];
//#endregion
//#region ../../library/src/types/utils.d.ts
/**
* Constructs a type that is maybe readonly.
*/
type MaybeReadonly<TValue$1> = TValue$1 | Readonly<TValue$1>;
//#endregion
//#region ../../library/src/types/other.d.ts
/**
* Error message type.
*/
type ErrorMessage<TIssue extends BaseIssue<unknown>> = ((issue: TIssue) => string) | string;
//#endregion
//#region ../../library/src/types/issue.d.ts
/**
* Array path item interface.
*/
interface ArrayPathItem {
  /**
  * The path item type.
  */
  readonly type: "array";
  /**
  * The path item origin.
  */
  readonly origin: "value";
  /**
  * The path item input.
  */
  readonly input: MaybeReadonly<unknown[]>;
  /**
  * The path item key.
  */
  readonly key: number;
  /**
  * The path item value.
  */
  readonly value: unknown;
}
/**
* Map path item interface.
*/
interface MapPathItem {
  /**
  * The path item type.
  */
  readonly type: "map";
  /**
  * The path item origin.
  */
  readonly origin: "key" | "value";
  /**
  * The path item input.
  */
  readonly input: Map<unknown, unknown>;
  /**
  * The path item key.
  */
  readonly key: unknown;
  /**
  * The path item value.
  */
  readonly value: unknown;
}
/**
* Object path item interface.
*/
interface ObjectPathItem {
  /**
  * The path item type.
  */
  readonly type: "object";
  /**
  * The path item origin.
  */
  readonly origin: "key" | "value";
  /**
  * The path item input.
  */
  readonly input: Record<string, unknown>;
  /**
  * The path item key.
  */
  readonly key: string;
  /**
  * The path item value.
  */
  readonly value: unknown;
}
/**
* Set path item interface.
*/
interface SetPathItem {
  /**
  * The path item type.
  */
  readonly type: "set";
  /**
  * The path item origin.
  */
  readonly origin: "value";
  /**
  * The path item input.
  */
  readonly input: Set<unknown>;
  /**
  * The path item key.
  */
  readonly key: null;
  /**
  * The path item key.
  */
  readonly value: unknown;
}
/**
* Unknown path item interface.
*/
interface UnknownPathItem {
  /**
  * The path item type.
  */
  readonly type: "unknown";
  /**
  * The path item origin.
  */
  readonly origin: "key" | "value";
  /**
  * The path item input.
  */
  readonly input: unknown;
  /**
  * The path item key.
  */
  readonly key: unknown;
  /**
  * The path item value.
  */
  readonly value: unknown;
}
/**
* Issue path item type.
*/
type IssuePathItem = ArrayPathItem | MapPathItem | ObjectPathItem | SetPathItem | UnknownPathItem;
/**
* Base issue interface.
*/
interface BaseIssue<TInput$1> extends Config<BaseIssue<TInput$1>> {
  /**
  * The issue kind.
  */
  readonly kind: "schema" | "validation" | "transformation";
  /**
  * The issue type.
  */
  readonly type: string;
  /**
  * The raw input data.
  */
  readonly input: TInput$1;
  /**
  * The expected property.
  */
  readonly expected: string | null;
  /**
  * The received property.
  */
  readonly received: string;
  /**
  * The error message.
  */
  readonly message: string;
  /**
  * The input requirement.
  */
  readonly requirement?: unknown | undefined;
  /**
  * The issue path.
  */
  readonly path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
  /**
  * The sub issues.
  */
  readonly issues?: [BaseIssue<TInput$1>, ...BaseIssue<TInput$1>[]] | undefined;
}
//#endregion
//#region ../../library/src/types/config.d.ts
/**
* Config interface.
*/
interface Config<TIssue extends BaseIssue<unknown>> {
  /**
  * The selected language.
  */
  readonly lang?: string | undefined;
  /**
  * The error message.
  */
  readonly message?: ErrorMessage<TIssue> | undefined;
  /**
  * Whether it should be aborted early.
  */
  readonly abortEarly?: boolean | undefined;
  /**
  * Whether a pipe should be aborted early.
  */
  readonly abortPipeEarly?: boolean | undefined;
}
//#endregion
//#region ../../library/src/types/pipe.d.ts
/**
* Pipe action type.
*/
type PipeAction<TInput$1, TOutput, TIssue extends BaseIssue<unknown>> = BaseValidation<TInput$1, TOutput, TIssue> | BaseTransformation<TInput$1, TOutput, TIssue> | BaseMetadata<TInput$1>;
//#endregion
//#region src/types/schema.d.ts
type JsonSchemaTypeName = "string" | "number" | "integer" | "boolean" | "object" | "array" | "null";
type JsonSchemaType = string | number | boolean | JsonSchemaObject | JsonSchemaArray | null;
interface JsonSchemaObject {
  [key: string]: JsonSchemaType;
}
interface JsonSchemaArray extends Array<JsonSchemaType> {}
type JsonSchemaDefinition = JsonSchema | boolean;
/**
* JSON Schema interface.
*/
interface JsonSchema {
  $id?: string | undefined;
  $ref?: string | undefined;
  $schema?: string | undefined;
  $comment?: string | undefined;
  $defs?: Record<string, JsonSchemaDefinition> | undefined;
  type?: JsonSchemaTypeName | JsonSchemaTypeName[] | undefined;
  nullable?: boolean | undefined;
  enum?: JsonSchemaType[] | undefined;
  const?: JsonSchemaType | undefined;
  multipleOf?: number | undefined;
  maximum?: number | undefined;
  exclusiveMaximum?: number | undefined;
  minimum?: number | undefined;
  exclusiveMinimum?: number | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  pattern?: string | undefined;
  items?: JsonSchemaDefinition | JsonSchemaDefinition[] | undefined;
  prefixItems?: JsonSchemaDefinition[] | undefined;
  additionalItems?: JsonSchemaDefinition | undefined;
  maxItems?: number | undefined;
  minItems?: number | undefined;
  uniqueItems?: boolean | undefined;
  contains?: JsonSchemaDefinition | undefined;
  maxProperties?: number | undefined;
  minProperties?: number | undefined;
  required?: string[] | undefined;
  properties?: Record<string, JsonSchemaDefinition> | undefined;
  patternProperties?: Record<string, JsonSchemaDefinition> | undefined;
  additionalProperties?: JsonSchemaDefinition | undefined;
  dependencies?: Record<string, JsonSchemaDefinition | string[]> | undefined;
  propertyNames?: JsonSchemaDefinition | undefined;
  if?: JsonSchemaDefinition | undefined;
  then?: JsonSchemaDefinition | undefined;
  else?: JsonSchemaDefinition | undefined;
  allOf?: JsonSchemaDefinition[] | undefined;
  anyOf?: JsonSchemaDefinition[] | undefined;
  oneOf?: JsonSchemaDefinition[] | undefined;
  not?: JsonSchemaDefinition | undefined;
  format?: string | undefined;
  contentMediaType?: string | undefined;
  contentEncoding?: string | undefined;
  definitions?: Record<string, JsonSchemaDefinition> | undefined;
  title?: string | undefined;
  description?: string | undefined;
  default?: JsonSchemaType | undefined;
  readOnly?: boolean | undefined;
  writeOnly?: boolean | undefined;
  examples?: JsonSchemaType | undefined;
}
/**
* JSON Schema 7 interface.
*
* @deprecated Use `JsonSchema` instead.
*/
interface JSONSchema7 extends JsonSchema {}
//#endregion
//#region src/types/config.d.ts
/**
* JSON Schema conversion context interface.
*/
interface ConversionContext {
  /**
  * The JSON Schema definitions that have already been created.
  */
  readonly definitions: Record<string, JsonSchema>;
  /**
  * The JSON Schema reference map that is used to look up the reference ID
  * for a given Valibot schema.
  */
  readonly referenceMap: Map<BaseSchema<unknown, unknown, BaseIssue<unknown>>, string>;
  /**
  * The lazy schema getter map that is used internally to ensure that
  * recursive lazy schemas are unwrapped only once.
  */
  readonly getterMap: Map<(input: unknown) => BaseSchema<unknown, unknown, BaseIssue<unknown>>, BaseSchema<unknown, unknown, BaseIssue<unknown>>>;
}
/**
* JSON Schema override context interface for schemas.
*
* @beta
*/
interface OverrideSchemaContext extends ConversionContext {
  /**
  * The JSON Schema reference ID.
  */
  readonly referenceId: string | undefined;
  /**
  * The Valibot schema to be converted.
  */
  readonly valibotSchema: BaseSchema<unknown, unknown, BaseIssue<unknown>>;
  /**
  * The converted JSON Schema.
  */
  readonly jsonSchema: JsonSchema;
  /**
  * The errors of the current Valibot schema conversion.
  */
  readonly errors: [string, ...string[]] | undefined;
}
/**
* JSON Schema override context interface for actions.
*
* @beta
*/
interface OverrideActionContext {
  /**
  * The Valibot action to be converted.
  */
  readonly valibotAction: PipeAction<any, any, BaseIssue<unknown>>;
  /**
  * The converted JSON Schema.
  */
  readonly jsonSchema: JsonSchema;
  /**
  * The errors of the current Valibot action conversion.
  */
  readonly errors: [string, ...string[]] | undefined;
}
/**
* JSON Schema override context interface for references.
*
* @beta
*/
interface OverrideRefContext extends ConversionContext {
  /**
  * The JSON Schema reference ID.
  */
  readonly referenceId: string;
  /**
  * The Valibot schema to be converted.
  */
  readonly valibotSchema: BaseSchema<unknown, unknown, BaseIssue<unknown>>;
  /**
  * The converted JSON Schema.
  */
  readonly jsonSchema: JsonSchema;
}
/**
* JSON Schema conversion config interface.
*/
interface ConversionConfig {
  /**
  * The target JSON Schema draft version. Defaults to 'draft-07'.
  */
  readonly target?: "draft-07" | "draft-2020-12" | "openapi-3.0";
  /**
  * Whether to convert the input or output type of the Valibot schema to JSON Schema.
  *
  * When set to 'input', conversion stops before the first potential type
  * transformation action or second schema in any pipeline.
  *
  * When set to 'output', conversion of any pipelines starts from the last
  * schema in the pipeline. Therefore, the output type must be specified
  * explicitly with a schema after the last type transformation action.
  *
  * @beta
  */
  readonly typeMode?: "ignore" | "input" | "output";
  /**
  * The policy for handling incompatible schemas and actions.
  */
  readonly errorMode?: "throw" | "warn" | "ignore";
  /**
  * The schema definitions for constructing recursive schemas. If not
  * specified, the definitions are generated automatically as needed.
  */
  readonly definitions?: Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>;
  /**
  * Overrides the JSON Schema conversion for a specific Valibot schema.
  *
  * Only return a JSON Schema if you want to override the default conversion
  * behaviour and suppress errors for a specific schema. Returning either
  * `null` or `undefined` will skip the override.
  *
  * @param context The conversion context.
  *
  * @returns A JSON Schema, if overridden.
  *
  * @beta
  */
  readonly overrideSchema?: (context: OverrideSchemaContext) => JsonSchema | null | undefined;
  /**
  * The actions that should be ignored during the conversion.
  *
  * @beta
  */
  readonly ignoreActions?: string[];
  /**
  * Overrides the JSON Schema reference for a specific Valibot action.
  *
  * Only return a JSON Schema if you want to override the default conversion
  * behaviour and suppress errors for a specific action. Returning either
  * `null` or `undefined` will skip the override.
  *
  * @param context The conversion context.
  *
  * @returns A JSON Schema, if overridden.
  *
  * @beta
  */
  readonly overrideAction?: (context: OverrideActionContext) => JsonSchema | null | undefined;
  /**
  * Overrides the JSON Schema reference for a specific reference ID.
  *
  * @param context The conversion context.
  *
  * @returns A reference ID, if overridden.
  *
  * @beta
  */
  readonly overrideRef?: (context: OverrideRefContext) => string | null | undefined;
}
//#endregion
//#region src/types/standard.d.ts
/**
* JSON Schema interface.
*/
interface StandardJsonSchema<TInput$1, TOutput> {
  /**
  * The Standard JSON Schema properties.
  */
  readonly "~standard": StandardJsonProps<TInput$1, TOutput>;
}
/**
* The Standard JSON Schema properties interface.
*/
interface StandardJsonProps<TInput$1, TOutput> extends StandardProps<TInput$1, TOutput> {
  /**
  * Methods for generating the input/output JSON Schema.
  */
  readonly jsonSchema: StandardJsonConverter;
}
/**
* The Standard JSON Schema converter interface.
*/
interface StandardJsonConverter {
  /**
  * Converts the input type to JSON Schema. May throw if conversion is not supported.
  */
  readonly input: (options: StandardJsonOptions) => Record<string, unknown>;
  /**
  * Converts the output type to JSON Schema. May throw if conversion is not supported.
  */
  readonly output: (options: StandardJsonOptions) => Record<string, unknown>;
}
/**
* The target version of the generated JSON Schema.
*/
type StandardJsonTarget = "draft-2020-12" | "draft-07" | "openapi-3.0" | ({} & string);
/**
* The options for the input/output methods.
*/
interface StandardJsonOptions {
  /**
  * Specifies the target version of the generated JSON Schema.
  */
  readonly target: StandardJsonTarget;
  /**
  * Explicit support for additional vendor-specific parameters, if needed.
  */
  readonly libraryOptions?: Record<string, unknown> | undefined;
}
//#endregion
//#region src/functions/toJsonSchema/toJsonSchema.d.ts
/**
* Converts a Valibot schema to the JSON Schema format.
*
* @param schema The Valibot schema object.
* @param config The JSON Schema configuration.
*
* @returns The converted JSON Schema.
*/
declare function toJsonSchema(schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>, config?: ConversionConfig): JsonSchema;
//#endregion
//#region src/functions/toJsonSchemaDefs/toJsonSchemaDefs.d.ts
/**
* Converts Valibot schema definitions to JSON Schema definitions.
*
* @param definitions The Valibot schema definitions.
* @param config The JSON Schema configuration.
*
* @returns The converted JSON Schema definitions.
*/
declare function toJsonSchemaDefs<TDefinitions extends Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>>(definitions: TDefinitions, config?: Omit<ConversionConfig, "definitions">): { [TKey in keyof TDefinitions]: JsonSchema };
//#endregion
//#region src/functions/toStandardJsonSchema/toStandardJsonSchema.d.ts
/**
* Converts a Valibot schema to the Standard JSON Schema format.
*
* @param schema The Valibot schema object.
*
* @returns The Standard JSON Schema.
*/
declare function toStandardJsonSchema<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema): StandardJsonSchema<InferInput<TSchema>, InferOutput<TSchema>>;
//#endregion
//#region src/storages/globalDefs/globalDefs.d.ts
/**
* Adds new definitions to the global schema definitions.
*
* @param definitions The schema definitions.
*
* @beta
*/
declare function addGlobalDefs(definitions: Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>): void;
/**
* Returns the current global schema definitions.
*
* @returns The schema definitions.
*
* @beta
*/
declare function getGlobalDefs(): Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>> | undefined;
//#endregion
export { ConversionConfig, ConversionContext, JSONSchema7, JsonSchema, OverrideActionContext, OverrideRefContext, OverrideSchemaContext, StandardJsonSchema, addGlobalDefs, getGlobalDefs, toJsonSchema, toJsonSchemaDefs, toStandardJsonSchema };