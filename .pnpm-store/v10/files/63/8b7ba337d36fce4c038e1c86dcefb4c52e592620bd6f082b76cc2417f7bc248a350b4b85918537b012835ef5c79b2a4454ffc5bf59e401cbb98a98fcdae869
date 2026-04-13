var _process_versions;
let baseUrl;
// @ts-ignore
if (typeof Deno !== "undefined") {
    // @ts-ignore
    baseUrl = new URL("file://" + Deno.cwd() + "/");
} else if (typeof process !== "undefined" && ((_process_versions = process.versions) === null || _process_versions === void 0 ? void 0 : _process_versions.node)) {
    baseUrl = new URL("file://" + process.cwd() + "/");
} else if (typeof document !== "undefined") {
    const baseEl = document.querySelector("base[href]");
    if (baseEl) baseUrl = new URL(baseEl.href + (baseEl.href.endsWith("/") ? "" : "/"));
    else if (typeof location !== "undefined") baseUrl = new URL("../", new URL(location.href));
} else if (typeof location !== 'undefined') {
    baseUrl = new URL('../', new URL(location.href));
} else {
    baseUrl = new URL('about:blank');
}
function getCommonBase(a, b) {
    if (a.startsWith(b)) return b;
    if (b.startsWith(a)) return a;
    const aSegments = a.split("/");
    const bSegments = b.split("/");
    let i = 0;
    while(aSegments[i] === bSegments[i])i++;
    return aSegments.slice(0, i).join("/") + "/";
}
function sameOrigin(url, baseUrl) {
    return url.protocol === baseUrl.protocol && url.host === baseUrl.host && url.port === baseUrl.port && url.username === baseUrl.username && url.password === baseUrl.password;
}
function resolve(url, mapUrl, rootUrl) {
    if (url.startsWith("/")) return rootUrl ? new URL("." + url.slice(url[1] === "/" ? 1 : 0), rootUrl).href : url;
    return new URL(url, mapUrl).href;
}
/**
 * Rebase the given URL to the baseURL and rootURL
 * 
 * @param url URL to rebase
 * @param baseUrl Import map baseUrl
 *                URLs will be based relative to this path if the same origin as the URL.
 * @param rootUrl Optional URL ending in / of the root HTML URL.
 *                When provided and possible, will be used as the base of the form '/...'
 * @returns relative URL string
 */ function rebase(url, baseUrl, rootUrl = null) {
    let resolved;
    if (url.startsWith("/") || url.startsWith("//")) {
        if (rootUrl === null) return url;
        resolved = new URL(url, rootUrl);
    } else {
        resolved = new URL(url, baseUrl);
    }
    if (rootUrl && resolved.href.startsWith(rootUrl.href)) return resolved.href.slice(rootUrl.href.length - 1);
    if (rootUrl && rootUrl.href.startsWith(resolved.href)) {
        // edge-case
        return "/" + relative(resolved, rootUrl);
    }
    if (sameOrigin(resolved, baseUrl)) return relative(resolved, baseUrl);
    return resolved.href;
}
function relative(url, baseUrl) {
    const baseUrlPath = baseUrl.pathname;
    const urlPath = url.pathname;
    const minLen = Math.min(baseUrlPath.length, urlPath.length);
    let sharedBaseIndex = -1;
    for(let i = 0; i < minLen; i++){
        if (baseUrlPath[i] !== urlPath[i]) break;
        if (urlPath[i] === "/") sharedBaseIndex = i;
    }
    const backtracks = baseUrlPath.slice(sharedBaseIndex + 1).split("/").length - 1;
    return (backtracks ? "../".repeat(backtracks) : "./") + urlPath.slice(sharedBaseIndex + 1) + url.search + url.hash;
}
function isURL(specifier) {
    try {
        if (specifier[0] === "#") return false;
        new URL(specifier);
    } catch (e) {
        return false;
    }
    return true;
}
function isPlain(specifier) {
    return !isRelative(specifier) && !isURL(specifier);
}
function isRelative(specifier) {
    return specifier.startsWith("./") || specifier.startsWith("../") || specifier.startsWith("/");
}

function alphabetize(obj) {
    const out = {};
    for (const key of Object.keys(obj).sort())out[key] = obj[key];
    return out;
}

function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}
function _class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) {
        descriptor.set.call(receiver, value);
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function _class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
}
function _class_private_field_get(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
    return _class_apply_descriptor_get(receiver, descriptor);
}
function _class_private_field_init(obj, privateMap, value) {
    _check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function _class_private_field_set(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
    _class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
}
function _class_private_method_init(obj, privateSet) {
    _check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class MapMatcher {
    constructor(map){
        _define_property(this, "prefixMatches", void 0);
        _define_property(this, "results", new Map());
        this.prefixMatches = Object.keys(map).filter((match)=>match.endsWith("/") || match.endsWith("*")).sort((matchA, matchB)=>matchA.length < matchB.length ? 1 : -1);
    }
}
var _importsMatcher = /*#__PURE__*/ new WeakMap(), _scopeMatchers = /*#__PURE__*/ new WeakMap(), _scopeCandidates = /*#__PURE__*/ new WeakMap(), _scopeMatchCache = /*#__PURE__*/ new WeakMap(), _resolveCache = /*#__PURE__*/ new WeakMap(), _dirty = /*#__PURE__*/ new WeakMap(), _refreshCaches = /*#__PURE__*/ new WeakSet(), _getScopeMatches = /*#__PURE__*/ new WeakSet();
class ImportMap {
    /**
   * Clones the import map
   * @returns Cloned import map
   */ clone() {
        return new ImportMap({
            mapUrl: this.mapUrl,
            rootUrl: this.rootUrl
        }).extend(this);
    }
    /**
   * Extends the import map mappings
   * @param map Import map to extend with
   * @param overrideScopes Set to true to have scopes be replacing instead of extending
   * @returns ImportMap for chaining
   */ extend(map, overrideScopes = false) {
        Object.assign(this.imports, map.imports);
        if (overrideScopes) {
            Object.assign(this.scopes, map.scopes);
        } else if (map.scopes) {
            for (const scope of Object.keys(map.scopes))Object.assign(this.scopes[scope] = this.scopes[scope] || Object.create(null), map.scopes[scope]);
        }
        Object.assign(this.integrity, map.integrity);
        this.rebase();
        return this;
    }
    /**
   * Performs an alphanumerical sort on the import map imports and scopes
   * @returns ImportMap for chaining
   */ sort() {
        this.imports = alphabetize(this.imports);
        this.scopes = alphabetize(this.scopes);
        for (const scope of Object.keys(this.scopes))this.scopes[scope] = alphabetize(this.scopes[scope]);
        this.integrity = alphabetize(this.integrity);
        return this;
    }
    /**
   * Set a specific entry in the import map
   *
   * @param name Specifier to set
   * @param target Target of the map
   * @param parent Optional parent scope
   * @returns ImportMap for chaining
   */ set(name, target, parent) {
        if (!parent) {
            this.imports[name] = target;
        } else {
            this.scopes[parent] = this.scopes[parent] || Object.create(null);
            this.scopes[parent][name] = target;
        }
        _class_private_field_set(this, _dirty, true);
        return this;
    }
    /**
   * @param target URL target
   * @param integrity Integrity
   */ setIntegrity(target, integrity) {
        this.integrity[target] = integrity;
        const targetRebased = rebase(target, this.mapUrl, this.rootUrl);
        if (targetRebased !== target && this.integrity[targetRebased]) delete this.integrity[targetRebased];
        if (targetRebased.startsWith('./') && target !== targetRebased.slice(2) && this.integrity[targetRebased.slice(2)]) delete this.integrity[targetRebased.slice(2)];
    }
    /**
   * @param target URL target
   * @param integrity Integrity
   */ getIntegrity(target, integrity) {
        const targetResolved = resolve(target, this.mapUrl, this.rootUrl);
        if (this.integrity[targetResolved]) return this.integrity[targetResolved];
        const targetRebased = rebase(targetResolved, this.mapUrl, this.rootUrl);
        if (this.integrity[targetRebased]) return this.integrity[targetRebased];
        if (this.integrity[targetRebased.slice(2)]) return this.integrity[targetRebased.slice(2)];
    }
    /**
   * Bulk replace URLs in the import map
   * Provide a URL ending in "/" to perform path replacements
   *
   * @param url {String} The URL to replace
   * @param newUrl {String} The URL to replace it with
   * @returns ImportMap for chaining
   */ replace(url, newUrl) {
        const replaceSubpaths = url.endsWith("/");
        if (!isURL(url)) throw new Error("URL remapping only supports URLs");
        const newRelPkgUrl = rebase(newUrl, this.mapUrl, this.rootUrl);
        if (this.imports[url]) {
            this.imports[newRelPkgUrl] = this.imports[url];
            delete this.imports[url];
        }
        if (replaceSubpaths) {
            for (const impt of Object.keys(this.imports)){
                const target = this.imports[impt];
                if (target.startsWith(url)) {
                    this.imports[impt] = newRelPkgUrl + target.slice(url.length);
                }
            }
        }
        for (const scope of Object.keys(this.scopes)){
            const scopeImports = this.scopes[scope];
            const scopeUrl = resolve(scope, this.mapUrl, this.rootUrl);
            if (replaceSubpaths && scopeUrl.startsWith(url) || scopeUrl === url) {
                const newScope = newRelPkgUrl + scopeUrl.slice(url.length);
                delete this.scopes[scope];
                this.scopes[newScope] = scopeImports;
            }
            for (const impt of Object.keys(scopeImports)){
                const target = scopeImports[impt];
                if (replaceSubpaths && target.startsWith(url) || target === url) scopeImports[impt] = newRelPkgUrl + target.slice(url.length);
            }
        }
        if (this.integrity[url]) {
            this.integrity[newRelPkgUrl] = this.integrity[url];
            delete this.integrity[url];
        }
        _class_private_field_set(this, _dirty, true);
        return this;
    }
    /**
   * Groups subpath mappings into path mappings when multiple exact subpaths
   * exist under the same path.
   *
   * For two mappings like { "base/a.js": "/a.js", "base/b.js": "/b.js" },
   * these will be replaced with a single path mapping { "base/": "/" }.
   * Groupings are done throughout all import scopes individually.
   *
   * @param targets Which sections to combine: 'scopes' (default) or 'both' (includes top-level imports)
   * @returns ImportMap for chaining
   */ /**
   * Condense import entries sharing a common prefix into a single
   * trailing-slash entry. Entries with inconsistent URL bases (e.g.
   * shadowed exports) are left in place alongside the prefix entry.
   *
   * @param prefixes Import key prefixes to condense (e.g. "pkg/modules/")
   * @returns ImportMap for chaining
   */ condenseImports(prefixes) {
        const condenseMappings = (mappings, safePrefixes)=>{
            for (const prefix of safePrefixes){
                for (const key of Object.keys(mappings)){
                    var _mappings, _prefix;
                    if (!key.startsWith(prefix) || key === prefix) continue;
                    const suffix = key.slice(prefix.length);
                    const value = mappings[key];
                    if (!value.endsWith(suffix)) continue;
                    var _;
                    (_ = (_mappings = mappings)[_prefix = prefix]) !== null && _ !== void 0 ? _ : _mappings[_prefix] = value.slice(0, value.length - suffix.length);
                    if (value.startsWith(mappings[prefix])) {
                        delete mappings[key];
                    }
                }
            }
        };
        if (prefixes.imports) condenseMappings(this.imports, prefixes.imports);
        if (prefixes.scopes) {
            for (const scope of Object.keys(prefixes.scopes))if (this.scopes[scope]) condenseMappings(this.scopes[scope], prefixes.scopes[scope]);
        }
        _class_private_field_set(this, _dirty, true);
        return this;
    }
    combineSubpaths(targets = 'scopes') {
        // iterate possible bases and submappings, grouping bases greedily
        const combineSubpathMappings = (mappings)=>{
            let outMappings = Object.create(null);
            for (let impt of Object.keys(mappings)){
                const target = mappings[impt];
                // Check if this import is already handled by an existing path mapping
                // If so, either merge with it or continue on
                let mapMatch;
                if (isPlain(impt)) {
                    mapMatch = getMapMatch(impt, outMappings);
                } else {
                    mapMatch = getMapMatch(impt = rebase(impt, this.mapUrl, this.rootUrl), outMappings) || this.rootUrl && getMapMatch(impt = rebase(impt, this.mapUrl, null), outMappings) || undefined;
                }
                if (mapMatch && impt.slice(mapMatch.length) === resolve(target, this.mapUrl, this.rootUrl).slice(resolve(outMappings[mapMatch], this.mapUrl, this.rootUrl).length)) {
                    continue;
                }
                let newbase = false;
                const targetParts = mappings[impt].split("/");
                const imptParts = impt.split("/");
                for(let j = imptParts.length - 1; j > 0; j--){
                    const subpath = imptParts.slice(j).join("/");
                    const subpathTarget = targetParts.slice(targetParts.length - (imptParts.length - j)).join("/");
                    if (subpath !== subpathTarget) {
                        outMappings[impt] = mappings[impt];
                        break;
                    }
                    const base = imptParts.slice(0, j).join("/") + "/";
                    if (outMappings[base]) continue;
                    const baseTarget = targetParts.slice(0, targetParts.length - (imptParts.length - j)).join("/") + "/";
                    // Dedupe existing mappings against the new base to remove them
                    // And if we dont dedupe against anything then dont perform this basing
                    for (let impt of Object.keys(outMappings)){
                        const target = outMappings[impt];
                        let matches = false;
                        if (isPlain(impt)) {
                            matches = impt.startsWith(base);
                        } else {
                            matches = (impt = rebase(impt, this.mapUrl, this.rootUrl)).startsWith(base) || (impt = rebase(impt, this.mapUrl, this.rootUrl)).startsWith(base);
                        }
                        if (matches && impt.slice(base.length) === resolve(target, this.mapUrl, this.rootUrl).slice(resolve(baseTarget, this.mapUrl, this.rootUrl).length)) {
                            newbase = true;
                            delete outMappings[impt];
                        }
                    }
                    if (newbase) {
                        outMappings[base] = baseTarget;
                        break;
                    }
                }
                if (!newbase) outMappings[impt] = target;
            }
            return outMappings;
        };
        if (targets === 'both') {
            this.imports = combineSubpathMappings(this.imports);
        }
        if (targets === 'scopes' || targets === 'both') {
            for (const scope of Object.keys(this.scopes)){
                this.scopes[scope] = combineSubpathMappings(this.scopes[scope]);
            }
        }
        _class_private_field_set(this, _dirty, true);
        return this;
    }
    /**
   * Groups the import map scopes to shared URLs to reduce duplicate mappings.
   *
   * For two given scopes, "https://site.com/x/" and "https://site.com/y/",
   * a single scope will be constructed for "https://site.com/" including
   * their shared mappings, only retaining the scopes if they have differences.
   *
   * In the case where the scope is on the same origin as the mapUrl, the grouped
   * scope is determined based on determining the common baseline over all local scopes
   *
   * @returns ImportMap for chaining
   */ flatten() {
        // Ensure resolve cache is fresh before we use it
        if (_class_private_field_get(this, _dirty)) {
            _class_private_method_get(this, _refreshCaches, refreshCaches).call(this);
            _class_private_field_set(this, _dirty, false);
        }
        const urlCache = new Map();
        const cachedResolve = (url)=>{
            let resolved = urlCache.get(url);
            if (resolved !== undefined) return resolved;
            resolved = resolve(url, this.mapUrl, this.rootUrl);
            urlCache.set(url, resolved);
            return resolved;
        };
        // First, determine the common base for the local mappings if any
        let localScopemapUrl = null;
        for (const scope of Object.keys(this.scopes)){
            const resolvedScope = cachedResolve(scope);
            if (isURL(resolvedScope)) {
                const scopeUrl = new URL(resolvedScope);
                if (sameOrigin(scopeUrl, this.mapUrl)) {
                    if (!localScopemapUrl) localScopemapUrl = scopeUrl.href;
                    else localScopemapUrl = getCommonBase(scopeUrl.href, localScopemapUrl);
                }
            } else {
                if (!localScopemapUrl) localScopemapUrl = resolvedScope;
                else localScopemapUrl = getCommonBase(resolvedScope, localScopemapUrl);
            }
        }
        // for each scope, update its mappings to be in the shared base where possible
        const relativeLocalScopemapUrl = localScopemapUrl ? rebase(localScopemapUrl, this.mapUrl, this.rootUrl) : null;
        for (const scope of Object.keys(this.scopes)){
            const scopeImports = this.scopes[scope];
            let scopemapUrl;
            const resolvedScope = cachedResolve(scope);
            if (isURL(resolvedScope)) {
                const scopeUrl = new URL(resolvedScope);
                if (sameOrigin(scopeUrl, this.mapUrl)) {
                    scopemapUrl = relativeLocalScopemapUrl;
                } else {
                    scopemapUrl = scopeUrl.protocol + "//" + scopeUrl.hostname + (scopeUrl.port ? ":" + scopeUrl.port : "") + "/";
                }
            } else {
                scopemapUrl = relativeLocalScopemapUrl;
            }
            let scopeBase = this.scopes[scopemapUrl] || Object.create(null);
            if (scopeBase === scopeImports) scopeBase = null;
            let flattenedAll = true;
            for (const name of Object.keys(scopeImports)){
                const target = scopeImports[name];
                if (this.imports[name] && cachedResolve(this.imports[name]) === cachedResolve(target)) {
                    delete scopeImports[name];
                } else if (scopeBase && (!scopeBase[name] || cachedResolve(scopeBase[name]) === cachedResolve(target))) {
                    scopeBase[name] = rebase(target, this.mapUrl, this.rootUrl);
                    delete scopeImports[name];
                    this.scopes[scopemapUrl] = alphabetize(scopeBase);
                } else {
                    flattenedAll = false;
                }
            }
            if (flattenedAll) delete this.scopes[scope];
        }
        _class_private_field_set(this, _dirty, true);
        return this;
    }
    /**
   * Rebase the entire import map to a new mapUrl and rootUrl
   *
   * If the rootUrl is not provided, it will remain null if it was
   * already set to null.
   *
   * Otherwise, just like the constructor options, the rootUrl
   * will default to the mapUrl base if it is an http: or https:
   * scheme URL, and null otherwise keeping absolute URLs entirely
   * in-tact.
   *
   * @param mapUrl The new map URL to use
   * @param rootUrl The new root URL to use
   * @returns ImportMap for chaining
   */ rebase(mapUrl = this.mapUrl, rootUrl) {
        if (typeof mapUrl === "string") mapUrl = new URL(mapUrl);
        if (rootUrl === undefined) {
            if (mapUrl.href === this.mapUrl.href) rootUrl = this.rootUrl;
            else rootUrl = this.rootUrl === null || mapUrl.protocol !== "https:" && mapUrl.protocol !== "http:" ? null : new URL("/", mapUrl);
        } else if (typeof rootUrl === "string") rootUrl = new URL(rootUrl);
        let changedImportProps = false;
        for (const impt of Object.keys(this.imports)){
            const target = this.imports[impt];
            this.imports[impt] = rebase(resolve(target, this.mapUrl, this.rootUrl), mapUrl, rootUrl);
            if (!isPlain(impt)) {
                const newImpt = rebase(resolve(impt, this.mapUrl, this.rootUrl), mapUrl, rootUrl);
                if (newImpt !== impt) {
                    changedImportProps = true;
                    this.imports[newImpt] = this.imports[impt];
                    delete this.imports[impt];
                }
            }
        }
        if (changedImportProps) this.imports = alphabetize(this.imports);
        let changedScopeProps = false;
        // Create a temporary map to collect scopes by their rebased URLs
        const rebasedScopes = Object.create(null);
        for (const scope of Object.keys(this.scopes)){
            const scopeImports = this.scopes[scope];
            let changedScopeImportProps = false;
            for (const impt of Object.keys(scopeImports)){
                const target = scopeImports[impt];
                scopeImports[impt] = rebase(resolve(target, this.mapUrl, this.rootUrl), mapUrl, rootUrl);
                if (!isPlain(impt)) {
                    const newName = rebase(resolve(impt, this.mapUrl, this.rootUrl), mapUrl, rootUrl);
                    if (newName !== impt) {
                        changedScopeImportProps = true;
                        scopeImports[newName] = scopeImports[impt];
                        delete scopeImports[impt];
                    }
                }
            }
            if (changedScopeImportProps) this.scopes[scope] = alphabetize(scopeImports);
            const newScope = rebase(resolve(scope, this.mapUrl, this.rootUrl), mapUrl, rootUrl);
            // Check if this scope URL already exists in our rebased collection
            if (rebasedScopes[newScope]) {
                // Merge the imports from this scope into the existing one
                Object.assign(rebasedScopes[newScope], scopeImports);
                changedScopeProps = true;
            } else {
                // First time seeing this rebased scope URL
                rebasedScopes[newScope] = scopeImports;
                if (scope !== newScope) {
                    changedScopeProps = true;
                }
            }
        }
        // Replace the scopes with the unified rebased scopes
        this.scopes = rebasedScopes;
        if (changedScopeProps) this.scopes = alphabetize(this.scopes);
        let changedIntegrityProps = false;
        for (const target of Object.keys(this.integrity)){
            const newTarget = rebase(resolve(target, this.mapUrl, this.rootUrl), mapUrl, rootUrl);
            if (target !== newTarget) {
                this.integrity[newTarget] = this.integrity[target];
                delete this.integrity[target];
                changedIntegrityProps = true;
            }
        }
        if (changedIntegrityProps) this.integrity = alphabetize(this.integrity);
        this.mapUrl = mapUrl;
        this.rootUrl = rootUrl;
        _class_private_field_set(this, _dirty, true);
        return this;
    }
    /**
   * Perform a module resolution against the import map
   *
   * @param specifier Specifier to resolve
   * @param parentUrl Parent URL to resolve against
   * @returns Resolved URL string
   */ resolve(specifier, parentUrl = this.mapUrl) {
        if (_class_private_field_get(this, _dirty)) {
            _class_private_method_get(this, _refreshCaches, refreshCaches).call(this);
            _class_private_field_set(this, _dirty, false);
        }
        if (typeof parentUrl !== "string") parentUrl = parentUrl.toString();
        parentUrl = resolve(parentUrl, this.mapUrl, this.rootUrl);
        const cacheKey = `${parentUrl}\0${specifier}`;
        const cached = _class_private_field_get(this, _resolveCache).get(cacheKey);
        if (cached !== undefined) return cached;
        let specifierUrl;
        if (!isPlain(specifier)) {
            specifierUrl = new URL(specifier, parentUrl);
            specifier = specifierUrl.href;
        }
        const scopeMatches = _class_private_method_get(this, _getScopeMatches, getScopeMatches).call(this, parentUrl);
        for (const [scope] of scopeMatches){
            const scopeMatcher = _class_private_field_get(this, _scopeMatchers)[scope];
            let mapMatch = getMapMatch.call(scopeMatcher, specifier, this.scopes[scope]);
            if (!mapMatch && specifierUrl) {
                mapMatch = getMapMatch.call(scopeMatcher, specifier = rebase(specifier, this.mapUrl, this.rootUrl), this.scopes[scope]) || this.rootUrl && getMapMatch.call(scopeMatcher, specifier = rebase(specifier, this.mapUrl, null), this.scopes[scope]) || undefined;
            }
            if (mapMatch) {
                const target = this.scopes[scope][mapMatch];
                const resolved = resolve(target + specifier.slice(mapMatch.length), this.mapUrl, this.rootUrl);
                _class_private_field_get(this, _resolveCache).set(cacheKey, resolved);
                return resolved;
            }
        }
        let mapMatch = getMapMatch.call(_class_private_field_get(this, _importsMatcher), specifier, this.imports);
        if (!mapMatch && specifierUrl) {
            mapMatch = getMapMatch.call(_class_private_field_get(this, _importsMatcher), specifier = rebase(specifier, this.mapUrl, this.rootUrl), this.imports) || this.rootUrl && getMapMatch.call(_class_private_field_get(this, _importsMatcher), specifier = rebase(specifier, this.mapUrl, null), this.imports) || undefined;
        }
        if (mapMatch) {
            const target = this.imports[mapMatch];
            const resolved = resolve(target + specifier.slice(mapMatch.length), this.mapUrl, this.rootUrl);
            _class_private_field_get(this, _resolveCache).set(cacheKey, resolved);
            return resolved;
        }
        if (specifierUrl) {
            _class_private_field_get(this, _resolveCache).set(cacheKey, specifierUrl.href);
            return specifierUrl.href;
        }
        throw new Error(`Unable to resolve ${specifier} in ${parentUrl}`);
    }
    /**
   * Get the import map JSON data
   *
   * @returns Import map data
   */ toJSON() {
        const obj = {};
        if (Object.keys(this.imports).length) obj.imports = this.imports;
        if (Object.keys(this.scopes).length) obj.scopes = this.scopes;
        if (Object.keys(this.integrity).length) obj.integrity = this.integrity;
        return JSON.parse(JSON.stringify(obj));
    }
    /**
   * Create a new import map instance
   *
   * @param opts import map options, can be an optional bag of { map?, mapUrl?, rootUrl? } or just a direct mapUrl
   */ constructor(opts){
        _class_private_method_init(this, _refreshCaches);
        _class_private_method_init(this, _getScopeMatches);
        _define_property(this, "imports", Object.create(null));
        _define_property(this, "scopes", Object.create(null));
        _define_property(this, "integrity", Object.create(null));
        /**
   * The absolute URL of the import map, for determining relative resolutions
   * When using file:/// URLs this allows relative modules to be co-located
   */ _define_property(this, "mapUrl", void 0);
        /**
   * The URL to use for root-level resolutions in the import map
   * If null, root resolutions are not resolved and instead left as-is
   *
   * By default, rootUrl is null unless the mapUrl is an http or https URL,
   * in which case it is taken to be the root of the mapUrl.
   */ _define_property(this, "rootUrl", void 0);
        _class_private_field_init(this, _importsMatcher, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _scopeMatchers, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _scopeCandidates, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _scopeMatchCache, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _resolveCache, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _dirty, {
            writable: true,
            value: false
        });
        let { map, mapUrl = baseUrl, rootUrl } = opts instanceof URL || typeof opts === "string" || typeof opts === "undefined" ? {
            mapUrl: opts,
            map: undefined,
            rootUrl: undefined
        } : opts;
        if (typeof mapUrl === "string") mapUrl = new URL(mapUrl);
        this.mapUrl = mapUrl;
        if (rootUrl === undefined && (this.mapUrl.protocol === "http:" || this.mapUrl.protocol === "https:")) rootUrl = new URL("/", this.mapUrl);
        else if (typeof rootUrl === "string") rootUrl = new URL(rootUrl);
        this.rootUrl = rootUrl || null;
        _class_private_field_set(this, _importsMatcher, new MapMatcher(this.imports));
        _class_private_field_set(this, _scopeMatchers, Object.create(null));
        _class_private_field_set(this, _scopeCandidates, []);
        _class_private_field_set(this, _scopeMatchCache, new Map());
        _class_private_field_set(this, _resolveCache, new Map());
        if (map) this.extend(map);
    }
}
function refreshCaches() {
    _class_private_field_set(this, _importsMatcher, new MapMatcher(this.imports));
    _class_private_field_set(this, _scopeMatchers, Object.create(null));
    for (const scope of Object.keys(this.scopes)){
        _class_private_field_get(this, _scopeMatchers)[scope] = new MapMatcher(this.scopes[scope]);
    }
    _class_private_field_set(this, _scopeCandidates, Object.keys(this.scopes).map((scope)=>[
            scope,
            resolve(scope, this.mapUrl, this.rootUrl)
        ]).sort(([, a], [, b])=>a.length < b.length ? 1 : -1));
    _class_private_field_get(this, _scopeMatchCache).clear();
    _class_private_field_get(this, _resolveCache).clear();
}
function getScopeMatches(parentUrl) {
    const cached = _class_private_field_get(this, _scopeMatchCache).get(parentUrl);
    if (cached) return cached;
    const matches = _class_private_field_get(this, _scopeCandidates).filter(([, scopeUrl])=>{
        return scopeUrl === parentUrl || scopeUrl.endsWith("/") && parentUrl.startsWith(scopeUrl);
    });
    _class_private_field_get(this, _scopeMatchCache).set(parentUrl, matches);
    return matches;
}
const scopeCandidateCache = new WeakMap();
function getScopeMatches1(parentUrl, scopes, mapUrl, rootUrl) {
    const keys = Object.keys(scopes);
    let cached = scopeCandidateCache.get(scopes);
    if (!cached || cached.keyCount !== keys.length) {
        const candidates = keys.map((scope)=>[
                scope,
                resolve(scope, mapUrl, rootUrl)
            ]).sort(([, a], [, b])=>a.length < b.length ? 1 : -1);
        cached = {
            keyCount: keys.length,
            candidates
        };
        scopeCandidateCache.set(scopes, cached);
    }
    return cached.candidates.filter(([, scopeUrl])=>{
        return scopeUrl === parentUrl || scopeUrl.endsWith("/") && parentUrl.startsWith(scopeUrl);
    });
}
function getMapMatch(specifier, map) {
    if (specifier in map) return specifier;
    if (this instanceof MapMatcher) {
        const cached = this.results.get(specifier);
        if (cached !== undefined) return cached;
        let curMatch;
        for (const match of this.prefixMatches){
            const wildcard = match.endsWith("*");
            if (specifier.startsWith(wildcard ? match.slice(0, -1) : match)) {
                if (!curMatch || match.length > curMatch.length) curMatch = match;
            }
        }
        this.results.set(specifier, curMatch);
        return curMatch;
    }
    let curMatch;
    for (const match of Object.keys(map)){
        const wildcard = match.endsWith("*");
        if (!match.endsWith("/") && !wildcard) continue;
        if (specifier.startsWith(wildcard ? match.slice(0, -1) : match)) {
            if (!curMatch || match.length > curMatch.length) curMatch = match;
        }
    }
    return curMatch;
}

export { ImportMap, getMapMatch, getScopeMatches1 as getScopeMatches };
//# sourceMappingURL=map.js.map
