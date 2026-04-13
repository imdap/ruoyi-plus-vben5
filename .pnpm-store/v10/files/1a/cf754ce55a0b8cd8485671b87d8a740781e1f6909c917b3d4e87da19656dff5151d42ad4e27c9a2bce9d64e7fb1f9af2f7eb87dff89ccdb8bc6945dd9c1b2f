import { WEEK_DAY_COUNT, formatValue, getWeekStartDate, isSameDate, isSameMonth } from "../../utils/dateUtil.js";
import { providePanelContext, useInfo, useSharedPanelContext } from "../context.js";
import PanelBody_default from "../PanelBody.js";
import PanelHeader_default from "../PanelHeader.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var DatePanel_default = /* @__PURE__ */ defineComponent((props) => {
	const sharedContext = useSharedPanelContext();
	const panelContext = computed(() => {
		const [info] = useInfo(props, props.mode || "date", sharedContext);
		return info;
	});
	providePanelContext(panelContext);
	return () => {
		const { prefixCls, panelName = "date", locale, generateConfig, pickerValue, onPickerValueChange, onModeChange, mode = "date", disabledDate, onSelect, onHover, showWeek } = props;
		const panelPrefixCls = `${prefixCls}-${panelName}-panel`;
		const cellPrefixCls = `${prefixCls}-cell`;
		const isWeek = mode === "week";
		const weekFirstDay = generateConfig?.locale?.getWeekFirstDay?.(locale.locale) ?? 0;
		const monthStartDate = generateConfig?.setDate(pickerValue, 1);
		const baseDate = getWeekStartDate(locale.locale, generateConfig, monthStartDate);
		const month = generateConfig?.getMonth?.(pickerValue);
		const cellDateFormat = locale?.cellDateFormat || locale?.dayFormat || "D";
		const yearFormat = locale?.yearFormat || "YYYY";
		const prefixColumn = (showWeek === void 0 ? isWeek : showWeek) ? (date) => {
			const disabled = disabledDate?.(date, { type: "week" });
			return createVNode("td", {
				"key": "week",
				"class": clsx(cellPrefixCls, `${cellPrefixCls}-week`, { [`${cellPrefixCls}-disabled`]: disabled }),
				"onClick": () => {
					if (!disabled) onSelect?.(date);
				},
				"onMouseenter": () => {
					if (!disabled) onHover?.(date);
				},
				"onMouseleave": () => {
					if (!disabled) onHover?.(null);
				}
			}, [createVNode("div", { "class": `${cellPrefixCls}-inner` }, [generateConfig?.locale.getWeek?.(locale.locale, date)])]);
		} : void 0;
		const headerCells = [];
		const weekDaysLocale = locale?.shortWeekDays || (generateConfig?.locale?.getShortWeekDays ? generateConfig.locale.getShortWeekDays(locale.locale) : []);
		if (prefixColumn) headerCells.push(createVNode("th", { "key": "empty" }, [createVNode("span", { "style": {
			width: 0,
			height: 0,
			position: "absolute",
			overflow: "hidden",
			opacity: 0
		} }, [locale.week])]));
		for (let i = 0; i < 7; i += 1) headerCells.push(createVNode("th", { "key": i }, [weekDaysLocale[(i + weekFirstDay) % 7]]));
		const getCellDate = (date, offset) => {
			return generateConfig?.addDate?.(date, offset);
		};
		const getCellText = (date) => {
			return formatValue(date, {
				locale,
				format: cellDateFormat,
				generateConfig
			});
		};
		const getCellClassName = (date) => {
			const nowVal = panelContext.value.now;
			return {
				[`${prefixCls}-cell-in-view`]: isSameMonth(generateConfig, date, pickerValue),
				[`${prefixCls}-cell-today`]: isSameDate(generateConfig, date, nowVal)
			};
		};
		const monthsLocale = locale?.shortMonths || (generateConfig?.locale?.getShortMonths ? generateConfig.locale.getShortMonths?.(locale.locale) : []);
		const yearNode = createVNode("button", {
			"type": "button",
			"aria-label": locale?.yearSelect,
			"key": "year",
			"onClick": () => {
				onModeChange?.("year", pickerValue);
			},
			"tabindex": -1,
			"class": `${prefixCls}-year-btn`
		}, [formatValue(pickerValue, {
			locale,
			format: yearFormat,
			generateConfig
		})]);
		const monthNode = createVNode("button", {
			"type": "button",
			"aria-label": locale?.monthSelect,
			"key": "month",
			"onClick": () => {
				onModeChange?.("month", pickerValue);
			},
			"tabindex": -1,
			"class": `${prefixCls}-month-btn`
		}, [locale?.monthFormat ? formatValue(pickerValue, {
			locale,
			format: locale.monthFormat,
			generateConfig
		}) : monthsLocale[month]]);
		const monthYearNodes = locale?.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
		return createVNode("div", { "class": clsx(panelPrefixCls, showWeek && `${panelPrefixCls}-show-week`) }, [createVNode(PanelHeader_default, {
			"offset": (distance, date) => generateConfig?.addMonth?.(date, distance),
			"superOffset": (distance, date) => generateConfig?.addYear?.(date, distance),
			"onChange": onPickerValueChange,
			"getStart": (date) => generateConfig?.setDate?.(date, 1),
			"getEnd": (date) => {
				let clone = generateConfig?.setDate?.(date, 1);
				clone = generateConfig?.addMonth(clone, 1);
				return generateConfig?.addDate(clone, -1);
			}
		}, _isSlot(monthYearNodes) ? monthYearNodes : { default: () => [monthYearNodes] }), createVNode(PanelBody_default, mergeProps(props, {
			"titleFormat": locale?.fieldDateFormat,
			"colNum": 7,
			"rowNum": 6,
			"baseDate": baseDate,
			"headerCells": headerCells,
			"getCellDate": getCellDate,
			"getCellText": getCellText,
			"getCellClassName": getCellClassName,
			"prefixColumn": prefixColumn,
			"cellSelection": !isWeek
		}), null)]);
	};
}, {
	props: {
		panelName: {
			type: String,
			required: false,
			default: void 0
		},
		rowClassName: {
			type: Function,
			required: false,
			default: void 0
		},
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		cellSelection: {
			type: Boolean,
			required: false,
			default: void 0
		},
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
	name: "DatePanel",
	inheritAttrs: false
});
export { DatePanel_default as default };
