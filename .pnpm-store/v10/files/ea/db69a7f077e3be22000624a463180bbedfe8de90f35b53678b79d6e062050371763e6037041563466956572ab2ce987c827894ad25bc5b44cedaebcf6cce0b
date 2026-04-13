/**
 * JSON module.
 */
export default class JSONModule {
    url;
    #window;
    #source;
    #exports = null;
    /**
     * Constructor.
     *
     * @param init Initialization options.
     */
    constructor(init) {
        this.#window = init.window;
        this.url = init.url;
        this.#source = init.source;
    }
    /**
     * Compiles and evaluates the module.
     *
     * @returns Module exports.
     */
    async evaluate() {
        if (this.#exports) {
            return this.#exports;
        }
        let result;
        try {
            result = JSON.parse(this.#source);
        }
        catch (error) {
            throw new this.#window.TypeError(`Failed to parse module "${this.url.href}": ${error.message}`);
        }
        this.#exports = { default: result };
        return this.#exports;
    }
    /**
     * Compiles and preloads the module and its imports.
     *
     * @returns Promise.
     */
    async preload() {
        await this.evaluate();
    }
}
//# sourceMappingURL=JSONModule.js.map