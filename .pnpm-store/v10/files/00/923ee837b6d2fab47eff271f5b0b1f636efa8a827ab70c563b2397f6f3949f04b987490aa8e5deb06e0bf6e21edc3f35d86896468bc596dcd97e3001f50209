import { fileURLToPath } from 'node:url';
/**
 * This is the url of the current file, but it might be undefined if the environment does not support it.
 */
const url = import.meta.url;
function calcSrcDirectory() {
    try {
        return __dirname;
    }
    catch {
        return url ? fileURLToPath(new URL('./', url)) : process.cwd();
    }
}
export const srcDirectory = calcSrcDirectory();
//# sourceMappingURL=pkg-info.mjs.map