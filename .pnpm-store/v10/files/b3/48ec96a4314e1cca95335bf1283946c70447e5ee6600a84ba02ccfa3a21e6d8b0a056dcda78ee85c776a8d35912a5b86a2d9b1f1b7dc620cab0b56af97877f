import { promises as fs } from 'node:fs';
export const defaultIO = {
    readFile,
    writeFile,
};
async function readFile(url) {
    const content = await fs.readFile(url, 'utf8');
    return { url, content };
}
async function writeFile(file) {
    await fs.writeFile(file.url, file.content);
    return { url: file.url };
}
//# sourceMappingURL=defaultIO.js.map