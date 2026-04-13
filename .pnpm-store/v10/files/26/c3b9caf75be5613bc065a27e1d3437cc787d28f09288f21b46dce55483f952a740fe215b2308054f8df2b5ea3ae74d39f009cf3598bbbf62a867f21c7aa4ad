import { ATTR_MARK } from "../StyleContext.js";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";

//#region src/util/cacheMapUtil.ts
const ATTR_CACHE_MAP = "data-ant-cssinjs-cache-path";
/**
* This marks style from the css file.
* Which means not exist in `<style />` tag.
*/
const CSS_FILE_STYLE = "_FILE_STYLE__";
function serialize(cachePathMap) {
	return Object.keys(cachePathMap).map((path) => {
		return `${path}:${cachePathMap[path]}`;
	}).join(";");
}
let cachePathMap;
let fromCSSFile = true;
/**
* @private Test usage only. Can save remove if no need.
*/
function reset(mockCache, fromFile = true) {
	cachePathMap = mockCache;
	fromCSSFile = fromFile;
}
function prepare() {
	if (!cachePathMap) {
		cachePathMap = {};
		if (canUseDom()) {
			const div = document.createElement("div");
			div.className = ATTR_CACHE_MAP;
			div.style.position = "fixed";
			div.style.visibility = "hidden";
			div.style.top = "-9999px";
			document.body.appendChild(div);
			let content = getComputedStyle(div).content || "";
			content = content.replace(/^"/, "").replace(/"$/, "");
			content.split(";").forEach((item) => {
				const [path, hash] = item.split(":");
				cachePathMap[path] = hash;
			});
			const inlineMapStyle = document.querySelector(`style[${ATTR_CACHE_MAP}]`);
			if (inlineMapStyle) {
				fromCSSFile = false;
				inlineMapStyle.parentNode?.removeChild(inlineMapStyle);
			}
			document.body.removeChild(div);
		}
	}
}
function existPath(path) {
	prepare();
	return !!cachePathMap[path];
}
function getStyleAndHash(path) {
	const hash = cachePathMap[path];
	let styleStr = null;
	if (hash && canUseDom()) if (fromCSSFile) styleStr = CSS_FILE_STYLE;
	else {
		const style = document.querySelector(`style[${ATTR_MARK}="${cachePathMap[path]}"]`);
		if (style) styleStr = style.innerHTML;
		else delete cachePathMap[path];
	}
	return [styleStr, hash];
}

//#endregion
export { ATTR_CACHE_MAP, CSS_FILE_STYLE, existPath, getStyleAndHash, prepare, reset, serialize };