export function opCombineAsync(...fns) {
    function combine(iter) {
        for (const fn of fns) {
            iter = fn(iter);
        }
        return iter;
    }
    return combine;
}
export function opCombineSync(...fns) {
    function combine(iter) {
        for (const fn of fns) {
            iter = fn(iter);
        }
        return iter;
    }
    return combine;
}
//# sourceMappingURL=combine.js.map