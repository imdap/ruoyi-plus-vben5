function parseValue(value, config) {
	const { valueFormat, generateConfig, locale } = config;
	if (!valueFormat || typeof value !== "string") return value;
	const parsed = generateConfig.locale.parse(locale.locale, value, [valueFormat]);
	if (parsed && generateConfig.isValidate(parsed)) return parsed;
	return null;
}
function parseValues(values, config) {
	if (!values) return values;
	return values.map((value) => parseValue(value, config));
}
function formatValue(value, config) {
	const { valueFormat, generateConfig, locale } = config;
	if (!valueFormat || value === null || value === void 0) return value;
	return generateConfig.locale.format(locale.locale, value, valueFormat);
}
function formatValues(values, config) {
	if (!values) return values;
	return values.map((value) => formatValue(value, config));
}
export { formatValue, formatValues, parseValue, parseValues };
