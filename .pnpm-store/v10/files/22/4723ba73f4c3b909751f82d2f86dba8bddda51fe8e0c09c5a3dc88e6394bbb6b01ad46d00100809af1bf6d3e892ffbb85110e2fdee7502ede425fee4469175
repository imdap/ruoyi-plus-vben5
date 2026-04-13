export interface WorkspaceNamedCatalogs {
    [catalogName: string]: WorkspaceCatalog;
}
export interface WorkspaceCatalog {
    [dependencyName: string]: string;
}
export declare function assertValidWorkspaceManifestCatalog(manifest: {
    packages?: readonly string[];
    catalog?: unknown;
}): asserts manifest is {
    catalog?: WorkspaceCatalog;
};
export declare function assertValidWorkspaceManifestCatalogs(manifest: {
    packages?: readonly string[];
    catalogs?: unknown;
}): asserts manifest is {
    catalogs?: WorkspaceNamedCatalogs;
};
