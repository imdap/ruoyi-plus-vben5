/**
 * CSS module.
 */
export default class CSSModule {
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
        const styleSheet = new this.#window.CSSStyleSheet();
        styleSheet.replaceSync(this.#source);
        this.#exports = { default: styleSheet };
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
//# sourceMappingURL=CSSModule.js.map