import type BrowserWindow from '../window/BrowserWindow.js';
import type IECMAScriptModuleCompiledResult from './types/IECMAScriptModuleCompiledResult.js';
/**
 * ECMAScript module compiler.
 */
export default class ECMAScriptModuleCompiler {
    readonly window: BrowserWindow;
    private debug;
    private count;
    private debugCount;
    private templateString;
    /**
     * Constructor.
     *
     * @param window Window.
     * @param url Module URL.
     */
    constructor(window: BrowserWindow);
    /**
     * Compiles code and returns imports and compiled code.
     *
     * @param moduleURL Module URL.
     * @param code Code.
     * @param sourceURL Source URL.
     * @returns Result.
     */
    compile(moduleURL: string, code: string, sourceURL?: string | null): IECMAScriptModuleCompiledResult;
    /**
     * Parses syntax.
     *
     * @param code Code.
     * @param index Index.
     */
    private parseSyntax;
    /**
     * Returns error.
     *
     * @param moduleURL Module URL.
     * @param code Code.
     * @param sourceURL Source URL.
     * @returns Error.
     */
    private getError;
    /**
     * Returns line and column for an error.
     *
     * @param code Code.
     * @param index Index.
     * @returns Line and column.
     */
    private getLineAndColumn;
    /**
     * Get the non-space preceding token.
     *
     * @param code Code.
     * @param index Index.
     * @returns Non-space preceding token.
     */
    private getNonSpacePrecedingToken;
    /**
     * Remove multiline comments.
     *
     * @param code Code.
     * @returns Code without multiline comments.
     */
    private removeMultilineComments;
    /**
     * Resets the compiler state.
     */
    private reset;
}
//# sourceMappingURL=ECMAScriptModuleCompiler.d.ts.map