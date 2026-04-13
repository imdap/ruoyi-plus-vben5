import { escapeRegEx } from './regexHelper.js';
export function createMapper(repMap) {
    const filteredMap = repMap.filter(([match, _]) => !!match);
    if (!filteredMap.length) {
        return (a) => a;
    }
    const regExStr = filteredMap
        .map(([from, _]) => from)
        // make sure it compiles into a regex
        .map((s) => {
        try {
            // fix up any nested ()
            const r = /\(/.test(s) ? s.replaceAll(/\((?=.*\))/g, '(?:').replaceAll('(?:?', '(?') : s;
            new RegExp(r);
            s = r;
        }
        catch {
            return escapeRegEx(s);
        }
        return s;
    })
        .map((s) => `(${s})`)
        .join('|');
    const regEx = new RegExp(regExStr, 'g');
    const values = repMap.filter(([match, _]) => !!match).map(([_, into]) => into);
    function resolve(m, ...matches) {
        const index = matches.findIndex((a) => !!a);
        return 0 <= index && index < values.length ? values[index] : m;
    }
    return function (s) {
        return s.replace(regEx, resolve);
    };
}
//# sourceMappingURL=repMap.js.map