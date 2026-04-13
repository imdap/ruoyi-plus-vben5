import { hasESNodeParentExtension, isESSimpleStringLiteral } from "../parsers/es.js";
import { MATCHER_RESULT } from "../types/rule.js";
import { getCachedRegex } from "../async-utils/regex.js";
import { isGenericNodeWithParent } from "./utils.js";
export function getLiteralNodesByMatchers(ctx, node, matcherFunctions) {
    if (!isGenericNodeWithParent(node)) {
        return [];
    }
    const nestedLiterals = findMatchingNestedNodes(node, matcherFunctions);
    const self = matcherFunctions.reduce((self, matcherFunction) => {
        const result = matcherFunction(node);
        if (result === MATCHER_RESULT.NO_MATCH) {
            return self;
        }
        else if (result === MATCHER_RESULT.MATCH) {
            return [node, ...self];
        }
        else if (result === MATCHER_RESULT.UNCROSSABLE_BOUNDARY) {
            return self;
        }
        else if (Array.isArray(result)) {
            self.push(...findMatchingNestedNodes(node, result));
        }
        return self;
    }, []);
    return [...nestedLiterals, ...self];
}
function findMatchingNestedNodes(node, matcherFunctions) {
    return Object.entries(node).reduce((matchedNodes, [key, value]) => {
        if (!value || typeof value !== "object" || key === "parent") {
            return matchedNodes;
        }
        let isMatch = false;
        let currentMatcherFunctions = [...matcherFunctions];
        let hasMatcherFunctions = currentMatcherFunctions.length > 0;
        while (hasMatcherFunctions) {
            const nextMatcherFunctions = [];
            const nestedMatcherFunctions = [];
            for (const matcherFunction of currentMatcherFunctions) {
                const result = matcherFunction(value);
                if (result === MATCHER_RESULT.NO_MATCH) {
                    nextMatcherFunctions.push(matcherFunction);
                    continue;
                }
                if (result === MATCHER_RESULT.MATCH) {
                    isMatch = true;
                    nextMatcherFunctions.push(matcherFunction);
                    continue;
                }
                if (result === MATCHER_RESULT.UNCROSSABLE_BOUNDARY) {
                    continue;
                }
                for (const nestedMatcherFunction of result) {
                    nestedMatcherFunctions.push(nestedMatcherFunction);
                }
            }
            hasMatcherFunctions = nestedMatcherFunctions.length > 0;
            currentMatcherFunctions = hasMatcherFunctions
                ? nestedMatcherFunctions
                : nextMatcherFunctions;
        }
        if (isMatch) {
            matchedNodes.push(value);
        }
        if (currentMatcherFunctions.length === 0) {
            return matchedNodes;
        }
        matchedNodes.push(...findMatchingNestedNodes(value, currentMatcherFunctions));
        return matchedNodes;
    }, []);
}
export function matchesPathPattern(path, pattern) {
    return getCachedRegex(pattern).test(path);
}
export function isCalleeName(callee) {
    return typeof callee === "string";
}
export function isCalleeMatchers(callee) {
    return Array.isArray(callee) && typeof callee[0] === "string" && Array.isArray(callee[1]);
}
export function isVariableName(variable) {
    return typeof variable === "string";
}
export function isVariableMatchers(variable) {
    return Array.isArray(variable) && typeof variable[0] === "string" && Array.isArray(variable[1]);
}
export function isTagName(tag) {
    return typeof tag === "string";
}
export function isTagMatchers(tag) {
    return Array.isArray(tag) && typeof tag[0] === "string" && Array.isArray(tag[1]);
}
export function isAttributesName(attributes) {
    return typeof attributes === "string";
}
export function isAttributesMatchers(attributes) {
    return Array.isArray(attributes) && typeof attributes[0] === "string" && Array.isArray(attributes[1]);
}
export function isInsideConditionalExpressionTest(node) {
    if (!hasESNodeParentExtension(node)) {
        return false;
    }
    if (node.parent.type === "ConditionalExpression" && node.parent.test === node) {
        return true;
    }
    return isInsideConditionalExpressionTest(node.parent);
}
export function isInsideDisallowedBinaryExpression(node) {
    if (!hasESNodeParentExtension(node)) {
        return false;
    }
    if (node.parent.type === "BinaryExpression" &&
        node.parent.operator !== "+" // allow string concatenation
    ) {
        return true;
    }
    return isInsideDisallowedBinaryExpression(node.parent);
}
export function isInsideLogicalExpressionLeft(node) {
    if (!hasESNodeParentExtension(node)) {
        return false;
    }
    if (node.parent.type === "LogicalExpression" && node.parent.left === node) {
        return true;
    }
    return isInsideLogicalExpressionLeft(node.parent);
}
export function isInsideMemberExpression(node) {
    // aka indexed access: https://github.com/estree/estree/blob/master/es5.md#memberexpression
    if (!hasESNodeParentExtension(node)) {
        return false;
    }
    if (node.parent.type === "MemberExpression") {
        return true;
    }
    return isInsideMemberExpression(node.parent);
}
export function isIndexedAccessLiteral(node) {
    if (!hasESNodeParentExtension(node)) {
        return false;
    }
    if (node.parent.type !== "MemberExpression") {
        return false;
    }
    return node.parent.property === node && isESSimpleStringLiteral(node);
}
//# sourceMappingURL=matchers.js.map