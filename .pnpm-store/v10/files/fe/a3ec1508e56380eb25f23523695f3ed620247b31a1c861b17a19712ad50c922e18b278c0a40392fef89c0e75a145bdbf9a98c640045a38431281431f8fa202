import type { Linter } from "eslint";
type Severity = "error" | "warn";
type PluginRules = typeof rules[number];
type RuleObject = {
    [Rule in PluginRules as Rule extends any ? Rule["name"] : never]: Rule["rule"];
};
declare const rules: readonly [{
    category: "stylistic";
    messages: {
        readonly order: "Incorrect class order. Expected\n\n{{ notSorted }}\n\nto be\n\n{{ sorted }}";
    } | undefined;
    name: "enforce-consistent-class-order";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        componentClassOrder: "asc" | "desc" | "preserve";
        componentClassPosition: "start" | "end";
        order: "asc" | "desc" | "official" | "strict";
        unknownClassOrder: "asc" | "desc" | "preserve";
        unknownClassPosition: "start" | "end";
    };
    recommended: true;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                componentClassOrder: "asc" | "desc" | "preserve";
                componentClassPosition: "start" | "end";
                order: "asc" | "desc" | "official" | "strict";
                unknownClassOrder: "asc" | "desc" | "preserve";
                unknownClassPosition: "start" | "end";
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "order";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly order: "Incorrect class order. Expected\n\n{{ notSorted }}\n\nto be\n\n{{ sorted }}";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly position: "Incorrect important position. '{{ className }}' should be '{{ fix }}'.";
    } | undefined;
    name: "enforce-consistent-important-position";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        position?: "recommended" | "legacy" | undefined;
    };
    recommended: false;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                position?: "recommended" | "legacy" | undefined;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "position";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly position: "Incorrect important position. '{{ className }}' should be '{{ fix }}'.";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly missing: "Incorrect line wrapping. Expected\n\n{{ notReadable }}\n\nto be\n\n{{ readable }}";
        readonly unnecessary: "Unnecessary line wrapping. Expected\n\n{{ notReadable }}\n\nto be\n\n{{ readable }}";
    } | undefined;
    name: "enforce-consistent-line-wrapping";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        classesPerLine: number;
        group: "never" | "newLine" | "emptyLine";
        indent: number | "tab";
        lineBreakStyle: "unix" | "windows";
        preferSingleLine: boolean;
        printWidth: number;
        strictness: "strict" | "loose";
    };
    recommended: true;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                classesPerLine: number;
                group: "never" | "newLine" | "emptyLine";
                indent: number | "tab";
                lineBreakStyle: "unix" | "windows";
                preferSingleLine: boolean;
                printWidth: number;
                strictness: "strict" | "loose";
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "missing" | "unnecessary";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly missing: "Incorrect line wrapping. Expected\n\n{{ notReadable }}\n\nto be\n\n{{ readable }}";
                readonly unnecessary: "Unnecessary line wrapping. Expected\n\n{{ notReadable }}\n\nto be\n\n{{ readable }}";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly order: "Incorrect variant order. '{{ className }}' should be '{{ fix }}'.";
    } | undefined;
    name: "enforce-consistent-variant-order";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        [x: string]: unknown;
    };
    recommended: false;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                [x: string]: unknown;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "order";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly order: "Incorrect variant order. '{{ className }}' should be '{{ fix }}'.";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly incorrect: "Incorrect variable syntax: {{ className }}.";
    } | undefined;
    name: "enforce-consistent-variable-syntax";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        syntax: "variable" | "shorthand";
    };
    recommended: false;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                syntax: "variable" | "shorthand";
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "incorrect";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly incorrect: "Incorrect variable syntax: {{ className }}.";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly replaceable: "Physical class detected. Replace \"{{ className }}\" with logical class \"{{fix}}\".";
    } | undefined;
    name: "enforce-logical-properties";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        [x: string]: unknown;
    };
    recommended: false;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                [x: string]: unknown;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "replaceable";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly replaceable: "Physical class detected. Replace \"{{ className }}\" with logical class \"{{fix}}\".";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly longhand: "Non shorthand class detected. Expected {{ longhands }} to be {{ shorthands }}";
        readonly unnecessary: "Unnecessary whitespace";
    } | undefined;
    name: "enforce-shorthand-classes";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        [x: string]: unknown;
    };
    recommended: false;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                [x: string]: unknown;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "unnecessary" | "longhand";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly longhand: "Non shorthand class detected. Expected {{ longhands }} to be {{ shorthands }}";
                readonly unnecessary: "Unnecessary whitespace";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "correctness";
    messages: {
        readonly conflicting: "Conflicting class detected: \"{{ className }}\" and \"{{ conflictingClassString }}\" apply the same CSS properties: \"{{ conflictingPropertiesString }}\".";
    } | undefined;
    name: "no-conflicting-classes";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        [x: string]: unknown;
    };
    recommended: true;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                [x: string]: unknown;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "conflicting";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly conflicting: "Conflicting class detected: \"{{ className }}\" and \"{{ conflictingClassString }}\" apply the same CSS properties: \"{{ conflictingPropertiesString }}\".";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly irreplaceable: "Class \"{{ className }}\" is deprecated. Check the tailwindcss documentation for more information: https://tailwindcss.com/docs/upgrade-guide#removed-deprecated-utilities";
        readonly replaceable: "Deprecated class detected. Replace \"{{ className }}\" with \"{{fix}}\".";
    } | undefined;
    name: "no-deprecated-classes";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        [x: string]: unknown;
    };
    recommended: true;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                [x: string]: unknown;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "replaceable" | "irreplaceable";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly irreplaceable: "Class \"{{ className }}\" is deprecated. Check the tailwindcss documentation for more information: https://tailwindcss.com/docs/upgrade-guide#removed-deprecated-utilities";
                readonly replaceable: "Deprecated class detected. Replace \"{{ className }}\" with \"{{fix}}\".";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly duplicate: "Duplicate classname: \"{{ className }}\".";
    } | undefined;
    name: "no-duplicate-classes";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        [x: string]: unknown;
    };
    recommended: true;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                [x: string]: unknown;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "duplicate";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly duplicate: "Duplicate classname: \"{{ className }}\".";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "correctness";
    messages: Record<string, string> | undefined;
    name: "no-restricted-classes";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        restrict: (string | {
            fix?: string | undefined;
            message?: string | undefined;
            pattern: string;
        })[];
    };
    recommended: false;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                restrict: (string | {
                    fix?: string | undefined;
                    message?: string | undefined;
                    pattern: string;
                })[];
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: string;
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: Record<string, string>;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly unnecessary: "Unnecessary whitespace.";
    } | undefined;
    name: "no-unnecessary-whitespace";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        allowMultiline: boolean;
    };
    recommended: true;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                allowMultiline: boolean;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "unnecessary";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly unnecessary: "Unnecessary whitespace.";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "correctness";
    messages: {
        readonly unknown: "Unknown class detected: {{ className }}";
    } | undefined;
    name: "no-unknown-classes";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        ignore: string[];
    };
    recommended: true;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                ignore: string[];
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "unknown";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly unknown: "Unknown class detected: {{ className }}";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}, {
    category: "stylistic";
    messages: {
        readonly multiple: "The classes: \"{{ classNames }}\" can be simplified to \"{{canonicalClass}}\".";
        readonly single: "The class: \"{{ className }}\" can be simplified to \"{{canonicalClass}}\".";
    } | undefined;
    name: "enforce-canonical-classes";
    readonly options: {
        cwd?: string | undefined;
        rootFontSize?: number | undefined;
        detectComponentClasses: boolean;
        tsconfig?: string | undefined;
        tailwindConfig?: string | undefined;
        messageStyle: "visual" | "compact" | "raw";
        entryPoint?: string | undefined;
        tags?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        variables?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        attributes?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        callees?: (string | [string, ({
            match: import("../types/rule.js").MatcherType.String;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectKey;
            pathPattern?: string | undefined;
        } | {
            match: import("../types/rule.js").MatcherType.ObjectValue;
            pathPattern?: string | undefined;
        })[]])[] | undefined;
        selectors: ({
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
        })[];
    } & {
        collapse: boolean;
        logical: boolean;
    };
    recommended: true;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<{
                cwd?: string | undefined;
                rootFontSize?: number | undefined;
                detectComponentClasses: boolean;
                tsconfig?: string | undefined;
                tailwindConfig?: string | undefined;
                messageStyle: "visual" | "compact" | "raw";
                entryPoint?: string | undefined;
                tags?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                variables?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                attributes?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                callees?: (string | [string, ({
                    match: import("../types/rule.js").MatcherType.String;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectKey;
                    pathPattern?: string | undefined;
                } | {
                    match: import("../types/rule.js").MatcherType.ObjectValue;
                    pathPattern?: string | undefined;
                })[]])[] | undefined;
                selectors: ({
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
                })[];
            } & {
                collapse: boolean;
                logical: boolean;
            }>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: "multiple" | "single";
        }>) => import("eslint").Rule.RuleListener;
        meta: {
            messages?: {
                readonly multiple: "The classes: \"{{ classNames }}\" can be simplified to \"{{canonicalClass}}\".";
                readonly single: "The class: \"{{ className }}\" can be simplified to \"{{canonicalClass}}\".";
            };
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
}];
declare const config: {
    configs: {
        "legacy-recommended": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace" | "better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", Severity>;
        };
        "legacy-recommended-error": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace" | "better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", "error">;
        };
        "legacy-recommended-warn": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace" | "better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", "warn">;
        };
        recommended: {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace" | "better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", Severity>;
        };
        "recommended-error": {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace" | "better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", "error">;
        };
        "recommended-warn": {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace" | "better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", "warn">;
        };
        "legacy-correctness": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", Severity>;
        };
        "legacy-correctness-error": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", "error">;
        };
        "legacy-correctness-warn": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", "warn">;
        };
        correctness: {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", Severity>;
        };
        "correctness-error": {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", "error">;
        };
        "correctness-warn": {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/no-conflicting-classes" | "better-tailwindcss/no-unknown-classes", "warn">;
        };
        "legacy-stylistic": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace", Severity>;
        };
        "legacy-stylistic-error": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace", "error">;
        };
        "legacy-stylistic-warn": {
            plugins: "better-tailwindcss"[];
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace", "warn">;
        };
        stylistic: {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace", Severity>;
        };
        "stylistic-error": {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace", "error">;
        };
        "stylistic-warn": {
            plugins: {
                "better-tailwindcss": {
                    readonly meta: {
                        readonly name: "better-tailwindcss";
                    };
                    readonly rules: RuleObject;
                };
            };
            rules: Record<"better-tailwindcss/enforce-canonical-classes" | "better-tailwindcss/enforce-consistent-class-order" | "better-tailwindcss/enforce-consistent-line-wrapping" | "better-tailwindcss/no-deprecated-classes" | "better-tailwindcss/no-duplicate-classes" | "better-tailwindcss/no-unnecessary-whitespace", "warn">;
        };
    };
    meta: {
        readonly name: "better-tailwindcss";
    };
    rules: RuleObject;
};
export default config;
export { config as "module.exports" };
//# sourceMappingURL=config.d.ts.map