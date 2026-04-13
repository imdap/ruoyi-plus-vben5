import * as vite from 'vite';
import { InlineConfig, UserConfig as UserConfig$1, Plugin, ResolvedConfig as ResolvedConfig$1, ViteDevServer, LogLevel, LoggerOptions, Logger as Logger$1 } from 'vite';
export { vite as Vite };
export { esbuildVersion, isCSSRequest, isFileLoadingAllowed, parseAst, parseAstAsync, rollupVersion, version as viteVersion } from 'vite';
import { IncomingMessage } from 'node:http';
import { R as ResolvedConfig, e as UserConfig, f as VitestRunMode, g as VitestOptions, V as Vitest, A as ApiConfig, L as Logger, h as TestSpecification, T as TestProject, P as PoolWorker, i as PoolOptions, j as WorkerRequest, k as TestSequencer } from './chunks/reporters.d.BwkR0iL5.js';
export { l as AgentReporter, B as BaseCoverageOptions, m as BaseReporter, n as BenchmarkBuiltinReporters, o as BenchmarkReporter, p as BenchmarkReportsMap, q as BenchmarkUserOptions, r as BrowserBuiltinProvider, s as BrowserCommand, t as BrowserCommandContext, u as BrowserConfigOptions, v as BrowserInstanceOption, w as BrowserModuleMocker, x as BrowserOrchestrator, y as BrowserProvider, z as BrowserProviderOption, D as BrowserScript, E as BrowserServerFactory, G as BrowserServerOptions, H as BrowserServerState, J as BrowserServerStateSession, K as BuiltinEnvironment, M as BuiltinReporterOptions, N as BuiltinReporters, O as CSSModuleScopeStrategy, Q as CoverageIstanbulOptions, C as CoverageOptions, S as CoverageProvider, X as CoverageProviderModule, Y as CoverageReporter, Z as CoverageV8Options, _ as CustomProviderOptions, $ as DefaultReporter, a0 as DepsOptimizationOptions, a1 as DotReporter, a2 as EnvironmentOptions, a3 as GithubActionsReporter, a4 as HTMLOptions, a5 as HangingProcessReporter, I as InlineConfig, a6 as JUnitOptions, a7 as JUnitReporter, a8 as JsonAssertionResult, a9 as JsonOptions, aa as JsonReporter, ab as JsonTestResult, ac as JsonTestResults, ad as ModuleDiagnostic, ae as OnServerRestartHandler, af as OnTestsRerunHandler, ag as ParentProjectBrowser, ah as Pool, ai as PoolRunnerInitializer, aj as PoolTask, ak as ProjectBrowser, al as ProjectConfig, am as ReportContext, an as ReportedHookContext, ao as Reporter, ap as ReportersMap, aq as ResolveSnapshotPathHandler, ar as ResolveSnapshotPathHandlerContext, as as ResolvedBrowserOptions, at as ResolvedCoverageOptions, au as ResolvedProjectConfig, av as SerializedTestProject, aw as TapFlatReporter, ax as TapReporter, ay as TaskOptions, az as TestCase, aA as TestCollection, aB as TestDiagnostic, aC as TestModule, aD as TestModuleState, aE as TestResult, aF as TestResultFailed, aG as TestResultPassed, aH as TestResultSkipped, aI as TestRunEndReason, aJ as TestRunResult, aK as TestSequencerConstructor, aL as TestSpecificationOptions, aM as TestState, aN as TestSuite, aO as TestSuiteState, aP as ToMatchScreenshotComparators, aQ as ToMatchScreenshotOptions, aR as TypecheckConfig, U as UserWorkspaceConfig, aS as VerboseBenchmarkReporter, aT as VerboseReporter, aU as VitestEnvironment, aV as VitestPackageInstaller, W as WatcherTriggerPattern, aW as WorkerResponse, aX as _BrowserNames, aY as experimental_getRunnerTask } from './chunks/reporters.d.BwkR0iL5.js';
export { C as CacheKeyIdGenerator, a as CacheKeyIdGeneratorContext, V as VitestPluginContext } from './chunks/plugin.d.CEihBODF.js';
export { BaseCoverageProvider } from './coverage.js';
import { Awaitable } from '@vitest/utils';
export { SerializedError } from '@vitest/utils';
import { R as RuntimeRPC } from './chunks/rpc.d.BFMWpdph.js';
import { Writable } from 'node:stream';
import { C as ContextRPC } from './chunks/worker.d.CckNUvI5.js';
export { T as TestExecutionType } from './chunks/worker.d.CckNUvI5.js';
import { Debugger } from 'obug';
import './chunks/global.d.D74z04P1.js';
export { Task as RunnerTask, TaskResult as RunnerTaskResult, TaskResultPack as RunnerTaskResultPack, Test as RunnerTestCase, File as RunnerTestFile, Suite as RunnerTestSuite, SequenceHooks, SequenceSetupFiles } from '@vitest/runner';
export { b as RuntimeConfig } from './chunks/config.d.ChUh6-ad.js';
export { generateFileHash } from '@vitest/runner/utils';
export { CDPSession } from 'vitest/browser';
import './chunks/browser.d.C0zGu1u9.js';
import './chunks/traces.d.402V_yFI.js';
import '@vitest/pretty-format';
import '@vitest/snapshot';
import '@vitest/utils/diff';
import '@vitest/expect';
import 'vitest/optional-types.js';
import './chunks/benchmark.d.DAaHLpsq.js';
import 'tinybench';
import '@vitest/mocker';
import '@vitest/utils/source-map';
import './chunks/coverage.d.BZtK59WP.js';
import '@vitest/snapshot/manager';
import 'node:console';
import 'node:fs';
import 'vite/module-runner';
import './chunks/environment.d.CrsxCzP1.js';

type RawErrsMap = Map<string, TscErrorInfo[]>;
interface TscErrorInfo {
	filePath: string;
	errCode: number;
	errMsg: string;
	line: number;
	column: number;
}
interface CollectLineNumbers {
	target: number;
	next: number;
	prev?: number;
}
type CollectLines = { [key in keyof CollectLineNumbers] : string };
interface RootAndTarget {
	root: string;
	targetAbsPath: string;
}
type Context = RootAndTarget & {
	rawErrsMap: RawErrsMap;
	openedDirs: Set<string>;
	lastActivePath?: string;
};

declare function isValidApiRequest(config: ResolvedConfig, req: IncomingMessage): boolean;

declare function escapeTestName(label: string, dynamic: boolean): string;

interface CliOptions extends UserConfig {
	/**
	* Override the watch mode
	*/
	run?: boolean;
	/**
	* Removes colors from the console output
	*/
	color?: boolean;
	/**
	* Output collected tests as JSON or to a file
	*/
	json?: string | boolean;
	/**
	* Output collected test files only
	*/
	filesOnly?: boolean;
	/**
	* Parse files statically instead of running them to collect tests
	* @experimental
	*/
	staticParse?: boolean;
	/**
	* How many tests to process at the same time
	* @experimental
	*/
	staticParseConcurrency?: number;
	/**
	* Override vite config's configLoader from CLI.
	* Use `bundle` to bundle the config with esbuild or `runner` (experimental) to process it on the fly (default: `bundle`).
	* This is only available with **vite version 6.1.0** and above.
	* @experimental
	*/
	configLoader?: InlineConfig extends {
		configLoader?: infer T;
	} ? T : never;
}
/**
* Start Vitest programmatically
*
* Returns a Vitest instance if initialized successfully.
*/
declare function startVitest(mode: VitestRunMode, cliFilters?: string[], options?: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;

interface CliParseOptions {
	allowUnknownOptions?: boolean;
}
declare function parseCLI(argv: string | string[], config?: CliParseOptions): {
	filter: string[];
	options: CliOptions;
};

/**
* @deprecated Internal function
*/
declare function resolveApiServerConfig<Options extends ApiConfig & Omit<UserConfig, "expect">>(options: Options, defaultPort: number, parentApi?: ApiConfig, logger?: Logger): ApiConfig | undefined;

declare function createVitest(mode: VitestRunMode, options: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;

declare class FilesNotFoundError extends Error {
	code: string;
	constructor(mode: "test" | "benchmark");
}
declare class GitNotFoundError extends Error {
	code: string;
	constructor();
}

declare function VitestPlugin(options?: UserConfig, vitest?: Vitest): Promise<Plugin[]>;

declare function resolveConfig(options?: UserConfig, viteOverrides?: UserConfig$1): Promise<{
	vitestConfig: ResolvedConfig;
	viteConfig: ResolvedConfig$1;
}>;

declare function resolveFsAllow(projectRoot: string, rootConfigFile: string | false | undefined): string[];

type RunWithFiles = (files: TestSpecification[], invalidates?: string[]) => Promise<void>;
interface ProcessPool {
	name: string;
	runTests: RunWithFiles;
	collectTests: RunWithFiles;
	close?: () => Awaitable<void>;
}
declare function getFilePoolName(project: TestProject): ResolvedConfig["pool"];

interface MethodsOptions {
	cacheFs?: boolean;
	collect?: boolean;
}
declare function createMethodsRPC(project: TestProject, methodsOptions?: MethodsOptions): RuntimeRPC;

/** @experimental */
declare class ForksPoolWorker implements PoolWorker {
	readonly name: string;
	readonly cacheFs: boolean;
	protected readonly entrypoint: string;
	protected execArgv: string[];
	protected env: Partial<NodeJS.ProcessEnv>;
	private _fork?;
	private stdout;
	private stderr;
	constructor(options: PoolOptions);
	on(event: string, callback: (arg: any) => void): void;
	off(event: string, callback: (arg: any) => void): void;
	send(message: WorkerRequest): void;
	start(): Promise<void>;
	stop(): Promise<void>;
	deserialize(data: unknown): unknown;
	private get fork();
}

/** @experimental */
declare class ThreadsPoolWorker implements PoolWorker {
	readonly name: string;
	protected readonly entrypoint: string;
	protected execArgv: string[];
	protected env: Partial<NodeJS.ProcessEnv>;
	private _thread?;
	private stdout;
	private stderr;
	constructor(options: PoolOptions);
	on(event: string, callback: (arg: any) => void): void;
	off(event: string, callback: (arg: any) => void): void;
	send(message: WorkerRequest): void;
	start(): Promise<void>;
	stop(): Promise<void>;
	deserialize(data: unknown): unknown;
	private get thread();
}

/** @experimental */
declare class TypecheckPoolWorker implements PoolWorker {
	readonly name: string;
	private readonly project;
	private _eventEmitter;
	constructor(options: PoolOptions);
	start(): Promise<void>;
	stop(): Promise<void>;
	canReuse(): boolean;
	send(message: WorkerRequest): void;
	on(event: string, callback: (arg: any) => any): void;
	off(event: string, callback: (arg: any) => any): void;
	deserialize(data: unknown): unknown;
}

/** @experimental */
declare class VmForksPoolWorker extends ForksPoolWorker {
	readonly name = "vmForks";
	readonly reportMemory: true;
	protected readonly entrypoint: string;
	constructor(options: PoolOptions);
	canReuse(): boolean;
}

/** @experimental */
declare class VmThreadsPoolWorker extends ThreadsPoolWorker {
	readonly name = "vmThreads";
	readonly reportMemory: true;
	protected readonly entrypoint: string;
	constructor(options: PoolOptions);
	canReuse(): boolean;
}

declare class BaseSequencer implements TestSequencer {
	protected ctx: Vitest;
	constructor(ctx: Vitest);
	shard(files: TestSpecification[]): Promise<TestSpecification[]>;
	sort(files: TestSpecification[]): Promise<TestSpecification[]>;
	private calculateShardRange;
}

declare function registerConsoleShortcuts(ctx: Vitest, stdin: NodeJS.ReadStream | undefined, stdout: NodeJS.WriteStream | Writable): () => void;

interface WorkerContext extends ContextRPC {}

/**
* Check if the url is allowed to be served, via the `server.fs` config.
* @deprecated Use the `isFileLoadingAllowed` function instead.
*/
declare function isFileServingAllowed(config: ResolvedConfig$1, url: string): boolean;
declare function isFileServingAllowed(url: string, server: ViteDevServer): boolean;

declare function createViteLogger(console: Logger, level?: LogLevel, options?: LoggerOptions): Logger$1;

declare const rootDir: string;
declare const distDir: string;

declare function createDebugger(namespace: `vitest:${string}`): Debugger | undefined;

declare const version: string;

declare const createViteServer: typeof vite.createServer;

declare const rolldownVersion: string | undefined;

export { ApiConfig, BaseSequencer, ForksPoolWorker, GitNotFoundError, PoolOptions, PoolWorker, ResolvedConfig, TestProject, TestSequencer, TestSpecification, UserConfig as TestUserConfig, FilesNotFoundError as TestsNotFoundError, ThreadsPoolWorker, TypecheckPoolWorker, Vitest, VitestOptions, VitestPlugin, VitestRunMode, VmForksPoolWorker, VmThreadsPoolWorker, WorkerRequest, createDebugger, createMethodsRPC, createViteLogger, createViteServer, createVitest, distDir, escapeTestName, getFilePoolName, isFileServingAllowed, isValidApiRequest, parseCLI, registerConsoleShortcuts, resolveApiServerConfig, resolveConfig, resolveFsAllow, rolldownVersion, rootDir, startVitest, version };
export type { CliOptions, CliParseOptions, ProcessPool, CollectLineNumbers as TypeCheckCollectLineNumbers, CollectLines as TypeCheckCollectLines, Context as TypeCheckContext, TscErrorInfo as TypeCheckErrorInfo, RawErrsMap as TypeCheckRawErrorsMap, RootAndTarget as TypeCheckRootAndTarget, WorkerContext };
