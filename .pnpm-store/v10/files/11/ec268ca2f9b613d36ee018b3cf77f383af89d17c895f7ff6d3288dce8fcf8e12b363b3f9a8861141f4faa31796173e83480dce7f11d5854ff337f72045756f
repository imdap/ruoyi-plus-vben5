import { formatValue } from "../../utils/dateUtil.js";
import { providePanelContext, useInfo, useSharedPanelContext } from "../context.js";
import PanelBody_default from "../PanelBody.js";
import PanelHeader_default from "../PanelHeader.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var QuarterPanel_default = /* @__PURE__ */ defineComponent((props) => {
	const sharedContext = useSharedPanelContext();
	providePanelContext(computed(() => {
		const [info] = useInfo(props, "quarter", sharedContext);
		return info;
	}));
	return () => {
		const { prefixCls, locale = {}, generateConfig = {}, pickerValue, onPickerValueChange, onModeChange } = props;
		const panelPrefixCls = `${prefixCls}-quarter-panel`;
		const baseDate = generateConfig.setMonth(pickerValue, 0);
		const cellQuarterFormat = locale.cellQuarterFormat || "[Q]Q";
		const yearFormat = locale.yearFormat || "YYYY";
		const getCellDate = (date, offset) => {
			return generateConfig.addMonth(date, offset * 3);
		};
		const getCellText = (date) => {
			return formatValue(date, {
				locale,
				format: cellQuarterFormat,
				generateConfig
			});
		};
		const getCellClassName = () => ({ [`${prefixCls}-cell-in-view`]: true });
		const yearNode = createVNode("button", {
			"type": "button",
			"key": "year",
			"aria-label": locale.yearSelect,
			"onClick": () => {
				onModeChange?.("year");
			},
			"tabindex": -1,
			"class": `${prefixCls}-year-btn`
		}, [formatValue(pickerValue, {
			locale,
			format: yearFormat,
			generateConfig
		})]);
		return createVNode("div", { "class": panelPrefixCls }, [createVNode(PanelHeader_default, {
			"superOffset": (distance, date) => generateConfig.addYear(date, distance),
			"onChange": onPickerValueChange,
			"getStart": (date) => generateConfig.setMonth(date, 0),
			"getEnd": (date) => generateConfig.setMonth(date, 11)
		}, _isSlot(yearNode) ? yearNode : { default: () => [yearNode] }), createVNode(PanelBody_default, mergeProps(props, {
			"titleFormat": locale.fieldQuarterFormat,
			"colNum": 4,
			"rowNum": 1,
			"baseDate": baseDate,
			"getCellDate": getCellDate,
			"getCellText": getCellText,
			"getCellClassName": getCellClassName
		}), null)]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		locale: {
			type: Object,
			required: false,
			default: void 0
		},
		generateConfig: {
			type: Object,
			required: false,
			default: void 0
		},
		pickerValue: {
			required: true,
			default: void 0
		},
		onPickerValueChange: {
			type: Function,
			required: true,
			default: void 0
		},
		value: {
			required: false,
			default: void 0
		},
		onSelect: {
			type: Function,
			required: true,
			default: void 0
		},
		values: {
			type: Array,
			required: false,
			default: void 0
		},
		onModeChange: {
			type: Function,
			required: true,
			default: void 0
		},
		disabledDate: {
			type: Function,
			required: false,
			default: void 0
		},
		minDate: {
			required: false,
			default: void 0
		},
		maxDate: {
			required: false,
			default: void 0
		},
		cellRender: {
			type: Function,
			required: false,
			default: void 0
		},
		hoverRangeValue: {
			type: [Array, null],
			required: true,
			default: void 0
		},
		hoverValue: {
			type: [Array, null],
			required: false,
			default: void 0
		},
		onHover: {
			type: Function,
			required: false,
			default: void 0
		},
		showTime: {
			type: Object,
			required: false,
			default: void 0
		},
		showWeek: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prevIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		nextIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		superPrevIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		superNextIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		}
	},
	name: "QuarterPanel",
	inheritAttrs: false
});
export { QuarterPanel_default as default };
