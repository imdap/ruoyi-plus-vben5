import { JspmError } from '../common/err.js';
import { importedFrom } from '../common/url.js';
import { fetchVersions } from './jspm.js';
// @ts-ignore
import { SemverRange } from 'sver';
const cdnUrl = 'https://cdn.jsdelivr.net/';
export function pkgToUrl(pkg) {
    return `${cdnUrl}${pkg.registry}/${pkg.name}@${pkg.version}/`;
}
const exactPkgRegEx = /^([^\/]+)\/((?:@[^/\\%@]+\/)?[^./\\%@][^/\\%@]*)@([^\/]+)(\/.*)?$/;
export function parseUrlPkg(url) {
    if (!url.startsWith(cdnUrl)) return;
    const [, registry, name, version] = url.slice(cdnUrl.length).match(exactPkgRegEx) || [];
    return {
        registry,
        name,
        version
    };
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


//# sourceMappingURL=jsdelivr.js.map