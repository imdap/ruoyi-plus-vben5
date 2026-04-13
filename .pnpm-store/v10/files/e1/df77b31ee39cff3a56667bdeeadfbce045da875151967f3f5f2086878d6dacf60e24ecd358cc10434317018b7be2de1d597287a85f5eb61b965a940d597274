import { i as LinterCliOptions } from "./options-1v2EW2_1.js";
import { Command } from "commander";

//#region src/util/errors.d.ts
declare class CheckFailed extends Error {
  readonly exitCode: number;
  constructor(message: string, exitCode?: number);
}
declare class ApplicationError extends Error {
  readonly exitCode: number;
  readonly cause?: Error | undefined;
  constructor(message: string, exitCode?: number, cause?: Error | undefined);
}
//#endregion
//#region src/app.d.mts
declare function run(command?: Command, argv?: string[]): Promise<void>;
//#endregion
export { ApplicationError, CheckFailed, type LinterCliOptions as Options, run };
//# sourceMappingURL=app.d.ts.map