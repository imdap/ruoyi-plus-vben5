import { MatcherType, SelectorKind } from "../../types/rule.js";
export const TWC_TAG = {
    kind: SelectorKind.Tag,
    path: "twc(\\.\\w+)?"
};
export const TWC_CALLEE_STRINGS = {
    kind: SelectorKind.Callee,
    match: [
        {
            type: MatcherType.String
        },
        {
            match: [{
                    type: MatcherType.String
                }],
            type: MatcherType.AnonymousFunctionReturn
        }
    ],
    path: "^twc\\.\\w+"
};
/** @see https://github.com/gregberge/twc */
export const TWC = [
    TWC_TAG,
    TWC_CALLEE_STRINGS
];
//# sourceMappingURL=twc.js.map