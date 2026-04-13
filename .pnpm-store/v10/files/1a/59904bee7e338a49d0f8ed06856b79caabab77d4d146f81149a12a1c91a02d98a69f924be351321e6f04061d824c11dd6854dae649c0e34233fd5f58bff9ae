export interface ServiceRequest<T extends string = string, P = unknown, R = unknown> {
    readonly type: T;
    readonly params: P;
    __r?: ServiceResponseBase<R>;
}
declare class BaseServiceRequest<T extends string, P, R> implements ServiceRequest<T, P, R> {
    readonly type: T;
    readonly params: P;
    readonly __r?: ServiceResponseBase<R>;
    constructor(type: T, params: P);
}
export declare class ServiceRequestCls<T extends string, P, R> extends BaseServiceRequest<T, P, R> {
    constructor(type: T, params: P);
}
interface ServiceResponseBase<T> {
    ___T?: T;
    value?: T;
    error?: Error | undefined;
}
export interface ServiceResponseSuccess<T> extends ServiceResponseBase<T> {
    value: T;
    error?: undefined;
}
export interface ServiceResponseFailure<T> extends ServiceResponseBase<T> {
    error: Error;
}
export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseFailure<T>;
export type IsARequest<T extends ServiceRequest> = (r: ServiceRequest) => r is T;
export declare function createResponse<R extends ServiceRequest, T = RequestResponseType<R>>(value: T, _req?: R): ServiceResponseSuccess<T>;
type VT<T> = T extends {
    ___T?: infer R;
} ? R : never;
export type RequestResponseType<T> = T extends {
    __r?: infer R;
} ? R : never;
export declare function createResponseFail<R extends ServiceRequest, E extends Error>(_request: R, error: E): ServiceResponseFailure<VT<RequestResponseType<R>>>;
export declare function isServiceResponseSuccess<T>(res: ServiceResponseBase<T>): res is ServiceResponseSuccess<T>;
export declare function isServiceResponseFailure<T>(res: ServiceResponseBase<T>): res is ServiceResponseFailure<T>;
export declare function isInstanceOfFn<T>(constructor: {
    new (): T;
}): (t: unknown) => t is T;
export declare const __testing__: {
    BaseServiceRequest: typeof BaseServiceRequest;
};
export {};
//# sourceMappingURL=request.d.ts.map