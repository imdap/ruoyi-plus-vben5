import unitless from "@emotion/unitless";

//#region src/transformers/px2rem.ts
/**
* respect https://github.com/cuth/postcss-pxtorem
*/
const pxRegex = /url\([^)]+\)|var\([^)]+\)|(\d+(?:\.\d+)?|\.\d+)px/g;
function toFixed(number, precision) {
	const multiplier = 10 ** (precision + 1);
	const wholeNumber = Math.floor(number * multiplier);
	return Math.round(wholeNumber / 10) * 10 / multiplier;
}
function transform(options = {}) {
	const { rootValue = 16, precision = 5, mediaQuery = false } = options;
	const pxReplace = (m, $1) => {
		if (!$1) return m;
		const pixels = Number.parseFloat($1);
		if (pixels <= 1) return m;
		return `${toFixed(pixels / rootValue, precision)}rem`;
	};
	const visit = (cssObj) => {
		const clone = { ...cssObj };
		Object.entries(cssObj).forEach(([key, value]) => {
			if (typeof value === "string" && value.includes("px")) clone[key] = value.replace(pxRegex, pxReplace);
			if (!unitless[key] && typeof value === "number" && value !== 0) clone[key] = `${value}px`.replace(pxRegex, pxReplace);
			const mergedKey = key.trim();
			if (mergedKey.startsWith("@") && mergedKey.includes("px") && mediaQuery) {
				const newKey = key.replace(pxRegex, pxReplace);
				clone[newKey] = clone[key];
				delete clone[key];
			}
		});
		return clone;
	};
	return { visit };
}
var px2rem_default = transform;

//#endregion
export { px2rem_default as default };