import { createGetDissectedClasses, getDissectedClasses } from "../tailwindcss/dissect-classes.js";
import { createGetVariantOrder, getVariantOrder } from "../tailwindcss/variant-order.js";
import { buildClass } from "../utils/class.js";
import { async } from "../utils/context.js";
import { lintClasses } from "../utils/lint.js";
import { createRule } from "../utils/rule.js";
import { splitClasses } from "../utils/utils.js";
export const enforceConsistentVariantOrder = createRule({
    autofix: true,
    category: "stylistic",
    description: "Enforce a consistent variant order for Tailwind classes.",
    docs: "https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-variant-order.md",
    name: "enforce-consistent-variant-order",
    recommended: false,
    messages: {
        order: "Incorrect variant order. '{{ className }}' should be '{{ fix }}'."
    },
    initialize: ctx => {
        createGetDissectedClasses(ctx);
        createGetVariantOrder(ctx);
    },
    lintLiterals: (ctx, literals) => {
        if (ctx.version.major <= 3) {
            return;
        }
        for (const literal of literals) {
            const classes = splitClasses(literal.content);
            const { dissectedClasses, warnings: dissectedWarnings } = getDissectedClasses(async(ctx), classes);
            const { variantOrder, warnings } = getVariantOrder(async(ctx), classes);
            const allWarnings = [...dissectedWarnings, ...warnings];
            lintClasses(ctx, literal, className => {
                const dissectedClass = dissectedClasses[className];
                if (!dissectedClass?.variants || dissectedClass.variants.length <= 1) {
                    return;
                }
                if (dissectedClass.variants.some(variant => variantOrder[variant] === undefined)) {
                    return;
                }
                const sortedVariants = dissectedClass.variants.toSorted((variantA, variantB) => {
                    return compareVariantOrder(variantOrder[variantA], variantOrder[variantB]);
                });
                if (dissectedClass.variants.every((value, index) => value === sortedVariants[index])) {
                    return false;
                }
                const fix = buildClass(ctx, {
                    ...dissectedClass,
                    variants: sortedVariants
                });
                return {
                    data: {
                        className,
                        fix
                    },
                    fix,
                    id: "order",
                    warnings: allWarnings
                };
            });
        }
    }
});
function compareVariantOrder(orderA, orderB) {
    if (orderA === orderB) {
        return 0;
    }
    if (orderA === undefined) {
        return +1;
    }
    if (orderB === undefined) {
        return -1;
    }
    // Match Tailwind language service behavior: variants with higher order index come first.
    return +(orderB - orderA > 0) - +(orderB - orderA < 0);
}
//# sourceMappingURL=enforce-consistent-variant-order.js.map