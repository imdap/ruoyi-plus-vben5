import CookieStringUtility from '../../cookie/urilities/CookieStringUtility.js';
/**
 * Fetch request validation utility.
 */
export default class FetchResponseHeaderUtility {
    /**
     * Appends headers to response.
     *
     * @param nodeResponse HTTP request.
     * @param options
     * @param options.browserFrame
     * @param options.requestURL
     * @param options.rawHeaders
     * @returns Headers.
     */
    static parseResponseHeaders(options) {
        const headers = new options.browserFrame.window.Headers();
        let key = null;
        for (const header of options.rawHeaders) {
            if (!key) {
                key = header;
            }
            else {
                const lowerName = key.toLowerCase();
                // Handles setting cookie headers to the document.
                // "Set-Cookie" and "Set-Cookie2" are not allowed in response headers according to spec.
                if (lowerName === 'set-cookie' || lowerName === 'set-cookie2') {
                    const cookie = CookieStringUtility.stringToCookie(options.requestURL, header);
                    if (cookie) {
                        options.browserFrame.page.context.cookieContainer.addCookies([cookie]);
                    }
                }
                else {
                    headers.append(key, header);
                }
                key = null;
            }
        }
        return headers;
    }
}
//# sourceMappingURL=FetchResponseHeaderUtility.js.map