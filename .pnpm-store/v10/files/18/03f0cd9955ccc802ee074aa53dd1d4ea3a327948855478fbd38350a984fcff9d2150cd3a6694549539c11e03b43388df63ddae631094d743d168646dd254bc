const functionRule = async (parsed, when = 'always', functionRule) => {
    if (functionRule === undefined) {
        return [true];
    }
    if (typeof functionRule !== 'function') {
        throw new TypeError('Not a valid function!');
    }
    return functionRule(parsed, when);
};
export { functionRule };
//# sourceMappingURL=function-rule.js.map