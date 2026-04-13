import type { Warning } from "../types/async.js";
import type { Context } from "../types/rule.js";
import type { AsyncContext } from "../utils/context.js";
export type CanonicalClasses = {
    [originalClass: string]: {
        input: string[];
        output: string;
    };
};
export type CanonicalClassOptions = {
    collapse: boolean | undefined;
    logicalToPhysical: boolean | undefined;
    rem: number | undefined;
};
export type GetCanonicalClasses = (ctx: AsyncContext, classes: string[], options: CanonicalClassOptions) => {
    canonicalClasses: CanonicalClasses;
    warnings: (Warning | undefined)[];
};
export declare let getCanonicalClasses: GetCanonicalClasses;
export declare function createGetCanonicalClasses(ctx: Context): GetCanonicalClasses;
//# sourceMappingURL=canonical-classes.d.ts.map