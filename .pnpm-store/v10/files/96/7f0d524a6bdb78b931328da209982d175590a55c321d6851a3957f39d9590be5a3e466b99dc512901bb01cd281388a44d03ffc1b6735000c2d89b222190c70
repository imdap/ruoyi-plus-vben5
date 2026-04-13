import { description, literal, optional, pipe, strictObject, union } from "valibot";
import { createGetDissectedClasses, getDissectedClasses } from "../tailwindcss/dissect-classes.js";
import { buildClass } from "../utils/class.js";
import { async } from "../utils/context.js";
import { lintClasses } from "../utils/lint.js";
import { getCachedRegex } from "../async-utils/regex.js";
import { createRule } from "../utils/rule.js";
import { splitClasses } from "../utils/utils.js";
export const enforceConsistentVariableSyntax = createRule({
    autofix: true,
    category: "stylistic",
    description: "Enforce consistent syntax for css variables.",
    docs: "https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-variable-syntax.md",
    name: "enforce-consistent-variable-syntax",
    recommended: false,
    messages: {
        incorrect: "Incorrect variable syntax: {{ className }}."
    },
    schema: strictObject({
        syntax: optional(pipe(union([
            literal("shorthand"),
            literal("variable")
        ]), description("The syntax to enforce for css variables in tailwindcss class strings.")), "shorthand")
    }),
    initialize: ctx => {
        createGetDissectedClasses(ctx);
    },
    lintLiterals: (ctx, literals) => lintLiterals(ctx, literals)
});
function lintLiterals(ctx, literals) {
    const { syntax } = ctx.options;
    for (const literal of literals) {
        const classes = splitClasses(literal.content);
        const { dissectedClasses, warnings } = getDissectedClasses(async(ctx), classes);
        lintClasses(ctx, literal, className => {
            const dissectedClass = dissectedClasses[className];
            if (!dissectedClass) {
                return;
            }
            // skip variable definitions
            if (dissectedClass.base.includes(":")) {
                return;
            }
            const { after: afterParentheses, before: beforeParentheses, characters: charactersParentheses } = extractBalanced(dissectedClass.base);
            const { after: afterSquareBrackets, before: beforeSquareBrackets, characters: charactersSquareBrackets } = extractBalanced(dissectedClass.base, "[", "]");
            if (syntax === "shorthand") {
                if (!charactersSquareBrackets) {
                    return;
                }
                if (isBeginningOfArbitraryVariable(charactersSquareBrackets)) {
                    const { after, characters } = extractBalanced(charactersSquareBrackets);
                    if (trimTailwindWhitespace(after).length > 0) {
                        return;
                    }
                    const fixedClass = ctx.version.major >= 4
                        ? buildClass(ctx, { ...dissectedClass, base: [...beforeSquareBrackets, `(${characters})`, ...afterSquareBrackets].join("") })
                        : buildClass(ctx, { ...dissectedClass, base: [...beforeSquareBrackets, `[${characters}]`, ...afterSquareBrackets].join("") });
                    return {
                        data: { className },
                        fix: fixedClass,
                        id: "incorrect",
                        warnings
                    };
                }
                if (isBeginningOfArbitraryShorthand(charactersSquareBrackets)) {
                    if (ctx.version.major <= 3) {
                        return;
                    }
                    const fixedClass = buildClass(ctx, {
                        ...dissectedClass,
                        base: [...beforeSquareBrackets, `(${charactersSquareBrackets})`, ...afterSquareBrackets].join("")
                    });
                    return {
                        data: { className },
                        fix: fixedClass,
                        id: "incorrect",
                        warnings
                    };
                }
            }
            if (syntax === "variable") {
                if (charactersSquareBrackets && isBeginningOfArbitraryVariable(charactersSquareBrackets)) {
                    return;
                }
                if (isBeginningOfArbitraryShorthand(charactersSquareBrackets)) {
                    const fixedClass = buildClass(ctx, {
                        ...dissectedClass,
                        base: [...beforeSquareBrackets, `[var(${charactersSquareBrackets})]`, ...afterSquareBrackets].join("")
                    });
                    return {
                        data: { className },
                        fix: fixedClass,
                        id: "incorrect",
                        warnings
                    };
                }
                if (isBeginningOfArbitraryShorthand(charactersParentheses)) {
                    const fixedClass = buildClass(ctx, {
                        ...dissectedClass,
                        base: [
                            ...beforeParentheses,
                            `[var(${charactersParentheses})]`,
                            ...afterParentheses
                        ].join("")
                    });
                    return {
                        data: { className },
                        fix: fixedClass,
                        id: "incorrect",
                        warnings
                    };
                }
            }
        });
    }
}
function isBeginningOfArbitraryShorthand(base) {
    return getCachedRegex(/^_*--(?![\w-]+\()/).test(base);
}
function isBeginningOfArbitraryVariable(base) {
    return getCachedRegex(/^_*var\(_*--/).test(base);
}
function extractBalanced(className, start = "(", end = ")") {
    const before = [];
    const characters = [];
    const after = [];
    for (let i = 0, parenthesesCount = 0, hasStarted = false, hasEnded = false; i < className.length; i++) {
        if (className[i] === start) {
            parenthesesCount++;
            if (!hasStarted) {
                hasStarted = true;
                continue;
            }
        }
        if (!hasStarted && !hasEnded) {
            before.push(className[i]);
            continue;
        }
        if (className[i] === end) {
            parenthesesCount--;
            if (parenthesesCount === 0) {
                hasEnded = true;
                continue;
            }
        }
        if (!hasEnded) {
            characters.push(className[i]);
            continue;
        }
        else {
            after.push(className[i]);
        }
    }
    return {
        after: after.join(""),
        before: before.join(""),
        characters: characters.join("")
    };
}
function trimTailwindWhitespace(className) {
    return className.replace(/^_+|_+$/g, "");
}
//# sourceMappingURL=enforce-consistent-variable-syntax.js.map