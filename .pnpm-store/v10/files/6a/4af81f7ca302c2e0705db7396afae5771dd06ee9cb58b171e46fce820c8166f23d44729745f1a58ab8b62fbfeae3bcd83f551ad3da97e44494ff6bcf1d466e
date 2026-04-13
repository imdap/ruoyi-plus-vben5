import { Color } from "@v-c/color-picker";

//#region src/color-picker/color.ts
function toHexFormat(value, alpha) {
	return value?.replace(/[^0-9a-f]/gi, "").slice(0, alpha ? 8 : 6) || "";
}
const getHex = (value, alpha) => value ? toHexFormat(value, alpha) : "";
var AggregationColor = class AggregationColor {
	/** Original Color object */
	metaColor;
	colors;
	cleared = false;
	constructor(color) {
		if (color instanceof AggregationColor) {
			this.metaColor = color.metaColor.clone();
			this.colors = color.colors?.map((info) => ({
				color: new AggregationColor(info.color),
				percent: info.percent
			}));
			this.cleared = color.cleared;
			return;
		}
		const isArray = Array.isArray(color);
		if (isArray && color.length) {
			this.colors = color.map(({ color: c, percent }) => ({
				color: new AggregationColor(c),
				percent
			}));
			this.metaColor = new Color(this?.colors[0].color.metaColor);
		} else this.metaColor = new Color(isArray ? "" : color);
		if (!color || isArray && !this.colors) {
			this.metaColor = this.metaColor.setA(0);
			this.cleared = true;
		}
	}
	toHsb() {
		return this.metaColor.toHsb();
	}
	toHsbString() {
		return this.metaColor.toHsbString();
	}
	toHex() {
		return getHex(this.toHexString(), this.metaColor.a < 1);
	}
	toHexString() {
		return this.metaColor.toHexString();
	}
	toRgb() {
		return this.metaColor.toRgb();
	}
	toRgbString() {
		return this.metaColor.toRgbString();
	}
	isGradient() {
		return !!this.colors && !this.cleared;
	}
	getColors() {
		return this.colors || [{
			color: this,
			percent: 0
		}];
	}
	toCssString() {
		const { colors } = this;
		if (colors) return `linear-gradient(90deg, ${colors.map((c) => `${c.color.toRgbString()} ${c.percent}%`).join(", ")})`;
		return this.metaColor.toRgbString();
	}
	equals(color) {
		if (!color || this.isGradient() !== color.isGradient()) return false;
		if (!this.isGradient()) return this.toHexString() === color.toHexString();
		return this.colors.length === color.colors.length && this.colors.every((c, i) => {
			const target = color.colors[i];
			return c.percent === target?.percent && c.color.equals(target.color);
		});
	}
};

//#endregion
export { AggregationColor, getHex, toHexFormat };