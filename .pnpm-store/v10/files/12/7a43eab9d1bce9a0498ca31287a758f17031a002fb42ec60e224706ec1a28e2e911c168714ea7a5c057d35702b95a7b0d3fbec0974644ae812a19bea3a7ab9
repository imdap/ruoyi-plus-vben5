import { isError } from '../../util/errors.js';
export class ImportError extends Error {
    cause;
    constructor(msg, cause) {
        if (isError(cause)) {
            msg += `\n  ${cause.message}`;
        }
        super(msg);
        this.cause = isError(cause) ? cause : undefined;
    }
}
export class UnsupportedSchema extends Error {
    constructor(msg) {
        super(msg);
    }
}
export class UnsupportedPnpFile extends Error {
    constructor(msg) {
        super(msg);
    }
}
//# sourceMappingURL=ImportError.js.map