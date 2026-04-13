/**
 * Utility for preloading resources.
 *
 * @see https://html.spec.whatwg.org/multipage/links.html#link-type-preload
 */
export default class PreloadUtility {
    /**
     * Returns a key for a preload entry.
     *
     * @param options Options.
     * @param options.url URL.
     * @param options.destination Destination.
     * @param options.mode Mode.
     * @param options.credentialsMode Credentials mode.
     * @returns Key.
     */
    static getKey(options) {
        return JSON.stringify({
            url: options.url,
            destination: options.destination,
            mode: options.mode,
            credentialsMode: options.credentialsMode
        });
    }
}
//# sourceMappingURL=PreloadUtility.js.map