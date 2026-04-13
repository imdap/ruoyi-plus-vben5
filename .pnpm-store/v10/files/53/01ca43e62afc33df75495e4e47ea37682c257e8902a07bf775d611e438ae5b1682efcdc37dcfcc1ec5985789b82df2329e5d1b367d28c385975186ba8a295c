import { useComponentBaseConfig, useComponentConfig } from "../config-provider/context.js";
import { pureAttrs, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useLocale_default from "../locale/useLocale.js";
import empty_default$1 from "./empty.js";
import simple_default from "./simple.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/empty/index.tsx
const defaultEmptyImg = createVNode(empty_default$1, null, null);
const simpleEmptyImg = createVNode(simple_default, null, null);
const Empty = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const componentConfig = useComponentConfig("empty");
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("empty", props);
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(computed(() => props)));
	const [locale] = useLocale_default("Empty");
	return () => {
		const des = getSlotPropsFnRun(slots, props, "description") ?? locale?.value?.description;
		const alt = typeof des === "string" ? des : "empty";
		const mergedImage = getSlotPropsFnRun(slots, props, "image") ?? componentConfig.value?.image ?? defaultEmptyImg;
		let imageNode = null;
		if (typeof mergedImage === "string") imageNode = createVNode("img", {
			"draggable": false,
			"alt": alt,
			"src": mergedImage
		}, null);
		else imageNode = mergedImage;
		const children = filterEmpty(slots?.default?.() ?? []);
		return createVNode("div", mergeProps({
			"class": classNames(hashId.value, cssVarCls.value, prefixCls.value, contextClassName.value, {
				[`${prefixCls.value}-normal`]: mergedImage === simpleEmptyImg,
				[`${prefixCls.value}-rtl`]: direction.value === "rtl"
			}, props.rootClass, mergedClassNames.value.root, attrs.class),
			"style": [
				mergedStyles.value.root,
				contextStyle.value,
				attrs.style
			]
		}, pureAttrs(attrs)), [
			createVNode("div", {
				"class": classNames(`${prefixCls.value}-image`, mergedClassNames.value.image),
				"style": mergedStyles.value.image
			}, [imageNode]),
			des && createVNode("div", {
				"class": classNames(`${prefixCls.value}-description`, mergedClassNames.value.description),
				"style": mergedStyles.value.description
			}, [des]),
			!!children.length && createVNode("div", {
				"class": classNames(`${prefixCls.value}-footer`, mergedClassNames.value.footer),
				"style": mergedStyles.value.footer
			}, [children])
		]);
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
		image: {
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
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, {
		image: void 0,
		description: void 0
	}),
	name: "AEmpty"
});
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
Empty.install = (app) => {
	app.component(Empty.name, Empty);
};
var empty_default = Empty;

//#endregion
export { empty_default as default };