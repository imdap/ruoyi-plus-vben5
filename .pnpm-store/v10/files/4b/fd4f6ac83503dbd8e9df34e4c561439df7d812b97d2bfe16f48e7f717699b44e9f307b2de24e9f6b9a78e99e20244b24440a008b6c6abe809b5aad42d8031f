import type { ServiceRequest } from './request.js';
export declare class ErrorUnhandledRequest extends Error {
    readonly request: ServiceRequest;
    constructor(request: ServiceRequest);
}
export declare class ErrorServiceRequestDepthExceeded extends Error {
    readonly request: ServiceRequest;
    readonly depth: number;
    constructor(request: ServiceRequest, depth: number);
}
export declare class UnhandledHandlerError extends Error {
    readonly handlerName: string;
    readonly handlerDescription: string | undefined;
    readonly cause: unknown;
    constructor(handlerName: string, handlerDescription: string | undefined, cause: unknown);
}
export declare class ErrorDuplicateSubsystem extends Error {
    readonly subsystemName: string;
    constructor(subsystemName: string);
}
//# sourceMappingURL=errors.d.ts.map