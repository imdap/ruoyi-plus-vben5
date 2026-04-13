import { useIconContext } from "./components/Context.js";
import { h, nextTick, onMounted } from "vue";
import { generate } from "@ant-design/colors";
import { updateCSS } from "@v-c/util/dist/Dom/dynamicCSS";
import { getShadowRoot } from "@v-c/util/dist/Dom/shadow";
import "@v-c/util/dist/warning";

//#region src/utils.ts
function isIconDefinition(target) {
	return typeof target === "object" && typeof target.name === "string" && typeof target.theme === "string" && (typeof target.icon === "object" || typeof target.icon === "function");
}
function generate$1(node, key, rootProps) {
	if (!rootProps) return h(node.tag, {
		key,
		...node.attrs
	}, (node.children || []).map((child, index) => generate$1(child, `${key}-${node.tag}-${index}`)));
	return h(node.tag, {
		key,
		...rootProps,
		...node.attrs
	}, (node.children || []).map((child, index) => generate$1(child, `${key}-${node.tag}-${index}`)));
}
function getSecondaryColor(primaryColor) {
	return generate(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
	if (!twoToneColor) return [];
	return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
const svgBaseProps = {
	"width": "1em",
	"height": "1em",
	"fill": "currentColor",
	"aria-hidden": "true",
	"focusable": "false"
};
const iconStyles = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;
function useInsertStyles(eleRef) {
	const iconContext = useIconContext();
	let mergedStyleStr = iconStyles;
	onMounted(async () => {
		await nextTick();
		const { prefixCls, csp, layer } = iconContext.value;
		if (prefixCls) mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
		if (layer) mergedStyleStr = `@layer ${layer} {\n${mergedStyleStr}\n}`;
		const ele = eleRef.value;
		const shadowRoot = getShadowRoot(ele);
		updateCSS(mergedStyleStr, "@ant-design-icons", {
			prepend: !layer,
			csp,
			attachTo: shadowRoot
		});
	});
}

//#endregion
export { generate$1 as generate, getSecondaryColor, isIconDefinition, normalizeTwoToneColors, svgBaseProps, useInsertStyles };