/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

// Patch `Linter#verify` to work.
require("../utils/patch")()

module.exports = {
    meta: {
        /** @type {import("@eslint/core").DeprecatedInfo} */
        deprecated: {
            availableUntil: "5.0.0",
            deprecatedSince: "4.7.0",
            message:
                "ESLint now has built-in functionality to report unused `eslint-disable` comments",
            replacedBy: [
                {
                    message:
                        "You can now use ESLint's built-in `linterOptions.reportUnusedDisabledDirectives` to report unused `eslint-disable` comments",
                    url: "https://eslint.org/docs/latest/use/configure/configuration-files#reporting-unused-disable-directives",
                },
            ],
        },
        docs: {
            description: "disallow unused `eslint-disable` comments",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html",
        },
        fixable: null,
        // eslint-disable-next-line eslint-plugin/prefer-message-ids
        messages: {},
        schema: [],
        type: "problem",
    },

    create() {
        // This rule patches `Linter#verify` method and:
        //
        // 1. enables `reportUnusedDisableDirectives` option.
        // 2. verifies the code.
        // 3. converts `reportUnusedDisableDirectives` errors to `no-unused-disable` errors.
        //
        // So this rule itself does nothing.
        return {}
    },
}
