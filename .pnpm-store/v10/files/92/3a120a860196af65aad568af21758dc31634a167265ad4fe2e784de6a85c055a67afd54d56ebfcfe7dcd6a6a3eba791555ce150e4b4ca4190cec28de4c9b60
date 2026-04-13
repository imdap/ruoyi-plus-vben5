import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import en_US_default from "./locale/en_US.js";
import useLocale_default from "../locale/useLocale.js";
import Header_default from "./Header.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeProps, ref, watch } from "vue";
import { clsx } from "@v-c/util";
import { PickerPanel } from "@v-c/picker";

//#region src/calendar/generateCalendar.tsx
const calendarProps = [
	"prefixCls",
	"rootClass",
	"classes",
	"styles",
	"locale",
	"validRange",
	"disabledDate",
	"dateFullCellRender",
	"dateCellRender",
	"monthFullCellRender",
	"monthCellRender",
	"cellRender",
	"fullCellRender",
	"headerRender",
	"value",
	"defaultValue",
	"mode",
	"fullscreen",
	"showWeek"
];
function isSameYear(date1, date2, config) {
	const { getYear } = config;
	return date1 && date2 && getYear(date1) === getYear(date2);
}
function isSameMonth(date1, date2, config) {
	const { getMonth } = config;
	return isSameYear(date1, date2, config) && getMonth(date1) === getMonth(date2);
}
function isSameDate(date1, date2, config) {
	const { getDate } = config;
	return isSameMonth(date1, date2, config) && getDate(date1) === getDate(date2);
}
function generateCalendar(generateConfig) {
	return /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
		const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("calendar", props, [], "picker");
		const mergedProps = computed(() => ({
			...props,
			mode: props.mode,
			fullscreen: props.fullscreen,
			showWeek: props.showWeek
		}));
		const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, computed(() => props.classes)), useToArr(contextStyles, computed(() => props.styles)), useToProps(mergedProps));
		const rootCls = useCSSVarCls_default(prefixCls);
		const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
		const today = generateConfig.getNow();
		const calendarPrefixCls = computed(() => `${prefixCls.value}-calendar`);
		if (isDev) {
			const warning = devUseWarning("Calendar");
			[
				["dateFullCellRender", "fullCellRender"],
				["dateCellRender", "cellRender"],
				["monthFullCellRender", "fullCellRender"],
				["monthCellRender", "cellRender"]
			].forEach(([deprecatedName, newName]) => {
				warning.deprecated(!(props[deprecatedName] !== void 0), deprecatedName, newName);
			});
		}
		const innerValue = ref(props.defaultValue || generateConfig.getNow());
		const innerMode = ref(props.mode || "month");
		watch(() => props.value, (val) => {
			if (val !== void 0) innerValue.value = val;
		});
		watch(() => props.mode, (val) => {
			if (val !== void 0) innerMode.value = val;
		});
		const mergedValue = computed(() => props.value ?? innerValue.value);
		const mergedMode = computed(() => props.mode ?? innerMode.value);
		const panelMode = computed(() => mergedMode.value === "year" ? "month" : "date");
		const mergedDisabledDate = computed(() => {
			return (date) => {
				return (props.validRange ? generateConfig.isAfter(props.validRange[0], date) || generateConfig.isAfter(date, props.validRange[1]) : false) || !!props.disabledDate?.(date);
			};
		});
		const triggerPanelChange = (date, newMode) => {
			emit("panelChange", date, newMode);
		};
		const triggerChange = (date) => {
			if (props.value === void 0) innerValue.value = date;
			if (!isSameDate(date, mergedValue.value, generateConfig)) {
				if (panelMode.value === "date" && !isSameMonth(date, mergedValue.value, generateConfig) || panelMode.value === "month" && !isSameYear(date, mergedValue.value, generateConfig)) triggerPanelChange(date, mergedMode.value);
				emit("update:value", date);
				emit("change", date);
			}
		};
		const triggerModeChange = (newMode) => {
			if (props.mode === void 0) innerMode.value = newMode;
			triggerPanelChange(mergedValue.value, newMode);
		};
		const onInternalSelect = (date, source) => {
			triggerChange(date);
			emit("select", date, { source });
		};
		const resolveRender = (key, args, slotParams) => {
			const slot = slots?.[key];
			if (slot) return slot(slotParams);
			const propValue = props[key];
			if (typeof propValue === "function") return propValue(...args);
			return propValue;
		};
		const dateRender = (date, info) => {
			if (slots.fullCellRender || props.fullCellRender) return resolveRender("fullCellRender", [date, info], {
				date,
				info
			});
			if (slots.dateFullCellRender || props.dateFullCellRender) return resolveRender("dateFullCellRender", [date], { date });
			const cellContent = slots.cellRender || props.cellRender ? resolveRender("cellRender", [date, info], {
				date,
				info
			}) : resolveRender("dateCellRender", [date], { date });
			return createVNode("div", { "class": clsx(`${prefixCls.value}-cell-inner`, `${calendarPrefixCls.value}-date`, { [`${calendarPrefixCls.value}-date-today`]: isSameDate(today, date, generateConfig) }) }, [createVNode("div", { "class": `${calendarPrefixCls.value}-date-value` }, [String(generateConfig.getDate(date)).padStart(2, "0")]), createVNode("div", { "class": `${calendarPrefixCls.value}-date-content` }, [cellContent])]);
		};
		const monthRender = (date, info) => {
			if (slots.fullCellRender || props.fullCellRender) return resolveRender("fullCellRender", [date, info], {
				date,
				info
			});
			if (slots.monthFullCellRender || props.monthFullCellRender) return resolveRender("monthFullCellRender", [date], { date });
			const months = info.locale?.shortMonths || generateConfig.locale.getShortMonths(info.locale?.locale);
			const cellContent = slots.cellRender || props.cellRender ? resolveRender("cellRender", [date, info], {
				date,
				info
			}) : resolveRender("monthCellRender", [date], { date });
			return createVNode("div", { "class": clsx(`${prefixCls.value}-cell-inner`, `${calendarPrefixCls.value}-date`, { [`${calendarPrefixCls.value}-date-today`]: isSameMonth(today, date, generateConfig) }) }, [createVNode("div", { "class": `${calendarPrefixCls.value}-date-value` }, [months[generateConfig.getMonth(date)]]), createVNode("div", { "class": `${calendarPrefixCls.value}-date-content` }, [cellContent])]);
		};
		const [contextLocale] = useLocale_default("Calendar", en_US_default);
		const locale = computed(() => ({
			...contextLocale?.value,
			...props.locale ?? {}
		}));
		const mergedCellRender = (current, info) => {
			if (info.type === "date") return dateRender(current, info);
			if (info.type === "month") return monthRender(current, {
				...info,
				locale: locale.value?.lang
			});
		};
		const splitClassNames = computed(() => {
			const { root, header, ...panelClassNames } = mergedClassNames.value;
			return {
				root,
				header,
				panelClassNames
			};
		});
		const splitStyles = computed(() => {
			const { root, header, ...panelStyles } = mergedStyles.value;
			return {
				root,
				header,
				panelStyles
			};
		});
		return () => {
			const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
			const { root, header, panelClassNames } = splitClassNames.value;
			const { root: rootStyle, header: headerStyle, panelStyles } = splitStyles.value;
			const headerConfig = {
				value: mergedValue.value,
				type: mergedMode.value,
				onChange: (nextDate) => {
					onInternalSelect(nextDate, "customize");
				},
				onTypeChange: triggerModeChange
			};
			const hasHeaderRender = slots.headerRender || props.headerRender;
			const headerNode = hasHeaderRender ? resolveRender("headerRender", [headerConfig], headerConfig) : void 0;
			return createVNode("div", mergeProps({
				"class": clsx(calendarPrefixCls.value, {
					[`${calendarPrefixCls.value}-full`]: props.fullscreen !== false,
					[`${calendarPrefixCls.value}-mini`]: props.fullscreen === false,
					[`${calendarPrefixCls.value}-rtl`]: direction.value === "rtl"
				}, contextClassName.value, props.rootClass, root, rootCls.value, hashId.value, cssVarCls.value, className),
				"style": {
					...rootStyle,
					...contextStyle.value,
					...style
				}
			}, restAttrs), [hasHeaderRender ? headerNode : createVNode(Header_default, {
				"className": header,
				"style": headerStyle,
				"prefixCls": calendarPrefixCls.value,
				"value": mergedValue.value,
				"generateConfig": generateConfig,
				"mode": mergedMode.value,
				"fullscreen": props.fullscreen !== false,
				"locale": locale.value?.lang,
				"validRange": props.validRange,
				"onChange": onInternalSelect,
				"onModeChange": triggerModeChange
			}, null), createVNode(PickerPanel, {
				"classNames": panelClassNames,
				"styles": panelStyles,
				"value": mergedValue.value,
				"prefixCls": prefixCls.value,
				"locale": locale.value?.lang,
				"generateConfig": generateConfig,
				"cellRender": mergedCellRender,
				"onSelect": (nextDate) => {
					onInternalSelect(nextDate, panelMode.value);
				},
				"mode": panelMode.value,
				"picker": panelMode.value,
				"disabledDate": mergedDisabledDate.value,
				"hideHeader": true,
				"showWeek": props.showWeek
			}, null)]);
		};
	}, {
		props: {
			prefixCls: {
				type: String,
				required: false
			},
			rootClass: {
				type: String,
				required: false
			},
			classes: {
				type: [Object, Function],
				required: false
			},
			styles: {
				type: [Object, Function],
				required: false
			},
			locale: { required: false },
			validRange: {
				type: Array,
				required: false
			},
			disabledDate: {
				type: Function,
				required: false
			},
			dateFullCellRender: {
				type: Function,
				required: false
			},
			dateCellRender: {
				type: Function,
				required: false
			},
			monthFullCellRender: {
				type: Function,
				required: false
			},
			monthCellRender: {
				type: Function,
				required: false
			},
			cellRender: {
				type: Function,
				required: false
			},
			fullCellRender: {
				type: Function,
				required: false
			},
			headerRender: {
				type: Function,
				required: false
			},
			value: { required: false },
			defaultValue: { required: false },
			mode: {
				type: String,
				required: false
			},
			fullscreen: {
				type: Boolean,
				required: false,
				default: true
			},
			showWeek: {
				type: Boolean,
				required: false,
				default: void 0
			}
		},
		emits: [
			"change",
			"update:value",
			"panelChange",
			"select"
		],
		name: "ACalendar",
		inheritAttrs: false
	});
}
var generateCalendar_default = generateCalendar;

//#endregion
export { calendarProps, generateCalendar_default as default };