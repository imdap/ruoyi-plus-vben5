import { JspmError } from '../common/err.js';
import { baseUrl, isRelative } from '../common/url.js';
// @ts-ignore
import sver from 'sver';
const { SemverRange } = sver;
import { builtinSchemes } from '../providers/index.js';
const supportedProtocols = [
    'https',
    'http',
    'data',
    'file',
    'pkg'
];
export async function parseUrlTarget(resolver, targetStr, parentUrl) {
    const registryIndex = targetStr.indexOf(':');
    if (isRelative(targetStr) || registryIndex !== -1 && supportedProtocols.includes(targetStr.slice(0, registryIndex)) || builtinSchemes.has(targetStr.slice(0, registryIndex))) {
        var _this;
        let subpath = '.';
        const subpathIndex = targetStr.indexOf('|');
        if (subpathIndex !== -1) {
            subpath = `./${targetStr.slice(subpathIndex + 1)}`;
            targetStr = targetStr.slice(0, subpathIndex);
        }
        const target = {
            pkgTarget: new URL(targetStr + (targetStr.endsWith('/') ? '' : '/'), parentUrl || baseUrl)
        };
        const pkgUrl = await resolver.getPackageBase(target.pkgTarget.href);
        const alias = ((_this = pkgUrl ? await resolver.getPackageConfig(pkgUrl) : null) === null || _this === void 0 ? void 0 : _this.name) || target.pkgTarget.pathname.split('/').slice(0, -1).pop();
        return {
            alias,
            target,
            subpath
        };
    }
}
// ad-hoc determination of local path v remote package for eg "jspm deno react" v "jspm deno react@2" v "jspm deno ./react.ts" v "jspm deno react.ts"
const supportedRegistries = [
    'npm',
    'github',
    'deno',
    'nest',
    'denoland'
];
export function isPackageTarget(targetStr) {
    if (isRelative(targetStr)) return false;
    const registryIndex = targetStr.indexOf(':');
    if (registryIndex !== -1 && supportedRegistries.includes(targetStr.slice(0, registryIndex))) return true;
    const pkg = parsePkg(targetStr);
    if (!pkg) return false;
    if (pkg.pkgName.indexOf('@') !== -1) return true;
    if (targetStr.endsWith('.ts') || targetStr.endsWith('.js') || targetStr.endsWith('.mjs')) return false;
    return true;
}
export async function parseTarget(resolver, targetStr, parentPkgUrl, defaultRegistry) {
    const urlTarget = await parseUrlTarget(resolver, targetStr, parentPkgUrl);
    if (urlTarget) return urlTarget;
    // TODO: package aliases support as per https://github.com/npm/rfcs/blob/latest/implemented/0001-package-aliases.md
    const registryIndex = targetStr.indexOf(':');
    const versionOrScopeIndex = targetStr.indexOf('@');
    if (targetStr.indexOf(':') !== -1 && versionOrScopeIndex !== -1 && versionOrScopeIndex < registryIndex) throw new Error(`Package aliases not yet supported. PRs welcome.`);
    const pkg = parsePkg(registryIndex === -1 ? targetStr : targetStr.slice(registryIndex + 1));
    if (!pkg) throw new JspmError(`Invalid package name ${targetStr}`);
    let registry = null;
    if (registryIndex !== -1) registry = targetStr.slice(0, registryIndex);
    let alias = pkg.pkgName;
    const versionIndex = pkg.pkgName.indexOf('@', 1);
    if (versionIndex !== -1) alias = pkg.pkgName.slice(0, versionIndex);
    else alias = pkg.pkgName;
    // If no version is specified, we fallback to the constraints in the parent
    // package config if they exist:
    const pcfg = await resolver.getPackageConfig(parentPkgUrl.href);
    if (versionIndex === -1 && pcfg) {
        var _pcfg_dependencies, _pcfg_peerDependencies, _pcfg_optionalDependencies, _pcfg_devDependencies;
        const dep = ((_pcfg_dependencies = pcfg.dependencies) === null || _pcfg_dependencies === void 0 ? void 0 : _pcfg_dependencies[alias]) || ((_pcfg_peerDependencies = pcfg.peerDependencies) === null || _pcfg_peerDependencies === void 0 ? void 0 : _pcfg_peerDependencies[alias]) || ((_pcfg_optionalDependencies = pcfg.optionalDependencies) === null || _pcfg_optionalDependencies === void 0 ? void 0 : _pcfg_optionalDependencies[alias]) || ((_pcfg_devDependencies = pcfg.devDependencies) === null || _pcfg_devDependencies === void 0 ? void 0 : _pcfg_devDependencies[alias]);
        if (dep) {
            return {
                target: newPackageTarget(dep, parentPkgUrl, registry || defaultRegistry, pkg.pkgName),
                alias,
                subpath: pkg.subpath
            };
        }
    }
    // Otherwise we construct a package target from what we were given:
    return {
        target: newPackageTarget(pkg.pkgName, parentPkgUrl, registry || defaultRegistry),
        alias,
        subpath: pkg.subpath
    };
}
export function newPackageTarget(target, parentPkgUrl, defaultRegistry, pkgName) {
    if (target === '.') {
        // useful shorthand
        target = './';
    }
    let registry, name, range;
    const registryIndex = target.indexOf(':');
    if (target.startsWith('./') || target.startsWith('../') || target.startsWith('/') || registryIndex === 1) return {
        pkgTarget: new URL(target, parentPkgUrl)
    };
    registry = registryIndex < 1 ? defaultRegistry : target.slice(0, registryIndex);
    if (registry === 'file') return {
        pkgTarget: new URL(target.slice(registry.length + 1), parentPkgUrl)
    };
    if (registry === 'https' || registry === 'http') return {
        pkgTarget: new URL(target)
    };
    const versionIndex = target.lastIndexOf('@');
    let unstable = false;
    if (versionIndex > registryIndex + 1) {
        name = target.slice(registryIndex + 1, versionIndex);
        const version = target.slice(versionIndex + 1);
        range = new SemverRange(version || '*');
        if (version === '') unstable = true;
    } else if (registryIndex === -1 && pkgName) {
        name = pkgName;
        range = new SemverRange(target);
    } else {
        name = target.slice(registryIndex + 1);
        range = new SemverRange('*');
    }
    if (registryIndex === -1 && name.indexOf('/') !== -1 && name[0] !== '@') registry = 'github';
    const targetNameLen = name.split('/').length;
    if (targetNameLen > 2 || targetNameLen === 1 && name[0] === '@') throw new JspmError(`Invalid package target ${target}`);
    return {
        pkgTarget: {
            registry,
            name,
            range,
            unstable
        }
    };
}
export function pkgToStr(pkg) {
    return `${pkg.registry ? pkg.registry + ':' : ''}${pkg.name}${pkg.version ? '@' + pkg.version : ''}`;
}
/**
 * Throws unless the given specifier is a valid npm-style package specifier.
 *
 * @param {string} specifier Specifier to validate.
 */ export function validatePkgName(specifier) {
    const parsed = parsePkg(specifier);
    if (!parsed || parsed.subpath !== '.') throw new Error(`"${specifier}" is not a valid npm-style package name. Subpaths must be provided separately to the installation package name.`);
}
/**
 * Parses an npm-style module specifier, such as '@jspm/generator/index.js',
 * and splits it into the package name ('@jspm/generator') and module subpath
 * ('./index.js'). Returns undefined if the given specifier is invalid.
 *
 * @param {string} specifier Specifier to parse.
 * @returns {{ pkgName: string, subpath: '.' | `./${string}` } | undefined}
 */ export function parsePkg(specifier) {
    let sepIndex = specifier.indexOf('/');
    if (specifier[0] === '@') {
        if (sepIndex === -1) return;
        sepIndex = specifier.indexOf('/', sepIndex + 1);
    }
    // TODO: Node.js validations like percent encodng checks
    if (sepIndex === -1) return {
        pkgName: specifier,
        subpath: '.'
    };
    return {
        pkgName: specifier.slice(0, sepIndex),
        subpath: `.${specifier.slice(sepIndex)}`
    };
}


//# sourceMappingURL=package.js.map