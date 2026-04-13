export declare class Scope {
    readonly value: string;
    readonly parent?: Scope | undefined;
    constructor(value: string, parent?: Scope | undefined);
    /**
     * Convert the scope hierarchy to a string
     * @param ltr - return ancestry from left-to-right
     * @returns the scope hierarchy as a string separated by a space.
     */
    toString(ltr?: boolean): string;
    static isScope(value: unknown): value is Scope;
}
/**
 * A Scope Pool is used to keep the number of scope chains down to a minimum. It ensure that if two scopes match,
 * then they will be the same object.
 */
export declare class ScopePool {
    private pool;
    /**
     * Get a Scope that matches the scope. This method is idempotent.
     * @param scopeValue - a single scope value: i.e. `source.ts`
     * @param parent - optional parent Scope
     */
    getScope(scopeValue: string, parent?: Scope): Scope;
    /**
     *
     * @param scopes - the scope as a string or array of strings
     *   i.e. `
     * @param ltr - left-to-right ancestry
     */
    parseScope(scopes: Scope | ScopeLike): Scope;
    parseScope(scopes: string | ScopeLike): Scope;
    parseScope(scopes: string | string[], ltr?: boolean): Scope;
    private parseScopeString;
}
interface ScopeLike {
    readonly value: string;
    readonly parent?: ScopeLike | undefined;
}
export {};
//# sourceMappingURL=scope.d.ts.map