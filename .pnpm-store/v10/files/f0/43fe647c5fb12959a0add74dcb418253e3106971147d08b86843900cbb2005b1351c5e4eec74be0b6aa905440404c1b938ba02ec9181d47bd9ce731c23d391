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
import { Semver } from 'sver';
import { registryProviders } from '../providers/index.js';
import { getFlattenedResolution, getResolution } from './lock.js';
import { newPackageTarget } from './package.js';
export class Installer {
    visitInstalls(visitor) {
        if (visitor(this.installs.primary, null)) return;
        for (const scopeUrl of Object.keys(this.installs.secondary)){
            if (visitor(this.installs.secondary[scopeUrl], scopeUrl)) return;
        }
    }
    getProvider(target) {
        let provider = this.defaultProvider;
        for (const name of Object.keys(this.providers)){
            if (name.endsWith(':') && target.registry === name.slice(0, -1) || target.name.startsWith(name) && (target.name.length === name.length || target.name[name.length] === '/')) {
                provider = parseProviderStr(this.providers[name]);
                break;
            }
        }
        return provider;
    }
    /**
   * Locks a package against the given target.
   *
   * @param {string} pkgName Name of the package being installed.
   * @param {InstallTarget} target The installation target being installed.
   * @param {InstallMode} mode Specifies how to interact with existing installs.
   * @param {`${string}/` | null} pkgScope URL of the package scope in which this install is occurring, null if it's a top-level install.
   * @param {string} parentUrl URL of the parent for this install.
   * @returns {Promise<InstalledResolution>}
   */ async installTarget(pkgName, { pkgTarget }, mode, pkgScope, parentUrl) {
        var // Otherwise we install latest and make an attempt to upgrade any existing
        // locks that are compatible to the latest version:
        _this_log, _this;
        const isTopLevel = pkgScope === null;
        const useLatest = isTopLevel && mode.includes('latest') || !isTopLevel && mode === 'latest-all';
        // Resolutions are always authoritative, and override the existing target:
        if (this.resolutions[pkgName]) {
            const resolutionTarget = newPackageTarget(this.resolutions[pkgName], this.opts.baseUrl, this.defaultRegistry, pkgName);
            if (JSON.stringify(pkgTarget) !== JSON.stringify(resolutionTarget.pkgTarget)) return this.installTarget(pkgName, resolutionTarget, mode, pkgScope, parentUrl);
        }
        // URL targets are installed as locks directly, as we have no versioning
        // information to work with:
        if (pkgTarget instanceof URL) {
            var _this_log1, _this1;
            const installHref = pkgTarget.href;
            const installUrl = installHref + (installHref.endsWith('/') ? '' : '/');
            (_this_log1 = (_this1 = this).log) === null || _this_log1 === void 0 ? void 0 : _this_log1.call(_this1, 'installer/installTarget', `${pkgName} ${pkgScope} -> ${installHref} (URL)`);
            this.newInstalls = this.setResolution(pkgName, installUrl, pkgScope);
            return {
                installUrl
            };
        }
        const provider = this.getProvider(pkgTarget);
        // For secondary installs, prefer the primary resolution if it satisfies
        // our range. This prevents unnecessary version splits where a stale
        // higher version from getBestExistingMatch would override the primary:
        if (pkgScope !== null && this.installs.primary[pkgName]) {
            const primaryUrl = this.installs.primary[pkgName].installUrl;
            if (await this.inRange(primaryUrl, pkgTarget)) {
                var _this_log2, _this2;
                (_this_log2 = (_this2 = this).log) === null || _this_log2 === void 0 ? void 0 : _this_log2.call(_this2, 'installer/installTarget', `${pkgName} ${pkgScope} -> ${primaryUrl} (primary consolidation)`);
                this.newInstalls = this.setResolution(pkgName, primaryUrl, pkgScope);
                this.setConstraint(pkgName, pkgTarget, pkgScope);
                return {
                    installUrl: primaryUrl
                };
            }
        }
        // Look for an existing lock for this package if we're in an install mode
        // that supports them:
        if (mode === 'default' || mode === 'freeze' || !useLatest) {
            const pkg = await this.getBestExistingMatch(pkgTarget);
            if (pkg) {
                var _this_log3, _this3;
                (_this_log3 = (_this3 = this).log) === null || _this_log3 === void 0 ? void 0 : _this_log3.call(_this3, 'installer/installTarget', `${pkgName} ${pkgScope} -> ${JSON.stringify(pkg)} (existing match)`);
                const installUrl = await this.resolver.pm.pkgToUrl(pkg, provider.provider, provider.layer);
                this.newInstalls = this.setResolution(pkgName, installUrl, pkgScope);
                this.setConstraint(pkgName, pkgTarget, pkgScope);
                return {
                    installUrl
                };
            }
        }
        const latestPkg = await this.resolver.pm.resolveLatestTarget(pkgTarget, provider, parentUrl, this.resolver);
        const pkgUrl = await this.resolver.pm.pkgToUrl(latestPkg, provider.provider, provider.layer);
        const installed = this.getConstraintFor(latestPkg.name, latestPkg.registry);
        // If there's an existing primary at a different version, check whether
        // the primary can be upgraded to latest. If it can, great - use latest.
        // If it can't, consolidate with the primary if our range allows it.
        // Otherwise we have to split (fall through to install latest):
        if (this.installs.primary[pkgName]) {
            const primaryUrl = this.installs.primary[pkgName].installUrl;
            if (primaryUrl !== pkgUrl) {
                // Can all existing installs be upgraded to latest?
                if (mode !== 'freeze' && this.tryUpgradeAllTo(latestPkg, pkgUrl, installed)) {
                // Yes - fall through to install latest
                } else {
                    // No - can we consolidate with the primary instead?
                    if (await this.inRange(primaryUrl, pkgTarget)) {
                        var _this_log4, _this4;
                        (_this_log4 = (_this4 = this).log) === null || _this_log4 === void 0 ? void 0 : _this_log4.call(_this4, 'installer/installTarget', `${pkgName} ${pkgScope} -> ${primaryUrl} (primary consolidation)`);
                        this.newInstalls = this.setResolution(pkgName, primaryUrl, pkgScope);
                        this.setConstraint(pkgName, pkgTarget, pkgScope);
                        return {
                            installUrl: primaryUrl
                        };
                    }
                    // No - for secondary installs, try best existing match before splitting:
                    if (!isTopLevel) {
                        const pkg = await this.getBestExistingMatch(pkgTarget);
                        if (pkg) {
                            var _this_log5, _this5;
                            (_this_log5 = (_this5 = this).log) === null || _this_log5 === void 0 ? void 0 : _this_log5.call(_this5, 'installer/installTarget', `${pkgName} ${pkgScope} -> ${JSON.stringify(latestPkg)} (existing match not latest)`);
                            const installUrl = await this.resolver.pm.pkgToUrl(pkg, provider.provider, provider.layer);
                            this.newInstalls = this.setResolution(pkgName, installUrl, pkgScope);
                            this.setConstraint(pkgName, pkgTarget, pkgScope);
                            return {
                                installUrl
                            };
                        }
                    }
                // Split - fall through to install latest
                }
            }
        } else if (mode !== 'freeze' && !useLatest && !isTopLevel && latestPkg && !this.tryUpgradeAllTo(latestPkg, pkgUrl, installed)) {
            // Secondary install with no primary: try best existing match
            const pkg = await this.getBestExistingMatch(pkgTarget);
            if (pkg) {
                var _this_log6, _this6;
                (_this_log6 = (_this6 = this).log) === null || _this_log6 === void 0 ? void 0 : _this_log6.call(_this6, 'installer/installTarget', `${pkgName} ${pkgScope} -> ${JSON.stringify(latestPkg)} (existing match not latest)`);
                const installUrl = await this.resolver.pm.pkgToUrl(pkg, provider.provider, provider.layer);
                this.newInstalls = this.setResolution(pkgName, installUrl, pkgScope);
                this.setConstraint(pkgName, pkgTarget, pkgScope);
                return {
                    installUrl
                };
            }
        }
        (_this_log = (_this = this).log) === null || _this_log === void 0 ? void 0 : _this_log.call(_this, 'installer/installTarget', `${pkgName} ${pkgScope} -> ${pkgUrl} (latest)`);
        this.newInstalls = this.setResolution(pkgName, pkgUrl, pkgScope);
        this.setConstraint(pkgName, pkgTarget, pkgScope);
        if (mode !== 'freeze') this.upgradeSupportedTo(latestPkg, pkgUrl, installed);
        return {
            installUrl: pkgUrl
        };
    }
    async installBuiltin(install, specifier, mode, parentUrl) {
        var _this_log, _this;
        (_this_log = (_this = this).log) === null || _this_log === void 0 ? void 0 : _this_log.call(_this, 'installer/install', `installing builtin ${specifier} from ${parentUrl}`);
        if (this.resolutions[install.name]) return this.installTarget(install.name, newPackageTarget(this.resolutions[install.name], this.opts.baseUrl, this.defaultRegistry, install.name), mode, null, parentUrl);
        const useLatestPjsonTarget = mode.includes('latest');
        // Find any existing locks in the current package scope, making sure
        // locks are always in-range for their parent scope pjsons:
        const existingResolution = getResolution(this.installs, install.name, null);
        if (!useLatestPjsonTarget && existingResolution) {
            var _this_log1, _this1;
            (_this_log1 = (_this1 = this).log) === null || _this_log1 === void 0 ? void 0 : _this_log1.call(_this1, 'installer/install', `existing lock for ${install.name} from ${parentUrl} is ${JSON.stringify(existingResolution)}`);
            return existingResolution;
        }
        // existing primary version fallback
        if (this.installs.primary[install.name]) {
            const { installUrl } = getResolution(this.installs, install.name, null);
            return {
                installUrl
            };
        }
        // global install fallback
        const definitelyPkgScope = await this.installBaseUrl;
        const target = newPackageTarget('*', new URL(definitelyPkgScope), this.defaultRegistry, install.name);
        const { installUrl } = await this.installTarget(install.name, target, mode, null, parentUrl);
        return {
            installUrl
        };
    }
    /**
   * Installs the given package specifier.
   *
   * @param {string} pkgName The package specifier being installed.
   * @param {InstallMode} mode Specifies how to interact with existing installs.
   * @param {`${string}/` | null} pkgScope URL of the package scope in which this install is occurring, null if it's a top-level install.
   * @param {`./${string}` | '.'} traceSubpath
   * @param {string} parentUrl URL of the parent for this install.
   * @returns {Promise<string | InstalledResolution>}
   */ async install(pkgName, mode, pkgScope = null, traceSubpath, parentUrl) {
        var _this_log, _this, _pcfg_dependencies, _pcfg_peerDependencies, _pcfg_optionalDependencies, _pcfg_devDependencies;
        (_this_log = (_this = this).log) === null || _this_log === void 0 ? void 0 : _this_log.call(_this, 'installer/install', `installing ${pkgName} from ${parentUrl} in scope ${pkgScope}`);
        // Anything installed in the scope of the installer's base URL is treated
        // as top-level, and hits the primary locks. Anything else is treated as
        // a secondary dependency:
        // TODO: wire this concept through the whole codebase.
        const isTopLevel = !pkgScope || pkgScope == this.installBaseUrl;
        if (this.resolutions[pkgName]) return this.installTarget(pkgName, newPackageTarget(this.resolutions[pkgName], this.opts.baseUrl, this.defaultRegistry, pkgName), mode, isTopLevel ? null : pkgScope, parentUrl);
        // Fetch the current scope's pjson:
        const definitelyPkgScope = pkgScope || await this.resolver.getPackageBase(parentUrl);
        const pcfg = await this.resolver.getPackageConfig(definitelyPkgScope) || {};
        // By default, we take an install target from the current scope's pjson:
        const pjsonTargetStr = ((_pcfg_dependencies = pcfg.dependencies) === null || _pcfg_dependencies === void 0 ? void 0 : _pcfg_dependencies[pkgName]) || ((_pcfg_peerDependencies = pcfg.peerDependencies) === null || _pcfg_peerDependencies === void 0 ? void 0 : _pcfg_peerDependencies[pkgName]) || ((_pcfg_optionalDependencies = pcfg.optionalDependencies) === null || _pcfg_optionalDependencies === void 0 ? void 0 : _pcfg_optionalDependencies[pkgName]) || isTopLevel && ((_pcfg_devDependencies = pcfg.devDependencies) === null || _pcfg_devDependencies === void 0 ? void 0 : _pcfg_devDependencies[pkgName]);
        const pjsonTarget = pjsonTargetStr && newPackageTarget(pjsonTargetStr, new URL(definitelyPkgScope), this.defaultRegistry, pkgName);
        const useLatestPjsonTarget = !!pjsonTarget && (isTopLevel && mode.includes('latest') || !isTopLevel && mode === 'latest-all');
        // Find any existing locks in the current package scope, making sure
        // locks are always in-range for their parent scope pjsons:
        const existingResolution = getResolution(this.installs, pkgName, isTopLevel ? null : pkgScope);
        if (!useLatestPjsonTarget && existingResolution && (isTopLevel || mode === 'freeze' || await this.inRange(existingResolution.installUrl, pjsonTarget.pkgTarget))) {
            var _this_log1, _this1;
            (_this_log1 = (_this1 = this).log) === null || _this_log1 === void 0 ? void 0 : _this_log1.call(_this1, 'installer/install', `existing lock for ${pkgName} from ${parentUrl} in scope ${pkgScope} is ${JSON.stringify(existingResolution)}`);
            return existingResolution;
        }
        // Pick up resolutions from flattened scopes like 'https://ga.jspm.io/"
        // for secondary installs, if they're in range for the current pjson, or
        // if we're in a freeze install:
        if (!isTopLevel && this.opts.inputMapFallbacks !== false) {
            const semverCompatible = this.opts.inputMapFallbacks === 'semver-compatible';
            const flattenedResolution = await getFlattenedResolution(this.installs, pkgName, pkgScope, traceSubpath, semverCompatible, semverCompatible && pjsonTarget ? async (installUrl)=>this.inRange(installUrl, pjsonTarget.pkgTarget) : null);
            if (!useLatestPjsonTarget && flattenedResolution && (mode === 'freeze' && !semverCompatible || pjsonTarget && await this.inRange(flattenedResolution.installUrl, pjsonTarget.pkgTarget))) {
                this.newInstalls = this.setResolution(pkgName, flattenedResolution.installUrl, pkgScope);
                return flattenedResolution;
            }
        }
        // Use the pjson target if it exists:
        if (pjsonTarget) {
            return this.installTarget(pkgName, pjsonTarget, mode, isTopLevel ? null : pkgScope, parentUrl);
        }
        // existing primary version fallback
        if (this.installs.primary[pkgName]) {
            const { installUrl } = getResolution(this.installs, pkgName, null);
            return {
                installUrl
            };
        }
        // global install fallback
        const target = newPackageTarget('*', new URL(definitelyPkgScope), this.defaultRegistry, pkgName);
        const { installUrl } = await this.installTarget(pkgName, target, mode, isTopLevel ? null : pkgScope, parentUrl);
        return {
            installUrl
        };
    }
    // Cached set of package URLs - built once then maintained incrementally
    get pkgUrls() {
        if (this._pkgUrls) return this._pkgUrls;
        const pkgUrls = new Set();
        for (const pkgUrl of Object.values(this.installs.primary)){
            pkgUrls.add(pkgUrl.installUrl);
        }
        for (const scope of Object.keys(this.installs.secondary)){
            for (const { installUrl } of Object.values(this.installs.secondary[scope])){
                pkgUrls.add(installUrl);
            }
        }
        for (const flatScope of Object.keys(this.installs.flattened)){
            for (const { resolution: { installUrl } } of Object.values(this.installs.flattened[flatScope]).flat()){
                pkgUrls.add(installUrl);
            }
        }
        this._pkgUrls = pkgUrls;
        return pkgUrls;
    }
    // Set resolution and maintain caches incrementally
    setResolution(name, installUrl, pkgScope = null) {
        let changed;
        if (pkgScope === null) {
            const existing = this.installs.primary[name];
            if (existing && existing.installUrl === installUrl) {
                changed = false;
            } else {
                this.installs.primary[name] = {
                    installUrl
                };
                changed = true;
            }
        } else {
            this.installs.secondary[pkgScope] = this.installs.secondary[pkgScope] || {};
            const existing = this.installs.secondary[pkgScope][name];
            if (existing && existing.installUrl === installUrl) {
                changed = false;
            } else {
                this.installs.secondary[pkgScope][name] = {
                    installUrl
                };
                changed = true;
            }
        }
        // Maintain the pkgUrls cache incrementally
        if (this._pkgUrls) {
            this._pkgUrls.add(installUrl);
        }
        // Maintain the pkgsByKey index incrementally
        if (this._pkgsByKey && changed) {
            const parsed = this.resolver.pm.parseUrlPkg(installUrl);
            if (parsed) {
                const key = `${parsed.pkg.registry}:${parsed.pkg.name}`;
                const list = this._pkgsByKey.get(key);
                if (list) {
                    // Check if this exact version is already in the list
                    if (!list.some((p)=>p.version === parsed.pkg.version)) {
                        list.push(parsed.pkg);
                    }
                } else {
                    this._pkgsByKey.set(key, [
                        parsed.pkg
                    ]);
                }
            }
        }
        return changed;
    }
    // Set constraint and maintain the index incrementally
    setConstraint(name, target, pkgScope = null) {
        if (pkgScope === null) {
            // Don't overwrite a specific primary constraint with a wildcard one.
            // This prevents subpath installs (e.g. react/jsx-runtime → react@*)
            // from diluting an explicit version constraint (e.g. react@18.3.1):
            const existing = this.constraints.primary[name];
            if (existing && !(existing instanceof URL) && !(target instanceof URL) && !existing.range.isWildcard && target.range.isWildcard) return;
            this.constraints.primary[name] = target;
        } else {
            (this.constraints.secondary[pkgScope] = this.constraints.secondary[pkgScope] || Object.create(null))[name] = target;
        }
        // Invalidate the index - it will be rebuilt lazily on next access
        // This is simpler and safer than trying to maintain it incrementally
        // since setConstraint can update existing constraints
        this._constraintsByKey = null;
    }
    // Get constraints for a package, building index lazily
    getConstraintFor(name, registry) {
        if (!this._constraintsByKey) {
            // Build the index
            const index = new Map();
            for (const [alias, target] of Object.entries(this.constraints.primary)){
                if (target instanceof URL) continue;
                const key = `${target.registry}:${target.name}`;
                const constraint = {
                    alias,
                    pkgScope: null,
                    range: target.range
                };
                const list = index.get(key);
                if (list) list.push(constraint);
                else index.set(key, [
                    constraint
                ]);
            }
            for (const [pkgScope, scope] of Object.entries(this.constraints.secondary)){
                for (const [alias, target] of Object.entries(scope)){
                    if (target instanceof URL) continue;
                    const key = `${target.registry}:${target.name}`;
                    const constraint = {
                        alias,
                        pkgScope: pkgScope,
                        range: target.range
                    };
                    const list = index.get(key);
                    if (list) list.push(constraint);
                    else index.set(key, [
                        constraint
                    ]);
                }
            }
            this._constraintsByKey = index;
        }
        return this._constraintsByKey.get(`${registry}:${name}`) || [];
    }
    // Build the package index lazily
    buildPkgIndex() {
        if (this._pkgsByKey) return this._pkgsByKey;
        const index = new Map();
        for (const pkgUrl of this.pkgUrls){
            const parsed = this.resolver.pm.parseUrlPkg(pkgUrl);
            if (parsed) {
                const key = `${parsed.pkg.registry}:${parsed.pkg.name}`;
                const list = index.get(key);
                if (list) {
                    if (!list.some((p)=>p.version === parsed.pkg.version)) {
                        list.push(parsed.pkg);
                    }
                } else {
                    index.set(key, [
                        parsed.pkg
                    ]);
                }
            }
        }
        this._pkgsByKey = index;
        return index;
    }
    async getBestExistingMatch(matchPkg) {
        const index = this.buildPkgIndex();
        const key = `${matchPkg.registry}:${matchPkg.name}`;
        const candidates = index.get(key);
        if (!candidates) return null;
        let bestMatch = null;
        for (const pkg of candidates){
            if (matchPkg.range.has(pkg.version, true)) {
                if (bestMatch) {
                    bestMatch = Semver.compare(new Semver(bestMatch.version), pkg.version) === -1 ? pkg : bestMatch;
                } else {
                    bestMatch = pkg;
                }
            }
        }
        return bestMatch;
    }
    async inRange(pkg, target) {
        var _this;
        // URL|null targets don't have ranges, so nothing is in-range for them:
        if (!target || target instanceof URL) return false;
        const pkgExact = typeof pkg === 'string' ? (_this = await this.resolver.pm.parseUrlPkg(pkg)) === null || _this === void 0 ? void 0 : _this.pkg : pkg;
        if (!pkgExact) return false;
        return pkgExact.registry === target.registry && pkgExact.name === target.name && target.range.has(pkgExact.version, true);
    }
    // upgrade all existing packages to this package if possible
    tryUpgradeAllTo(pkg, pkgUrl, installed) {
        const pkgVersion = new Semver(pkg.version);
        let allCompatible = true;
        for (const { range } of installed){
            if (!range.has(pkgVersion)) allCompatible = false;
        }
        if (!allCompatible) return false;
        // if every installed version can support this new version, update them all
        for (const { alias, pkgScope } of installed){
            const resolution = getResolution(this.installs, alias, pkgScope);
            if (!resolution) continue;
            this.newInstalls = this.setResolution(alias, pkgUrl, pkgScope);
        }
        return true;
    }
    // upgrade some exsiting packages to the new install
    upgradeSupportedTo(pkg, pkgUrl, installed) {
        const pkgVersion = new Semver(pkg.version);
        for (const { alias, pkgScope, range } of installed){
            const resolution = getResolution(this.installs, alias, pkgScope);
            if (!resolution) continue;
            if (!range.has(pkgVersion, true)) continue;
            this.newInstalls = this.setResolution(alias, pkgUrl, pkgScope);
        }
    }
    constructor(baseUrl, opts, log, resolver){
        var _this_providers, _npm;
        _define_property(this, "opts", void 0);
        _define_property(this, "installs", void 0);
        _define_property(this, "constraints", void 0);
        _define_property(this, "newInstalls", false);
        // @ts-ignore
        _define_property(this, "installBaseUrl", void 0);
        _define_property(this, "hasLock", false);
        _define_property(this, "defaultProvider", {
            provider: 'jspm.io',
            layer: 'default'
        });
        _define_property(this, "defaultRegistry", 'npm');
        _define_property(this, "providers", void 0);
        _define_property(this, "resolutions", void 0);
        _define_property(this, "log", void 0);
        _define_property(this, "resolver", void 0);
        // Cached set of package URLs - maintained incrementally for performance
        _define_property(this, "_pkgUrls", null);
        // Index of packages by registry:name for fast lookup in getBestExistingMatch
        _define_property(this, "_pkgsByKey", null);
        // Index of constraints by registry:name for fast lookup
        _define_property(this, "_constraintsByKey", null);
        this.log = log;
        this.resolver = resolver;
        this.resolver.installer = this;
        this.resolutions = opts.resolutions || {};
        this.installBaseUrl = baseUrl;
        this.opts = opts;
        this.hasLock = !!opts.lock;
        this.installs = opts.lock || {
            primary: Object.create(null),
            secondary: Object.create(null),
            flattened: Object.create(null)
        };
        this.constraints = {
            primary: Object.create(null),
            secondary: Object.create(null)
        };
        if (opts.defaultRegistry) this.defaultRegistry = opts.defaultRegistry;
        if (opts.defaultProvider) this.defaultProvider = parseProviderStr(opts.defaultProvider);
        this.providers = Object.assign({}, registryProviders);
        var _;
        // TODO: this is a hack, as we currently don't have proper support for
        // providers owning particular registries. The proper way to do this would
        // be to have each provider declare what registries it supports, and
        // construct a providers mapping at init when we detect default provider:
        if (opts.defaultProvider.includes('deno')) (_ = (_this_providers = this.providers)[_npm = 'npm:']) !== null && _ !== void 0 ? _ : _this_providers[_npm] = 'jspm.io';
        if (opts.providers) Object.assign(this.providers, opts.providers);
    }
}
function parseProviderStr(provider) {
    const split = provider.split('#');
    return {
        provider: split[0],
        layer: split[1] || 'default'
    };
}


//# sourceMappingURL=installer.js.map