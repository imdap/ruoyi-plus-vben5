import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { expect } from 'vitest';
export function json(obj, indent = 2) {
    return JSON.stringify(obj, null, indent) + '\n';
}
export function tempPath(file) {
    const testState = expect.getState();
    return path.join(__dirname, '../../.temp', testState.currentTestName?.replaceAll(/[^a-z./-]/gi, '_') || 'test', file);
}
export async function createPathForFile(file) {
    await fs.mkdir(path.dirname(file), { recursive: true });
}
export async function copyFile(fromFile, toFile) {
    await createPathForFile(toFile);
    return fs.copyFile(fromFile, toFile);
}
//# sourceMappingURL=util.js.map