export function detectIndent(content) {
    const m = content.match(/^[ \t]+/m);
    return (m && m[0]) || '  ';
}
export function detectIndentAsNum(content) {
    const indent = detectIndent(content).replaceAll('\t', '    ').replaceAll(/[^ ]/g, '');
    return indent.length;
}
//# sourceMappingURL=util.js.map