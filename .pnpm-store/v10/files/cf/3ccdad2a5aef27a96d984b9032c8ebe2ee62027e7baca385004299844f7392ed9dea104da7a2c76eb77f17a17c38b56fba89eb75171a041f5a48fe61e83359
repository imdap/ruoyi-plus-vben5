import { compareResults } from './helpers.js';
export class SuggestionCollector {
    size;
    minScore;
    results = [];
    constructor(size, minScore) {
        this.size = size;
        this.minScore = minScore;
    }
    get collection() {
        return [...this.results];
    }
    get sortedCollection() {
        return this.collection.sort(compareResults);
    }
}
//# sourceMappingURL=SuggestionCollector.js.map