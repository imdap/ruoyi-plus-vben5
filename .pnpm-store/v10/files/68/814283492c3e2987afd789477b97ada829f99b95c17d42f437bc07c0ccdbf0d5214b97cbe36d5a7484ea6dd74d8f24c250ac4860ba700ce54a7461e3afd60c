import { generate, getSecondaryColor, isIconDefinition, useInsertStyles } from "../utils.js";
import { defineComponent, shallowRef } from "vue";
import { warning } from "@v-c/util";

//#region src/components/IconBase.tsx
const twoToneColorPalette = {
	primaryColor: "#333",
	secondaryColor: "#E6E6E6",
	calculated: false
};
function setTwoToneColors({ primaryColor, secondaryColor }) {
	twoToneColorPalette.primaryColor = primaryColor;
	twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
	twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
	return { ...twoToneColorPalette };
}
function unwrapIconDefinition(icon) {
	if (isIconDefinition(icon)) return icon;
	const maybeDefault = icon && typeof icon === "object" && "default" in icon ? icon.default : void 0;
	if (isIconDefinition(maybeDefault)) return maybeDefault;
}
const IconBaseComp = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const svgRef = shallowRef();
	useInsertStyles(svgRef);
	return () => {
		const { icon, onClick, primaryColor, secondaryColor } = props;
		const resolvedIcon = unwrapIconDefinition(icon);
		let colors = twoToneColorPalette;
		if (primaryColor) colors = {
			primaryColor,
			secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
		};
		warning(!!resolvedIcon, `icon should be icon definiton, but got ${icon}`);
		if (!resolvedIcon) return null;
		let target = resolvedIcon;
		if (target && typeof target.icon === "function") target = {
			...target,
			icon: target.icon(colors.primaryColor, colors.secondaryColor)
		};
		return generate(target.icon, `svg-${target.name}`, {
			onClick,
			"data-icon": target.name,
			"width": "1em",
			"height": "1em",
			"fill": "currentColor",
			"aria-hidden": "true",
			"ref": svgRef,
			...attrs
		});
	};
}, {
	props: {
		icon: {
			type: Object,
			required: true
		},
		onClick: {
			type: Function,
			required: false
		},
		primaryColor: {
			type: String,
			required: false
		},
		secondaryColor: {
			type: String,
			required: false
		},
		focusable: {
			type: String,
			required: false
		}
	},
	name: "IconBase",
	inheritAttrs: false
});
IconBaseComp.getTwoToneColors = getTwoToneColors;
IconBaseComp.setTwoToneColors = setTwoToneColors;

//#endregion
export { IconBaseComp as default };