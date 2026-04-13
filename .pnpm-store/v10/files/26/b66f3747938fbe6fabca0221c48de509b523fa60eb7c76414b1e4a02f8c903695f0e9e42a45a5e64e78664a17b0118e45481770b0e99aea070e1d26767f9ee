const regExFirstUpper = /^\p{Lu}\p{M}?\p{Ll}+$/u;
const regExAllUpper = /^(?:\p{Lu}\p{M}?)+$/u;
const regExAllLower = /^(?:\p{Ll}\p{M}?)+$/u;
const regExAccents = /\p{M}/gu;
export function isUpperCase(word) {
    return !!regExAllUpper.test(word);
}
export function isLowerCase(word) {
    return !!regExAllLower.test(word);
}
export function isFirstCharacterUpper(word) {
    return isUpperCase(word.slice(0, 1));
}
export function isFirstCharacterLower(word) {
    return isLowerCase(word.slice(0, 1));
}
export function ucFirst(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}
export function lcFirst(word) {
    return word.slice(0, 1).toLowerCase() + word.slice(1);
}
export function matchCase(example, word) {
    if (regExFirstUpper.test(example)) {
        return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    }
    if (regExAllLower.test(example)) {
        return word.toLowerCase();
    }
    if (regExAllUpper.test(example)) {
        return word.toUpperCase();
    }
    if (isFirstCharacterUpper(example)) {
        return ucFirst(word);
    }
    if (isFirstCharacterLower(example)) {
        return lcFirst(word);
    }
    return word;
}
export function removeAccents(text) {
    return text.normalize('NFD').replaceAll(regExAccents, '');
}
export function removeUnboundAccents(text) {
    return text.replaceAll(regExAccents, '');
}
//# sourceMappingURL=text.js.map