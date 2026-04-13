import type { VFileSystem } from '../fileSystem.js';
type EntryType = 'file' | 'directory' | '!file' | '!directory';
export type FindUpFileSystem = Pick<VFileSystem, 'findUp'>;
export interface FindUpURLOptions {
    type?: EntryType;
    stopAt?: URL | URL[];
    fs?: FindUpFileSystem;
}
export type FindUpPredicate = (dir: URL) => URL | undefined | Promise<URL | undefined>;
export declare function findUpFromUrl(name: string | string[] | FindUpPredicate, from: URL, options?: FindUpURLOptions): Promise<URL | undefined>;
export {};
//# sourceMappingURL=findUpFromUrl.d.ts.map