import { CC } from "./callees/cc.js";
import { CLB } from "./callees/clb.js";
import { CLSX } from "./callees/clsx.js";
import { CN } from "./callees/cn.js";
import { CNB } from "./callees/cnb.js";
import { CTL } from "./callees/ctl.js";
import { CVA } from "./callees/cva.js";
import { CX } from "./callees/cx.js";
import { DCNB } from "./callees/dcnb.js";
import { OBJSTR } from "./callees/objstr.js";
import { TV } from "./callees/tv.js";
import { TW_JOIN } from "./callees/twJoin.js";
import { TW_MERGE } from "./callees/twMerge.js";
import { TWC } from "./tags/twc.js";
import { TWX } from "./tags/twx.js";
import { MatcherType, SelectorKind } from "../types/rule.js";
export const DEFAULT_CALLEE_SELECTORS = [
    ...CC,
    ...CLB,
    ...CLSX,
    ...CN,
    ...CNB,
    ...CTL,
    ...CVA,
    ...CX,
    ...DCNB,
    ...OBJSTR,
    ...TV,
    ...TW_JOIN,
    ...TW_MERGE
];
export const DEFAULT_ATTRIBUTE_SELECTORS = [
    {
        kind: SelectorKind.Attribute,
        name: "^class(?:Name)?$"
    },
    {
        kind: SelectorKind.Attribute,
        match: [
            {
                type: MatcherType.String
            }
        ],
        name: "^class(?:Name)?$"
    },
    {
        kind: SelectorKind.Attribute,
        match: [
            {
                type: MatcherType.String
            }
        ],
        name: "^class:.*$"
    },
    {
        kind: SelectorKind.Attribute,
        name: "(?:^\\[class\\]$)|(?:^\\[ngClass\\]$)"
    },
    {
        kind: SelectorKind.Attribute,
        match: [
            {
                type: MatcherType.String
            }
        ],
        name: "(?:^\\[class\\..*\\]$)"
    },
    {
        kind: SelectorKind.Attribute,
        match: [
            {
                type: MatcherType.String
            },
            {
                type: MatcherType.ObjectKey
            }
        ],
        name: "(?:^\\[class\\]$)|(?:^\\[ngClass\\]$)"
    },
    {
        kind: SelectorKind.Attribute,
        match: [
            {
                type: MatcherType.String
            },
            {
                type: MatcherType.ObjectKey
            }
        ],
        name: "^v-bind:class$"
    },
    {
        kind: SelectorKind.Attribute,
        match: [
            {
                type: MatcherType.String
            },
            {
                type: MatcherType.ObjectKey
            }
        ],
        name: "^class:list$"
    },
    {
        kind: SelectorKind.Attribute,
        match: [
            {
                type: MatcherType.ObjectKey
            }
        ],
        name: "^classList$"
    }
];
export const DEFAULT_VARIABLE_NAMES = [
    [
        "^classNames?$", [
            {
                match: MatcherType.String
            }
        ]
    ],
    [
        "^classes$", [
            {
                match: MatcherType.String
            }
        ]
    ],
    [
        "^styles?$", [
            {
                match: MatcherType.String
            }
        ]
    ]
];
export const DEFAULT_VARIABLE_SELECTORS = [
    {
        kind: SelectorKind.Variable,
        match: [
            {
                type: MatcherType.String
            }
        ],
        name: "^classNames?$"
    },
    {
        kind: SelectorKind.Variable,
        match: [
            {
                type: MatcherType.String
            }
        ],
        name: "^classes$"
    },
    {
        kind: SelectorKind.Variable,
        match: [
            {
                type: MatcherType.String
            }
        ],
        name: "^styles?$"
    }
];
export const DEFAULT_TAG_SELECTORS = [
    ...TWC,
    ...TWX
];
export const DEFAULT_SELECTORS = [
    ...DEFAULT_ATTRIBUTE_SELECTORS,
    ...DEFAULT_CALLEE_SELECTORS,
    ...DEFAULT_VARIABLE_SELECTORS,
    ...DEFAULT_TAG_SELECTORS
];
//# sourceMappingURL=default-options.js.map