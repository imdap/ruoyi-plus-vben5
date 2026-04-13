import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1 } from "../_util/hooks/useMergeSemantic.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useAvatarProvider } from "./AvatarContext.js";
import style_default from "./style/index.js";
import Avatar_default from "./Avatar.js";
import popover_default from "../popover/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/avatar/AvatarGroup.tsx
const AvatarGroup = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { prefixCls, direction } = useComponentBaseConfig("avatar", props);
	const groupPrefixCls = computed(() => `${prefixCls.value}-group`);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	useAvatarProvider(computed(() => {
		return {
			size: props.size,
			shape: props.shape
		};
	}));
	return () => {
		const { rootClass, max } = props;
		const children = filterEmpty(slots?.default?.() ?? []);
		const { className, style, restAttrs } = getAttrStyleAndClass$1(attrs);
		const cls = clsx(groupPrefixCls.value, { [`${groupPrefixCls.value}-rtl`]: direction.value === "rtl" }, cssVarCls.value, rootCls.value, className, rootClass, hashId.value);
		const childrenWithProps = children.map((child, index) => {
			if (isVNode(child)) return createVNode(child, { key: `avatar-key-${index}` });
			return child;
		});
		const mergeCount = max?.count;
		const numOfChildren = childrenWithProps.length;
		if (mergeCount && mergeCount < numOfChildren) {
			const childrenShow = childrenWithProps.slice(0, mergeCount);
			const childrenHidden = childrenWithProps.slice(mergeCount, numOfChildren);
			const mergeStyle = max?.style;
			const mergePopoverTrigger = max?.popover?.trigger || "hover";
			const mergePopoverPlacement = max?.popover?.placement || "top";
			const popoverProps = {
				content: () => childrenHidden,
				...max?.popover,
				placement: mergePopoverPlacement,
				trigger: mergePopoverTrigger,
				rootClass: clsx(`${groupPrefixCls.value}-popover`, max?.popover?.rootClass)
			};
			childrenShow.push(createVNode(popover_default, mergeProps({
				"key": "avatar-popover-key",
				"destroyOnHidden": true
			}, popoverProps), { default: () => [createVNode(Avatar_default, { "style": mergeStyle }, { default: () => [`+${numOfChildren - mergeCount}`] })] }));
			return createVNode("div", mergeProps(restAttrs, {
				"class": cls,
				"style": style
			}), [childrenShow]);
		}
		return createVNode("div", mergeProps(restAttrs, {
			"class": cls,
			"style": style
		}), [childrenWithProps]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		max: {
			type: Object,
			required: false
		},
		size: {
			type: [
				String,
				null,
				Number,
				Object
			],
			required: false
		},
		shape: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		}
	},
	name: "AAvatarGroup",
	inheritAttrs: false
});
AvatarGroup.install = (app) => {
	app.component(AvatarGroup.name, AvatarGroup);
};
var AvatarGroup_default = AvatarGroup;

//#endregion
export { AvatarGroup_default as default };