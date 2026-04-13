import { lintClasses } from "../utils/lint.js";
import { createRule } from "../utils/rule.js";
import { isClassSticky, splitClasses } from "../utils/utils.js";
export const noDuplicateClasses = createRule({
    autofix: true,
    category: "stylistic",
    description: "Disallow duplicate class names in tailwind classes.",
    docs: "https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-duplicate-classes.md",
    name: "no-duplicate-classes",
    recommended: true,
    messages: {
        duplicate: "Duplicate classname: \"{{ className }}\"."
    },
    lintLiterals: (ctx, literals) => lintLiterals(ctx, literals)
});
function lintLiterals(ctx, literals) {
    for (const literal of literals) {
        const parentClasses = literal.priorLiterals
            ? getClassesFromLiteralNodes(literal.priorLiterals)
            : [];
        lintClasses(ctx, literal, (className, index, after) => {
            const duplicateClassIndex = after.findIndex((afterClass, afterIndex) => afterClass === className && afterIndex < index);
            // always keep sticky classes
            if (isClassSticky(literal, index) || isClassSticky(literal, duplicateClassIndex)) {
                return;
            }
            if (parentClasses.includes(className) || duplicateClassIndex !== -1) {
                return {
                    data: { className },
                    fix: "",
                    id: "duplicate"
                };
            }
        });
    }
}
function getClassesFromLiteralNodes(literals) {
    return literals.reduce((combinedClasses, literal) => {
        if (!literal) {
            return combinedClasses;
        }
        const classes = literal.content;
        const split = splitClasses(classes);
        for (const className of split) {
            if (!combinedClasses.includes(className)) {
                combinedClasses.push(className);
            }
        }
        return combinedClasses;
    }, []);
}
//# sourceMappingURL=no-duplicate-classes.js.map