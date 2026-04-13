export class ErrorUnhandledRequest extends Error {
    request;
    constructor(request) {
        super(`Unhandled Request: ${request.type}`);
        this.request = request;
    }
}
export class ErrorServiceRequestDepthExceeded extends Error {
    request;
    depth;
    constructor(request, depth) {
        super(`Service Request Depth ${depth} Exceeded: ${request.type}`);
        this.request = request;
        this.depth = depth;
    }
}
export class UnhandledHandlerError extends Error {
    handlerName;
    handlerDescription;
    cause;
    constructor(handlerName, handlerDescription, cause) {
        super(`Unhandled Error in Handler: ${handlerName}`);
        this.handlerName = handlerName;
        this.handlerDescription = handlerDescription;
        this.cause = cause;
    }
}
export class ErrorDuplicateSubsystem extends Error {
    subsystemName;
    constructor(subsystemName) {
        super(`Duplicate subsystem: ${subsystemName}`);
        this.subsystemName = subsystemName;
    }
}
//# sourceMappingURL=errors.js.map