declare function getTypeOf(t: unknown): 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';
export declare function isErrnoException(e: unknown): e is NodeJS.ErrnoException;
export declare function isError(e: unknown): e is Error;
export declare function toError(e: unknown, errorFactory?: UnknownErrorConstructor): Error;
interface UnknownErrorConstructor {
    new (cause: unknown): Error;
}
export declare class UnknownError extends Error {
    readonly cause: unknown;
    constructor(cause: unknown);
}
type ErrorHandler<T> = (err: unknown) => T | undefined;
type ErrorHandlerP<T> = (err: unknown) => T | Promise<T> | undefined;
export declare function catchPromiseError<T>(p: undefined, handler: ErrorHandlerP<T>): undefined;
export declare function catchPromiseError<T>(p: Promise<T>, handler: ErrorHandlerP<T>): Promise<T | undefined>;
export declare function catchPromiseError<T>(p: Promise<T> | undefined, handler: ErrorHandler<T>): Promise<T | undefined> | undefined;
export declare function wrapCall<U>(fn: (...p: []) => U, handler: ErrorHandler<U>): (...p: []) => U | undefined;
export declare function wrapCall<P0, U>(fn: (...p: [P0]) => U, handler: ErrorHandler<U>): (...p: [P0]) => U | undefined;
export declare function wrapCall<P0, P1, U>(fn: (...p: [P0, P1]) => U, handler: ErrorHandler<U>): (...p: [P0, P1]) => U | undefined;
export declare function wrapCall<P extends unknown[], U>(fn: (...p: P) => U, handler: ErrorHandler<U>): (...p: P[]) => U | undefined;
export declare const __testing__: {
    getTypeOf: typeof getTypeOf;
};
export {};
//# sourceMappingURL=errors.d.ts.map