import { getDefaultVirtualFs } from 'cspell-io';
export { FSCapabilityFlags } from 'cspell-io';
export function getVirtualFS() {
    return getDefaultVirtualFs();
}
export function getFileSystem() {
    return getVirtualFS().fs;
}
export function registerCSpell(fsp) {
    const vfs = getVirtualFS();
    vfs.registerFileSystemProvider(fsp);
}
export async function readTextFile(url, encoding = 'utf8') {
    const file = await getFileSystem().readFile(url, encoding);
    return file.getText();
}
//# sourceMappingURL=fileSystem.js.map