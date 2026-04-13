/**
 * SVG property types
 */
declare const propTypes: readonly ["path", "px", "raw"];
type SVGPropertyType = (typeof propTypes)[number];
/**
 * Get property type
 */
declare function getSVGPropertyType(tag: string, prop: string, supportLegacyBrowsers?: boolean): SVGPropertyType | undefined;
/**
 * Convert property to CSS
 */
declare function convertSVGPropertyToCSS(tag: string, prop: string, value: string | number, supportLegacyBrowsers?: boolean): [string, string] | undefined;
export { convertSVGPropertyToCSS, getSVGPropertyType };