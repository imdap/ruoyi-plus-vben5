import { SourceStyle } from '../common/source-style.js';
export interface HtmlAttr {
    quote: '"' | "'" | '';
    name: string;
    value: string | null;
    start: number;
    end: number;
}
export interface ParsedMap extends HtmlTag {
    json: any;
    style: SourceStyle;
    newScript: boolean;
}
export interface HtmlAnalysis {
    map: ParsedMap;
    base: URL;
    esModuleShims: HtmlTag | null;
    staticImports: Set<string>;
    dynamicImports: Set<string>;
    preloads: HtmlTag[];
    modules: HtmlTag[];
    inlineModules: HtmlTag[];
    scripts: HtmlTag[];
    comments: HtmlTag[];
    newlineTab: string;
}
export interface HtmlTag {
    start: number;
    end: number;
    attrs: Record<string, HtmlAttr>;
}
export declare function analyzeHtml(source: string, url?: URL): HtmlAnalysis;
