import { type PnpmSettings } from '@pnpm/types';
import { type WorkspaceCatalog, type WorkspaceNamedCatalogs } from './catalogs.js';
export interface WorkspaceManifest extends PnpmSettings {
    packages: string[];
    /**
     * The default catalog. Package manifests may refer to dependencies in this
     * definition through the `catalog:default` specifier or the `catalog:`
     * shorthand.
     */
    catalog?: WorkspaceCatalog;
    /**
     * A dictionary of named catalogs. Package manifests may refer to dependencies
     * in this definition through the `catalog:<name>` specifier.
     */
    catalogs?: WorkspaceNamedCatalogs;
}
export declare function readWorkspaceManifest(dir: string): Promise<WorkspaceManifest | undefined>;
export declare function validateWorkspaceManifest(manifest: unknown): asserts manifest is WorkspaceManifest | undefined;
