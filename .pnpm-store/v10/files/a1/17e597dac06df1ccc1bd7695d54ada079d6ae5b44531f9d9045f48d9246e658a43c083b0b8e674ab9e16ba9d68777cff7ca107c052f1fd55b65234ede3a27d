import type IBrowserFrame from '../types/IBrowserFrame.js';
import { Script } from 'vm';
/**
 * Browser frame script evaluator.
 */
export default class BrowserFrameScriptEvaluator {
    /**
     * Evaluates code or a VM Script in the frame's context.
     *
     * @param frame Frame.
     * @param script Script.
     * @returns Result.
     */
    static evaluate(frame: IBrowserFrame, script: string | Script): any;
    /**
     * Evaluates a module in the frame's context.
     *
     * @param frame Frame.
     * @param options Options.
     * @param options.url URL.
     * @param options.type Module type.
     * @param options.code Code.
     * @returns Exports.
     */
    static evaluateModule(frame: IBrowserFrame, options: {
        url?: string;
        type?: 'esm' | 'css' | 'json';
        code?: string;
    }): Promise<Record<string, any>>;
}
//# sourceMappingURL=BrowserFrameScriptEvaluator.d.ts.map