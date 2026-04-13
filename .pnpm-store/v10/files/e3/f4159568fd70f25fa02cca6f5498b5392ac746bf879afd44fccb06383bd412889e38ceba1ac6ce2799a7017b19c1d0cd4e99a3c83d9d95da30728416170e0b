import { formatValue } from "../../../utils/dateUtil.js";
import useTimeInfo from "../../../hooks/useTimeInfo.js";
import { usePanelContext, usePickerHackContext } from "../../context.js";
import TimeColumn_default from "./TimeColumn.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
function isAM(hour) {
	return hour < 12;
}
var TimePanelBody_default = /* @__PURE__ */ defineComponent((props) => {
	const context = usePanelContext();
	const pickerHackContext = usePickerHackContext();
	const value = computed(() => context.value.values?.[0] || null);
	const generateConfig = computed(() => context.value.generateConfig);
	const [getValidTime, rowHourUnits, getMinuteUnits, getSecondUnits, getMillisecondUnits] = useTimeInfo(generateConfig, computed(() => props), value);
	const getUnitValue = (func) => {
		const val = value.value;
		const pickerVal = context.value.pickerValue;
		return [val && generateConfig.value[func](val), pickerVal && generateConfig.value[func](pickerVal)];
	};
	return () => {
		const { prefixCls, classNames: panelClassNames, styles, locale, onSelect, onHover } = context.value;
		const { showHour, showMinute, showSecond, showMillisecond, use12Hours: showMeridiem, changeOnScroll } = props;
		const { onCellDblClick } = pickerHackContext?.value || {};
		const [hour, pickerHour] = getUnitValue("getHour");
		const [minute, pickerMinute] = getUnitValue("getMinute");
		const [second, pickerSecond] = getUnitValue("getSecond");
		const [millisecond, pickerMillisecond] = getUnitValue("getMillisecond");
		const meridiem = hour === null ? null : isAM(hour) ? "am" : "pm";
		const hourUnits = (() => {
			if (!showMeridiem) return rowHourUnits.value;
			return isAM(hour) ? rowHourUnits.value.filter((h) => isAM(h.value)) : rowHourUnits.value.filter((h) => !isAM(h.value));
		})();
		const getEnabled = (units, val) => {
			const enabledUnits = units.filter((unit) => !unit.disabled);
			return val ?? enabledUnits?.[0]?.value;
		};
		const validHour = getEnabled(rowHourUnits.value, hour);
		const minuteUnits = getMinuteUnits(validHour);
		const validMinute = getEnabled(minuteUnits, minute);
		const secondUnits = getSecondUnits(validHour, validMinute);
		const validSecond = getEnabled(secondUnits, second);
		const millisecondUnits = getMillisecondUnits(validHour, validMinute, validSecond);
		const validMillisecond = getEnabled(millisecondUnits, millisecond);
		const meridiemUnits = (() => {
			if (!showMeridiem) return [];
			const base = generateConfig.value.getNow();
			const amDate = generateConfig.value.setHour(base, 6);
			const pmDate = generateConfig.value.setHour(base, 18);
			const formatMeridiem = (date, defaultLabel) => {
				const { cellMeridiemFormat } = locale ?? {};
				return cellMeridiemFormat ? formatValue(date, {
					generateConfig: generateConfig.value,
					locale,
					format: cellMeridiemFormat
				}) : defaultLabel;
			};
			return [{
				label: formatMeridiem(amDate, "AM"),
				value: "am",
				disabled: rowHourUnits.value.every((h) => h.disabled || !isAM(h.value))
			}, {
				label: formatMeridiem(pmDate, "PM"),
				value: "pm",
				disabled: rowHourUnits.value.every((h) => h.disabled || isAM(h.value))
			}];
		})();
		const triggerChange = (nextDate) => {
			onSelect(getValidTime(nextDate));
		};
		const triggerDateTmpl = (() => {
			let tmpl = value.value || context.value.pickerValue || generateConfig.value.getNow();
			const isNotNull = (num) => num !== null && num !== void 0;
			if (isNotNull(hour)) {
				tmpl = generateConfig.value.setHour(tmpl, hour);
				tmpl = generateConfig.value.setMinute(tmpl, minute);
				tmpl = generateConfig.value.setSecond(tmpl, second);
				tmpl = generateConfig.value.setMillisecond(tmpl, millisecond);
			} else if (isNotNull(pickerHour)) {
				tmpl = generateConfig.value.setHour(tmpl, pickerHour);
				tmpl = generateConfig.value.setMinute(tmpl, pickerMinute);
				tmpl = generateConfig.value.setSecond(tmpl, pickerSecond);
				tmpl = generateConfig.value.setMillisecond(tmpl, pickerMillisecond);
			} else if (isNotNull(validHour)) {
				tmpl = generateConfig.value.setHour(tmpl, validHour);
				tmpl = generateConfig.value.setMinute(tmpl, validMinute);
				tmpl = generateConfig.value.setSecond(tmpl, validSecond);
				tmpl = generateConfig.value.setMillisecond(tmpl, validMillisecond);
			}
			return tmpl;
		})();
		const fillColumnValue = (val, func) => {
			if (val === null) return null;
			return generateConfig.value[func](triggerDateTmpl, val);
		};
		const getNextHourTime = (val) => fillColumnValue(val, "setHour");
		const getNextMinuteTime = (val) => fillColumnValue(val, "setMinute");
		const getNextSecondTime = (val) => fillColumnValue(val, "setSecond");
		const getNextMillisecondTime = (val) => fillColumnValue(val, "setMillisecond");
		const getMeridiemTime = (val) => {
			if (val === null) return null;
			if (val === "am" && !isAM(hour)) return generateConfig.value.setHour(triggerDateTmpl, hour - 12);
			else if (val === "pm" && isAM(hour)) return generateConfig.value.setHour(triggerDateTmpl, hour + 12);
			return triggerDateTmpl;
		};
		const onHourChange = (val) => {
			triggerChange(getNextHourTime(val));
		};
		const onMinuteChange = (val) => {
			triggerChange(getNextMinuteTime(val));
		};
		const onSecondChange = (val) => {
			triggerChange(getNextSecondTime(val));
		};
		const onMillisecondChange = (val) => {
			triggerChange(getNextMillisecondTime(val));
		};
		const onMeridiemChange = (val) => {
			triggerChange(getMeridiemTime(val));
		};
		const onHourHover = (val) => {
			onHover?.(getNextHourTime(val));
		};
		const onMinuteHover = (val) => {
			onHover?.(getNextMinuteTime(val));
		};
		const onSecondHover = (val) => {
			onHover?.(getNextSecondTime(val));
		};
		const onMillisecondHover = (val) => {
			onHover?.(getNextMillisecondTime(val));
		};
		const onMeridiemHover = (val) => {
			onHover?.(getMeridiemTime(val));
		};
		const sharedColumnProps = {
			onDblClick: onCellDblClick,
			changeOnScroll
		};
		return createVNode("div", {
			"class": clsx(`${prefixCls}-content`, panelClassNames?.content),
			"style": styles?.content
		}, [
			showHour && createVNode(TimeColumn_default, mergeProps({
				"units": hourUnits,
				"value": hour,
				"optionalValue": pickerHour,
				"type": "hour",
				"onChange": onHourChange,
				"onHover": onHourHover
			}, sharedColumnProps), null),
			showMinute && createVNode(TimeColumn_default, mergeProps({
				"units": minuteUnits,
				"value": minute,
				"optionalValue": pickerMinute,
				"type": "minute",
				"onChange": onMinuteChange,
				"onHover": onMinuteHover
			}, sharedColumnProps), null),
			showSecond && createVNode(TimeColumn_default, mergeProps({
				"units": secondUnits,
				"value": second,
				"optionalValue": pickerSecond,
				"type": "second",
				"onChange": onSecondChange,
				"onHover": onSecondHover
			}, sharedColumnProps), null),
			showMillisecond && createVNode(TimeColumn_default, mergeProps({
				"units": millisecondUnits,
				"value": millisecond,
				"optionalValue": pickerMillisecond,
				"type": "millisecond",
				"onChange": onMillisecondChange,
				"onHover": onMillisecondHover
			}, sharedColumnProps), null),
			showMeridiem && createVNode(TimeColumn_default, mergeProps({
				"units": meridiemUnits,
				"value": meridiem,
				"type": "meridiem",
				"onChange": onMeridiemChange,
				"onHover": onMeridiemHover
			}, sharedColumnProps), null)
		]);
	};
}, {
	props: {
		format: {
			type: String,
			required: false,
			default: void 0
		},
		showNow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showHour: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showMinute: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showSecond: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showMillisecond: {
			type: Boolean,
			required: false,
			default: void 0
		},
		use12Hours: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hourStep: {
			required: false,
			default: void 0
		},
		minuteStep: {
			required: false,
			default: void 0
		},
		secondStep: {
			required: false,
			default: void 0
		},
		millisecondStep: {
			required: false,
			default: void 0
		},
		hideDisabledOptions: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultValue: {
			required: false,
			default: void 0
		},
		defaultOpenValue: {
			required: false,
			default: void 0
		},
		disabledHours: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledMinutes: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledSeconds: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledTime: {
			type: Function,
			required: false,
			default: void 0
		},
		changeOnScroll: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "TimePanelBody",
	inheritAttrs: false
});
export { TimePanelBody_default as default };
