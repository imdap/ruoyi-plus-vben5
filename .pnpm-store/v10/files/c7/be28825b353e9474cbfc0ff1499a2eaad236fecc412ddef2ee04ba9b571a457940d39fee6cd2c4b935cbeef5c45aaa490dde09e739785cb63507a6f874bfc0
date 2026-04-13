import { wordToFeatures } from './helpers.js';
const defaultMinScore = 0.35;
const wPrefix = '^';
const wSuffix = '$';
export function* suggest(trie, word, minScore = defaultMinScore) {
    yield* suggestIteration(trie.iterate(), word, minScore);
}
export function* suggestIteration(i, word, minScore = defaultMinScore) {
    let goDeeper = true;
    const fA = wordToFeatures(wPrefix + word + wSuffix);
    for (let r = i.next(goDeeper); !r.done; r = i.next(goDeeper)) {
        const { text, node } = r.value;
        const fB = wordToFeatures(wPrefix + text);
        const rawScore = fA.intersectionScore(fB);
        const bestPossibleScore = fA.count / (fA.count + fB.count - rawScore);
        goDeeper = bestPossibleScore > minScore;
        if (goDeeper && node.f) {
            const fB = wordToFeatures(wPrefix + text + wSuffix);
            const rawScore = fA.intersectionScore(fB);
            const score = rawScore / (fA.count + fB.count - rawScore);
            if (score >= minScore) {
                const r = { word: text, score };
                minScore = (yield r) || minScore;
            }
        }
    }
}
//# sourceMappingURL=suggest.js.map