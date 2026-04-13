import assert from 'node:assert';
export class Scope {
    value;
    parent;
    constructor(value, parent) {
        this.value = value;
        this.parent = parent;
    }
    /**
     * Convert the scope hierarchy to a string
     * @param ltr - return ancestry from left-to-right
     * @returns the scope hierarchy as a string separated by a space.
     */
    toString(ltr = false) {
        if (!this.parent)
            return this.value;
        return ltr ? this.parent.toString(ltr) + ' ' + this.value : this.value + ' ' + this.parent.toString(ltr);
    }
    static isScope(value) {
        return value instanceof Scope;
    }
}
/**
 * A Scope Pool is used to keep the number of scope chains down to a minimum. It ensure that if two scopes match,
 * then they will be the same object.
 */
export class ScopePool {
    pool = new Map();
    /**
     * Get a Scope that matches the scope. This method is idempotent.
     * @param scopeValue - a single scope value: i.e. `source.ts`
     * @param parent - optional parent Scope
     */
    getScope(scopeValue, parent) {
        const foundPoolMap = this.pool.get(scopeValue);
        const poolMap = foundPoolMap || new Map();
        if (poolMap !== foundPoolMap) {
            this.pool.set(scopeValue, poolMap);
        }
        const foundScope = poolMap.get(parent);
        if (foundScope)
            return foundScope.v;
        const scope = new Scope(scopeValue, parent);
        poolMap.set(parent, { v: scope });
        return scope;
    }
    parseScope(scopes, ltr = false) {
        if (Scope.isScope(scopes))
            return scopes;
        if (isScopeLike(scopes)) {
            const parent = scopes.parent ? this.parseScope(scopes.parent) : undefined;
            return this.getScope(scopes.value, parent);
        }
        return this.parseScopeString(scopes, ltr);
    }
    parseScopeString(scopes, ltr) {
        scopes = Array.isArray(scopes) ? scopes : scopes.split(' ');
        const parentToChild = ltr ? scopes : scopes.reverse();
        let parent = undefined;
        for (const value of parentToChild) {
            parent = this.getScope(value, parent);
        }
        assert(parent, 'Empty scope is not allowed.');
        return parent;
    }
}
function isScopeLike(value) {
    return typeof value === 'object' && !Array.isArray(value) && value.value !== undefined;
}
//# sourceMappingURL=scope.js.map