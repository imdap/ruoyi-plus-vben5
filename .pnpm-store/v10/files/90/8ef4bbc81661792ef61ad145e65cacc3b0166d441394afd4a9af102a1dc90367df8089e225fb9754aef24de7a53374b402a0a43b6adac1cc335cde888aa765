import type { URL } from 'url';
import type IModule from './types/IModule.js';
import type CSSStyleSheet from '../css/CSSStyleSheet.js';
import type IModuleInit from './types/IModuleInit.js';
/**
 * CSS module.
 */
export default class CSSModule implements IModule {
    #private;
    readonly url: URL;
    /**
     * Constructor.
     *
     * @param init Initialization options.
     */
    constructor(init: IModuleInit);
    /**
     * Compiles and evaluates the module.
     *
     * @returns Module exports.
     */
    evaluate(): Promise<{
        default: CSSStyleSheet;
    }>;
    /**
     * Compiles and preloads the module and its imports.
     *
     * @returns Promise.
     */
    preload(): Promise<void>;
}
//# sourceMappingURL=CSSModule.d.ts.map