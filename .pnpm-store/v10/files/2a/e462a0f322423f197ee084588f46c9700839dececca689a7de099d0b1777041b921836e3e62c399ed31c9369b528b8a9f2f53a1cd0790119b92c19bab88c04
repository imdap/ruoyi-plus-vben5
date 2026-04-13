export = DepsRegex;
/**
 * @typedef {Object} Options
 * @property {boolean} [matchInternal=true] a string property of SpecialType
 * @property {boolean} [matchES6=true] a string property of SpecialType
 * @property {boolean} [matchCoffeescript=true] a string property of SpecialType
 * @property {boolean} [matchGruntTask=true] a string property of SpecialType
 */
/**
 * Regular expression for matching require statements.
 *
 * @param {Options} options A string param.
 */
declare function DepsRegex(options: Options): void;
declare class DepsRegex {
    /**
     * @typedef {Object} Options
     * @property {boolean} [matchInternal=true] a string property of SpecialType
     * @property {boolean} [matchES6=true] a string property of SpecialType
     * @property {boolean} [matchCoffeescript=true] a string property of SpecialType
     * @property {boolean} [matchGruntTask=true] a string property of SpecialType
     */
    /**
     * Regular expression for matching require statements.
     *
     * @param {Options} options A string param.
     */
    constructor(options: Options);
    /** @private */
    private regex;
    /**
     * Executes a search on a string using the DepsRegex, and returns an array containing the results of that search.
     *
     * @param {string} string The String object or string literal on which to perform the search.
     */
    exec(string: string): RegExpExecArray;
    /**
     * Returns a Boolean value that indicates whether or not there is a require statement in a searched string.
     *
     * @param {string} string The String object or string literal on which to perform the search.
     */
    test(string: string): boolean;
    /**
     * Returns an array of strings containing the require statements in a searched string.
     *
     * @param {string} string The String object or string literal on which to perform the search.
     */
    getDependencies(string: string): string[];
}
declare namespace DepsRegex {
    export { Options };
}
type Options = {
    /**
     * a string property of SpecialType
     */
    matchInternal?: boolean;
    /**
     * a string property of SpecialType
     */
    matchES6?: boolean;
    /**
     * a string property of SpecialType
     */
    matchCoffeescript?: boolean;
    /**
     * a string property of SpecialType
     */
    matchGruntTask?: boolean;
};
