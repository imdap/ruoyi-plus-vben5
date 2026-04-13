import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export async function findUp(name, options = {}) {
    const { cwd = process.cwd(), type: entryType = 'file', stopAt } = options;
    let dir = path.resolve(toDirPath(cwd));
    const root = path.parse(dir).root;
    const predicate = makePredicate(name, entryType);
    const stopAtDir = path.resolve(toDirPath(stopAt || root));
    while (dir !== root && dir !== stopAtDir) {
        const found = await predicate(dir);
        if (found !== undefined)
            return found;
        dir = path.dirname(dir);
    }
    return undefined;
}
function makePredicate(name, entryType) {
    if (typeof name === 'function')
        return name;
    const checkStat = entryType === 'file' ? 'isFile' : 'isDirectory';
    function checkName(dir, name) {
        const f = path.join(dir, name);
        return stat(f)
            .then((stats) => (stats[checkStat]() && f) || undefined)
            .catch(() => undefined);
    }
    if (!Array.isArray(name))
        return (dir) => checkName(dir, name);
    return async (dir) => {
        const pending = name.map((n) => checkName(dir, n));
        for (const p of pending) {
            const found = await p;
            if (found)
                return found;
        }
        return undefined;
    };
}
function toDirPath(urlOrPath) {
    return urlOrPath instanceof URL ? fileURLToPath(new URL('.', urlOrPath)) : urlOrPath;
}
//# sourceMappingURL=findUp.js.map