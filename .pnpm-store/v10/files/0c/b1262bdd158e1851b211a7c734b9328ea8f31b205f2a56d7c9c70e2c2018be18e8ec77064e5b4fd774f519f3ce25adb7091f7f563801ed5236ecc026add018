import type { Warning } from "../types/async.js";
import type { Context } from "../types/rule.js";
import type { AsyncContext } from "../utils/context.js";
export type ClassOrder = [className: string, order: bigint | null][];
export type GetClassOrder = (ctx: AsyncContext, classes: string[]) => {
    classOrder: ClassOrder;
    warnings: (Warning | undefined)[];
};
export declare let getClassOrder: GetClassOrder;
export declare function createGetClassOrder(ctx: Context): GetClassOrder;
//# sourceMappingURL=class-order.d.ts.map