import { URL } from 'url';
import ECMAScriptModuleCompiler from './ECMAScriptModuleCompiler.js';
import * as PropertySymbol from '../PropertySymbol.js';
import WindowBrowserContext from '../window/WindowBrowserContext.js';
const EMPTY_COMPILED_RESULT = { imports: [], execute: async () => { } };
/**
 * ECMAScript module.
 */
export default class ECMAScriptModule {
    url;
    [PropertySymbol.window];
    #source;
    #sourceURL;
    #preloaded = false;
    #compiled = null;
    #exports = null;
    #evaluateQueue = null;
    #factory;
    /**
     * Constructor.
     *
     * @param init Initialization options.
     */
    constructor(init) {
        this[PropertySymbol.window] = init.window;
        this.url = init.url;
        this.#source = init.source;
        this.#sourceURL = init.sourceURL || null;
        this.#factory = init.factory;
    }
    /**
     * Compiles and evaluates the module.
     *
     * @param [parentUrls] Parent modules URLs to detect circular imports.
     * @param [circularResolver] Resolver for circular imports.
     * @returns Module exports.
     */
    async evaluate(parentUrls = [], circularResolver = null) {
        if (this.#evaluateQueue) {
            // Circular import detected
            if (parentUrls.includes(this.url.href)) {
                if (circularResolver) {
                    // Reloads imports after circular import is resolved
                    this.#evaluateQueue.push(circularResolver);
                }
                return this.#exports;
            }
            return new Promise((resolve) => {
                this.#evaluateQueue.push(resolve);
            });
        }
        if (this.#exports) {
            return this.#exports;
        }
        const compiled = this.#compile();
        const modulePromises = [];
        const window = this[PropertySymbol.window];
        const browserFrame = new WindowBrowserContext(window).getBrowserFrame();
        if (!browserFrame) {
            return {};
        }
        const exports = {};
        this.#exports = exports;
        this.#evaluateQueue = [];
        for (const moduleImport of compiled.imports) {
            modulePromises.push(this.#factory.getModule(moduleImport.url, {
                with: { type: moduleImport.type }
            }));
        }
        const imports = new Map();
        let circularImportResolver = null;
        const circularImportResolverCallback = () => {
            if (circularImportResolver) {
                circularImportResolver();
            }
        };
        if (modulePromises.length) {
            const modules = await Promise.all(modulePromises);
            const newParentUrls = [...parentUrls, this.url.href];
            for (const module of modules) {
                if (module instanceof ECMAScriptModule) {
                    const exports = await module.evaluate(newParentUrls, circularImportResolverCallback);
                    imports.set(module.url.href, exports);
                }
                else {
                    const exports = await module.evaluate();
                    imports.set(module.url.href, exports);
                }
            }
        }
        const href = this.url.href;
        compiled.execute({
            dispatchError: window[PropertySymbol.dispatchError].bind(window),
            dynamicImport: this.#factory.importModule.bind(this.#factory),
            importMeta: {
                url: href,
                resolve: (url) => new URL(url, href).href
            },
            imports,
            exports,
            addCircularImportResolver: (resolver) => (circularImportResolver = resolver)
        });
        const evaluateQueue = this.#evaluateQueue;
        this.#evaluateQueue = null;
        for (const resolve of evaluateQueue) {
            resolve(exports);
        }
        return exports;
    }
    /**
     * Compiles and preloads the module and its imports.
     *
     * @returns Promise.
     */
    async preload() {
        if (this.#preloaded) {
            return;
        }
        this.#preloaded = true;
        const compiled = this.#compile();
        const modulePromises = [];
        const window = this[PropertySymbol.window];
        const browserFrame = new WindowBrowserContext(window).getBrowserFrame();
        if (!browserFrame) {
            return;
        }
        for (const moduleImport of compiled.imports) {
            modulePromises.push(this.#factory.getModule(moduleImport.url, {
                with: { type: moduleImport.type }
            }));
        }
        const modules = await Promise.all(modulePromises);
        const promises = [];
        for (const module of modules) {
            promises.push(module.preload());
        }
        await Promise.all(promises);
    }
    /**
     * Compiles the module.
     */
    #compile() {
        if (this.#compiled) {
            return this.#compiled;
        }
        // In case of an error, the compiled module will be empty.
        this.#compiled = EMPTY_COMPILED_RESULT;
        const compiler = new ECMAScriptModuleCompiler(this[PropertySymbol.window]);
        this.#compiled = compiler.compile(this.url.href, this.#source, this.#sourceURL);
        return this.#compiled;
    }
}
//# sourceMappingURL=ECMAScriptModule.js.map