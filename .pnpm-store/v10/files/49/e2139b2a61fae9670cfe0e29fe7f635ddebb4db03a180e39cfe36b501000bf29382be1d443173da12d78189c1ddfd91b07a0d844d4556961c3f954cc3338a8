import DefaultCookie from './DefaultCookie.js';
import CookieExpireUtility from './urilities/CookieExpireUtility.js';
import CookieURLUtility from './urilities/CookieURLUtility.js';
/**
 * Cookie Container.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie.
 */
export default class CookieContainer {
    #cookies = [];
    /**
     * Adds cookies.
     *
     * @param cookies Cookies.
     */
    addCookies(cookies) {
        const indexMap = new Map();
        const getKey = (cookie) => `${cookie.key}-${cookie.originURL.hostname}-${cookie.path}-${typeof cookie.value}`;
        // Creates a map of cookie key, domain, path and value to index.
        for (let i = 0, max = this.#cookies.length; i < max; i++) {
            indexMap.set(getKey(this.#cookies[i]), i);
        }
        for (const cookie of cookies) {
            const newCookie = Object.assign({}, DefaultCookie, cookie);
            if (newCookie && newCookie.key && newCookie.originURL) {
                // Remove existing cookie with same name, domain and path.
                const index = indexMap.get(getKey(newCookie));
                if (index !== undefined) {
                    this.#cookies.splice(index, 1);
                }
                if (!CookieExpireUtility.hasExpired(newCookie)) {
                    indexMap.set(getKey(newCookie), this.#cookies.length);
                    this.#cookies.push(newCookie);
                }
            }
        }
    }
    /**
     * Returns cookies.
     *
     * @param [url] URL.
     * @param [httpOnly] "true" if only http cookies should be returned.
     * @returns Cookies.
     */
    getCookies(url = null, httpOnly = false) {
        const cookies = [];
        for (const cookie of this.#cookies) {
            if (!CookieExpireUtility.hasExpired(cookie) &&
                (!httpOnly || !cookie.httpOnly) &&
                (!url || CookieURLUtility.cookieMatchesURL(cookie, url))) {
                cookies.push(cookie);
            }
        }
        return cookies;
    }
    /**
     * Clears all cookies.
     */
    clearCookies() {
        this.#cookies = [];
    }
}
//# sourceMappingURL=CookieContainer.js.map