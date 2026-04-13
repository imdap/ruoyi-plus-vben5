import { useConfig } from "../../config-provider/context.js";
import style_default from "./style.js";
import useWave from "./useWave.js";
import { cloneVNode, computed, defineComponent, isVNode, onBeforeUnmount, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { unrefElement } from "@vueuse/core";

//#region src/_util/wave/index.tsx
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
function isVisible(element) {
	if (!isBrowser) return false;
	if (!element) return false;
	if (element === document.body) return true;
	if (element.offsetWidth || element.offsetHeight || element.getClientRects().length) return true;
	const style = getComputedStyle(element);
	return style.display !== "none" && style.visibility !== "hidden";
}
var wave_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const configCtx = useConfig();
	const containerRef = shallowRef(null);
	const prefixCls = computed(() => configCtx.value.getPrefixCls("wave"));
	const hashId = style_default(prefixCls);
	const colorSource = computed(() => props.colorSource);
	const showWave = useWave(containerRef, computed(() => classNames(prefixCls.value, hashId.value)), computed(() => props.component), colorSource);
	const handleClick = (event) => {
		const node = containerRef.value;
		if (!node || !isBrowser) return;
		const target = event.target;
		if (!isVisible(target)) return;
		const nodeCls = typeof node.className === "string" ? node.className : String(node.className);
		if (node.getAttribute?.("disabled") || node.disabled || nodeCls.includes("disabled") && !nodeCls.includes("disabled:") || node.getAttribute?.("aria-disabled") === "true" || nodeCls.includes("-leave")) return;
		showWave(event);
	};
	watch(() => ({
		node: containerRef.value,
		disabled: props.disabled
	}), ({ node, disabled }, _, onCleanup) => {
		if (!isBrowser) return;
		if (!node || node.nodeType !== window.Node.ELEMENT_NODE || disabled) return;
		onCleanup(() => {
			node?.removeEventListener("click", handleClick, true);
		});
		node.addEventListener("click", handleClick, true);
	}, { immediate: true });
	onBeforeUnmount(() => {
		if (!isBrowser) return;
		containerRef.value?.removeEventListener("click", handleClick, true);
	});
	const mergedRef = (el, node) => {
		const _el = unrefElement(el);
		if (_el) containerRef.value = _el;
		if (node.ref) {
			if (typeof node.ref === "function") node.ref(_el);
			else if (typeof node.ref === "object" && "value" in node.ref?.r) node.ref.r.value = _el;
		}
	};
	return () => {
		const children = filterEmpty(slots.default?.() ?? []);
		if (children.length !== 1) return children;
		const child = children[0];
		if (!isVNode(child)) return child;
		return cloneVNode(child, { ref: (el) => mergedRef(el, child) });
	};
}, { props: {
	disabled: {
		type: Boolean,
		required: false,
		default: void 0
	},
	component: {
		type: String,
		required: false
	},
	colorSource: {
		type: [String, null],
		required: false
	}
} });

//#endregion
export { wave_default as default };