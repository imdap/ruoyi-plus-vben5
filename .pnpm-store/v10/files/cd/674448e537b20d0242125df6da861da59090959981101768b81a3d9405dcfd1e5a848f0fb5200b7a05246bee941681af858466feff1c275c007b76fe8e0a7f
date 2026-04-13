export declare class PnpmError extends Error {
    readonly code: string;
    readonly hint?: string;
    attempts?: number;
    prefix?: string;
    pkgsStack?: Array<{
        id: string;
        name: string;
        version: string;
    }>;
    constructor(code: string, message: string, opts?: {
        attempts?: number;
        hint?: string;
        cause?: unknown;
    });
}
export interface FetchErrorResponse {
    status: number;
    statusText: string;
}
export interface FetchErrorRequest {
    url: string;
    authHeaderValue?: string;
}
export declare class FetchError extends PnpmError {
    readonly response: FetchErrorResponse;
    readonly request: FetchErrorRequest;
    constructor(request: FetchErrorRequest, response: FetchErrorResponse, hint?: string);
}
export declare class LockfileMissingDependencyError extends PnpmError {
    constructor(depPath: string);
}
