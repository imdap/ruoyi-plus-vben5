import type { ICSpellConfigFile } from './CSpellConfigFile.js';
import { CSpellConfigFile } from './CSpellConfigFile.js';
import type { FileLoaderMiddleware } from './FileLoader.js';
import type { IO } from './IO.js';
import type { DeserializerNext, SerializerMiddleware } from './Serializer.js';
import type { TextFile, TextFileRef } from './TextFile.js';
export interface CSpellConfigFileReaderWriter {
    readonly io: IO;
    readonly middleware: SerializerMiddleware[];
    readonly loaders: FileLoaderMiddleware[];
    readConfig(uri: URL | string): Promise<CSpellConfigFile>;
    writeConfig(configFile: CSpellConfigFile): Promise<TextFileRef>;
    clearCachedFiles(): void;
    setUntrustedExtensions(ext: readonly string[]): this;
    setTrustedUrls(urls: readonly (URL | string)[]): this;
    toCSpellConfigFile(configFile: ICSpellConfigFile): CSpellConfigFile;
    parse(textFile: TextFile): CSpellConfigFile;
    serialize(configFile: ICSpellConfigFile): string;
    /**
     * Untrusted extensions are extensions that are not trusted to be loaded from a file system.
     * Extension are case insensitive and should include the leading dot.
     */
    readonly untrustedExtensions: string[];
    /**
     * Urls starting with these urls are trusted to be loaded from a file system.
     */
    readonly trustedUrls: URL[];
}
export declare class CSpellConfigFileReaderWriterImpl implements CSpellConfigFileReaderWriter {
    readonly io: IO;
    readonly middleware: SerializerMiddleware[];
    readonly loaders: FileLoaderMiddleware[];
    /**
     * @param io - an optional injectable IO interface. The default is to use the file system.
     * @param deserializers - Additional deserializers to use when reading a config file. The order of the deserializers is
     *    important. The last one in the list will be the first one to be called.
     */
    constructor(io: IO, middleware: SerializerMiddleware[], loaders: FileLoaderMiddleware[]);
    private _untrustedExtensions;
    private _trustedUrls;
    /**
     * Untrusted extensions are extensions that are not trusted to be loaded from a file system.
     * Extension are case insensitive and should include the leading dot.
     */
    get untrustedExtensions(): string[];
    /**
     * Urls starting with these urls are trusted to be loaded from a file system.
     */
    get trustedUrls(): URL[];
    readConfig(uri: URL | string): Promise<CSpellConfigFile>;
    toCSpellConfigFile(configFile: ICSpellConfigFile): CSpellConfigFile;
    getDeserializer(): DeserializerNext;
    parse(textFile: TextFile): CSpellConfigFile;
    serialize(configFile: ICSpellConfigFile): string;
    writeConfig(configFile: ICSpellConfigFile): Promise<TextFileRef>;
    setUntrustedExtensions(ext: readonly string[]): this;
    setTrustedUrls(urls: readonly (URL | string)[]): this;
    clearCachedFiles(): void;
}
export declare class UntrustedUrlError extends Error {
    constructor(url: URL);
}
//# sourceMappingURL=CSpellConfigFileReaderWriter.d.ts.map