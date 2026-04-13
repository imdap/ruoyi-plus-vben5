export interface ParsedTag {
    tagName: string;
    start: number;
    end: number;
    attributes: ParsedAttribute[];
    innerStart: number;
    innerEnd: number;
}
export interface ParsedAttribute {
    nameStart: number;
    nameEnd: number;
    valueStart: number;
    valueEnd: number;
}
export declare function parseHtml(_source: string, tagNames?: string[]): ParsedTag[];
export declare function isWs(ch: any): boolean;
