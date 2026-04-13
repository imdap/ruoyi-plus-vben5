import type { Literal } from "../types/ast.js";
import type { Warning } from "../types/async.js";
import type { Context } from "../types/rule.js";
export declare function lintClasses<const Ctx extends Context>(ctx: Ctx, literal: Literal, report: (className: string, index: number, after: string[]) => ((Parameters<Ctx["report"]>[0] extends infer DataAndId ? (DataAndId extends Record<"data" | "id", any> ? {
    data: DataAndId["data"];
    id: DataAndId["id"];
    fix?: string;
    message?: undefined;
    warnings?: (Warning | undefined)[];
} : never) : never) extends infer Result extends Record<string, any> ? {
    [Key in keyof Result as Result[Key] extends never ? never : Key]: Result[Key];
} : never) | false | undefined | {
    message: string;
    fix?: string;
    warnings?: (Warning | undefined)[];
}): void;
//# sourceMappingURL=lint.d.ts.map