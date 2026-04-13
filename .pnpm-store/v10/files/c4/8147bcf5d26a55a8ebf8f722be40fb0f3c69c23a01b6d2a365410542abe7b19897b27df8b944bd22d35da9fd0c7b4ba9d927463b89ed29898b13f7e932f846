import { Rule } from 'eslint';

type LazyCreate = (context: any, ...args: any[]) => any;
/**
 * This is a helper function that converts the given create function into `@eslint/json` compatible create function.
 */
declare function toCompatCreate<F extends LazyCreate>(create: F): F;

type LazyRuleModule = {
    create: LazyCreate;
    meta?: Rule.RuleMetaData;
};
/**
 * This is a helper function that converts the given rule object into `@eslint/json` compatible rule.
 */
declare function toCompatRule<R extends LazyRuleModule>(rule: R): R;

type LazyPlugin = {
    rules?: Record<string, LazyRuleModule> | undefined;
};
/**
 * This is a helper function that converts the given rule object into `@eslint/json` compatible rule.
 */
declare function toCompatPlugin<P extends LazyPlugin>(plugin: P): P;

export { toCompatCreate, toCompatPlugin, toCompatRule };
