import { Interface } from 'node:readline';
import Base from 'inquirer/lib/prompts/base';
import { Answers as Answers$1, Question } from 'inquirer';
import Separator from 'inquirer/lib/objects/separator';
import * as cosmiconfig_dist_types from 'cosmiconfig/dist/types';
import { RulesConfig as RulesConfig$1 } from '@commitlint/types';

interface ChoiceType<T> {
    name: string;
    type: string | T;
    short: string;
    value: string | boolean;
    line: string;
    disabled: boolean;
    checked: boolean;
}
interface ChoicesType {
    getChoice: (pointer: number) => ChoiceType<any>;
    /**
     * origin choices
     */
    choices: ChoiceType<Separator['type']>[];
    /**
     * filter Separator choices
     */
    realChoices: ChoiceType<string>[];
}
interface BaseOptionType {
    pageSize: number;
    default?: any;
}
interface isFinal {
    isFinal: boolean;
}
interface SearchPromptQuestionOptions<T extends Answers$1 = Answers$1> extends Question<T> {
    separator: string;
    /**
     * support rgb color code. e.g: `38;5;042`
     *
     * @default cyan
     * @tip the rgb color see to check your number: https://github.com/sindresorhus/xterm-colors
     */
    themeColorCode?: string;
    /**
     * default checked item's value array on initial
     */
    initialCheckedValue?: string[] | string;
    /**
     * Function to determine what options to display to user.
     * Called with previous answers object and the current user input each time the user types, it must return a promise.
     */
    source: (answersSoFar: T, input: string | undefined) => Promise<any[]>;
    /**
     * The number of elements to show on each page.
     */
    pageSize?: number | undefined;
    /**
     * Setting it to true turns the input into a normal text input.
     *
     * @default false
     */
    isInitDefault?: boolean | undefined;
}
interface CompletePromptQuestionOptions<T extends Answers$1 = Answers$1> extends Question<T> {
    completeValue?: string;
    transformer?: (input: string, answers: Answers$1, { isFinal }: isFinal) => string;
}

interface FilterArrayItemType {
    value: string;
    name: string;
    emoji?: string;
    index?: number;
    score?: number;
}

/**
 * @description check the term is support unicode
 */
declare function isUnicodeSupport(): boolean;
declare const figures: {
    pointer: string;
    radioOn: string;
    radioOff: string;
    squareSmallFilled: string;
};

/**
 * Terminal style output colorizen
 * Inspired by `picocolors` (https://www.npmjs.com/package/picocolors)
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */
/**
 * Check current is support color command text
 *
 * @param colorSupport can force output not colorizen
 * @param fd Channel. Provide options to allow users to customize the judgment.
 * e.g, logs and TUI are 2 stderr. In this case, only when the user operates on 2 does the color output need to be disabled.
 * COMMAND 2 > runtime.log. All logs need to remove colorizen code
 */
declare function isColorizenSupport(colorSupport?: boolean, fd?: number): boolean;
/**
 * support control isColorizen as param
 * styleFn generator
 */
declare function createStyle(enabled?: boolean): {
    isColorSupported: boolean;
    reset: (input: string) => string;
    bold: (input: string) => string;
    dim: (input: string) => string;
    italic: (input: string) => string;
    underline: (input: string) => string;
    inverse: (input: string) => string;
    hidden: (input: string) => string;
    strikethrough: (input: string) => string;
    black: (input: string) => string;
    red: (input: string) => string;
    green: (input: string) => string;
    yellow: (input: string) => string;
    blue: (input: string) => string;
    magenta: (input: string) => string;
    cyan: (input: string) => string;
    white: (input: string) => string;
    gray: (input: string) => string;
    bgBlack: (input: string) => string;
    bgRed: (input: string) => string;
    bgGreen: (input: string) => string;
    bgYellow: (input: string) => string;
    bgBlue: (input: string) => string;
    bgMagenta: (input: string) => string;
    bgCyan: (input: string) => string;
    bgWhite: (input: string) => string;
    rgb: (rgbColor?: string) => (input: string) => string;
};
/**
 * @description commandline style output colorizen.
 * Automatically determine whether output coloring is required.
 *
 * @tip the rgb color see to check your number: https://github.com/sindresorhus/xterm-colors
 */
declare const style: {
    isColorSupported: boolean;
    reset: (input: string) => string;
    bold: (input: string) => string;
    dim: (input: string) => string;
    italic: (input: string) => string;
    underline: (input: string) => string;
    inverse: (input: string) => string;
    hidden: (input: string) => string;
    strikethrough: (input: string) => string;
    black: (input: string) => string;
    red: (input: string) => string;
    green: (input: string) => string;
    yellow: (input: string) => string;
    blue: (input: string) => string;
    magenta: (input: string) => string;
    cyan: (input: string) => string;
    white: (input: string) => string;
    gray: (input: string) => string;
    bgBlack: (input: string) => string;
    bgRed: (input: string) => string;
    bgGreen: (input: string) => string;
    bgYellow: (input: string) => string;
    bgBlue: (input: string) => string;
    bgMagenta: (input: string) => string;
    bgCyan: (input: string) => string;
    bgWhite: (input: string) => string;
    rgb: (rgbColor?: string) => (input: string) => string;
};

/**
 * @description Provide list and checkBox fuzzy search
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

/**
 * input string match target string return match score
 *
 * @param {string} input input string
 * @param {string} target target string
 * @param {boolean} caseSensitive isCaseSensitive, default: false
 * @return {number | null} match score. if not match return null
 */
declare function fuzzyMatch(input: string, target: string, caseSensitive?: boolean): number | null;
/**
 * Array fuzzy filter
 *
 * @param {string} input input string
 * @param {Array<FilterArrayItemType | unknown>} arr target Array
 * @return {Array<FilterArrayItemType>} filtered array
 */
declare function fuzzyFilter(input: string, arr: Array<FilterArrayItemType>, targetKey?: 'name' | 'value'): Array<FilterArrayItemType>;

/**
 * @description ANSI escape codes for manipulating the terminal
 */
declare const ansiEscapes: {
    /** move cursor to left */
    cursorLeft: string;
    /** move cursor forward count length */
    cursorForward: (count?: number) => string;
    /** move cursor backward count length */
    cursorBackward: (count?: number) => string;
};

/**
 * @description inquirer plugin - Search List
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 * Powered by `inquirer-autocomplete-prompt`
 */

declare class SearchList extends Base {
    private renderChoices;
    private pointer;
    private choicesLen;
    private firstRender;
    private searching;
    private haveSearched;
    private themeColorCode?;
    private initialValue;
    private lastSearchInput?;
    private paginator;
    private answer?;
    private done;
    constructor(questions: Question, readline: Interface, answers: Answers$1);
    /**
     * Start the Inquiry session
     *
     * @param {Function} cb Callback when prompt is done
     */
    _run(cb: any): this;
    /**
     * render screen
     */
    render(error?: string): void;
    /**
     * resolve source to get renderChoices
     */
    search(input?: string): Promise<any>;
    /**
     * resovle line Events <Enter>
     */
    onSubmit(): void;
    onSubmitAfterValidation(line: string): void;
    /**
     * keypress handler
     */
    onKeypress(e: {
        key: {
            name?: string;
            ctrl?: boolean;
        };
        value: string;
    }): void;
    ensureSelectedInRange(): void;
}

/**
 * @description inquirer plugin - Search Checkbox
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

declare class SearchCheckbox extends Base {
    private renderChoices;
    private originChoices;
    private pointer;
    private choicesLen;
    private selection;
    private firstRender;
    private searching;
    private haveSearched;
    private themeColorCode?;
    private initialCheckedValue?;
    private initialValue;
    private lastSearchInput?;
    private paginator;
    private separator;
    private answer?;
    private done;
    constructor(questions: Question, readline: Interface, answers: Answers$1);
    /**
     * Start the Inquiry session
     *
     * @param {Function} cb Callback when prompt is done
     */
    _run(cb: any): this;
    /**
     * render screen
     *
     * @param {string} error output screen footer
     */
    render(error?: string): void;
    /**
     * resolve source to get renderChoices
     *
     * @param {string} input search input
     */
    search(input?: string): Promise<any>;
    /**
     * resolve choice
     */
    onChoice(): void;
    /**
     * resovle line <Enter> Events
     */
    onSubmit(): void;
    onSubmitAfterValidation(choices: ChoiceType<string>[]): void;
    /**
     * keypress handler
     */
    onKeypress(e: {
        key: {
            name?: string;
            ctrl?: boolean;
        };
        value: string;
    }): void;
    ensureSelectedInRange(): void;
}

/**
 * @description inquirer plugin - Support completion of input
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

declare class CompleteInput extends Base {
    private completeValue?;
    private answer?;
    private state?;
    private done;
    constructor(questions: Question, readline: Interface, answers: Answers$1);
    /**
     * Start the Inquiry session
     *
     * @param {Function} cb Callback when prompt is done
     */
    _run(cb: any): this;
    /**
     * render screen
     *
     * @param {string} error output screen footer
     */
    render(error?: string): void;
    filterInput(input?: string): string;
    onEnd(state: {
        value?: string;
    }): void;
    onError({ value, isValid }: any): void;
    onKeypress(e: {
        key: {
            name?: string;
            ctrl?: boolean;
        };
        value: string;
    }): void;
}

declare function generateQuestions(options: CommitizenGitOptions, cz: any): false | ({
    type: string;
    name: string;
    message: string | undefined;
    themeColorCode: string | undefined;
    source: (_: unknown, input: string) => FilterArrayItemType[];
    separator?: undefined;
    initialCheckedValue?: undefined;
    validate?: undefined;
    when?: undefined;
    completeValue?: undefined;
    transformer?: undefined;
    filter?: undefined;
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string | string[] | undefined;
    separator: string | undefined;
    themeColorCode: string | undefined;
    initialCheckedValue: string | string[] | undefined;
    source: (answer: Answers, input: string) => FilterArrayItemType[];
    validate: (input: string | Array<string>) => string | true;
    when: (answer: Answers) => boolean;
    completeValue?: undefined;
    transformer?: undefined;
    filter?: undefined;
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string | undefined;
    completeValue: string | undefined;
    validate: (input: string | Array<string>) => string | true;
    when: (answers: Answers) => boolean;
    transformer: (input: string) => string;
    themeColorCode?: undefined;
    source?: undefined;
    separator?: undefined;
    initialCheckedValue?: undefined;
    filter?: undefined;
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string | undefined;
    completeValue: string | undefined;
    validate: (subject: string, answers: Answers) => string | boolean;
    transformer: (subject: string, answers: Answers) => string;
    filter: (subject: string) => string;
    themeColorCode?: undefined;
    source?: undefined;
    separator?: undefined;
    initialCheckedValue?: undefined;
    when?: undefined;
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string | undefined;
    completeValue: string | undefined;
    transformer: (input: string) => string;
    themeColorCode?: undefined;
    source?: undefined;
    separator?: undefined;
    initialCheckedValue?: undefined;
    validate?: undefined;
    when?: undefined;
    filter?: undefined;
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string | boolean | undefined;
    default: boolean;
    when: () => boolean;
    themeColorCode?: undefined;
    source?: undefined;
    separator?: undefined;
    initialCheckedValue?: undefined;
    validate?: undefined;
    completeValue?: undefined;
    transformer?: undefined;
    filter?: undefined;
} | {
    type: string;
    name: string;
    message: string | undefined;
    completeValue: string | undefined;
    when: (answers: Answers) => string | boolean;
    transformer: (input: string) => string;
    themeColorCode?: undefined;
    source?: undefined;
    separator?: undefined;
    initialCheckedValue?: undefined;
    validate?: undefined;
    filter?: undefined;
    default?: undefined;
} | {
    type: string;
    name: string;
    message: string | undefined;
    themeColorCode: string | undefined;
    source: (_: Answers, input: string) => FilterArrayItemType[];
    when: () => boolean;
    separator?: undefined;
    initialCheckedValue?: undefined;
    validate?: undefined;
    completeValue?: undefined;
    transformer?: undefined;
    filter?: undefined;
    default?: undefined;
})[];
type GenerateQuestionsType = typeof generateQuestions;
type QuestionsType = ReturnType<GenerateQuestionsType>;

/**
 * @description fork by "@commitlint/types" v16.2.1
 */
/** ========== rules ========== */
/**
 * Rules match the input either as successful or failed.
 * For example, when `header-full-stop` detects a full stop and is set as "always"; it's true.
 * If the `header-full-stop` discovers a full stop but is set to "never"; it's false.
 */
type RuleOutcome = Readonly<[boolean, string?]>;
/**
 * Rules receive a parsed commit, condition, and possible additional settings through value.
 * All rules should provide the most sensible rule condition and value.
 */
type RuleType = 'async' | 'sync' | 'either';
type BaseRule<Value = never, Type extends RuleType = 'either'> = (parsed: Commit, when?: RuleConfigCondition, value?: Value) => Type extends 'either' ? RuleOutcome | Promise<RuleOutcome> : Type extends 'async' ? Promise<RuleOutcome> : Type extends 'sync' ? RuleOutcome : never;
type Rule<Value = never> = BaseRule<Value, 'either'>;
type AsyncRule<Value = never> = BaseRule<Value, 'async'>;
type SyncRule<Value = never> = BaseRule<Value, 'sync'>;
/**
 * Rules always have a severity.
 * Severity indicates what to do if the rule is found to be broken
 * 0 - Disable this rule
 * 1 - Warn for violations
 * 2 - Error for violations
 */
declare enum RuleConfigSeverity {
    Disabled = 0,
    Warning = 1,
    Error = 2
}
/**
 * Rules always have a condition.
 * It can be either "always" (as tested), or "never" (as tested).
 * For example, `header-full-stop` can be enforced as "always" or "never".
 */
type RuleConfigCondition = 'always' | 'never';
type RuleConfigTuple<T> = T extends void ? Readonly<[RuleConfigSeverity.Disabled]> | Readonly<[RuleConfigSeverity, RuleConfigCondition]> : Readonly<[RuleConfigSeverity.Disabled]> | Readonly<[RuleConfigSeverity, RuleConfigCondition, T]>;
declare enum RuleConfigQuality {
    User = 0,
    Qualified = 1
}
type QualifiedRuleConfig<T> = (() => RuleConfigTuple<T>) | (() => Promise<RuleConfigTuple<T>>) | RuleConfigTuple<T>;
type RuleConfig<V = RuleConfigQuality.Qualified, T = void> = V extends RuleConfigQuality.Qualified ? RuleConfigTuple<T> : QualifiedRuleConfig<T>;
type CaseRuleConfig<V = RuleConfigQuality.User> = RuleConfig<V, TargetCaseType | TargetCaseType[]>;
type LengthRuleConfig<V = RuleConfigQuality.User> = RuleConfig<V, number>;
type EnumRuleConfig<V = RuleConfigQuality.User> = RuleConfig<V, string[]>;
interface RulesConfig<V = RuleConfigQuality.User> {
    'body-case': CaseRuleConfig<V>;
    'body-empty': RuleConfig<V>;
    'body-full-stop': RuleConfig<V, string>;
    'body-leading-blank': RuleConfig<V>;
    'body-max-length': LengthRuleConfig<V>;
    'body-max-line-length': LengthRuleConfig<V>;
    'body-min-length': LengthRuleConfig<V>;
    'footer-empty': RuleConfig<V>;
    'footer-leading-blank': RuleConfig<V>;
    'footer-max-length': LengthRuleConfig<V>;
    'footer-max-line-length': LengthRuleConfig<V>;
    'footer-min-length': LengthRuleConfig<V>;
    'header-case': CaseRuleConfig<V>;
    'header-full-stop': RuleConfig<V, string>;
    'header-max-length': LengthRuleConfig<V>;
    'header-min-length': LengthRuleConfig<V>;
    'references-empty': RuleConfig<V>;
    'scope-case': CaseRuleConfig<V>;
    'scope-empty': RuleConfig<V>;
    'scope-enum': EnumRuleConfig<V>;
    'scope-max-length': LengthRuleConfig<V>;
    'scope-min-length': LengthRuleConfig<V>;
    'signed-off-by': RuleConfig<V, string>;
    'subject-case': CaseRuleConfig<V>;
    'subject-empty': RuleConfig<V>;
    'subject-full-stop': RuleConfig<V, string>;
    'subject-max-length': LengthRuleConfig<V>;
    'subject-min-length': LengthRuleConfig<V>;
    'trailer-exists': RuleConfig<V, string>;
    'type-case': CaseRuleConfig<V>;
    'type-empty': RuleConfig<V>;
    'type-enum': EnumRuleConfig<V>;
    'type-max-length': LengthRuleConfig<V>;
    'type-min-length': LengthRuleConfig<V>;
    [key: string]: AnyRuleConfig<V>;
}
type AnyRuleConfig<V> = RuleConfig<V, unknown> | RuleConfig<V, void>;
/** ========== load ========== */
type PluginRecords = Record<string, Plugin>;
interface Plugin {
    rules: {
        [ruleName: string]: Rule | AsyncRule | SyncRule;
    };
}
interface LoadOptions {
    cwd?: string;
    file?: string;
}
interface CommitlintUserConfig {
    extends?: string | string[];
    formatter?: string;
    rules?: Partial<RulesConfig>;
    parserPreset?: string | ParserPreset | Promise<ParserPreset>;
    ignores?: ((commit: string) => boolean)[];
    defaultIgnores?: boolean;
    plugins?: (string | Plugin)[];
    helpUrl?: string;
    [key: string]: unknown;
}
type QualifiedRules = Partial<RulesConfig<RuleConfigQuality.Qualified>>;
interface QualifiedConfig {
    extends: string[];
    formatter: string;
    rules: QualifiedRules;
    parserPreset?: ParserPreset;
    ignores?: ((commit: string) => boolean)[];
    defaultIgnores?: boolean;
    plugins: PluginRecords;
    helpUrl: string;
}
interface ParserPreset {
    name?: string;
    path?: string;
    parserOpts?: unknown;
}
/** ========== parse ========== */
interface Commit {
    raw: string;
    header: string;
    type: string | null;
    scope: string | null;
    subject: string | null;
    body: string | null;
    footer: string | null;
    mentions: string[];
    notes: CommitNote[];
    references: CommitReference[];
    revert: any;
    merge: any;
}
interface CommitNote {
    title: string;
    text: string;
}
interface CommitReference {
    raw: string;
    prefix: string;
    action: string | null;
    owner: string | null;
    repository: string | null;
    issue: string | null;
}
/** ========== ensure ========== */
type TargetCaseType = 'camel-case' | 'kebab-case' | 'snake-case' | 'pascal-case' | 'start-case' | 'upper-case' | 'uppercase' | 'sentence-case' | 'sentencecase' | 'lower-case' | 'lowercase' | 'lowerCase';

/**
 * @description cz-git types
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

/** cz-git + commitlint configure */
interface UserConfig extends CommitlintUserConfig {
    /** cz-git configure */
    prompt?: CommitizenGitOptions;
}
type Config = Omit<Partial<typeof defaultConfig>, 'scopes'> & {
    scopes: ScopesType;
    disableScopeLowerCase?: boolean;
    disableSubjectLowerCase?: boolean;
    maxHeaderLength?: number;
    maxSubjectLength?: number;
    minSubjectLength?: number;
    defaultScope?: string | string[];
    defaultSubject?: string;
    defaultBody?: string;
    defaultFooterPrefix?: string;
    defaultIssues?: string;
};
interface Answers {
    /**
     * @default "Select the type of change that you're committing:"
     */
    type?: string;
    /**
     * @default 'Denote the SCOPE of this change (optional):'
     */
    scope?: string | string[];
    /**
     * @default 'Denote the SCOPE of this change:'
     */
    customScope?: string;
    /**
     * @default 'Write a SHORT, IMPERATIVE tense description of the change:\n'
     */
    subject?: string;
    /**
     * @default 'a LONGER description of the change (optional). Use "|" to break new line:\n'
     */
    body?: string;
    /**
     * @default 'Is any BREAKING CHANGE (add "!" in header) (optional) ?'
     * @use need turn on options "markBreakingChangeMode"
     */
    markBreaking?: string | boolean;
    /**
     * @default 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n'
     */
    breaking?: string;
    /** @deprecated Please use `footerPrefixesSelect` field instead. @note fix typo option field v1.4.0: Already processed for normal compatibility */
    footerPrefixsSelect?: string;
    /**
     * @default 'Select the ISSUES type of change (optional):'
     */
    footerPrefixesSelect?: string;
    /** @deprecated Please use `customFooterPrefix` field instead. @note fix typo option field v1.4.0: Already processed for normal compatibility */
    customFooterPrefixs?: string;
    /**
     * @default 'Input ISSUES prefix:'
     */
    customFooterPrefix?: string;
    /**
     * @default 'List any ISSUES AFFECTED by this change. E.g.: #31, #34:'
     */
    footer?: string;
    /**
     * @default 'Are you sure you want to proceed with the commit above?'
     */
    confirmCommit?: string;
    /**
     * @default 'Generating your AI commit subject...'
     */
    generatingByAI?: string;
    /**
     * @default 'Select suitable subject by AI generated:'
     */
    generatedSelectByAI?: string;
    footerPrefix?: string;
}
type ScopesType = string[] | Array<{
    name: string;
    value?: string;
}>;
interface CommitizenType {
    registerPrompt: (type: string, plugin: unknown) => void;
    prompt: (qs: QuestionsType) => Promise<Answers>;
}
interface Option {
    /**
     * show terminal prompt name
     */
    name: string;
    /**
     * output real value
     */
    value: string;
}
interface TypesOption extends Option {
    /**
     * Submit emoji commit string
     *
     * @see https://gitmoji.dev/
     * @example ":bug:" => 🐛
     */
    emoji?: string;
}
/**
 * provide subdivides each message part
 */
interface CommitMessageOptions {
    /**
     * choose type list value
     *
     * @example: 'feat'
     */
    type: string;
    /**
     * choose or custom scope value
     *
     * @example: 'app'
     */
    scope: string;
    /**
     * choose type list emoji code. need turn on `useEmoji` options
     *
     * @example: ':sparkles:'
     */
    emoji: string;
    /**
     * express is a breaking change message
     *
     * @example `!`
     */
    markBreaking: string;
    /**
     * input subject
     */
    subject: string;
    /**
     * base Angular format default header
     *
     * @example `feat(app): add a feature`
     */
    defaultHeader: string;
    body: string;
    breaking: string;
    footer: string;
    /**
     * base Angular format default all message
     */
    defaultMessage: string;
}
interface GenerateAIPromptType {
    type?: string;
    defaultScope?: string | string[];
    maxSubjectLength?: number;
    upperCaseSubject?: boolean | null;
    diff?: string;
}
/** cz-git configure */
interface CommitizenGitOptions {
    /**
     * define commonly used commit message alias
     *
     * @default { fd: "docs: fix typos" }
     * @use commitizen CLI: "cz_alias=fd cz"
     * @use czg CLI: "czg --alias=fd" | "czg :fd"
     * @note use commitizen CLI will meet process not exit. cz-git can't resolve it.
     */
    alias?: Record<string, string>;
    /**
     * Customize prompt questions
     */
    messages?: Answers;
    /**
     * the prompt inquirer primary color
     *
     * @rule `38;5;${color_code}`
     * @tip the color_code can get by https://github.com/sindresorhus/xterm-colors
     * @example "38;5;043"
     * @default '' //cyan color
     */
    themeColorCode?: string;
    /**
     * Customize prompt type
     */
    types?: TypesOption[];
    /**
     * Add extra types to default types
     *
     * @use Use when you don't want to add bloated defaults and don't want to adjust the default order in configuration
     * @example `typesAppend: [ { value: "workflow", name: "workflow:  Workflow changes"} ],`
     * @default []
     */
    typesAppend?: TypesOption[];
    /**
     * Default types list fuzzy search types `value` key of list.
     * If choose `false` will search `name` key of list.
     *
     * @use Using emoji unicode as `value` and that can't be searched
     * @default true
     */
    typesSearchValue?: boolean;
    /** @deprecated Please use `typesSearchValue` field instead. */
    typesSearchValueKey?: boolean;
    /**
     * Use OpenAI to auto generate short description for commit message
     *
     * @default false
     */
    useAI?: boolean;
    /**
     * Choose the AI model you want to use
     *
     * @see https://platform.openai.com/docs/models/model-endpoint-compatibility => /v1/chat/completions
     * @example "gpt-3.5-turbo" | "gpt-4" | "gpt-4o" | "gpt-4o-mini"
     * @default "gpt-4o-mini"
     */
    aiModel?: string;
    /**
     * If >1 will turn on select mode, select generate options like returned by OpenAI
     *
     * @default 1
     */
    aiNumber?: number;
    /**
     * To ignore selection codes when sending AI API requests
     *
     * @default [ "package-lock.json", "yarn.lock", "pnpm-lock.yaml" ]
     * @example [ "pnpm-lock.yaml", "docs/public" ]
     */
    aiDiffIgnore?: string[];
    /**
     * Save on "$HOME/.config/.czrc" or "$HOME/.czrc". Do not save on project.
     * `npx czg --api-key=sk-xxxxx`
     */
    openAIToken?: string;
    /**
     * `npx czg --api-model=<model>` - to setup the AI model in local
     *
     * @note If the global or project has an `aiModel` field, set by --api-model=<value> will be overridden.
     * @default "gpt-4o-mini"
     */
    apiModel?: string;
    /**
     * It is recommended to use the command to configure the local
     * `npx czg --api-proxy=<http_proxy>`
     *
     * @example `npx czg --api-proxy="http://127.0.0.1:1080"` or `npx czg --api-proxy="socks5://127.0.0.1:1080"`
     */
    apiProxy?: string;
    /**
     * `npx czg --api-endpoint=<url>`
     *
     * @default "https://api.openai.com/v1"
     */
    apiEndpoint?: string;
    /**
     * Use the callback fn can customize edit information AI question information
     *
     * @param aiParam provide some known parameters
     * @default generateSubjectDefaultPrompt
     */
    aiQuestionCB?: (aiParam: GenerateAIPromptType) => string;
    /**
     * Use emoji ？It will be use typesOption.emoji code
     *
     * @default false
     */
    useEmoji?: boolean;
    /**
     * Set the location of emoji in header
     *
     * @default "center"
     */
    emojiAlign?: 'left' | 'center' | 'right';
    /**
     * Provides a select of prompt to select module scopes
     *
     * @commitlint it auto import value from rule "scope-enum"
     */
    scopes?: ScopesType;
    /**
     * Default scope list fuzzy search types `name` key of list.
     * If choose `true` will search `value` key of list.
     *
     * @use If have long description of scope. can use it to enhanced search.
     * @default false
     */
    scopesSearchValue?: boolean;
    /**
     * Provides an overriding select of prompt to select module scopes under specific type
     *
     * @note use this option should set `scopes` option to realize distinguish
     * @example { "test": ["e2eTest", "unitTest"] }
     */
    scopeOverrides?: {
        [type: string]: ScopesType;
    };
    /**
     * Filter select of prompt to select module scopes by the scope.value
     *
     * @default ['.DS_Store']
     */
    scopeFilters?: string[];
    /**
     * Whether to enable scope multiple mode
     *
     * @default false
     */
    enableMultipleScopes?: boolean;
    /**
     * Multiple choice scope separator
     *
     * @default ","
     */
    scopeEnumSeparator?: string;
    /**
     * Whether to show "custom" when selecting scopes
     *
     * @note it auto check rule "scope-enum" set the option with `@commitlint`
     * @use when you not use commitlint
     * @default true
     */
    allowCustomScopes?: boolean;
    /**
     * Whether to show "empty" when selecting scopes
     *
     * @default true
     */
    allowEmptyScopes?: boolean;
    /**
     * Set the location of empty option (empty) and custom option (custom) in selection range
     *
     * @default "bottom"
     */
    customScopesAlign?: 'top' | 'bottom' | 'top-bottom' | 'bottom-top';
    /**
     * @default "custom"
     */
    customScopesAlias?: string;
    /**
     * @default "empty"
     */
    emptyScopesAlias?: string;
    /**
     * Subject is need upper case first.
     *
     * - `null`: Do not process
     * - `true`: Automatically capitalize the first letter
     * - `false`: Automatically lowercase the first letter
     * @default null
     */
    upperCaseSubject?: boolean | null;
    /**
     * Whether to add extra prompt BREAKCHANGE ask. to add an extra "!" to the header
     *
     * @see: https://cz-git.qbb.sh/recipes/breakingchange
     * @default false
     */
    markBreakingChangeMode?: boolean;
    /**
     * Allow breaking changes in the included types output box
     *
     * @default ['feat', 'fix']
     */
    allowBreakingChanges?: string[];
    /**
     * set body and BREAKING CHANGE max length to break-line
     *
     * @default 100
     * @commitlint it auto check rule "body-max-line-length".
     */
    breaklineNumber?: number;
    /**
     * body and BREAKINGCHANGES new line char
     *
     * @default "|"
     */
    breaklineChar?: string;
    /**
     * @deprecated Please use `issuePrefixes` field instead.
     * @note fix typo option field v1.3.4: Already processed for normal compatibility
     */
    issuePrefixs?: Option[];
    /**
     * Provides a select issue prefix box in footer
     *
     * @default issuePrefixes: [{ value: "closed", name: "ISSUES has been processed" }]
     */
    issuePrefixes?: Option[];
    /**
     * @deprecated Please use `customIssuePrefixAlign` field instead.
     * @note fix typo option field v1.3.4: Already processed for normal compatibility
     */
    customIssuePrefixsAlign?: 'top' | 'bottom' | 'top-bottom' | 'bottom-top';
    /**
     * @default "top"
     */
    customIssuePrefixAlign?: 'top' | 'bottom' | 'top-bottom' | 'bottom-top';
    /**
     * @deprecated Please use `emptyIssuePrefixAlias` field instead.
     * @note fix typo option field v1.3.4: Already processed for normal compatibility
     */
    emptyIssuePrefixsAlias?: string;
    /**
     * @default "skip"
     */
    emptyIssuePrefixAlias?: string;
    /**
     * @deprecated Please use `customIssuePrefixAlias` field instead.
     * @note fix typo option field v1.3.4: Already processed for normal compatibility
     */
    customIssuePrefixsAlias?: string;
    /**
     * @default "custom"
     */
    customIssuePrefixAlias?: string;
    /**
     * @deprecated Please use `allowCustomIssuePrefix` field instead.
     * @note fix typo option field v1.3.4: Already processed for normal compatibility
     */
    allowCustomIssuePrefixs?: boolean;
    /**
     * Whether to show "custom" selecting issue prefixes
     *
     * @default true
     */
    allowCustomIssuePrefix?: boolean;
    /**
     * @deprecated Please use `allowEmptyIssuePrefix` field instead.
     * @note fix typo option field v1.3.4: Already processed for normal compatibility
     */
    allowEmptyIssuePrefixs?: boolean;
    /**
     * Whether to show "skip(empty)" when selecting issue prefixes
     *
     * @default true
     */
    allowEmptyIssuePrefix?: boolean;
    /**
     * Prompt final determination whether to display the color
     *
     * @default true
     */
    confirmColorize?: boolean;
    /**
     * List of questions you want to skip
     *
     * @default []
     * @example ['body']
     */
    skipQuestions?: Array<'scope' | 'body' | 'breaking' | 'footerPrefix' | 'footer' | 'confirmCommit'>;
    /**
     * Force set max header length | Equivalent setting maxSubjectLength.
     *
     * @commitlint it auto check rule and use value from "header-max-length".
     * @use when you not use commitlint
     */
    maxHeaderLength?: number;
    /**
     * Force set max subject length.
     *
     * @commitlint it auto check rule and use value from "subject-max-length".
     * @use when you not use commitlint
     */
    maxSubjectLength?: number;
    /**
     * Is not strict subject rule. Just provide prompt word length warning.
     * Effected maxHeader and maxSubject commitlint.
     *
     * @example [1, 'always', 80] 1: mean warning. will be true
     * @default false
     */
    isIgnoreCheckMaxSubjectLength?: boolean;
    /**
     * Force set header width.
     *
     * @commitlint it auto check rule and use value from "subject-min-length".
     * @use when you not use commitlint
     */
    minSubjectLength?: number;
    /**
     * pin type item the top of the types list (match item value)
     */
    defaultType?: string | undefined;
    /**
     * Whether to use display default value in custom scope
     *
     * @tip
     * 1. pin scope item the top of the scope list (match item value)
     * 2. `string[]` for checkbox mode will default-select the options whose values match those within the `scopes` range list.
     * @usage When you want to use default, just keyboard `Enter` it
     */
    defaultScope?: string | string[] | undefined;
    /**
     * default value show subject template prompt
     *
     * @usage If you want to use template complete. just keyboard `Tab` or `Right Arrow` it
     * @usage If you want to use default, just keyboard `Enter` it
     */
    defaultSubject?: string | undefined;
    /**
     * default value show body and BREAKINGCHANGES template prompt
     *
     * @usage If you want to use template complete. just keyboard `Tab` or `Right Arrow` it
     * @usage When you want to use default, just keyboard `Enter` it
     */
    defaultBody?: string | undefined;
    /**
     * default value show issuePrefixes custom template prompt
     *
     * @usage If you want to use template complete. just keyboard `Tab` or `Right Arrow` it
     * @usage When you want to use default, just keyboard `Enter` it
     */
    defaultFooterPrefix?: string | undefined;
    /**
     * default value show issue foot template prompt
     *
     * @usage If you want to use template complete. just keyboard `Tab` or `Right Arrow` it
     * @usage When you want to use default, just keyboard `Enter` it
     */
    defaultIssues?: string | undefined;
    /**
     * Whether to use GPG sign commit message (git commit -S -m)
     * @note the options only support `czg` cz-git cli and no support git hooks mode
     * @see https://github.com/Zhengqbbb/cz-git/issues/58
     * @default false
     */
    useCommitSignGPG?: boolean;
    /**
     * provide user custom finally message, can use the callback to change format
     *
     * @param messageMod provide subdivides each message part
     * @default ({ defaultMessage }) => defaultMessage
     */
    formatMessageCB?: (messageMod: CommitMessageOptions) => string;
}
declare const defaultConfig: Readonly<CommitizenGitOptions>;
/**
 * Used for `commitlint` configure file: `commitlint.config.*` or `.commitlintrc.*`
 */
declare const defineConfig: (config: UserConfig) => UserConfig;
/**
 * Used for `cz-git` configure file: `cz.config.*` or `package.json`.config.commitizen.czConfig
 *
 * Used for `czg --config="xxx.js"`
 */
declare const definePrompt: (config: UserConfig["prompt"]) => CommitizenGitOptions | undefined;

interface CommitlintOptions {
    rules?: Partial<RulesConfig$1>;
    prompt?: any;
}
interface LoaderOptions {
    moduleName: string;
    cwd?: string;
    stopDir?: string;
    explicitPath?: string;
    searchPlaces?: string[];
    packageProp?: string[];
}
declare function loader(options: LoaderOptions): Promise<{
    config: cosmiconfig_dist_types.Config;
    filepath: string;
    isEmpty?: boolean;
} | null>;
declare function clLoader(cwd?: string): Promise<CommitlintOptions>;
declare function czLoader(cwd?: string): Promise<any>;
declare function aiLoader(): Promise<{
    openAIToken: any;
    apiEndpoint: any;
    apiProxy: any;
    apiModel: any;
}>;
interface UserOptions {
    /** Debug mode path */
    cwd?: string;
    /** Directly specify the configuration path */
    configPath?: string;
}
/**
 * Entry Fn: Loading both commitizen and commitlint configurations
 */
declare function configLoader(options?: UserOptions): Promise<{
    prompt: any;
    rules?: Partial<RulesConfig$1>;
}>;

/**
 * @description customizable and git support commitizen adapter
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

declare function prompter(cz: CommitizenType, commit: (message: string) => void, configPath?: string): void;

export { type Answers, type AnyRuleConfig, type AsyncRule, type BaseOptionType, type BaseRule, type CaseRuleConfig, type ChoiceType, type ChoicesType, type Commit, type CommitMessageOptions, type CommitNote, type CommitReference, type CommitizenGitOptions, type CommitizenType, type CommitlintUserConfig, CompleteInput, type CompletePromptQuestionOptions, type Config, type EnumRuleConfig, type FilterArrayItemType, type GenerateAIPromptType, type LengthRuleConfig, type LoadOptions, type LoaderOptions, type Option, type ParserPreset, type Plugin, type PluginRecords, type QualifiedConfig, type QualifiedRuleConfig, type QualifiedRules, type Rule, type RuleConfig, type RuleConfigCondition, RuleConfigQuality, RuleConfigSeverity, type RuleConfigTuple, type RuleOutcome, type RuleType, type RulesConfig, type ScopesType, SearchCheckbox, SearchList, type SearchPromptQuestionOptions, type SyncRule, type TargetCaseType, type TypesOption, type UserConfig, type UserOptions, aiLoader, ansiEscapes, clLoader, configLoader, createStyle, czLoader, defaultConfig, defineConfig, definePrompt, figures, fuzzyFilter, fuzzyMatch, isColorizenSupport, isUnicodeSupport, loader, prompter, style };
