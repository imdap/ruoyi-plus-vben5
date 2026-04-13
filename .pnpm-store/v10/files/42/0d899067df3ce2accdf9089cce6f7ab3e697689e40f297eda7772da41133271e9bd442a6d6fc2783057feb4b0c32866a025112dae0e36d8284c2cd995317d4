/**
 * CSS module.
 */
export default class UnresolvedModule {
    url;
    #window;
    #hooks = [];
    #error = null;
    /**
     * Constructor.
     *
     * @param init Initialization options.
     */
    constructor(init) {
        this.#window = init.window;
        this.url = init.url;
    }
    /**
     * Compiles and evaluates the module.
     *
     * @returns Module exports.
     */
    async evaluate() {
        throw new this.#window.TypeError('Unresolved module. We should never end up here.');
    }
    /**
     * Compiles and preloads the module and its imports.
     *
     * @returns Promise.
     */
    async preload() {
        throw new this.#window.TypeError('Unresolved module. We should never end up here.');
    }
    /**
     * Add a hook to be called when the module is resolved.
     *
     * @param resolve Resolve.
     * @param reject Reject.
     */
    addResolveListener(resolve, reject) {
        if (this.#error) {
            reject(this.#error);
            return;
        }
        this.#hooks.push({ resolve, reject });
    }
    /**
     * Resolves the module.
     *
     * @param [error] Error.
     */
    resolve(error) {
        if (error) {
            this.#error = error;
        }
        for (const hook of this.#hooks) {
            if (error) {
                hook.reject(error);
            }
            else {
                hook.resolve(null);
            }
        }
    }
}
//# sourceMappingURL=UnresolvedModule.js.map