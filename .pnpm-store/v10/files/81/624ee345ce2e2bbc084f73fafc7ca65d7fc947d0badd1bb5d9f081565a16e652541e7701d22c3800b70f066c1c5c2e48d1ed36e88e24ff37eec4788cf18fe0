"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWorkspaceManifest = readWorkspaceManifest;
exports.validateWorkspaceManifest = validateWorkspaceManifest;
const util_1 = __importDefault(require("util"));
const constants_1 = require("@pnpm/constants");
const node_path_1 = __importDefault(require("node:path"));
const read_yaml_file_1 = __importDefault(require("read-yaml-file"));
const catalogs_js_1 = require("./catalogs.js");
const InvalidWorkspaceManifestError_js_1 = require("./errors/InvalidWorkspaceManifestError.js");
async function readWorkspaceManifest(dir) {
    const manifest = await readManifestRaw(dir);
    validateWorkspaceManifest(manifest);
    return manifest;
}
async function readManifestRaw(dir) {
    try {
        return await (0, read_yaml_file_1.default)(node_path_1.default.join(dir, constants_1.WORKSPACE_MANIFEST_FILENAME));
    }
    catch (err) {
        // File not exists is the same as empty file (undefined)
        if (util_1.default.types.isNativeError(err) && 'code' in err && err.code === 'ENOENT') {
            return undefined;
        }
        // Any other error (missing perm, invalid yaml, etc.) fails the process
        throw err;
    }
}
function validateWorkspaceManifest(manifest) {
    if (manifest === undefined || manifest === null) {
        // Empty or null manifest is ok
        return;
    }
    if (typeof manifest !== 'object') {
        throw new InvalidWorkspaceManifestError_js_1.InvalidWorkspaceManifestError(`Expected object but found - ${typeof manifest}`);
    }
    if (Array.isArray(manifest)) {
        throw new InvalidWorkspaceManifestError_js_1.InvalidWorkspaceManifestError('Expected object but found - array');
    }
    if (Object.keys(manifest).length === 0) {
        // manifest content `{}` is ok
        return;
    }
    assertValidWorkspaceManifestPackages(manifest);
    (0, catalogs_js_1.assertValidWorkspaceManifestCatalog)(manifest);
    (0, catalogs_js_1.assertValidWorkspaceManifestCatalogs)(manifest);
    checkWorkspaceManifestAssignability(manifest);
}
function assertValidWorkspaceManifestPackages(manifest) {
    if (!manifest.packages) {
        return;
    }
    if (!Array.isArray(manifest.packages)) {
        throw new InvalidWorkspaceManifestError_js_1.InvalidWorkspaceManifestError('packages field is not an array');
    }
    for (const pkg of manifest.packages) {
        if (!pkg) {
            throw new InvalidWorkspaceManifestError_js_1.InvalidWorkspaceManifestError('Missing or empty package');
        }
        const type = typeof pkg;
        if (type !== 'string') {
            throw new InvalidWorkspaceManifestError_js_1.InvalidWorkspaceManifestError(`Invalid package type - ${type}`);
        }
    }
}
/**
 * Empty function to ensure TypeScript has narrowed the manifest object to
 * something assignable to the {@see WorkspaceManifest} interface. This helps
 * make sure the validation logic in this file is correct as it's refactored in
 * the future.
 */
function checkWorkspaceManifestAssignability(_manifest) { }
//# sourceMappingURL=index.js.map