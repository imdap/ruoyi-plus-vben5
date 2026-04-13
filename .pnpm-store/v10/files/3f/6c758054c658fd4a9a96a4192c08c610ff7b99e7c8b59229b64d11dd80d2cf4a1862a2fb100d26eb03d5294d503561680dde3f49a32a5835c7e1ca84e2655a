function setStyle(style, options = {}) {
	if (!style) return {};
	const { element = document.body } = options;
	const oldStyle = {};
	const styleKeys = Object.keys(style);
	styleKeys.forEach((key) => {
		oldStyle[key] = element.style[key];
	});
	styleKeys.forEach((key) => {
		element.style[key] = style[key];
	});
	return oldStyle;
}
var setStyle_default = setStyle;
export { setStyle_default as default };
