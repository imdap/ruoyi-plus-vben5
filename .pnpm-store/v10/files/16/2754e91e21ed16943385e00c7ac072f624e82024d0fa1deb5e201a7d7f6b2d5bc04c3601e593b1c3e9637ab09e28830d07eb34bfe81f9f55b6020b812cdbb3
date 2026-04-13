import { addDays, addMonths, addYears, endOfMonth, format, getDate, getDay, getHours, getMilliseconds, getMinutes, getMonth, getSeconds, getWeek, getYear, isAfter, isValid, parse, setDate, setHours, setMilliseconds, setMinutes, setMonth, setSeconds, setYear, startOfWeek } from "date-fns";
import * as locales from "date-fns/locale";
function getLocale(locale) {
	const tmpLocales = locales;
	return tmpLocales[locale] || tmpLocales[locale.replace(/_/g, "")] || tmpLocales[locale.replace(/_.*$/g, "")];
}
function localeParse(format$1) {
	return format$1.replace(/Y/g, "y").replace(/D/g, "d").replace(/gggg/, "yyyy").replace(/g/g, "G").replace(/([Ww])o/g, "wo");
}
function parse$1(text, format$1, locale) {
	return parse(text, localeParse(format$1), /* @__PURE__ */ new Date(), { locale: getLocale(locale) });
}
function isStrictValidDate(text, format$1, locale) {
	const date = parse$1(text, format$1, locale);
	if (!isValid(date)) return false;
	return text === format(date, format$1, { locale: getLocale(locale) });
}
var dateFns_default = {
	getNow: () => /* @__PURE__ */ new Date(),
	getFixedDate: (string) => new Date(string),
	getEndDate: (date) => endOfMonth(date),
	getWeekDay: (date) => getDay(date),
	getYear: (date) => getYear(date),
	getMonth: (date) => getMonth(date),
	getDate: (date) => getDate(date),
	getHour: (date) => getHours(date),
	getMinute: (date) => getMinutes(date),
	getSecond: (date) => getSeconds(date),
	getMillisecond: (date) => getMilliseconds(date),
	addYear: (date, diff) => addYears(date, diff),
	addMonth: (date, diff) => addMonths(date, diff),
	addDate: (date, diff) => addDays(date, diff),
	setYear: (date, year) => setYear(date, year),
	setMonth: (date, month) => setMonth(date, month),
	setDate: (date, num) => setDate(date, num),
	setHour: (date, hour) => setHours(date, hour),
	setMinute: (date, minute) => setMinutes(date, minute),
	setSecond: (date, second) => setSeconds(date, second),
	setMillisecond: (date, millisecond) => setMilliseconds(date, millisecond),
	isAfter: (date1, date2) => isAfter(date1, date2),
	isValidate: (date) => isValid(date),
	locale: {
		getWeekFirstDay: (locale) => {
			return getLocale(locale).options?.weekStartsOn;
		},
		getWeekFirstDate: (locale, date) => {
			return startOfWeek(date, { locale: getLocale(locale) });
		},
		getWeek: (locale, date) => {
			return getWeek(date, { locale: getLocale(locale) });
		},
		getShortWeekDays: (locale) => {
			const clone = getLocale(locale);
			return Array.from({ length: 7 }).map((_, i) => clone.localize.day(i, { width: "short" }));
		},
		getShortMonths: (locale) => {
			const clone = getLocale(locale);
			return Array.from({ length: 12 }).map((_, i) => clone.localize.month(i, { width: "abbreviated" }));
		},
		format: (locale, date, format$1) => {
			if (!isValid(date)) return null;
			return format(date, localeParse(format$1), { locale: getLocale(locale) });
		},
		parse: (locale, text, formats) => {
			for (let i = 0; i < formats.length; i += 1) {
				const format$1 = localeParse(formats[i]);
				if (isStrictValidDate(text, format$1, locale)) return parse$1(text, format$1, locale);
			}
			return null;
		}
	}
};
export { dateFns_default as default };
