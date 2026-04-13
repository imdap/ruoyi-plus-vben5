import type { CSpellSettings, CSpellUserSettings, ImportFileRef } from '@cspell/cspell-types';
import type { CSpellConfigFileReaderWriter, ICSpellConfigFile } from 'cspell-config-lib';
import { CSpellConfigFile, CSpellConfigFileWithErrors } from 'cspell-config-lib';
import type { VFileSystem } from '../../../fileSystem.js';
import type { CacheStats } from '../../../util/AutoResolve.js';
import { AutoResolveCache } from '../../../util/AutoResolve.js';
import { FileResolver } from '../../../util/resolveFile.js';
import type { LoaderResult } from '../pnpLoader.js';
import { ConfigSearch } from './configSearch.js';
import { normalizeCacheSettings } from './normalizeRawSettings.js';
import type { PnPSettingsOptional } from './PnPSettings.js';
import type { CSpellSettingsI, CSpellSettingsWST } from './types.js';
export type StopSearchAt = URL | string | (URL | string)[] | undefined;
export declare const sectionCSpell = "cSpell";
export declare const defaultFileName = "cspell.json";
interface ImportedConfigEntry {
    /** href of the configFile URL, this is the key to the cache. */
    href: string;
    /** The fileRef used. */
    fileRef: ImportFileRef;
    /** resolved config file */
    configFile: CSpellConfigFile | undefined;
    /** resolved settings */
    settings: CSpellSettingsI | undefined;
    isReady: boolean;
    /** Resolved when the settings have been fully resolved. */
    onReady: Promise<CSpellSettingsI>;
    /** Resolved when the config file has been loaded. */
    onConfigFileReady: Promise<CSpellConfigFile | Error>;
    /** Set of all references used to catch circular references */
    referencedSet: Set<string>;
}
export interface SearchForConfigFileOptions {
    stopSearchAt?: StopSearchAt;
}
export interface SearchForConfigOptions extends SearchForConfigFileOptions, PnPSettingsOptional {
}
interface CacheMergeConfigFileWithImports {
    pnpSettings: PnPSettingsOptional | undefined;
    referencedBy: string[] | undefined;
    result: Promise<CSpellSettingsI>;
}
export interface IConfigLoader {
    readSettingsAsync(filename: string | URL, relativeTo?: string | URL, pnpSettings?: PnPSettingsOptional): Promise<CSpellSettingsI>;
    /**
     * Read a cspell configuration file.
     * @param filenameOrURL - URL, relative path, absolute path, or package name.
     * @param relativeTo - optional URL, defaults to `pathToFileURL('./')`
     */
    readConfigFile(filenameOrURL: string | URL, relativeTo?: string | URL): Promise<CSpellConfigFile | Error>;
    searchForConfigFileLocation(searchFrom: URL | string | undefined): Promise<URL | undefined>;
    searchForConfigFile(searchFrom: URL | string | undefined): Promise<CSpellConfigFile | undefined>;
    /**
     * This is an alias for `searchForConfigFile` and `mergeConfigFileWithImports`.
     * @param searchFrom the directory / file URL to start searching from.
     * @param options - Optional settings including stop location and Yarn PnP configuration.
     * @returns the resulting settings
     */
    searchForConfig(searchFrom: URL | string | undefined, options?: SearchForConfigOptions): Promise<CSpellSettingsI | undefined>;
    resolveConfigFileLocation(filenameOrURL: string | URL, relativeTo?: string | URL): Promise<URL | undefined>;
    getGlobalSettingsAsync(): Promise<CSpellSettingsI>;
    /**
     * The loader caches configuration files for performance. This method clears the cache.
     */
    clearCachedSettingsFiles(): void;
    /**
     * Resolve and merge the settings from the imports.
     * This will create a virtual configuration file that is used to resolve the settings.
     * @param settings - settings to resolve imports for
     * @param filename - the path / URL to the settings file. Used to resolve imports.
     */
    resolveSettingsImports(settings: CSpellUserSettings, filename: string | URL): Promise<CSpellSettingsI>;
    /**
     * Resolve imports and merge.
     * @param cfgFile - configuration file.
     * @param pnpSettings - optional settings related to Using Yarn PNP.
     */
    mergeConfigFileWithImports(cfgFile: CSpellConfigFile, pnpSettings?: PnPSettingsOptional | undefined): Promise<CSpellSettingsI>;
    /**
     * Create an in memory CSpellConfigFile.
     * @param filename - URL to the file. Used to resolve imports.
     * @param settings - settings to use.
     */
    createCSpellConfigFile(filename: URL | string, settings: CSpellUserSettings): CSpellConfigFile;
    /**
     * Convert a ICSpellConfigFile into a CSpellConfigFile.
     * If cfg is a CSpellConfigFile, it is returned as is.
     * @param cfg - configuration file to convert.
     */
    toCSpellConfigFile(cfg: ICSpellConfigFile): CSpellConfigFile;
    /**
     * Unsubscribe from any events and dispose of any resources including caches.
     */
    dispose(): void;
    getStats(): Readonly<Record<string, Readonly<Record<string, number>>>>;
    readonly isTrusted: boolean;
    setIsTrusted(isTrusted: boolean): void;
}
export declare const defaultExtensionsAll: string[];
export declare class ConfigLoader implements IConfigLoader {
    #private;
    readonly fs: VFileSystem;
    readonly templateVariables: Record<string, string>;
    onReady: Promise<void>;
    readonly fileResolver: FileResolver;
    /**
     * Use `createConfigLoader`
     * @param virtualFs - virtual file system to use.
     */
    protected constructor(fs: VFileSystem, templateVariables?: Record<string, string>);
    private subscribeToEvents;
    protected cachedConfig: Map<string, ImportedConfigEntry>;
    protected cachedConfigFiles: Map<string, CSpellConfigFile>;
    protected cachedPendingConfigFile: AutoResolveCache<string, Promise<Error | CSpellConfigFile>>;
    protected cachedMergedConfig: WeakMap<CSpellConfigFile, CacheMergeConfigFileWithImports>;
    protected cachedCSpellConfigFileInMemory: WeakMap<CSpellSettings, Map<string, CSpellConfigFile>>;
    protected globalSettings: CSpellSettingsI | undefined;
    protected cspellConfigFileReaderWriter: CSpellConfigFileReaderWriter;
    protected configSearch: ConfigSearch;
    protected stopSearchAtCache: WeakMap<SearchForConfigFileOptions, URL[] | undefined>;
    protected toDispose: {
        dispose: () => void;
    }[];
    readSettingsAsync(filename: string | URL, relativeTo?: string | URL, pnpSettings?: PnPSettingsOptional): Promise<CSpellSettingsI>;
    readConfigFile(filenameOrURL: string | URL, relativeTo?: string | URL): Promise<CSpellConfigFile | Error>;
    searchForConfigFileLocation(searchFrom: URL | string | undefined, stopSearchAt?: URL[] | undefined): Promise<URL | undefined>;
    searchForConfigFile(searchFrom: URL | string | undefined, stopSearchAt?: URL[]): Promise<CSpellConfigFile | CSpellConfigFileWithErrors | undefined>;
    /**
     *
     * @param searchFrom the directory / file URL to start searching from.
     * @param options - Optional settings including stop location and Yarn PnP configuration.
     * @returns the resulting settings
     */
    searchForConfig(searchFrom: URL | string | undefined, options?: SearchForConfigOptions): Promise<CSpellSettingsI | undefined>;
    getGlobalSettings(): CSpellSettingsI;
    getGlobalSettingsAsync(): Promise<CSpellSettingsI>;
    clearCachedSettingsFiles(): void;
    /**
     * Resolve and merge the settings from the imports.
     * @param settings - settings to resolve imports for
     * @param filename - the path / URL to the settings file. Used to resolve imports.
     */
    resolveSettingsImports(settings: CSpellUserSettings, filename: string | URL): Promise<CSpellSettingsI>;
    protected init(): Promise<void>;
    protected prefetchGlobalSettingsAsync(): Promise<void>;
    protected resolveDefaultConfig(): Promise<URL>;
    protected importSettings(fileRef: ImportFileRef, pnpSettings: PnPSettingsOptional | undefined, backReferences: string[]): ImportedConfigEntry;
    private setupPnp;
    mergeConfigFileWithImports(cfg: CSpellConfigFile | ICSpellConfigFile, pnpSettings: PnPSettingsOptional | undefined, referencedBy?: string[] | undefined): Promise<CSpellSettingsI>;
    private _mergeConfigFileWithImports;
    /**
     * normalizeSettings handles correcting all relative paths, anchoring globs, and importing other config files.
     * @param rawSettings - raw configuration settings
     * @param pathToSettingsFile - path to the source file of the configuration settings.
     */
    protected mergeImports(cfgFile: CSpellConfigFile, importedSettings: CSpellUserSettings[]): Promise<CSpellSettingsI>;
    registerVirtualFiles(settings: CSpellSettings): Promise<void>;
    createCSpellConfigFile(filename: URL | string, settings: CSpellUserSettings): CSpellConfigFile;
    toCSpellConfigFile(cfg: ICSpellConfigFile): CSpellConfigFile;
    dispose(): void;
    getStats(): {
        cacheMergeListUnique: Readonly<CacheStats>;
        cacheMergeLists: Readonly<CacheStats>;
    };
    resolveConfigFileLocation(filenameOrURL: string | URL, relativeTo: string | URL): Promise<URL | undefined>;
    private resolveFilename;
    get isTrusted(): boolean;
    setIsTrusted(isTrusted: boolean): void;
}
declare class ConfigLoaderInternal extends ConfigLoader {
    constructor(vfs: VFileSystem);
    get _cachedFiles(): Map<string, ImportedConfigEntry>;
}
export declare function loadPnP(pnpSettings: PnPSettingsOptional, searchFrom: URL): Promise<LoaderResult>;
declare function resolveGlobRoot(settings: CSpellSettingsWST, urlSettingsFile: URL): string;
declare function validateRawConfigVersion(config: CSpellConfigFile): void;
export declare function createConfigLoader(fs?: VFileSystem): IConfigLoader;
export declare function getDefaultConfigLoaderInternal(): ConfigLoaderInternal;
export declare class ConfigurationLoaderError extends Error {
    readonly configurationFile?: string | undefined;
    readonly relativeTo?: string | URL | undefined;
    constructor(message: string, configurationFile?: string | undefined, relativeTo?: string | URL | undefined, cause?: unknown);
}
export declare class ConfigurationLoaderFailedToResolveError extends ConfigurationLoaderError {
    readonly configurationFile: string;
    readonly relativeTo: string | URL;
    constructor(configurationFile: string, relativeTo: string | URL, cause?: unknown);
}
declare function relativeToCwd(file: string | URL): string;
export declare const __testing__: {
    getDefaultConfigLoaderInternal: typeof getDefaultConfigLoaderInternal;
    normalizeCacheSettings: typeof normalizeCacheSettings;
    validateRawConfigVersion: typeof validateRawConfigVersion;
    resolveGlobRoot: typeof resolveGlobRoot;
    relativeToCwd: typeof relativeToCwd;
};
export {};
//# sourceMappingURL=configLoader.d.ts.map