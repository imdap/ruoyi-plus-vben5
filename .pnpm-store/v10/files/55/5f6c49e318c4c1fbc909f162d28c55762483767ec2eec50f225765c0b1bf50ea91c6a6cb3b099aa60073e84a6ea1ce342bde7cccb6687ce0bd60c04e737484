import { createRequestHandler } from './createRequestHandler.js';
import { ServiceRequestCls } from './request.js';
export function requestFactory(requestType) {
    class RequestClass extends ServiceRequestCls {
        static type = requestType;
        constructor(params) {
            super(requestType, params);
        }
        static is(req) {
            return req instanceof RequestClass && req.type === requestType;
        }
        static create(params) {
            return new RequestClass(params);
        }
        static createRequestHandler(fn, name, description) {
            return createRequestHandler(RequestClass, fn, name, description);
        }
        static __request;
    }
    return RequestClass;
}
//# sourceMappingURL=requestFactory.js.map