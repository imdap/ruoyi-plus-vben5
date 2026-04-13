export function toGlobDef(g, root, source) {
    if (g === undefined)
        return undefined;
    if (Array.isArray(g)) {
        return g.map((g) => toGlobDef(g, root, source));
    }
    if (typeof g === 'string') {
        const glob = { glob: g };
        if (root !== undefined) {
            glob.root = root;
        }
        return toGlobDef(glob, root, source);
    }
    if (source) {
        return { ...g, source };
    }
    return g;
}
//# sourceMappingURL=toGlobDef.js.map