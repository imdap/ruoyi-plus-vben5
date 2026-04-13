import en_US_default from "../locale/en_US.js";

//#region src/modal/locale.ts
let runtimeLocale = { ...en_US_default.Modal };
let localeList = [];
function generateLocale() {
	return localeList.reduce((merged, locale) => ({
		...merged,
		...locale
	}), en_US_default.Modal);
}
function changeConfirmLocale(newLocale) {
	if (newLocale) {
		const cloneLocale = { ...newLocale };
		localeList.push(cloneLocale);
		runtimeLocale = generateLocale();
		return () => {
			localeList = localeList.filter((locale) => locale !== cloneLocale);
			runtimeLocale = generateLocale();
		};
	}
	runtimeLocale = { ...en_US_default.Modal };
}
function getConfirmLocale() {
	return runtimeLocale;
}

//#endregion
export { changeConfirmLocale, getConfirmLocale };