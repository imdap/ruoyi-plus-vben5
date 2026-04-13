import { addAttribute, deduplicateLiterals, getContent, getIndentation, matchesName } from "../utils/utils.js";
export function getLiteralsByHTMLAttribute(ctx, attribute, selectors) {
    const name = attribute.key.value;
    const literals = selectors.reduce((literals, selector) => {
        if (!matchesName(selector.name.toLowerCase(), name.toLowerCase())) {
            return literals;
        }
        if (!selector.match) {
            literals.push(...getLiteralsByHTMLAttributeNode(ctx, attribute));
            return literals;
        }
        return literals;
    }, []);
    return literals
        .filter(deduplicateLiterals)
        .map(addAttribute(name));
}
export function getAttributesByHTMLTag(ctx, node) {
    return node.attributes;
}
export function getLiteralsByHTMLAttributeNode(ctx, attribute) {
    const value = attribute.value;
    if (!value) {
        return [];
    }
    const line = ctx.sourceCode.lines[attribute.loc.start.line - 1];
    const raw = attribute.startWrapper?.value + value.value + attribute.endWrapper?.value;
    const quotes = getQuotesByHTMLAttribute(ctx, attribute);
    const indentation = getIndentation(line);
    const content = getContent(raw, quotes);
    return [{
            ...quotes,
            content,
            indentation,
            isInterpolated: false,
            loc: value.loc,
            range: [value.range[0] - 1, value.range[1] + 1], // include quotes in range
            raw,
            supportsMultiline: true,
            type: "StringLiteral"
        }];
}
function getQuotesByHTMLAttribute(ctx, attribute) {
    const openingQuote = attribute.startWrapper?.value;
    const closingQuote = attribute.endWrapper?.value;
    return {
        closingQuote: closingQuote === "'" || closingQuote === '"' ? closingQuote : undefined,
        openingQuote: openingQuote === "'" || openingQuote === '"' ? openingQuote : undefined
    };
}
//# sourceMappingURL=html.js.map