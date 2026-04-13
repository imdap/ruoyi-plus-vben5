export function extractImportErrors(settings) {
    const imports = mergeImportRefs(settings);
    return !imports ? [] : [...imports.values()].filter(isImportFileRefWithError);
}
export function extractImports(settings) {
    const imports = mergeImportRefs(settings);
    return !imports ? [] : [...imports.values()];
}
function mergeImportRefs(left, right = {}) {
    const imports = new Map(left.__imports || []);
    if (left.__importRef) {
        imports.set(left.__importRef.filename, left.__importRef);
    }
    if (right.__importRef) {
        imports.set(right.__importRef.filename, right.__importRef);
    }
    const rightImports = right.__imports?.values() || [];
    for (const ref of rightImports) {
        imports.set(ref.filename, ref);
    }
    return imports.size ? imports : undefined;
}
function isImportFileRefWithError(ref) {
    return !!ref.error;
}
//# sourceMappingURL=extractImportErrors.js.map