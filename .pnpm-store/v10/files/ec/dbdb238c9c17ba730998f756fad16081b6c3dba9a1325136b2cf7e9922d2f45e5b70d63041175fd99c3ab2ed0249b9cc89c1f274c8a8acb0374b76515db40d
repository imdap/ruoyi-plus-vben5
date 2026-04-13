import { useBaseConfig } from "../config-provider/context.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import { useAnchorContext } from "./context.js";
import { computed, createVNode, defineComponent, nextTick, watch } from "vue";
import { classNames } from "@v-c/util";

//#region src/anchor/AnchorLink.tsx
const AnchorLink = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { registerLink, direction, unregisterLink, activeLink, scrollTo, onClick, classes: mergedClassNames, styles: mergedStyles } = useAnchorContext() ?? {};
	const { prefixCls } = useBaseConfig("anchor", props);
	watch(() => props.href, async (href, _, onCleanup) => {
		await nextTick();
		registerLink?.(href);
		onCleanup(() => {
			unregisterLink?.(href);
		});
	}, { immediate: true });
	const handleClick = (e) => {
		const { href, replace } = props;
		const title = getSlotPropsFnRun(slots, props, "title");
		onClick?.(e, {
			title,
			href
		});
		scrollTo?.(href);
		if (e.defaultPrevented) return;
		if (href.startsWith("http://") || href.startsWith("https://")) {
			if (replace) {
				e.preventDefault();
				window.location.replace(href);
			}
		}
		e.preventDefault();
		const historyMethod = replace ? "replaceState" : "pushState";
		window.history[historyMethod](null, "", href);
	};
	const active = computed(() => activeLink?.value === props.href);
	return () => {
		const { href, target } = props;
		const wrapperClassName = classNames(`${prefixCls.value}-link`, attrs.class, mergedClassNames?.value?.item, { [`${prefixCls.value}-link-active`]: active.value });
		const titleClassName = classNames(`${prefixCls.value}-link-title`, mergedClassNames?.value?.itemTitle, { [`${prefixCls.value}-link-title-active`]: active.value });
		const title = getSlotPropsFnRun(slots, props, "title");
		return createVNode("div", {
			"class": [wrapperClassName],
			"style": mergedStyles?.value?.item
		}, [createVNode("a", {
			"class": titleClassName,
			"style": mergedStyles?.value?.itemTitle,
			"href": href,
			"title": typeof title === "string" ? title : "",
			"target": target,
			"onClick": handleClick
		}, [title]), direction?.value !== "horizontal" ? slots?.default?.() : null]);
	};
}, {
	props: {
		href: {
			type: String,
			required: true
		},
		target: {
			type: String,
			required: false
		},
		title: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: true
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
	},
	emits: ["click"],
	inheritAttrs: false
});
var AnchorLink_default = AnchorLink;

//#endregion
export { AnchorLink_default as default };