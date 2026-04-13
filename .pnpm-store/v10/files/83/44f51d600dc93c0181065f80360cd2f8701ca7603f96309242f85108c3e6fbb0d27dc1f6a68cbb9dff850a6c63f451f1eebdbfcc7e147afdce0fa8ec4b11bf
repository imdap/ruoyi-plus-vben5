import type { InferOutput } from "valibot";
export declare const COMMON_OPTIONS: import("valibot").StrictObjectSchema<{
    readonly cwd: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "The working directory to resolve tailwindcss and the config from. Useful in monorepo setups.">]>, undefined>;
    readonly rootFontSize: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").DescriptionAction<number, "The root font size in pixels.">]>, undefined>;
    readonly detectComponentClasses: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").BooleanSchema<undefined>, import("valibot").DescriptionAction<boolean, "Whether to automatically detect custom component classes from the tailwindcss config.">]>, false>;
    readonly tsconfig: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "The path to the tsconfig file. Is used to resolve path aliases in the tsconfig.">]>, undefined>;
    readonly tailwindConfig: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "The path to the tailwind config file. If not specified, the plugin will try to find it automatically or falls back to the default configuration.">]>, undefined>;
    readonly messageStyle: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").UnionSchema<[import("valibot").LiteralSchema<"visual", undefined>, import("valibot").LiteralSchema<"compact", undefined>, import("valibot").LiteralSchema<"raw", undefined>], undefined>, import("valibot").DescriptionAction<"visual" | "compact" | "raw", "How linting messages are displayed.">]>, "visual" | "compact">;
    readonly entryPoint: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "The path to the css entry point of the project. If not specified, the plugin will fall back to the default tailwind classes.">]>, undefined>;
    readonly tags: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").SchemaWithPipe<readonly [import("valibot").TupleSchema<[import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Template literal tag for which children get linted if matched.">]>, import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        readonly pathPattern: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        readonly pathPattern: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
    }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[], "List of matchers that will be applied.">]>], undefined>, import("valibot").DescriptionAction<[string, ({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[]], "List of matchers that will automatically be matched.">]>, import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Template literal tag that should get linted.">]>], undefined>, undefined>, import("valibot").DescriptionAction<(string | [string, ({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[]])[], "List of template literal tags that should get linted.">]>, undefined>;
    readonly variables: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").SchemaWithPipe<readonly [import("valibot").TupleSchema<[import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Variable name for which children get linted if matched.">]>, import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        readonly pathPattern: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        readonly pathPattern: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
    }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[], "List of matchers that will be applied.">]>], undefined>, import("valibot").DescriptionAction<[string, ({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[]], "List of matchers that will automatically be matched.">]>, import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Variable name for which children get linted.">]>], undefined>, undefined>, import("valibot").DescriptionAction<(string | [string, ({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[]])[], "List of variable names which values should get linted.">]>, undefined>;
    readonly attributes: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Attribute name that for which children get linted.">]>, import("valibot").SchemaWithPipe<readonly [import("valibot").TupleSchema<[import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Attribute name for which children get linted if matched.">]>, import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        readonly pathPattern: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        readonly pathPattern: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
    }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[], "List of matchers that will be applied.">]>], undefined>, import("valibot").DescriptionAction<[string, ({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[]], "List of matchers that will automatically be matched.">]>], undefined>, undefined>, import("valibot").DescriptionAction<(string | [string, ({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[]])[], "List of attribute names that should get linted.">]>, undefined>;
    readonly callees: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").SchemaWithPipe<readonly [import("valibot").TupleSchema<[import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Callee name for which children get linted if matched.">]>, import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        readonly pathPattern: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        readonly pathPattern: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
    }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[], "List of matchers that will be applied.">]>], undefined>, import("valibot").DescriptionAction<[string, ({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[]], "List of matchers that will automatically be matched.">]>, import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Callee name for which children get linted.">]>], undefined>, undefined>, import("valibot").DescriptionAction<(string | [string, ({
        match: import("../types/rule.js").MatcherType.String;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectKey;
        pathPattern?: string | undefined;
    } | {
        match: import("../types/rule.js").MatcherType.ObjectValue;
        pathPattern?: string | undefined;
    })[]])[], "List of function names which arguments should get linted.">]>, undefined>;
    readonly selectors: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").SelectorKind.Attribute, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").SelectorKind.Attribute, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
    }, undefined>, import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly callTarget: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").SelectorKind.Callee, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").SelectorKind.Callee, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for callee paths that should be linted.">]>, undefined>;
        readonly targetArgument: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional argument target for call arguments: index, first, last, or all.">]>;
        readonly targetCall: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly callTarget: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").SelectorKind.Callee, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").SelectorKind.Callee, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>, undefined>;
        readonly path: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for callee paths that should be linted.">]>;
        readonly targetArgument: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional argument target for call arguments: index, first, last, or all.">]>;
        readonly targetCall: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"all", undefined>, import("valibot").LiteralSchema<"first", undefined>, import("valibot").LiteralSchema<"last", undefined>, import("valibot").NumberSchema<undefined>], undefined>, undefined>, import("valibot").DescriptionAction<number | "all" | "first" | "last" | undefined, "Optional call target for curried callees: index, first, last, or all.">]>;
    }, undefined>], undefined>, import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").SelectorKind.Tag, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").SelectorKind.Tag, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
        readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for tag paths that should be linted.">]>, undefined>;
    }, undefined>, import("valibot").StrictObjectSchema<{
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").SelectorKind.Tag, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").SelectorKind.Tag, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>, undefined>;
        readonly path: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for tag paths that should be linted.">]>;
    }, undefined>], undefined>, import("valibot").StrictObjectSchema<{
        readonly kind: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").SelectorKind.Variable, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").SelectorKind.Variable, "Selector kind that determines where matching is applied.">]>;
        readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
        }, undefined>, import("valibot").StrictObjectSchema<{
            readonly match: import("valibot").SchemaWithPipe<readonly [import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").StrictObjectSchema<{
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.String, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.String, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object key and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectKey, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectKey, "Matcher type that will be applied.">]>;
            }, undefined>, import("valibot").StrictObjectSchema<{
                readonly path: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression that filters the object value and matches the content for further processing in a group.">]>, undefined>;
                readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.ObjectValue, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.ObjectValue, "Matcher type that will be applied.">]>;
            }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[], "List of nested matchers that target the return value of anonymous functions.">]>;
            readonly type: import("valibot").SchemaWithPipe<readonly [import("valibot").LiteralSchema<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, undefined>, import("valibot").DescriptionAction<import("../types/rule.js").MatcherType.AnonymousFunctionReturn, "Matcher type that will be applied.">]>;
        }, undefined>], undefined>, undefined>, undefined>, import("valibot").DescriptionAction<({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined, "Optional list of matchers that will be applied.">]>;
        readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").DescriptionAction<string, "Regular expression for names that should be linted.">]>;
    }, undefined>], undefined>, undefined>, import("valibot").DescriptionAction<({
        callTarget?: number | "all" | "first" | "last" | undefined;
        kind: import("../types/rule.js").SelectorKind.Callee;
        match?: ({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name: string;
        path?: string | undefined;
        targetArgument?: number | "all" | "first" | "last" | undefined;
        targetCall?: number | "all" | "first" | "last" | undefined;
    } | {
        callTarget?: number | "all" | "first" | "last" | undefined;
        kind: import("../types/rule.js").SelectorKind.Callee;
        match?: ({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name?: string | undefined;
        path: string;
        targetArgument?: number | "all" | "first" | "last" | undefined;
        targetCall?: number | "all" | "first" | "last" | undefined;
    } | {
        kind: import("../types/rule.js").SelectorKind.Tag;
        match?: ({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name: string;
        path?: string | undefined;
    } | {
        kind: import("../types/rule.js").SelectorKind.Tag;
        match?: ({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name?: string | undefined;
        path: string;
    } | {
        kind: import("../types/rule.js").SelectorKind.Attribute;
        match?: ({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name: string;
    } | {
        kind: import("../types/rule.js").SelectorKind.Variable;
        match?: ({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectKey;
        } | {
            path?: string | undefined;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        } | {
            match: ({
                type: import("../types/rule.js").MatcherType.String;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectKey;
            } | {
                path?: string | undefined;
                type: import("../types/rule.js").MatcherType.ObjectValue;
            })[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[] | undefined;
        name: string;
    })[], "Flat list of selectors that should get linted.">]>, ({
        kind: import("../types/rule.js").SelectorKind.Callee;
        match: {
            type: import("../types/rule.js").MatcherType.String;
        }[];
        name: string;
    } | {
        kind: import("../types/rule.js").SelectorKind.Callee;
        match: {
            type: import("../types/rule.js").MatcherType.ObjectKey;
        }[];
        name: string;
    } | {
        kind: import("../types/rule.js").SelectorKind.Callee;
        match: {
            path: string;
            type: import("../types/rule.js").MatcherType.ObjectValue;
        }[];
        name: string;
    } | {
        kind: import("../types/rule.js").SelectorKind.Tag;
        path: string;
    } | {
        kind: import("../types/rule.js").SelectorKind.Callee;
        match: ({
            type: import("../types/rule.js").MatcherType.String;
            match?: never;
        } | {
            match: {
                type: import("../types/rule.js").MatcherType.String;
            }[];
            type: import("../types/rule.js").MatcherType.AnonymousFunctionReturn;
        })[];
        path: string;
    } | {
        kind: import("../types/rule.js").SelectorKind.Attribute;
        name: string;
        match?: never;
    } | {
        kind: import("../types/rule.js").SelectorKind.Attribute;
        match: ({
            type: import("../types/rule.js").MatcherType.String;
        } | {
            type: import("../types/rule.js").MatcherType.ObjectKey;
        })[];
        name: string;
    } | {
        kind: import("../types/rule.js").SelectorKind.Variable;
        match: {
            type: import("../types/rule.js").MatcherType.String;
        }[];
        name: string;
    })[]>;
}, undefined>;
export type CommonOptions = InferOutput<typeof COMMON_OPTIONS>;
//# sourceMappingURL=descriptions.d.ts.map