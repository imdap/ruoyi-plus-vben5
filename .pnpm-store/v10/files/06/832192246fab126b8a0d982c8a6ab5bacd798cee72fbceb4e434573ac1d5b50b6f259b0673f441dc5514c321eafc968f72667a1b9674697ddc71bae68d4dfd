import { MatcherType, SelectorKind } from "../../types/rule.js";
export const CVA_STRINGS = {
    kind: SelectorKind.Callee,
    match: [
        {
            type: MatcherType.String
        }
    ],
    name: "^cva$"
};
export const CVA_VARIANT_VALUES = {
    kind: SelectorKind.Callee,
    match: [
        {
            path: "^variants.*$",
            type: MatcherType.ObjectValue
        }
    ],
    name: "^cva$"
};
export const CVA_COMPOUND_VARIANTS_CLASS = {
    kind: SelectorKind.Callee,
    match: [
        {
            path: "^compoundVariants\\[\\d+\\]\\.(?:className|class)$",
            type: MatcherType.ObjectValue
        }
    ],
    name: "^cva$"
};
/** @see https://github.com/joe-bell/cva */
export const CVA = [
    CVA_STRINGS,
    CVA_VARIANT_VALUES,
    CVA_COMPOUND_VARIANTS_CLASS
];
//# sourceMappingURL=cva.js.map