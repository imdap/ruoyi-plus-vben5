//#region src/GlobMatcherTypes.d.ts
interface PathInterface {
  normalize(p: string): string;
  join(...paths: string[]): string;
  resolve(...paths: string[]): string;
  relative(from: string, to: string): string;
  isAbsolute(p: string): boolean;
  parse(p: string): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
  };
  sep: string;
}
type GlobMatch = GlobMatchRule | GlobMatchNoRule;
interface GlobMatchRule {
  matched: boolean;
  glob: string;
  root: string;
  pattern: GlobPatternWithRoot;
  index: number;
  isNeg: boolean;
}
interface GlobMatchNoRule {
  matched: false;
}
type GlobPattern = SimpleGlobPattern | GlobPatternWithRoot | GlobPatternWithOptionalRoot;
type SimpleGlobPattern = string;
interface GlobPatternWithOptionalRoot {
  /**
   * a glob pattern
   */
  glob: string;
  /**
   * The root from which the glob pattern is relative.
   * @default: options.root
   */
  root?: string | undefined;
  /**
   * Optional value useful for tracing which file a glob pattern was defined in.
   */
  source?: string | undefined;
  /**
   * Optional line number in the source
   */
  line?: number | undefined;
}
interface GlobPatternWithRoot extends GlobPatternWithOptionalRoot {
  root: string;
  /**
   * Global patterns do not need to be relative to the root.
   * Note: Some patterns start with `**` but they are tied to the root. In this case, `isGlobalPattern` is `false`.
   */
  isGlobalPattern: boolean;
}
interface GlobPatternNormalized extends GlobPatternWithRoot {
  /** the original glob pattern before it was normalized */
  rawGlob: string;
  /** the original root */
  rawRoot: string | undefined;
}
//#endregion
//#region src/globHelper.d.ts
/**
 * This function tries its best to determine if `fileOrGlob` is a path to a file or a glob pattern.
 * @param fileOrGlob - file (with absolute path) or glob.
 * @param root - absolute path to the directory that will be considered the root when testing the glob pattern.
 * @param path - optional node path methods - used for testing
 */
declare function fileOrGlobToGlob(fileOrGlob: string | GlobPattern, root: string, path?: PathInterface): GlobPatternWithRoot;
declare function isGlobPatternWithOptionalRoot(g: GlobPattern): g is GlobPatternWithOptionalRoot;
declare function isGlobPatternWithRoot(g: GlobPattern): g is GlobPatternWithRoot;
declare function isGlobPatternNormalized(g: GlobPattern | GlobPatternNormalized): g is GlobPatternNormalized;
interface NormalizeOptions {
  /**
   * Indicates that the glob should be modified to match nested patterns.
   *
   * Example: `node_modules` becomes `**​/node_modules/​**`, `**​/node_modules`, and `node_modules/​**`
   */
  nested: boolean;
  /**
   * This is the root to use for the glob if the glob does not already contain one.
   */
  root: string;
  /**
   * This is the replacement for `${cwd}` in either the root or in the glob.
   */
  cwd?: string;
  /**
   * Optional path interface for working with paths.
   */
  nodePath?: PathInterface;
}
/**
 *
 * @param patterns - glob patterns to normalize.
 * @param options - Normalization options.
 */
declare function normalizeGlobPatterns(patterns: GlobPattern[], options: NormalizeOptions): GlobPatternNormalized[];
declare function workaroundPicomatchBug(glob: string): string;
//#endregion
//#region src/GlobMatcher.d.ts
type Optional<T> = { [P in keyof T]?: T[P] | undefined };
type GlobMatchOptions = Optional<NormalizedGlobMatchOptions>;
type MatcherMode = 'exclude' | 'include';
interface NormalizedGlobMatchOptions {
  /**
   * The matcher has two modes (`include` or `exclude`) that impact how globs behave.
   *
   * `include` - designed for searching for file. By default it matches a sub-set of file.
   *   In include mode, the globs need to be more explicit to match.
   * - `dot` is by default false.
   * - `nested` is by default false.
   *
   * `exclude` - designed to emulate `.gitignore`. By default it matches a larger range of files.
   * - `dot` is by default true.
   * - `nested` is by default true.
   *
   * @default: 'exclude'
   */
  mode: MatcherMode;
  /**
   * The default directory from which a glob is relative.
   * Any globs that are not relative to the root will ignored.
   * @default: process.cwd()
   */
  root: string;
  /**
   * The directory to use as the current working directory.
   * @default: process.cwd();
   */
  cwd: string;
  /**
   * Allows matching against directories with a leading `.`.
   *
   * @default: mode == 'exclude'
   */
  dot: boolean;
  /**
   * Allows matching against nested directories or files without needing to add `**`
   *
   * @default: mode == 'exclude'
   */
  nested: boolean;
  /**
   * Mostly used for testing purposes. It allows explicitly specifying `path.win32` or `path.posix`.
   *
   * @default: require('path')
   */
  nodePath: PathInterface;
  /**
   * Disable brace matching, so that `{a,b}` and `{1..3}` would be treated as literal characters.
   *
   * @default false
   */
  nobrace?: boolean | undefined;
}
declare class GlobMatcher {
  /**
   * @param filename full path of file to match against.
   * @returns a GlobMatch - information about the match.
   */
  readonly matchEx: (filename: string) => GlobMatch;
  readonly path: PathInterface;
  readonly patterns: GlobPatternWithRoot[];
  readonly patternsNormalizedToRoot: GlobPatternNormalized[];
  /**
   * path or href of the root directory.
   */
  readonly root: string;
  readonly dot: boolean;
  readonly options: NormalizedGlobMatchOptions;
  /**
   * Instance ID
   */
  readonly id: number;
  /**
   * Construct a `.gitignore` emulator
   * @param patterns - the contents of a `.gitignore` style file or an array of individual glob rules.
   * @param root - the working directory
   */
  constructor(patterns: GlobPattern | GlobPattern[], root?: string | URL, nodePath?: PathInterface);
  /**
   * Construct a `.gitignore` emulator
   * @param patterns - the contents of a `.gitignore` style file or an array of individual glob rules.
   * @param options - to set the root and other options
   */
  constructor(patterns: GlobPattern | GlobPattern[], options?: GlobMatchOptions);
  constructor(patterns: GlobPattern | GlobPattern[], rootOrOptions?: string | URL | GlobMatchOptions);
  /**
   * Check to see if a filename matches any of the globs.
   * If filename is relative, it is considered relative to the root.
   * If filename is absolute and contained within the root, it will be made relative before being tested for a glob match.
   * If filename is absolute and not contained within the root, it will be tested as is.
   * @param filename full path of the file to check.
   */
  match(filename: string): boolean;
}
//#endregion
export { GlobMatch, GlobMatchNoRule, type GlobMatchOptions, GlobMatchRule, GlobMatcher, GlobPattern, GlobPatternNormalized, GlobPatternWithOptionalRoot, GlobPatternWithRoot, type NormalizeOptions, PathInterface, SimpleGlobPattern, fileOrGlobToGlob, isGlobPatternNormalized, isGlobPatternWithOptionalRoot, isGlobPatternWithRoot, normalizeGlobPatterns, workaroundPicomatchBug };
//# sourceMappingURL=index.d.ts.map