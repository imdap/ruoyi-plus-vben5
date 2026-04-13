import { JspmError } from '../common/err.js';
export type Analysis = AnalysisData | {
    parseError: JspmError | Error;
};
export interface AnalysisData {
    deps: string[];
    dynamicDeps: string[];
    cjsLazyDeps: string[] | null;
    format: 'esm' | 'commonjs' | 'system' | 'json' | 'typescript' | 'wasm' | 'css';
    size: number;
    usesCjs?: boolean;
    integrity: `sha384-${string}`;
}
export { createTsAnalysis } from './ts.js';
export { createCjsAnalysis } from './cjs.js';
export declare function createEsmAnalysis(imports: any[], source: string, url: string): Promise<Analysis>;
export declare function createSystemAnalysis(source: string, imports: string[], url: string): Promise<Analysis>;
