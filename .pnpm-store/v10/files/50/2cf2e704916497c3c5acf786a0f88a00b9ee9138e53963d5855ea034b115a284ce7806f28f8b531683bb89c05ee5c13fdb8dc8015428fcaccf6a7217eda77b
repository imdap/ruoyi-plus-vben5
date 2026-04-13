import * as vue from 'vue';
import { MaybeRef, Ref, MaybeRefOrGetter, ComputedRef, PropType, VNode, UnwrapRef, InjectionKey } from 'vue';
import { PartialDeep } from 'type-fest';

type BrowserNativeObject = Date | FileList | File;
type Primitive = null | undefined | string | number | boolean | symbol | bigint;
/**
 * Checks whether the type is any
 * See {@link https://stackoverflow.com/a/49928360/3406963}
 * @typeParam T - type which may be any
 * ```
 * IsAny<any> = true
 * IsAny<string> = false
 * ```
 */
type IsAny<T> = 0 extends 1 & T ? true : false;
/**
 * Checks whether T1 can be exactly (mutually) assigned to T2
 * @typeParam T1 - type to check
 * @typeParam T2 - type to check against
 * ```
 * IsEqual<string, string> = true
 * IsEqual<'foo', 'foo'> = true
 * IsEqual<string, number> = false
 * IsEqual<string, number> = false
 * IsEqual<string, 'foo'> = false
 * IsEqual<'foo', string> = false
 * IsEqual<'foo' | 'bar', 'foo'> = boolean // 'foo' is assignable, but 'bar' is not (true | false) -> boolean
 * ```
 */
type IsEqual<T1, T2> = T1 extends T2 ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2 ? true : false : false;
/**
 * Type to query whether an array type T is a tuple type.
 * @typeParam T - type which may be an array or tuple
 * @example
 * ```
 * IsTuple<[number]> = true
 * IsTuple<number[]> = false
 * ```
 */
type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;
/**
 * Type which can be used to index an array or tuple type.
 */
type ArrayKey = number;
/**
 * Helper function to break apart T1 and check if any are equal to T2
 *
 * See {@link IsEqual}
 */
type AnyIsEqual<T1, T2> = T1 extends T2 ? (IsEqual<T1, T2> extends true ? true : never) : never;
/**
 * Type which given a tuple type returns its own keys, i.e. only its indices.
 * @typeParam T - tuple type
 * @example
 * ```
 * TupleKeys<[number, string]> = '0' | '1'
 * ```
 */
type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
/**
 * Helper type to construct tuple key paths and recurse into its elements.
 *
 * See {@link Path}
 */
type PathInternalTuple<TValue extends ReadonlyArray<any>, TraversedTypes> = {
    [Key in TupleKeys<TValue> & string]: `[${Key}]` | `[${Key}]${PathInternal<TValue[Key], TraversedTypes, false>}`;
}[TupleKeys<TValue> & string];
/**
 * Helper type to construct array key paths and recurse into its elements.
 *
 * See {@link Path}
 */
type PathInternalArray<TValue extends ReadonlyArray<any>, TraversedTypes> = `[${ArrayKey}]` | `[${ArrayKey}]${PathInternal<TValue[ArrayKey], TraversedTypes, false>}`;
/**
 * Helper type to construct object key paths and recurse into its nested values.
 *
 * See {@link Path}
 */
type PathInternalObject<TValue, TraversedTypes, First extends boolean> = {
    [Key in keyof TValue & string]: First extends true ? `${Key}` | `${Key}${PathInternal<TValue[Key], TraversedTypes, false>}` : `.${Key}` | `.${Key}${PathInternal<TValue[Key], TraversedTypes, false>}`;
}[keyof TValue & string];
/**
 * Helper type to construct nested any object key paths.
 *
 * See {@link Path}
 */
type PathInternalAny = `.${string}` | `[${string}]` | `[${string}].${string}`;
/**
 * Helper type for recursively constructing paths through a type.
 *
 * This obscures internal type params TraversedTypes and First from ed contract.
 *
 * See {@link Path}
 */
type PathInternal<TValue, TraversedTypes, First extends boolean> = TValue extends Primitive | BrowserNativeObject ? IsAny<TValue> extends true ? PathInternalAny : never : TValue extends ReadonlyArray<any> ? true extends AnyIsEqual<TraversedTypes, TValue> ? never : IsTuple<TValue> extends true ? PathInternalTuple<TValue, TraversedTypes | TValue> : PathInternalArray<TValue, TraversedTypes | TValue> : TValue extends Record<string, any> ? PathInternalObject<TValue, TraversedTypes | TValue, First> : '';
/**
 * Helper type for recursively constructing paths through a type.
 * This actually constructs the strings and recurses into nested
 * object types.
 *
 * See {@link ArrayPath}
 */
type ArrayPathImpl<K extends string | number, V, TraversedTypes> = V extends Primitive | BrowserNativeObject ? IsAny<V> extends true ? string : never : V extends ReadonlyArray<infer U> ? U extends Primitive | BrowserNativeObject ? IsAny<V> extends true ? string : never : true extends AnyIsEqual<TraversedTypes, V> ? never : `${K}` | `${K}.${ArrayPathInternal<V, TraversedTypes | V>}` : true extends AnyIsEqual<TraversedTypes, V> ? never : `${K}.${ArrayPathInternal<V, TraversedTypes | V>}`;
/**
 * Helper type for recursively constructing paths through a type.
 * This obscures the internal type param TraversedTypes from ed contract.
 *
 * See {@link ArrayPath}
 */
type ArrayPathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
    [K in TupleKeys<T>]-?: ArrayPathImpl<K & string, T[K], TraversedTypes>;
}[TupleKeys<T>] : ArrayPathImpl<ArrayKey, V, TraversedTypes> : {
    [K in keyof T]-?: ArrayPathImpl<K & string, T[K], TraversedTypes>;
}[keyof T];
/**
 * Type which eagerly collects all paths through a type which point to an array
 * type.
 * @typeParam T - type which should be introspected.
 * @example
 * ```
 * Path<{foo: {bar: string[], baz: number[]}}> = 'foo.bar' | 'foo.baz'
 * ```
 */
type ArrayPath<T> = T extends any ? ArrayPathInternal<T> : never;
/**
 * Type to evaluate the type which the given path points to.
 * @typeParam T - deeply nested type which is indexed by the path
 * @typeParam P - path into the deeply nested type
 * @example
 * ```
 * PathValue<{foo: {bar: string}}, 'foo.bar'> = string
 * PathValue<[number, string], '1'> = string
 * ```
 */
type PathValue<T, P extends Path<T> | ArrayPath<T>> = T extends any ? P extends `${infer K}.${infer R}` ? K extends keyof T ? R extends Path<T[K]> ? PathValue<T[K], R> : never : K extends `${ArrayKey}` ? T extends ReadonlyArray<infer V> ? PathValue<V, R & Path<V>> : never : never : P extends keyof T ? T[P] : P extends `${ArrayKey}` ? T extends ReadonlyArray<infer V> ? V : never : never : never;
/**
 * Type which eagerly collects all paths through a type
 * @typeParam T - type which should be introspected
 * @example
 * ```
 * Path<{foo: {bar: string}}> = 'foo' | 'foo.bar'
 * ```
 */
type Path<T> = T extends any ? PathInternal<T, T, true> & string : never;

type GenericObject = Record<string, any>;
type MaybeArray<T> = T | T[];
type MaybePromise<T> = T | Promise<T>;
type FlattenAndSetPathsType<TRecord, TType> = {
    [K in Path<TRecord>]: TType;
};
type MapValuesPathsToRefs<TValues extends GenericObject, TPaths extends readonly [...MaybeRef<Path<TValues>>[]]> = {
    readonly [K in keyof TPaths]: TPaths[K] extends MaybeRef<infer TKey> ? TKey extends Path<TValues> ? Ref<PathValue<TValues, TKey>> : Ref<unknown> : Ref<unknown>;
};

interface FieldValidationMetaInfo {
    field: string;
    name: string;
    label?: string;
    value: unknown;
    form: Record<string, unknown>;
    rule?: {
        name: string;
        params?: Record<string, unknown> | unknown[];
    };
}
type ValidationRuleFunction<TValue = unknown, TParams = unknown[] | Record<string, unknown>> = (value: TValue, params: TParams, ctx: FieldValidationMetaInfo) => boolean | string | Promise<boolean | string>;
type SimpleValidationRuleFunction<TValue = unknown, TParams = unknown[] | Record<string, unknown>> = (value: TValue, params: TParams) => boolean | string | Promise<boolean | string>;
type ValidationMessageGenerator = (ctx: FieldValidationMetaInfo) => string;

interface ValidationResult<TValue = unknown> {
    errors: string[];
    valid: boolean;
    value?: TValue;
}
type FlattenAndMapPathsValidationResult<TInput extends GenericObject, TOutput extends GenericObject> = {
    [K in Path<TInput>]: ValidationResult<TOutput[K]>;
};
interface TypedSchemaError {
    path?: string;
    errors: string[];
}
interface TypedSchemaPathDescription {
    required: boolean;
    exists: boolean;
}
interface TypedSchemaContext {
    formData: GenericObject;
}
interface TypedSchema<TInput = any, TOutput = TInput> {
    __type: 'VVTypedSchema';
    parse(values: TInput, context?: TypedSchemaContext): Promise<{
        value?: TOutput;
        errors: TypedSchemaError[];
    }>;
    cast?(values: Partial<TInput>): TInput;
    describe?(path?: Path<TInput>): Partial<TypedSchemaPathDescription>;
}
type InferOutput<TSchema extends TypedSchema> = TSchema extends TypedSchema<any, infer TOutput> ? TOutput : never;
type InferInput<TSchema extends TypedSchema> = TSchema extends TypedSchema<infer TInput, any> ? TInput : never;
type YupSchema<TValues = any> = {
    __isYupSchema__: boolean;
    validate(value: any, options: GenericObject): Promise<any>;
};
type Locator = {
    __locatorRef: string;
} & ((values: GenericObject) => unknown);
interface FieldMeta<TValue> {
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    validated: boolean;
    required: boolean;
    pending: boolean;
    initialValue?: TValue;
}
interface FormMeta<TValues extends GenericObject> {
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    pending: boolean;
    initialValues?: Partial<TValues>;
}
interface FieldState<TValue = unknown> {
    value: TValue;
    touched: boolean;
    errors: string[];
}
type InputType = 'checkbox' | 'radio' | 'default';
/**
 * validated-only: only mutate the previously validated fields
 * silent: do not mutate any field
 * force: validate all fields and mutate their state
 */
type SchemaValidationMode = 'validated-only' | 'silent' | 'force';
interface ValidationOptions$1 {
    mode: SchemaValidationMode;
    warn: boolean;
}
type FieldValidator<TOutput> = (opts?: Partial<ValidationOptions$1>) => Promise<ValidationResult<TOutput>>;
interface PathStateConfig<TOutput> {
    bails: boolean;
    label: MaybeRefOrGetter<string | undefined>;
    type: InputType;
    validate: FieldValidator<TOutput>;
    schema?: MaybeRefOrGetter<TypedSchema | undefined>;
}
interface PathState<TInput = unknown, TOutput = TInput> {
    id: number | number[];
    path: string;
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    required: boolean;
    validated: boolean;
    pending: boolean;
    initialValue: TInput | undefined;
    value: TInput | undefined;
    errors: string[];
    bails: boolean;
    label: string | undefined;
    type: InputType;
    multiple: boolean;
    fieldsCount: number;
    __flags: {
        pendingUnmount: Record<string, boolean>;
        pendingReset: boolean;
    };
    validate?: FieldValidator<TOutput>;
}
interface FieldEntry<TValue = unknown> {
    value: TValue;
    key: string | number;
    isFirst: boolean;
    isLast: boolean;
}
interface FieldArrayContext<TValue = unknown> {
    fields: Ref<FieldEntry<TValue>[]>;
    remove(idx: number): void;
    replace(newArray: TValue[]): void;
    update(idx: number, value: TValue): void;
    push(value: TValue): void;
    swap(indexA: number, indexB: number): void;
    insert(idx: number, value: TValue): void;
    prepend(value: TValue): void;
    move(oldIdx: number, newIdx: number): void;
}
interface PrivateFieldArrayContext<TValue = unknown> extends FieldArrayContext<TValue> {
    reset(): void;
    path: MaybeRefOrGetter<string>;
}
interface PrivateFieldContext<TInput = unknown, TOutput = TInput> {
    id: number;
    name: MaybeRef<string>;
    value: Ref<TInput>;
    meta: FieldMeta<TInput>;
    errors: Ref<string[]>;
    errorMessage: Ref<string | undefined>;
    label?: MaybeRefOrGetter<string | undefined>;
    type?: string;
    bails?: boolean;
    keepValueOnUnmount?: MaybeRefOrGetter<boolean | undefined>;
    checkedValue?: MaybeRefOrGetter<TInput>;
    uncheckedValue?: MaybeRefOrGetter<TInput>;
    checked?: Ref<boolean>;
    resetField(state?: Partial<FieldState<TInput>>): void;
    handleReset(): void;
    validate: FieldValidator<TOutput>;
    handleChange(e: Event | unknown, shouldValidate?: boolean): void;
    handleBlur(e?: Event, shouldValidate?: boolean): void;
    setState(state: Partial<FieldState<TInput>>): void;
    setTouched(isTouched: boolean): void;
    setErrors(message: string | string[]): void;
    setValue(value: TInput, shouldValidate?: boolean): void;
}
type FieldContext<TValue = unknown> = Omit<PrivateFieldContext<TValue>, 'id' | 'instances'>;
type GenericValidateFunction<TValue = unknown> = (value: TValue, ctx: FieldValidationMetaInfo) => MaybePromise<boolean | MaybeArray<string>>;
interface FormState<TValues> {
    values: PartialDeep<TValues>;
    errors: Partial<Record<Path<TValues>, string | undefined>>;
    touched: Partial<Record<Path<TValues>, boolean>>;
    submitCount: number;
}
type FormErrors<TValues extends GenericObject> = Partial<Record<Path<TValues> | '', string | undefined>>;
type FormErrorBag<TValues extends GenericObject> = Partial<Record<Path<TValues> | '', string[]>>;
interface ResetFormOpts {
    force: boolean;
}
interface FormActions<TValues extends GenericObject, TOutput = TValues> {
    setFieldValue<T extends Path<TValues>>(field: T, value: PathValue<TValues, T>, shouldValidate?: boolean): void;
    setFieldError(field: Path<TValues>, message: string | string[] | undefined): void;
    setErrors(fields: Partial<FlattenAndSetPathsType<TValues, string | string[] | undefined>>): void;
    setValues(fields: PartialDeep<TValues>, shouldValidate?: boolean): void;
    setFieldTouched(field: Path<TValues>, isTouched: boolean): void;
    setTouched(fields: Partial<Record<Path<TValues>, boolean>> | boolean): void;
    resetForm(state?: Partial<FormState<TValues>>, opts?: Partial<ResetFormOpts>): void;
    resetField(field: Path<TValues>, state?: Partial<FieldState>): void;
}
interface FormValidationResult<TInput extends GenericObject, TOutput extends GenericObject = TInput> {
    valid: boolean;
    results: Partial<FlattenAndMapPathsValidationResult<TInput, TOutput>>;
    errors: Partial<Record<Path<TInput>, string>>;
    values?: Partial<TOutput>;
    source: 'schema' | 'fields' | 'none';
}
interface SubmissionContext<TInput extends GenericObject = GenericObject> extends FormActions<TInput> {
    evt?: Event;
    controlledValues: Partial<TInput>;
}
type SubmissionHandler<TInput extends GenericObject = GenericObject, TOutput = TInput, TReturn = unknown> = (values: TOutput, ctx: SubmissionContext<TInput>) => TReturn;
interface InvalidSubmissionContext<TInput extends GenericObject = GenericObject, TOutput extends GenericObject = TInput> {
    values: TInput;
    evt?: Event;
    errors: Partial<Record<Path<TInput>, string>>;
    results: FormValidationResult<TInput, TOutput>['results'];
}
type InvalidSubmissionHandler<TInput extends GenericObject = GenericObject, TOutput extends GenericObject = TInput> = (ctx: InvalidSubmissionContext<TInput, TOutput>) => void;
type RawFormSchema<TValues> = Record<Path<TValues>, string | GenericValidateFunction | GenericObject>;
type FieldPathLookup<TValues extends GenericObject = GenericObject> = Partial<Record<Path<TValues>, PrivateFieldContext | PrivateFieldContext[]>>;
type HandleSubmitFactory<TValues extends GenericObject, TOutput extends GenericObject = TValues> = <TReturn = unknown>(cb: SubmissionHandler<TValues, TOutput, TReturn>, onSubmitValidationErrorCb?: InvalidSubmissionHandler<TValues, TOutput>) => (e?: Event) => Promise<TReturn | undefined>;
type PublicPathState<TValue = unknown> = Omit<PathState<TValue>, 'bails' | 'label' | 'multiple' | 'fieldsCount' | 'validate' | 'id' | 'type' | '__flags'>;
interface BaseFieldProps {
    onBlur: () => void;
    onChange: () => void;
    onInput: () => void;
}
interface InputBindsConfig<TValue = unknown, TExtraProps extends GenericObject = GenericObject> {
    props: (state: PublicPathState<TValue>) => TExtraProps;
    validateOnBlur: boolean;
    label: MaybeRefOrGetter<string>;
    validateOnChange: boolean;
    validateOnInput: boolean;
    validateOnModelUpdate: boolean;
}
type LazyInputBindsConfig<TValue = unknown, TExtraProps extends GenericObject = GenericObject> = (state: PublicPathState<TValue>) => Partial<{
    props: TExtraProps;
    validateOnBlur: boolean;
    validateOnChange: boolean;
    validateOnInput: boolean;
    validateOnModelUpdate: boolean;
}>;
interface ComponentBindsConfig<TValue = unknown, TExtraProps extends GenericObject = GenericObject, TModel extends string = 'modelValue'> {
    mapProps: (state: PublicPathState<TValue>) => TExtraProps;
    validateOnBlur: boolean;
    validateOnModelUpdate: boolean;
    model: TModel;
}
type LazyComponentBindsConfig<TValue = unknown, TExtraProps extends GenericObject = GenericObject, TModel extends string = 'modelValue'> = (state: PublicPathState<TValue>) => Partial<{
    props: TExtraProps;
    validateOnBlur: boolean;
    validateOnModelUpdate: boolean;
    model: TModel;
}>;
interface ComponentModellessBinds {
    onBlur: () => void;
}
type ComponentModelBinds<TValue = any, TModel extends string = 'modelValue'> = ComponentModellessBinds & {
    [TKey in `onUpdate:${TModel}`]: (value: TValue) => void;
};
type BaseComponentBinds<TValue = any, TModel extends string = 'modelValue'> = ComponentModelBinds<TValue, TModel> & {
    [k in TModel]: TValue;
};
interface BaseInputBinds<TValue = unknown> {
    value: TValue | undefined;
    onBlur: (e: Event) => void;
    onChange: (e: Event) => void;
    onInput: (e: Event) => void;
}
interface PrivateFormContext<TValues extends GenericObject = GenericObject, TOutput extends GenericObject = TValues> extends FormActions<TValues> {
    name: string;
    formId: number;
    values: TValues;
    initialValues: Ref<Partial<TValues>>;
    controlledValues: Ref<TValues>;
    fieldArrays: PrivateFieldArrayContext[];
    submitCount: Ref<number>;
    schema?: MaybeRef<RawFormSchema<TValues> | TypedSchema<TValues, TOutput> | YupSchema<TValues> | undefined>;
    errorBag: Ref<FormErrorBag<TValues>>;
    errors: ComputedRef<FormErrors<TValues>>;
    meta: ComputedRef<FormMeta<TValues>>;
    isSubmitting: Ref<boolean>;
    isValidating: Ref<boolean>;
    keepValuesOnUnmount: MaybeRef<boolean>;
    validateSchema?: (mode: SchemaValidationMode) => Promise<FormValidationResult<TValues, TOutput>>;
    validate(opts?: Partial<ValidationOptions$1>): Promise<FormValidationResult<TValues, TOutput>>;
    validateField<TPath extends Path<TValues>>(field: TPath, opts?: Partial<ValidationOptions$1>): Promise<ValidationResult<TOutput[TPath]>>;
    stageInitialValue(path: string, value: unknown, updateOriginal?: boolean): void;
    unsetInitialValue(path: string): void;
    handleSubmit: HandleSubmitFactory<TValues, TOutput> & {
        withControlled: HandleSubmitFactory<TValues, TOutput>;
    };
    setFieldInitialValue(path: string, value: unknown, updateOriginal?: boolean): void;
    createPathState<TPath extends Path<TValues>>(path: MaybeRef<TPath>, config?: Partial<PathStateConfig<TOutput[TPath]>>): PathState<PathValue<TValues, TPath>>;
    getPathState<TPath extends Path<TValues>>(path: TPath): PathState<PathValue<TValues, TPath>> | undefined;
    getAllPathStates(): PathState[];
    removePathState<TPath extends Path<TValues>>(path: TPath, id: number): void;
    unsetPathValue<TPath extends Path<TValues>>(path: TPath): void;
    destroyPath(path: string): void;
    isFieldTouched<TPath extends Path<TValues>>(path: TPath): boolean;
    isFieldDirty<TPath extends Path<TValues>>(path: TPath): boolean;
    isFieldValid<TPath extends Path<TValues>>(path: TPath): boolean;
    defineField<TPath extends Path<TValues>, TValue = PathValue<TValues, TPath>, TExtras extends GenericObject = GenericObject>(path: MaybeRefOrGetter<TPath>, config?: Partial<InputBindsConfig<TValue, TExtras>> | LazyInputBindsConfig<TValue, TExtras>): [Ref<TValue>, Ref<BaseFieldProps & TExtras>];
    /**
     * @deprecated use defineField instead
     */
    useFieldModel<TPath extends Path<TValues>>(path: TPath): Ref<PathValue<TValues, TPath>>;
    /**
     * @deprecated use defineField instead
     */
    useFieldModel<TPaths extends readonly [...MaybeRef<Path<TValues>>[]]>(paths: TPaths): MapValuesPathsToRefs<TValues, TPaths>;
    /**
     * @deprecated use defineField instead
     */
    defineComponentBinds<TPath extends Path<TValues>, TValue = PathValue<TValues, TPath>, TModel extends string = 'modelValue', TExtras extends GenericObject = GenericObject>(path: MaybeRefOrGetter<TPath>, config?: Partial<ComponentBindsConfig<TValue, TExtras, TModel>> | LazyComponentBindsConfig<TValue, TExtras, TModel>): Ref<BaseComponentBinds<TValue, TModel> & TExtras>;
    /**
     * @deprecated use defineField instead
     */
    defineInputBinds<TPath extends Path<TValues>, TValue = PathValue<TValues, TPath>, TExtras extends GenericObject = GenericObject>(path: MaybeRefOrGetter<TPath>, config?: Partial<InputBindsConfig<TValue, TExtras>> | LazyInputBindsConfig<TValue, TExtras>): Ref<BaseInputBinds<TValue> & TExtras>;
}
interface FormContext<TValues extends GenericObject = GenericObject, TOutput extends GenericObject = TValues> extends Omit<PrivateFormContext<TValues, TOutput>, 'formId' | 'schema' | 'initialValues' | 'getPathState' | 'getAllPathStates' | 'removePathState' | 'unsetPathValue' | 'validateSchema' | 'stageInitialValue' | 'setFieldInitialValue' | 'unsetInitialValue' | 'fieldArrays' | 'markForUnmount' | 'keepValuesOnUnmount' | 'values'> {
    values: TValues;
    handleReset: () => void;
    submitForm: (e?: unknown) => Promise<void>;
}

interface DevtoolsPluginFieldState {
    name: string;
    value: any;
    initialValue: any;
    errors: string[];
    meta: FieldMeta<any>;
}
interface DevtoolsPluginFormState {
    meta: FormMeta<Record<string, any>>;
    errors: FormErrors<Record<string, any>>;
    values: Record<string, any>;
    isSubmitting: boolean;
    isValidating: boolean;
    submitCount: number;
}

interface ValidationOptions {
    name?: string;
    label?: string;
    values?: Record<string, unknown>;
    bails?: boolean;
}
/**
 * Validates a value against the rules.
 */
declare function validate<TInput, TOutput>(value: TInput, rules: string | Record<string, unknown | unknown[]> | GenericValidateFunction<TInput> | GenericValidateFunction<TInput>[] | TypedSchema<TInput, TOutput>, options?: ValidationOptions): Promise<ValidationResult<TOutput>>;
declare function validateObjectSchema<TValues extends GenericObject, TOutput extends GenericObject>(schema: RawFormSchema<TValues>, values: TValues | undefined, opts?: Partial<{
    names: Record<string, {
        name: string;
        label: string;
    }>;
    bailsMap: Record<string, boolean>;
}>): Promise<FormValidationResult<TValues, TOutput>>;

/**
 * Adds a custom validator to the list of validation rules.
 */
declare function defineRule<TValue = unknown, TParams = any[] | Record<string, any>>(id: string, validator: ValidationRuleFunction<TValue, TParams> | SimpleValidationRuleFunction<TValue, TParams>): void;

interface VeeValidateConfig {
    bails: boolean;
    generateMessage: ValidationMessageGenerator;
    validateOnInput: boolean;
    validateOnChange: boolean;
    validateOnBlur: boolean;
    validateOnModelUpdate: boolean;
}
declare const configure: (newConf: Partial<VeeValidateConfig>) => void;

/**
 * Checks if the path opted out of nested fields using `[fieldName]` syntax
 */
declare function isNotNestedPath(path: string): boolean;

declare function cleanupNonNestedPath(path: string): string;

/**
 * Normalizes the given rules expression.
 */
declare function normalizeRules(rules: undefined | string | Record<string, unknown | unknown[] | Record<string, unknown>>): Record<string, unknown[] | Record<string, unknown>>;

interface FieldOptions<TValue = unknown> {
    initialValue?: MaybeRef<TValue>;
    validateOnValueUpdate: boolean;
    validateOnMount?: boolean;
    bails?: boolean;
    type?: InputType;
    /**
     * @deprecated Use `checkedValue` instead.
     */
    valueProp?: MaybeRefOrGetter<TValue>;
    checkedValue?: MaybeRefOrGetter<TValue>;
    uncheckedValue?: MaybeRefOrGetter<TValue>;
    label?: MaybeRefOrGetter<string | undefined>;
    controlled?: boolean;
    /**
     * @deprecated Use `controlled` instead, controlled is opposite of standalone.
     */
    standalone?: boolean;
    keepValueOnUnmount?: MaybeRefOrGetter<boolean | undefined>;
    /**
     * @deprecated Pass the model prop name to `syncVModel` instead.
     */
    modelPropName?: string;
    syncVModel?: boolean | string;
    form?: FormContext;
}
type RuleExpression<TValue> = string | Record<string, unknown> | GenericValidateFunction<TValue> | GenericValidateFunction<TValue>[] | TypedSchema<TValue> | YupSchema<TValue> | undefined;
/**
 * Creates a field composite.
 */
declare function useField<TValue = unknown>(path: MaybeRefOrGetter<string>, rules?: MaybeRef<RuleExpression<TValue>>, opts?: Partial<FieldOptions<TValue>>): FieldContext<TValue>;

interface SharedBindingObject<TValue = any> {
    name: string;
    onBlur: (e: Event) => void;
    onInput: (e: Event | unknown) => void;
    onChange: (e: Event | unknown) => void;
    'onUpdate:modelValue'?: ((e: TValue) => unknown) | undefined;
}
interface FieldBindingObject<TValue = any> extends SharedBindingObject<TValue> {
    value?: TValue;
    checked?: boolean;
}
interface ComponentFieldBindingObject<TValue = any> extends SharedBindingObject<TValue> {
    modelValue?: TValue;
}
interface FieldSlotProps<TValue = unknown> extends Pick<FieldContext, 'validate' | 'resetField' | 'handleChange' | 'handleReset' | 'handleBlur' | 'setTouched' | 'setErrors' | 'setValue'> {
    field: FieldBindingObject<TValue>;
    componentField: ComponentFieldBindingObject<TValue>;
    value: TValue;
    meta: FieldMeta<TValue>;
    errors: string[];
    errorMessage: string | undefined;
    handleInput: FieldContext['handleChange'];
}
declare const Field: {
    new (...args: any[]): vue.CreateComponentPublicInstance<Readonly<vue.ExtractPropTypes<{
        as: {
            type: (ObjectConstructor | StringConstructor)[];
            default: any;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
        rules: {
            type: PropType<RuleExpression<unknown>>;
            default: any;
        };
        validateOnMount: {
            type: BooleanConstructor;
            default: boolean;
        };
        validateOnBlur: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnChange: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnInput: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnModelUpdate: {
            type: BooleanConstructor;
            default: any;
        };
        bails: {
            type: BooleanConstructor;
            default: () => boolean;
        };
        label: {
            type: StringConstructor;
            default: any;
        };
        uncheckedValue: {
            type: any;
            default: any;
        };
        modelValue: {
            type: any;
            default: symbol;
        };
        modelModifiers: {
            type: any;
            default: () => {};
        };
        'onUpdate:modelValue': {
            type: PropType<(e: any) => unknown>;
            default: any;
        };
        standalone: {
            type: BooleanConstructor;
            default: boolean;
        };
        keepValue: {
            type: BooleanConstructor;
            default: any;
        };
    }>>, () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | {
        default: () => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & Readonly<vue.ExtractPropTypes<{
        as: {
            type: (ObjectConstructor | StringConstructor)[];
            default: any;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
        rules: {
            type: PropType<RuleExpression<unknown>>;
            default: any;
        };
        validateOnMount: {
            type: BooleanConstructor;
            default: boolean;
        };
        validateOnBlur: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnChange: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnInput: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnModelUpdate: {
            type: BooleanConstructor;
            default: any;
        };
        bails: {
            type: BooleanConstructor;
            default: () => boolean;
        };
        label: {
            type: StringConstructor;
            default: any;
        };
        uncheckedValue: {
            type: any;
            default: any;
        };
        modelValue: {
            type: any;
            default: symbol;
        };
        modelModifiers: {
            type: any;
            default: () => {};
        };
        'onUpdate:modelValue': {
            type: PropType<(e: any) => unknown>;
            default: any;
        };
        standalone: {
            type: BooleanConstructor;
            default: boolean;
        };
        keepValue: {
            type: BooleanConstructor;
            default: any;
        };
    }>>, {
        label: string;
        as: string | Record<string, any>;
        bails: boolean;
        uncheckedValue: any;
        modelValue: any;
        validateOnInput: boolean;
        validateOnChange: boolean;
        validateOnBlur: boolean;
        validateOnModelUpdate: boolean;
        validateOnMount: boolean;
        standalone: boolean;
        modelModifiers: any;
        rules: RuleExpression<unknown>;
        'onUpdate:modelValue': (e: any) => unknown;
        keepValue: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<vue.ExtractPropTypes<{
        as: {
            type: (ObjectConstructor | StringConstructor)[];
            default: any;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
        rules: {
            type: PropType<RuleExpression<unknown>>;
            default: any;
        };
        validateOnMount: {
            type: BooleanConstructor;
            default: boolean;
        };
        validateOnBlur: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnChange: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnInput: {
            type: BooleanConstructor;
            default: any;
        };
        validateOnModelUpdate: {
            type: BooleanConstructor;
            default: any;
        };
        bails: {
            type: BooleanConstructor;
            default: () => boolean;
        };
        label: {
            type: StringConstructor;
            default: any;
        };
        uncheckedValue: {
            type: any;
            default: any;
        };
        modelValue: {
            type: any;
            default: symbol;
        };
        modelModifiers: {
            type: any;
            default: () => {};
        };
        'onUpdate:modelValue': {
            type: PropType<(e: any) => unknown>;
            default: any;
        };
        standalone: {
            type: BooleanConstructor;
            default: boolean;
        };
        keepValue: {
            type: BooleanConstructor;
            default: any;
        };
    }>>, () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | {
        default: () => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }, {}, {}, {}, {
        label: string;
        as: string | Record<string, any>;
        bails: boolean;
        uncheckedValue: any;
        modelValue: any;
        validateOnInput: boolean;
        validateOnChange: boolean;
        validateOnBlur: boolean;
        validateOnModelUpdate: boolean;
        validateOnMount: boolean;
        standalone: boolean;
        modelModifiers: any;
        rules: RuleExpression<unknown>;
        'onUpdate:modelValue': (e: any) => unknown;
        keepValue: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<{
    as: {
        type: (ObjectConstructor | StringConstructor)[];
        default: any;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
    rules: {
        type: PropType<RuleExpression<unknown>>;
        default: any;
    };
    validateOnMount: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateOnBlur: {
        type: BooleanConstructor;
        default: any;
    };
    validateOnChange: {
        type: BooleanConstructor;
        default: any;
    };
    validateOnInput: {
        type: BooleanConstructor;
        default: any;
    };
    validateOnModelUpdate: {
        type: BooleanConstructor;
        default: any;
    };
    bails: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    label: {
        type: StringConstructor;
        default: any;
    };
    uncheckedValue: {
        type: any;
        default: any;
    };
    modelValue: {
        type: any;
        default: symbol;
    };
    modelModifiers: {
        type: any;
        default: () => {};
    };
    'onUpdate:modelValue': {
        type: PropType<(e: any) => unknown>;
        default: any;
    };
    standalone: {
        type: BooleanConstructor;
        default: boolean;
    };
    keepValue: {
        type: BooleanConstructor;
        default: any;
    };
}>>, () => VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | {
    default: () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {
    label: string;
    as: string | Record<string, any>;
    bails: boolean;
    uncheckedValue: any;
    modelValue: any;
    validateOnInput: boolean;
    validateOnChange: boolean;
    validateOnBlur: boolean;
    validateOnModelUpdate: boolean;
    validateOnMount: boolean;
    standalone: boolean;
    modelModifiers: any;
    rules: RuleExpression<unknown>;
    'onUpdate:modelValue': (e: any) => unknown;
    keepValue: boolean;
}, {}, string, {}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    value: UnwrapRef<FieldContext['value']>;
    meta: UnwrapRef<FieldContext['meta']>;
    errors: UnwrapRef<FieldContext['errors']>;
    errorMessage: UnwrapRef<FieldContext['errorMessage']>;
    setErrors: FieldContext['setErrors'];
    setTouched: FieldContext['setTouched'];
    reset: FieldContext['resetField'];
    validate: FieldContext['validate'];
    setValue: FieldContext['setValue'];
    handleChange: FieldContext['handleChange'];
    $slots: {
        default: (arg: FieldSlotProps<any>) => VNode[];
    };
});

type FormSlotProps = UnwrapRef<Pick<FormContext, 'meta' | 'errors' | 'errorBag' | 'values' | 'isSubmitting' | 'isValidating' | 'submitCount' | 'validate' | 'validateField' | 'handleReset' | 'setErrors' | 'setFieldError' | 'setFieldValue' | 'setValues' | 'setFieldTouched' | 'setTouched' | 'resetForm' | 'resetField' | 'controlledValues'>> & {
    handleSubmit: (evt: Event | SubmissionHandler, onSubmit?: SubmissionHandler) => Promise<unknown>;
    submitForm(evt?: Event): void;
    getValues<TValues extends GenericObject = GenericObject>(): TValues;
    getMeta<TValues extends GenericObject = GenericObject>(): FormMeta<TValues>;
    getErrors<TValues extends GenericObject = GenericObject>(): FormErrors<TValues>;
};
declare const Form: {
    new (...args: any[]): vue.CreateComponentPublicInstance<Readonly<vue.ExtractPropTypes<{
        as: {
            type: PropType<string>;
            default: string;
        };
        validationSchema: {
            type: ObjectConstructor;
            default: any;
        };
        initialValues: {
            type: ObjectConstructor;
            default: any;
        };
        initialErrors: {
            type: ObjectConstructor;
            default: any;
        };
        initialTouched: {
            type: ObjectConstructor;
            default: any;
        };
        validateOnMount: {
            type: BooleanConstructor;
            default: boolean;
        };
        onSubmit: {
            type: PropType<SubmissionHandler<GenericObject>>;
            default: any;
        };
        onInvalidSubmit: {
            type: PropType<InvalidSubmissionHandler>;
            default: any;
        };
        keepValues: {
            type: BooleanConstructor;
            default: boolean;
        };
        name: {
            type: StringConstructor;
            default: string;
        };
    }>>, () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | {
        default: () => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & Readonly<vue.ExtractPropTypes<{
        as: {
            type: PropType<string>;
            default: string;
        };
        validationSchema: {
            type: ObjectConstructor;
            default: any;
        };
        initialValues: {
            type: ObjectConstructor;
            default: any;
        };
        initialErrors: {
            type: ObjectConstructor;
            default: any;
        };
        initialTouched: {
            type: ObjectConstructor;
            default: any;
        };
        validateOnMount: {
            type: BooleanConstructor;
            default: boolean;
        };
        onSubmit: {
            type: PropType<SubmissionHandler<GenericObject>>;
            default: any;
        };
        onInvalidSubmit: {
            type: PropType<InvalidSubmissionHandler>;
            default: any;
        };
        keepValues: {
            type: BooleanConstructor;
            default: boolean;
        };
        name: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        name: string;
        onSubmit: SubmissionHandler<GenericObject>;
        as: string;
        initialValues: Record<string, any>;
        validateOnMount: boolean;
        validationSchema: Record<string, any>;
        initialErrors: Record<string, any>;
        initialTouched: Record<string, any>;
        onInvalidSubmit: InvalidSubmissionHandler;
        keepValues: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<vue.ExtractPropTypes<{
        as: {
            type: PropType<string>;
            default: string;
        };
        validationSchema: {
            type: ObjectConstructor;
            default: any;
        };
        initialValues: {
            type: ObjectConstructor;
            default: any;
        };
        initialErrors: {
            type: ObjectConstructor;
            default: any;
        };
        initialTouched: {
            type: ObjectConstructor;
            default: any;
        };
        validateOnMount: {
            type: BooleanConstructor;
            default: boolean;
        };
        onSubmit: {
            type: PropType<SubmissionHandler<GenericObject>>;
            default: any;
        };
        onInvalidSubmit: {
            type: PropType<InvalidSubmissionHandler>;
            default: any;
        };
        keepValues: {
            type: BooleanConstructor;
            default: boolean;
        };
        name: {
            type: StringConstructor;
            default: string;
        };
    }>>, () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | {
        default: () => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }, {}, {}, {}, {
        name: string;
        onSubmit: SubmissionHandler<GenericObject>;
        as: string;
        initialValues: Record<string, any>;
        validateOnMount: boolean;
        validationSchema: Record<string, any>;
        initialErrors: Record<string, any>;
        initialTouched: Record<string, any>;
        onInvalidSubmit: InvalidSubmissionHandler;
        keepValues: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<{
    as: {
        type: PropType<string>;
        default: string;
    };
    validationSchema: {
        type: ObjectConstructor;
        default: any;
    };
    initialValues: {
        type: ObjectConstructor;
        default: any;
    };
    initialErrors: {
        type: ObjectConstructor;
        default: any;
    };
    initialTouched: {
        type: ObjectConstructor;
        default: any;
    };
    validateOnMount: {
        type: BooleanConstructor;
        default: boolean;
    };
    onSubmit: {
        type: PropType<SubmissionHandler<GenericObject>>;
        default: any;
    };
    onInvalidSubmit: {
        type: PropType<InvalidSubmissionHandler>;
        default: any;
    };
    keepValues: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
}>>, () => VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | {
    default: () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {
    name: string;
    onSubmit: SubmissionHandler<GenericObject>;
    as: string;
    initialValues: Record<string, any>;
    validateOnMount: boolean;
    validationSchema: Record<string, any>;
    initialErrors: Record<string, any>;
    initialTouched: Record<string, any>;
    onInvalidSubmit: InvalidSubmissionHandler;
    keepValues: boolean;
}, {}, string, {}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    setFieldError: FormContext['setFieldError'];
    setErrors: FormContext['setErrors'];
    setFieldValue: FormContext['setFieldValue'];
    setValues: FormContext['setValues'];
    setFieldTouched: FormContext['setFieldTouched'];
    setTouched: FormContext['setTouched'];
    resetForm: FormContext['resetForm'];
    resetField: FormContext['resetField'];
    validate: FormContext['validate'];
    validateField: FormContext['validateField'];
    getValues: FormSlotProps['getValues'];
    getMeta: FormSlotProps['getMeta'];
    getErrors: FormSlotProps['getErrors'];
    meta: FormSlotProps['meta'];
    values: FormSlotProps['values'];
    errors: FormSlotProps['errors'];
    $slots: {
        default: (arg: FormSlotProps) => VNode[];
    };
});

declare const FieldArray: {
    new (...args: any[]): vue.CreateComponentPublicInstance<Readonly<vue.ExtractPropTypes<{
        name: {
            type: StringConstructor;
            required: true;
        };
    }>>, () => vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | {
        default: () => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & Readonly<vue.ExtractPropTypes<{
        name: {
            type: StringConstructor;
            required: true;
        };
    }>>, {}, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<vue.ExtractPropTypes<{
        name: {
            type: StringConstructor;
            required: true;
        };
    }>>, () => vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | {
        default: () => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
}>>, () => vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | {
    default: () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    push: FieldArrayContext['push'];
    remove: FieldArrayContext['remove'];
    swap: FieldArrayContext['swap'];
    insert: FieldArrayContext['insert'];
    update: FieldArrayContext['update'];
    replace: FieldArrayContext['replace'];
    prepend: FieldArrayContext['prepend'];
    move: FieldArrayContext['move'];
    $slots: {
        default: (arg: UnwrapRef<FieldArrayContext>) => VNode[];
    };
});

interface ErrorMessageSlotProps {
    message: string | undefined;
}
declare const ErrorMessage: {
    new (...args: any[]): vue.CreateComponentPublicInstance<Readonly<vue.ExtractPropTypes<{
        as: {
            type: StringConstructor;
            default: any;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
    }>>, () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | {
        default: () => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & Readonly<vue.ExtractPropTypes<{
        as: {
            type: StringConstructor;
            default: any;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
    }>>, {
        as: string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<vue.ExtractPropTypes<{
        as: {
            type: StringConstructor;
            default: any;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
    }>>, () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | {
        default: () => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }, {}, {}, {}, {
        as: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<{
    as: {
        type: StringConstructor;
        default: any;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
}>>, () => VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}> | vue.Slot<any> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | {
    default: () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {
    as: string;
}, {}, string, {}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: {
        default: (arg: ErrorMessageSlotProps) => VNode[];
    };
});

type FormSchema<TValues extends Record<string, unknown>> = FlattenAndSetPathsType<TValues, GenericValidateFunction | string | GenericObject> | undefined;
interface FormOptions<TValues extends GenericObject, TOutput = TValues, TSchema extends TypedSchema<TValues, TOutput> | FormSchema<TValues> = FormSchema<TValues> | TypedSchema<TValues, TOutput>> {
    validationSchema?: MaybeRef<TSchema extends TypedSchema ? TypedSchema<TValues, TOutput> : any>;
    initialValues?: PartialDeep<TValues> | undefined | null;
    initialErrors?: FlattenAndSetPathsType<TValues, string | undefined>;
    initialTouched?: FlattenAndSetPathsType<TValues, boolean>;
    validateOnMount?: boolean;
    keepValuesOnUnmount?: MaybeRef<boolean>;
    name?: string;
}
declare function useForm<TValues extends GenericObject = GenericObject, TOutput extends GenericObject = TValues, TSchema extends FormSchema<TValues> | TypedSchema<TValues, TOutput> = FormSchema<TValues> | TypedSchema<TValues, TOutput>>(opts?: FormOptions<TValues, TOutput, TSchema>): FormContext<TValues, TOutput>;
declare function useFormContext<TValues extends GenericObject = GenericObject, TOutput extends GenericObject = TValues>(): FormContext<TValues, TOutput>;

declare function useFieldArray<TValue = unknown>(arrayPath: MaybeRefOrGetter<string>): FieldArrayContext<TValue>;

declare function useResetForm<TValues extends Record<string, unknown> = Record<string, unknown>>(): (state?: Partial<FormState<TValues>>, opts?: ResetFormOpts) => void;

/**
 * If a field is dirty or not
 */
declare function useIsFieldDirty(path?: MaybeRefOrGetter<string>): vue.ComputedRef<boolean>;

/**
 * If a field is touched or not
 */
declare function useIsFieldTouched(path?: MaybeRefOrGetter<string>): vue.ComputedRef<boolean>;

/**
 * If a field is validated and is valid
 */
declare function useIsFieldValid(path?: MaybeRefOrGetter<string>): vue.ComputedRef<boolean>;

/**
 * If the form is submitting or not
 */
declare function useIsSubmitting(): vue.ComputedRef<boolean>;

/**
 * If the form is validating or not
 */
declare function useIsValidating(): vue.ComputedRef<boolean>;

/**
 * Validates a single field
 */
declare function useValidateField<TOutput>(path?: MaybeRefOrGetter<string>): () => Promise<ValidationResult<TOutput>>;

/**
 * If the form is dirty or not
 */
declare function useIsFormDirty(): vue.ComputedRef<boolean>;

/**
 * If the form is touched or not
 */
declare function useIsFormTouched(): vue.ComputedRef<boolean>;

/**
 * If the form has been validated and is valid
 */
declare function useIsFormValid(): vue.ComputedRef<boolean>;

/**
 * Validate multiple fields
 */
declare function useValidateForm<TValues extends Record<string, unknown> = Record<string, unknown>>(): () => Promise<FormValidationResult<TValues>>;

/**
 * The number of form's submission count
 */
declare function useSubmitCount(): vue.ComputedRef<number>;

/**
 * Gives access to a field's current value
 */
declare function useFieldValue<TValue = unknown>(path?: MaybeRefOrGetter<string>): vue.ComputedRef<TValue>;

/**
 * Gives access to a form's values
 */
declare function useFormValues<TValues extends Record<string, any> = Record<string, any>>(): vue.ComputedRef<Partial<TValues>>;

/**
 * Gives access to all form errors
 */
declare function useFormErrors<TValues extends Record<string, unknown> = Record<string, unknown>>(): vue.ComputedRef<Partial<Record<"" | Path<TValues>, string>>>;

/**
 * Gives access to a single field error
 */
declare function useFieldError(path?: MaybeRefOrGetter<string>): vue.ComputedRef<string>;

declare function useSubmitForm<TValues extends Record<string, unknown> = Record<string, unknown>>(cb: SubmissionHandler<TValues>): (e?: Event) => Promise<unknown>;

/**
 * Sets a field's error message
 */
declare function useSetFieldError(path?: MaybeRefOrGetter<string>): (message: string | string[] | undefined) => void;

/**
 * Sets a field's touched meta state
 */
declare function useSetFieldTouched(path?: MaybeRefOrGetter<string>): (touched: boolean) => void;

/**
 * Sets a field's value
 */
declare function useSetFieldValue<TValue = unknown>(path?: MaybeRefOrGetter<string>): (value: TValue, shouldValidate?: boolean) => void;

/**
 * Sets multiple fields errors
 */
declare function useSetFormErrors(): (fields: Record<string, string | string[] | undefined>) => void;

/**
 * Sets multiple fields touched or all fields in the form
 */
declare function useSetFormTouched(): (fields: Record<string, boolean> | boolean) => void;

/**
 * Sets multiple fields values
 */
declare function useSetFormValues<TValues extends Record<string, unknown> = Record<string, unknown>>(): (fields: TValues, shouldValidate?: boolean) => void;

declare const FormContextKey: InjectionKey<PrivateFormContext>;
declare const PublicFormContextKey: InjectionKey<FormContext>;
declare const FieldContextKey: InjectionKey<PrivateFieldContext<unknown>>;
declare const IS_ABSENT: unique symbol;

export { type BaseComponentBinds, type BaseFieldProps, type BaseInputBinds, type ComponentBindsConfig, type ComponentFieldBindingObject, type ComponentModelBinds, type ComponentModellessBinds, type DevtoolsPluginFieldState, type DevtoolsPluginFormState, ErrorMessage, Field, FieldArray, type FieldArrayContext, type FieldBindingObject, type FieldContext, FieldContextKey, type FieldEntry, type FieldMeta, type FieldOptions, type FieldPathLookup, type FieldSlotProps, type FieldState, type FieldValidator, type FlattenAndMapPathsValidationResult, type FlattenAndSetPathsType, Form, type FormActions, type FormContext, FormContextKey, type FormErrorBag, type FormErrors, type FormMeta, type FormOptions, type FormSlotProps, type FormState, type FormValidationResult, type GenericObject, type GenericValidateFunction, IS_ABSENT, type InferInput, type InferOutput, type InputBindsConfig, type InputType, type InvalidSubmissionContext, type InvalidSubmissionHandler, type IsAny, type IsEqual, type LazyComponentBindsConfig, type LazyInputBindsConfig, type Locator, type MapValuesPathsToRefs, type MaybeArray, type MaybePromise, type Path, type PathState, type PathStateConfig, type PathValue, type PrivateFieldArrayContext, type PrivateFieldContext, type PrivateFormContext, PublicFormContextKey, type PublicPathState, type RawFormSchema, type ResetFormOpts, type RuleExpression, type SchemaValidationMode, type SubmissionContext, type SubmissionHandler, type TypedSchema, type TypedSchemaContext, type TypedSchemaError, type TypedSchemaPathDescription, type ValidationOptions$1 as ValidationOptions, type ValidationResult, type YupSchema, cleanupNonNestedPath, configure, defineRule, isNotNestedPath, normalizeRules, useField, useFieldArray, useFieldError, useFieldValue, useForm, useFormContext, useFormErrors, useFormValues, useIsFieldDirty, useIsFieldTouched, useIsFieldValid, useIsFormDirty, useIsFormTouched, useIsFormValid, useIsSubmitting, useIsValidating, useResetForm, useSetFieldError, useSetFieldTouched, useSetFieldValue, useSetFormErrors, useSetFormTouched, useSetFormValues, useSubmitCount, useSubmitForm, useValidateField, useValidateForm, validate, validateObjectSchema as validateObject };
