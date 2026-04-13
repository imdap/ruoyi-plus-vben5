import { throwInternalError } from '../common/err.js';
import { isPlain, resolveUrl } from '../common/url.js';
import { JspmError } from '../common/err.js';
import { newPackageTarget, parsePkg } from './package.js';
// @ts-ignore
import sver from 'sver';
import { decodeBase64 } from '../common/b64.js';
const { Semver, SemverRange } = sver;
function enumerateParentScopes(url) {
    const parentScopes = [];
    let separatorIndex = url.lastIndexOf('/');
    const protocolIndex = url.indexOf('://') + 1;
    while((separatorIndex = url.lastIndexOf('/', separatorIndex - 1)) !== protocolIndex){
        parentScopes.push(url.slice(0, separatorIndex + 1));
    }
    return parentScopes;
}
export function getResolution(resolutions, name, pkgScope) {
    if (pkgScope && !pkgScope.endsWith('/')) throwInternalError(pkgScope);
    if (!pkgScope) return resolutions.primary[name];
    const scope = resolutions.secondary[pkgScope];
    var _scope_name;
    return (_scope_name = scope === null || scope === void 0 ? void 0 : scope[name]) !== null && _scope_name !== void 0 ? _scope_name : null;
}
export async function getFlattenedResolution(resolutions, name, pkgScope, flattenedSubpath, semverCompatible = false, inRange = null) {
    // no current scope -> check the flattened scopes
    const parentScopes = enumerateParentScopes(pkgScope);
    for (const scopeUrl of parentScopes){
        if (!resolutions.flattened[scopeUrl]) continue;
        const flatResolutions = resolutions.flattened[scopeUrl][name];
        if (!flatResolutions) continue;
        for (const flatResolution of flatResolutions){
            if (flatResolution.export === flattenedSubpath || flatResolution.export.endsWith('/') && flattenedSubpath.startsWith(flatResolution.export)) {
                if (semverCompatible && inRange && !await inRange(flatResolution.resolution.installUrl)) {
                    continue;
                }
                return flatResolution.resolution;
            }
        }
    }
    return null;
}
export function setConstraint(constraints, name, target, pkgScope = null) {
    if (pkgScope === null) constraints.primary[name] = target;
    else (constraints.secondary[pkgScope] = constraints.secondary[pkgScope] || Object.create(null))[name] = target;
}
export function setResolution(resolutions, name, installUrl, pkgScope = null) {
    if (pkgScope && !pkgScope.endsWith('/')) throwInternalError(pkgScope);
    if (pkgScope === null) {
        const existing = resolutions.primary[name];
        if (existing && existing.installUrl === installUrl) return false;
        resolutions.primary[name] = {
            installUrl
        };
        return true;
    } else {
        resolutions.secondary[pkgScope] = resolutions.secondary[pkgScope] || {};
        const existing = resolutions.secondary[pkgScope][name];
        if (existing && existing.installUrl === installUrl) return false;
        resolutions.secondary[pkgScope][name] = {
            installUrl
        };
        return true;
    }
}
export function mergeLocks(resolutions, newResolutions) {
    for (const pkg of Object.keys(newResolutions.primary)){
        resolutions.primary[pkg] = newResolutions.primary[pkg];
    }
    for (const pkgUrl of Object.keys(newResolutions.secondary)){
        if (resolutions[pkgUrl]) Object.assign(resolutions[pkgUrl] = Object.create(null), newResolutions[pkgUrl]);
        else resolutions.secondary[pkgUrl] = newResolutions.secondary[pkgUrl];
    }
    for (const scopeUrl of Object.keys(newResolutions.flattened)){
        if (resolutions[scopeUrl]) Object.assign(resolutions[scopeUrl], newResolutions[scopeUrl]);
        else resolutions.flattened[scopeUrl] = newResolutions.flattened[scopeUrl];
    }
}
export function mergeConstraints(constraints, newConstraints) {
    for (const pkg of Object.keys(newConstraints.primary)){
        constraints.primary[pkg] = newConstraints.primary[pkg];
    }
    for (const pkgUrl of Object.keys(newConstraints.secondary)){
        if (constraints[pkgUrl]) Object.assign(constraints[pkgUrl] = Object.create(null), newConstraints[pkgUrl]);
        else constraints.secondary[pkgUrl] = newConstraints.secondary[pkgUrl];
    }
}
function toPackageTargetMap(pcfg, pkgUrl, defaultRegistry = 'npm', includeDev = false) {
    const constraints = Object.create(null);
    if (pcfg.dependencies) for (const name of Object.keys(pcfg.dependencies)){
        constraints[name] = newPackageTarget(pcfg.dependencies[name], pkgUrl, defaultRegistry, name).pkgTarget;
    }
    if (pcfg.peerDependencies) for (const name of Object.keys(pcfg.peerDependencies)){
        if (name in constraints) continue;
        constraints[name] = newPackageTarget(pcfg.peerDependencies[name], pkgUrl, defaultRegistry, name).pkgTarget;
    }
    if (pcfg.optionalDependencies) for (const name of Object.keys(pcfg.optionalDependencies)){
        if (name in constraints) continue;
        constraints[name] = newPackageTarget(pcfg.optionalDependencies[name], pkgUrl, defaultRegistry, name).pkgTarget;
    }
    if (includeDev && pcfg.devDependencies) for (const name of Object.keys(pcfg.devDependencies)){
        if (name in constraints) continue;
        constraints[name] = newPackageTarget(pcfg.devDependencies[name], pkgUrl, defaultRegistry, name).pkgTarget;
    }
    return constraints;
}
async function packageTargetFromExact(pkg, resolver, permitDowngrades = false) {
    let registry, name, version;
    if (pkg.registry === 'node_modules') {
        // The node_modules versions are always URLs to npm-installed packages:
        const pkgUrl = decodeBase64(pkg.version);
        const pcfg = await resolver.getPackageConfig(pkgUrl);
        if (!pcfg) throw new JspmError(`Package ${pkgUrl} has no package config, cannot create package target.`);
        if (!pcfg.name || !pcfg.version) throw new JspmError(`Package ${pkgUrl} has no name or version, cannot create package target.`);
        name = pcfg.name;
        version = pcfg.version;
        registry = 'npm';
    } else {
        // The other registries all use semver ranges:
        ({ registry, name, version } = pkg);
    }
    const v = new Semver(version);
    if (v.tag) return {
        registry,
        name,
        range: new SemverRange(version),
        unstable: false
    };
    if (permitDowngrades) {
        if (v.major !== 0) return {
            registry,
            name,
            range: new SemverRange(String(v.major)),
            unstable: false
        };
        if (v.minor !== 0) return {
            registry,
            name,
            range: new SemverRange(v.major + '.' + v.minor),
            unstable: false
        };
        return {
            registry,
            name,
            range: new SemverRange(version),
            unstable: false
        };
    } else {
        return {
            registry,
            name,
            range: new SemverRange('^' + version),
            unstable: false
        };
    }
}
export function getConstraintFor(name, registry, constraints) {
    const installs = [];
    for (const [alias, target] of Object.entries(constraints.primary)){
        if (!(target instanceof URL) && target.registry === registry && target.name === name) installs.push({
            alias,
            pkgScope: null,
            range: target.range
        });
    }
    for (const [pkgScope, scope] of Object.entries(constraints.secondary)){
        for (const alias of Object.keys(scope)){
            const target = scope[alias];
            if (!(target instanceof URL) && target.registry === registry && target.name === name) installs.push({
                alias,
                pkgScope: pkgScope,
                range: target.range
            });
        }
    }
    return installs;
}
export async function extractLockConstraintsAndMap(log, map, preloadUrls, mapUrl, rootUrl, defaultRegistry, resolver, provider) {
    const locks = {
        primary: Object.create(null),
        secondary: Object.create(null),
        flattened: Object.create(null)
    };
    const maps = {
        imports: Object.create(null),
        scopes: Object.create(null)
    };
    // Primary version constraints taken from the map configuration base (if found)
    const primaryBase = await resolver.getPackageBase(mapUrl.href);
    const primaryPcfg = await resolver.getPackageConfig(primaryBase);
    const constraints = {
        primary: primaryPcfg ? toPackageTargetMap(primaryPcfg, new URL(primaryBase), defaultRegistry, true) : Object.create(null),
        secondary: Object.create(null)
    };
    const pkgUrls = new Set();
    const promises = [];
    for (let key of Object.keys(map.imports || {})){
        promises.push((async ()=>{
            if (isPlain(key)) {
                // Get the package name and subpath in package specifier space.
                const parsedKey = parsePkg(key);
                // Get the target package details in URL space:
                const targetUrl = resolveUrl(map.imports[key], mapUrl, rootUrl);
                const { parsedTarget, pkgUrl } = await resolveTargetPkg(targetUrl, resolver);
                // Skip @empty.js stub entries produced by link() for missing modules —
                // these resolve to @jspm/core but cannot be traced as real dependencies.
                if ((parsedTarget === null || parsedTarget === void 0 ? void 0 : parsedTarget.pkg.name) === '@jspm/core' && (targetUrl.endsWith('/@empty.js') || targetUrl.endsWith('/@empty.dew.js'))) return;
                pkgUrls.add(pkgUrl);
                // If the plain specifier resolves to a package on some provider's CDN,
                // and there's a corresponding import/export map entry in that package,
                // then the resolution is standard and we can lock it:
                // Treat top-level package versions as a constraint.
                if (parsedTarget) {
                    // Package "imports" and own-name resolutions don't constrain versions.
                    if (key[0] === '#') return;
                    if (!constraints.primary[parsedKey.pkgName]) {
                        constraints.primary[parsedKey.pkgName] = await packageTargetFromExact(parsedTarget.pkg, resolver);
                    }
                    setResolution(locks, parsedKey.pkgName, pkgUrl, null);
                    return;
                }
                // own name package resolution
                if (primaryPcfg && primaryPcfg.name === parsedKey.pkgName) return;
            }
            // Fallback - this resolution is non-standard, so we need to record it as
            // a custom import override:
            maps.imports[isPlain(key) ? key : resolveUrl(key, mapUrl, rootUrl)] = resolveUrl(map.imports[key], mapUrl, rootUrl);
        })());
    }
    for (const scopeUrl of Object.keys(map.scopes || {})){
        var _resolveUrl;
        const resolvedScopeUrl = (_resolveUrl = resolveUrl(scopeUrl, mapUrl, rootUrl)) !== null && _resolveUrl !== void 0 ? _resolveUrl : scopeUrl;
        const scope = map.scopes[scopeUrl];
        for (const key of Object.keys(scope)){
            promises.push((async ()=>{
                const scopePkgUrl = await resolver.getPackageBase(resolvedScopeUrl);
                const flattenedScope = new URL(scopePkgUrl).pathname === '/';
                pkgUrls.add(scopePkgUrl);
                // We are careful here NOT to read the package.json for scopes yet,
                // as this can be a very large fetch set for small map operations.
                if (isPlain(key)) {
                    // Get the package name and subpath in package specifier space.
                    const parsedKey = parsePkg(key);
                    // Get the target package details in URL space:
                    const targetUrl = resolveUrl(scope[key], mapUrl, rootUrl);
                    let { parsedTarget, pkgUrl } = await resolveTargetPkg(targetUrl, resolver);
                    // Skip @empty.js stub entries produced by link() for missing modules.
                    if ((parsedTarget === null || parsedTarget === void 0 ? void 0 : parsedTarget.pkg.name) === '@jspm/core' && (targetUrl.endsWith('/@empty.js') || targetUrl.endsWith('/@empty.dew.js'))) return;
                    pkgUrls.add(pkgUrl);
                    if (parsedTarget) {
                        var _constraints_secondary_pkgUrl;
                        // Imports resolutions that resolve as expected can be skipped (no resolution data)
                        if (key[0] === '#') return;
                        // If there is no constraint, we just make one as the semver major on the current version
                        if (!((_constraints_secondary_pkgUrl = constraints.secondary[pkgUrl]) === null || _constraints_secondary_pkgUrl === void 0 ? void 0 : _constraints_secondary_pkgUrl[parsedKey.pkgName])) {
                            (constraints.secondary[pkgUrl] = constraints.secondary[pkgUrl] || {})[parsedKey.pkgName] = parsedTarget ? await packageTargetFromExact(parsedTarget.pkg, resolver) : new URL(pkgUrl);
                        }
                        if (flattenedScope) {
                            const flattened = locks.flattened[scopePkgUrl] = locks.flattened[scopePkgUrl] || {};
                            flattened[parsedKey.pkgName] = flattened[parsedKey.pkgName] || [];
                            flattened[parsedKey.pkgName].push({
                                export: parsedKey.subpath,
                                resolution: {
                                    installUrl: pkgUrl
                                }
                            });
                        } else {
                            setResolution(locks, parsedKey.pkgName, pkgUrl, scopePkgUrl);
                        }
                        return;
                    }
                }
                // Fallback -> Custom import with normalization
                (maps.scopes[resolvedScopeUrl] = maps.scopes[resolvedScopeUrl] || Object.create(null))[isPlain(key) ? key : resolveUrl(key, mapUrl, rootUrl)] = resolveUrl(scope[key], mapUrl, rootUrl);
            })());
        }
    }
    // for every package we resolved, add their package constraints into the list of constraints
    // this step requires fetching package configuration for all packages, therefore takes a little time, but caches
    log === null || log === void 0 ? void 0 : log('generator/processInputMap', `Extracting constraints`);
    await Promise.all(promises);
    return {
        maps,
        constraints,
        locks: await enforceProviderConstraints(locks, provider, resolver, primaryBase)
    };
}
/**
 * Enforces the user's provider constraints, which map subsets of URL-space to
 * the provider that should be used to resolve them. Constraints are enforced
 * by re-resolving every input map lock and constraint against the provider
 * for their parent package URL.
 */ async function enforceProviderConstraints(locks, provider, resolver, basePkgUrl) {
    const res = {
        primary: Object.create(null),
        secondary: Object.create(null),
        flattened: Object.create(null)
    };
    for (const [pkgName, lock] of Object.entries(locks.primary)){
        const { installUrl } = await translateLock(lock, provider, resolver, basePkgUrl);
        setResolution(res, pkgName, installUrl, null);
    }
    for (const [pkgUrl, pkgLocks] of Object.entries(locks.secondary)){
        for (const [pkgName, lock] of Object.entries(pkgLocks)){
            const { installUrl } = await translateLock(lock, provider, resolver, pkgUrl);
            setResolution(res, pkgName, installUrl, pkgUrl);
        }
    }
    for (const [scopeUrl, pkgLocks] of Object.entries(locks.flattened)){
        res.flattened[scopeUrl] = {};
        for (const [pkgName, locks] of Object.entries(pkgLocks)){
            res.flattened[scopeUrl][pkgName] = [];
            for (const lock of locks){
                const newLock = await translateLock(lock.resolution, provider, resolver, scopeUrl);
                res.flattened[scopeUrl][pkgName].push({
                    export: lock.export,
                    resolution: newLock
                });
            }
        }
    }
    return res;
}
async function translateLock(lock, provider, resolver, parentUrl) {
    const mdl = await resolver.pm.parseUrlPkg(lock.installUrl);
    if (!mdl) return lock; // no provider owns it, nothing to translate
    const parentPkgUrl = await resolver.getPackageBase(parentUrl);
    const newMdl = await translateProvider(mdl, provider, resolver, parentPkgUrl);
    if (!newMdl) {
        // TODO: we should throw here once parent scoping is implemented
        // throw new JspmError(
        //   `Failed to translate ${lock.installUrl} to provider ${provider.provider}.`
        // );
        return lock;
    }
    return {
        installUrl: await resolver.pm.pkgToUrl(newMdl.pkg, provider.provider, provider.layer)
    };
}
export async function translateProvider(mdl, { provider, layer }, resolver, parentUrl) {
    const pkg = mdl.pkg;
    if ((pkg.registry === 'deno' || pkg.registry === 'denoland') && provider === 'deno') {
        return mdl; // nothing to do if translating deno-to-deno
    } else if (pkg.registry === 'deno' || pkg.registry === 'denoland' || provider === 'deno') {
        // TODO: we should throw here once parent scoping is implemented
        // throw new JspmError(
        //   "Cannot translate packages between the 'deno' provider and other providers."
        // );
        return null;
    }
    const fromNodeModules = pkg.registry === 'node_modules';
    const toNodeModules = provider === 'nodemodules';
    if (fromNodeModules === toNodeModules) {
        return {
            ...mdl,
            source: {
                provider,
                layer
            }
        };
    }
    const target = await packageTargetFromExact(pkg, resolver);
    let latestPkg;
    try {
        latestPkg = await resolver.pm.resolveLatestTarget(target, {
            provider,
            layer
        }, parentUrl, resolver);
    } catch (err) {
        // TODO: we should throw here once parent scoping is implemented
        // throw new JspmError(
        //   `Failed to translate package ${pkg.name}@${pkg.version} to provider ${provider}.`
        // );
        return null;
    }
    return {
        pkg: latestPkg,
        source: {
            provider,
            layer
        },
        builtin: mdl.builtin
    };
}
async function resolveTargetPkg(targetUrl, resolver) {
    const parsedTarget = resolver.pm.parseUrlPkg(targetUrl);
    if (parsedTarget) {
        const pkgUrl = await resolver.pm.pkgToUrl(parsedTarget.pkg, parsedTarget.source.provider, parsedTarget.source.layer);
        return {
            parsedTarget,
            pkgUrl
        };
    } else {
        return (async ()=>{
            const pkgUrl = await resolver.getPackageBase(targetUrl);
            return {
                parsedTarget,
                pkgUrl
            };
        })();
    }
}


//# sourceMappingURL=lock.js.map