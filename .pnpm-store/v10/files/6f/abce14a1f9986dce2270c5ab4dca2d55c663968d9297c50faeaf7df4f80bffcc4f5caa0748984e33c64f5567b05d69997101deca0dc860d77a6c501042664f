import type { Rule } from "eslint";
import type { CommonOptions } from "../options/descriptions.js";
import type { Literal } from "../types/ast.js";
import type { Context, CreateRuleOptions, JsonSchema, RuleCategory, Schema } from "../types/rule.js";
export declare function createRule<const Name extends string, const Messages extends Record<string, string>, const OptionsSchema extends Schema = Schema, const Options extends CommonOptions & JsonSchema<OptionsSchema> = CommonOptions & JsonSchema<OptionsSchema>, const Category extends RuleCategory = RuleCategory, const Recommended extends boolean = boolean>(options: CreateRuleOptions<Name, Messages, OptionsSchema, Options, Category, Recommended>): {
    category: Category;
    messages: Messages | undefined;
    name: Name;
    readonly options: Options;
    recommended: Recommended;
    rule: {
        create: (ctx: import("node_modules/@eslint/core/dist/cjs/types.cjs").RuleContext<{
            LangOptions: import("eslint").Linter.LanguageOptions;
            Code: import("eslint").SourceCode;
            RuleOptions: [Required<Options>];
            Node: import("eslint").JSSyntaxElement;
            MessageIds: keyof Messages & string;
        }>) => Rule.RuleListener;
        meta: {
            messages?: Messages;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            fixable: "code" | undefined;
            schema: {
                additionalProperties: false;
                properties: Record<string, boolean | import("@valibot/to-json-schema").JsonSchema> | undefined;
                type: "object";
            }[];
            type: "problem" | "layout";
        };
    };
};
export declare function createRuleListener<Ctx extends Context>(ctx: Rule.RuleContext, context: Ctx, lintLiterals: (ctx: Ctx, literals: Literal[]) => void): Rule.RuleListener;
//# sourceMappingURL=rule.d.ts.map