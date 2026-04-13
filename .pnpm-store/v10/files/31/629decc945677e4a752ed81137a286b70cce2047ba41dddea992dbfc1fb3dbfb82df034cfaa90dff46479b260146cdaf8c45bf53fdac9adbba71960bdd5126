import { isFileURL, isUrlLike, toFileURL, toURL, urlBasename, urlParent as urlDirname } from "@cspell/url";
import { Buffer } from "node:buffer";
import { ServiceBus } from "@cspell/cspell-service-bus";

//#region src/async/asyncIterable.d.ts
/**
* Reads an entire iterable and converts it into a promise.
* @param asyncIterable the async iterable to wait for.
*/
declare function toArray<T>(asyncIterable: AsyncIterable<T> | Iterable<T> | Iterable<Promise<T>>): Promise<T[]>;
//#endregion
//#region src/models/BufferEncoding.d.ts
type TextEncoding = "utf-8" | "utf8" | "utf16le" | "utf16be" | "utf-16le" | "utf-16be";
type BufferEncoding = "base64" | "base64url" | "hex" | TextEncoding;
//#endregion
//#region src/models/FileResource.d.ts
interface FileReference {
  /**
  * The URL of the File
  */
  readonly url: URL;
  /**
  * The filename of the file if known.
  * Useful for `data:` urls.
  */
  readonly baseFilename?: string | undefined;
  /**
  * The encoding to use when reading the file.
  */
  readonly encoding?: BufferEncoding | undefined;
  /**
  * - `true` if the content had been gzip compressed.
  * - `false` if the content was NOT gzip compressed.
  * - `undefined` if it is unknown
  */
  readonly gz?: boolean | undefined;
}
interface FileResource extends FileReference {
  /**
  * The contents of the file
  */
  readonly content: string | Uint8Array<ArrayBuffer>;
}
interface TextFileResource extends FileResource {
  /**
  * Extract the text of the file.
  * @param encoding - optional encoding to use when decoding the content.
  *   by default it uses the encoding of the file if one was specified, otherwise it uses `utf8`.
  *   If the content is a string, then the encoding is ignored.
  */
  getText(encoding?: BufferEncoding): string;
  /**
  * Get the bytes of the file.
  * @param gunzip - gunzip the data.
  *   - `true` to gunzip the data before returning it.
  *   - `false` to return the data as is.
  *   - `undefined` to gunzip the data if the file is marked as gzipped.
  * @returns the bytes of the file.
  */
  getBytes(gunzip?: boolean): Promise<Uint8Array<ArrayBuffer>>;
}
type UrlOrFilename = string | URL;
type UrlOrReference$2 = UrlOrFilename | FileReference;
//#endregion
//#region src/common/CFileReference.d.ts
interface CFileReferenceJson {
  url: string;
  encoding?: string | undefined;
  baseFilename?: string | undefined;
  gz?: boolean | undefined;
}
declare class CFileReference implements FileReference {
  readonly url: URL;
  readonly encoding: BufferEncoding | undefined;
  readonly baseFilename: string | undefined;
  /**
  * Use to ensure the nominal type separation between CFileReference and FileReference
  * See: https://github.com/microsoft/TypeScript/wiki/FAQ#when-and-why-are-classes-nominal
  */
  private _?;
  readonly gz: boolean | undefined;
  constructor(url: URL, encoding: BufferEncoding | undefined, baseFilename: string | undefined, gz: boolean | undefined);
  static isCFileReference(obj: unknown): obj is CFileReference;
  static from(fileReference: FileReference): CFileReference;
  static from(url: URL, encoding?: BufferEncoding, baseFilename?: string | undefined, gz?: boolean | undefined): CFileReference;
  toJson(): CFileReferenceJson;
}
declare function renameFileReference(ref: FileReference, newUrl: URL): FileReference;
//#endregion
//#region src/common/CFileResource.d.ts
interface CFileResourceJson {
  url: string;
  content: string;
  encoding?: string | undefined;
  baseFilename?: string | undefined;
  gz: boolean;
}
declare class CFileResource implements TextFileResource {
  #private;
  readonly baseFilename?: string | undefined;
  readonly url: URL;
  readonly content: string | Uint8Array<ArrayBuffer>;
  readonly encoding: BufferEncoding | undefined;
  constructor(url: URL, content: string | Uint8Array<ArrayBuffer>, encoding: BufferEncoding | undefined, baseFilename: string | undefined, gz: boolean | undefined);
  get gz(): boolean;
  getText(encoding?: BufferEncoding): string;
  getBytes(unzip?: boolean): Promise<Uint8Array<ArrayBuffer>>;
  toJson(): CFileResourceJson;
  static isCFileResource(obj: unknown): obj is CFileResource;
  static from(fileResource: FileResource): CFileResource;
  static from(fileReference: FileReference, content: string | Uint8Array<ArrayBuffer>): CFileResource;
  static from(fileReference: FileReference | URL, content: string | Uint8Array<ArrayBuffer>): CFileResource;
  static from(url: URL, content: string | Uint8Array<ArrayBuffer>, encoding?: BufferEncoding | undefined, baseFilename?: string | undefined, gz?: boolean): CFileResource;
}
declare function fromFileResource(fileResource: FileResource, encoding?: BufferEncoding): TextFileResource;
declare function renameFileResource(fileResource: FileResource, url: URL): FileResource;
//#endregion
//#region src/models/Stats.d.ts
/**
* Subset of definition from the Node definition to avoid a dependency upon a specific version of Node
*/
interface Stats {
  /**
  * Size of file in byes, -1 if unknown.
  */
  size: number;
  /**
  * Modification time, 0 if unknown.
  */
  mtimeMs: number;
  /**
  * Used by web requests to see if a resource has changed.
  */
  eTag?: string | undefined;
  /**
  * The file type.
  */
  fileType?: FileType | undefined;
}
declare enum FileType {
  /**
  * The file type is unknown.
  */
  Unknown = 0,
  /**
  * A regular file.
  */
  File = 1,
  /**
  * A directory.
  */
  Directory = 2,
  /**
  * A symbolic link.
  */
  SymbolicLink = 64
}
interface DirEntry {
  name: string;
  dir: URL;
  fileType: FileType;
}
//#endregion
//#region src/common/stat.d.ts
/**
* Compare two Stats to see if they have the same value.
* @param left - Stats
* @param right - Stats
* @returns 0 - equal; 1 - left > right; -1 left < right
*/
declare function compareStats(left: Stats, right: Stats): number;
//#endregion
//#region src/models/disposable.d.ts
type DisposableEx = LegacyDisposable & Disposable;
interface LegacyDisposable {
  dispose(): void;
}
//#endregion
//#region src/common/urlOrReferenceToUrl.d.ts
type UrlOrReference$1 = URL | FileReference;
declare function urlOrReferenceToUrl(urlOrReference: UrlOrReference$1): URL;
//#endregion
//#region src/CSpellIO.d.ts
interface ReadFileOptions$1 {
  signal?: AbortSignal;
  encoding?: BufferEncoding;
}
type ReadFileOptionsOrEncoding = ReadFileOptions$1 | BufferEncoding;
interface CSpellIO {
  /**
  * Read a file
  * @param urlOrFilename - uri of the file to read
  * @param options - optional options for reading the file.
  * @returns A TextFileResource.
  */
  readFile(urlOrFilename: UrlOrReference$2, options?: ReadFileOptionsOrEncoding): Promise<TextFileResource>;
  /**
  * Read a file in Sync mode.
  * Note: `http` requests will fail.
  * @param urlOrFilename - uri of the file to read
  * @param encoding - optional encoding.
  * @returns A TextFileResource.
  * @deprecated Use `readFile` instead.
  */
  readFileSync(urlOrFilename: UrlOrReference$2, encoding?: BufferEncoding): TextFileResource;
  /**
  * Write content to a file using utf-8 encoding.
  * It will fail to write to non-file uris.
  * @param urlOrFilename - uri
  * @param content - string to write.
  */
  writeFile(urlOrFilename: UrlOrReference$2, content: string | ArrayBufferView): Promise<FileReference>;
  /**
  * Read a directory.
  * @param urlOrFilename - uri
  */
  readDirectory(urlOrFilename: string | URL): Promise<DirEntry[]>;
  /**
  * Get Stats on a uri.
  * @param urlOrFilename - uri to fetch stats on
  * @returns Stats if successful.
  */
  getStat(urlOrFilename: UrlOrReference$2): Promise<Stats>;
  /**
  * Get Stats on a uri.
  * @param urlOrFilename - uri to fetch stats on
  * @returns Stats if successful, otherwise it throws an error.
  * @deprecated Use `getStat` instead.
  */
  getStatSync(urlOrFilename: UrlOrReference$2): Stats;
  /**
  * Compare two Stats.
  * @param left - left stat
  * @param right - right stat
  * @returns 0 if they are equal and non-zero if they are not.
  */
  compareStats(left: Stats, right: Stats): number;
  /**
  * Convert a string to a URL
  * @param urlOrFilename - string or URL to convert.
  *   If it is a URL, then it is just returned as is.
  *   If is is a string and fully formed URL, then it is parsed.
  *   If it is a string without a protocol/scheme it is assumed to be relative to `relativeTo`.
  * @param relativeTo - optional
  */
  toURL(urlOrFilename: UrlOrReference$2, relativeTo?: string | URL): URL;
  /**
  * Convert a string to a File URL
  * @param urlOrFilename - string or URL to convert.
  * @param relativeTo - optional
  */
  toFileURL(urlOrFilename: UrlOrFilename, relativeTo?: string | URL): URL;
  /**
  * Try to determine the base name of a URL.
  *
  * Note: this handles `data:` URLs with `filename` attribute:
  *
  * Example:
  * - `data:text/plain;charset=utf8;filename=hello.txt,Hello` would have a filename of `hello.txt`
  * - `file:///user/project/cspell.config.yaml` would have a filename of `cspell.config.yaml`
  * - `https://raw.guc.com/sss/cspell/main/cspell.schema.json` would have a filename of `cspell.schema.json`
  * @param urlOrFilename - string or URL to extract the basename from.
  */
  urlBasename(urlOrFilename: UrlOrReference$2): string;
  /**
  * Try to determine the directory URL of the uri.
  *
  * Example:
  * - `file:///user/local/file.txt` becomes `file:///user/local/`
  * - `file:///user/local/` becomes `file:///user/`
  *
  * @param urlOrFilename - string or URL
  */
  urlDirname(urlOrFilename: UrlOrReference$2): URL;
}
//#endregion
//#region src/CSpellIONode.d.ts
declare class CSpellIONode implements CSpellIO {
  readonly serviceBus: ServiceBus;
  constructor(serviceBus?: ServiceBus);
  readFile(urlOrFilename: UrlOrReference$2, options?: ReadFileOptionsOrEncoding): Promise<TextFileResource>;
  readDirectory(urlOrFilename: string | URL): Promise<DirEntry[]>;
  readFileSync(urlOrFilename: UrlOrReference$2, encoding?: BufferEncoding): TextFileResource;
  writeFile(urlOrFilename: UrlOrReference$2, content: string | Uint8Array<ArrayBuffer>): Promise<FileReference>;
  getStat(urlOrFilename: UrlOrReference$2): Promise<Stats>;
  getStatSync(urlOrFilename: UrlOrReference$2): Stats;
  compareStats(left: Stats, right: Stats): number;
  toURL(urlOrFilename: UrlOrReference$2, relativeTo?: string | URL): URL;
  toFileURL(urlOrFilename: UrlOrReference$2, relativeTo?: string | URL): URL;
  urlBasename(urlOrFilename: UrlOrReference$2): string;
  urlDirname(urlOrFilename: UrlOrReference$2): URL;
}
declare function getDefaultCSpellIO(): CSpellIO;
//#endregion
//#region src/common/BufferEncoding.d.ts
type TextEncodingExtra = "utf-16be" | "utf-16le" | "utf16be" | "utf16le";
type BufferEncodingExt = BufferEncoding | TextEncodingExtra;
//#endregion
//#region src/node/file/fileWriter.d.ts
declare function writeToFile(filename: string, data: string | Iterable<string> | AsyncIterable<string>, encoding?: BufferEncoding): Promise<void>;
declare function writeToFileIterable(filename: string, data: Iterable<string> | AsyncIterable<string>, encoding?: BufferEncodingExt): Promise<void>;
//#endregion
//#region src/file/file.d.ts
declare function readFileText(filename: string | URL, encoding?: BufferEncoding): Promise<string>;
declare function readFileTextSync(filename: string | URL, encoding?: BufferEncoding): string;
declare function getStat(filenameOrUri: string): Promise<Stats | Error>;
declare function getStatSync(filenameOrUri: string): Stats | Error;
//#endregion
//#region src/types.d.ts
type TArrayBufferView<T extends ArrayBuffer = ArrayBuffer> = ArrayBufferView<T>;
//#endregion
//#region src/node/dataUrl.d.ts
/**
* Generates a string of the following format:
*
* `data:[mediaType][;charset=<encoding>[;base64],<data>`
*
* - `encoding` - defaults to `utf8` for text data
* @param data
* @param mediaType - The mediaType is a [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type string
* @param attributes - Additional attributes
*/
declare function encodeDataUrl(data: string | TArrayBufferView | Uint8Array<ArrayBuffer>, mediaType: string, attributes?: Iterable<readonly [string, string]> | undefined): string;
declare function toDataUrl(data: string | TArrayBufferView, mediaType: string, attributes?: Iterable<[string, string]> | undefined): URL;
//#endregion
//#region src/VirtualFS/constants.d.ts
declare const CSPELL_VFS_PROTOCOL: "cspell-vfs:";
//#endregion
//#region src/VirtualFS/VFileSystem.d.ts
type UrlOrReference = URL | FileReference;
declare enum FSCapabilityFlags {
  None = 0,
  Stat = 1,
  Read = 2,
  Write = 4,
  ReadWrite = 6,
  ReadDir = 8,
  WriteDir = 16,
  ReadWriteDir = 24
}
interface FileSystemProviderInfo {
  name: string;
}
interface ReadFileOptions {
  signal?: AbortSignal;
  encoding?: BufferEncoding;
}
interface VFileSystemCore {
  /**
  * Read a file.
  * @param url - URL to read
  * @param encoding - optional encoding
  * @returns A FileResource, the content will not be decoded. Use `.getText()` to get the decoded text.
  */
  readFile(url: UrlOrReference, encoding: BufferEncoding): Promise<TextFileResource>;
  /**
  * Read a file.
  * @param url - URL to read
  * @param options - options for reading the file.
  * @returns A FileResource, the content will not be decoded. Use `.getText()` to get the decoded text.
  */
  readFile(url: UrlOrReference, options?: ReadFileOptions | BufferEncoding): Promise<TextFileResource>;
  /**
  * Write a file
  * @param file - the file to write
  */
  writeFile(file: FileResource): Promise<FileReference>;
  /**
  * Get the stats for a url.
  * @param url - Url to fetch stats for.
  */
  stat(url: UrlOrReference): Promise<VfsStat>;
  /**
  * Read the directory entries for a url.
  * The url should end with `/` to indicate a directory.
  * @param url - the url to read the directory entries for.
  */
  readDirectory(url: URL): Promise<VfsDirEntry[]>;
  /**
  * Get the capabilities for a URL.
  * The capabilities can be more restrictive than the general capabilities of the provider.
  * @param url - the url to try
  */
  getCapabilities(url: URL): Readonly<FSCapabilities>;
  /**
  * Information about the provider.
  * It is up to the provider to define what information is available.
  */
  providerInfo: Readonly<FileSystemProviderInfo>;
  /**
  * Indicates that a provider was found for the url.
  */
  hasProvider: boolean;
}
interface VFileSystem extends VFileSystemCore {
  findUp(name: string | string[] | VFindUpPredicate, from: URL, options?: VFindUpURLOptions): Promise<URL | undefined>;
}
interface FSCapabilities {
  readonly flags: FSCapabilityFlags;
  readonly readFile: boolean;
  readonly writeFile: boolean;
  readonly readDirectory: boolean;
  readonly writeDirectory: boolean;
  readonly stat: boolean;
}
interface VfsStat extends Stats {
  isDirectory(): boolean;
  isFile(): boolean;
  isUnknown(): boolean;
  isSymbolicLink(): boolean;
}
interface VfsDirEntry extends DirEntry {
  isDirectory(): boolean;
  isFile(): boolean;
  isUnknown(): boolean;
  isSymbolicLink(): boolean;
}
type VFindEntryType = "file" | "directory" | "!file" | "!directory";
interface VFindUpURLOptions {
  type?: VFindEntryType;
  stopAt?: URL | URL[];
}
type VFindUpPredicate = (dir: URL) => URL | undefined | Promise<URL | undefined>;
//#endregion
//#region src/VirtualFS/VirtualFS.d.ts
type NextProvider = (url: URL) => VProviderFileSystem | undefined;
interface VirtualFS extends DisposableEx {
  registerFileSystemProvider(provider: VFileSystemProvider, ...providers: VFileSystemProvider[]): DisposableEx;
  /**
  * Get the fs for a given url.
  */
  getFS(url: URL): VFileSystem;
  /**
  * The file system. All requests will first use getFileSystem to get the file system before making the request.
  */
  readonly fs: Required<VFileSystem>;
  /**
  * The file system core. All requests will first use getFileSystem to get the file system before making the request.
  */
  readonly fsc: Required<VFileSystemCore>;
  /**
  * Clear the cache of file systems.
  */
  reset(): void;
  /**
  * Indicates that logging has been enabled.
  */
  loggingEnabled: boolean;
  enableLogging(value?: boolean): void;
}
interface OptionAbort {
  signal?: AbortSignal;
}
type VProviderFileSystemReadFileOptions = OptionAbort;
interface VProviderFileSystem extends DisposableEx {
  readFile(url: UrlOrReference, options?: VProviderFileSystemReadFileOptions): Promise<FileResource>;
  writeFile(file: FileResource): Promise<FileReference>;
  /**
  * Information about the provider.
  * It is up to the provider to define what information is available.
  */
  providerInfo: FileSystemProviderInfo;
  stat(url: UrlOrReference): Stats | Promise<Stats>;
  readDirectory(url: URL): Promise<DirEntry[]>;
  /**
  * These are the general capabilities for the provider's file system.
  * It is possible for a provider to support more capabilities for a given url by providing a getCapabilities function.
  */
  capabilities: FSCapabilityFlags;
  /**
  * Get the capabilities for a URL. Makes it possible for a provider to support more capabilities for a given url.
  * These capabilities should be more restrictive than the general capabilities.
  * @param url - the url to try
  * @returns the capabilities for the url.
  */
  getCapabilities?: (url: URL) => FSCapabilities;
}
interface VFileSystemProvider extends Partial<DisposableEx> {
  /** Name of the Provider */
  name: string;
  /**
  * Get the file system for a given url. The provider is cached based upon the protocol and hostname.
  * @param url - the url to get the file system for.
  * @param next - call this function to get the next provider to try. This is useful for chaining providers that operate on the same protocol.
  */
  getFileSystem(url: URL, next: NextProvider): VProviderFileSystem | undefined;
}
//#endregion
//#region src/VirtualFS/CVirtualFS.d.ts
declare function createVirtualFS(cspellIO?: CSpellIO): VirtualFS;
declare function getDefaultVirtualFs(): VirtualFS;
//#endregion
//#region src/VirtualFS/redirectProvider.d.ts
interface RedirectOptions {
  /**
  * Option ts to mask the capabilities of the provider.
  * @default: -1
  */
  capabilitiesMask?: number;
  capabilities?: FSCapabilityFlags;
}
/**
* Create a provider that will redirect requests from the publicRoot to the privateRoot.
* This is useful for creating a virtual file system that is a subset of another file system.
*
* Example:
* ```ts
* const vfs = createVirtualFS();
* const provider = createRedirectProvider('test', new URL('file:///public/'), new URL('file:///private/'))
* vfs.registerFileSystemProvider(provider);
* // Read the content of `file:///private/file.txt`
* const file = vfs.fs.readFile(new URL('file:///public/file.txt');
* ```
*
* @param name - name of the provider
* @param publicRoot - the root of the public file system.
* @param privateRoot - the root of the private file system.
* @param options - options for the provider.
* @returns FileSystemProvider
*/
declare function createRedirectProvider(name: string, publicRoot: URL, privateRoot: URL, options?: RedirectOptions): VFileSystemProvider;
//#endregion
export { type BufferEncoding, CFileReference, CFileResource, CSPELL_VFS_PROTOCOL, type CSpellIO, CSpellIONode, FSCapabilityFlags, type FileReference, type FileResource, type Stats, type TextEncoding, type TextFileResource, type VFileSystem, type VFileSystemCore, type VFileSystemProvider, FileType as VFileType, type VFindEntryType, type VFindUpPredicate, type VFindUpURLOptions, type VProviderFileSystem, type VfsDirEntry, type VfsStat, type VirtualFS, toArray as asyncIterableToArray, compareStats, createRedirectProvider, fromFileResource as createTextFileResource, createVirtualFS, encodeDataUrl, getDefaultCSpellIO, getDefaultVirtualFs, getStat, getStatSync, isFileURL, isUrlLike, readFileText, readFileTextSync, renameFileReference, renameFileResource, toDataUrl, toFileURL, toURL, urlBasename, urlDirname, urlOrReferenceToUrl, writeToFile, writeToFileIterable, writeToFileIterable as writeToFileIterableP };
//# sourceMappingURL=index.d.ts.map