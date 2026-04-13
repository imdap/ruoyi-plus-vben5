import { noteOnce } from "@v-c/util/dist/warning";
import moment from "moment";
var moment_default = {
	getNow: () => moment(),
	getFixedDate: (string) => moment(string, "YYYY-MM-DD"),
	getEndDate: (date) => {
		return date.clone().endOf("month");
	},
	getWeekDay: (date) => {
		const clone = date.clone().locale("en_US");
		return clone.weekday() + clone.localeData().firstDayOfWeek();
	},
	getYear: (date) => date.year(),
	getMonth: (date) => date.month(),
	getDate: (date) => date.date(),
	getHour: (date) => date.hour(),
	getMinute: (date) => date.minute(),
	getSecond: (date) => date.second(),
	getMillisecond: (date) => date.millisecond(),
	addYear: (date, diff) => {
		return date.clone().add(diff, "year");
	},
	addMonth: (date, diff) => {
		return date.clone().add(diff, "month");
	},
	addDate: (date, diff) => {
		return date.clone().add(diff, "day");
	},
	setYear: (date, year) => {
		return date.clone().year(year);
	},
	setMonth: (date, month) => {
		return date.clone().month(month);
	},
	setDate: (date, num) => {
		return date.clone().date(num);
	},
	setHour: (date, hour) => {
		return date.clone().hour(hour);
	},
	setMinute: (date, minute) => {
		return date.clone().minute(minute);
	},
	setSecond: (date, second) => {
		return date.clone().second(second);
	},
	setMillisecond: (date, millisecond) => {
		return date.clone().millisecond(millisecond);
	},
	isAfter: (date1, date2) => date1.isAfter(date2),
	isValidate: (date) => date.isValid(),
	locale: {
		getWeekFirstDay: (locale) => {
			return moment().locale(locale).localeData().firstDayOfWeek();
		},
		getWeekFirstDate: (locale, date) => {
			return date.clone().locale(locale).weekday(0);
		},
		getWeek: (locale, date) => {
			return date.clone().locale(locale).week();
		},
		getShortWeekDays: (locale) => {
			return moment().locale(locale).localeData().weekdaysMin();
		},
		getShortMonths: (locale) => {
			return moment().locale(locale).localeData().monthsShort();
		},
		format: (locale, date, format) => {
			return date.clone().locale(locale).format(format);
		},
		parse: (locale, text, formats) => {
			const fallbackFormatList = [];
			for (let i = 0; i < formats.length; i += 1) {
				let format = formats[i];
				let formatText = text;
				if (format.includes("wo") || format.includes("Wo")) {
					format = format.replace(/wo/g, "w").replace(/Wo/g, "W");
					const matchFormat = format.match(/[-YyMmDdHhSsWwGg]+/g);
					const matchText = formatText.match(/[-\d]+/g);
					if (matchFormat && matchText) {
						format = matchFormat.join("");
						formatText = matchText.join("");
					} else fallbackFormatList.push(format.replace(/o/g, ""));
				}
				const date = moment(formatText, format, locale, true);
				if (date.isValid()) return date;
			}
			for (let i = 0; i < fallbackFormatList.length; i += 1) {
				const date = moment(text, fallbackFormatList[i], locale, false);
				/* istanbul ignore next */
				if (date.isValid()) {
					noteOnce(false, "Not match any format strictly and fallback to fuzzy match. Please help to fire a issue about this.");
					return date;
				}
			}
			return null;
		}
	}
};
export { moment_default as default };
