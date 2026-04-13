/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const {
    getAllDirectiveComments,
} = require("../internal/get-all-directive-comments")
const utils = require("../internal/utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow ESLint directive-comments",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-use.html",
        },
        fixable: null,
        messages: {
            disallow: "Unexpected ESLint directive comment.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: {
                            enum: [
                                "eslint",
                                "eslint-disable",
                                "eslint-disable-line",
                                "eslint-disable-next-line",
                                "eslint-enable",
                                "eslint-env",
                                "exported",
                                "global",
                                "globals",
                            ],
                        },
                        additionalItems: false,
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        type: "suggestion",
    },

    create(context) {
        const allowed = new Set(
            (context.options[0] && context.options[0].allow) || []
        )

        for (const directiveComment of getAllDirectiveComments(context)) {
            if (!allowed.has(directiveComment.kind)) {
                context.report({
                    loc: utils.toForceLocation(directiveComment.loc),
                    messageId: "disallow",
                })
            }
        }
        return {}
    },
}
