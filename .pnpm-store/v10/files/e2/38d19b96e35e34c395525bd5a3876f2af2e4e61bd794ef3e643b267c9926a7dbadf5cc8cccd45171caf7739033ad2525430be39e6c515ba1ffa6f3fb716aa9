import type Response from '../Response.js';
/**
 * Preload entry.
 *
 * @see https://html.spec.whatwg.org/multipage/links.html#preload-entry
 */
export default class PreloadEntry {
    #private;
    integrityMetadata: string | null;
    response: Response | null;
    error: Error | null;
    /**
     * On response available.
     *
     * @returns Response.
     */
    onResponseAvailable(): Promise<Response>;
    /**
     * Response available.
     *
     * @param error
     * @param response
     */
    responseAvailable(error: Error | null, response: Response | null): void;
}
//# sourceMappingURL=PreloadEntry.d.ts.map