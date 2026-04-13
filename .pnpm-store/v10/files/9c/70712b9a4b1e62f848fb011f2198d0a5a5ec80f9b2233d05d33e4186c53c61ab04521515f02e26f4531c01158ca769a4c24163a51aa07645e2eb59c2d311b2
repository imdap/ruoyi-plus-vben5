import type BrowserWindow from '../window/BrowserWindow.js';
import { URL } from 'url';
import type IModule from './types/IModule.js';
import * as PropertySymbol from '../PropertySymbol.js';
import type IECMAScriptModuleInit from './types/IECMAScriptModuleInit.js';
/**
 * ECMAScript module.
 */
export default class ECMAScriptModule implements IModule {
    #private;
    readonly url: URL;
    readonly [PropertySymbol.window]: BrowserWindow;
    /**
     * Constructor.
     *
     * @param init Initialization options.
     */
    constructor(init: IECMAScriptModuleInit);
    /**
     * Compiles and evaluates the module.
     *
     * @param [parentUrls] Parent modules URLs to detect circular imports.
     * @param [circularResolver] Resolver for circular imports.
     * @returns Module exports.
     */
    evaluate(parentUrls?: string[], circularResolver?: (() => void) | null): Promise<{
        [key: string]: any;
    }>;
    /**
     * Compiles and preloads the module and its imports.
     *
     * @returns Promise.
     */
    preload(): Promise<void>;
}
//# sourceMappingURL=ECMAScriptModule.d.ts.map