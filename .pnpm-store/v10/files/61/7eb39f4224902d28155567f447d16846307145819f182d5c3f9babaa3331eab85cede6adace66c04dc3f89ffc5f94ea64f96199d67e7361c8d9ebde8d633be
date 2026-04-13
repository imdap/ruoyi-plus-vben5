import type BrowserWindow from '../window/BrowserWindow.js';
import type { URL } from 'url';
import type IModule from './types/IModule.js';
interface IUnresolvedModuleInit {
    window: BrowserWindow;
    url: URL;
}
/**
 * CSS module.
 */
export default class UnresolvedModule implements IModule {
    #private;
    readonly url: URL;
    /**
     * Constructor.
     *
     * @param init Initialization options.
     */
    constructor(init: IUnresolvedModuleInit);
    /**
     * Compiles and evaluates the module.
     *
     * @returns Module exports.
     */
    evaluate(): Promise<any>;
    /**
     * Compiles and preloads the module and its imports.
     *
     * @returns Promise.
     */
    preload(): Promise<void>;
    /**
     * Add a hook to be called when the module is resolved.
     *
     * @param resolve Resolve.
     * @param reject Reject.
     */
    addResolveListener(resolve: (value: unknown) => void, reject: (error: Error) => void): void;
    /**
     * Resolves the module.
     *
     * @param [error] Error.
     */
    resolve(error?: Error): void;
}
export {};
//# sourceMappingURL=UnresolvedModule.d.ts.map