/**
 * Same as `React.useCallback` but always return a memoized function
 * but redirect to real function.
 * In Vue, we use shallowRef to store the callback reference.
 */
export default function useRefFunc<T extends (...args: any[]) => any>(callback: T): T;
