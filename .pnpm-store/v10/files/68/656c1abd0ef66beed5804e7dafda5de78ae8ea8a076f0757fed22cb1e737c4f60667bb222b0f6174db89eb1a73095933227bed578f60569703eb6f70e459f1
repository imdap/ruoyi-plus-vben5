/**
 * Comparison function to return the best (highest score) results first.
 * @param a Result A
 * @param b Result B
 */
export function compareResults(a, b) {
    return b.score - a.score || a.word.localeCompare(b.word);
}
export function wordToFeatures(word) {
    const map = new FeatureMap();
    mergeFeatures(map, wordToSingleLetterFeatures(word));
    mergeFeatures(map, wordToTwoLetterFeatures(word));
    return map;
}
export function mergeFeatures(map, features) {
    map.append(features);
}
export function wordToSingleLetterFeatures(word) {
    return [...word].map((a) => [a, 1]);
}
export function wordToTwoLetterFeatures(word) {
    return segmentString(word, 2).map((s) => [s, 1]);
}
export function segmentString(s, segLen) {
    const count = Math.max(0, s.length - segLen + 1);
    const result = [];
    for (let i = 0; i < count; ++i) {
        result[i] = s.slice(i, i + segLen);
    }
    return result;
}
export class FeatureMap extends Map {
    _count = 0;
    constructor() {
        super();
    }
    get count() {
        return this._count;
    }
    append(features) {
        features.forEach(([k, v]) => {
            this.set(k, (this.get(k) || 0) + v);
            this._count += v;
        });
        return this;
    }
    correlationScore(m) {
        const score = this.intersectionScore(m);
        return score / (this._count + m._count - score);
    }
    intersectionScore(m) {
        let score = 0;
        for (const [k, v] of this) {
            score += Math.min(v, m.get(k) || 0);
        }
        return score;
    }
}
//# sourceMappingURL=helpers.js.map