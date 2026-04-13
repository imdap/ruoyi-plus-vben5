import type { Warning } from "../types/async.js";
import type { Context } from "../types/rule.js";
import type { AsyncContext } from "../utils/context.js";
export interface DissectedClass {
    base: string;
    className: string;
    important: [start: boolean, end: boolean];
    negative: boolean;
    prefix: string;
    separator: string;
    /** Will be undefined in tailwindcss 4 for non-tailwind classes. */
    variants: string[] | undefined;
}
export interface DissectedClasses {
    [className: string]: DissectedClass;
}
export type GetDissectedClasses = (ctx: AsyncContext, classes: string[]) => {
    dissectedClasses: DissectedClasses;
    warnings: (Warning | undefined)[];
};
export declare let getDissectedClasses: GetDissectedClasses;
export declare function createGetDissectedClasses(ctx: Context): GetDissectedClasses;
//# sourceMappingURL=dissect-classes.d.ts.map