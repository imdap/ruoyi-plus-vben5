//#region src/theme/themes/compact/genCompactSizeMapToken.ts
function genSizeMapToken(token) {
	const { sizeUnit, sizeStep } = token;
	const compactSizeStep = sizeStep - 2;
	return {
		sizeXXL: sizeUnit * (compactSizeStep + 10),
		sizeXL: sizeUnit * (compactSizeStep + 6),
		sizeLG: sizeUnit * (compactSizeStep + 2),
		sizeMD: sizeUnit * (compactSizeStep + 2),
		sizeMS: sizeUnit * (compactSizeStep + 1),
		size: sizeUnit * compactSizeStep,
		sizeSM: sizeUnit * compactSizeStep,
		sizeXS: sizeUnit * (compactSizeStep - 1),
		sizeXXS: sizeUnit * (compactSizeStep - 1)
	};
}

//#endregion
export { genSizeMapToken as default };