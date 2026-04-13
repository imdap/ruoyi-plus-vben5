export class SpellingDictionaryLoadError extends Error {
    uri;
    options;
    cause;
    name;
    constructor(uri, options, cause, message) {
        super(message);
        this.uri = uri;
        this.options = options;
        this.cause = cause;
        this.name = options.name;
    }
}
export function isSpellingDictionaryLoadError(e) {
    return e instanceof SpellingDictionaryLoadError;
}
//# sourceMappingURL=SpellingDictionaryError.js.map