import { MatcherType, SelectorKind } from "../../types/rule.js";
export const TWX_TAG = {
    kind: SelectorKind.Tag,
    path: "twx(\\.\\w+)?"
};
export const TWX_CALLEE_STRINGS = {
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
    path: "^twx\\.\\w+"
};
/** @see https://github.com/gregberge/twc */
export const TWX = [
    TWX_TAG,
    TWX_CALLEE_STRINGS
];
//# sourceMappingURL=twx.js.map