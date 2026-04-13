import type { Dispatcher } from './Dispatcher.js';
import type { Handler, HandleRequestFn } from './handlers.js';
import type { ServiceRequest } from './request.js';
import type { RequestFactory } from './requestFactory.js';
import type { ServiceRequestFactory } from './ServiceRequestFactory.js';
export interface SystemServiceBus extends Dispatcher {
    registerHandler(requestPrefix: string, handler: Handler): this;
    registerRequestHandler<T extends ServiceRequest>(requestDef: ServiceRequestFactory<T>, fn: HandleRequestFn<T>, name?: string | undefined, description?: string | undefined): this;
    createSubsystem(name: string, requestPattern: string | RegExp): SubsystemServiceBus;
    readonly subsystems: Map<string, SubsystemServiceBus>;
}
export declare function createSystemServiceBus(): SystemServiceBus;
declare const TypeRequestRegisterHandler: "System:RegisterHandler";
export declare const RequestRegisterHandlerFactory: RequestFactory<typeof TypeRequestRegisterHandler, {
    readonly requestPrefix: string;
    readonly handler: Handler;
}, SubsystemServiceBus>;
declare const TypeRequestCreateSubsystem: "System:CreateSubsystem";
export declare const RequestCreateSubsystemFactory: RequestFactory<typeof TypeRequestCreateSubsystem, {
    readonly name: string;
    readonly requestPattern: string | RegExp;
}, SubsystemServiceBus>;
interface SubsystemServiceBus extends Dispatcher {
    readonly name: string;
    readonly requestPattern: string | RegExp;
    readonly handler: Handler;
}
export declare function createSubsystemServiceBus(name: string, requestPattern: string | RegExp): SubsystemServiceBus;
export {};
//# sourceMappingURL=SystemServiceBus.d.ts.map