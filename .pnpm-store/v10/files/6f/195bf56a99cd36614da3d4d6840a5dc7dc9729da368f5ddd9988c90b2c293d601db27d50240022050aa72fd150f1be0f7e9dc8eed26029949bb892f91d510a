import { assert } from './assert.js';
import { createServiceBus, ServiceBus } from './bus.js';
import { createRequestHandler } from './createRequestHandler.js';
import { ErrorDuplicateSubsystem } from './errors.js';
import { createResponse } from './request.js';
import { requestFactory } from './requestFactory.js';
class SystemServiceBusImpl {
    serviceBus;
    _subsystems;
    constructor() {
        this.serviceBus = createServiceBus();
        this._subsystems = new Map();
        this.bindDefaultHandlers();
        this.createSubsystem('Default Subsystem', '' /* match everything */);
    }
    bindDefaultHandlers() {
        this.serviceBus.addHandler(createRequestHandler(RequestCreateSubsystemFactory, (req) => {
            const { name, requestPattern } = req.params;
            if (this._subsystems.has(name)) {
                throw new ErrorDuplicateSubsystem(name);
            }
            const sub = createSubsystemServiceBus(name, requestPattern);
            this._subsystems.set(name, sub);
            this.serviceBus.addHandler(sub.handler);
            return createResponse(sub);
        }));
    }
    dispatch(request) {
        return this.serviceBus.dispatch(request);
    }
    createSubsystem(name, requestPattern) {
        const res = this.dispatch(RequestCreateSubsystemFactory.create({ name, requestPattern }));
        assert(res?.value);
        return res.value;
    }
    registerHandler(requestPrefix, handler) {
        const request = RequestRegisterHandlerFactory.create({ requestPrefix, handler });
        this.serviceBus.dispatch(request);
        return this;
    }
    registerRequestHandler(requestDef, fn, name, description) {
        this.registerHandler(requestDef.type, createRequestHandler(requestDef, fn, name, description));
        return this;
    }
    get subsystems() {
        return new Map(this._subsystems);
    }
}
export function createSystemServiceBus() {
    return new SystemServiceBusImpl();
}
const TypeRequestRegisterHandler = 'System:RegisterHandler';
export const RequestRegisterHandlerFactory = requestFactory(TypeRequestRegisterHandler);
const TypeRequestCreateSubsystem = 'System:CreateSubsystem';
export const RequestCreateSubsystemFactory = requestFactory(TypeRequestCreateSubsystem);
class SubsystemServiceBusImpl extends ServiceBus {
    name;
    requestPattern;
    handler;
    canHandleType;
    constructor(name, requestPattern) {
        super();
        this.name = name;
        this.requestPattern = requestPattern;
        this.canHandleType =
            typeof requestPattern === 'string'
                ? (reqType) => reqType.startsWith(requestPattern)
                : (reqType) => requestPattern.test(reqType);
        const handleRegistration = createRequestHandler(RequestRegisterHandlerFactory, (req, next) => this.handleRegistrationReq(req, next), 'Subsystem Register Handlers for ' + name, `Matches against: <${requestPattern.toString()}>`);
        this.addHandler(handleRegistration);
        this.handler = {
            name: 'Subsystem: ' + name,
            description: `Process Requests Matching: <${requestPattern.toString()}>`,
            fn: (dispatcher) => this._handler(dispatcher),
        };
    }
    handleRegistrationReq(request, next) {
        // console.log(`${this.name}.handleRegistrationReq %o`, request);
        if (!this.canHandleType(request.params.requestPrefix)) {
            // console.log(`${this.name}.handleRegistrationReq skip`);
            return next(request);
        }
        // console.log(`${this.name}.handleRegistrationReq add ***`);
        this.addHandler(request.params.handler);
        return createResponse(this);
    }
    _handler(dispatcher) {
        return (next) => (req) => {
            if (!this.canHandleType(req.type) && !RequestRegisterHandlerFactory.is(req))
                return next(req);
            const dispatch = this.reduceHandlers(this.handlers, req, dispatcher, next);
            return dispatch(req);
        };
    }
}
export function createSubsystemServiceBus(name, requestPattern) {
    return new SubsystemServiceBusImpl(name, requestPattern);
}
//# sourceMappingURL=SystemServiceBus.js.map