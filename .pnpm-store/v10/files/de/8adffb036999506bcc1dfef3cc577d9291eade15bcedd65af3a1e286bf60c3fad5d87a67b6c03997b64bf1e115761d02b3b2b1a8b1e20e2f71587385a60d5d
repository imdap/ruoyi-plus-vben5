export function createRequestHandler(requestDef, fn, name, description) {
    return createIsRequestHandler(requestDef.is, fn, name ?? requestDef.type, description);
}
export function createIsRequestHandlerFn(isA, fn) {
    return (dispatcher) => (next) => (request) => (isA(request) ? fn(request, next, dispatcher) : next(request));
}
export function createIsRequestHandler(isA, fn, name, description) {
    return {
        fn: createIsRequestHandlerFn(isA, fn),
        name,
        description,
    };
}
//# sourceMappingURL=createRequestHandler.js.map