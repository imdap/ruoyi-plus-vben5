import { getSlotPropsFnRun } from "../_util/tools.js";
import tooltip_default from "../tooltip/index.js";
import en_US_default from "../locale/en_US.js";
import useLocale_default from "../locale/useLocale.js";
import { useFormContext } from "./context.js";
import col_default from "../grid/col.js";
import convertToTooltipProps from "../_util/convertToTooltipProps.js";
import { Fragment, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { QuestionCircleOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";

//#region src/form/FormItemLabel.tsx
const FormItemLabel = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const [formLocale] = useLocale_default("Form");
	const formContext = useFormContext();
	return () => {
		const { labelCol, labelAlign, prefixCls, required, colon, vertical, tooltip, requiredMark, htmlFor } = props;
		const { labelAlign: contextLabelAlign, labelCol: contextLabelCol, labelWrap, colon: contextColon, classes: contextClassNames, styles: contextStyles, tooltip: contextTooltip } = formContext.value;
		const label = getSlotPropsFnRun(slots, props, "label");
		if (!label) return null;
		const mergedLabelCol = labelCol || contextLabelCol || {};
		const mergedLabelAlign = labelAlign || contextLabelAlign;
		const labelClsBasic = `${prefixCls}-item-label`;
		const labelColClassName = clsx(labelClsBasic, mergedLabelAlign === "left" && `${labelClsBasic}-left`, mergedLabelCol.class, { [`${labelClsBasic}-wrap`]: !!labelWrap });
		let labelChildren = label;
		const computedColon = colon === true || contextColon !== false && colon !== false;
		if (computedColon && !vertical && typeof label === "string" && label.trim()) labelChildren = label.replace(/[:|：]\s*$/, "");
		const tooltipProps = convertToTooltipProps(tooltip, contextTooltip);
		if (tooltipProps) {
			const { ...restTooltipProps } = tooltipProps;
			const icon = getSlotPropsFnRun({}, tooltipProps, "icon") ?? createVNode(QuestionCircleOutlined, null, null);
			const tooltipNode = createVNode(tooltip_default, omit(restTooltipProps, ["icon"]), { default: () => [createVNode("span", {
				"class": `${prefixCls}-item-tooltip`,
				"onClick": (e) => {
					e.preventDefault();
				},
				"tabindex": -1
			}, [icon])] });
			labelChildren = createVNode(Fragment, null, [labelChildren, tooltipNode]);
		}
		const isOptionalMark = requiredMark === "optional";
		const isRenderMark = typeof requiredMark === "function";
		const hideRequiredMark = requiredMark === false;
		if (isRenderMark) labelChildren = requiredMark(labelChildren, { required: !!required });
		else if (isOptionalMark && !required) labelChildren = createVNode(Fragment, null, [labelChildren, createVNode("span", {
			"class": `${prefixCls}-item-optional`,
			"title": ""
		}, [formLocale?.value?.optional || en_US_default.Form?.optional])]);
		let markType;
		if (hideRequiredMark) markType = "hidden";
		else if (isOptionalMark || isRenderMark) markType = "optional";
		const labelClassName = clsx(contextClassNames?.label, {
			[`${prefixCls}-item-required`]: required,
			[`${prefixCls}-item-required-mark-${markType}`]: markType,
			[`${prefixCls}-item-no-colon`]: !computedColon
		});
		return createVNode(col_default, mergeProps(mergedLabelCol, { "class": labelColClassName }), { default: () => [createVNode("label", mergeProps(htmlFor ? { htmlFor } : {}, labelClassName ? { class: labelClassName } : {}, {
			"style": contextStyles?.label,
			"title": typeof label === "string" ? label : ""
		}), [labelChildren])] });
	};
}, {
	props: {
		colon: {
			type: Boolean,
			required: false,
			default: void 0
		},
		htmlFor: {
			type: String,
			required: false
		},
		label: {
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
		labelAlign: {
			type: String,
			required: false
		},
		labelCol: {
			type: Object,
			required: false
		},
		requiredMark: {
			type: [
				Boolean,
				String,
				Function
			],
			required: false,
			default: void 0
		},
		tooltip: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean
			],
			required: false,
			default: void 0
		},
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: true
		}
	},
	name: "FormItemLabel",
	inheritAttrs: false
});
var FormItemLabel_default = FormItemLabel;

//#endregion
export { FormItemLabel_default as default };