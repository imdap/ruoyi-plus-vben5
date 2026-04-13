import { useContextProvider } from "./Context.js";
import useDom from "./useDom.js";
import useEscKeyDown from "./useEscKeyDown.js";
import useScrollLocker from "./useScrollLocker.js";
import { Teleport, computed, createVNode, defineComponent, isVNode, mergeDefaults, onMounted, shallowRef, watch } from "vue";
import { warning } from "@v-c/util";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
import { filterEmpty } from "@v-c/util/dist/props-util";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function getPortalContainer(getContainer) {
	if (getContainer === false) return false;
	if (!canUseDom() || !getContainer) return null;
	if (typeof getContainer === "string") return document.querySelector(getContainer);
	if (typeof getContainer === "function") return getDOM(getContainer());
	return typeof getContainer === "object" ? getDOM(getContainer) : getContainer;
}
var Portal_default = /* @__PURE__ */ defineComponent((props, { slots, expose }) => {
	const shouldRender = shallowRef(props.open);
	const mergedRender = computed(() => shouldRender.value || props.open);
	if (process.env.NODE_ENV !== "production") warning(canUseDom() || !props.open, `Portal only work in client side. Please call 'useEffect' to show Portal instead default render in SSR.`);
	watch([() => props.open, () => props.autoDestroy], () => {
		if (props.autoDestroy || props.open) shouldRender.value = props.open;
	});
	const innerContainer = shallowRef(getPortalContainer(props.getContainer));
	onMounted(() => {
		innerContainer.value = getPortalContainer(props.getContainer) ?? null;
	});
	watch(() => props.getContainer, () => {
		innerContainer.value = getPortalContainer(props.getContainer) ?? null;
	});
	const [defaultContainer, queueCreate] = useDom(computed(() => !!(mergedRender.value && !innerContainer.value)), props.debug);
	useContextProvider(queueCreate);
	const mergedContainer = computed(() => innerContainer.value ?? defaultContainer);
	useScrollLocker(computed(() => !!(props.autoLock && props.open && canUseDom() && (mergedContainer.value === defaultContainer || mergedContainer.value === document.body))));
	useEscKeyDown(computed(() => !!props.open), (...args) => {
		props.onEsc?.(...args);
	});
	const elementEl = shallowRef();
	const setRef = (el) => {
		elementEl.value = el;
	};
	expose({ elementEl });
	return () => {
		if (!mergedRender.value || !canUseDom() || innerContainer.value === void 0) return null;
		const renderInline = mergedContainer.value === false;
		const reffedChildren = filterEmpty(slots.default?.() ?? []);
		if (renderInline) return reffedChildren;
		else {
			const child = reffedChildren.length === 1 ? isVNode(reffedChildren[0]) ? createVNode(reffedChildren[0], { ref: setRef }) : reffedChildren[0] : reffedChildren;
			return createVNode(Teleport, { "to": mergedContainer.value }, _isSlot(child) ? child : { default: () => [child] });
		}
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		getContainer: {
			type: [
				String,
				Function,
				Boolean
			],
			required: false,
			skipCheck: true,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoDestroy: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoLock: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onEsc: {
			type: Function,
			required: false,
			default: void 0
		},
		debug: {
			type: String,
			required: false,
			default: void 0
		}
	}, {
		autoDestroy: true,
		getContainer: void 0
	}),
	name: "Portal",
	inheritAttrs: false
});
export { Portal_default as default };
