import { extractScope } from '../grammarNormalizer.js';
import { segmentMatch } from '../matchResult.js';
import { isDefined } from '../util.js';
/**
 * Apply the scopes to the line
 * @param line - line of text
 * @param matchRuleResult - the matching rule
 */
export function applyCaptureToBeginOrMatch(matchRuleResult) {
    const { match, rule } = matchRuleResult;
    const bePattern = rule.pattern;
    const captures = bePattern.beginCaptures ?? bePattern.captures;
    return applyCaptures(rule, match, captures);
}
/**
 * Apply the scopes to the line
 * @param line - line of text
 * @param rule - the matching rule
 */
export function applyCaptureToEnd(rule, match) {
    const { pattern } = rule;
    const bePattern = pattern;
    const captures = bePattern.endCaptures ?? bePattern.captures;
    return applyCaptures(rule, match, captures);
}
/**
 * Apply the scopes to the line
 * @param line - line of text
 * @param rule - the matching rule
 */
export function applyCaptures(rule, match, captures) {
    const scope = extractScope(rule, false);
    const pool = rule.grammar.scopePool;
    const text = match.match;
    const input = match.input;
    const range = [match.index, match.index + text.length, match.lineNumber];
    // Do not emit empty captures.
    if (!text && !captures)
        return [];
    if (!captures) {
        const tokenized = {
            scope,
            text,
            range,
        };
        return [tokenized];
    }
    const captureScopes = new Map(Object.entries(captures));
    const cap0 = captureScopes.get('0');
    // Handle the simple case.
    if (captureScopes.size === 1 && cap0) {
        const tokenized = {
            scope: rule.grammar.scopePool.getScope(cap0, scope),
            text,
            range,
        };
        return [tokenized];
    }
    const min = match.index;
    const max = match.index + text.length;
    function trimSegment(seg) {
        const { index, match } = seg;
        const right = match.length;
        if (index >= min && right <= max)
            return seg;
        if (index >= max || right < min)
            return undefined;
        const a = Math.max(index, min) - index;
        const b = Math.min(right, max) - index;
        const text = match.slice(a, b);
        return {
            ...seg,
            index: index + a,
            match: text,
        };
    }
    const segments = segmentMatch(match).map(trimSegment).filter(isDefined);
    function processSegments(segments) {
        const base = segments[0];
        const root = {
            a: base.index,
            b: base.index + base.match.length,
            s: { seg: base },
        };
        let m;
        for (let i = 1; i < segments.length; ++i) {
            const seg = segments[i];
            const index = seg.index;
            const end = index + seg.match.length;
            m = m && m.a <= index ? m : root;
            while (m && m.b <= index) {
                m = m.n;
            }
            while (m && m.a < end) {
                if (m.a < index) {
                    const n = { ...m, a: index };
                    m.n = n;
                    m.b = index;
                    m = n;
                }
                if (m.b > end) {
                    const n = { ...m, a: end };
                    m.b = end;
                    m.n = n;
                }
                m.s = { seg, next: m.s };
                m = m.n;
            }
        }
        return root;
    }
    function segChainToScope(chain) {
        function* _chain(chain) {
            while (chain) {
                const seg = chain.seg;
                if (seg.groupName) {
                    if (Array.isArray(seg.groupName)) {
                        yield* seg.groupName;
                    }
                    else {
                        yield seg.groupName;
                    }
                }
                yield seg.groupNum.toString();
                chain = chain.next;
            }
        }
        const scopeValues = [..._chain(chain)]
            .map((cap) => captureScopes.get(cap))
            .filter(isDefined)
            .reverse();
        return scopeValues.reduce((s, v) => pool.getScope(v, s), scope);
    }
    const merged = processSegments(segments);
    function* emit(m) {
        while (m) {
            const t = {
                text: input.slice(m.a, m.b),
                range: [m.a, m.b, match.lineNumber],
                scope: segChainToScope(m.s),
            };
            yield t;
            m = m.n;
        }
    }
    const parsedText = [...emit(merged)];
    return parsedText;
}
//# sourceMappingURL=procMatchingRule.js.map