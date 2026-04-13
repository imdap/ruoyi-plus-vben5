/* eslint-disable eslint-plugin-jsdoc/require-returns */
/* eslint-disable eslint-plugin-jsdoc/require-description */
import { DEFAULT_SELECTORS } from "../options/default-options.js";
import { migrateFlatSelectorsToLegacySelectors } from "../options/migrate.js";
import { SelectorKind } from "../types/rule.js";
import { isSelectorKind } from "../utils/selectors.js";
/**
 * @deprecated Migrate to selectors instead.
 */
export function getDefaultCallees() {
    return migrateFlatSelectorsToLegacySelectors(DEFAULT_SELECTORS.filter(isSelectorKind(SelectorKind.Callee))).callees ?? [];
}
/**
 * @deprecated Migrate to selectors instead.
 */
export function getDefaultAttributes() {
    return migrateFlatSelectorsToLegacySelectors(DEFAULT_SELECTORS.filter(isSelectorKind(SelectorKind.Attribute))).attributes ?? [];
}
/**
 * @deprecated Migrate to selectors instead.
 */
export function getDefaultVariables() {
    return migrateFlatSelectorsToLegacySelectors(DEFAULT_SELECTORS.filter(isSelectorKind(SelectorKind.Variable))).variables ?? [];
}
/**
 * @deprecated Migrate to selectors instead.
 */
export function getDefaultTags() {
    return migrateFlatSelectorsToLegacySelectors(DEFAULT_SELECTORS.filter(isSelectorKind(SelectorKind.Tag))).tags ?? [];
}
export function getDefaultSelectors() {
    return DEFAULT_SELECTORS;
}
//# sourceMappingURL=defaults.js.map