import { ErrorServiceRequestDepthExceeded, ErrorUnhandledRequest, UnhandledHandlerError } from './errors.js';
import { createResponseFail } from './request.js';
const MAX_DEPTH = 10;
export class ServiceBus {
    handlers = [];
    constructor(handlers = []) {
        handlers.forEach((h) => this.addHandler(h));
    }
    addHandler(handler, name = 'anonymous', description) {
        const h = typeof handler === 'function' ? { fn: handler, name, description } : handler;
        const { fn, name: _name, description: _description } = h;
        this.handlers.push({ fn, name: _name, description: _description });
        return this;
    }
    dispatch(request) {
        let depth = 0;
        const dispatcher = { dispatch };
        const handler = this.reduceHandlers(this.handlers, request, dispatcher, this.defaultHandler);
        function dispatch(request) {
            ++depth;
            if (depth >= MAX_DEPTH) {
                return createResponseFail(request, new ErrorServiceRequestDepthExceeded(request, depth));
            }
            const response = handler(request);
            --depth;
            return response;
        }
        return dispatch(request);
    }
    defaultHandler(request) {
        return createResponseFail(request, new ErrorUnhandledRequest(request));
    }
    reduceHandlers(handlers, request, dispatcher, defaultHandler) {
        const _handlers = handlers.map((m) => ({ ...m, fn: m.fn(dispatcher) }));
        const handler = _handlers.reduce((next, h) => {
            const fn = h.fn(next);
            return (req) => {
                try {
                    return fn(req);
                }
                catch (e) {
                    return createResponseFail(request, new UnhandledHandlerError(h.name, h.description, e));
                }
            };
        }, defaultHandler);
        return handler;
    }
}
export function createServiceBus(handlers = []) {
    return new ServiceBus(handlers);
}
//# sourceMappingURL=bus.js.map