import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend((_, c) => {
	const proto = c.prototype;
	const oldFormat = proto.format;
	proto.format = function f(formatStr) {
		const str = (formatStr || "").replace("Wo", "wo");
		return oldFormat.bind(this)(str);
	};
});
var localeMap = {
	bn_BD: "bn-bd",
	by_BY: "be",
	en_GB: "en-gb",
	en_US: "en",
	fr_BE: "fr",
	fr_CA: "fr-ca",
	hy_AM: "hy-am",
	kmr_IQ: "ku",
	nl_BE: "nl-be",
	pt_BR: "pt-br",
	zh_CN: "zh-cn",
	zh_HK: "zh-hk",
	zh_TW: "zh-tw"
};
function parseLocale(locale) {
	return localeMap[locale] || locale.split("_")[0];
}
/* istanbul ignore next */
function parseNoMatchNotice() {}
var dayjs_default = {
	getNow: () => {
		const now = dayjs();
		if ("tz" in now && typeof now.tz === "function") return now.tz();
		return now;
	},
	getFixedDate: (string) => dayjs(string, ["YYYY-M-DD", "YYYY-MM-DD"]),
	getEndDate: (date) => date.endOf("month"),
	getWeekDay: (date) => {
		const clone = date.locale("en");
		return clone.weekday() + clone.localeData().firstDayOfWeek();
	},
	getYear: (date) => date.year(),
	getMonth: (date) => date.month(),
	getDate: (date) => date.date(),
	getHour: (date) => date.hour(),
	getMinute: (date) => date.minute(),
	getSecond: (date) => date.second(),
	getMillisecond: (date) => date.millisecond(),
	addYear: (date, diff) => date.add(diff, "year"),
	addMonth: (date, diff) => date.add(diff, "month"),
	addDate: (date, diff) => date.add(diff, "day"),
	setYear: (date, year) => date.year(year),
	setMonth: (date, month) => date.month(month),
	setDate: (date, num) => date.date(num),
	setHour: (date, hour) => date.hour(hour),
	setMinute: (date, minute) => date.minute(minute),
	setSecond: (date, second) => date.second(second),
	setMillisecond: (date, milliseconds) => date.millisecond(milliseconds),
	isAfter: (date1, date2) => date1.isAfter(date2),
	isValidate: (date) => date.isValid(),
	locale: {
		getWeekFirstDay: (locale) => dayjs().locale(parseLocale(locale)).localeData().firstDayOfWeek(),
		getWeekFirstDate: (locale, date) => date.locale(parseLocale(locale)).weekday(0),
		getWeek: (locale, date) => date.locale(parseLocale(locale)).week(),
		getShortWeekDays: (locale) => dayjs().locale(parseLocale(locale)).localeData().weekdaysMin(),
		getShortMonths: (locale) => dayjs().locale(parseLocale(locale)).localeData().monthsShort(),
		format: (locale, date, format) => date.locale(parseLocale(locale)).format(format),
		parse: (locale, text, formats) => {
			const localeStr = parseLocale(locale);
			for (let i = 0; i < formats.length; i += 1) {
				const format = formats[i];
				const formatText = text;
				if (format.includes("wo") || format.includes("Wo")) {
					const year = formatText.split("-")[0];
					const weekStr = formatText.split("-")[1];
					const firstWeek = dayjs(year, "YYYY").startOf("year").locale(localeStr);
					for (let j = 0; j <= 52; j += 1) {
						const nextWeek = firstWeek.add(j, "week");
						if (nextWeek.format("Wo") === weekStr) return nextWeek;
					}
					parseNoMatchNotice();
					return null;
				}
				const date = dayjs(formatText, format, true).locale(localeStr);
				if (date.isValid()) return date;
			}
			if (text) parseNoMatchNotice();
			return null;
		}
	}
};
export { dayjs_default as default };
