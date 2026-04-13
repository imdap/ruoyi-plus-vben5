import { extname } from 'node:path/posix';
import { CSpellConfigFileJavaScript } from '../CSpellConfigFile/CSpellConfigFileJavaScript.js';
const _debug = false;
const _log = _debug ? console.warn.bind(console) : () => undefined;
async function importJavaScript(url, hashSuffix) {
    try {
        const _url = new URL(url.href);
        _url.hash = `${_url.hash};loaderSuffix=${hashSuffix}`;
        _log('importJavaScript: %o', { url: _url.href });
        let result = await import(_url.href);
        result = result.default ?? result;
        // It is possible to have a nested `default` when using a TypeScript loader.
        result = result.default ?? result;
        const settingsOrFunction = await result;
        const settings = typeof settingsOrFunction === 'function' ? await settingsOrFunction() : settingsOrFunction;
        return new CSpellConfigFileJavaScript(url, settings);
    }
    catch (e) {
        _log('importJavaScript Error: %o', { url: url.href, error: e, hashSuffix });
        throw e;
    }
    finally {
        _log('importJavaScript Done: %o', { url: url.href, hashSuffix });
    }
}
export class LoaderJavaScript {
    hashSuffix = 1;
    async _load(req, next) {
        const { url } = req;
        const ext = extname(url.pathname).toLowerCase();
        switch (ext) {
            case '.js':
            case '.cjs':
            case '.mjs':
            case '.ts':
            case '.cts':
            case '.mts': {
                return importJavaScript(url, this.hashSuffix);
            }
        }
        return next(req);
    }
    load = this._load.bind(this);
    reset() {
        this.hashSuffix += 1;
    }
}
export const loaderJavaScript = new LoaderJavaScript();
//# sourceMappingURL=loaderJavaScript.js.map