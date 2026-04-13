import { enforceCanonicalClasses } from "../rules/enforce-canonical-classes.js";
import { enforceConsistentClassOrder } from "../rules/enforce-consistent-class-order.js";
import { enforceConsistentImportantPosition } from "../rules/enforce-consistent-important-position.js";
import { enforceConsistentLineWrapping } from "../rules/enforce-consistent-line-wrapping.js";
import { enforceConsistentVariableSyntax } from "../rules/enforce-consistent-variable-syntax.js";
import { enforceConsistentVariantOrder } from "../rules/enforce-consistent-variant-order.js";
import { enforceLogicalProperties } from "../rules/enforce-logical-properties.js";
import { enforceShorthandClasses } from "../rules/enforce-shorthand-classes.js";
import { noConflictingClasses } from "../rules/no-conflicting-classes.js";
import { noDeprecatedClasses } from "../rules/no-deprecated-classes.js";
import { noDuplicateClasses } from "../rules/no-duplicate-classes.js";
import { noRestrictedClasses } from "../rules/no-restricted-classes.js";
import { noUnknownClasses } from "../rules/no-unknown-classes.js";
import { noUnnecessaryWhitespace } from "../rules/no-unnecessary-whitespace.js";
const rules = [
    enforceConsistentClassOrder,
    enforceConsistentImportantPosition,
    enforceConsistentLineWrapping,
    enforceConsistentVariantOrder,
    enforceConsistentVariableSyntax,
    enforceLogicalProperties,
    enforceShorthandClasses,
    noConflictingClasses,
    noDeprecatedClasses,
    noDuplicateClasses,
    noRestrictedClasses,
    noUnnecessaryWhitespace,
    noUnknownClasses,
    enforceCanonicalClasses
];
const plugin = {
    meta: {
        name: "better-tailwindcss"
    },
    rules: rules.reduce((acc, { name, rule }) => {
        acc[name] = rule;
        return acc;
    }, {})
};
const getStylisticRules = (severity = "warn") => {
    return rules.reduce((acc, { category, name, recommended }) => {
        if (category !== "stylistic" || !recommended) {
            return acc;
        }
        acc[`${plugin.meta.name}/${name}`] = severity;
        return acc;
    }, {});
};
const getCorrectnessRules = (severity = "error") => {
    return rules.reduce((acc, { category, name, recommended }) => {
        if (category !== "correctness" || !recommended) {
            return acc;
        }
        acc[`${plugin.meta.name}/${name}`] = severity;
        return acc;
    }, {});
};
const getRecommendedRules = (severity) => ({
    ...getStylisticRules(severity),
    ...getCorrectnessRules(severity)
});
const createLegacyConfig = (rules) => ({
    plugins: [plugin.meta.name],
    rules
});
const createFlatConfig = (rules) => ({
    plugins: {
        [plugin.meta.name]: plugin
    },
    rules
});
const configEntry = (key, value) => {
    return { [key]: value };
};
const createConfig = (name, getRules) => {
    return {
        ...configEntry(`legacy-${name}`, createLegacyConfig(getRules())),
        ...configEntry(`legacy-${name}-error`, createLegacyConfig(getRules("error"))),
        ...configEntry(`legacy-${name}-warn`, createLegacyConfig(getRules("warn"))),
        ...configEntry(name, createFlatConfig(getRules())),
        ...configEntry(`${name}-error`, createFlatConfig(getRules("error"))),
        ...configEntry(`${name}-warn`, createFlatConfig(getRules("warn")))
    };
};
const config = {
    ...plugin,
    configs: {
        ...createConfig("stylistic", getStylisticRules),
        ...createConfig("correctness", getCorrectnessRules),
        ...createConfig("recommended", getRecommendedRules)
    }
};
export default config;
export { config as "module.exports" };
//# sourceMappingURL=config.js.map