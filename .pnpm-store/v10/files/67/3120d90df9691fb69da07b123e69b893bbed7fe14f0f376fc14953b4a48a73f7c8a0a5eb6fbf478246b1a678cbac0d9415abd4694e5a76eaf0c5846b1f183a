const SPLIT_BY_COMMA_REGEXP = /[,()]/gm;
const SPLIT_BY_SPACE_REGEXP = /[()]|\s+/gm;
/**
 * Style declaration value parser.
 */
export default class CSSStyleDeclarationValueUtility {
    /**
     * Splits by comma while respecting nested parentheses.
     *
     * @param value Value to split.
     * @returns Array of parts.
     */
    static splitByComma(value) {
        const parts = [];
        const regexp = new RegExp(SPLIT_BY_COMMA_REGEXP);
        let match;
        let depth = 0;
        let lastIndex = 0;
        while ((match = regexp.exec(value))) {
            switch (match[0]) {
                case '(':
                    depth++;
                    break;
                case ')':
                    depth--;
                    break;
                case ',':
                    if (depth === 0) {
                        const part = value.substring(lastIndex, match.index).trim();
                        if (part) {
                            parts.push(part);
                        }
                        lastIndex = regexp.lastIndex;
                    }
                    break;
            }
        }
        if (lastIndex < value.length) {
            parts.push(value.substring(lastIndex).trim());
        }
        return parts;
    }
    /**
     * Splits by space while respecting nested parentheses.
     *
     * @param value Value to split.
     * @returns Array of parts.
     */
    static splitBySpace(value) {
        const parts = [];
        const regexp = new RegExp(SPLIT_BY_SPACE_REGEXP);
        let match;
        let depth = 0;
        let lastIndex = 0;
        while ((match = regexp.exec(value))) {
            switch (match[0]) {
                case '(':
                    depth++;
                    break;
                case ')':
                    depth--;
                    break;
                default:
                    if (depth === 0) {
                        const part = value.substring(lastIndex, match.index).trim();
                        if (part) {
                            parts.push(part);
                        }
                        lastIndex = regexp.lastIndex;
                    }
                    break;
            }
        }
        if (lastIndex < value.length) {
            const part = value.substring(lastIndex).trim();
            if (part) {
                parts.push(part);
            }
        }
        return parts;
    }
}
//# sourceMappingURL=CSSStyleDeclarationValueUtility.js.map