/**
 * Copyright 2020-2025 Guy Bedford
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */ /**
 * The main entry point into the @jspm/generator package.
 * @module generator.ts
 */ function _define_property(obj, key, value) {
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
import { baseUrl as _baseUrl, isURL, relativeUrl, resolveUrl } from './common/url.js';
import { parseTarget, validatePkgName } from './install/package.js';
import TraceMap from './trace/tracemap.js';
// @ts-ignore
import { clearCache as clearFetchCache, fetch as _fetch, setFetch, setRetryCount, setVirtualSourceData } from './common/fetch.js';
import { ImportMap } from '@jspm/import-map';
import { SemverRange } from 'sver';
import { JspmError } from './common/err.js';
import { getIntegrity } from './common/integrity.js';
import { createLogger } from './common/log.js';
import { Replacer } from './common/str.js';
import { analyzeHtml } from './html/analyze.js';
import { getDefaultProviderStrings, ProviderManager } from './providers/index.js';
import * as nodemodules from './providers/nodemodules.js';
import { Resolver } from './trace/resolver.js';
import { getMaybeWrapperUrl } from './common/wrapper.js';
import { expandExportsResolutions } from './common/package.js';
import { isNode } from './common/env.js';
import { minimatch } from 'minimatch';
/**
 * Supports clearing the global fetch cache in Node.js.
 *
 * @example
 *
 * ```js
 * import { clearCache } from '@jspm/generator';
 * clearCache();
 * ```
 */ export async function clearCache() {
    return clearFetchCache();
}
function createFetchOptions(cache = true, fetchOptions = {}) {
    let fetchOpts = {
        retry: 1,
        timeout: 10000,
        ...fetchOptions,
        headers: {
            'Accept-Encoding': 'gzip, br'
        }
    };
    if (cache === 'offline') fetchOpts.cache = 'force-cache';
    else if (!cache) fetchOpts.cache = 'no-store';
    return fetchOpts;
}
/**
 * Generator.
 */ export class Generator {
    /**
   * Add new custom mappings and lock resolutions to the input map
   * of the generator, which are then applied in subsequent installs.
   *
   * @param jsonOrHtml The mappings are parsed as a JSON data object or string, falling back to reading an inline import map from an HTML file.
   * @param mapUrl An optional URL for the map to handle relative resolutions, defaults to generator mapUrl.
   * @param rootUrl An optional root URL for the map to handle root resolutions, defaults to generator rootUrl.
   * @returns The list of modules pinned by this import map or HTML.
   */ async addMappings(jsonOrHtml, mapUrl = this.mapUrl, rootUrl = this.rootUrl, preloads) {
        if (typeof mapUrl === 'string') mapUrl = new URL(mapUrl, this.baseUrl);
        if (typeof rootUrl === 'string') rootUrl = new URL(rootUrl, this.baseUrl);
        let htmlModules;
        if (typeof jsonOrHtml === 'string') {
            try {
                jsonOrHtml = JSON.parse(jsonOrHtml);
            } catch  {
                const analysis = analyzeHtml(jsonOrHtml, mapUrl);
                jsonOrHtml = analysis.map.json || {};
                preloads = (preloads || []).concat(analysis.preloads.map((preload)=>{
                    var _preload_attrs_href;
                    return (_preload_attrs_href = preload.attrs.href) === null || _preload_attrs_href === void 0 ? void 0 : _preload_attrs_href.value;
                }).filter((x)=>x));
                htmlModules = [
                    ...new Set([
                        ...analysis.staticImports,
                        ...analysis.dynamicImports
                    ])
                ];
            }
        }
        await this.traceMap.addInputMap(jsonOrHtml, mapUrl, rootUrl, preloads);
        return htmlModules || [
            ...this.traceMap.pins || Object.keys(this.traceMap.inputMap.imports)
        ];
    }
    /**
   * Retrieve the lockfile data from the installer
   */ getLock() {
        return JSON.parse(JSON.stringify(this.traceMap.installer.installs));
    }
    /**
   * Link a module, installing all dependencies necessary into the map
   * to support its execution including static and dynamic module imports.
   *
   * @param specifier Module or list of modules to link
   * @param parentUrl Optional parent URL
   *
   * Link specifiers are module specifiers - they can be bare specifiers resolved through
   * package resolution, relative URLs, or full URLs, for example:
   *
   * @example
   * ```js
   * await generator.link(['react', './local.js']);
   * ```
   *
   * In the above, an import map will be constructed based on the resolution of react,
   * and tracing all its dependencies in turn, as well as for the local module, and
   * any dependencies it has in turn as well, installing all dependencies into the import
   * map as needed.
   *
   * In general, using `generator.link(entryPoints)` is recommended over `generator.install()`,
   * since it represents a real module graph linkage as would be required in a browser.
   *
   * By using link, we guarantee that the import map constructed is only for what is truly
   * needed and loaded. Dynamic imports that are statically analyzable are traced by link.
   *
   * If a custom resolver is configured, it will be applied to the provided specifiers
   * and all their dependencies during the linking process.
   */ async link(specifier, parentUrl) {
        if (typeof specifier === 'string') specifier = [
            specifier
        ];
        let error = false;
        await this.traceMap.processInputMap;
        let pins;
        try {
            pins = await Promise.all(specifier.map((specifier)=>this.traceMap.visit(specifier, {
                    installMode: 'freeze',
                    toplevel: !this.scopedLink
                }, parentUrl || this.baseUrl.href)));
            if (this.traceMap.pins) {
                for (const s of specifier){
                    if (!this.traceMap.pins.includes(s)) this.traceMap.pins.push(s);
                }
            }
        } catch (e) {
            error = true;
            throw e;
        } finally{
            const { map, staticDeps, dynamicDeps } = await this.traceMap.extractMap(this.traceMap.pins || pins || [], this.integrity, !this.scopedLink, parentUrl);
            this.map = map;
            if (!error) return {
                staticDeps,
                dynamicDeps
            };
        }
    }
    /**
   * Links every imported module in the given HTML file, installing all
   * dependencies necessary to support its execution.
   *
   * @param html HTML to link
   * @param htmlUrl URL of the given HTML
   */ async linkHtml(html, htmlUrl) {
        if (Array.isArray(html)) {
            const impts = await Promise.all(html.map((h)=>this.linkHtml(h, htmlUrl)));
            return [
                ...new Set(impts)
            ].reduce((a, b)=>a.concat(b), []);
        }
        let resolvedUrl;
        if (htmlUrl) {
            if (typeof htmlUrl === 'string') {
                resolvedUrl = new URL(resolveUrl(htmlUrl, this.mapUrl, this.rootUrl));
            } else {
                resolvedUrl = htmlUrl;
            }
        }
        const analysis = analyzeHtml(html, resolvedUrl);
        const impts = [
            ...new Set([
                ...analysis.staticImports,
                ...analysis.dynamicImports
            ])
        ];
        await Promise.all(impts.map((impt)=>this.link(impt, resolvedUrl === null || resolvedUrl === void 0 ? void 0 : resolvedUrl.href)));
        return impts;
    }
    /**
   * Inject the import map into the provided HTML source
   *
   * @param html HTML source to inject into
   * @param opts Injection options
   * @returns HTML source with import map injection
   */ async htmlInject(html, { trace = false, pins = !trace, htmlUrl = this.mapUrl, rootUrl = this.rootUrl, preload = false, integrity = false, whitespace = true, esModuleShims = true, comment = true } = {}) {
        if (comment === true) comment = ' Generated by @jspm/generator - https://github.com/jspm/generator ';
        if (typeof htmlUrl === 'string') htmlUrl = new URL(htmlUrl);
        const analysis = analyzeHtml(html, htmlUrl);
        let modules = pins === true ? this.traceMap.pins || Object.keys(this.traceMap.inputMap.imports) : Array.isArray(pins) ? pins : [];
        if (trace) {
            const impts = await this.linkHtml(html, htmlUrl);
            modules = [
                ...new Set([
                    ...modules,
                    ...impts
                ])
            ];
        }
        try {
            var { map, staticDeps, dynamicDeps } = await this.extractMap(modules, htmlUrl, rootUrl, integrity);
        } catch (err) {
            // Most likely cause of a generation failure:
            err.message += '\n\nIf you are linking locally against your node_modules folder, make sure that you have all the necessary dependencies installed.';
        }
        const preloadDeps = preload === 'all' ? [
            ...new Set([
                ...staticDeps,
                ...dynamicDeps
            ])
        ] : staticDeps;
        const newlineTab = !whitespace ? analysis.newlineTab : analysis.newlineTab.includes('\n') ? analysis.newlineTab : '\n' + analysis.newlineTab;
        const replacer = new Replacer(html);
        let esms = '';
        if (esModuleShims) {
            let esmsPkg;
            try {
                esmsPkg = await this.traceMap.resolver.pm.resolveLatestTarget({
                    name: 'es-module-shims',
                    registry: 'npm',
                    range: new SemverRange('*'),
                    unstable: false
                }, this.traceMap.installer.defaultProvider, this.baseUrl.href, this.traceMap.resolver);
            } catch (err) {
                // This usually happens because the user is trying to use their
                // node_modules as the provider but has not installed the shim:
                let errMsg = `Unable to resolve "es-module-shims@*" under current provider "${this.traceMap.installer.defaultProvider.provider}".`;
                if (this.traceMap.installer.defaultProvider.provider === 'nodemodules') {
                    errMsg += `\n\nJspm automatically injects a shim so that the import map in your HTML file will be usable by older browsers.\nYou may need to run "npm install es-module-shims" to install the shim if you want to link against your local node_modules folder.`;
                }
                errMsg += `\nTo disable the import maps polyfill injection, set esModuleShims: false.`;
                throw new JspmError(errMsg);
            }
            let esmsUrl = await this.traceMap.resolver.pm.pkgToUrl(esmsPkg, this.traceMap.installer.defaultProvider.provider, this.traceMap.installer.defaultProvider.layer) + 'dist/es-module-shims.js';
            // detect esmsUrl as a wrapper URL
            esmsUrl = await getMaybeWrapperUrl(esmsUrl, this.traceMap.resolver.fetchOpts);
            if (htmlUrl || rootUrl) esmsUrl = relativeUrl(new URL(esmsUrl), new URL(rootUrl !== null && rootUrl !== void 0 ? rootUrl : htmlUrl), !!rootUrl);
            esms = `<script async src="${esmsUrl}" crossorigin="anonymous"${integrity ? ` integrity="${await getIntegrity(new Uint8Array(await (await fetch(esmsUrl, this.traceMap.resolver.fetchOpts)).arrayBuffer()))}"` : ''}></script>${newlineTab}`;
            if (analysis.esModuleShims) replacer.remove(analysis.esModuleShims.start, analysis.esModuleShims.end, true);
        }
        for (const preload of analysis.preloads){
            replacer.remove(preload.start, preload.end, true);
        }
        let preloads = '';
        if (preload && preloadDeps.length) {
            let first = true;
            for (let dep of preloadDeps.sort()){
                if (first || whitespace) preloads += newlineTab;
                if (first) first = false;
                const url = rootUrl || htmlUrl ? relativeUrl(new URL(dep), new URL(rootUrl || htmlUrl), !!rootUrl) : dep;
                preloads += `<link rel="modulepreload" href="${url}"${integrity ? ` integrity="${await getIntegrity(new Uint8Array(await (await fetch(new URL(dep, this.baseUrl).href, this.traceMap.resolver.fetchOpts)).arrayBuffer()))}"` : ''} />`;
            }
        }
        if (comment) {
            const existingComment = analysis.comments.find((c)=>replacer.source.slice(replacer.idx(c.start), replacer.idx(c.end)).includes(comment));
            if (existingComment) {
                replacer.remove(existingComment.start, existingComment.end, true);
            }
        }
        replacer.replace(analysis.map.start, analysis.map.end, (comment ? '<!--' + comment + '-->' + newlineTab : '') + esms + '<script type="importmap">' + (whitespace ? newlineTab : '') + JSON.stringify(map, null, whitespace ? 2 : 0).replace(/\n/g, newlineTab) + (whitespace ? newlineTab : '') + '</script>' + preloads + (analysis.map.newScript ? newlineTab : ''));
        return replacer.source;
    }
    async install(install, mode) {
        if (install === 'default' || install === 'latest-primaries' || install === 'latest-all' || install === 'freeze') {
            mode = install;
            install = [];
        }
        return this._install(install, mode);
    }
    async _install(install, mode) {
        // If there are no arguments, then we reinstall all the top-level locks:
        if (install === null || install === undefined || Array.isArray(install) && install.length === 0) {
            await this.traceMap.processInputMap;
            // To match the behaviour of an argumentless `npm install`, we use
            // existing resolutions for everything unless it's out-of-range:
            mode !== null && mode !== void 0 ? mode : mode = 'default';
            if (Object.keys(this.traceMap.installer.installs.primary).length) {
                return this._install(Object.entries(this.traceMap.installer.installs.primary).map(([alias, target])=>{
                    const pkgTarget = this.traceMap.installer.constraints.primary[alias];
                    // Try to reinstall lock against constraints if possible, otherwise
                    // reinstall it as a URL directly (which has the downside that it
                    // won't have NPM versioning semantics):
                    let newTarget = target.installUrl;
                    if (pkgTarget) {
                        if (pkgTarget instanceof URL) {
                            newTarget = pkgTarget.href;
                        } else {
                            newTarget = `${pkgTarget.registry}:${pkgTarget.name}`;
                        }
                    }
                    return {
                        alias,
                        target: newTarget
                    };
                }), mode);
            }
        }
        if (!Array.isArray(install)) install = [
            install
        ];
        await this.traceMap.processInputMap; // don't race input processing
        const imports = (await Promise.all(install.map(async (install)=>{
            // Resolve input information to a target package:
            let alias, target, subpath, subpaths;
            if (typeof install === 'string' || typeof install.target === 'string') {
                ({ alias, target, subpath } = await installToTarget.call(this, install, this.traceMap.installer.defaultRegistry));
                if (install === null || install === void 0 ? void 0 : install.subpaths) subpaths = install.subpaths;
            } else {
                ({ alias, target, subpath, subpaths } = install);
                validatePkgName(alias);
            }
            this.log('generator/install', `Adding primary constraint for ${alias}: ${JSON.stringify(target)}`);
            // By default, an install takes the latest compatible version for primary
            // dependencies, and existing in-range versions for secondaries:
            mode !== null && mode !== void 0 ? mode : mode = 'latest-primaries';
            const installed = await this.traceMap.add(alias, target, mode);
            // expand all package subpaths
            if (subpaths === true) {
                const pcfg = await this.traceMap.resolver.getPackageConfig(installed.installUrl);
                // no entry point case
                if (!pcfg.exports && !pcfg.main) {
                    return [];
                }
                // main only
                if (!pcfg.exports || !Object.keys(pcfg.exports).every((expt)=>expt[0] === '.')) {
                    return alias;
                }
                // If the provider supports it, get a file listing for the package to assist with glob expansions
                const fileList = await this.traceMap.resolver.getFileList(installed.installUrl);
                // Expand exports into entry point list
                const resolutionMap = new Map();
                await expandExportsResolutions(pcfg.exports, this.traceMap.resolver.env, fileList, resolutionMap);
                return [
                    ...resolutionMap
                ].map(([subpath, _entry])=>alias + subpath.slice(1));
            } else if (subpaths) {
                subpaths.every((subpath)=>{
                    if (typeof subpath !== 'string' || subpath !== '.' && !subpath.startsWith('./')) throw new Error(`Install subpath "${subpath}" must be equal to "." or start with "./".`);
                });
                return subpaths.map((subpath)=>alias + subpath.slice(1));
            } else {
                return alias + (subpath ? subpath.slice(1) : '');
            }
        }))).flatMap((i)=>i);
        const pins = this.traceMap.pins || Object.keys(this.traceMap.inputMap.imports);
        await Promise.all(imports.map(async (impt)=>{
            await this.traceMap.visit(impt, {
                installMode: mode,
                toplevel: true
            }, this.mapUrl.href);
            // Add the target import as a top-level pin
            // we do this after the trace, so failed installs don't pollute the map
            if (!pins.includes(impt)) pins.push(impt);
        }));
        const { map, staticDeps, dynamicDeps } = await this.traceMap.extractMap(pins, this.integrity, true, this.mapUrl.href);
        this.map = map;
        return {
            staticDeps,
            dynamicDeps
        };
    }
    /**
   * Locking install, retraces all top-level pins but does not change the
   * versions of anything (similar to "npm ci").
   * @deprecated use generator.install('freeze') instead.
   */ async reinstall() {
        return await this.install('freeze');
    }
    /**
   * Updates the versions of the given packages to the latest versions
   * compatible with their parent's package.json ranges. If no packages are
   * given then all the top-level packages in the "imports" field of the
   * initial import map are updated.
   *
   * @param {string | string[]} pkgNames Package name or list of package names to update.
   */ async update(pkgNames) {
        if (typeof pkgNames === 'string') pkgNames = [
            pkgNames
        ];
        await this.traceMap.processInputMap;
        const primaryResolutions = this.traceMap.installer.installs.primary;
        const primaryConstraints = this.traceMap.installer.constraints.primary;
        // Matching the behaviour of "npm update":
        let mode = 'latest-primaries';
        if (!pkgNames) {
            pkgNames = Object.keys(primaryResolutions);
            mode = 'latest-all';
        }
        const installs = [];
        for (const name of pkgNames){
            const resolution = primaryResolutions[name];
            if (!resolution) {
                throw new JspmError(`No "imports" package entry for "${name}" to update. Note update takes package names not package specifiers.`);
            }
            const { installUrl } = resolution;
            const subpaths = (this.traceMap.pins || Object.keys(this.traceMap.inputMap.imports)).filter((pin)=>pin === name || pin.startsWith(name) && pin[name.length] === '/').map((pin)=>`.${pin.slice(name.length)}`);
            // use package.json range if present
            if (primaryConstraints[name]) {
                installs.push({
                    alias: name,
                    subpaths,
                    target: {
                        pkgTarget: primaryConstraints[name]
                    }
                });
            } else {
                const pkg = await this.traceMap.resolver.pm.parseUrlPkg(installUrl);
                if (!pkg) throw new Error(`Unable to determine a package version lookup for ${name}. Make sure it is supported as a provider package.`);
                const target = {
                    pkgTarget: {
                        registry: pkg.pkg.registry,
                        name: pkg.pkg.name,
                        range: new SemverRange('^' + pkg.pkg.version),
                        unstable: false
                    }
                };
                installs.push({
                    alias: name,
                    subpaths,
                    target
                });
            }
        }
        await this._install(installs, mode);
        const { map, staticDeps, dynamicDeps } = await this.traceMap.extractMap(this.traceMap.pins || Object.keys(this.traceMap.inputMap.imports), this.integrity);
        this.map = map;
        return {
            staticDeps,
            dynamicDeps
        };
    }
    async uninstall(names) {
        if (typeof names === 'string') names = [
            names
        ];
        await this.traceMap.processInputMap;
        let pins = this.traceMap.pins || Object.keys(this.traceMap.inputMap.imports);
        const unusedNames = new Set([
            ...names
        ]);
        for(let i = 0; i < pins.length; i++){
            const pin = pins[i];
            const pinNames = names.filter((name)=>name === pin || name.endsWith('/') && pin.startsWith(name));
            if (pinNames.length) {
                pins.splice(i--, 1);
                for (const name of pinNames)unusedNames.delete(name);
            }
        }
        if (unusedNames.size) {
            throw new JspmError(`No "imports" entry for "${[
                ...unusedNames
            ][0]}" to uninstall.`);
        }
        if (this.traceMap.pins) this.traceMap.pins = pins;
        const { staticDeps, dynamicDeps, map } = await this.traceMap.extractMap(this.traceMap.pins || Object.keys(this.traceMap.inputMap.imports), this.integrity);
        this.map = map;
        return {
            staticDeps,
            dynamicDeps
        };
    }
    /**
   * Populate virtual source files into the generator for further linking or install operations, effectively
   * intercepting network and file system requests to those URLs.
   *
   * @param baseUrl base URL under which all file data is located @example `"file:///path/to/package/"` or
   * `"https://site.com/pkg@1.2.3/)"`.
   * @param fileData Key value pairs of file data strings or buffers virtualized under the provided
   * URL base path,
   * @example
   * ```
   * {
   *   'package.json': '',
   *   'dir/file.bin': new Uint8Array([1,2,3])
   * }
   * ```
   */ setVirtualSourceData(baseUrl, fileData) {
        setVirtualSourceData(baseUrl, fileData);
    }
    /**
   * Publish a package to a JSPM provider
   *
   * This function creates a tarball from the provided files and uploads it.
   *
   * @param options Publish options
   * @returns Promise that resolves with the package URL, map URL, and
   *          an optional copy-paste code snippet demonstrating usage.
   *
   * @example
   * ```js
   * import { Generator } from '@jspm/generator';
   *
   * const generator = new Generator({
   *   inputMap: { ...custom import map... }
   * });
   * const result = await generator.publish({
   *   package: './pkg',
   *   provider: 'jspm.io',
   *   importMap: true,
   *   link: true,
   * });
   *
   * // URL to the published package and published import map
   * console.log(result.packageUrl, result.mapUrl);
   * // HTML code snippets demonstrating how to run the published code in a browser
   * console.log(result.codeSnippets);
   * ```
   * JSPM will fully link all dependencies when link: true is provided, and
   * populate them into the import map of the generator instance provided
   * to the publish.
   *
   * Alternatively, instead of a local package path, package can also be provided
   * as a record of virtual sources.
   *
   */ async publish({ package: pkg, importMap = true, install = importMap === true, version, name, provider = 'jspm.io' }) {
        if (typeof pkg === 'object') {
            const virtualUrl = `https://virtual/${name !== null && name !== void 0 ? name : 'publish'}@${version !== null && version !== void 0 ? version : Math.round(Math.random() * 10000)}`;
            this.setVirtualSourceData(virtualUrl, pkg);
            pkg = virtualUrl;
        }
        if (typeof pkg !== 'string' || !isURL(pkg) || pkg.match(/^\w\:/)) {
            throw new JspmError(`Package must be a URL string, received "${pkg}"`);
        }
        if (!pkg.endsWith('/')) pkg += '/';
        // Get the file list from the package and read all the file data
        const fileList = await this.traceMap.resolver.getFileList(pkg);
        if (!fileList) throw new JspmError(`Unable to get file listing for ${pkg}`);
        const fileData = {};
        await Promise.all([
            ...fileList
        ].map(async (file)=>{
            const res = await fetch(pkg + file, this.traceMap.resolver.fetchOpts);
            if (!res.ok) {
                throw new JspmError(`Unable to read file ${file} in ${pkg} - got ${res.statusText || res.status}`);
            }
            fileData[file] = await res.arrayBuffer();
        }));
        // Ensure package.json exists and has correct name and version
        const pkgJson = fileData['package.json'] || '{}';
        // Parse package.json if it's a string
        let pjson;
        try {
            if (typeof pkgJson === 'string') {
                pjson = JSON.parse(pkgJson);
            } else {
                // Convert ArrayBuffer to string and parse
                const decoder = new TextDecoder();
                pjson = JSON.parse(decoder.decode(pkgJson));
            }
        } catch (err) {
            throw new JspmError('Invalid package.json: ' + err.message);
        }
        if (pjson.jspm) {
            const { jspm } = pjson;
            delete pjson.jspm;
            Object.assign(pjson, jspm);
        }
        const ignore = Array.isArray(pjson.ignore) ? pjson.ignore : [];
        const files = Array.isArray(pjson.files) ? pjson.files : [];
        const filteredFileList = [];
        for (const file of fileList){
            for (const ignorePattern of ignore){
                if (minimatch(file, ignorePattern)) {
                    continue;
                }
            }
            const parts = file.split('/');
            if (parts.includes('node_modules') || parts.some((part)=>part.startsWith('.')) || parts.includes('package-lock.json')) continue;
            if (files.length) {
                for (const includePattern of files){
                    if (minimatch(file, includePattern)) {
                        filteredFileList.push(file);
                    }
                }
            } else {
                filteredFileList.push(file);
            }
        }
        for (const file of Object.keys(fileData)){
            if (!filteredFileList.includes(file)) delete fileData[file];
        }
        if (filteredFileList.length === 0 && !importMap) throw new JspmError('At least one file or importMap is required for publishing');
        if (!name) {
            name = pjson.name;
            if (!name) throw new JspmError(`Package name is required for publishing, either in the package.json or as a publish option.`);
            if (!name.match(/^[a-zA-Z0-9_\-]+$/)) throw new JspmError(`Invalid package name for publish.`);
        }
        if (!version) {
            version = pjson.version;
            if (!version) throw new JspmError(`Package version is required for publishing, either in the package.json or as a publish option.`);
        }
        const exactPkg = {
            name,
            version,
            registry: 'app'
        };
        const packageUrl = await this.traceMap.resolver.pm.pkgToUrl({
            name,
            version,
            registry: 'app'
        }, provider);
        if (install) {
            await this.install({
                alias: name,
                target: pkg,
                subpaths: true
            }, 'freeze');
            // we then substitute the package URL with the final publish URL
            this.importMap.rebase('about:blank');
            this.importMap.replace(pkg, packageUrl);
        }
        const map = importMap === true ? this.map.clone() : importMap ? new ImportMap({
            map: importMap
        }) : undefined;
        if (map) {
            if (this.flattenScopes) map.flatten();
            map.sort();
            this.simplify(map);
        }
        // If importMap option is set to true, pass a clone of the generator's map
        return await this.traceMap.resolver.pm.publish(exactPkg, provider, (this.traceMap.pins || Object.keys(this.traceMap.inputMap.imports)).sort((a, b)=>{
            const aIsPublishAlias = a === name || a.startsWith(name) && a[name.length] === '/';
            const bIsPublishAlias = b === name || b.startsWith(name) && b[name.length] === '/';
            if (aIsPublishAlias && !bIsPublishAlias) return -1;
            else if (bIsPublishAlias && !aIsPublishAlias) return 1;
            return a > b ? 1 : -1;
        }), fileData, map);
    }
    /**
   * Authenticate with a provider to obtain an authentication token.
   *
   * @param options Authentication options including provider, username, and verify callback
   * @returns Promise resolving to the authentication token
   */ async auth(options = {}) {
        const providerName = options.provider || 'jspm.io';
        return this.traceMap.resolver.pm.auth(providerName, {
            username: options.username,
            verify: options.verify
        });
    }
    /**
   * Eject a published package by downloading it to the provided local folder,
   * and stitching its import map into the generator import map.
   */ async eject({ name, version, registry = 'app', provider = 'jspm.io' }, outDir) {
        if (!isNode) {
            throw new JspmError(`Eject functionality is currently only available on a filesystem`);
        }
        const pkg = {
            name,
            version,
            registry
        };
        const packageUrl = await this.traceMap.resolver.pm.pkgToUrl({
            name,
            version,
            registry: 'app'
        }, provider);
        const mapUrl = packageUrl + 'importmap.json';
        let publishMap = null;
        try {
            const res = await fetch(mapUrl);
            if (res.status !== 404) {
                if (!res.ok && res.status !== 304) {
                    throw res.statusText || res.status;
                }
                publishMap = await res.json();
            }
        } catch (e) {
            throw new JspmError(`Unable to load import map ${mapUrl}: ${e}`);
        }
        const packageFiles = await this.traceMap.resolver.pm.download(pkg, provider);
        const [{ writeFileSync, mkdirSync }, { resolve, dirname }, { fileURLToPath, pathToFileURL }] = await Promise.all([
            import(eval('"node:fs"')),
            import(eval('"node:path"')),
            import(eval('"node:url"'))
        ]);
        outDir = resolve(fileURLToPath(this.baseUrl), outDir);
        for (const [path, source] of Object.entries(packageFiles)){
            const resolved = resolve(outDir, path);
            mkdirSync(dirname(resolved), {
                recursive: true
            });
            writeFileSync(resolved, source);
        }
        if (publishMap) {
            await this.mergeMap(publishMap, 'about:blank');
        }
        this.map.replace(packageUrl, pathToFileURL(outDir).href + '/');
        this.map.rebase(this.mapUrl, this.rootUrl);
    }
    /**
   * Merges an import map into this instance's import map.
   *
   * Performs a full retrace of the map to be merged, building out its version constraints separately,
   * and expanding scopes previously flattened by the scope-flattening "flattenScopes" option that occurs
   * by default for extracted import maps.
   */ async mergeMap(map, mapUrl) {
        const mergeGenerator = this.clone();
        mergeGenerator.flattenScopes = false;
        await mergeGenerator.addMappings(map, mapUrl);
        await mergeGenerator.install('freeze');
        await this.addMappings(mergeGenerator.getMap(mergeGenerator.mapUrl, mergeGenerator.rootUrl));
        await this.install('freeze');
    }
    /**
   * Create a clone of this generator instance with the same configuration.
   *
   * Does not clone the internal import map or install state.
   */ clone() {
        const cloned = new Generator({
            baseUrl: this.baseUrl,
            mapUrl: this.mapUrl,
            rootUrl: this.rootUrl,
            env: this.traceMap.resolver.env,
            defaultProvider: this.traceMap.installer.defaultProvider.provider + '#' + this.traceMap.installer.defaultProvider.layer,
            defaultRegistry: this.traceMap.installer.defaultRegistry,
            resolutions: this.traceMap.installer.resolutions,
            fetchOptions: this.traceMap.resolver.fetchOpts,
            commonJS: this.traceMap.resolver.traceCjs,
            typeScript: this.traceMap.resolver.traceTs,
            system: this.traceMap.resolver.traceSystem,
            integrity: this.integrity,
            preserveSymlinks: this.traceMap.resolver.preserveSymlinks,
            flattenScopes: this.flattenScopes,
            combineSubpaths: this.combineSubpaths,
            expandWildcards: this.expandWildcards,
            scopedLink: this.scopedLink
        });
        cloned.traceMap.resolver.pm.providers = {
            ...this.traceMap.resolver.pm.providers
        };
        return cloned;
    }
    /**
   * Extracts a smaller import map from a larger import map
   *
   * This is for the use case where one large import map is being used to manage
   * dependencies across multiple entry points in say a multi-page application,
   * and one pruned import map is desired just for a set of top-level imports which
   * is smaller than the full set of top-level imports
   *
   * These top-level imports can be provided as a list of "pins" to extract, and a
   * fully pruned map with only the necessary scoped mappings will be traced out
   * of the larger map while respecting its resolutions.
   */ async extractMap(pins, mapUrl, rootUrl, integrity) {
        if (typeof mapUrl === 'string') mapUrl = new URL(mapUrl, this.baseUrl);
        if (typeof rootUrl === 'string') rootUrl = new URL(rootUrl, this.baseUrl);
        if (!Array.isArray(pins)) pins = [
            pins
        ];
        if (typeof integrity !== 'boolean') integrity = this.integrity;
        await this.traceMap.processInputMap;
        const { map, staticDeps, dynamicDeps } = await this.traceMap.extractMap(pins, integrity);
        map.rebase(mapUrl, rootUrl);
        if (this.flattenScopes) map.flatten();
        map.sort();
        this.simplify(map);
        return {
            map: map.toJSON(),
            staticDeps,
            dynamicDeps
        };
    }
    /**
   * Resolve a specifier using the import map.
   *
   * @param specifier Module to resolve
   * @param parentUrl ParentURL of module to resolve
   * @returns Resolved URL string
   */ resolve(specifier, parentUrl = this.baseUrl) {
        if (typeof parentUrl === 'string') parentUrl = new URL(parentUrl, this.baseUrl);
        const resolved = this.map.resolve(specifier, parentUrl);
        if (resolved === null) throw new JspmError(`Unable to resolve "${specifier}" from ${parentUrl.href}`, 'MODULE_NOT_FOUND');
        return resolved;
    }
    get importMap() {
        return this.map;
    }
    getAnalysis(url) {
        if (typeof url !== 'string') url = url.href;
        const trace = this.traceMap.resolver.getAnalysis(url);
        if (!trace) throw new Error(`The URL ${url} has not been traced by this generator instance.`);
        return {
            format: trace.format,
            staticDeps: trace.deps,
            dynamicDeps: trace.dynamicDeps,
            cjsLazyDeps: trace.cjsLazyDeps || []
        };
    }
    /**
   * Get the serializable cache for this generator session.
   *
   * Returns a pruned cache containing only the package configs and analysis
   * entries that were actually used in the final module graph. This cache
   * can be saved to disk and passed to a future Generator via the `traceCache`
   * option to speed up subsequent runs.
   *
   * Only includes cacheable formats (json, esm, css, wasm) and entries without
   * parse errors. CJS/TypeScript/System formats are excluded as they require
   * dynamic transpilation.
   *
   * @example
   * ```js
   * const generator = new Generator({ traceCache: true });
   * await generator.install('react');
   * const cache = generator.getCache();
   * fs.writeFileSync('cache.json', JSON.stringify(cache));
   * ```
   */ getCache() {
        const resolver = this.traceMap.resolver;
        const traceMap = this.traceMap;
        const packageConfigUrls = new Set([
            ...resolver.visitedUrls,
            ...resolver.touchedPackageConfigUrls
        ]);
        const analysisUrls = new Set([
            ...resolver.visitedUrls,
            ...resolver.touchedAnalysisUrls
        ]);
        const cache = {
            packageConfigs: {},
            analysis: {},
            packageBases: {}
        };
        for (const url of packageConfigUrls){
            const pcfg = resolver.pcfgs[url];
            if (pcfg !== undefined) {
                cache.packageConfigs[url] = pcfg;
            }
        }
        for (const url of analysisUrls){
            const entry = resolver.traceEntries[url];
            const packageBase = resolver.packageBaseCache[url];
            if (typeof packageBase === 'string') {
                cache.packageBases[url] = packageBase;
            }
            if (!entry) continue;
            if (entry.parseError) {
                if (resolver.immutableUrls.has(url)) {
                    cache.analysis[url] = {
                        deps: [],
                        dynamicDeps: [],
                        size: 0,
                        integrity: '',
                        format: 'esm',
                        wasCjs: false
                    };
                }
                continue;
            }
            if ([
                'json',
                'esm',
                'css',
                'wasm'
            ].includes(entry.format)) {
                cache.analysis[url] = {
                    deps: entry.deps,
                    dynamicDeps: entry.dynamicDeps,
                    size: entry.size,
                    integrity: entry.integrity,
                    format: entry.format,
                    wasCjs: entry.wasCjs
                };
            }
        }
        // Clean up empty sections
        if (!Object.keys(cache.packageBases).length) delete cache.packageBases;
        return cache;
    }
    /**
   * Simplify the import map by collapsing wildcard-expanded prefixes into
   * trailing-slash entries, and optionally combining scope subpaths.
   * Wildcard condensing is always applied when expandWildcards is false (lossless).
   * combineSubpaths() additionally combines scopes (or both) when enabled.
   */ simplify(map) {
        if (!this.expandWildcards) {
            const resolver = this.traceMap.resolver;
            const condensePrefixes = {};
            const resolveTarget = (target)=>{
                if (isURL(target)) return target;
                if (map.rootUrl && target.startsWith('/')) return new URL(target, map.rootUrl).href;
                return new URL(target, map.mapUrl).href;
            };
            const packageBaseCache = new Map();
            const getPackageBase1 = (target)=>{
                let cached = packageBaseCache.get(target);
                if (cached !== undefined) return cached;
                const pkgUrl = resolver.getPackageBaseCached(resolveTarget(target));
                cached = pkgUrl || null;
                packageBaseCache.set(target, cached);
                return cached;
            };
            const wildcardPrefixCache = new Map();
            const collectPrefixes = (entries)=>{
                const prefixes = new Set();
                const seen = new Set();
                for (const [key, target] of Object.entries(entries)){
                    const pkgUrl = getPackageBase1(target);
                    if (!pkgUrl || seen.has(pkgUrl)) continue;
                    seen.add(pkgUrl);
                    let wildcardPrefixes = wildcardPrefixCache.get(pkgUrl);
                    if (!wildcardPrefixes) {
                        wildcardPrefixes = [
                            ...resolver.getWildcardPrefixes(pkgUrl)
                        ];
                        wildcardPrefixCache.set(pkgUrl, wildcardPrefixes);
                    }
                    if (!wildcardPrefixes.length) continue;
                    const firstSlash = key.indexOf('/');
                    const pkgName = firstSlash === -1 ? key : key[0] === '@' ? key.slice(0, key.indexOf('/', firstSlash + 1)) : key.slice(0, firstSlash);
                    for (const prefix of wildcardPrefixes)prefixes.add(pkgName + prefix.slice(1));
                }
                return prefixes.size ? prefixes : undefined;
            };
            const importPrefixes = collectPrefixes(map.imports);
            if (importPrefixes) condensePrefixes.imports = importPrefixes;
            for (const scopeUrl of Object.keys(map.scopes)){
                const scopePrefixes = collectPrefixes(map.scopes[scopeUrl]);
                if (scopePrefixes) {
                    condensePrefixes.scopes = condensePrefixes.scopes || {};
                    condensePrefixes.scopes[scopeUrl] = scopePrefixes;
                }
            }
            if (condensePrefixes.imports || condensePrefixes.scopes) map.condenseImports(condensePrefixes);
        }
        if (this.combineSubpaths !== 'none') map.combineSubpaths(this.combineSubpaths);
    }
    /**
   * Obtain the final generated import map, with flattening and subpaths combined
   * (unless otherwise disabled via the Generator flattenScopes and combineSubpaths options).
   *
   * A mapUrl can be provided typically as a file URL corresponding to the location of the import map on the file
   * system. Relative paths to other files on the filesystem will then be tracked as map-relative and
   * output as relative paths, assuming the map retains its relative relation to local modules regardless
   * of the publish URLs.
   *
   * When a root URL is provided pointing to a local file URL, `/` prefixed URLs will be used for all
   * modules contained within this file URL base as root URL relative instead of map relative URLs like the above.
   */ getMap(mapUrl, rootUrl) {
        const map = this.map.clone();
        if (mapUrl) map.rebase(mapUrl, rootUrl);
        if (this.flattenScopes) map.flatten();
        map.sort();
        this.simplify(map);
        return map.toJSON();
    }
    /**
   * Constructs a new Generator instance.
   *
   * @example
   *
   * ```js
   * const generator = new Generator({
   *   mapUrl: import.meta.url,
   *   inputMap: {
   *     "imports": {
   *       "react": "https://cdn.skypack.dev/react"
   *     }
   *   },
   *   defaultProvider: 'jspm',
   *   defaultRegistry: 'npm',
   *   providers: {
   *     '@orgscope': 'nodemodules'
   *   },
   *   customProviders: {},
   *   env: ['production', 'browser'],
   *   cache: false,
   * });
   * ```
   * @param {GeneratorOptions} opts Configuration for the new generator instance.
   */ constructor({ baseUrl, mapUrl, rootUrl = undefined, inputMap = undefined, env = [
        'browser',
        'development',
        'module',
        'import'
    ], defaultProvider, defaultRegistry = 'npm', customProviders = undefined, providers, resolutions = {}, cache = true, fetchOptions = {}, packageConfigs = {}, ignore = [], commonJS = false, typeScript = false, system = false, integrity = false, fetchRetries, providerConfig = {}, preserveSymlinks, customResolver, flattenScopes = true, combineSubpaths = true, expandWildcards = false, scopedLink = false, traceCache = undefined, inputMapFallbacks = true } = {}){
        var _globalThis_process_env, _globalThis_process;
        _define_property(this, "traceMap", void 0);
        _define_property(this, "baseUrl", void 0);
        _define_property(this, "mapUrl", void 0);
        _define_property(this, "rootUrl", void 0);
        _define_property(this, "map", void 0);
        _define_property(this, "logStream", void 0);
        _define_property(this, "log", void 0);
        _define_property(this, "integrity", void 0);
        _define_property(this, "flattenScopes", void 0);
        _define_property(this, "combineSubpaths", void 0);
        _define_property(this, "expandWildcards", void 0);
        _define_property(this, "scopedLink", void 0);
        _define_property(this, "cacheEnabled", void 0);
        this.cacheEnabled = !!traceCache;
        if (typeof preserveSymlinks !== 'boolean') preserveSymlinks = isNode;
        // Default logic for the mapUrl, baseUrl and rootUrl:
        if (mapUrl && !baseUrl) {
            mapUrl = typeof mapUrl === 'string' ? new URL(mapUrl, _baseUrl) : mapUrl;
            try {
                baseUrl = new URL('./', mapUrl);
            } catch  {
                baseUrl = new URL(mapUrl + '/');
            }
        } else if (baseUrl && !mapUrl) {
            mapUrl = baseUrl;
        } else if (!mapUrl && !baseUrl) {
            baseUrl = mapUrl = _baseUrl;
        }
        this.baseUrl = typeof baseUrl === 'string' ? new URL(baseUrl, _baseUrl) : baseUrl;
        if (!this.baseUrl.pathname.endsWith('/')) {
            this.baseUrl = new URL(this.baseUrl.href);
            this.baseUrl.pathname += '/';
        }
        this.mapUrl = typeof mapUrl === 'string' ? new URL(mapUrl, this.baseUrl) : mapUrl;
        this.rootUrl = typeof rootUrl === 'string' ? new URL(rootUrl, this.baseUrl) : rootUrl || null;
        if (this.rootUrl && !this.rootUrl.pathname.endsWith('/')) this.rootUrl.pathname += '/';
        if (!this.mapUrl.pathname.endsWith('/')) {
            try {
                this.mapUrl = new URL('./', this.mapUrl);
            } catch  {
                this.mapUrl = new URL(this.mapUrl.href + '/');
            }
        }
        this.scopedLink = scopedLink;
        this.integrity = integrity;
        const fetchOpts = createFetchOptions(cache, fetchOptions);
        const { log, logStream } = createLogger();
        this.logStream = logStream;
        this.log = log;
        const tracelog = ((_globalThis_process = globalThis.process) === null || _globalThis_process === void 0 ? void 0 : (_globalThis_process_env = _globalThis_process.env) === null || _globalThis_process_env === void 0 ? void 0 : _globalThis_process_env.JSPM_GENERATOR_LOG) ? log : undefined;
        // The node_modules provider is special, because it needs to be rooted to
        // perform resolutions against the local node_modules directory:
        const nmProvider = nodemodules.createProvider(this.baseUrl.href, defaultProvider === 'nodemodules');
        const pm = new ProviderManager(log, fetchOpts, providerConfig, {
            ...customProviders,
            nodemodules: nmProvider
        });
        // We make an attempt to auto-detect the default provider from the input
        // map, by picking the provider with the most owned URLs:
        defaultProvider = detectDefaultProvider(defaultProvider, inputMap, pm);
        // Initialise the resolver:
        const resolver = new Resolver({
            env,
            providerManager: pm,
            fetchOpts,
            preserveSymlinks,
            traceCjs: commonJS,
            traceTs: typeScript,
            traceSystem: system,
            packageConfigs: Object.fromEntries(Object.entries(packageConfigs).map(([key, pcfg])=>{
                let resolved = new URL(key, baseUrl).href;
                if (!resolved.endsWith('/')) resolved += '/';
                if (resolved.endsWith('/package.json')) resolved = resolved.slice(0, -12);
                return [
                    resolved,
                    pcfg
                ];
            }))
        });
        // Initialise the tracer:
        this.traceMap = new TraceMap({
            mapUrl: this.mapUrl,
            rootUrl: this.rootUrl,
            baseUrl: this.baseUrl,
            defaultProvider,
            defaultRegistry,
            providers,
            ignore,
            resolutions,
            commonJS,
            customResolver,
            noPins: scopedLink,
            inputMapFallbacks
        }, tracelog, resolver);
        // Populate resolver caches from input cache if provided
        if (traceCache && traceCache !== true) {
            Object.assign(resolver.pcfgs, traceCache.packageConfigs);
            resolver.restoredAnalysis = traceCache.analysis || {};
            // packageBases restored to speed up getPackageBase lookups
            if (traceCache.packageBases) Object.assign(resolver.packageBaseCache, traceCache.packageBases);
        // resolveCache and resolveFailures are in-memory only — rebuilt each run
        }
        // Reconstruct constraints and locks from the input map:
        this.map = new ImportMap({
            mapUrl: this.mapUrl,
            rootUrl: this.rootUrl
        });
        if (!integrity) this.map.integrity = {};
        if (inputMap) this.addMappings(inputMap);
        this.flattenScopes = flattenScopes;
        this.combineSubpaths = combineSubpaths === true ? 'scopes' : combineSubpaths === false ? 'none' : combineSubpaths;
        this.expandWildcards = expandWildcards;
        // Set the fetch retry count
        if (typeof fetchRetries === 'number') setRetryCount(fetchRetries);
    }
}
/**
 * _Use the internal fetch implementation, useful for hooking into the same shared local fetch cache._
 *
 * ```js
 * import { fetch } from '@jspm/generator';
 *
 * const res = await fetch(url);
 * console.log(await res.text());
 * ```
 *
 * Use the `{ cache: 'no-store' }` option to disable the cache, and the `{ cache: 'force-cache' }` option to enforce the offline cache.
 */ export async function fetch(url, opts = {}) {
    // @ts-ignore
    return _fetch(url, opts);
}
/**
 * Get the lookup resolution information for a specific install.
 *
 * @param install The install object
 * @param lookupOptions Provider and cache defaults for lookup
 * @returns The resolved install and exact package \{ install, resolved \}
 */ export async function lookup(install, { provider, cache } = {}) {
    const generator = new Generator({
        cache: !cache,
        defaultProvider: provider
    });
    const { target, subpath, alias } = await installToTarget.call(generator, install, generator.traceMap.installer.defaultRegistry);
    if (typeof target === 'string') throw new Error(`Resolved install "${install}" to package specifier ${target}, but expected a fully qualified install target.`);
    const { pkgTarget } = target;
    if (pkgTarget instanceof URL) throw new Error('URL lookups not supported');
    const resolved = await generator.traceMap.resolver.pm.resolveLatestTarget(pkgTarget, generator.traceMap.installer.getProvider(pkgTarget), generator.baseUrl.href, generator.traceMap.resolver);
    return {
        install: {
            target: {
                registry: pkgTarget.registry,
                name: pkgTarget.name,
                range: pkgTarget.range.toString()
            },
            subpath,
            alias
        },
        resolved: resolved
    };
}
/**
 * Get the package.json configuration for a specific URL or package.
 *
 * @param pkg Package to lookup configuration for
 * @param lookupOptions Optional provider and cache defaults for lookup
 * @returns Package JSON configuration
 *
 * @example
 * ```js
 * import { getPackageConfig } from '@jspm/generator';
 *
 * // Supports a resolved package
 * {
 *   const packageJson = await getPackageConfig({ registry: 'npm', name: 'lit-element', version: '2.5.1' });
 * }
 *
 * // Or alternatively provide any URL
 * {
 *   const packageJson = await getPackageConfig('https://ga.jspm.io/npm:lit-element@2.5.1/lit-element.js');
 * }
 * ```
 */ export async function getPackageConfig(pkg, { provider, cache } = {}) {
    const generator = new Generator({
        cache: !cache,
        defaultProvider: provider
    });
    if (typeof pkg === 'object' && 'name' in pkg) pkg = await generator.traceMap.resolver.pm.pkgToUrl(pkg, generator.traceMap.installer.defaultProvider.provider, generator.traceMap.installer.defaultProvider.layer);
    else if (typeof pkg === 'string') pkg = new URL(pkg).href;
    else pkg = pkg.href;
    return generator.traceMap.resolver.getPackageConfig(pkg);
}
/**
 * Get the package base URL for the given module URL.
 *
 * @param url module URL
 * @param lookupOptions Optional provider and cache defaults for lookup
 * @returns Base package URL
 *
 * Modules can be remote CDN URLs or local file:/// URLs.
 *
 * All modules in JSPM are resolved as within a package boundary, which is the
 * parent path of the package containing a package.json file.
 *
 * For JSPM CDN this will always be the base of the package as defined by the
 * JSPM CDN provider. For non-provider-defined origins it is always determined
 * by trying to fetch the package.json in each parent path until the root is reached
 * or one is found. On file:/// URLs this exactly matches the Node.js resolution
 * algorithm boundary lookup.
 *
 * This package.json file controls the package name, imports resolution, dependency
 * resolutions and other package information.
 *
 * getPackageBase will return the folder containing the package.json,
 * with a trailing '/'.
 *
 * This URL will either be the root URL of the origin, or it will be a
 * path "pkgBase" such that fetch(`${pkgBase}package.json`) is an existing
 * package.json file.
 *
 * @example
 * ```js
 *   import { getPackageBase } from '@jspm/generator';
 *   const pkgUrl = await getPackageBase('https://ga.jspm.io/npm:lit-element@2.5.1/lit-element.js');
 *   // Returns: https://ga.jspm.io/npm:lit-element@2.5.1/
 * ```
 */ export async function getPackageBase(url, { provider, cache } = {}) {
    const generator = new Generator({
        cache: !cache,
        defaultProvider: provider
    });
    return generator.traceMap.resolver.getPackageBase(typeof url === 'string' ? url : url.href);
}
/**
 * Get the package metadata for the given module or package URL.
 *
 * @param url URL of a module or package for a configured provider.
 * @param lookupOptions Optional provider and cache defaults for lookup.
 * @returns Package metadata for the given URL if one of the configured
 *          providers owns it, else null.
 *
 * The returned metadata will always contain the package name, version and
 * registry, along with the provider name and layer that handles resolution
 * for the given URL.
 */ export async function parseUrlPkg(url, { provider, cache } = {}) {
    const generator = new Generator({
        cache: !cache,
        defaultProvider: provider
    });
    return generator.traceMap.resolver.pm.parseUrlPkg(typeof url === 'string' ? url : url.href);
}
/**
 * Returns a list of providers that are supported by default.
 *
 * @returns List of valid provider strings supported by default.
 *
 * To use one of these providers, pass the string to either the "defaultProvider"
 * option or the "providers" mapping when constructing a Generator.
 */ export function getDefaultProviders() {
    return getDefaultProviderStrings();
}
async function installToTarget(install, defaultRegistry) {
    if (typeof install === 'string') install = {
        target: install
    };
    if (typeof install.target !== 'string') throw new Error('All installs require a "target" string.');
    if (install.subpath !== undefined && (typeof install.subpath !== 'string' || install.subpath !== '.' && !install.subpath.startsWith('./'))) throw new Error(`Install subpath "${install.subpath}" must be a string equal to "." or starting with "./".${typeof install.subpath === 'string' ? `\nTry setting the subpath to "./${install.subpath}"` : ''}`);
    const { alias, target, subpath } = await parseTarget(this.traceMap.resolver, install.target, this.baseUrl, defaultRegistry);
    return {
        target,
        alias: install.alias || alias,
        subpath: install.subpath || subpath
    };
}
function detectDefaultProvider(defaultProvider, inputMap, pm) {
    // We only use top-level install information to detect the provider:
    const counts = {};
    for (const url of Object.values((inputMap === null || inputMap === void 0 ? void 0 : inputMap.imports) || {})){
        const name = pm.providerNameForUrl(url);
        if (name) {
            counts[name] = (counts[name] || 0) + 1;
        }
    }
    let winner;
    let winnerCount = 0;
    for (const [name, count] of Object.entries(counts)){
        if (count > winnerCount) {
            winner = name;
            winnerCount = count;
        }
    }
    // TODO: this should be the behaviour once we support full 'providers' opt
    // The leading provider in the input map takes precedence as the provider of
    // the root package. Failing that, the user-provided default is used. The
    // 'providers' field can be used for hard-overriding this:
    // return winner || defaultProvider || "jspm.io";
    return defaultProvider || winner || 'jspm.io';
}
export { // utility export
analyzeHtml, // hook export
setFetch };


//# sourceMappingURL=generator.js.map