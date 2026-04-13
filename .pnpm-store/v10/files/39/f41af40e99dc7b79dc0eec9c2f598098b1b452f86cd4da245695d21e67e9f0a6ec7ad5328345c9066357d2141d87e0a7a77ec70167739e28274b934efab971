import en_US_default from "../locale/en_US.js";
import useLocale_default from "../locale/useLocale.js";
import checkbox_default from "../checkbox/index.js";
import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
import { DeleteOutlined } from "@antdv-next/icons";

//#region src/transfer/ListItem.tsx
const ListItem = /* @__PURE__ */ defineComponent((props) => {
	const [contextLocale] = useLocale_default("Transfer", en_US_default.Transfer);
	return () => {
		const { prefixCls, classes: classNames, styles, renderedText, renderedEl, item, checked, disabled, onClick, onRemove, showRemove } = props;
		const mergedDisabled = disabled || item?.disabled;
		const classes = clsx(`${prefixCls}-content-item`, classNames.item, {
			[`${prefixCls}-content-item-disabled`]: mergedDisabled,
			[`${prefixCls}-content-item-checked`]: checked && !mergedDisabled
		});
		let title;
		if (typeof renderedText === "string" || typeof renderedText === "number") title = String(renderedText);
		const labelNode = createVNode("span", {
			"class": clsx(`${prefixCls}-content-item-text`, classNames.itemContent),
			"style": styles.itemContent
		}, [renderedEl]);
		if (showRemove) return createVNode("li", {
			"class": classes,
			"style": styles.item,
			"title": title
		}, [labelNode, createVNode("button", {
			"type": "button",
			"disabled": mergedDisabled,
			"class": `${prefixCls}-content-item-remove`,
			"aria-label": contextLocale?.value?.remove,
			"onClick": () => onRemove?.(item)
		}, [createVNode(DeleteOutlined, null, null)])]);
		return createVNode("li", {
			"class": classes,
			"style": styles.item,
			"title": title,
			"onClick": mergedDisabled ? void 0 : (event) => onClick(item, event)
		}, [createVNode(checkbox_default, {
			"class": clsx(`${prefixCls}-checkbox`, classNames.itemIcon),
			"style": styles.itemIcon,
			"checked": checked,
			"disabled": mergedDisabled
		}, null), labelNode]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		classes: {
			type: Object,
			required: true
		},
		styles: {
			type: Object,
			required: true
		},
		renderedText: {
			type: [String, Number],
			required: false
		},
		renderedEl: {
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
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: true
		},
		onRemove: {
			type: Function,
			required: false
		},
		item: {
			type: Object,
			required: true
		},
		showRemove: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "ATransferListItem",
	inheritAttrs: false
});
var ListItem_default = ListItem;

//#endregion
export { ListItem_default as default };