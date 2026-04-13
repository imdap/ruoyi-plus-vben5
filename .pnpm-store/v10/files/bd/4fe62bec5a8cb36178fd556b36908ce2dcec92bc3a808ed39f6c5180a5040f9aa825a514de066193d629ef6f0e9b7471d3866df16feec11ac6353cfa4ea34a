import type IModule from './types/IModule.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type Location from '../location/Location.js';
/**
 * Module factory.
 */
export default class ModuleFactory {
    private window;
    private parentURL;
    /**
     * Constructor.
     *
     * @param window Window.
     * @param parentURL Parent URL.
     */
    constructor(window: BrowserWindow, parentURL: URL | Location);
    /**
     * Fetches the source code of the module from the given URL and creates a new module instance.
     *
     * @param url Module URL.
     * @param [parent] Parent module.
     * @param [options] Options.
     * @param [options.with] Options.
     * @param [options.with.type] Module type.
     */
    getModule(url: string, options?: {
        with?: {
            type?: string;
        };
    }): Promise<IModule>;
    /**
     * Imports a module.
     *
     * @param window Window.
     * @param parentURL Parent URL.
     * @param url URL.
     * @param [options] Options.
     * @param [options.with] With.
     * @param [options.with.type] Type.
     */
    importModule(url: string, options?: {
        with?: {
            type?: string;
        };
    }): Promise<{
        [key: string]: any;
    }>;
}
//# sourceMappingURL=ModuleFactory.d.ts.map