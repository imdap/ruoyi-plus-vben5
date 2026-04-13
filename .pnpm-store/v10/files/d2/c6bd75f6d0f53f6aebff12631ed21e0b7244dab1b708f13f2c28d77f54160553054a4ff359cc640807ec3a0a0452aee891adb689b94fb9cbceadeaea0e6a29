export type DependenciesField = 'optionalDependencies' | 'dependencies' | 'devDependencies';
export type DependenciesOrPeersField = DependenciesField | 'peerDependencies';
export declare const DEPENDENCIES_FIELDS: DependenciesField[];
export declare const DEPENDENCIES_OR_PEER_FIELDS: DependenciesOrPeersField[];
export interface Registries {
    default: string;
    [scope: string]: string;
}
export interface SslConfig {
    cert: string;
    key: string;
    ca?: string;
}
export type HoistedDependencies = Record<DepPath | ProjectId, Record<string, 'public' | 'private'>>;
export type PkgResolutionId = string & {
    __brand: 'PkgResolutionId';
};
export type PkgId = string & {
    __brand: 'PkgId';
};
export type PkgIdWithPatchHash = string & {
    __brand: 'PkgIdWithPatchHash';
};
export type DepPath = string & {
    __brand: 'DepPath';
};
export type ProjectId = string & {
    __brand: 'ProjectId';
};
export type PinnedVersion = 'none' | 'patch' | 'minor' | 'major';
export type IgnoredBuilds = Set<DepPath>;
