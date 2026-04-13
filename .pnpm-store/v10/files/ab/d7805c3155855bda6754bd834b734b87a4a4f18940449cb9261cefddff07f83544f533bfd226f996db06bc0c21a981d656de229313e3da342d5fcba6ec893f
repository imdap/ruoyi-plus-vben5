import { Resolver } from '../trace/resolver.js';
export type DependenciesField = 'dependencies' | 'devDependencies' | 'peerDependencies' | 'optionalDependencies';
type ExportsTarget = string | null | {
    [condition: string]: ExportsTarget;
} | ExportsTarget[];
export interface PackageJson {
    registry?: string;
    name?: string;
    version?: string;
    main?: string;
    files?: string[];
    browser?: string | Record<string, string>;
    exports?: ExportsTarget | Record<string, ExportsTarget>;
    type?: string;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
}
export declare function updatePjson(resolver: Resolver, pjsonBase: string, updateFn: (pjson: PackageJson) => void | PackageJson | Promise<void | PackageJson>): Promise<boolean>;
export {};
