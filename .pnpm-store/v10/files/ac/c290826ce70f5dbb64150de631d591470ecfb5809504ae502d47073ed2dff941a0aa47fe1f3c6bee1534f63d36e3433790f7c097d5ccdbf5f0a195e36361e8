import Icon from "./Icon.js";
import { createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/components/IconFont.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const customCache = /* @__PURE__ */ new Set();
function isValidCustomScriptUrl(scriptUrl) {
	return Boolean(typeof scriptUrl === "string" && scriptUrl.length && !customCache.has(scriptUrl));
}
function createScriptUrlElements(scriptUrls, index = 0) {
	const currentScriptUrl = scriptUrls[index];
	if (isValidCustomScriptUrl(currentScriptUrl)) {
		const script = document.createElement("script");
		script.setAttribute("src", currentScriptUrl);
		script.setAttribute("data-namespace", currentScriptUrl);
		if (scriptUrls.length > index + 1) {
			script.onload = () => {
				createScriptUrlElements(scriptUrls, index + 1);
			};
			script.onerror = () => {
				createScriptUrlElements(scriptUrls, index + 1);
			};
		}
		customCache.add(currentScriptUrl);
		document.body.appendChild(script);
	}
}
function create(options = {}) {
	const { scriptUrl, extraCommonProps = {} } = options;
	/**
	* DOM API required.
	* Make sure in browser environment.
	* The Custom Icon will create a <script/>
	* that loads SVG symbols and insert the SVG Element into the document body.
	*/
	if (scriptUrl && typeof document !== "undefined" && typeof window !== "undefined" && typeof document.createElement === "function") if (Array.isArray(scriptUrl)) createScriptUrlElements(scriptUrl.reverse());
	else createScriptUrlElements([scriptUrl]);
	return /* @__PURE__ */ defineComponent((props, { slots }) => {
		return () => {
			const { type, ...restProps } = props;
			let content = null;
			if (props.type) content = createVNode("use", { "xlink:href": `#${type}` }, null);
			const children = filterEmpty(slots?.default?.() ?? []);
			if (children.length) content = children;
			return createVNode(Icon, mergeProps(extraCommonProps, restProps), _isSlot(content) ? content : { default: () => [content] });
		};
	}, { props: {
		type: { required: true },
		spin: {
			type: Boolean,
			required: false
		},
		rotate: {
			type: Number,
			required: false
		}
	} });
}

//#endregion
export { create as default };