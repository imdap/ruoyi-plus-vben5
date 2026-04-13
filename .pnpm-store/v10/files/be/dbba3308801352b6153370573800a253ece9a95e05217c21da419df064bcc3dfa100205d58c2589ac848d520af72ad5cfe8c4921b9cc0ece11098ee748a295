import { i as LinterCliOptions, o as TraceOptions, s as FinalizedReporter, t as BaseOptions } from "./options-1v2EW2_1.js";
import { a as checkText, c as parseApplicationFeatureFlags, d as listDictionaries, i as TraceResult, l as suggestions, n as CheckTextResult, o as createInit, r as IncludeExcludeFlag, s as lint, t as AppError, u as trace } from "./application-DYrUtKeK.js";
import { CSpellReporter, ReporterConfiguration } from "@cspell/cspell-types";
import { WriteStream } from "node:tty";
export * from "@cspell/cspell-types";

//#region src/console.d.ts
type Log = (format?: any, ...params: any[]) => void;
type IOStream = NodeJS.WritableStream & Pick<WriteStream, "isTTY" | "rows" | "columns"> & Pick<Partial<WriteStream>, "hasColors" | "clearLine" | "getColorDepth">;
interface IConsole {
  readonly log: Log;
  readonly error: Log;
  readonly info: Log;
  readonly warn: Log;
  readonly stderrChannel: Channel;
  readonly stdoutChannel: Channel;
}
interface Channel {
  stream: IOStream;
  write: (msg: string) => void;
  writeLine: (msg: string) => void;
  clearLine: (dir: -1 | 0 | 1, callback?: () => void) => boolean;
  printLine: (format?: any, ...params: any[]) => void;
  getColorLevel: () => 0 | 1 | 2 | 3;
}
//#endregion
//#region src/models.d.ts
type ReporterConsole = IConsole;
interface CSpellReporterConfiguration extends Readonly<ReporterConfiguration>, Readonly<LinterCliOptions> {
  /**
  * The console to use for reporting.
  * @since 8.11.1
  */
  readonly console?: ReporterConsole;
}
interface CSpellReporterModule {
  getReporter: <T>(settings: T, config: CSpellReporterConfiguration) => CSpellReporter;
}
//#endregion
//#region src/cli-reporter.d.ts
interface ReporterOptions extends Pick<LinterCliOptions, "color" | "debug" | "issues" | "issuesSummaryReport" | "legacy" | "progress" | "relative" | "root" | "showContext" | "showPerfSummary" | "showSuggestions" | "silent" | "summary" | "verbose" | "verboseLevel" | "wordsOnly"> {
  fileGlobs: string[];
}
declare function getReporter(options: ReporterOptions, config?: CSpellReporterConfiguration): FinalizedReporter;
//#endregion
export { AppError, type BaseOptions, type LinterCliOptions as CSpellApplicationOptions, type CSpellReporterConfiguration, type CSpellReporterModule, CheckTextResult, IncludeExcludeFlag, type TraceOptions, TraceResult, checkText, createInit, getReporter as getDefaultReporter, lint, listDictionaries, parseApplicationFeatureFlags, suggestions, trace };
//# sourceMappingURL=index.d.ts.map