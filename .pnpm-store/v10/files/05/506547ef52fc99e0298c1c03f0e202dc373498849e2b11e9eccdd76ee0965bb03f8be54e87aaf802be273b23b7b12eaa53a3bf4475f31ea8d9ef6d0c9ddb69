function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
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
import * as deno from './deno.js';
import * as jspm from './jspm.js';
import * as skypack from './skypack.js';
import * as jsdelivr from './jsdelivr.js';
import * as unpkg from './unpkg.js';
import * as node from './node.js';
import * as esmsh from './esmsh.js';
import { JspmError } from '../common/err.js';
var _pm = /*#__PURE__*/ new WeakMap();
/**
 * Context provided to all provider methods
 * Contains necessary services and configuration
 */ export class ProviderContext {
    constructor(pm, log, fetchOpts){
        /**
   * Logger instance for provider operations
   */ _define_property(this, "log", void 0);
        /**
   * Fetch options for provider operations
   */ _define_property(this, "fetchOpts", void 0);
        /**
   * Custom context object for providers
   */ _define_property(this, "context", void 0);
        _class_private_field_init(this, _pm, {
            writable: true,
            value: void 0
        });
        _class_private_field_set(this, _pm, pm);
        this.log = log;
        this.fetchOpts = fetchOpts;
        this.context = {};
    }
}
var _getProviderContext = /*#__PURE__*/ new WeakSet(), /**
   * Get a provider by name
   *
   * @param name Name of the provider
   * @returns The provider instance
   */ _getProvider = /*#__PURE__*/ new WeakSet(), /**
   * Configure all providers with the given configuration
   *
   * @param providerConfig Configuration for providers
   */ _configure = /*#__PURE__*/ new WeakSet();
/**
 * Provider manager to handle provider registration, lookup and operations
 */ export class ProviderManager {
    /**
   * Add a custom provider to this provider manager
   *
   * @param name Name of the provider
   * @param provider Provider implementation
   */ addProvider(name, provider) {
        this.providers[name] = provider;
    }
    /**
   * Find the provider name for a given URL
   *
   * @param url URL to find the provider for
   * @returns The name of the provider, or null if no provider handles this URL
   */ providerNameForUrl(url) {
        for (const name of Object.keys(this.providers).reverse()){
            var _provider_ownsUrl, _provider_parseUrlPkg;
            const provider = this.providers[name];
            const context = _class_private_method_get(this, _getProviderContext, getProviderContext).call(this, name);
            if (((_provider_ownsUrl = provider.ownsUrl) === null || _provider_ownsUrl === void 0 ? void 0 : _provider_ownsUrl.call(context, url)) || ((_provider_parseUrlPkg = provider.parseUrlPkg) === null || _provider_parseUrlPkg === void 0 ? void 0 : _provider_parseUrlPkg.call(context, url))) {
                return name;
            }
        }
        return null;
    }
    /**
   * Parse a URL to get package information
   *
   * @param url URL to parse
   * @returns Package information or null if URL can't be parsed
   */ parseUrlPkg(url) {
        for (const provider of Object.keys(this.providers).reverse()){
            const providerInstance = this.providers[provider];
            const context = _class_private_method_get(this, _getProviderContext, getProviderContext).call(this, provider);
            if (!providerInstance.parseUrlPkg) continue;
            const result = providerInstance.parseUrlPkg.call(context, url);
            if (result) return {
                pkg: 'pkg' in result ? result.pkg : result,
                source: {
                    provider,
                    layer: 'layer' in result ? result.layer : 'default'
                },
                builtin: 'builtin' in result ? result.builtin : null
            };
        }
        return null;
    }
    /**
   * Convert a package to a URL
   *
   * @param pkg Package to convert
   * @param provider Provider name
   * @param layer Layer to use
   * @returns URL for the package
   */ pkgToUrl(pkg, provider, layer = 'default') {
        const providerInstance = _class_private_method_get(this, _getProvider, getProvider).call(this, provider);
        if (!providerInstance.pkgToUrl) throw new JspmError(`Provider ${provider} does not provide versioned package support`);
        return _class_private_method_get(this, _getProvider, getProvider).call(this, provider).pkgToUrl.call(_class_private_method_get(this, _getProviderContext, getProviderContext).call(this, provider), pkg, layer);
    }
    /**
   * Get the package config corresponding to a package URL
   *
   * @param pkgUrl URL to the package
   * @returns
   */ async getPackageConfig(pkgUrl) {
        const name = this.providerNameForUrl(pkgUrl);
        if (name) {
            var _class_private_method_get_call_getPackageConfig;
            const pcfg = await ((_class_private_method_get_call_getPackageConfig = _class_private_method_get(this, _getProvider, getProvider).call(this, name).getPackageConfig) === null || _class_private_method_get_call_getPackageConfig === void 0 ? void 0 : _class_private_method_get_call_getPackageConfig.call(_class_private_method_get(this, _getProviderContext, getProviderContext).call(this, name), pkgUrl));
            return pcfg || null;
        }
    }
    /**
   * Obtain a file listing of a package boundary if available
   */ async getFileList(pkgUrl) {
        if (!pkgUrl.endsWith('/')) pkgUrl += '/';
        const name = this.providerNameForUrl(pkgUrl);
        if (name) {
            var _class_private_method_get_call_getFileList;
            const fileList = await ((_class_private_method_get_call_getFileList = _class_private_method_get(this, _getProvider, getProvider).call(this, name).getFileList) === null || _class_private_method_get_call_getFileList === void 0 ? void 0 : _class_private_method_get_call_getFileList.call(_class_private_method_get(this, _getProviderContext, getProviderContext).call(this, name), pkgUrl));
            return fileList || undefined;
        }
    }
    /**
   * Resolve a builtin module
   *
   * @param specifier Module specifier
   * @returns Resolved string, install target and exports subpath, or undefined if not resolvable
   */ resolveBuiltin(specifier, env) {
        for (const [name, provider] of Object.entries(this.providers).reverse()){
            if (!provider.resolveBuiltin) continue;
            const context = _class_private_method_get(this, _getProviderContext, getProviderContext).call(this, name);
            const builtin = provider.resolveBuiltin.call(context, specifier, env);
            if (builtin) return builtin;
        }
        return undefined;
    }
    async resolveLatestTarget(target, { provider, layer }, parentUrl, resolver) {
        var _providerInstance_resolveLatestTarget;
        const providerInstance = _class_private_method_get(this, _getProvider, getProvider).call(this, provider);
        if (!providerInstance.resolveLatestTarget) throw new JspmError(`Provider ${provider} does not provide versioned package support, looking up ${target.registry}:${target.name}`);
        const pkg = await ((_providerInstance_resolveLatestTarget = providerInstance.resolveLatestTarget) === null || _providerInstance_resolveLatestTarget === void 0 ? void 0 : _providerInstance_resolveLatestTarget.call(_class_private_method_get(this, _getProviderContext, getProviderContext).call(this, provider), target, layer, parentUrl, resolver));
        if (pkg) return pkg;
        if (provider === 'nodemodules') {
            throw new JspmError(`Cannot find package ${target.name} in node_modules from parent ${parentUrl}. Try installing "${target.name}" with npm first adding it to package.json "dependencies" or running "npm install --save ${target.name}".`);
        } else {
            throw new JspmError(`Unable to resolve package ${target.registry}:${target.name} in range "${target.range}" from parent ${parentUrl}.`);
        }
    }
    /**
   * Get the supported provider strings for all providers
   *
   * @returns List of provider string identifiers
   */ getProviderStrings() {
        let res = [];
        for (const [name, provider] of Object.entries(this.providers)){
            var _provider_supportedLayers;
            for (const layer of (_provider_supportedLayers = provider.supportedLayers) !== null && _provider_supportedLayers !== void 0 ? _provider_supportedLayers : [
                'default'
            ])res.push(`${name}${layer === 'default' ? '' : `#${layer}`}`);
        }
        return res;
    }
    /**
   * Downloads the given package files into the local folder path outDir
   * Does not include the import map, which must be merged separately.
   */ download(pkg, providerName) {
        const provider = _class_private_method_get(this, _getProvider, getProvider).call(this, providerName);
        if (!provider.download) {
            throw new JspmError(`Provider "${providerName}" does not currently support publishing from JSPM`);
        }
        return provider.download.call(_class_private_method_get(this, _getProviderContext, getProviderContext).call(this, providerName), pkg);
    }
    async publish(pkg, providerName, imports, files, importMap) {
        const provider = _class_private_method_get(this, _getProvider, getProvider).call(this, providerName);
        if (!provider.publish) {
            throw new JspmError(`Provider "${providerName}" does not support publishing on JSPM`);
        }
        return provider.publish.call(_class_private_method_get(this, _getProviderContext, getProviderContext).call(this, providerName), pkg, files, importMap, imports);
    }
    /**
   * Authenticate with a provider to obtain an authentication token
   *
   * @param providerName Name of the provider to authenticate with
   * @param options Authentication options
   * @returns Promise resolving to the authentication token
   */ async auth(providerName, options = {}) {
        const provider = _class_private_method_get(this, _getProvider, getProvider).call(this, providerName);
        if (!provider.auth) {
            throw new JspmError(`Provider "${providerName}" does not support authentication`);
        }
        return provider.auth.call(_class_private_method_get(this, _getProviderContext, getProviderContext).call(this, providerName), options);
    }
    /**
   * Create a new ProviderManager with the given providers
   *
   * @param customProviders Custom provider definitions to add
   */ constructor(log, fetchOpts, providerConfig = {}, customProviders = {}){
        _class_private_method_init(this, _getProviderContext);
        _class_private_method_init(this, _getProvider);
        _class_private_method_init(this, _configure);
        _define_property(this, "log", void 0);
        _define_property(this, "fetchOpts", void 0);
        _define_property(this, "providers", void 0);
        _define_property(this, "contexts", void 0);
        this.log = log;
        this.fetchOpts = fetchOpts;
        this.contexts = {};
        this.providers = {
            ...defaultProviders
        };
        for (const [name, provider] of Object.entries(customProviders)){
            this.addProvider(name, provider);
        }
        _class_private_method_get(this, _configure, configure).call(this, providerConfig);
    }
}
function getProviderContext(name) {
    return this.contexts[name] || (this.contexts[name] = new ProviderContext(this, this.log, this.fetchOpts));
}
function getProvider(name) {
    const provider = this.providers[name];
    if (provider) return provider;
    throw new JspmError(`No provider named "${name}" has been defined.`);
}
function configure(providerConfig) {
    for (const [providerName, provider] of Object.entries(this.providers)){
        if (provider.configure) {
            provider.configure.call(_class_private_method_get(this, _getProviderContext, getProviderContext).call(this, providerName), providerConfig[providerName] || {});
        }
    }
}
export const defaultProviders = {
    deno,
    jsdelivr,
    node,
    skypack,
    unpkg,
    'esm.sh': esmsh,
    'jspm.io': jspm
};
export function getDefaultProviderStrings() {
    let res = [];
    for (const [name, provider] of Object.entries(defaultProviders)){
        var _provider_supportedLayers;
        for (const layer of (_provider_supportedLayers = provider.supportedLayers) !== null && _provider_supportedLayers !== void 0 ? _provider_supportedLayers : [
            'default'
        ])res.push(`${name}${layer === 'default' ? '' : `#${layer}`}`);
    }
    return res;
}
export const registryProviders = {
    'denoland:': 'deno',
    'deno:': 'deno'
};
export const mappableSchemes = new Set([
    'npm',
    'deno',
    'node'
]);
export const builtinSchemes = new Set([
    'node',
    'deno'
]);


//# sourceMappingURL=index.js.map