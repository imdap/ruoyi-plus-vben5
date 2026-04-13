import { toFileURL } from 'cspell-io';
import { readTextFile } from '../fileSystem.js';
import { toIterableIterator } from './iterableIteratorLib.js';
export async function readLines(url, encoding = 'utf8') {
    url = toFileURL(url);
    const content = await readTextFile(url, encoding);
    return toIterableIterator(content.split(/\r?\n/g));
}
//# sourceMappingURL=fileReader.js.map