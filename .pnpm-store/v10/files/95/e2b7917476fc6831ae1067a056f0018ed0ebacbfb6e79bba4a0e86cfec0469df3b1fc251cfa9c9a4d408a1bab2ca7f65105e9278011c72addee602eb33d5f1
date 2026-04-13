/**
Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).

@category Type
*/
type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
	| bigint;

/**
Matches a JSON object.

This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. Don't use this as a direct return type as the user would have to double-cast it: `jsonObject as unknown as CustomResponse`. Instead, you could extend your CustomResponse type from it to ensure your type only uses JSON-compatible types: `interface CustomResponse extends JsonObject { … }`.

@category JSON
*/
type JsonObject = {[Key in string]: JsonValue};

/**
Matches a JSON array.

@category JSON
*/
type JsonArray = JsonValue[] | readonly JsonValue[];

/**
Matches any valid JSON primitive value.

@category JSON
*/
type JsonPrimitive = string | number | boolean | null;

/**
Matches any valid JSON value.

@see `Jsonify` if you need to transform a type to one that is assignable to `JsonValue`.

@category JSON
*/
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/**
Returns a boolean for whether the given type is `any`.

@link https://stackoverflow.com/a/49928360/1490091

Useful in type utilities, such as disallowing `any`s to be passed to a function.

@example
```
import type {IsAny} from 'type-fest';

const typedObject = {a: 1, b: 2} as const;
const anyObject: any = {a: 1, b: 2};

function get<O extends (IsAny<O> extends true ? {} : Record<string, number>), K extends keyof O = keyof O>(object: O, key: K) {
	return object[key];
}

const typedA = get(typedObject, 'a');
//=> 1

const anyA = get(anyObject, 'a');
//=> any
```

@category Type Guard
@category Utilities
*/
type IsAny<T> = 0 extends 1 & NoInfer<T> ? true : false;

/**
Returns a boolean for whether the given key is an optional key of type.

This is useful when writing utility types or schema validators that need to differentiate `optional` keys.

@example
```
import type {IsOptionalKeyOf} from 'type-fest';

type User = {
	name: string;
	surname: string;

	luckyNumber?: number;
};

type Admin = {
	name: string;
	surname?: string;
};

type T1 = IsOptionalKeyOf<User, 'luckyNumber'>;
//=> true

type T2 = IsOptionalKeyOf<User, 'name'>;
//=> false

type T3 = IsOptionalKeyOf<User, 'name' | 'luckyNumber'>;
//=> boolean

type T4 = IsOptionalKeyOf<User | Admin, 'name'>;
//=> false

type T5 = IsOptionalKeyOf<User | Admin, 'surname'>;
//=> boolean
```

@category Type Guard
@category Utilities
*/
type IsOptionalKeyOf<Type extends object, Key extends keyof Type> =
	IsAny<Type | Key> extends true ? never
		: Key extends keyof Type
			? Type extends Record<Key, Type[Key]>
				? false
				: true
			: false;

/**
Extract all optional keys from the given type.

This is useful when you want to create a new type that contains different type values for the optional keys only.

@example
```
import type {OptionalKeysOf, Except} from 'type-fest';

type User = {
	name: string;
	surname: string;

	luckyNumber?: number;
};

const REMOVE_FIELD = Symbol('remove field symbol');
type UpdateOperation<Entity extends object> = Except<Partial<Entity>, OptionalKeysOf<Entity>> & {
	[Key in OptionalKeysOf<Entity>]?: Entity[Key] | typeof REMOVE_FIELD;
};

const update1: UpdateOperation<User> = {
	name: 'Alice',
};

const update2: UpdateOperation<User> = {
	name: 'Bob',
	luckyNumber: REMOVE_FIELD,
};
```

@category Utilities
*/
type OptionalKeysOf<Type extends object> =
	Type extends unknown // For distributing `Type`
		? (keyof {[Key in keyof Type as
			IsOptionalKeyOf<Type, Key> extends false
				? never
				: Key
			]: never
		}) & keyof Type // Intersect with `keyof Type` to ensure result of `OptionalKeysOf<Type>` is always assignable to `keyof Type`
		: never; // Should never happen

/**
Extract all required keys from the given type.

This is useful when you want to create a new type that contains different type values for the required keys only or use the list of keys for validation purposes, etc...

@example
```
import type {RequiredKeysOf} from 'type-fest';

declare function createValidation<
	Entity extends object,
	Key extends RequiredKeysOf<Entity> = RequiredKeysOf<Entity>,
>(field: Key, validator: (value: Entity[Key]) => boolean): (entity: Entity) => boolean;

type User = {
	name: string;
	surname: string;
	luckyNumber?: number;
};

const validator1 = createValidation<User>('name', value => value.length < 25);
const validator2 = createValidation<User>('surname', value => value.length < 25);

// @ts-expect-error
const validator3 = createValidation<User>('luckyNumber', value => value > 0);
// Error: Argument of type '"luckyNumber"' is not assignable to parameter of type '"name" | "surname"'.
```

@category Utilities
*/
type RequiredKeysOf<Type extends object> =
	Type extends unknown // For distributing `Type`
		? Exclude<keyof Type, OptionalKeysOf<Type>>
		: never; // Should never happen

/**
Returns a boolean for whether the given type is `never`.

@link https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
@link https://stackoverflow.com/a/53984913/10292952
@link https://www.zhenghao.io/posts/ts-never

Useful in type utilities, such as checking if something does not occur.

@example
```
import type {IsNever, And} from 'type-fest';

type A = IsNever<never>;
//=> true

type B = IsNever<any>;
//=> false

type C = IsNever<unknown>;
//=> false

type D = IsNever<never[]>;
//=> false

type E = IsNever<object>;
//=> false

type F = IsNever<string>;
//=> false
```

@example
```
import type {IsNever} from 'type-fest';

type IsTrue<T> = T extends true ? true : false;

// When a distributive conditional is instantiated with `never`, the entire conditional results in `never`.
type A = IsTrue<never>;
//=> never

// If you don't want that behaviour, you can explicitly add an `IsNever` check before the distributive conditional.
type IsTrueFixed<T> =
	IsNever<T> extends true ? false : T extends true ? true : false;

type B = IsTrueFixed<never>;
//=> false
```

@category Type Guard
@category Utilities
*/
type IsNever<T> = [T] extends [never] ? true : false;

/**
An if-else-like type that resolves depending on whether the given `boolean` type is `true` or `false`.

Use-cases:
- You can use this in combination with `Is*` types to create an if-else-like experience. For example, `If<IsAny<any>, 'is any', 'not any'>`.

Note:
- Returns a union of if branch and else branch if the given type is `boolean` or `any`. For example, `If<boolean, 'Y', 'N'>` will return `'Y' | 'N'`.
- Returns the else branch if the given type is `never`. For example, `If<never, 'Y', 'N'>` will return `'N'`.

@example
```
import type {If} from 'type-fest';

type A = If<true, 'yes', 'no'>;
//=> 'yes'

type B = If<false, 'yes', 'no'>;
//=> 'no'

type C = If<boolean, 'yes', 'no'>;
//=> 'yes' | 'no'

type D = If<any, 'yes', 'no'>;
//=> 'yes' | 'no'

type E = If<never, 'yes', 'no'>;
//=> 'no'
```

@example
```
import type {If, IsAny, IsNever} from 'type-fest';

type A = If<IsAny<unknown>, 'is any', 'not any'>;
//=> 'not any'

type B = If<IsNever<never>, 'is never', 'not never'>;
//=> 'is never'
```

@example
```
import type {If, IsEqual} from 'type-fest';

type IfEqual<T, U, IfBranch, ElseBranch> = If<IsEqual<T, U>, IfBranch, ElseBranch>;

type A = IfEqual<string, string, 'equal', 'not equal'>;
//=> 'equal'

type B = IfEqual<string, number, 'equal', 'not equal'>;
//=> 'not equal'
```

Note: Sometimes using the `If` type can make an implementation non–tail-recursive, which can impact performance. In such cases, it’s better to use a conditional directly. Refer to the following example:

@example
```
import type {If, IsEqual, StringRepeat} from 'type-fest';

type HundredZeroes = StringRepeat<'0', 100>;

// The following implementation is not tail recursive
type Includes<S extends string, Char extends string> =
	S extends `${infer First}${infer Rest}`
		? If<IsEqual<First, Char>,
			'found',
			Includes<Rest, Char>>
		: 'not found';

// Hence, instantiations with long strings will fail
// @ts-expect-error
type Fails = Includes<HundredZeroes, '1'>;
//           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Error: Type instantiation is excessively deep and possibly infinite.

// However, if we use a simple conditional instead of `If`, the implementation becomes tail-recursive
type IncludesWithoutIf<S extends string, Char extends string> =
	S extends `${infer First}${infer Rest}`
		? IsEqual<First, Char> extends true
			? 'found'
			: IncludesWithoutIf<Rest, Char>
		: 'not found';

// Now, instantiations with long strings will work
type Works = IncludesWithoutIf<HundredZeroes, '1'>;
//=> 'not found'
```

@category Type Guard
@category Utilities
*/
type If<Type extends boolean, IfBranch, ElseBranch> =
	IsNever<Type> extends true
		? ElseBranch
		: Type extends true
			? IfBranch
			: ElseBranch;

/**
Represents an array with `unknown` value.

Use case: You want a type that all arrays can be assigned to, but you don't care about the value.

@example
```
import type {UnknownArray} from 'type-fest';

type IsArray<T> = T extends UnknownArray ? true : false;

type A = IsArray<['foo']>;
//=> true

type B = IsArray<readonly number[]>;
//=> true

type C = IsArray<string>;
//=> false
```

@category Type
@category Array
*/
type UnknownArray = readonly unknown[];

/**
Returns a boolean for whether A is false.

@example
```
type A = Not<true>;
//=> false

type B = Not<false>;
//=> true
```
*/
type Not<A extends boolean> = A extends true
	? false
	: A extends false
		? true
		: never;

/**
An if-else-like type that resolves depending on whether the given type is `any` or `never`.

@example
```
// When `T` is a NOT `any` or `never` (like `string`) => Returns `IfNotAnyOrNever` branch
type A = IfNotAnyOrNever<string, 'VALID', 'IS_ANY', 'IS_NEVER'>;
//=> 'VALID'

// When `T` is `any` => Returns `IfAny` branch
type B = IfNotAnyOrNever<any, 'VALID', 'IS_ANY', 'IS_NEVER'>;
//=> 'IS_ANY'

// When `T` is `never` => Returns `IfNever` branch
type C = IfNotAnyOrNever<never, 'VALID', 'IS_ANY', 'IS_NEVER'>;
//=> 'IS_NEVER'
```

Note: Wrapping a tail-recursive type with `IfNotAnyOrNever` makes the implementation non-tail-recursive. To fix this, move the recursion into a helper type. Refer to the following example:

@example
```ts
import type {StringRepeat} from 'type-fest';

type NineHundredNinetyNineSpaces = StringRepeat<' ', 999>;

// The following implementation is not tail recursive
type TrimLeft<S extends string> = IfNotAnyOrNever<S, S extends ` ${infer R}` ? TrimLeft<R> : S>;

// Hence, instantiations with long strings will fail
// @ts-expect-error
type T1 = TrimLeft<NineHundredNinetyNineSpaces>;
//        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Error: Type instantiation is excessively deep and possibly infinite.

// To fix this, move the recursion into a helper type
type TrimLeftOptimised<S extends string> = IfNotAnyOrNever<S, _TrimLeftOptimised<S>>;

type _TrimLeftOptimised<S extends string> = S extends ` ${infer R}` ? _TrimLeftOptimised<R> : S;

type T2 = TrimLeftOptimised<NineHundredNinetyNineSpaces>;
//=> ''
```
*/
type IfNotAnyOrNever<T, IfNotAnyOrNever, IfAny = any, IfNever = never> =
	If<IsAny<T>, IfAny, If<IsNever<T>, IfNever, IfNotAnyOrNever>>;

/**
Indicates the value of `exactOptionalPropertyTypes` compiler option.
*/
type IsExactOptionalPropertyTypesEnabled = [(string | undefined)?] extends [string?]
	? false
	: true;

/**
Transforms a tuple type by replacing it's rest element with a single element that has the same type as the rest element, while keeping all the non-rest elements intact.

@example
```
type A = CollapseRestElement<[string, string, ...number[]]>;
//=> [string, string, number]

type B = CollapseRestElement<[...string[], number, number]>;
//=> [string, number, number]

type C = CollapseRestElement<[string, string, ...Array<number | bigint>]>;
//=> [string, string, number | bigint]

type D = CollapseRestElement<[string, number]>;
//=> [string, number]
```

Note: Optional modifiers (`?`) are removed from elements unless the `exactOptionalPropertyTypes` compiler option is disabled. When disabled, there's an additional `| undefined` for optional elements.

@example
```
// `exactOptionalPropertyTypes` enabled
type A = CollapseRestElement<[string?, string?, ...number[]]>;
//=> [string, string, number]

// `exactOptionalPropertyTypes` disabled
type B = CollapseRestElement<[string?, string?, ...number[]]>;
//=> [string | undefined, string | undefined, number]
```
*/
type CollapseRestElement<TArray extends UnknownArray> = IfNotAnyOrNever<TArray, _CollapseRestElement<TArray>>;

type _CollapseRestElement<
	TArray extends UnknownArray,
	ForwardAccumulator extends UnknownArray = [],
	BackwardAccumulator extends UnknownArray = [],
> =
	TArray extends UnknownArray // For distributing `TArray`
		? keyof TArray & `${number}` extends never
			// Enters this branch, if `TArray` is empty (e.g., []),
			// or `TArray` contains no non-rest elements preceding the rest element (e.g., `[...string[]]` or `[...string[], string]`).
			? TArray extends readonly [...infer Rest, infer Last]
				? _CollapseRestElement<Rest, ForwardAccumulator, [Last, ...BackwardAccumulator]> // Accumulate elements that are present after the rest element.
				: TArray extends readonly []
					? [...ForwardAccumulator, ...BackwardAccumulator]
					: [...ForwardAccumulator, TArray[number], ...BackwardAccumulator] // Add the rest element between the accumulated elements.
			: TArray extends readonly [(infer First)?, ...infer Rest]
				? _CollapseRestElement<
					Rest,
					[
						...ForwardAccumulator,
						'0' extends OptionalKeysOf<TArray>
							? If<IsExactOptionalPropertyTypesEnabled, First, First | undefined> // Add `| undefined` for optional elements, if `exactOptionalPropertyTypes` is disabled.
							: First,
					],
					BackwardAccumulator
				>
				: never // Should never happen, since `[(infer First)?, ...infer Rest]` is a top-type for arrays.
		: never; // Should never happen

type Whitespace =
	| '\u{9}' // '\t'
	| '\u{A}' // '\n'
	| '\u{B}' // '\v'
	| '\u{C}' // '\f'
	| '\u{D}' // '\r'
	| '\u{20}' // ' '
	| '\u{85}'
	| '\u{A0}'
	| '\u{1680}'
	| '\u{2000}'
	| '\u{2001}'
	| '\u{2002}'
	| '\u{2003}'
	| '\u{2004}'
	| '\u{2005}'
	| '\u{2006}'
	| '\u{2007}'
	| '\u{2008}'
	| '\u{2009}'
	| '\u{200A}'
	| '\u{2028}'
	| '\u{2029}'
	| '\u{202F}'
	| '\u{205F}'
	| '\u{3000}'
	| '\u{FEFF}';

type WordSeparators = '-' | '_' | Whitespace;

/**
Remove spaces from the left side.
*/
type TrimLeft<V extends string> = V extends `${Whitespace}${infer R}` ? TrimLeft<R> : V;

/**
Remove spaces from the right side.
*/
type TrimRight<V extends string> = V extends `${infer R}${Whitespace}` ? TrimRight<R> : V;

/**
Remove leading and trailing spaces from a string.

@example
```
import type {Trim} from 'type-fest';

type Example = Trim<' foo '>;
//=> 'foo'
```

@category String
@category Template literal
*/
type Trim<V extends string> = TrimLeft<TrimRight<V>>;

/**
Returns a boolean for whether the string is numeric.

This type is a workaround for [Microsoft/TypeScript#46109](https://github.com/microsoft/TypeScript/issues/46109#issuecomment-930307987).
*/
type IsNumeric<T extends string> = T extends `${number}`
	? Trim<T> extends T
		? true
		: false
	: false;

/**
Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.

@example
```
import type {Simplify} from 'type-fest';

type PositionProps = {
	top: number;
	left: number;
};

type SizeProps = {
	width: number;
	height: number;
};

// In your editor, hovering over `Props` will show a flattened object with all the properties.
type Props = Simplify<PositionProps & SizeProps>;
```

Sometimes it is desired to pass a value as a function argument that has a different type. At first inspection it may seem assignable, and then you discover it is not because the `value`'s type definition was defined as an interface. In the following example, `fn` requires an argument of type `Record<string, unknown>`. If the value is defined as a literal, then it is assignable. And if the `value` is defined as type using the `Simplify` utility the value is assignable.  But if the `value` is defined as an interface, it is not assignable because the interface is not sealed and elsewhere a non-string property could be added to the interface.

If the type definition must be an interface (perhaps it was defined in a third-party npm package), then the `value` can be defined as `const value: Simplify<SomeInterface> = ...`. Then `value` will be assignable to the `fn` argument.  Or the `value` can be cast as `Simplify<SomeInterface>` if you can't re-declare the `value`.

@example
```
import type {Simplify} from 'type-fest';

interface SomeInterface {
	foo: number;
	bar?: string;
	baz: number | undefined;
}

type SomeType = {
	foo: number;
	bar?: string;
	baz: number | undefined;
};

const literal = {foo: 123, bar: 'hello', baz: 456};
const someType: SomeType = literal;
const someInterface: SomeInterface = literal;

declare function fn(object: Record<string, unknown>): void;

fn(literal); // Good: literal object type is sealed
fn(someType); // Good: type is sealed
// @ts-expect-error
fn(someInterface); // Error: Index signature for type 'string' is missing in type 'someInterface'. Because `interface` can be re-opened
fn(someInterface as Simplify<SomeInterface>); // Good: transform an `interface` into a `type`
```

@link https://github.com/microsoft/TypeScript/issues/15300
@see {@link SimplifyDeep}
@category Object
*/
type Simplify<T> = {[KeyType in keyof T]: T[KeyType]} & {};

/**
Returns a boolean for whether the two given types are equal.

@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
@link https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796

Use-cases:
- If you want to make a conditional branch based on the result of a comparison of two types.

@example
```
import type {IsEqual} from 'type-fest';

// This type returns a boolean for whether the given array includes the given item.
// `IsEqual` is used to compare the given array at position 0 and the given item and then return true if they are equal.
type Includes<Value extends readonly any[], Item> =
	Value extends readonly [Value[0], ...infer rest]
		? IsEqual<Value[0], Item> extends true
			? true
			: Includes<rest, Item>
		: false;
```

@category Type Guard
@category Utilities
*/
type IsEqual<A, B> =
	[A] extends [B]
		? [B] extends [A]
			? _IsEqual<A, B>
			: false
		: false;

// This version fails the `equalWrappedTupleIntersectionToBeNeverAndNeverExpanded` test in `test-d/is-equal.ts`.
type _IsEqual<A, B> =
	(<G>() => G extends A & G | G ? 1 : 2) extends
	(<G>() => G extends B & G | G ? 1 : 2)
		? true
		: false;

/**
Omit any index signatures from the given object type, leaving only explicitly defined properties.

This is the counterpart of `PickIndexSignature`.

Use-cases:
- Remove overly permissive signatures from third-party types.

This type was taken from this [StackOverflow answer](https://stackoverflow.com/a/68261113/420747).

It relies on the fact that an empty object (`{}`) is assignable to an object with just an index signature, like `Record<string, unknown>`, but not to an object with explicitly defined keys, like `Record<'foo' | 'bar', unknown>`.

(The actual value type, `unknown`, is irrelevant and could be any type. Only the key type matters.)

```
const indexed: Record<string, unknown> = {}; // Allowed

// @ts-expect-error
const keyed: Record<'foo', unknown> = {}; // Error
// TS2739: Type '{}' is missing the following properties from type 'Record<"foo" | "bar", unknown>': foo, bar
```

Instead of causing a type error like the above, you can also use a [conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) to test whether a type is assignable to another:

```
type Indexed = {} extends Record<string, unknown>
	? '✅ `{}` is assignable to `Record<string, unknown>`'
	: '❌ `{}` is NOT assignable to `Record<string, unknown>`';

type IndexedResult = Indexed;
//=> '✅ `{}` is assignable to `Record<string, unknown>`'

type Keyed = {} extends Record<'foo' | 'bar', unknown>
	? '✅ `{}` is assignable to `Record<\'foo\' | \'bar\', unknown>`'
	: '❌ `{}` is NOT assignable to `Record<\'foo\' | \'bar\', unknown>`';

type KeyedResult = Keyed;
//=> '❌ `{}` is NOT assignable to `Record<\'foo\' | \'bar\', unknown>`'
```

Using a [mapped type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#further-exploration), you can then check for each `KeyType` of `ObjectType`...

```
type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType // Map each key of `ObjectType`...
	]: ObjectType[KeyType]; // ...to its original value, i.e. `OmitIndexSignature<Foo> == Foo`.
};
```

...whether an empty object (`{}`) would be assignable to an object with that `KeyType` (`Record<KeyType, unknown>`)...

```
type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType
	// Is `{}` assignable to `Record<KeyType, unknown>`?
	as {} extends Record<KeyType, unknown>
		? never // ✅ `{}` is assignable to `Record<KeyType, unknown>`
		: KeyType // ❌ `{}` is NOT assignable to `Record<KeyType, unknown>`
	]: ObjectType[KeyType];
};
```

If `{}` is assignable, it means that `KeyType` is an index signature and we want to remove it. If it is not assignable, `KeyType` is a "real" key and we want to keep it.

@example
```
import type {OmitIndexSignature} from 'type-fest';

type Example = {
	// These index signatures will be removed.
	[x: string]: any;
	[x: number]: any;
	[x: symbol]: any;
	[x: `head-${string}`]: string;
	[x: `${string}-tail`]: string;
	[x: `head-${string}-tail`]: string;
	[x: `${bigint}`]: string;
	[x: `embedded-${number}`]: string;

	// These explicitly defined keys will remain.
	foo: 'bar';
	qux?: 'baz';
};

type ExampleWithoutIndexSignatures = OmitIndexSignature<Example>;
//=> {foo: 'bar'; qux?: 'baz'}
```

@see {@link PickIndexSignature}
@category Object
*/
type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
		? never
		: KeyType]: ObjectType[KeyType];
};

/**
Pick only index signatures from the given object type, leaving out all explicitly defined properties.

This is the counterpart of `OmitIndexSignature`.

@example
```
import type {PickIndexSignature} from 'type-fest';

declare const symbolKey: unique symbol;

type Example = {
	// These index signatures will remain.
	[x: string]: unknown;
	[x: number]: unknown;
	[x: symbol]: unknown;
	[x: `head-${string}`]: string;
	[x: `${string}-tail`]: string;
	[x: `head-${string}-tail`]: string;
	[x: `${bigint}`]: string;
	[x: `embedded-${number}`]: string;

	// These explicitly defined keys will be removed.
	['kebab-case-key']: string;
	[symbolKey]: string;
	foo: 'bar';
	qux?: 'baz';
};

type ExampleIndexSignature = PickIndexSignature<Example>;
// {
// 	[x: string]: unknown;
// 	[x: number]: unknown;
// 	[x: symbol]: unknown;
// 	[x: `head-${string}`]: string;
// 	[x: `${string}-tail`]: string;
// 	[x: `head-${string}-tail`]: string;
// 	[x: `${bigint}`]: string;
// 	[x: `embedded-${number}`]: string;
// }
```

@see {@link OmitIndexSignature}
@category Object
*/
type PickIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
		? KeyType
		: never]: ObjectType[KeyType];
};

// Merges two objects without worrying about index signatures.
type SimpleMerge<Destination, Source> = Simplify<{
	[Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key];
} & Source>;

/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.

@example
```
import type {Merge} from 'type-fest';

type Foo = {
	[x: string]: unknown;
	[x: number]: unknown;
	foo: string;
	bar: symbol;
};

type Bar = {
	[x: number]: number;
	[x: symbol]: unknown;
	bar: Date;
	baz: boolean;
};

export type FooBar = Merge<Foo, Bar>;
//=> {
// 	[x: string]: unknown;
// 	[x: number]: number;
// 	[x: symbol]: unknown;
// 	foo: string;
// 	bar: Date;
// 	baz: boolean;
// }
```

Note: If you want a merge type that more accurately reflects the runtime behavior of object spread or `Object.assign`, refer to the {@link ObjectMerge} type.

@see {@link ObjectMerge}
@category Object
*/
type Merge<Destination, Source> =
	Destination extends unknown // For distributing `Destination`
		? Source extends unknown // For distributing `Source`
			? If<IsEqual<Destination, Source>, Destination, _Merge<Destination, Source>>
			: never // Should never happen
		: never; // Should never happen

type _Merge<Destination, Source> =
	Simplify<
		SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>>
		& SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>
	>;

/**
Merges user specified options with default options.

@example
```
type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: false};
type SpecifiedOptions = {leavesOnly: true};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//=> {maxRecursionDepth: 10; leavesOnly: true}
```

@example
```
// Complains if default values are not provided for optional options

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10};
type SpecifiedOptions = {};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                              ~~~~~~~~~~~~~~~~~~~
// Property 'leavesOnly' is missing in type 'DefaultPathsOptions' but required in type '{ maxRecursionDepth: number; leavesOnly: boolean; }'.
```

@example
```
// Complains if an option's default type does not conform to the expected type

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: 'no'};
type SpecifiedOptions = {};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                              ~~~~~~~~~~~~~~~~~~~
// Types of property 'leavesOnly' are incompatible. Type 'string' is not assignable to type 'boolean'.
```

@example
```
// Complains if an option's specified type does not conform to the expected type

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: false};
type SpecifiedOptions = {leavesOnly: 'yes'};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                                                   ~~~~~~~~~~~~~~~~
// Types of property 'leavesOnly' are incompatible. Type 'string' is not assignable to type 'boolean'.
```
*/
type ApplyDefaultOptions<
	Options extends object,
	Defaults extends Simplify<Omit<Required<Options>, RequiredKeysOf<Options>> & Partial<Record<RequiredKeysOf<Options>, never>>>,
	SpecifiedOptions extends Options,
> =
	If<IsAny<SpecifiedOptions>, Defaults,
		If<IsNever<SpecifiedOptions>, Defaults,
			Simplify<Merge<Defaults, {
				[Key in keyof SpecifiedOptions
				as Key extends OptionalKeysOf<Options> ? undefined extends SpecifiedOptions[Key] ? never : Key : Key
				]: SpecifiedOptions[Key]
			}> & Required<Options>>>>;

/**
Returns a boolean for whether either of two given types is true.

Use-case: Constructing complex conditional types where at least one condition must be satisfied.

@example
```
import type {Or} from 'type-fest';

type TT = Or<true, true>;
//=> true

type TF = Or<true, false>;
//=> true

type FT = Or<false, true>;
//=> true

type FF = Or<false, false>;
//=> false
```

Note: When `boolean` is passed as an argument, it is distributed into separate cases, and the final result is a union of those cases.
For example, `Or<false, boolean>` expands to `Or<false, true> | Or<false, false>`, which simplifies to `true | false` (i.e., `boolean`).

@example
```
import type {Or} from 'type-fest';

type A = Or<false, boolean>;
//=> boolean

type B = Or<boolean, false>;
//=> boolean

type C = Or<true, boolean>;
//=> true

type D = Or<boolean, true>;
//=> true

type E = Or<boolean, boolean>;
//=> boolean
```

Note: If `never` is passed as an argument, it is treated as `false` and the result is computed accordingly.

@example
```
import type {Or} from 'type-fest';

type A = Or<true, never>;
//=> true

type B = Or<never, true>;
//=> true

type C = Or<false, never>;
//=> false

type D = Or<never, false>;
//=> false

type E = Or<boolean, never>;
//=> boolean

type F = Or<never, boolean>;
//=> boolean

type G = Or<never, never>;
//=> false
```

@see {@link And}
@see {@link Xor}
*/
type Or<A extends boolean, B extends boolean> =
	_Or<If<IsNever<A>, false, A>, If<IsNever<B>, false, B>>; // `never` is treated as `false`

type _Or<A extends boolean, B extends boolean> = A extends true
	? true
	: B extends true
		? true
		: false;

/**
@see {@link AllExtend}
*/
type AllExtendOptions = {
	/**
	Consider `never` elements to match the target type only if the target type itself is `never` (or `any`).

	- When set to `true` (default), `never` is _not_ treated as a bottom type, instead, it is treated as a type that matches only itself (or `any`).
	- When set to `false`, `never` is treated as a bottom type, and behaves as it normally would.

	@default true

	@example
	```
	import type {AllExtend} from 'type-fest';

	type A = AllExtend<[1, 2, never], number, {strictNever: true}>;
	//=> false

	type B = AllExtend<[1, 2, never], number, {strictNever: false}>;
	//=> true

	type C = AllExtend<[never, never], never, {strictNever: true}>;
	//=> true

	type D = AllExtend<[never, never], never, {strictNever: false}>;
	//=> true

	type E = AllExtend<['a', 'b', never], any, {strictNever: true}>;
	//=> true

	type F = AllExtend<['a', 'b', never], any, {strictNever: false}>;
	//=> true

	type G = AllExtend<[never, 1], never, {strictNever: true}>;
	//=> false

	type H = AllExtend<[never, 1], never, {strictNever: false}>;
	//=> false
	```
	*/
	strictNever?: boolean;
};

type DefaultAllExtendOptions = {
	strictNever: true;
};

/**
Returns a boolean for whether every element in an array type extends another type.

@example
```
import type {AllExtend} from 'type-fest';

type A = AllExtend<[1, 2, 3], number>;
//=> true

type B = AllExtend<[1, 2, '3'], number>;
//=> false

type C = AllExtend<[number, number | string], number>;
//=> boolean

type D = AllExtend<[true, boolean, true], true>;
//=> boolean
```

Note: Behaviour of optional elements depend on the `exactOptionalPropertyTypes` compiler option. When the option is disabled, the target type must include `undefined` for a successful match.

```
// @exactOptionalPropertyTypes: true
import type {AllExtend} from 'type-fest';

type A = AllExtend<[1?, 2?, 3?], number>;
//=> true
```

```
// @exactOptionalPropertyTypes: false
import type {AllExtend} from 'type-fest';

type A = AllExtend<[1?, 2?, 3?], number>;
//=> boolean

type B = AllExtend<[1?, 2?, 3?], number | undefined>;
//=> true
```

@see {@link AllExtendOptions}

@category Utilities
@category Array
*/
type AllExtend<TArray extends UnknownArray, Type, Options extends AllExtendOptions = {}> =
	_AllExtend<CollapseRestElement<TArray>, Type, ApplyDefaultOptions<AllExtendOptions, DefaultAllExtendOptions, Options>>;

type _AllExtend<TArray extends UnknownArray, Type, Options extends Required<AllExtendOptions>> = IfNotAnyOrNever<TArray, If<IsAny<Type>, true,
	TArray extends readonly [infer First, ...infer Rest]
		? IsNever<First> extends true
			? Or<IsNever<Type>, Not<Options['strictNever']>> extends true
				// If target `Type` is also `never` OR `strictNever` is disabled, recurse further.
				? _AllExtend<Rest, Type, Options>
				: false
			: First extends Type
				? _AllExtend<Rest, Type, Options>
				: false
		: true
>, false, false>;

/**
Allows creating a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.

Currently, when a union type of a primitive type is combined with literal types, TypeScript loses all information about the combined literals. Thus, when such type is used in an IDE with autocompletion, no suggestions are made for the declared literals.

This type is a workaround for [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729). It will be removed as soon as it's not needed anymore.

@example
```
import type {LiteralUnion} from 'type-fest';

// Before

type Pet = 'dog' | 'cat' | string;

const petWithoutAutocomplete: Pet = '';
// Start typing in your TypeScript-enabled IDE.
// You **will not** get auto-completion for `dog` and `cat` literals.

// After

type Pet2 = LiteralUnion<'dog' | 'cat', string>;

const petWithAutoComplete: Pet2 = '';
// You **will** get auto-completion for `dog` and `cat` literals.
```

@category Type
*/
type LiteralUnion<
	LiteralType,
	BaseType extends Primitive,
> = LiteralType | (BaseType & Record<never, never>);

/**
Returns a boolean for whether the given string literal is lowercase.

@example
```
import type {IsLowercase} from 'type-fest';

type A = IsLowercase<'abc'>;
//=> true

type B = IsLowercase<'Abc'>;
//=> false

type C = IsLowercase<string>;
//=> boolean
```
*/
type IsLowercase<S extends string> = AllExtend<_IsLowercase<S>, true>;

/**
Loops through each part in the string and returns a boolean array indicating whether each part is lowercase.
*/
type _IsLowercase<S extends string, Accumulator extends boolean[] = []> = S extends `${infer First}${infer Rest}`
	? _IsLowercase<Rest, [...Accumulator, IsLowercaseHelper<First>]>
	: [...Accumulator, IsLowercaseHelper<S>];

/**
Returns a boolean for whether an individual part of the string is lowercase.
*/
type IsLowercaseHelper<S extends string> = S extends Lowercase<string>
	? true
	: S extends Uppercase<string> | Capitalize<string> | `${string}${Uppercase<string>}${string}`
		? false
		: boolean;

/**
Returns a boolean for whether the given string literal is uppercase.

@example
```
import type {IsUppercase} from 'type-fest';

type A = IsUppercase<'ABC'>;
//=> true

type B = IsUppercase<'Abc'>;
//=> false

type C = IsUppercase<string>;
//=> boolean
```
*/
type IsUppercase<S extends string> = AllExtend<_IsUppercase<S>, true>;

/**
Loops through each part in the string and returns a boolean array indicating whether each part is uppercase.
*/
type _IsUppercase<S extends string, Accumulator extends boolean[] = []> = S extends `${infer First}${infer Rest}`
	? _IsUppercase<Rest, [...Accumulator, IsUppercaseHelper<First>]>
	: [...Accumulator, IsUppercaseHelper<S>];

/**
Returns a boolean for whether an individual part of the string is uppercase.
*/
type IsUppercaseHelper<S extends string> = S extends Uppercase<string>
	? true
	: S extends Lowercase<string> | Uncapitalize<string> | `${string}${Lowercase<string>}${string}`
		? false
		: boolean;

type SkipEmptyWord<Word extends string> = Word extends '' ? [] : [Word];

type RemoveLastCharacter<
	Sentence extends string,
	Character extends string,
> = Sentence extends `${infer LeftSide}${Character}`
	? SkipEmptyWord<LeftSide>
	: never;

/**
Words options.

@see {@link Words}
*/
type WordsOptions = {
	/**
	Split on numeric sequence.

	@default true

	@example
	```
	import type {Words} from 'type-fest';

	type Example1 = Words<'p2pNetwork', {splitOnNumbers: true}>;
	//=> ['p', '2', 'p', 'Network']

	type Example2 = Words<'p2pNetwork', {splitOnNumbers: false}>;
	//=> ['p2p', 'Network']
	```
	*/
	splitOnNumbers?: boolean;
};

type _DefaultWordsOptions = {
	splitOnNumbers: true;
};

/**
Split a string (almost) like Lodash's `_.words()` function.

- Split on each word that begins with a capital letter.
- Split on each {@link WordSeparators}.
- Split on numeric sequence.

@example
```
import type {Words} from 'type-fest';

type Words0 = Words<'helloWorld'>;
//=> ['hello', 'World']

type Words1 = Words<'helloWORLD'>;
//=> ['hello', 'WORLD']

type Words2 = Words<'hello-world'>;
//=> ['hello', 'world']

type Words3 = Words<'--hello the_world'>;
//=> ['hello', 'the', 'world']

type Words4 = Words<'lifeIs42'>;
//=> ['life', 'Is', '42']

type Words5 = Words<'p2pNetwork', {splitOnNumbers: false}>;
//=> ['p2p', 'Network']
```

@category Change case
@category Template literal
*/
type Words<Sentence extends string, Options extends WordsOptions = {}> =
	WordsImplementation<Sentence, ApplyDefaultOptions<WordsOptions, _DefaultWordsOptions, Options>>;

type WordsImplementation<
	Sentence extends string,
	Options extends Required<WordsOptions>,
	LastCharacter extends string = '',
	CurrentWord extends string = '',
> = Sentence extends `${infer FirstCharacter}${infer RemainingCharacters}`
	? FirstCharacter extends WordSeparators
		// Skip word separator
		? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options>]
		: LastCharacter extends ''
			// Fist char of word
			? WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>
			// Case change: non-numeric to numeric
			: [false, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
				? Options['splitOnNumbers'] extends true
					// Split on number: push word
					? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
					// No split on number: concat word
					: WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
				// Case change: numeric to non-numeric
				: [true, false] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
					? Options['splitOnNumbers'] extends true
						// Split on number: push word
						? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
						// No split on number: concat word
						: WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
					// No case change: concat word
					: [true, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
						? WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
					// Case change: lower to upper, push word
						: [true, true] extends [IsLowercase<LastCharacter>, IsUppercase<FirstCharacter>]
							? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
						// Case change: upper to lower, brings back the last character, push word
							: [true, true] extends [IsUppercase<LastCharacter>, IsLowercase<FirstCharacter>]
								? [...RemoveLastCharacter<CurrentWord, LastCharacter>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${LastCharacter}${FirstCharacter}`>]
							// No case change: concat word
								: WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
	: [...SkipEmptyWord<CurrentWord>];

/**
CamelCase options.

@see {@link CamelCase}
*/
type CamelCaseOptions = WordsOptions & {
	/**
	Whether to preserved consecutive uppercase letter.

	@default false
	*/
	preserveConsecutiveUppercase?: boolean;
};

type _DefaultCamelCaseOptions = {
	splitOnNumbers: true;
	preserveConsecutiveUppercase: false;
};

/**
Convert an array of words to camel-case.
*/
type CamelCaseFromArray<
	Words extends string[],
	Options extends Required<CamelCaseOptions>,
	OutputString extends string = '',
> = Words extends [
	infer FirstWord extends string,
	...infer RemainingWords extends string[],
]
	? Options['preserveConsecutiveUppercase'] extends true
		? `${Capitalize<FirstWord>}${CamelCaseFromArray<RemainingWords, Options>}`
		: `${Capitalize<Lowercase<FirstWord>>}${CamelCaseFromArray<RemainingWords, Options>}`
	: OutputString;

/**
Convert a string literal to camel-case.

This can be useful when, for example, converting some kebab-cased command-line flags or a snake-cased database result.

By default, consecutive uppercase letter are preserved. See {@link CamelCaseOptions.preserveConsecutiveUppercase preserveConsecutiveUppercase} option to change this behaviour.

@example
```
import type {CamelCase} from 'type-fest';

// Simple

const someVariable: CamelCase<'foo-bar'> = 'fooBar';
const preserveConsecutiveUppercase: CamelCase<'foo-BAR-baz', {preserveConsecutiveUppercase: true}> = 'fooBARBaz';

// Advanced

type CamelCasedProperties<T> = {
	[K in keyof T as CamelCase<K>]: T[K]
};

type RawOptions = {
	'dry-run': boolean;
	'full_family_name': string;
	foo: number;
	BAR: string;
	QUZ_QUX: number;
	'OTHER-FIELD': boolean;
};

const dbResult: CamelCasedProperties<RawOptions> = {
	dryRun: true,
	fullFamilyName: 'bar.js',
	foo: 123,
	bar: 'foo',
	quzQux: 6,
	otherField: false,
};
```

@category Change case
@category Template literal
*/
type CamelCase<Type, Options extends CamelCaseOptions = {}> = Type extends string
	? string extends Type
		? Type
		: Uncapitalize<CamelCaseFromArray<
			Words<Type extends Uppercase<Type> ? Lowercase<Type> : Type, Options>,
			ApplyDefaultOptions<CamelCaseOptions, _DefaultCamelCaseOptions, Options>
		>>
	: Type;

/**
Convert object properties to camel case but not recursively.

This can be useful when, for example, converting some API types from a different style.

@see {@link CamelCasedPropertiesDeep}
@see {@link CamelCase}

@example
```
import type {CamelCasedProperties} from 'type-fest';

type User = {
	UserId: number;
	UserName: string;
};

const result: CamelCasedProperties<User> = {
	userId: 1,
	userName: 'Tom',
};

const preserveConsecutiveUppercase: CamelCasedProperties<{fooBAR: string}, {preserveConsecutiveUppercase: true}> = {
	fooBAR: 'string',
};
```

@category Change case
@category Template literal
@category Object
*/
type CamelCasedProperties<Value, Options extends CamelCaseOptions = {}> = Value extends Function
	? Value
	: Value extends Array<infer U>
		? Value
		: {
			[K in keyof Value as
			CamelCase<K, ApplyDefaultOptions<CamelCaseOptions, _DefaultCamelCaseOptions, Options>>
			]: Value[K];
		};

declare namespace PackageJson {
	/**
	A person who has been involved in creating or maintaining the package.
	*/
	type Person =
		| string
		| {
			name: string;
			url?: string;
			email?: string;
		};

	type BugsLocation =
		| string
		| {
			/**
			The URL to the package's issue tracker.
			*/
			url?: string;

			/**
			The email address to which issues should be reported.
			*/
			email?: string;
		};

	type DirectoryLocations = {
		[directoryType: string]: JsonValue | undefined;

		/**
		Location for executable scripts. Sugar to generate entries in the `bin` property by walking the folder.
		*/
		bin?: string;

		/**
		Location for Markdown files.
		*/
		doc?: string;

		/**
		Location for example scripts.
		*/
		example?: string;

		/**
		Location for the bulk of the library.
		*/
		lib?: string;

		/**
		Location for man pages. Sugar to generate a `man` array by walking the folder.
		*/
		man?: string;

		/**
		Location for test files.
		*/
		test?: string;
	};

	type Scripts = {
		/**
		Run **before** the package is published (Also run on local `npm install` without any arguments).
		*/
		prepublish?: string;

		/**
		Run both **before** the package is packed and published, and on local `npm install` without any arguments. This is run **after** `prepublish`, but **before** `prepublishOnly`.
		*/
		prepare?: string;

		/**
		Run **before** the package is prepared and packed, **only** on `npm publish`.
		*/
		prepublishOnly?: string;

		/**
		Run **before** a tarball is packed (on `npm pack`, `npm publish`, and when installing git dependencies).
		*/
		prepack?: string;

		/**
		Run **after** the tarball has been generated and moved to its final destination.
		*/
		postpack?: string;

		/**
		Run **after** the package is published.
		*/
		publish?: string;

		/**
		Run **after** the package is published.
		*/
		postpublish?: string;

		/**
		Run **before** the package is installed.
		*/
		preinstall?: string;

		/**
		Run **after** the package is installed.
		*/
		install?: string;

		/**
		Run **after** the package is installed and after `install`.
		*/
		postinstall?: string;

		/**
		Run **before** the package is uninstalled and before `uninstall`.
		*/
		preuninstall?: string;

		/**
		Run **before** the package is uninstalled.
		*/
		uninstall?: string;

		/**
		Run **after** the package is uninstalled.
		*/
		postuninstall?: string;

		/**
		Run **before** bump the package version and before `version`.
		*/
		preversion?: string;

		/**
		Run **before** bump the package version.
		*/
		version?: string;

		/**
		Run **after** bump the package version.
		*/
		postversion?: string;

		/**
		Run with the `npm test` command, before `test`.
		*/
		pretest?: string;

		/**
		Run with the `npm test` command.
		*/
		test?: string;

		/**
		Run with the `npm test` command, after `test`.
		*/
		posttest?: string;

		/**
		Run with the `npm stop` command, before `stop`.
		*/
		prestop?: string;

		/**
		Run with the `npm stop` command.
		*/
		stop?: string;

		/**
		Run with the `npm stop` command, after `stop`.
		*/
		poststop?: string;

		/**
		Run with the `npm start` command, before `start`.
		*/
		prestart?: string;

		/**
		Run with the `npm start` command.
		*/
		start?: string;

		/**
		Run with the `npm start` command, after `start`.
		*/
		poststart?: string;

		/**
		Run with the `npm restart` command, before `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
		*/
		prerestart?: string;

		/**
		Run with the `npm restart` command. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
		*/
		restart?: string;

		/**
		Run with the `npm restart` command, after `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
		*/
		postrestart?: string;
	} & Partial<Record<string, string>>;

	/**
	Dependencies of the package. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or Git URL.
	*/
	type Dependency = Partial<Record<string, string>>;

	/**
	Recursive map describing selective dependency version overrides supported by npm.
	*/
	type DependencyOverrides = {
		[packageName in string]: string | undefined | DependencyOverrides;
	};

	/**
	Specifies requirements for development environment components such as operating systems, runtimes, or package managers. Used to ensure consistent development environments across the team.
	*/
	type DevEngineDependency = {
		name: string;
		version?: string;
		onFail?: 'ignore' | 'warn' | 'error' | 'download';
	};

	/**
	A mapping of conditions and the paths to which they resolve.
	*/
	type ExportConditions = {
		[condition: string]: Exports;
	};

	/**
	Entry points of a module, optionally with conditions and subpath exports.
	*/
	type Exports =
		| null
		| string
		| Array<string | ExportConditions>
		| ExportConditions;

	/**
	Import map entries of a module, optionally with conditions and subpath imports.
	*/
	type Imports = {
		[key: `#${string}`]: Exports;
	};

	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface NonStandardEntryPoints {
		/**
		An ECMAScript module ID that is the primary entry point to the program.
		*/
		module?: string;

		/**
		A module ID with untranspiled code that is the primary entry point to the program.
		*/
		esnext?:
			| string
			| {
				[moduleName: string]: string | undefined;
				main?: string;
				browser?: string;
			};

		/**
		A hint to JavaScript bundlers or component tools when packaging modules for client side use.
		*/
		browser?:
			| string
			| Partial<Record<string, string | false>>;

		/**
		Denote which files in your project are "pure" and therefore safe for Webpack to prune if unused.

		[Read more.](https://webpack.js.org/guides/tree-shaking/)
		*/
		sideEffects?: boolean | string[];
	}

	type TypeScriptConfiguration = {
		/**
		Location of the bundled TypeScript declaration file.
		*/
		types?: string;

		/**
		Version selection map of TypeScript.
		*/
		typesVersions?: Partial<Record<string, Partial<Record<string, string[]>>>>;

		/**
		Location of the bundled TypeScript declaration file. Alias of `types`.
		*/
		typings?: string;
	};

	/**
	An alternative configuration for workspaces.
	*/
	type WorkspaceConfig = {
		/**
		An array of workspace pattern strings which contain the workspace packages.
		*/
		packages?: WorkspacePattern[];

		/**
		Designed to solve the problem of packages which break when their `node_modules` are moved to the root workspace directory - a process known as hoisting. For these packages, both within your workspace, and also some that have been installed via `node_modules`, it is important to have a mechanism for preventing the default Yarn workspace behavior. By adding workspace pattern strings here, Yarn will resume non-workspace behavior for any package which matches the defined patterns.

		[Supported](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/) by Yarn.
		[Not supported](https://github.com/npm/rfcs/issues/287) by npm.
		*/
		nohoist?: WorkspacePattern[];
	};

	/**
	A workspace pattern points to a directory or group of directories which contain packages that should be included in the workspace installation process.

	The patterns are handled with [minimatch](https://github.com/isaacs/minimatch).

	@example
	`docs` → Include the docs directory and install its dependencies.
	`packages/*` → Include all nested directories within the packages directory, like `packages/cli` and `packages/core`.
	*/
	type WorkspacePattern = string;

	type YarnConfiguration = {
		/**
		If your package only allows one version of a given dependency, and you’d like to enforce the same behavior as `yarn install --flat` on the command-line, set this to `true`.

		Note that if your `package.json` contains `"flat": true` and other packages depend on yours (e.g. you are building a library rather than an app), those other packages will also need `"flat": true` in their `package.json` or be installed with `yarn install --flat` on the command-line.
		*/
		flat?: boolean;

		/**
		Selective version resolutions. Allows the definition of custom package versions inside dependencies without manual edits in the `yarn.lock` file.
		*/
		resolutions?: Dependency;
	};

	type JSPMConfiguration = {
		/**
		JSPM configuration.
		*/
		jspm?: PackageJson;
	};

	/**
	Type for [npm's `package.json` file](https://docs.npmjs.com/creating-a-package-json-file). Containing standard npm properties.
	*/
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface PackageJsonStandard {
		/**
		The name of the package.
		*/
		name?: string;

		/**
		Package version, parseable by [`node-semver`](https://github.com/npm/node-semver).
		*/
		version?: string;

		/**
		Package description, listed in `npm search`.
		*/
		description?: string;

		/**
		Keywords associated with package, listed in `npm search`.
		*/
		keywords?: string[];

		/**
		The URL to the package's homepage.
		*/
		homepage?: LiteralUnion<'.', string>;

		/**
		The URL to the package's issue tracker and/or the email address to which issues should be reported.
		*/
		bugs?: BugsLocation;

		/**
		The license for the package.
		*/
		license?: string;

		/**
		The licenses for the package.
		*/
		licenses?: Array<{
			type?: string;
			url?: string;
		}>;

		author?: Person;

		/**
		A list of people who contributed to the package.
		*/
		contributors?: Person[];

		/**
		A list of people who maintain the package.
		*/
		maintainers?: Person[];

		/**
		The files included in the package.
		*/
		files?: string[];

		/**
		Resolution algorithm for importing ".js" files from the package's scope.

		[Read more.](https://nodejs.org/api/esm.html#esm_package_json_type_field)
		*/
		type?: 'module' | 'commonjs';

		/**
		The module ID that is the primary entry point to the program.
		*/
		main?: string;

		/**
		Subpath exports to define entry points of the package.

		[Read more.](https://nodejs.org/api/packages.html#subpath-exports)
		*/
		exports?: Exports;

		/**
		Subpath imports to define internal package import maps that only apply to import specifiers from within the package itself.

		[Read more.](https://nodejs.org/api/packages.html#subpath-imports)
		*/
		imports?: Imports;

		/**
		The executable files that should be installed into the `PATH`.
		*/
		bin?:
			| string
			| Partial<Record<string, string>>;

		/**
		Filenames to put in place for the `man` program to find.
		*/
		man?: string | string[];

		/**
		Indicates the structure of the package.
		*/
		directories?: DirectoryLocations;

		/**
		Location for the code repository.
		*/
		repository?:
			| string
			| {
				type: string;
				url: string;

				/**
			Relative path to package.json if it is placed in non-root directory (for example if it is part of a monorepo).

			[Read more.](https://github.com/npm/rfcs/blob/latest/implemented/0010-monorepo-subdirectory-declaration.md)
			*/
				directory?: string;
			};

		/**
		Script commands that are run at various times in the lifecycle of the package. The key is the lifecycle event, and the value is the command to run at that point.
		*/
		scripts?: Scripts;

		/**
		Is used to set configuration parameters used in package scripts that persist across upgrades.
		*/
		config?: JsonObject;

		/**
		The dependencies of the package.
		*/
		dependencies?: Dependency;

		/**
		Additional tooling dependencies that are not required for the package to work. Usually test, build, or documentation tooling.
		*/
		devDependencies?: Dependency;

		/**
		Dependencies that are skipped if they fail to install.
		*/
		optionalDependencies?: Dependency;

		/**
		Dependencies that will usually be required by the package user directly or via another dependency.
		*/
		peerDependencies?: Dependency;

		/**
		Indicate peer dependencies that are optional.
		*/
		peerDependenciesMeta?: Partial<Record<string, {optional: true}>>;

		/**
		Package names that are bundled when the package is published.
		*/
		bundledDependencies?: string[];

		/**
		Alias of `bundledDependencies`.
		*/
		bundleDependencies?: string[];

		/**
		Overrides is used to support selective version overrides using npm, which lets you define custom package versions or ranges inside your dependencies.
		*/
		overrides?: DependencyOverrides;

		/**
		Engines that this package runs on.
		*/
		engines?: {
			[EngineName in LiteralUnion<'npm' | 'node', string>]?: string;
		};

		/**
		@deprecated
		*/
		engineStrict?: boolean;

		/**
		Operating systems the module runs on.
		*/
		os?: Array<LiteralUnion<
			| 'aix'
			| 'darwin'
			| 'freebsd'
			| 'linux'
			| 'openbsd'
			| 'sunos'
			| 'win32'
			| '!aix'
			| '!darwin'
			| '!freebsd'
			| '!linux'
			| '!openbsd'
			| '!sunos'
			| '!win32',
			string
		>>;

		/**
		CPU architectures the module runs on.
		*/
		cpu?: Array<LiteralUnion<
			| 'arm'
			| 'arm64'
			| 'ia32'
			| 'mips'
			| 'mipsel'
			| 'ppc'
			| 'ppc64'
			| 's390'
			| 's390x'
			| 'x32'
			| 'x64'
			| '!arm'
			| '!arm64'
			| '!ia32'
			| '!mips'
			| '!mipsel'
			| '!ppc'
			| '!ppc64'
			| '!s390'
			| '!s390x'
			| '!x32'
			| '!x64',
			string
		>>;

		/**
		Define the runtime and package manager for developing the current project.
		*/
		devEngines?: {
			os?: DevEngineDependency | DevEngineDependency[];
			cpu?: DevEngineDependency | DevEngineDependency[];
			libc?: DevEngineDependency | DevEngineDependency[];
			runtime?: DevEngineDependency | DevEngineDependency[];
			packageManager?: DevEngineDependency | DevEngineDependency[];
		};

		/**
		If set to `true`, a warning will be shown if package is installed locally. Useful if the package is primarily a command-line application that should be installed globally.

		@deprecated
		*/
		preferGlobal?: boolean;

		/**
		If set to `true`, then npm will refuse to publish it.
		*/
		private?: boolean;

		/**
		A set of config values that will be used at publish-time. It's especially handy to set the tag, registry or access, to ensure that a given package is not tagged with 'latest', published to the global public registry or that a scoped module is private by default.
		*/
		publishConfig?: PublishConfig;

		/**
		Describes and notifies consumers of a package's monetary support information.

		[Read more.](https://github.com/npm/rfcs/blob/main/implemented/0017-add-funding-support.md)
		*/
		funding?: string | {
			/**
			The type of funding.
			*/
			type?: LiteralUnion<
				| 'github'
				| 'opencollective'
				| 'patreon'
				| 'individual'
				| 'foundation'
				| 'corporation',
				string
			>;

			/**
			The URL to the funding page.
			*/
			url: string;
		};

		/**
		Used to configure [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) / [Yarn workspaces](https://classic.yarnpkg.com/docs/workspaces/).

		Workspaces allow you to manage multiple packages within the same repository in such a way that you only need to run your install command once in order to install all of them in a single pass.

		Please note that the top-level `private` property of `package.json` **must** be set to `true` in order to use workspaces.
		*/
		workspaces?: WorkspacePattern[] | WorkspaceConfig;
	}

	/**
	Type for [`package.json` file used by the Node.js runtime](https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions).
	*/
	type NodeJsStandard = {
		/**
		Defines which package manager is expected to be used when working on the current project. It can set to any of the [supported package managers](https://nodejs.org/api/corepack.html#supported-package-managers), and will ensure that your teams use the exact same package manager versions without having to install anything else than Node.js.

		__This field is currently experimental and needs to be opted-in; check the [Corepack](https://nodejs.org/api/corepack.html) page for details about the procedure.__

		@example
		```json
		{
			"packageManager": "<package manager name>@<version>"
		}
		```
		*/
		packageManager?: string;
	};

	type PublishConfig = {
		/**
		Additional, less common properties from the [npm docs on `publishConfig`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#publishconfig).
		*/
		[additionalProperties: string]: JsonValue | undefined;

		/**
		When publishing scoped packages, the access level defaults to restricted. If you want your scoped package to be publicly viewable (and installable) set `--access=public`. The only valid values for access are public and restricted. Unscoped packages always have an access level of public.
		*/
		access?: 'public' | 'restricted';

		/**
		The base URL of the npm registry.

		Default: `'https://registry.npmjs.org/'`
		*/
		registry?: string;

		/**
		The tag to publish the package under.

		Default: `'latest'`
		*/
		tag?: string;
	};
}

/**
Type for [npm's `package.json` file](https://docs.npmjs.com/creating-a-package-json-file). Also includes types for fields used by other popular projects, like TypeScript and Yarn.

@category File
*/
type PackageJson =
	JsonObject &
	PackageJson.NodeJsStandard &
	PackageJson.PackageJsonStandard &
	PackageJson.NonStandardEntryPoints &
	PackageJson.TypeScriptConfiguration &
	PackageJson.YarnConfiguration &
	PackageJson.JSPMConfiguration;

type FlagType = 'string' | 'boolean' | 'number';

/**
Callback function to determine if a flag is required during runtime.

@param flags - Contains the flags converted to camel-case excluding aliases.
@param input - Contains the non-flag arguments.

@returns True if the flag is required, otherwise false.
*/
type IsRequiredPredicate = (flags: Readonly<AnyFlags>, input: readonly string[]) => boolean;

type Flag<PrimitiveType extends FlagType, Type, IsMultiple = false> = {
	/**
	Type of value. (Possible values: `string` `boolean` `number`)
	*/
	readonly type?: PrimitiveType;

	/**
	Limit valid values to a predefined set of choices.

	@example
	```
	unicorn: {
		isMultiple: true,
		choices: ['rainbow', 'cat', 'unicorn']
	}
	```
	*/
	readonly choices?: Type extends unknown[] ? Type : Type[];

	/**
	Default value when the flag is not specified.

	@example
	```
	unicorn: {
		type: 'boolean',
		default: true
	}
	```
	*/
	readonly default?: Type;

	/**
	A short flag alias.

	@example
	```
	unicorn: {
		shortFlag: 'u'
	}
	```
	*/
	readonly shortFlag?: string;

	/**
	Other names for the flag.

	@example
	```
	unicorn: {
		aliases: ['unicorns', 'uni']
	}
	```
	*/
	readonly aliases?: string[];

	/**
	Indicates a flag can be set multiple times. Values are turned into an array.

	Multiple values are provided by specifying the flag multiple times, for example, `$ foo -u rainbow -u cat`. Space- or comma-separated values [currently *not* supported](https://github.com/sindresorhus/meow/issues/164).

	@default false
	*/
	readonly isMultiple?: IsMultiple;

	/**
	Determine if the flag is required.

	If it's only known at runtime whether the flag is required or not you can pass a Function instead of a boolean, which based on the given flags and other non-flag arguments should decide if the flag is required.

	- The first argument is the **flags** object, which contains the flags converted to camel-case excluding aliases.
	- The second argument is the **input** string array, which contains the non-flag arguments.
	- The function should return a `boolean`, true if the flag is required, otherwise false.

	@default false

	@example
	```
	isRequired: (flags, input) => {
		if (flags.otherFlag) {
			return true;
		}

		return false;
	}
	```
	*/
	readonly isRequired?: boolean | IsRequiredPredicate;
};

type StringFlag = Flag<'string', string> | Flag<'string', string[], true>;
type BooleanFlag = Flag<'boolean', boolean> | Flag<'boolean', boolean[], true>;
type NumberFlag = Flag<'number', number> | Flag<'number', number[], true>;
type AnyFlag = StringFlag | BooleanFlag | NumberFlag;
type AnyFlags = Record<string, AnyFlag>;

type InputOptionType = 'string' | 'boolean' | 'number' | 'array' | 'string-array' | 'boolean-array' | 'number-array';

type InputOption = {
	/**
	The data type the input arguments should be parsed to.
	*/
	readonly type?: InputOptionType;

	/**
	Determine if at least one non-flag input argument is required.

	If it's only known at runtime whether the input is required or not, you can pass a `Function` instead of a `boolean`, which based on the given input should decide if it's required.

	@default false

	@example
	```
	input: {
		isRequired: true
	}
	```
	*/
	readonly isRequired?: boolean | ((input: readonly string[]) => boolean);
};

type Options<Flags extends AnyFlags> = {
	/**
	Pass in [`import.meta`](https://nodejs.org/dist/latest/docs/api/esm.html#esm_import_meta). This is used to find the correct package.json file.
	*/
	readonly importMeta: ImportMeta;

	/**
	Define argument flags.

	The key is the flag name in camel-case and the value is an object with any of:

	- `type`: Type of value. (Possible values: `string` `boolean` `number`)
	- `choices`: Limit valid values to a predefined set of choices.
	- `default`: Default value when the flag is not specified.
	- `shortFlag`: A short flag alias.
	- `aliases`: Other names for the flag.
	- `isMultiple`: Indicates a flag can be set multiple times. Values are turned into an array. (Default: false)
		- Multiple values are provided by specifying the flag multiple times, for example, `$ foo -u rainbow -u cat`. Space- or comma-separated values [currently *not* supported](https://github.com/sindresorhus/meow/issues/164).
	- `isRequired`: Determine if the flag is required. (Default: false)
		- If it's only known at runtime whether the flag is required or not, you can pass a `Function` instead of a `boolean`, which based on the given flags and other non-flag arguments, should decide if the flag is required. Two arguments are passed to the function:
		- The first argument is the **flags** object, which contains the flags converted to camel-case excluding aliases.
		- The second argument is the **input** string array, which contains the non-flag arguments.
		- The function should return a `boolean`, true if the flag is required, otherwise false.

	Note that flags are always defined using a camel-case key (`myKey`), but will match arguments in kebab-case (`--my-key`).

	@example
	```
	flags: {
		unicorn: {
			type: 'string',
			choices: ['rainbow', 'cat', 'unicorn'],
			default: ['rainbow', 'cat'],
			shortFlag: 'u',
			aliases: ['unicorns'],
			isMultiple: true,
			isRequired: (flags, input) => {
				if (flags.otherFlag) {
					return true;
				}

				return false;
			}
		}
	}
	```
	*/
	readonly flags?: Flags;

	/**
	Options for non-flag input arguments.

	@example
	```
	input: 'number'
	```

	@example
	```
	input: {
		type: 'number',
		isRequired: true
	}
	```
	*/
	readonly input?: InputOption | InputOptionType;

	/**
	List of valid commands. Commands must be a single argument without whitespace and must not start with `-`.

	When set, parsing stops at the first non-flag argument and treats it as the command. The remaining arguments are returned in `input` so they can be passed to a subcommand parser. An unknown command will show help and exit with code 2. Parent flags must appear before the command.

	If no command is given, `cli.command` is `undefined` and meow does not exit — you decide what to do (show help, run a default, etc.).

	@example
	```
	import meow from 'meow';

	const cli = meow({
		importMeta: import.meta,
		commands: ['run', 'list'],
		flags: {
			verbose: {
				type: 'boolean',
				shortFlag: 'v'
			}
		}
	});

	if (!cli.command) {
		cli.showHelp(0);
	}

	if (cli.command === 'run') {
		const runCli = meow({importMeta: import.meta, argv: cli.input});
	}
	```
	*/
	readonly commands?: readonly string[];

	/**
	Description to show above the help text. Default: The package.json `"description"` property.

	Set it to `false` to disable it altogether.
	*/
	readonly description?: string | false;

	/**
	The help text you want shown.

	The input is reindented and starting/ending newlines are trimmed which means you can use a [template literal](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings) without having to care about using the correct amount of indent.

	The description will be shown above your help text automatically.

	Set it to `false` to disable it altogether.
	*/
	readonly help?: string | false;

	/**
	Set a custom version output. Default: The package.json `"version"` property.
	*/
	readonly version?: string;

	/**
	Automatically show the help text when the `--help` flag is present. Useful to set this value to `false` when a CLI manages child CLIs with their own help text.

	This is only triggered when `--help` is the only argument.
	*/
	readonly autoHelp?: boolean;

	/**
	Automatically show the version text when the `--version` flag is present. Useful to set this value to `false` when a CLI manages child CLIs with their own version text.

	This is only triggered when `--version` is the only argument.
	*/
	readonly autoVersion?: boolean;

	/**
	`package.json` as an `Object`. Default: Closest `package.json` upwards.

	Note: Setting this stops `meow` from finding a package.json.

	_You most likely don't need this option._
	*/
	readonly pkg?: Record<string, unknown>;

	/**
	Custom arguments object.

	@default process.argv.slice(2)
	*/
	readonly argv?: readonly string[];

	/**
	Infer the argument type.

	By default, the argument `5` in `$ foo 5` becomes a string. Enabling this would infer it as a number.

	@default false
	*/
	readonly inferType?: boolean;

	/**
	Value of `boolean` flags not defined in `argv`.

	If set to `undefined`, the flags not defined in `argv` will be excluded from the result. The `default` value set in `boolean` flags take precedence over `booleanDefault`.

	_Note: If used in conjunction with `isMultiple`, the default flag value is set to `[]`._

	__Caution: Explicitly specifying `undefined` for `booleanDefault` has different meaning from omitting key itself.__

	@example
	```
	import meow from 'meow';

	const cli = meow(`
		Usage
			$ foo

		Options
			--rainbow, -r  Include a rainbow
			--unicorn, -u  Include a unicorn
			--no-sparkles  Exclude sparkles

		Examples
			$ foo
			🌈 unicorns✨🌈
	`, {
		importMeta: import.meta,
		booleanDefault: undefined,
		flags: {
			rainbow: {
				type: 'boolean',
				default: true,
				shortFlag: 'r'
			},
				unicorn: {
				type: 'boolean',
				default: false,
				shortFlag: 'u'
			},
			cake: {
				type: 'boolean',
				shortFlag: 'c'
			},
			sparkles: {
				type: 'boolean',
				default: true
			}
		}
	});

	//{
	//	flags: {
	//		rainbow: true,
	//		unicorn: false,
	//		sparkles: true
	//	},
	//	unnormalizedFlags: {
	//		rainbow: true,
	//		r: true,
	//		unicorn: false,
	//		u: false,
	//		sparkles: true
	//	},
	//	…
	//}
	```
	*/
	readonly booleanDefault?: boolean | undefined;

	/**
	Whether to allow unknown flags or not.

	@default true
	*/
	readonly allowUnknownFlags?: boolean;

	/**
	The number of spaces to use for indenting the help text.

	@default 2
	*/
	readonly helpIndent?: number;
};

type TypedFlag<Flag extends AnyFlag> =
		Flag extends {type: 'number'}
			? number
			: Flag extends {type: 'string'}
				? string
				: Flag extends {type: 'boolean'}
					? boolean
					: unknown;

type PossiblyOptionalFlag<Flag extends AnyFlag, FlagType> =
		Flag extends {isRequired: true}
			? FlagType
			: Flag extends {default: any}
				? FlagType
				: FlagType | undefined;

type TypedFlags<Flags extends AnyFlags> = {
	[F in keyof Flags]: Flags[F] extends {isMultiple: true}
		? PossiblyOptionalFlag<Flags[F], Array<TypedFlag<Flags[F]>>>
		: PossiblyOptionalFlag<Flags[F], TypedFlag<Flags[F]>>
};

type Result<Flags extends AnyFlags> = {
	/**
	Non-flag arguments.
	*/
	input: string[];

	/**
	Command name when using the `commands` option.
	*/
	command?: string;

	/**
	Flags converted to camelCase excluding aliases.
	*/
	flags: CamelCasedProperties<TypedFlags<Flags>> & Record<string, unknown>;

	/**
	Flags converted camelCase including aliases.
	*/
	unnormalizedFlags: TypedFlags<Flags> & Record<string, unknown>;

	/**
	The `package.json` object.
	*/
	pkg: PackageJson;

	/**
	The help text used with `--help`.
	*/
	help: string;

	/**
	Show the help text and exit with code.

	@param exitCode - The exit code to use. Default: `2`.
	*/
	showHelp: (exitCode?: number) => never;

	/**
	Show the version text and exit.
	*/
	showVersion: () => never;
};
/**
@param helpMessage - Shortcut for the `help` option.

@example
```
#!/usr/bin/env node
import meow from 'meow';
import foo from './index.js';

const cli = meow(`
	Usage
	  $ foo <input>

	Options
	  --rainbow, -r  Include a rainbow

	Examples
	  $ foo unicorns --rainbow
	  🌈 unicorns 🌈
`, {
	importMeta: import.meta, // This is required
	flags: {
		rainbow: {
			type: 'boolean',
			shortFlag: 'r'
		}
	}
});

//{
//	input: ['unicorns'],
//	flags: {rainbow: true},
//	...
//}

foo(cli.input.at(0), cli.flags);
```
*/
declare function meow<Flags extends AnyFlags>(helpMessage: string, options: Options<Flags>): Result<Flags>;
declare function meow<Flags extends AnyFlags>(options: Options<Flags>): Result<Flags>;

export { meow as default };
export type { AnyFlag, AnyFlags, Flag, FlagType, InputOption, InputOptionType, IsRequiredPredicate, Options, Result, TypedFlags };
