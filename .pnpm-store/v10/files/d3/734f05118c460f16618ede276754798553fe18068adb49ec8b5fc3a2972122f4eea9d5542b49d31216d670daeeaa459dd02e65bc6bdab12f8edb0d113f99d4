import type { Dispatcher } from './Dispatcher.js';
import type { Handler, HandleRequest, HandlerFn } from './handlers.js';
import type { RequestResponseType, ServiceRequest } from './request.js';
export declare class ServiceBus implements Dispatcher {
    readonly handlers: Handler[];
    constructor(handlers?: Handler[]);
    addHandler(handler: HandlerFn, name: string, description?: string): this;
    addHandler(handler: Handler): this;
    dispatch<R extends ServiceRequest>(request: R): RequestResponseType<R>;
    defaultHandler<T extends ServiceRequest>(request: T): RequestResponseType<T>;
    protected reduceHandlers<R extends ServiceRequest>(handlers: readonly Handler[], request: R, dispatcher: Dispatcher, defaultHandler: HandleRequest): HandleRequest;
}
export declare function createServiceBus(handlers?: Handler[]): ServiceBus;
//# sourceMappingURL=bus.d.ts.map