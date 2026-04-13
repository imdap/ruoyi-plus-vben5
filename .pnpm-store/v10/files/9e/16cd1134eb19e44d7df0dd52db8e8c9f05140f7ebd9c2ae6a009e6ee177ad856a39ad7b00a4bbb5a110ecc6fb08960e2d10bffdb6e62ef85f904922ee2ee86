import { getRowFormat, pickProps, toArray } from "../utils/miscUtil.js";
import { fillTimeFormat } from "./useLocale.js";
function checkShow(format, keywords, show) {
	return show ?? keywords.some((keyword) => format.includes(keyword));
}
var showTimeKeys = [
	"showNow",
	"showHour",
	"showMinute",
	"showSecond",
	"showMillisecond",
	"use12Hours",
	"hourStep",
	"minuteStep",
	"secondStep",
	"millisecondStep",
	"hideDisabledOptions",
	"defaultValue",
	"disabledHours",
	"disabledMinutes",
	"disabledSeconds",
	"disabledMilliseconds",
	"disabledTime",
	"changeOnScroll",
	"defaultOpenValue"
];
function pickTimeProps(props) {
	const timeProps = pickProps(props, showTimeKeys);
	const { format, picker } = props;
	let propFormat = null;
	if (format) {
		propFormat = format;
		if (Array.isArray(propFormat)) propFormat = propFormat[0];
		propFormat = typeof propFormat === "object" ? propFormat.format : propFormat;
	}
	if (picker === "time") timeProps.format = propFormat;
	return [timeProps, propFormat];
}
function isStringFormat(format) {
	return format && typeof format === "string";
}
function existShowConfig(showHour, showMinute, showSecond, showMillisecond) {
	return [
		showHour,
		showMinute,
		showSecond,
		showMillisecond
	].some((show) => show !== void 0);
}
function fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond) {
	let parsedShowHour = showHour;
	let parsedShowMinute = showMinute;
	let parsedShowSecond = showSecond;
	if (!hasShowConfig && !parsedShowHour && !parsedShowMinute && !parsedShowSecond && !showMillisecond) {
		parsedShowHour = true;
		parsedShowMinute = true;
		parsedShowSecond = true;
	} else if (hasShowConfig) {
		const existFalse = [
			parsedShowHour,
			parsedShowMinute,
			parsedShowSecond
		].includes(false);
		const existTrue = [
			parsedShowHour,
			parsedShowMinute,
			parsedShowSecond
		].includes(true);
		const defaultShow = existFalse ? true : !existTrue;
		parsedShowHour = parsedShowHour ?? defaultShow;
		parsedShowMinute = parsedShowMinute ?? defaultShow;
		parsedShowSecond = parsedShowSecond ?? defaultShow;
	}
	return [
		parsedShowHour,
		parsedShowMinute,
		parsedShowSecond,
		showMillisecond
	];
}
function getTimeProps(componentProps) {
	const { showTime } = componentProps;
	const [pickedProps, propFormat] = pickTimeProps(componentProps);
	const showTimeConfig = showTime && typeof showTime === "object" ? showTime : {};
	const timeConfig = {
		defaultOpenValue: showTimeConfig.defaultOpenValue || showTimeConfig.defaultValue,
		...pickedProps,
		...showTimeConfig
	};
	const { showMillisecond } = timeConfig;
	let { showHour, showMinute, showSecond } = timeConfig;
	const hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
	[showHour, showMinute, showSecond] = fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond);
	return [
		timeConfig,
		{
			...timeConfig,
			showHour,
			showMinute,
			showSecond,
			showMillisecond
		},
		timeConfig.format,
		propFormat
	];
}
function fillShowTimeConfig(picker, showTimeFormat, propFormat, timeConfig, locale) {
	if (picker === "datetime" || picker === "time") {
		const pickedProps = timeConfig;
		let baselineFormat = getRowFormat(picker, locale, null);
		const formatList = [showTimeFormat, propFormat];
		for (let i = 0; i < formatList.length; i += 1) {
			const format = toArray(formatList[i])[0];
			if (isStringFormat(format)) {
				baselineFormat = format;
				break;
			}
		}
		let { showHour, showMinute, showSecond, showMillisecond } = pickedProps;
		const { use12Hours } = pickedProps;
		const showMeridiem = checkShow(baselineFormat, [
			"a",
			"A",
			"LT",
			"LLL",
			"LTS"
		], use12Hours);
		const hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
		if (!hasShowConfig) {
			showHour = checkShow(baselineFormat, [
				"H",
				"h",
				"k",
				"LT",
				"LLL"
			]);
			showMinute = checkShow(baselineFormat, [
				"m",
				"LT",
				"LLL"
			]);
			showSecond = checkShow(baselineFormat, ["s", "LTS"]);
			showMillisecond = checkShow(baselineFormat, ["SSS"]);
		}
		[showHour, showMinute, showSecond] = fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond);
		const timeFormat = showTimeFormat || fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem);
		return {
			...pickedProps,
			format: timeFormat,
			showHour,
			showMinute,
			showSecond,
			showMillisecond,
			use12Hours: showMeridiem
		};
	}
	return null;
}
export { fillShowTimeConfig, getTimeProps };
