import { formatValue, isInRange, isSameDecade } from "../../utils/dateUtil.js";
import { providePanelContext, useInfo, useSharedPanelContext } from "../context.js";
import PanelBody_default from "../PanelBody.js";
import PanelHeader_default from "../PanelHeader.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var DecadePanel_default = /* @__PURE__ */ defineComponent((props) => {
	const sharedContext = useSharedPanelContext();
	providePanelContext(computed(() => {
		const [info] = useInfo(props, "decade", sharedContext);
		return info;
	}));
	return () => {
		const { prefixCls, locale = {}, generateConfig = {}, pickerValue, disabledDate, onPickerValueChange } = props;
		const panelPrefixCls = `${prefixCls}-decade-panel`;
		const cellYearFormat = locale?.cellYearFormat || "YYYY";
		const yearFormat = locale?.yearFormat || "YYYY";
		const getStartYear = (date) => {
			const startYear = Math.floor(generateConfig.getYear(date) / 100) * 100;
			return generateConfig.setYear(date, startYear);
		};
		const getEndYear = (date) => {
			const startYear = getStartYear(date);
			return generateConfig.addYear(startYear, 99);
		};
		const startYearDate = getStartYear(pickerValue);
		const endYearDate = getEndYear(pickerValue);
		const baseDate = generateConfig.addYear(startYearDate, -10);
		const getCellDate = (date, offset) => {
			return generateConfig.addYear(date, offset * 10);
		};
		const getCellText = (date) => {
			return `${formatValue(date, {
				locale,
				format: cellYearFormat,
				generateConfig
			})}-${formatValue(generateConfig.addYear(date, 9), {
				locale,
				format: cellYearFormat,
				generateConfig
			})}`;
		};
		const getCellClassName = (date) => {
			return { [`${prefixCls}-cell-in-view`]: isSameDecade(generateConfig, date, startYearDate) || isSameDecade(generateConfig, date, endYearDate) || isInRange(generateConfig, startYearDate, endYearDate, date) };
		};
		const mergedDisabledDate = disabledDate ? (currentDate, disabledInfo) => {
			const baseStartDate = generateConfig.setDate(currentDate, 1);
			const baseStartMonth = generateConfig.setMonth(baseStartDate, 0);
			const baseStartYear = generateConfig.setYear(baseStartMonth, Math.floor(generateConfig.getYear(baseStartMonth) / 10) * 10);
			const baseEndYear = generateConfig.addYear(baseStartYear, 10);
			const baseEndDate = generateConfig.addDate(baseEndYear, -1);
			return disabledDate(baseStartYear, disabledInfo) && disabledDate(baseEndDate, disabledInfo);
		} : void 0;
		const yearNode = `${formatValue(startYearDate, {
			locale,
			format: yearFormat,
			generateConfig
		})}-${formatValue(endYearDate, {
			locale,
			format: yearFormat,
			generateConfig
		})}`;
		return createVNode("div", { "class": panelPrefixCls }, [createVNode(PanelHeader_default, {
			"superOffset": (distance, date) => generateConfig.addYear(date, distance * 100),
			"onChange": onPickerValueChange,
			"getStart": getStartYear,
			"getEnd": getEndYear
		}, _isSlot(yearNode) ? yearNode : { default: () => [yearNode] }), createVNode(PanelBody_default, mergeProps(props, {
			"disabledDate": mergedDisabledDate,
			"colNum": 3,
			"rowNum": 4,
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
	name: "DecadePanel",
	inheritAttrs: false
});
export { DecadePanel_default as default };
