import type { CookieOptions } from '#app';
import type { StorageLike } from '../types.js';
export type CookiesStorageOptions = Omit<CookieOptions, 'default' | 'watch' | 'readonly' | 'filter'>;
/**
 * Cookie-based storage. Cookie options can be passed as parameter.
 * Uses Nuxt's `useCookie` under the hood.
 */
declare function cookies(options?: CookiesStorageOptions): StorageLike;
/**
 * LocalStorage-based storage.
 * Warning: only works client-side.
 */
declare function localStorage(): StorageLike;
/**
 * SessionStorage-based storage.
 * Warning: only works client-side.
 */
declare function sessionStorage(): StorageLike;
export declare const storages: {
    cookies: typeof cookies;
    localStorage: typeof localStorage;
    sessionStorage: typeof sessionStorage;
};
export {};
