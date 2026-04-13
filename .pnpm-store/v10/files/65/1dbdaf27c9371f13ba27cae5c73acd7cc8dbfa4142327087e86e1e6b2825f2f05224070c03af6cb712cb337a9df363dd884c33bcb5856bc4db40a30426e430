import { getCachedRegex } from "../async-utils/regex.js";
export function getWhitespace(classes) {
    const leadingWhitespace = classes.match(/^\s*/)?.[0];
    const trailingWhitespace = classes.match(/\s*$/)?.[0];
    return { leadingWhitespace, trailingWhitespace };
}
export function getQuotes(raw) {
    const openingQuote = raw.at(0);
    const closingQuote = raw.at(-1);
    return {
        closingQuote: closingQuote === "'" || closingQuote === '"' || closingQuote === "`" ? closingQuote : undefined,
        openingQuote: openingQuote === "'" || openingQuote === '"' || openingQuote === "`" ? openingQuote : undefined
    };
}
export function getContent(raw, quotes, braces) {
    return raw.substring((quotes?.openingQuote?.length ?? 0) + (braces?.closingBraces?.length ?? 0), raw.length - (quotes?.closingQuote?.length ?? 0) - (braces?.openingBraces?.length ?? 0));
}
export function splitClasses(classes) {
    if (classes.trim() === "") {
        return [];
    }
    return classes
        .trim()
        .split(/\s+/);
}
export function deduplicateClasses(classes) {
    return classes.filter((className, index) => {
        return classes.indexOf(className) === index;
    });
}
export function display(messageStyle, classes) {
    if (messageStyle === "raw") {
        return escapeMessage(messageStyle, classes);
    }
    return escapeMessage(messageStyle, classes
        .replaceAll(" ", "·")
        .replaceAll("\n", "↵\n")
        .replaceAll("\r", "↩\r")
        .replaceAll("\t", "→"));
}
/**
 * Augments a message with additional warnings and documentation links.
 *
 * @template Options
 * @param message The original message to augment.
 * @param docs The documentation URL to include.
 * @param warnings Any warnings to include in the message.
 * @returns The augmented message.
 */
export function augmentMessageWithWarnings(message, docs, warnings) {
    const ruleWarnings = warnings
        ?.filter(warning => !!warning)
        .map(warning => ({ ...warning, url: warning.url ?? docs }));
    if (!ruleWarnings || ruleWarnings.length === 0) {
        return message;
    }
    return [
        ruleWarnings.flatMap(({ option, title, url }) => [
            `⚠️ Warning: ${title}. Option \`${option}\` may be misconfigured.`,
            `Check documentation at ${url}`
        ]).join("\n"),
        message
    ].join("\n\n");
}
export function escapeMessage(messageStyle, message) {
    if (messageStyle === "compact") {
        return message
            .replaceAll("\r", "")
            .replaceAll("\n", "");
    }
    return message;
}
export function splitWhitespaces(classes) {
    return classes.split(/\S+/);
}
export function getIndentation(line) {
    return line.match(/^[\t ]*/)?.[0].length ?? 0;
}
export function isClassSticky(literal, classIndex) {
    const classes = literal.content;
    const classChunks = splitClasses(classes);
    const whitespaceChunks = splitWhitespaces(classes);
    const startsWithWhitespace = whitespaceChunks.length > 0 && whitespaceChunks[0] !== "";
    const endsWithWhitespace = whitespaceChunks.length > 0 && whitespaceChunks[whitespaceChunks.length - 1] !== "";
    return (!startsWithWhitespace && classIndex === 0 && !!literal.closingBraces ||
        !endsWithWhitespace && classIndex === classChunks.length - 1 && !!literal.openingBraces);
}
export function getExactClassLocation(literal, startIndex, endIndex) {
    const linesUpToStartIndex = literal.content.slice(0, startIndex).split(/\r?\n/);
    const isOnFirstLine = linesUpToStartIndex.length === 1;
    const containingLine = linesUpToStartIndex.at(-1);
    const line = literal.loc.start.line + linesUpToStartIndex.length - 1;
    const column = (isOnFirstLine
        ? literal.loc.start.column + (literal.openingQuote?.length ?? 0) + (literal.closingBraces?.length ?? 0)
        : 0) + (containingLine?.length ?? 0);
    return {
        end: {
            column: column + (endIndex - startIndex),
            line
        },
        start: {
            column,
            line
        }
    };
}
export function matchesName(pattern, name) {
    if (!name) {
        return false;
    }
    const match = getCachedRegex(pattern).exec(name);
    return !!match && match[0] === name;
}
export function replacePlaceholders(template, match) {
    return template.replace(getCachedRegex(/\$(\d+)/g), (_, groupIndex) => {
        const index = Number(groupIndex);
        return match[index] ?? "";
    });
}
export function addAttribute(name) {
    return (literal) => {
        if (!name) {
            return literal;
        }
        literal.attribute = name;
        return literal;
    };
}
export function deduplicateLiterals(literal, index, literals) {
    return literals.findIndex(l2 => {
        return literal.content === l2.content &&
            literal.range[0] === l2.range[0] &&
            literal.range[1] === l2.range[1];
    }) === index;
}
export function createObjectPathElement(path) {
    if (!path) {
        return "";
    }
    return getCachedRegex(/^[A-Z_a-z]\w*$/).test(path)
        ? path
        : `["${path}"]`;
}
export function isGenericNodeWithParent(node) {
    return (typeof node === "object" &&
        node !== null &&
        "parent" in node &&
        node.parent !== null &&
        typeof node.parent === "object");
}
//# sourceMappingURL=utils.js.map