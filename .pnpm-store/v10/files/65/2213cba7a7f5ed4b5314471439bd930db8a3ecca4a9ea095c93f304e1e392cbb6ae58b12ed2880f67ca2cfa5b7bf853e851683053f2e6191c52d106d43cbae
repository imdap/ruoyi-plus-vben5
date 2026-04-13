import { Document, ToStringOptions } from "yaml";

//#region src/index.d.ts
interface PnpmWorkspaceYamlSchema {
  packages?: string[];
  overrides?: Record<string, string>;
  catalog?: Record<string, string>;
  catalogs?: Record<string, Record<string, string>>;
}
interface PnpmWorkspaceYaml {
  getDocument: () => Document.Parsed;
  setContent: (content: string) => void;
  hasChanged: () => boolean;
  toJSON: () => PnpmWorkspaceYamlSchema;
  toString: (options?: ToStringOptions) => string;
  setPath: (path: string[], value: any) => void;
  /**
       * Set a package to catalog
       */
  setPackage: (catalog: 'default' | (string & {}), packageName: string, specifier: string) => void;
  /**
       * Set a package to catalog only when the version matches, otherwise create a conflicts catalog
       */
  setPackageNoConflicts: (catalog: 'default' | (string & {}), packageName: string, specifier: string) => void;
  /**
       * Get all catalogs for a package
       */
  getPackageCatalogs: (packageName: string) => string[];
  /**
       * Check if the specifier has conflicts with the existing specifier in the catalog
       */
  hasSpecifierConflicts: (catalog: 'default' | (string & {}), packageName: string, specifier: string) => {
    conflicts: boolean;
    newCatalogName: string;
    existingSpecifier?: string;
  };
}
/**
 * Parse pnpm workspace yaml content, and return an object to modify the content
 * while preserving the comments, anchor, and alias.
 */
declare function parsePnpmWorkspaceYaml(content: string): PnpmWorkspaceYaml;
//#endregion
export { PnpmWorkspaceYaml, PnpmWorkspaceYamlSchema, parsePnpmWorkspaceYaml };