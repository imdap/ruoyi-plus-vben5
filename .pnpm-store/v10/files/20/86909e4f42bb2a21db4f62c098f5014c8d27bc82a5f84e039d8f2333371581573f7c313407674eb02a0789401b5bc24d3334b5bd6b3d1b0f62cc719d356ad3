import { MatcherType, SelectorKind } from "../../types/rule.js";
import type { InferOutput } from "valibot";
export declare const SELECTOR_SCHEMA: import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Attribute, undefined>, import("valibot").DescriptionAction<SelectorKind.Attribute, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
}, undefined>, import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
    readonly callTarget: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Callee, undefined>, import("valibot").DescriptionAction<SelectorKind.Callee, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
    readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for callee paths that should be linted.">]>, undefined>;
    readonly targetArgument: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional argument target for call arguments: index, first, last, or all.">]>;
    readonly targetCall: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
}, undefined>, import("valibot").StrictObjectSchema<{
    readonly callTarget: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Callee, undefined>, import("valibot").DescriptionAction<SelectorKind.Callee, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>, undefined>;
    readonly path: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for callee paths that should be linted.">]>;
    readonly targetArgument: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional argument target for call arguments: index, first, last, or all.">]>;
    readonly targetCall: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
}, undefined>], undefined>, import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Tag, undefined>, import("valibot").DescriptionAction<SelectorKind.Tag, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
    readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for tag paths that should be linted.">]>, undefined>;
}, undefined>, import("valibot").StrictObjectSchema<{
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Tag, undefined>, import("valibot").DescriptionAction<SelectorKind.Tag, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>, undefined>;
    readonly path: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for tag paths that should be linted.">]>;
}, undefined>], undefined>, import("valibot").StrictObjectSchema<{
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Variable, undefined>, import("valibot").DescriptionAction<SelectorKind.Variable, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
}, undefined>], undefined>;
export type Selector = InferOutput<typeof SELECTOR_SCHEMA>;
export declare const SELECTORS_SCHEMA: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Attribute, undefined>, import("valibot").DescriptionAction<SelectorKind.Attribute, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
}, undefined>, import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
    readonly callTarget: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Callee, undefined>, import("valibot").DescriptionAction<SelectorKind.Callee, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
    readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for callee paths that should be linted.">]>, undefined>;
    readonly targetArgument: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional argument target for call arguments: index, first, last, or all.">]>;
    readonly targetCall: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
}, undefined>, import("valibot").StrictObjectSchema<{
    readonly callTarget: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Callee, undefined>, import("valibot").DescriptionAction<SelectorKind.Callee, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>, undefined>;
    readonly path: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for callee paths that should be linted.">]>;
    readonly targetArgument: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional argument target for call arguments: index, first, last, or all.">]>;
    readonly targetCall: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
}, undefined>], undefined>, import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Tag, undefined>, import("valibot").DescriptionAction<SelectorKind.Tag, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
    readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for tag paths that should be linted.">]>, undefined>;
}, undefined>, import("valibot").StrictObjectSchema<{
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Tag, undefined>, import("valibot").DescriptionAction<SelectorKind.Tag, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>, undefined>;
    readonly path: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for tag paths that should be linted.">]>;
}, undefined>], undefined>, import("valibot").StrictObjectSchema<{
    readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Variable, undefined>, import("valibot").DescriptionAction<SelectorKind.Variable, "Selector kind that determines where matching is applied.">]>;
    readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[], "List of nested matchers that target the return value of anonymous functions.">]>;
        readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
    }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined, "Optional list of matchers that will be applied.">]>;
    readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
}, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
    callTarget?: number | "all" | "first" | "last" | undefined;
    kind: SelectorKind.Callee;
    match?: ({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined;
    name: string;
    path?: string | undefined;
    targetArgument?: number | "all" | "first" | "last" | undefined;
    targetCall?: number | "all" | "first" | "last" | undefined;
} | {
    callTarget?: number | "all" | "first" | "last" | undefined;
    kind: SelectorKind.Callee;
    match?: ({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined;
    name?: string | undefined;
    path: string;
    targetArgument?: number | "all" | "first" | "last" | undefined;
    targetCall?: number | "all" | "first" | "last" | undefined;
} | {
    kind: SelectorKind.Tag;
    match?: ({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined;
    name: string;
    path?: string | undefined;
} | {
    kind: SelectorKind.Tag;
    match?: ({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined;
    name?: string | undefined;
    path: string;
} | {
    kind: SelectorKind.Attribute;
    match?: ({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined;
    name: string;
} | {
    kind: SelectorKind.Variable;
    match?: ({
        type: MatcherType.String;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectKey;
    } | {
        path?: string | undefined;
        type: MatcherType.ObjectValue;
    } | {
        match: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        })[];
        type: MatcherType.AnonymousFunctionReturn;
    })[] | undefined;
    name: string;
})[], "Flat list of selectors that should get linted.">]>;
export type Selectors = InferOutput<typeof SELECTORS_SCHEMA>;
export declare const SELECTORS_OPTION_SCHEMA: import("valibot").StrictObjectSchema<{
    readonly selectors: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Attribute, undefined>, import("valibot").DescriptionAction<SelectorKind.Attribute, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
    }, undefined>, import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly callTarget: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Callee, undefined>, import("valibot").DescriptionAction<SelectorKind.Callee, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for callee paths that should be linted.">]>, undefined>;
        readonly targetArgument: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional argument target for call arguments: index, first, last, or all.">]>;
        readonly targetCall: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly callTarget: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Callee, undefined>, import("valibot").DescriptionAction<SelectorKind.Callee, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>, undefined>;
        readonly path: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for callee paths that should be linted.">]>;
        readonly targetArgument: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional argument target for call arguments: index, first, last, or all.">]>;
        readonly targetCall: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
    }, undefined>], undefined>, import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Tag, undefined>, import("valibot").DescriptionAction<SelectorKind.Tag, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for tag paths that should be linted.">]>, undefined>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Tag, undefined>, import("valibot").DescriptionAction<SelectorKind.Tag, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>, undefined>;
        readonly path: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for tag paths that should be linted.">]>;
    }, undefined>], undefined>, import("valibot").StrictObjectSchema<{
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<SelectorKind.Variable, undefined>, import("valibot").DescriptionAction<SelectorKind.Variable, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.String, undefined>, import("valibot").DescriptionAction<MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
    }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
        callTarget?: number | "all" | "first" | "last" | undefined;
        kind: SelectorKind.Callee;
        match?: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name: string;
        path?: string | undefined;
        targetArgument?: number | "all" | "first" | "last" | undefined;
        targetCall?: number | "all" | "first" | "last" | undefined;
    } | {
        callTarget?: number | "all" | "first" | "last" | undefined;
        kind: SelectorKind.Callee;
        match?: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name?: string | undefined;
        path: string;
        targetArgument?: number | "all" | "first" | "last" | undefined;
        targetCall?: number | "all" | "first" | "last" | undefined;
    } | {
        kind: SelectorKind.Tag;
        match?: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name: string;
        path?: string | undefined;
    } | {
        kind: SelectorKind.Tag;
        match?: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name?: string | undefined;
        path: string;
    } | {
        kind: SelectorKind.Attribute;
        match?: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name: string;
    } | {
        kind: SelectorKind.Variable;
        match?: ({
            type: MatcherType.String;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: MatcherType.ObjectValue;
        } | {
            match: ({
                type: MatcherType.String;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: MatcherType.ObjectValue;
            })[];
            type: MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name: string;
    })[], "Flat list of selectors that should get linted.">]>, ({
        kind: SelectorKind.Callee;
        match: {
            type: MatcherType.String;
        }[];
        name: string;
    } | {
        kind: SelectorKind.Callee;
        match: {
            type: MatcherType.ObjectKey;
        }[];
        name: string;
    } | {
        kind: SelectorKind.Callee;
        match: {
            path: string;
            type: MatcherType.ObjectValue;
        }[];
        name: string;
    } | {
        kind: SelectorKind.Tag;
        path: string;
    } | {
        kind: SelectorKind.Callee;
        match: ({
            type: MatcherType.String;
            match?: never;
        } | {
            match: {
                type: MatcherType.String;
            }[];
            type: MatcherType.AnonymousFunctionReturn;
        })[];
        path: string;
    } | {
        kind: SelectorKind.Attribute;
        name: string;
        match?: never;
    } | {
        kind: SelectorKind.Attribute;
        match: ({
            type: MatcherType.String;
        } | {
            type: MatcherType.ObjectKey;
        })[];
        name: string;
    } | {
        kind: SelectorKind.Variable;
        match: {
            type: MatcherType.String;
        }[];
        name: string;
    })[]>;
}, undefined>;
export type SelectorsOptions = InferOutput<typeof SELECTORS_OPTION_SCHEMA>;
//# sourceMappingURL=selectors.d.ts.map