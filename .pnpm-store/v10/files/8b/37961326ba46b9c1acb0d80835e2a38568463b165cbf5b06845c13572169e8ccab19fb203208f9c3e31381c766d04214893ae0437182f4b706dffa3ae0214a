import { splitClasses, splitWhitespaces } from "./utils.js";
export function lintClasses(ctx, literal, report) {
    const classChunks = splitClasses(literal.content);
    const whitespaceChunks = splitWhitespaces(literal.content);
    const startsWithWhitespace = whitespaceChunks.length > 0 && whitespaceChunks[0] !== "";
    const after = [...classChunks];
    for (let classIndex = 0, stringIndex = 0; classIndex < classChunks.length; classIndex++) {
        const className = classChunks[classIndex];
        if (startsWithWhitespace) {
            stringIndex += whitespaceChunks[classIndex].length;
        }
        const startIndex = stringIndex;
        const endIndex = stringIndex + className.length;
        stringIndex = endIndex;
        if (!startsWithWhitespace) {
            stringIndex += whitespaceChunks[classIndex + 1].length;
        }
        const result = report(className, classIndex, after);
        if (result === undefined || result === false) {
            continue;
        }
        const [literalStart] = literal.range;
        if (typeof result === "object" && result.fix !== undefined) {
            after[classIndex] = result.fix;
        }
        ctx.report({
            message: `Expected ${className} to be ${result.fix ?? ""}.`,
            range: [
                literalStart + startIndex + (literal.openingQuote?.length ?? 0) + (literal.closingBraces?.length ?? 0),
                literalStart + endIndex + (literal.openingQuote?.length ?? 0) + (literal.closingBraces?.length ?? 0)
            ],
            ..."warnings" in result && { warnings: result.warnings },
            ..."data" in result && { data: result.data },
            ..."message" in result && { id: undefined, message: result.message },
            ..."id" in result && { id: result.id, message: undefined },
            ...typeof result === "object" && result.fix !== undefined && { fix: result.fix }
        });
    }
}
//# sourceMappingURL=lint.js.map