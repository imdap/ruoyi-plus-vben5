import { genCssVar } from "../theme/util/genStyleUtils.js";
import { computed, createVNode } from "vue";
import { classNames } from "@v-c/util";
import { LoadingOutlined } from "@antdv-next/icons";

//#region src/timeline/useItems.tsx
function useItems(rootPrefixCls, prefixCls, mode, items, pending, pendingDot) {
	const itemCls = computed(() => `${prefixCls.value}-item`);
	const [varName] = genCssVar(rootPrefixCls.value, "cmp-steps");
	const parseItems = computed(() => {
		return items && Array.isArray(items.value) ? items.value : [];
	});
	return computed(() => {
		const mergedItems = parseItems.value.map((item, index) => {
			const { label, children, title, content, color, className, style, icon, dot, placement, position, loading, ...restProps } = item;
			let mergedStyle = style;
			let mergedClass = className;
			if (color) if ([
				"blue",
				"red",
				"green",
				"gray"
			].includes(color)) mergedClass = classNames(className, `${itemCls.value}-color-${color}`);
			else mergedStyle = {
				[varName("item-icon-dot-color")]: color,
				...style
			};
			const mergedPlacement = placement ?? position ?? (mode.value === "alternate" ? index % 2 === 0 ? "start" : "end" : mode.value);
			mergedClass = classNames(mergedClass, `${itemCls.value}-placement-${mergedPlacement}`);
			let mergedIcon = icon ?? dot;
			if (!mergedIcon && loading) mergedIcon = createVNode(LoadingOutlined, null, null);
			return {
				...restProps,
				title: title ?? label,
				content: content ?? children,
				style: mergedStyle,
				class: mergedClass,
				icon: mergedIcon,
				status: loading ? "process" : "finish"
			};
		});
		if (pending?.value) mergedItems.push({
			icon: pendingDot?.value ?? createVNode(LoadingOutlined, null, null),
			content: pending.value,
			status: "process"
		});
		return mergedItems;
	});
}
var useItems_default = useItems;

//#endregion
export { useItems_default as default };