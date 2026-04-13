import type { URL } from 'url';
import type IModule from './types/IModule.js';
import type IModuleInit from './types/IModuleInit.js';
/**
 * JSON module.
 */
export default class JSONModule implements IModule {
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
        default: object;
    }>;
    /**
     * Compiles and preloads the module and its imports.
     *
     * @returns Promise.
     */
    preload(): Promise<void>;
}
//# sourceMappingURL=JSONModule.d.ts.map