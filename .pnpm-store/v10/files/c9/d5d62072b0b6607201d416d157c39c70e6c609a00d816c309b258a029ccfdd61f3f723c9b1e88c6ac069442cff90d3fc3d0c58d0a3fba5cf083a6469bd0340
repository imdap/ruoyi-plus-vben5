"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockfileMissingDependencyError = exports.FetchError = exports.PnpmError = void 0;
const constants_1 = require("@pnpm/constants");
class PnpmError extends Error {
    code;
    hint;
    attempts;
    prefix;
    pkgsStack;
    constructor(code, message, opts) {
        super(message, { cause: opts?.cause });
        this.code = code.startsWith('ERR_PNPM_') ? code : `ERR_PNPM_${code}`;
        this.hint = opts?.hint;
        this.attempts = opts?.attempts;
    }
}
exports.PnpmError = PnpmError;
class FetchError extends PnpmError {
    response;
    request;
    constructor(request, response, hint) {
        const _request = {
            url: request.url,
        };
        if (request.authHeaderValue) {
            _request.authHeaderValue = hideAuthInformation(request.authHeaderValue);
        }
        const message = `GET ${request.url}: ${response.statusText} - ${response.status}`;
        // NOTE: For security reasons, some registries respond with 404 on authentication errors as well.
        // So we print authorization info on 404 errors as well.
        if (response.status === 401 || response.status === 403 || response.status === 404) {
            hint = hint ? `${hint}\n\n` : '';
            if (_request.authHeaderValue) {
                hint += `An authorization header was used: ${_request.authHeaderValue}`;
            }
            else {
                hint += 'No authorization header was set for the request.';
            }
        }
        super(`FETCH_${response.status}`, message, { hint });
        this.request = _request;
        this.response = response;
    }
}
exports.FetchError = FetchError;
function hideAuthInformation(authHeaderValue) {
    const [authType, token] = authHeaderValue.split(' ');
    if (token == null)
        return '[hidden]';
    if (token.length < 20) {
        return `${authType} [hidden]`;
    }
    return `${authType} ${token.substring(0, 4)}[hidden]`;
}
class LockfileMissingDependencyError extends PnpmError {
    constructor(depPath) {
        const message = `Broken lockfile: no entry for '${depPath}' in ${constants_1.WANTED_LOCKFILE}`;
        super('LOCKFILE_MISSING_DEPENDENCY', message, {
            hint: 'This issue is probably caused by a badly resolved merge conflict.\n' +
                'To fix the lockfile, run \'pnpm install --no-frozen-lockfile\'.',
        });
    }
}
exports.LockfileMissingDependencyError = LockfileMissingDependencyError;
//# sourceMappingURL=index.js.map