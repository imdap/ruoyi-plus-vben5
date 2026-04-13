"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USEFUL_NON_ROOT_PNPM_FIELDS = exports.FULL_FILTERED_META_DIR = exports.FULL_META_DIR = exports.ABBREVIATED_META_DIR = exports.WORKSPACE_MANIFEST_FILENAME = exports.STORE_VERSION = exports.LAYOUT_VERSION = exports.ENGINE_NAME = exports.MANIFEST_BASE_NAMES = exports.LOCKFILE_VERSION = exports.LOCKFILE_MAJOR_VERSION = exports.WANTED_LOCKFILE = void 0;
exports.getNodeBinLocationForCurrentOS = getNodeBinLocationForCurrentOS;
exports.getDenoBinLocationForCurrentOS = getDenoBinLocationForCurrentOS;
exports.getBunBinLocationForCurrentOS = getBunBinLocationForCurrentOS;
exports.WANTED_LOCKFILE = 'pnpm-lock.yaml';
exports.LOCKFILE_MAJOR_VERSION = '9';
exports.LOCKFILE_VERSION = `${exports.LOCKFILE_MAJOR_VERSION}.0`;
exports.MANIFEST_BASE_NAMES = ['package.json', 'package.json5', 'package.yaml'];
exports.ENGINE_NAME = `${process.platform};${process.arch};node${process.version.split('.')[0].substring(1)}`;
exports.LAYOUT_VERSION = 5;
exports.STORE_VERSION = 'v10';
exports.WORKSPACE_MANIFEST_FILENAME = 'pnpm-workspace.yaml';
// This file contains meta information
// about all the packages published by the same name, not just the manifest
// of one package/version
exports.ABBREVIATED_META_DIR = 'metadata-v1.3';
exports.FULL_META_DIR = 'metadata-full-v1.3'; // This is currently not used at all
exports.FULL_FILTERED_META_DIR = 'metadata-ff-v1.3';
exports.USEFUL_NON_ROOT_PNPM_FIELDS = ['executionEnv'];
function getNodeBinLocationForCurrentOS(platform = process.platform) {
    return platform === 'win32' ? 'node.exe' : 'bin/node';
}
function getDenoBinLocationForCurrentOS(platform = process.platform) {
    return platform === 'win32' ? 'deno.exe' : 'deno';
}
function getBunBinLocationForCurrentOS(platform = process.platform) {
    return platform === 'win32' ? 'bun.exe' : 'bun';
}
//# sourceMappingURL=index.js.map