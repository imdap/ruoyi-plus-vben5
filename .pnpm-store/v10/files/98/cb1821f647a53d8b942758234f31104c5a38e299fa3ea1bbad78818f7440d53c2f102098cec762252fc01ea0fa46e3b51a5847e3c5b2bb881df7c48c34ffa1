export function buildClass(ctx, { base, important, negative, prefix, separator, variants }) {
    const importantAtStart = important[0] && "!";
    const importantAtEnd = important[1] && "!";
    const negativePrefix = negative && "-";
    if (ctx.version.major >= 4) {
        return [
            prefix,
            ...variants ?? [],
            [importantAtStart, negativePrefix, base, importantAtEnd].filter(Boolean).join("")
        ].filter(Boolean).join(separator);
    }
    else {
        return [
            ...variants ?? [],
            [importantAtStart, prefix, negativePrefix, base, importantAtEnd].filter(Boolean).join("")
        ].filter(Boolean).join(separator);
    }
}
//# sourceMappingURL=class.js.map