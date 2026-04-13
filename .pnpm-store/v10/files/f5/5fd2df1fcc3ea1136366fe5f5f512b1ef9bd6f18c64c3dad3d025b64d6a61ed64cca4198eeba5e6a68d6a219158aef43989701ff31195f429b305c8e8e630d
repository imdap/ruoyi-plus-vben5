import ts from 'typescript';
import { Alias } from 'vite';
import { IExtractorConfigPrepareOptions, IExtractorInvokeOptions, ExtractorResult } from '@microsoft/api-extractor';

interface ProgramProcessor {
    createParsedCommandLine: (_ts: typeof ts, host: ts.ParseConfigHost, configPath: string) => ts.ParsedCommandLine;
    createProgram: typeof ts.createProgram;
}

type MaybePromise<T> = T | Promise<T>;
declare function editSourceMapDir(content: string, fromDir: string, toDir: string): string | boolean;

interface ResolverTransformOutput {
    path: string;
    content: string;
}
interface Resolver {
    /**
     * The name of the resolver
     *
     * The later resolver with the same name will overwrite the earlier
     */
    name: string;
    /**
     * Determine whether the resolver supports the file
     */
    supports: (id: string) => void | boolean;
    /**
     * Transform source to declaration files
     *
     * Note that the path of the returns should base on `outDir`, or relative path to `root`
     */
    transform: (payload: {
        id: string;
        code: string;
        root: string;
        outDir: string;
        host: ts.CompilerHost;
        program: ts.Program;
    }) => MaybePromise<ResolverTransformOutput[] | {
        outputs: ResolverTransformOutput[];
        emitSkipped?: boolean;
        diagnostics?: readonly ts.Diagnostic[];
    }>;
}

interface Logger {
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
}
type BundleConfig = Omit<IExtractorConfigPrepareOptions['configObject'], 'extends' | 'projectFolder' | 'mainEntryPointFilePath' | 'bundledPackages'>;
type AliasOptions = {
    find: string | RegExp;
    replacement: string;
}[] | {
    [find: string]: string;
};
interface CreateRuntimeOptions {
    /**
     * Specify which (program) process you prefer.
     *
     * @default 'ts'
     */
    processor?: 'vue' | 'ts';
    /**
     * Specify root directory.
     *
     * Defaults to the 'root' of the Vite config, or `process.cwd()` if using Rollup.
     */
    root: string;
    /**
     * Output directory for declaration files.
     *
     * Can be an array to output to multiple directories.
     *
     * Defaults to 'build.outDir' of the Vite config, or `outDir` of tsconfig.json if using Rollup.
     */
    outDirs?: string | string[];
    /**
     * Override root path of entry files (useful in monorepos).
     *
     * The output path of each file will be calculated based on the value provided.
     *
     * The default is the smallest public path for all source files.
     */
    entryRoot?: string;
    /**
     * Specify tsconfig.json path.
     *
     * Plugin resolves `include` and `exclude` globs from tsconfig.json.
     *
     * If not specified, plugin will find config file from root.
     */
    tsconfigPath?: string;
    /**
     * Override compilerOptions.
     *
     * @default null
     */
    compilerOptions?: ts.CompilerOptions | null;
    /**
     * Parsing `paths` of tsconfig.json to aliases.
     *
     * Note that these aliases only use for declaration files.
     *
     * @default true
     * @remarks Only use first replacement of each path.
     */
    pathsToAliases?: boolean;
    /**
     * Override `include` glob (relative to root).
     *
     * Defaults to `include` property of tsconfig.json (relative to tsconfig.json located).
     */
    include?: string | string[];
    /**
     * Override `exclude` glob.
     *
     * Defaults to `exclude` property of tsconfig.json or `'node_modules/**'` if not supplied.
     */
    exclude?: string | string[];
    /**
     * Specify custom resolvers.
     *
     * @default []
     */
    resolvers?: Resolver[];
    aliases?: AliasOptions;
    /**
     * Set which paths should be excluded when transforming aliases.
     *
     * @default []
     */
    aliasesExclude?: (string | RegExp)[];
    entries?: Record<string, string>;
    libName?: string;
    indexName?: string;
    logger?: Logger;
}
interface EmitOptions {
    /**
     * Restrict declaration files output to `outDir`.
     *
     * If true, generated declaration files outside `outDir` will be ignored.
     *
     * @default true
     */
    strictOutput?: boolean;
    /**
     * Whether to copy .d.ts source files to `outDir`.
     *
     * @default false
     * @remarks Before 2.0, the default was `true`.
     */
    copyDtsFiles?: boolean;
    /**
     * Whether to transform file names ending in '.vue.d.ts' to '.d.ts'.
     *
     * If there is a duplicate name after transform, it will fall back to the original name.
     *
     * @default false
     */
    cleanVueFileName?: boolean;
    /**
     * Whether to transform dynamic imports to static (eg `import('vue').DefineComponent` to `import { DefineComponent } from 'vue'`).
     *
     * Value is forced to `true` when `rollupTypes` is `true`.
     *
     * @default false
     */
    staticImport?: boolean;
    /**
     * Whether to remove `import 'xxx'`.
     *
     * @default true
     */
    clearPureImport?: boolean;
    /**
     * Whether to generate types entry file(s).
     *
     * When `true`, uses package.json `types` property if it exists or `${outDir}/index.d.ts`.
     *
     * Value is forced to `true` when `rollupTypes` is `true`.
     *
     * @default false
     */
    insertTypesEntry?: boolean;
    /**
     * Rollup type declaration files after emitting them.
     *
     * Powered by `@microsoft/api-extractor` - time-intensive operation.
     *
     * @default false
     */
    bundleTypes?: boolean | {
        /**
         * Override the config of `@microsoft/api-extractor`.
         *
         * @default {}
         * @see https://api-extractor.com/pages/setup/configure_api_report/
         */
        extractorConfig?: BundleConfig;
        /**
         * Bundled packages for `@microsoft/api-extractor`.
         *
         * @default []
         * @see https://api-extractor.com/pages/configs/api-extractor_json/#bundledpackages
         */
        bundledPackages?: string[];
        /**
         * Override the invoke options of `@microsoft/api-extractor`.
         *
         * @default {}
         * @see https://api-extractor.com/pages/setup/invoking/#invoking-from-a-build-script
         */
        invokeOptions?: IExtractorInvokeOptions;
        /**
         * Specify a real api-extractor config file path.
         *
         * When invoking, the configuration will be merged in the order: internal config, file config, `extractorConfig`.
         *
         * @default './api-extractor.json'
         */
        configPath?: string;
    };
    /**
     * Hook called prior to writing each declaration file.
     *
     * This allows you to transform the path or content.
     *
     * The file will be skipped when the return value `false` or `Promise<false>`.
     *
     * @default () => {}
     */
    beforeWriteFile?: (filePath: string, content: string) => MaybePromise<void | false | {
        filePath?: string;
        content?: string;
    }>;
    /**
     * Hook called after rolling up declaration files.
     *
     * @default () => {}
     */
    afterRollup?: (result: ExtractorResult) => MaybePromise<void>;
    logPrefix?: string;
}

declare class Runtime {
    static toInstance({ processor, ...options }: CreateRuntimeOptions): Promise<Runtime>;
    protected root: string;
    protected publicRoot: string;
    protected entryRoot: string;
    protected configPath: string | undefined;
    protected compilerOptions: ts.CompilerOptions;
    protected rawCompilerOptions: ts.CompilerOptions;
    protected host: ts.CompilerHost;
    protected program: ts.Program;
    protected rootNames: string[];
    protected diagnostics: ts.Diagnostic[];
    protected outDirs: string[];
    protected entries: Record<string, string>;
    protected aliases: Alias[];
    protected aliasesExclude: (string | RegExp)[];
    protected libName: string;
    protected indexName: string;
    protected logger: Logger;
    protected resolvers: Resolver[];
    protected rootFiles: Set<string>;
    protected outputFiles: Map<string, string>;
    protected transformedFiles: Set<string>;
    readonly filter: (id: string) => boolean;
    readonly rebuildProgram: () => void;
    protected constructor(options: CreateRuntimeOptions, { createParsedCommandLine, createProgram }: ProgramProcessor);
    getHost(): ts.CompilerHost;
    getProgram(): ts.Program;
    matchResolver(id: string): Resolver | undefined;
    getRootFiles(): string[];
    addRootFile(fileName: string): void;
    clearTransformedFiles(): void;
    getDiagnostics(): ts.Diagnostic[];
    transform(id: string, code: string): Promise<void>;
    emitOutput(options?: EmitOptions): Promise<Map<string, string>>;
}

interface PluginOptions extends Omit<Partial<CreateRuntimeOptions>, 'entries' | 'libName' | 'indexName' | 'logger'>, Omit<EmitOptions, 'logPrefix'> {
    /**
     * Whether to emit declaration files only.
     *
     * When `true`, all the original outputs will be force removed, except esbuild.
     *
     * @default false
     */
    declarationOnly?: boolean;
    /**
     * Hook called after the runtime is created.
     *
     * @default () => {}
     */
    afterBootstrap?: (runtime: Runtime) => MaybePromise<void>;
    /**
     * Hook called after diagnostic is emitted.
     *
     * According to the `diagnostics.length`, you can judge whether there is any type error.
     *
     * @default () => {}
     */
    afterDiagnostic?: (diagnostics: readonly ts.Diagnostic[]) => MaybePromise<void>;
    /**
     * Hook called after all declaration files are written.
     *
     * It will be received a map (path -> content) that records those emitted files.
     *
     * @default () => {}
     */
    afterBuild?: (emittedFiles: Map<string, string>) => MaybePromise<void>;
}

export { editSourceMapDir as e };
export type { PluginOptions as P };
