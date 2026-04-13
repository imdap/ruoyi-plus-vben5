import { useFormItemInputContext, useFormItemInputContextProvider } from "../form/context.js";
import select_default from "../select/index.js";
import { RadioButton, RadioGroup } from "../radio/index.js";
import { computed, createVNode, defineComponent, mergeProps, ref } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/calendar/Header.tsx
const YEAR_SELECT_OFFSET = 10;
const YEAR_SELECT_TOTAL = 20;
const YearSelect = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { fullscreen, validRange, generateConfig, locale, prefixCls, value, onChange, divRef } = props;
		const year = generateConfig.getYear(value || generateConfig.getNow());
		let start = year - YEAR_SELECT_OFFSET;
		let end = start + YEAR_SELECT_TOTAL;
		if (validRange) {
			start = generateConfig.getYear(validRange[0]);
			end = generateConfig.getYear(validRange[1]) + 1;
		}
		const suffix = locale && locale.year === "年" ? "年" : "";
		const options = [];
		for (let index = start; index < end; index += 1) options.push({
			label: `${index}${suffix}`,
			value: index
		});
		return createVNode(select_default, {
			"size": fullscreen ? void 0 : "small",
			"options": options,
			"value": year,
			"class": `${prefixCls}-year-select`,
			"onChange": (numYear) => {
				let newDate = generateConfig.setYear(value, numYear);
				if (validRange) {
					const [startDate, endDate] = validRange;
					const newYear = generateConfig.getYear(newDate);
					const newMonth = generateConfig.getMonth(newDate);
					if (newYear === generateConfig.getYear(endDate) && newMonth > generateConfig.getMonth(endDate)) newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(endDate));
					if (newYear === generateConfig.getYear(startDate) && newMonth < generateConfig.getMonth(startDate)) newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(startDate));
				}
				onChange(newDate);
			},
			"getPopupContainer": () => divRef.value
		}, null);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		value: { required: true },
		validRange: {
			type: Array,
			required: false
		},
		generateConfig: {
			type: Object,
			required: true
		},
		locale: {
			type: Object,
			required: true
		},
		fullscreen: {
			type: Boolean,
			required: true
		},
		divRef: {
			type: Object,
			required: true
		},
		onChange: {
			type: Function,
			required: true
		}
	},
	name: "YearSelect",
	inheritAttrs: false
});
const MonthSelect = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, fullscreen, validRange, value, generateConfig, locale, onChange, divRef } = props;
		const month = generateConfig.getMonth(value || generateConfig.getNow());
		let start = 0;
		let end = 11;
		if (validRange) {
			const [rangeStart, rangeEnd] = validRange;
			const currentYear = generateConfig.getYear(value);
			if (generateConfig.getYear(rangeEnd) === currentYear) end = generateConfig.getMonth(rangeEnd);
			if (generateConfig.getYear(rangeStart) === currentYear) start = generateConfig.getMonth(rangeStart);
		}
		const months = locale.shortMonths || generateConfig.locale.getShortMonths(locale.locale);
		const options = [];
		for (let index = start; index <= end; index += 1) options.push({
			label: months[index],
			value: index
		});
		return createVNode(select_default, {
			"size": fullscreen ? void 0 : "small",
			"class": `${prefixCls}-month-select`,
			"value": month,
			"options": options,
			"onChange": (newMonth) => {
				onChange(generateConfig.setMonth(value, newMonth));
			},
			"getPopupContainer": () => divRef.value
		}, null);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		value: { required: true },
		validRange: {
			type: Array,
			required: false
		},
		generateConfig: {
			type: Object,
			required: true
		},
		locale: {
			type: Object,
			required: true
		},
		fullscreen: {
			type: Boolean,
			required: true
		},
		divRef: {
			type: Object,
			required: true
		},
		onChange: {
			type: Function,
			required: true
		}
	},
	inheritAttrs: false,
	name: "MonthSelect"
});
const ModeSwitch = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, locale, mode, fullscreen, onModeChange } = props;
		return createVNode(RadioGroup, {
			"onChange": (e) => {
				onModeChange(e.target.value);
			},
			"value": mode,
			"size": fullscreen ? void 0 : "small",
			"class": `${prefixCls}-mode-switch`,
			"optionType": "button"
		}, { default: () => [createVNode(RadioButton, { "value": "month" }, { default: () => [locale.month] }), createVNode(RadioButton, { "value": "year" }, { default: () => [locale.year] })] });
	};
}, {
	props: {
		mode: {
			type: String,
			required: true
		},
		onModeChange: {
			type: Function,
			required: true
		},
		prefixCls: {
			type: String,
			required: true
		},
		value: { required: true },
		validRange: {
			type: Array,
			required: false
		},
		generateConfig: {
			type: Object,
			required: true
		},
		locale: {
			type: Object,
			required: true
		},
		fullscreen: {
			type: Boolean,
			required: true
		},
		divRef: {
			type: Object,
			required: true
		}
	},
	inheritAttrs: false,
	name: "ModeSwitch"
});
const CalendarHeader = /* @__PURE__ */ defineComponent((props) => {
	const divRef = ref(null);
	const formItemInputContext = useFormItemInputContext();
	useFormItemInputContextProvider(computed(() => ({
		...formItemInputContext.value,
		isFormItemInput: false
	})));
	return () => {
		const { prefixCls, fullscreen, mode, onChange, onModeChange, className, style } = props;
		const sharedProps = {
			...props,
			fullscreen,
			divRef
		};
		return createVNode("div", {
			"class": clsx(`${prefixCls}-header`, className),
			"style": style,
			"ref": divRef
		}, [
			createVNode(YearSelect, mergeProps(omit(sharedProps, ["onChange", "onModeChange"]), { "onChange": (value) => {
				onChange(value, "year");
			} }), null),
			mode === "month" ? createVNode(MonthSelect, mergeProps(omit(sharedProps, ["onChange", "onModeChange"]), { "onChange": (value) => {
				onChange(value, "month");
			} }), null) : null,
			createVNode(ModeSwitch, mergeProps(omit(sharedProps, ["onChange", "onModeChange"]), { "onModeChange": onModeChange }), null)
		]);
	};
}, {
	props: {
		className: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		prefixCls: {
			type: String,
			required: true
		},
		value: { required: true },
		validRange: {
			type: Array,
			required: false
		},
		generateConfig: {
			type: Object,
			required: true
		},
		locale: {
			type: Object,
			required: true
		},
		mode: {
			type: String,
			required: true
		},
		fullscreen: {
			type: Boolean,
			required: true
		},
		onChange: {
			type: Function,
			required: true
		},
		onModeChange: {
			type: Function,
			required: true
		}
	},
	name: "ACalendarHeader"
});
var Header_default = CalendarHeader;

//#endregion
export { Header_default as default };