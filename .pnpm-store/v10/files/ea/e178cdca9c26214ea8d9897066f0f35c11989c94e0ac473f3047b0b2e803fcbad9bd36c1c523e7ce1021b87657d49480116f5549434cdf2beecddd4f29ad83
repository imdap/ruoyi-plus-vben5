import globalDirectory from 'global-directory';
import { requireResolve } from './requireResolve.js';
export function resolveGlobal(modulesName) {
    const paths = [globalDirectory.npm.packages, globalDirectory.yarn.packages];
    return requireResolve(modulesName, paths);
}
//# sourceMappingURL=resolveGlobal.mjs.map