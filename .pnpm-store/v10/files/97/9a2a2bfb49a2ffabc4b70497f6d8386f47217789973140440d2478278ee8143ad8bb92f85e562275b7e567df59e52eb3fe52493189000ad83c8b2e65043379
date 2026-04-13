import { isPatternBeginEnd, isPatternInclude, isPatternMatch, isPatternPatterns } from './grammarTypesHelpers.js';
import { createMatchResult, createSimpleMatchResult } from './matchResult.js';
import { ScopePool } from './scope.js';
export function normalizeGrammar(grammar) {
    return new ImplNGrammar(grammar);
}
const SpecialRepositoryReferences = {
    $self: true,
    $base: true,
};
export function nPattern(p) {
    if (isPatternMatch(p))
        return normalizePatternMatch(p);
    if (isPatternBeginEnd(p))
        return normalizePatternBeginEnd(p);
    if (isPatternInclude(p))
        return normalizePatternInclude(p);
    if (isPatternPatterns(p))
        return normalizePatternsPatterns(p);
    return normalizePatternName(p);
}
function normalizePatternMatch(p) {
    const regExec = makeTestMatchFn(p.match);
    const self = {
        ...p,
        captures: normalizeCapture(p.captures),
        findMatch,
    };
    function findMatch(line, parentRule) {
        const match = regExec(line);
        if (!match)
            return undefined;
        const rule = factoryRule(parentRule, self);
        return { rule, match, line };
    }
    return self;
}
function normalizePatternBeginEnd(p) {
    const patterns = normalizePatterns(p.patterns);
    const self = {
        ...p,
        captures: normalizeCapture(p.captures),
        beginCaptures: normalizeCapture(p.beginCaptures),
        endCaptures: normalizeCapture(p.endCaptures),
        patterns,
        findMatch,
    };
    function findMatch(line, parentRule) {
        const match = testBegin(line);
        if (!match)
            return undefined;
        const rule = factoryRule(parentRule, self, findNext, end);
        return { rule, match, line };
    }
    const testBegin = makeTestMatchFn(p.begin);
    const testEnd = p.end !== undefined ? makeTestMatchFn(p.end) : () => undefined;
    function findNext(line) {
        return patterns && findInPatterns(patterns, line, this);
    }
    function end(line) {
        return testEnd(line);
    }
    return self;
}
function normalizePatternName(p) {
    const patterns = undefined;
    const self = {
        ...p,
        patterns,
        findMatch,
    };
    function findMatch(line, parentRule) {
        const rule = factoryRule(parentRule, self);
        const input = line.text.slice(line.offset);
        const match = createSimpleMatchResult(input, input, line.offset, line.lineNumber);
        return { rule, match, line };
    }
    return self;
}
function normalizePatternInclude(p) {
    const { include } = p;
    return include.startsWith('#') || include in SpecialRepositoryReferences
        ? normalizePatternIncludeRef(p)
        : normalizePatternIncludeExt(p);
}
function normalizePatternIncludeRef(p) {
    const { include, ...rest } = p;
    const reference = include.startsWith('#') ? include.slice(1) : include;
    const self = {
        ...rest,
        reference,
        findMatch,
    };
    function findMatch(line, parentRule) {
        const pat = parentRule.repository[reference];
        if (pat === undefined)
            throw new Error(`Unknown Include Reference ${include}`);
        return pat.findMatch(line, parentRule);
    }
    return self;
}
function normalizePatternIncludeExt(p) {
    function findMatch(_line) {
        return undefined;
    }
    const self = {
        ...p,
        findMatch,
    };
    return self;
}
function normalizePatternsPatterns(p) {
    return new ImplNPatternPatterns(p);
}
function findInPatterns(patterns, line, rule) {
    let r = undefined;
    for (const pat of patterns) {
        if (pat.disabled)
            continue;
        const er = pat.findMatch(line, rule);
        if (er?.match !== undefined && !er.rule.pattern.disabled) {
            r = (r && r.match && r.match.index <= er.match.index && r) || er;
        }
    }
    return r;
}
function normalizePatterns(patterns) {
    if (!patterns)
        return undefined;
    return patterns.map((p) => (typeof p === 'string' ? { include: p } : p)).map(nPattern);
}
const emptyRepository = Object.freeze(Object.create(null));
function normalizePatternRepository(rep) {
    if (!rep)
        return emptyRepository;
    return normalizeRepository(rep);
}
function normalizeRepository(rep) {
    const repository = Object.create(null);
    for (const [key, pat] of Object.entries(rep)) {
        repository[key] = nPattern(pat);
    }
    return repository;
}
let ruleCounter = 0;
function factoryRuleBase(parent, pattern, repository, grammar, findNext, end) {
    const depth = parent ? parent.depth + 1 : 0;
    return {
        id: ruleCounter++,
        grammar,
        pattern,
        parent,
        repository,
        depth,
        findNext,
        end,
    };
}
function factoryRule(parent, pattern, findNext, end) {
    return factoryRuleBase(parent, pattern, parent.repository, parent.grammar, findNext, end);
}
function normalizeCapture(cap) {
    if (cap === undefined)
        return undefined;
    if (typeof cap === 'string')
        return { [0]: cap };
    const capture = Object.create(null);
    for (const [key, pat] of Object.entries(cap)) {
        capture[key] = typeof pat === 'string' ? pat : normalizePatternName(pat).name;
    }
    return capture;
}
function makeTestMatchFn(reg) {
    if (typeof reg === 'string')
        return matchString(reg);
    return matchRegExp(reg);
}
function matchString(s) {
    return (line) => {
        const input = line.text;
        const index = input.indexOf(s, line.offset);
        if (index < 0)
            return undefined;
        return createSimpleMatchResult(s, input, index, line.lineNumber);
    };
}
function matchRegExp(r) {
    return (line) => {
        const rg = RegExp(r, 'gm');
        rg.lastIndex = line.offset;
        const m = rg.exec(line.text);
        return (m && createMatchResult(m, line.lineNumber)) ?? undefined;
    };
}
export function extractScope(er, isContent = true) {
    const scope = [];
    for (let rule = er; rule; rule = rule.parent) {
        const pattern = rule.pattern;
        const { name, contentName } = pattern;
        if (contentName && isContent) {
            scope.push(contentName);
        }
        if (name !== undefined) {
            scope.push(name);
        }
        isContent = true;
    }
    return er.grammar.scopePool.parseScope(scope);
}
class ImplNGrammar {
    scopeName;
    name;
    comment;
    disabled;
    patterns;
    repository;
    grammarName;
    self;
    scopePool;
    constructor(grammar) {
        this.scopeName = grammar.scopeName;
        this.name = grammar.scopeName;
        this.comment = grammar.comment;
        this.disabled = grammar.disabled;
        this.grammarName = grammar.name;
        const self = nPattern({
            patterns: [{ patterns: grammar.patterns }],
        });
        const repository = normalizePatternRepository(grammar.repository);
        this.patterns = self.patterns;
        this.repository = repository;
        this.self = self;
        this.scopePool = new ScopePool();
    }
    begin(parentRule) {
        const patterns = this.patterns;
        function grammarToRule(grammar, baseGrammar, parent) {
            const repository = Object.create(null);
            Object.assign(repository, grammar.repository);
            repository['$self'] = grammar.self;
            repository['$base'] = repository['$base'] || baseGrammar.self;
            function findNext(line) {
                return findInPatterns(patterns, line, this);
            }
            function end(_line) {
                return undefined;
            }
            return factoryRuleBase(parent, grammar, repository, grammar, findNext, end);
        }
        return grammarToRule(this, parentRule?.grammar ?? this, parentRule);
    }
}
class ImplNPatternPatterns {
    name;
    comment;
    disabled;
    patterns;
    constructor(p) {
        const { name, comment, disabled, ...rest } = p;
        this.patterns = normalizePatterns(rest.patterns);
        this.name = name;
        this.comment = comment;
        this.disabled = disabled;
    }
    findMatch(line, parentRule) {
        const patterns = this.patterns;
        const rule = factoryRule(parentRule, this, findNext);
        function findNext(line) {
            return findInPatterns(patterns, line, this);
        }
        return rule.findNext?.(line);
    }
}
//# sourceMappingURL=grammarNormalizer.js.map