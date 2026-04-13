import { Color } from "./color.js";
const ColorPickerPrefixCls = "vc-color-picker";
function generateColor(color) {
	if (color instanceof Color) return color;
	return new Color(color);
}
const defaultColor = generateColor("#1677ff");
function formatColorValue(color, valueFormat) {
	if (!valueFormat) return color;
	if (typeof valueFormat === "function") return valueFormat(color);
	switch (valueFormat) {
		case "hex": return color.toHexString();
		case "hsb": return color.toHsbString();
		case "rgb":
		default: return color.toRgbString();
	}
}
function calculateColor(props) {
	const { offset, color, type } = props;
	const hsb = color.toHsb();
	if (type) switch (type) {
		case "hue": return generateColor({
			...hsb,
			h: offset.x / 100 * 360
		});
		case "alpha": return generateColor({
			...hsb,
			a: offset.x / 100
		});
	}
	return generateColor({
		h: hsb.h,
		s: offset.x / 100,
		b: 1 - offset.y / 100,
		a: hsb.a
	});
}
function calcOffset(color, type) {
	const hsb = color.toHsb();
	switch (type) {
		case "hue": return {
			x: hsb.h / 360 * 100,
			y: 50
		};
		case "alpha": return {
			x: color.a * 100,
			y: 50
		};
		default: return {
			x: hsb.s * 100,
			y: (1 - hsb.b) * 100
		};
	}
}
export { ColorPickerPrefixCls, calcOffset, calculateColor, defaultColor, formatColorValue, generateColor };
