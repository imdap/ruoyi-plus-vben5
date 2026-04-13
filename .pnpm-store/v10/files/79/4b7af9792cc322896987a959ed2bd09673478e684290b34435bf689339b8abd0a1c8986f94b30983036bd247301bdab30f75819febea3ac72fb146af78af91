import { warning } from "@v-c/util/dist/warning";

//#region src/theme/Theme.ts
let uuid = 0;
/**
* Theme with algorithms to derive tokens from design tokens.
* Use `createTheme` first which will help to manage the theme instance cache.
*/
var Theme = class {
	derivatives;
	id;
	constructor(derivatives) {
		this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
		this.id = uuid;
		if (derivatives.length === 0) warning(derivatives.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function.");
		uuid += 1;
	}
	getDerivativeToken(token) {
		return this.derivatives.reduce((result, derivative) => derivative(token, result), void 0);
	}
};

//#endregion
export { Theme as default };