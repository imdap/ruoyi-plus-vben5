import type { Warning } from "../types/async.js";
import type { Context } from "../types/rule.js";
import type { AsyncContext } from "../utils/context.js";
export type ConflictingClasses = {
    [className: string]: {
        [conflictingClassName: string]: {
            cssPropertyName: string;
            important: boolean;
            cssPropertyValue?: string;
        }[];
    };
};
export type GetConflictingClasses = (ctx: AsyncContext, classes: string[]) => {
    conflictingClasses: ConflictingClasses;
    warnings: (Warning | undefined)[];
};
export declare let getConflictingClasses: GetConflictingClasses;
export declare function createGetConflictingClasses(ctx: Context): GetConflictingClasses;
//# sourceMappingURL=conflicting-classes.d.ts.map