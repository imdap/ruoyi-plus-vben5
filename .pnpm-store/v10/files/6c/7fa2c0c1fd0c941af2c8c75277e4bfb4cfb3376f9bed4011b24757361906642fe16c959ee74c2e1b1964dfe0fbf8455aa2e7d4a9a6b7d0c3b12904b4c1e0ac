import { Node } from 'estree';
import { RawSourceMap } from 'source-map-js';
import { CompileError } from '@intlify/message-compiler';
import { JSONProgram } from 'jsonc-eslint-parser/lib/parser/ast';
import { YAMLProgram } from 'yaml-eslint-parser/lib/ast';

type InstalledPackage = 'vue-i18n' | 'petite-vue-i18n';
declare function checkInstallPackage(pkg: string, debug: Function): InstalledPackage;
type VueI18nVersion = '9' | '10' | 'unknown' | '';
declare function getVueI18nVersion(debug: Function, pkg?: string): VueI18nVersion;

/**
 * Compilation dev environments
 *
 * @public
 */
type DevEnv = 'development' | 'production';
/**
 * @internal
 */
interface CodeGenOptions {
    type?: 'plain' | 'sfc' | 'bare';
    exportESM?: boolean;
    onlyLocales?: string[];
    source?: string;
    sourceMap?: boolean;
    filename?: string;
    inSourceMap?: RawSourceMap;
    isGlobal?: boolean;
    locale?: string;
    env?: DevEnv;
    forceStringify?: boolean;
    allowDynamic?: boolean;
    strictMessage?: boolean;
    escapeHtml?: boolean;
    jit?: boolean;
    minify?: boolean;
    transformI18nBlock?: (source: string | Buffer) => string;
    onWarn?: (msg: string) => void;
    onError?: (msg: string, extra?: {
        source: string;
        path: string;
        code?: CompileError['code'];
        domain?: CompileError['domain'];
        location?: CompileError['location'];
    }) => void;
}
interface CodeGenResult<ASTNode, CodeGenError extends Error = Error> {
    code: string;
    ast: ASTNode;
    errors?: CodeGenError[];
    map?: RawSourceMap;
}

/**
 * Code generator for i18n js resource
 */

/**
 * @internal
 */
declare function generate$3(targetSource: string | Buffer, options: CodeGenOptions): CodeGenResult<Node>;

/**
 * Code / AST generator for i18n json/json5 resource
 */

declare function generate$2(targetSource: string | Buffer, { type, onlyLocales, filename, inSourceMap, locale, isGlobal, sourceMap, env, forceStringify, onError, strictMessage, escapeHtml, jit }: CodeGenOptions): CodeGenResult<JSONProgram>;

/**
 * Code generator for i18n ts resource
 *
 * An async wrapper for the js generator which transforms ts to js before generating
 */

/**
 * @internal
 */
declare function generate$1(targetSource: string | Buffer, options: CodeGenOptions): Promise<CodeGenResult<Node>>;

/**
 * Code generator for i18n yaml resource
 */

/**
 * @internal
 */
declare function generate(targetSource: string | Buffer, { type, onlyLocales, filename, inSourceMap, locale, isGlobal, sourceMap, env, forceStringify, onError, strictMessage, escapeHtml, jit }: CodeGenOptions): CodeGenResult<YAMLProgram>;

export { checkInstallPackage, generate$2 as generateJSON, generate$3 as generateJavaScript, generate$1 as generateTypescript, generate as generateYAML, getVueI18nVersion };
export type { CodeGenOptions, CodeGenResult, DevEnv, InstalledPackage };
