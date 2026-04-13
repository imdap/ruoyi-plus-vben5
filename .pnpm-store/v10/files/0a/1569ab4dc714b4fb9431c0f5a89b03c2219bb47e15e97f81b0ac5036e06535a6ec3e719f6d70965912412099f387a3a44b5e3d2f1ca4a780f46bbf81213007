import generateRangePicker_default from "./generateRangePicker.js";
import generateSinglePicker_default from "./generateSinglePicker.js";

//#region src/date-picker/generatePicker/index.tsx
function generatePicker(generateConfig) {
	const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker } = generateSinglePicker_default(generateConfig);
	const RangePicker = generateRangePicker_default(generateConfig);
	const MergedDatePicker = DatePicker;
	MergedDatePicker.WeekPicker = WeekPicker;
	MergedDatePicker.MonthPicker = MonthPicker;
	MergedDatePicker.YearPicker = YearPicker;
	MergedDatePicker.RangePicker = RangePicker;
	MergedDatePicker.TimePicker = TimePicker;
	MergedDatePicker.QuarterPicker = QuarterPicker;
	return MergedDatePicker;
}
var generatePicker_default = generatePicker;

//#endregion
export { generatePicker_default as default };