class BaseServiceRequest {
    type;
    params;
    __r;
    constructor(type, params) {
        this.type = type;
        this.params = params;
    }
}
export class ServiceRequestCls extends BaseServiceRequest {
    constructor(type, params) {
        super(type, params);
    }
}
export function createResponse(value, _req) {
    return { value };
}
export function createResponseFail(_request, error) {
    return { error };
}
export function isServiceResponseSuccess(res) {
    return 'value' in res && res.error === undefined;
}
export function isServiceResponseFailure(res) {
    return res.error !== undefined;
}
export function isInstanceOfFn(constructor) {
    return (t) => t instanceof constructor;
}
export const __testing__ = {
    BaseServiceRequest,
};
//# sourceMappingURL=request.js.map