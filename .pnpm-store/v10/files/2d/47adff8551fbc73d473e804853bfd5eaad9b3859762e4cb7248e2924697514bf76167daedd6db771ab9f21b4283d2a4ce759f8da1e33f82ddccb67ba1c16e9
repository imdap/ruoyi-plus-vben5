import { useComponentBaseConfig, useConfig } from "../config-provider/context.js";
import { pureAttrs, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import wave_default from "../_util/wave/index.js";
import { replaceElement } from "../_util/vueNode.js";
import useClosable, { pickClosable } from "../_util/hooks/useClosable.js";
import style_default from "./style/index.js";
import CheckableTag_default from "./CheckableTag.js";
import CheckableTagGroup_default from "./CheckableTagGroup.js";
import useColor from "./hooks/useColor.js";
import presetCmp_default from "./style/presetCmp.js";
import statusCmp_default from "./style/statusCmp.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/tag/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const InternalTag = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit, expose }) => {
	const configContext = useConfig();
	const { prefixCls, direction, class: contextClassName, variant: contextVariant, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("tag", props, ["variant"]);
	const { variant, href, target, disabled: customDisabled, color, bordered, classes, styles } = toPropsRefs$1(props, "classes", "styles", "variant", "href", "target", "disabled", "color", "bordered");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const [mergedVariant, mergedColor, isPreset, isStatus, customTagStyle] = useColor({
		bordered,
		variant,
		color
	}, contextVariant);
	const isInternalColor = computed(() => isPreset.value || isStatus.value);
	const disabled = useDisabledContext();
	const mergedDisabled = computed(() => customDisabled?.value ?? disabled.value);
	const visible = shallowRef(true);
	const tagRef = shallowRef();
	const mergedProps = computed(() => {
		return {
			...props,
			color: mergedColor?.value,
			variant: mergedVariant?.value,
			disabled: mergedDisabled?.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	expose({ tagRef });
	const handleCloseClick = (e) => {
		if (mergedDisabled.value) return;
		e.stopPropagation();
		emit("close", e);
		if (e.defaultPrevented) return;
		visible.value = false;
	};
	const closableInfo = useClosable(pickClosable(computed(() => ({
		...props,
		closeIcon: getSlotPropsFnRun(slots, props, "closeIcon")
	}))), pickClosable(computed(() => configContext.value.tag)), computed(() => {
		return {
			closable: false,
			closeIconRender(iconNode) {
				return replaceElement(iconNode, createVNode("span", {
					"class": `${prefixCls.value}-close-icon`,
					"onClick": handleCloseClick
				}, [iconNode]), (originProps) => {
					return {
						onClick(e) {
							originProps?.onClick?.(e);
							handleCloseClick(e);
						},
						class: classNames(originProps?.class, `${prefixCls.value}-close-icon`)
					};
				});
			}
		};
	}));
	const tagStyle = computed(() => {
		let nextTagStyle = {
			...mergedStyles.value?.root,
			...contextStyle.value,
			...attrs.style
		};
		if (!mergedDisabled.value) nextTagStyle = {
			...customTagStyle.value,
			...nextTagStyle
		};
		return nextTagStyle;
	});
	return () => {
		const tagClassName = classNames(prefixCls.value, contextClassName.value, mergedClassNames.value.root, `${prefixCls.value}-${mergedVariant.value}`, {
			[`${prefixCls.value}-${mergedColor.value}`]: isInternalColor.value,
			[`${prefixCls.value}-hidden`]: !visible.value,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-disabled`]: mergedDisabled.value
		}, attrs.class, props.rootClass, hashId.value, cssVarCls.value);
		const children = filterEmpty(slots?.default?.())[0];
		const isNeedWave = children && children.type === "a" || typeof props.onClick === "function";
		const iconNode = getSlotPropsFnRun(slots, props, "icon");
		let iconNodes = iconNode;
		if (iconNode) iconNodes = createVNode(iconNode, {
			class: mergedClassNames.value?.icon,
			style: mergedStyles.value?.icon
		});
		const kids = iconNodes ? createVNode(Fragment, null, [iconNodes, children && createVNode("span", {
			"class": mergedClassNames.value.content,
			"style": mergedStyles.value.content
		}, [children])]) : children;
		const TagWrapper = href.value ? "a" : "span";
		const mergedCloseIcon = closableInfo.value?.[1];
		const tagNode = createVNode(TagWrapper, mergeProps(pureAttrs(attrs), {
			"class": tagClassName,
			"style": tagStyle.value,
			"href": mergedDisabled.value ? void 0 : href.value,
			"target": target.value,
			"onClick": mergedDisabled.value ? void 0 : props.onClick
		}, href.value && mergedDisabled.value ? { "aria-disabled": true } : {}), { default: () => [
			kids,
			mergedCloseIcon,
			isPreset.value && createVNode(presetCmp_default, {
				"key": "preset",
				"prefixCls": prefixCls.value
			}, null),
			isStatus.value && createVNode(statusCmp_default, {
				"key": "status",
				"prefixCls": prefixCls.value
			}, null)
		] });
		return isNeedWave ? createVNode(wave_default, { "component": "Tag" }, _isSlot(tagNode) ? tagNode : { default: () => [tagNode] }) : tagNode;
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		color: { required: false },
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		closeIcon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		icon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false
		},
		href: {
			type: String,
			required: false
		},
		target: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		variant: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, {
		bordered: true,
		closable: void 0
	}),
	emits: ["close"],
	name: "ATag",
	inheritAttrs: false
});
const Tag = InternalTag;
Tag.CheckableTag = CheckableTag_default;
Tag.install = (app) => {
	app.component(InternalTag.name, Tag);
	app.component(CheckableTag_default.name, CheckableTag_default);
	app.component(CheckableTagGroup_default.name, CheckableTagGroup_default);
};
var tag_default = Tag;

//#endregion
export { CheckableTag_default as CheckableTag, CheckableTagGroup_default as CheckableTagGroup, tag_default as default };