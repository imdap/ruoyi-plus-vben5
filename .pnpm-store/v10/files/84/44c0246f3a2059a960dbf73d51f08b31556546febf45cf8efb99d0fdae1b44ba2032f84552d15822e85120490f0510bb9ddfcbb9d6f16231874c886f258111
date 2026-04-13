import * as path from 'node:path';
import { findRepoRoot } from './findRepoRoot.js';
export function factoryPathHelper(path) {
    function directoryRoot(directory) {
        const p = path.parse(directory);
        return p.root;
    }
    function isParentOf(parent, child) {
        const rel = path.relative(parent, child);
        return !!rel && !path.isAbsolute(rel) && rel[0] !== '.';
    }
    function contains(parent, child) {
        const rel = path.relative(parent, child);
        return !rel || (!path.isAbsolute(rel) && rel[0] !== '.');
    }
    function makeRelativeTo(child, parent) {
        const rel = path.relative(parent, child);
        if (path.isAbsolute(rel) || rel[0] === '.')
            return undefined;
        return normalizePath(rel);
    }
    function normalizePath(path) {
        return path.replaceAll('\\', '/');
    }
    return {
        directoryRoot,
        findRepoRoot,
        isParentOf,
        contains,
        normalizePath,
        makeRelativeTo,
    };
}
const defaultHelper = factoryPathHelper(path);
/**
 * Parse a directory and return its root
 * @param directory - directory to parse.
 * @returns root directory
 * @deprecated to be removed in the next major version.
 */
export const directoryRoot = defaultHelper.directoryRoot;
/**
 * Checks to see if the child directory is nested under the parent directory.
 * @param parent - parent directory
 * @param child - possible child directory
 * @returns true iff child is a child of parent.
 * @deprecated to be removed in the next major version.
 */
export const isParentOf = defaultHelper.isParentOf;
/**
 * Check to see if a parent directory contains a child directory.
 * @param parent - parent directory
 * @param child - child directory
 * @returns true iff child is the same as the parent or nested in the parent.
 * @deprecated to be removed in the next major version.
 */
export const contains = defaultHelper.contains;
/**
 * Make a path relative to another if the other is a parent.
 * @param path - the path to make relative
 * @param rootPath - a root of path
 * @returns the normalized relative path or undefined if rootPath is not a parent.
 * @deprecated to be removed in the next major version.
 */
export const makeRelativeTo = defaultHelper.makeRelativeTo;
/**
 * Normalize a path to have only forward slashes.
 * @param path - path to normalize
 * @returns a normalized string.
 * @deprecated to be removed in the next major version.
 */
export const normalizePath = defaultHelper.normalizePath;
export const DefaultPathHelper = {
    directoryRoot,
    findRepoRoot,
    isParentOf,
    contains,
    makeRelativeTo,
    normalizePath,
};
//# sourceMappingURL=helpers.js.map