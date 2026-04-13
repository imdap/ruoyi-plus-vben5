const ASCII_LOWER_CASE_CACHE = new Map();
const ASCII_UPPER_CASE_CACHE = new Map();
const ASCII_UPPER_CASE_REGEXP = /[A-Z]/g;
const ASCII_LOWER_CASE_REGEXP = /[a-z]/g;
/**
 * String utility.
 */
export default class StringUtility {
    /**
     * ASCII lowercase.
     *
     * @see https://infra.spec.whatwg.org/#ascii-lowercase
     * @param text Text.
     * @returns Lowercase text.
     */
    static asciiLowerCase(text) {
        const cached = ASCII_LOWER_CASE_CACHE.get(text);
        if (cached) {
            return cached;
        }
        const newText = text.replace(ASCII_UPPER_CASE_REGEXP, (char) => String.fromCharCode(char.charCodeAt(0) + 32));
        ASCII_LOWER_CASE_CACHE.set(text, newText);
        return newText;
    }
    /**
     * ASCII uppercase.
     *
     * @see https://infra.spec.whatwg.org/#ascii-uppercase
     * @param text Text.
     * @returns Uppercase text.
     */
    static asciiUpperCase(text) {
        const cached = ASCII_UPPER_CASE_CACHE.get(text);
        if (cached) {
            return cached;
        }
        const newText = text.replace(ASCII_LOWER_CASE_REGEXP, (char) => String.fromCharCode(char.charCodeAt(0) - 32));
        ASCII_UPPER_CASE_CACHE.set(text, newText);
        return newText;
    }
}
//# sourceMappingURL=StringUtility.js.map