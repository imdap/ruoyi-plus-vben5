/**
 * Take out a lock. When this function returns (asynchronously),
 * you have the lock.
 * @param {string} key - The key to lock on. Anyone else who
 *   tries to lock on the same key will need to wait for it to
 *   be unlocked.
 */
export function lock(key: string): Promise<unknown>;
/**
 * Release a lock.
 * @param {string} key - The key to release the lock for.
 *   The next person in line will now be able to take out
 *   the lock for that key.
 */
export function unlock(key: string): Promise<unknown>;
/**
 * Acquire a lock, do an action, and then release the lock.
 * This is a helper function that combines lock() and unlock()
 * in a safe way.
 * @param {string} key
 * @param {function} fn
 * @returns Whatever fn returns
 */
export function doWithLock<TFunctionReturnType>(
  key: string, fn: () => (Promise<TFunctionReturnType> | TFunctionReturnType)
): Promise<TFunctionReturnType>;
