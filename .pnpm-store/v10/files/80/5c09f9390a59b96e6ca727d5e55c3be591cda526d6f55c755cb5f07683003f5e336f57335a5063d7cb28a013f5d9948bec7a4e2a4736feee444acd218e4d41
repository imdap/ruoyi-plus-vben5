import { extname } from 'node:path/posix';
import { CSpellConfigFile } from './CSpellConfigFile.js';
import { CSpellConfigFileInMemory } from './CSpellConfigFile/index.js';
import { getDeserializer, getLoader, getSerializer } from './middlewareHelper.js';
import { toURL } from './util/toURL.js';
export class CSpellConfigFileReaderWriterImpl {
    io;
    middleware;
    loaders;
    /**
     * @param io - an optional injectable IO interface. The default is to use the file system.
     * @param deserializers - Additional deserializers to use when reading a config file. The order of the deserializers is
     *    important. The last one in the list will be the first one to be called.
     */
    constructor(io, middleware, loaders) {
        this.io = io;
        this.middleware = middleware;
        this.loaders = loaders;
    }
    _untrustedExtensions = new Set();
    _trustedUrls = [];
    /**
     * Untrusted extensions are extensions that are not trusted to be loaded from a file system.
     * Extension are case insensitive and should include the leading dot.
     */
    get untrustedExtensions() {
        return [...this._untrustedExtensions];
    }
    /**
     * Urls starting with these urls are trusted to be loaded from a file system.
     */
    get trustedUrls() {
        return [...this._trustedUrls].map((url) => new URL(url));
    }
    readConfig(uri) {
        const url = new URL(uri);
        if (!isTrusted(url, this._trustedUrls, this._untrustedExtensions)) {
            return Promise.reject(new UntrustedUrlError(url));
        }
        const loader = getLoader(this.loaders);
        return loader({ url: toURL(uri), context: { deserialize: this.getDeserializer(), io: this.io } });
    }
    toCSpellConfigFile(configFile) {
        return configFile instanceof CSpellConfigFile
            ? configFile
            : new CSpellConfigFileInMemory(configFile.url, configFile.settings);
    }
    getDeserializer() {
        return getDeserializer(this.middleware);
    }
    parse(textFile) {
        const deserializer = this.getDeserializer();
        return deserializer(textFile);
    }
    serialize(configFile) {
        const serializer = getSerializer(this.middleware);
        return serializer(configFile);
    }
    async writeConfig(configFile) {
        if (configFile.readonly)
            throw new Error(`Config file is readonly: ${configFile.url.href}`);
        const content = this.serialize(configFile);
        const ref = await this.io.writeFile({ url: configFile.url, content });
        return { url: ref.url };
    }
    setUntrustedExtensions(ext) {
        this._untrustedExtensions.clear();
        ext.forEach((e) => this._untrustedExtensions.add(e.toLowerCase()));
        return this;
    }
    setTrustedUrls(urls) {
        this._trustedUrls = [...new Set(urls.map((url) => new URL(url).href))].sort();
        return this;
    }
    clearCachedFiles() {
        for (const loader of this.loaders) {
            loader.reset?.();
        }
    }
}
function isTrusted(url, trustedUrls, untrustedExtensions) {
    const path = url.pathname;
    const ext = extname(path).toLowerCase();
    if (!untrustedExtensions.has(ext))
        return true;
    const href = url.href;
    return trustedUrls.some((trustedUrl) => href.startsWith(trustedUrl));
}
export class UntrustedUrlError extends Error {
    constructor(url) {
        super(`Untrusted URL: "${url.href}"`);
    }
}
//# sourceMappingURL=CSpellConfigFileReaderWriter.js.map