import canUseDom from "./Dom/canUseDom.js";
import Portal_default from "./Portal.js";
import setStyle_default from "./setStyle.js";
import ScrollLocker from "./Dom/scrollLocker.js";
import raf_default from "./raf.js";
import { createVNode, defineComponent, onBeforeUnmount, onMounted, onUpdated, shallowRef } from "vue";
var openCount = 0;
var supportDom = canUseDom();
function getOpenCount() {
	return process.env.NODE_ENV === "test" ? openCount : 0;
}
var cacheOverflow = {};
function getParent(getContainer) {
	if (!supportDom) return null;
	if (getContainer) {
		if (typeof getContainer === "string") return document.querySelectorAll(getContainer)[0];
		if (typeof getContainer === "function") return getContainer();
		if (typeof getContainer === "object" && getContainer instanceof window.HTMLElement) return getContainer;
	}
	return document.body;
}
var PortalWrapper_default = /* @__PURE__ */ defineComponent((props, ctx) => {
	const container = shallowRef();
	const componentRef = shallowRef();
	const rafId = shallowRef();
	const scrollLocker = shallowRef();
	const removeCurrentContainer = () => {
		container.value?.parentNode?.removeChild(container.value);
	};
	const updateOpenCount = (prevProps) => {
		const { visible: prevVisible, getContainer: prevGetContainer } = prevProps || {};
		const { visible, getContainer: getContainer$1 } = props;
		if (visible !== prevVisible && supportDom && getParent(getContainer$1) === document.body) {
			if (visible && !prevVisible) openCount += 1;
			else if (prevProps) openCount -= 1;
		}
		if (typeof getContainer$1 === "function" && typeof prevGetContainer === "function" ? getContainer$1.toString() !== prevGetContainer.toString() : getContainer$1 !== prevGetContainer) removeCurrentContainer();
	};
	const attachToParent = (force = false) => {
		if (force || container.value && !container.value.parentNode) {
			const parent = getParent(props.getContainer);
			if (parent) {
				parent.appendChild(container.value);
				return true;
			}
			return false;
		}
		return true;
	};
	const setWrapperClassName = () => {
		const { wrapperClassName } = props;
		if (container.value && wrapperClassName && wrapperClassName !== container.value.className) container.value.className = wrapperClassName;
	};
	const getContainer = () => {
		if (!supportDom) return null;
		if (!container.value) {
			container.value = document.createElement("div");
			attachToParent(true);
		}
		setWrapperClassName();
		return container.value;
	};
	onMounted(() => {
		scrollLocker.value = new ScrollLocker({ container: getParent(props.getContainer) });
		updateOpenCount();
		if (!attachToParent()) rafId.value = raf_default(() => {});
	});
	onUpdated(() => {
		updateOpenCount(props);
		updateOpenCount(props);
		setWrapperClassName();
		attachToParent();
	});
	onBeforeUnmount(() => {
		const { visible, getContainer: getContainer$1 } = props;
		if (supportDom && getParent(getContainer$1) === document.body) openCount = visible && openCount ? openCount - 1 : openCount;
		removeCurrentContainer();
		raf_default.cancel(rafId.value);
	});
	const switchScrollingEffect = () => {
		if (openCount === 1 && !Object.keys(cacheOverflow).length) {
			switchScrollingEffect();
			cacheOverflow = setStyle_default({
				overflow: "hidden",
				overflowX: "hidden",
				overflowY: "hidden"
			});
		} else if (!openCount) {
			setStyle_default(cacheOverflow);
			cacheOverflow = {};
			switchScrollingEffect();
		}
	};
	return () => {
		const { forceRender, visible } = props;
		let portal = null;
		const childProps = {
			getOpenCount,
			getContainer,
			switchScrollingEffect,
			scrollLocker: scrollLocker.value
		};
		if (forceRender || visible || componentRef.value) portal = createVNode(Portal_default, {
			"getContainer": getContainer,
			"ref": componentRef
		}, { default: () => [ctx?.slots?.default(childProps)] });
		return portal;
	};
}, { props: {
	visible: {
		type: Boolean,
		required: false,
		default: void 0
	},
	getContainer: {
		type: [String, Function],
		required: false,
		skipCheck: true,
		default: void 0
	},
	wrapperClassName: {
		type: String,
		required: false,
		default: void 0
	},
	forceRender: {
		type: Boolean,
		required: false,
		default: void 0
	}
} });
export { PortalWrapper_default as default, getOpenCount };
