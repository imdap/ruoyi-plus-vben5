import { toFileDirURL, toFileURL, urlRelative } from '@cspell/url';
export function isDefined(v) {
    return v !== undefined && v !== null;
}
export function isParentOf(parent, child) {
    parent = toFileDirURL(parent);
    return child.pathname.startsWith(parent.pathname);
}
export function makeRelativeTo(child, parent) {
    const c = toFileURL(child);
    const p = toFileDirURL(parent);
    const rel = urlRelative(p, c);
    if (rel.startsWith('../'))
        return undefined;
    return rel;
}
//# sourceMappingURL=utils.js.map