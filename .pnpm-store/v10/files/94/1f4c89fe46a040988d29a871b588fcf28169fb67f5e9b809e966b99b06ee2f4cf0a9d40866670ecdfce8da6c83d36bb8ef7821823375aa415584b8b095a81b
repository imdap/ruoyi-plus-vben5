import * as _nuxt_schema from '@nuxt/schema';
import { CookiesStorageOptions } from '../dist/nuxt/runtime/storages.js';
import { StateTree, PiniaPluginContext } from 'pinia';

type IsAny<T> = unknown extends T ? ([keyof T] extends [never] ? false : true) : false;
type ExcludeArrayKeys<T> = T extends ArrayLike<any> ? Exclude<keyof T, keyof any[]> : keyof T;
type PathImpl<T, Key extends keyof T> = Key extends string ? IsAny<T[Key]> extends true ? never : T[Key] extends Record<string, any> ? `${Key}.${PathImpl<T[Key], ExcludeArrayKeys<T[Key]>> & string}` | `${Key}.${ExcludeArrayKeys<T[Key]> & string}` : never : never;
type Path<T> = keyof T extends string ? (PathImpl<T, keyof T> | keyof T) extends infer P ? P extends string | keyof T ? P : keyof T : keyof T : never;
/**
 * Synchronous storage based on Web Storage API.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
interface StorageLike {
    /**
     * Get a key's value if it exists.
     */
    getItem: (key: string) => string | null;
    /**
     * Set a key with a value, or update it if it exists.
     */
    setItem: (key: string, value: string) => void;
}
/**
 * Serializer implementation to stringify/parse state.
 */
interface Serializer {
    /**
     * Serialize state into string before storing.
     * @default JSON.stringify
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     */
    serialize: (data: StateTree) => string;
    /**
     * Deserializes string into state before hydrating.
     * @default JSON.parse
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
     */
    deserialize: (data: string) => StateTree;
}
interface Persistence<State extends StateTree = StateTree> {
    key: string;
    /**
     * Log errors in console.
     * @default false
     */
    debug: boolean;
    /**
     * Synchronous storage to persist the state.
     */
    storage: StorageLike;
    /**
     * Serializer to serialize/deserialize state into storage.
     */
    serializer: Serializer;
    /**
     * Hook called before hydrating store.
     */
    beforeHydrate?: (context: PiniaPluginContext) => void;
    /**
     * Hook called after hydrating store.
     */
    afterHydrate?: (context: PiniaPluginContext) => void;
    /**
     * Dot-notation paths to pick from state before persisting.
     */
    pick?: Path<State>[] | string[];
    /**
     * Dot-notation paths to omit from state before persisting.
     */
    omit?: Path<State>[] | string[];
}
type PersistenceOptions<State extends StateTree = StateTree> = Partial<Omit<Persistence<State>, 'key'>> & {
    /**
     * Storage key to use.
     * @default $store.id
     */
    key?: ((s: string) => string) | string;
};
type Persist<State extends StateTree = StateTree> = boolean | PersistenceOptions<State> | PersistenceOptions<State>[];
declare module 'pinia' {
    interface DefineStoreOptionsBase<S extends StateTree, Store> {
        /**
         * Persist store in storage
         * @see https://codeberg.org/praz/pinia-plugin-persistedstate
         */
        persist?: Persist<S>;
    }
    interface PiniaCustomProperties {
        /**
         * Hydrate store from configured storage
         * Warning: this is for advances usecases, make sure you know what you're doing
         */
        $hydrate: (opts?: {
            runHooks?: boolean;
        }) => void;
        /**
         * Persist store into configured storage
         * Warning: this is for advances usecases, make sure you know what you're doing
         */
        $persist: () => void;
    }
}

type ModuleOptions = Pick<PersistenceOptions, 'debug'> & {
    /**
     * Default storage for persistence. Only accepts presets.
     */
    storage?: 'cookies' | 'localStorage' | 'sessionStorage';
    /**
     * Global key template, allow pre/postfixing store keys.
     * @example 'my-%id-persistence' will yield 'my-<store-id>-persistence'
     */
    key?: `${string}%id${string}`;
    /**
     * Options used globally by default cookie storage.
     * Ignored for other storages.
     */
    cookieOptions?: Omit<CookiesStorageOptions, 'encode' | 'decode'>;
    /**
     * Automatically persist all stores with global defaults, opt-out individually.
     */
    auto?: boolean;
};
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        piniaPluginPersistedstate: ModuleOptions;
    }
}

export { _default as default };
