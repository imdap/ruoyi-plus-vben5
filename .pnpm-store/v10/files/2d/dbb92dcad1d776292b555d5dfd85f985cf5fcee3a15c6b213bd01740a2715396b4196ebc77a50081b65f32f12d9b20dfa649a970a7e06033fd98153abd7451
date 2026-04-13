export function parseSemanticVersion(version) {
    const [major, minor, patchString] = version.split(".");
    const [patch, identifier] = patchString.split("-");
    return { identifier, major: +major, minor: +minor, patch: +patch };
}
//# sourceMappingURL=version.js.map