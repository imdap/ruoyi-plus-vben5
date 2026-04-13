import { isInRange, isSameWeek } from "../../utils/dateUtil.js";
import DatePanel_default from "../DatePanel/index.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
var WeekPanel_default = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, generateConfig = {}, locale = {}, value, hoverValue, hoverRangeValue } = props;
		const localeName = locale.locale;
		const rowPrefixCls = `${prefixCls}-week-panel-row`;
		const rowClassName = (currentDate) => {
			const rangeCls = {};
			if (hoverRangeValue) {
				const [rangeStart, rangeEnd] = hoverRangeValue;
				const isRangeStart = isSameWeek(generateConfig, localeName, rangeStart, currentDate);
				const isRangeEnd = isSameWeek(generateConfig, localeName, rangeEnd, currentDate);
				rangeCls[`${rowPrefixCls}-range-start`] = isRangeStart;
				rangeCls[`${rowPrefixCls}-range-end`] = isRangeEnd;
				rangeCls[`${rowPrefixCls}-range-hover`] = !isRangeStart && !isRangeEnd && isInRange(generateConfig, rangeStart, rangeEnd, currentDate);
			}
			if (hoverValue) rangeCls[`${rowPrefixCls}-hover`] = hoverValue.some((date) => isSameWeek(generateConfig, localeName, currentDate, date));
			return clsx(rowPrefixCls, { [`${rowPrefixCls}-selected`]: !hoverRangeValue && isSameWeek(generateConfig, localeName, value, currentDate) }, rangeCls);
		};
		return createVNode(DatePanel_default, mergeProps(props, {
			"mode": "week",
			"panelName": "week",
			"rowClassName": rowClassName
		}), null);
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
	name: "WeekPanel",
	inheritAttrs: false
});
export { WeekPanel_default as default };
