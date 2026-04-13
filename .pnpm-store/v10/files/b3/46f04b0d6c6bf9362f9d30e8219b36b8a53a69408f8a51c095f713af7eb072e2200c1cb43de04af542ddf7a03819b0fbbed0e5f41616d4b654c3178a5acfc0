import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import { resolveSlotsNode } from "../_util/vnode/index.js";
import { matchScreen } from "../_util/responsiveObserver.js";
import { useBreakpoint } from "../grid/index.js";
import constant_default from "./constant.js";
import { useDescriptionsProvider } from "./DescriptionsContext.js";
import useItems from "./hooks/useItems.js";
import useRow_default from "./hooks/useRow.js";
import Item_default, { DESCRIPTIONS_ITEM_MARK } from "./Item.js";
import Row_default from "./Row.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/descriptions/index.tsx
const Descriptions = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, prefixCls, direction } = useComponentBaseConfig("descriptions", props);
	const { classes, styles } = toPropsRefs(props, "classes", "styles");
	const screens = useBreakpoint();
	const items = computed(() => {
		if (props.items) return props.items;
		return resolveSlotsNode(slots, "default", void 0, DESCRIPTIONS_ITEM_MARK).map((item) => {
			return {
				...item,
				content: item.content ?? item.children
			};
		});
	});
	const customizeSize = computed(() => props.size);
	const mergedColumn = computed(() => {
		if (typeof props.column === "number") return props.column;
		return matchScreen(screens.value, {
			...constant_default,
			...props?.column
		}) ?? 3;
	});
	const mergedItems = useItems(screens, items);
	const mergedSize = useSize(customizeSize);
	const rows = useRow_default(mergedColumn, mergedItems);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedProps = computed(() => {
		return {
			...props,
			column: mergedColumn.value,
			items: mergedItems.value,
			size: mergedSize.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	if (isDev) devUseWarning("Descriptions").deprecated(props.size !== "default", "size=\"default\"", "size=\"large\"");
	useDescriptionsProvider(computed(() => {
		return {
			styles: {
				content: mergedStyles.value?.content,
				label: mergedStyles.value.label
			},
			classes: {
				content: mergedClassNames.value.content,
				label: mergedClassNames.value.label
			}
		};
	}));
	return () => {
		const { bordered, rootClass, colon, layout } = props;
		const title = getSlotPropsFnRun(slots, props, "title");
		const extra = getSlotPropsFnRun(slots, props, "extra");
		const labelRender = slots?.labelRender ?? props?.labelRender;
		const contentRender = slots?.contentRender ?? props?.contentRender;
		return createVNode("div", mergeProps({
			"class": classNames(prefixCls.value, contextClassName.value, mergedClassNames.value.root, {
				[`${prefixCls.value}-medium`]: mergedSize.value === "medium" || mergedSize.value === "middle",
				[`${prefixCls.value}-small`]: mergedSize.value === "small",
				[`${prefixCls.value}-bordered`]: !!bordered,
				[`${prefixCls.value}-rtl`]: direction.value === "rtl"
			}, attrs.class, rootClass, hashId.value, cssVarCls.value),
			"id": props.id,
			"style": [
				contextStyle,
				mergedStyles.value.root,
				attrs.style
			]
		}, omit(attrs, ["class", "style"])), [(!!title || !!extra) && createVNode("div", {
			"class": classNames(`${prefixCls.value}-header`, mergedClassNames.value?.header),
			"style": mergedStyles.value.header
		}, [!!title && createVNode("div", {
			"class": classNames(`${prefixCls.value}-title`, mergedClassNames.value.title),
			"style": mergedStyles.value.title
		}, [title]), !!extra && createVNode("div", {
			"class": classNames(`${prefixCls.value}-extra`, mergedClassNames.value.extra),
			"style": mergedStyles.value.extra
		}, [extra])]), createVNode("div", { "class": `${prefixCls.value}-view` }, [createVNode("table", null, [createVNode("tbody", null, [rows.value.map((row, index) => createVNode(Row_default, {
			"key": index,
			"index": index,
			"labelRender": labelRender,
			"contentRender": contentRender,
			"colon": !!colon,
			"prefixCls": prefixCls.value,
			"vertical": layout === "vertical",
			"bordered": bordered,
			"row": row
		}, null))])])])]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
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
			required: false,
			default: void 0
		},
		extra: {
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
		labelRender: {
			type: Function,
			required: false
		},
		contentRender: {
			type: Function,
			required: false
		},
		column: {
			type: [Number, Object],
			required: false
		},
		layout: {
			type: String,
			required: false
		},
		colon: {
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
		items: {
			type: Array,
			required: false
		},
		id: {
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
	}, { colon: true }),
	name: "ADescriptions",
	inheritAttrs: false
});
Descriptions.install = (app) => {
	app.component(Descriptions.name, Descriptions);
	app.component(Item_default.name, Item_default);
};
Descriptions.Item = Item_default;
var descriptions_default = Descriptions;

//#endregion
export { Item_default as DescriptionsItem, descriptions_default as default };