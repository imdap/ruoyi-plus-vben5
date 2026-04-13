//#region src/theme/themes/shared/genFontSizes.ts
function getLineHeight(fontSize) {
	return (fontSize + 8) / fontSize;
}
function getFontSizes(base) {
	const fontSizes = Array.from({ length: 10 }).map((_, index) => {
		const i = index - 1;
		const baseSize = base * Math.E ** (i / 5);
		const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
		return Math.floor(intSize / 2) * 2;
	});
	fontSizes[1] = base;
	return fontSizes.map((size) => ({
		size,
		lineHeight: getLineHeight(size)
	}));
}

//#endregion
export { getFontSizes as default, getLineHeight };