import { type Rule, type RuleConfigCondition, type RuleOutcome } from '@commitlint/types';
type Commit = Parameters<Rule>[0];
type FunctionRule = (parsed: Commit, when: RuleConfigCondition) => RuleOutcome | Promise<RuleOutcome>;
declare const functionRule: Rule<FunctionRule>;
export { type Commit, functionRule };
