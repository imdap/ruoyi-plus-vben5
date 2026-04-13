import PurePanel_default from "../_util/PurePanel.js";
import generatePicker_default from "./generatePicker/index.js";
import dayjsGenerateConfig from "@v-c/picker/generate/dayjs";

//#region src/date-picker/index.tsx
const DatePicker = generatePicker_default(dayjsGenerateConfig);
DatePicker.generatePicker = generatePicker_default;
DatePicker.install = (app) => {
	app.component(DatePicker.name, DatePicker);
	app.component(DatePicker.WeekPicker.name, DatePicker.WeekPicker);
	app.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker);
	app.component(DatePicker.YearPicker.name, DatePicker.YearPicker);
	app.component(DatePicker.QuarterPicker.name, DatePicker.QuarterPicker);
	app.component(DatePicker.RangePicker.name, DatePicker.RangePicker);
};
var date_picker_default = DatePicker;
const DateRangePicker = DatePicker.RangePicker;
const DateWeekPicker = DatePicker.WeekPicker;
const DateMonthPicker = DatePicker.MonthPicker;
const DateYearPicker = DatePicker.YearPicker;
const DateQuarterPicker = DatePicker.QuarterPicker;
DatePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default(DatePicker, "popupAlign", void 0, "picker");
DatePicker._InternalRangePanelDoNotUseOrYouWillBeFired = PurePanel_default(DatePicker.RangePicker, "popupAlign", void 0, "picker");

//#endregion
export { DateMonthPicker, DateQuarterPicker, DateRangePicker, DateWeekPicker, DateYearPicker, date_picker_default as default };