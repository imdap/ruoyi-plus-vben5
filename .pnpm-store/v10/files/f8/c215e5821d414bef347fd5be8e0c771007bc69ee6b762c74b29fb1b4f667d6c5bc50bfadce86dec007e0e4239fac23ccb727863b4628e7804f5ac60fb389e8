import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";

//#region src/card/CardMeta.tsx
const CardMeta = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { prefixCls, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("cardMeta", props, [], "card");
	const { classes: cardMetaClassNames, styles } = toPropsRefs(props, "classes", "styles");
	const metaPrefixCls = computed(() => `${prefixCls.value}-meta`);
	const mergedProps = computed(() => props);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, cardMetaClassNames), useToArr(contextStyles, styles), useToProps(mergedProps));
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const rootClassNames = clsx(metaPrefixCls.value, className, contextClassName.value, mergedClassNames.value?.root);
		const rootStyles = {
			...contextStyle.value,
			...mergedStyles.value?.root,
			...style
		};
		const avatarClassNames = clsx(`${metaPrefixCls.value}-avatar`, mergedClassNames.value?.avatar);
		const titleClassNames = clsx(`${metaPrefixCls.value}-title`, mergedClassNames.value?.title);
		const descriptionClassNames = clsx(`${metaPrefixCls.value}-description`, mergedClassNames.value?.description);
		const sectionClassNames = clsx(`${metaPrefixCls.value}-section`, mergedClassNames.value?.section);
		const avatar = getSlotPropsFnRun(slots, props, "avatar");
		const title = getSlotPropsFnRun(slots, props, "title");
		const description = getSlotPropsFnRun(slots, props, "description");
		const avatarDom = avatar ? createVNode("div", {
			"class": avatarClassNames,
			"style": mergedStyles.value.avatar
		}, [avatar]) : null;
		const titleDom = title ? createVNode("div", {
			"class": titleClassNames,
			"style": mergedStyles.value.title
		}, [title]) : null;
		const descriptionDom = description ? createVNode("div", {
			"class": descriptionClassNames,
			"style": mergedStyles.value.description
		}, [description]) : null;
		const metaDetail = titleDom || descriptionDom ? createVNode("div", {
			"class": sectionClassNames,
			"style": mergedStyles.value.section
		}, [titleDom, descriptionDom]) : null;
		return createVNode("div", mergeProps(restAttrs, {
			"class": rootClassNames,
			"style": rootStyles
		}), [avatarDom, metaDetail]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		avatar: {
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
		title: {
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
		description: {
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
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		}
	},
	name: "ACardMeta",
	inheritAttrs: false
});
var CardMeta_default = CardMeta;

//#endregion
export { CardMeta_default as default };