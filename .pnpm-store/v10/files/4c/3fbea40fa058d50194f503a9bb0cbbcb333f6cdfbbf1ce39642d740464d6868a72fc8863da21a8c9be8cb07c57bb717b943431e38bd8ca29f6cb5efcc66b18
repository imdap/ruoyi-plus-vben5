import { JspmError } from '../common/err.js';
import { importedFrom } from '../common/url.js';
import { fetchVersions } from './jspm.js';
import { SemverRange } from 'sver';
const cdnUrl = 'https://unpkg.com/';
export function pkgToUrl(pkg) {
    return `${cdnUrl}${pkg.name}@${pkg.version}/`;
}
const exactPkgRegEx = /^((?:@[^/\\%@]+\/)?[^./\\%@][^/\\%@]*)@([^\/]+)(\/.*)?$/;
export function parseUrlPkg(url) {
    if (!url.startsWith(cdnUrl)) return;
    const [, name, version] = url.slice(cdnUrl.length).match(exactPkgRegEx) || [];
    if (name && version) {
        return {
            registry: 'npm',
            name,
            version
        };
    }
}
export async function resolveLatestTarget(target, layer, parentUrl) {
    const { registry, name, range, unstable } = target;
    const versions = await fetchVersions.call(this, name);
    const semverRange = new SemverRange(String(range) || '*');
    const version = semverRange.bestMatch(versions, unstable);
    if (version) {
        return {
            registry,
            name,
            version: version.toString()
        };
    }
    throw new JspmError(`Unable to resolve ${registry}:${name}@${range} to a valid version${importedFrom(parentUrl)}`);
}


//# sourceMappingURL=unpkg.js.map