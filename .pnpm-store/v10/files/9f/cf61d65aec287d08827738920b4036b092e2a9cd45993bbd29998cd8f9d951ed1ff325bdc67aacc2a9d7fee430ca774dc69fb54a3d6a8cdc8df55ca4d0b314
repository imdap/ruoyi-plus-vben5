import { removeAccents } from './text.js';
export function* mapperNormalizeNFC(words) {
    for (const word of words) {
        yield word.normalize('NFC');
    }
}
export function* mapperRemoveCaseAndAccents(words) {
    for (const word of words) {
        const lc = word.toLowerCase();
        yield lc;
        const woAccents = removeAccents(lc);
        if (lc !== woAccents)
            yield woAccents;
    }
}
//# sourceMappingURL=textMappers.js.map