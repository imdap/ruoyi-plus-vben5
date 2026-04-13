import generateCalendar_default from "./generateCalendar.js";
import dayjsGenerateConfig from "@v-c/picker/generate/dayjs";

//#region src/calendar/index.tsx
const Calendar = generateCalendar_default(dayjsGenerateConfig);
Calendar.generateCalendar = generateCalendar_default;
Calendar.install = (app) => {
	app.component(Calendar.name, Calendar);
};
var calendar_default = Calendar;

//#endregion
export { calendar_default as default };