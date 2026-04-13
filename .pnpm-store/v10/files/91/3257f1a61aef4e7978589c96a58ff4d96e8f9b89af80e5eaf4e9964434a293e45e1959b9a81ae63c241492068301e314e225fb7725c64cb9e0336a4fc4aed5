import type { Warning } from "../types/async.js";
import type { Context, Version } from "../types/rule.js";
export interface AsyncContext {
    cwd: string;
    installation: string;
    tailwindConfigPath: string;
    tsconfigPath: string | undefined;
    version: Version;
    warnings: (Warning | undefined)[];
}
export declare function async(ctx: Context): AsyncContext;
export declare function getTailwindConfigPath({ configPath, cwd, version }: {
    configPath: string | undefined;
    cwd: string;
    version: Version;
}): {
    path: string;
    warnings: (Warning<Record<string, any>> | undefined)[];
};
//# sourceMappingURL=context.d.ts.map