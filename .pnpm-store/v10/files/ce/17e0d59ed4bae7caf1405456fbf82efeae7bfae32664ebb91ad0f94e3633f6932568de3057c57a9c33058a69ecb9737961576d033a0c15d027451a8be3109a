import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { clsx as clsx$1, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { Affix } from "../affix/index.js";
import getScroll_default from "../_util/getScroll.js";
import scrollTo from "../_util/scrollTo.js";
import { useAnchorProvider } from "./context.js";
import AnchorLink_default from "./AnchorLink.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, nextTick, ref, shallowRef, watch, watchEffect } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
import scrollIntoView from "scroll-into-view-if-needed";

//#region src/anchor/Anchor.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const sharpMatcherRegex = /#([\S ]+)$/;
const defaultProps = {
	affix: true,
	direction: "vertical"
};
function getDefaultContainer() {
	return window;
}
function getOffsetTop(element, container) {
	if (!element.getClientRects().length) return 0;
	const rect = element.getBoundingClientRect();
	if (rect.width || rect.height) {
		if (container === window) return rect.top - element.ownerDocument.documentElement.clientTop;
		return rect.top - container.getBoundingClientRect().top;
	}
	return rect.top;
}
const Anchor = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const links = ref([]);
	const activeLink = shallowRef();
	const _activeLink = shallowRef(activeLink.value);
	const activeLinkRef = computed({
		get: () => _activeLink.value,
		set: (val) => {
			_activeLink.value = val;
		}
	});
	const wrapperRef = shallowRef();
	const spanLinkNode = shallowRef();
	const animating = shallowRef(false);
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, getTargetContainer } = useComponentBaseConfig("anchor", props);
	const { direction: anchorDirection, classes, styles } = toPropsRefs$1(props, "direction", "classes", "styles");
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const getCurrentContainer = () => props?.getContainer?.() ?? getTargetContainer?.() ?? getDefaultContainer?.();
	const dependencyListItem = computed(() => JSON.stringify(links.value));
	const registerLink = (link) => {
		if (!links.value.includes(link)) links.value.push(link);
	};
	const unregisterLink = (link) => {
		links.value = links.value.filter((item) => item !== link);
	};
	const updateInk = () => {
		const linkNode = wrapperRef.value?.querySelector(`.${prefixCls.value}-link-title-active`);
		if (linkNode && spanLinkNode.value) {
			const { style: inkStyle } = spanLinkNode.value;
			const horizontalAnchor = props.direction === "horizontal";
			inkStyle.top = horizontalAnchor ? "" : `${linkNode.offsetTop + linkNode.clientHeight / 2}px`;
			inkStyle.height = horizontalAnchor ? "" : `${linkNode.clientHeight}px`;
			inkStyle.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : "";
			inkStyle.width = horizontalAnchor ? `${linkNode.clientWidth}px` : "";
			if (horizontalAnchor) scrollIntoView(linkNode, {
				scrollMode: "if-needed",
				block: "nearest"
			});
		}
	};
	const getInternalCurrentAnchor = (_links, _offsetTop = 0, _bounds = 5) => {
		const linkSections = [];
		const container = getCurrentContainer();
		_links.forEach((link) => {
			const sharpLinkMatch = sharpMatcherRegex.exec(link?.toString());
			if (!sharpLinkMatch) return;
			const target = document.getElementById(sharpLinkMatch[1]);
			if (target) {
				const top = getOffsetTop(target, container);
				if (top <= _offsetTop + _bounds) linkSections.push({
					link,
					top
				});
			}
		});
		if (linkSections.length) return linkSections.reduce((prev, curr) => curr.top > prev.top ? curr : prev).link;
		return "";
	};
	const setCurrentActiveLink = (link) => {
		if (activeLinkRef.value === link) return;
		const getCurrentAnchor = props.getCurrentAnchor;
		const newLink = typeof getCurrentAnchor === "function" ? getCurrentAnchor(link) : link;
		activeLink.value = newLink;
		activeLinkRef.value = newLink;
		emit("change", link);
	};
	const handleScroll = () => {
		if (animating.value) return;
		setCurrentActiveLink(getInternalCurrentAnchor(links.value, props.targetOffset !== void 0 ? props.targetOffset : props.offsetTop || 0, props.bounds));
	};
	const handleScrollTo = (link) => {
		const { offsetTop, targetOffset } = props;
		setCurrentActiveLink(link);
		const sharpLinkMatch = sharpMatcherRegex.exec(link);
		if (!sharpLinkMatch) return;
		const targetElement = document.getElementById(sharpLinkMatch[1]);
		if (!targetElement) return;
		const container = getCurrentContainer();
		let y = getScroll_default(container) + getOffsetTop(targetElement, container);
		y -= targetOffset !== void 0 ? targetOffset : offsetTop || 0;
		animating.value = true;
		scrollTo(y, {
			getContainer: getCurrentContainer,
			callback() {
				animating.value = false;
			}
		});
	};
	const mergedProps = computed(() => {
		return {
			...props,
			direction: anchorDirection.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	useAnchorProvider({
		unregisterLink,
		registerLink,
		scrollTo: handleScrollTo,
		onClick: (e, link) => {
			emit("click", e, link);
		},
		activeLink,
		classes: mergedClassNames,
		styles: mergedStyles,
		direction: anchorDirection
	});
	watch(dependencyListItem, async (_n, _o, onCleanup) => {
		if (!canUseDom()) return;
		await nextTick();
		const scrollContainer = getCurrentContainer();
		handleScroll();
		scrollContainer?.addEventListener("scroll", handleScroll);
		onCleanup(() => {
			scrollContainer?.removeEventListener("scroll", handleScroll);
		});
	}, { immediate: true });
	watchEffect(() => {
		if (typeof props.getCurrentAnchor === "function") setCurrentActiveLink(props?.getCurrentAnchor(activeLinkRef.value || ""));
	});
	watch([
		() => props.direction,
		() => props.getCurrentAnchor,
		dependencyListItem,
		activeLink
	], async () => {
		await nextTick();
		updateInk();
	}, { immediate: true });
	return () => {
		const { rootClass, affix, showInkInFixed, offsetTop } = props;
		const wrapperClass = clsx$1(hashId.value, cssVarCls.value, rootCls.value, rootClass, `${prefixCls.value}-wrapper`, {
			[`${prefixCls.value}-wrapper-horizontal`]: anchorDirection.value === "horizontal",
			[`${prefixCls.value}-rtl`]: direction.value === "rtl"
		}, attrs.class, contextClassName.value, mergedClassNames.value?.root);
		const anchorClass = classNames(prefixCls.value, { [`${prefixCls.value}-fixed`]: !affix && !showInkInFixed });
		const inkClass = classNames(`${prefixCls.value}-ink`, mergedClassNames.value?.indicator, { [`${prefixCls.value}-ink-visible`]: activeLink.value });
		const wrapperStyle = [
			{ maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : "100vh" },
			mergedStyles.value.root,
			contextStyle.value,
			attrs.style
		];
		const createNestedLink = (options) => {
			return Array.isArray(options) ? options.map((item) => {
				const _item = filterEmpty(slots?.item?.(item)) || [];
				return createVNode(AnchorLink_default, mergeProps({ "replace": props.replace }, item, {
					"title": _item.length ? _item : item.title,
					"key": item.key
				}), { default: () => [anchorDirection.value === "vertical" && createNestedLink(item.children)] });
			}) : null;
		};
		const anchorContent = createVNode("div", {
			"ref": wrapperRef,
			"class": wrapperClass,
			"style": wrapperStyle
		}, [createVNode("div", { "class": anchorClass }, [createVNode("span", {
			"class": inkClass,
			"ref": spanLinkNode,
			"style": mergedStyles.value.indicator
		}, null), createNestedLink(props.items)])]);
		const affixProps = affix && typeof affix === "object" ? affix : void 0;
		return createVNode(Fragment, null, [affix ? createVNode(Affix, mergeProps({
			"offsetTop": props.offsetTop,
			"target": getCurrentContainer
		}, affixProps), _isSlot(anchorContent) ? anchorContent : { default: () => [anchorContent] }) : anchorContent]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		offsetTop: {
			type: Number,
			required: false
		},
		bounds: {
			type: Number,
			required: false
		},
		affix: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		showInkInFixed: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getContainer: {
			type: Function,
			required: false
		},
		getCurrentAnchor: {
			type: Function,
			required: false
		},
		targetOffset: {
			type: Number,
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		direction: {
			type: String,
			required: false
		},
		replace: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, defaultProps),
	emits: ["click", "change"],
	name: "AAnchor",
	inheritAttrs: false
});
Anchor.install = (app) => {
	app.component(Anchor.name, Anchor);
};
var Anchor_default = Anchor;

//#endregion
export { Anchor_default as default };