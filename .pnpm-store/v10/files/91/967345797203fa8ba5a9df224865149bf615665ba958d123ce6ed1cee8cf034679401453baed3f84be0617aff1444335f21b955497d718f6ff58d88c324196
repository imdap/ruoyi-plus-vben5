import { strict as assert } from 'node:assert';
import { format } from 'node:util';
import { isPatternBeginEnd, isPatternInclude, isPatternMatch, isPatternPatterns } from './grammarTypesHelpers.js';
export function validate(grammar) {
    assert(grammar.scopeName);
    assert(/^[\w.]*\.\w+$/.test(grammar.scopeName));
    const scopeExt = '.' + grammar.scopeName.split('.').pop();
    const context = {
        grammar,
        scopeExt,
    };
    validatePatterns(grammar.patterns, context);
    validateGrammarRepository(grammar, context);
}
export function validatePatterns(patterns, context) {
    assert(Array.isArray(patterns));
    patterns.forEach((p) => validatePatternOrReference(p, context));
}
function validatePatternOrReference(pattern, context) {
    if (typeof pattern === 'string') {
        assert(/^\$self|\$base|#[\w-]+|[\w.]+$/.test(pattern));
    }
    else {
        validatePattern(pattern, context);
    }
}
export function validatePattern(pattern, context) {
    assert(isPatternMatch(pattern) ||
        isPatternBeginEnd(pattern) ||
        isPatternInclude(pattern) ||
        isPatternPatterns(pattern), format('Unknown Pattern: %o', pattern));
    assert(!(isPatternBeginEnd(pattern) && isPatternMatch(pattern)), format('Pattern must be a Match pattern or a Begin/End pattern, but not both: %o', pattern));
    validatePatternName(pattern, context);
}
export function validateGrammarRepository(p, context) {
    p.repository && validateRepository(p.repository, context);
}
export function validateRepository(r, context) {
    assert(typeof r === 'object');
    for (const [key, pat] of Object.entries(r)) {
        assert(/^[\w.-]+$/.test(key), 'Invalid Repository key, must be `a-zA-Z0-9`, `.`, `-`');
        validatePattern(pat, context);
    }
}
function validatePatternName(p, context) {
    assert(isValidPatternName(p.name), format('Invalid pattern name: %o', p));
    assert(p.name === undefined || p.name.endsWith(context.scopeExt), format('Pattern name ending must match grammar scope ending. Grammar scope: "%s"; Pattern: %o', context.grammar.scopeName, p));
}
function isValidPatternName(name) {
    if (name === undefined)
        return true;
    if (typeof name !== 'string')
        return false;
    return /^[-\w.]+$/.test(name);
}
//# sourceMappingURL=validateGrammar.js.map