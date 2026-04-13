export type Handler<T, K extends keyof T> = (src: Readonly<T>, dst: T, key: K) => void;
export type Handlers<T> = {
    [key in keyof T]-?: Handler<T, key>;
};
/**
 * Clones the properties from src to dst using the provided handlers.
 * @param src
 * @param dst
 * @param handlers
 * @param keys
 * @returns
 */
export declare function cloneInto<T, K extends keyof T>(src: Readonly<T>, dst: Partial<T>, handlers: Handlers<T>, keys?: K[]): Pick<T, K>;
export declare function skip<T, K extends keyof T>(_src: Readonly<T>, _dst: T, _key: K): void;
/**
 * Copy the property from src to dst.
 * If the property is undefined, it is not copied.
 * @param src - source object
 * @param dst - destination object
 * @param key - property key
 */
export declare function copy0<T, K extends keyof T>(src: Readonly<T>, dst: T, key: K): void;
/**
 * Copy the property from src to dst.
 * If the property is undefined, it is not copied.
 * If the property is an array, a shallow copy of the array is made.
 * If the property is a Set, a shallow copy of the Set is made.
 * If the property is a Map, a shallow copy of the Map is made.
 * If the property is an object, a shallow copy of the object is made.
 * @param src - source object
 * @param dst - destination object
 * @param key - property key
 */
export declare function copy1<T, K extends keyof T>(src: Readonly<T>, dst: T, key: K): void;
//# sourceMappingURL=clone.d.ts.map