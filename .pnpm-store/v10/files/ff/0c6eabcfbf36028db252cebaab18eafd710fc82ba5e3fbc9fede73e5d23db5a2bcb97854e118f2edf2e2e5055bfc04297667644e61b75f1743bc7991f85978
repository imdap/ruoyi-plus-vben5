import { Plugin, FilterPattern } from 'vite';
export interface LazyImportResolverResult {
    from: string | {
        jsPath: string;
        stylePath: string;
    };
}
export interface LazyImportResolver {
    libraryName: string;
    esm?: boolean;
    importStyle?: boolean | 'css' | 'less' | 'scss';
    resolve?: (params: {
        dirName: string;
        name: string;
        libraryName: string;
    }) => null | LazyImportResolverResult;
}
export interface LazyImportConfig {
    include?: FilterPattern;
    exclude?: FilterPattern;
    resolvers: LazyImportResolver[];
}
export declare function lazyImport(options: LazyImportConfig): Plugin<any>;
export * from './resolvers';
