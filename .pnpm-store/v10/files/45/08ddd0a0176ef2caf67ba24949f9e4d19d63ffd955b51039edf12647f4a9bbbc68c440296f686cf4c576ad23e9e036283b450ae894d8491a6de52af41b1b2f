import { DateTime, Info } from "luxon";
var weekDayFormatMap = {
	zh_CN: "narrow",
	zh_TW: "narrow"
};
var weekDayLengthMap = {
	en_US: 2,
	en_GB: 2
};
function normalizeFormatPart(part) {
	return part.replace(/Y/g, "y").replace(/D/g, "d").replace(/gg/g, "kk").replace(/Q/g, "q").replace(/([Ww])o/g, "WW").replace(/A/g, "a");
}
function normalizeFormat(format) {
	return format.split(/[[\]]/).map((part, index) => {
		return index % 2 > 0 ? part : normalizeFormatPart(part);
	}).join("'");
}
var normalizeLocale = (locale) => locale.replace(/_/g, "-");
var luxon_default = {
	getNow: () => {
		return DateTime.now();
	},
	getFixedDate: (string) => DateTime.fromFormat(string, "yyyy-MM-dd"),
	getEndDate: (date) => date.endOf("month"),
	getWeekDay: (date) => date.weekday,
	getYear: (date) => date.year,
	getMonth: (date) => date.month - 1,
	getDate: (date) => date.day,
	getHour: (date) => date.hour,
	getMinute: (date) => date.minute,
	getSecond: (date) => date.second,
	getMillisecond: (date) => date.millisecond,
	addYear: (date, diff) => date.plus({ year: diff }),
	addMonth: (date, diff) => date.plus({ month: diff }),
	addDate: (date, diff) => date.plus({ day: diff }),
	setYear: (date, year) => date.set({ year }),
	setMonth: (date, month) => date.set({ month: month + 1 }),
	setDate: (date, day) => date.set({ day }),
	setHour: (date, hour) => date.set({ hour }),
	setMinute: (date, minute) => date.set({ minute }),
	setSecond: (date, second) => date.set({ second }),
	setMillisecond: (date, milliseconds) => date.set({ millisecond: milliseconds }),
	isAfter: (date1, date2) => date1 > date2,
	isValidate: (date) => date.isValid,
	locale: {
		getWeekFirstDate: (locale, date) => date.setLocale(normalizeLocale(locale)).startOf("week"),
		getWeekFirstDay: (locale) => DateTime.local().setLocale(normalizeLocale(locale)).startOf("week").weekday,
		getWeek: (locale, date) => date.setLocale(normalizeLocale(locale)).weekNumber,
		getShortWeekDays: (locale) => {
			const shifted = Info.weekdays(weekDayFormatMap[locale] || "short", { locale: normalizeLocale(locale) }).map((weekday) => weekday.slice(0, weekDayLengthMap[locale]));
			shifted.unshift(shifted.pop());
			return shifted;
		},
		getShortMonths: (locale) => Info.months("short", { locale: normalizeLocale(locale) }),
		format: (locale, date, format) => {
			if (!date || !date.isValid) return null;
			return date.setLocale(normalizeLocale(locale)).toFormat(normalizeFormat(format));
		},
		parse: (locale, text, formats) => {
			for (let i = 0; i < formats.length; i += 1) {
				const normalizedFormat = normalizeFormat(formats[i]);
				const date = DateTime.fromFormat(text, normalizedFormat, { locale: normalizeLocale(locale) });
				if (date.isValid) return date;
			}
			return null;
		}
	}
};
export { luxon_default as default };
