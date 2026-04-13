import { VxeUI } from '@vxe-ui/core';
import VxeCalendarComponent from './src/calendar';
import { dynamicApp } from '../dynamics';
export const VxeCalendar = Object.assign({}, VxeCalendarComponent, {
    install(app) {
        app.component(VxeCalendarComponent.name, VxeCalendarComponent);
    }
});
dynamicApp.use(VxeCalendar);
VxeUI.component(VxeCalendarComponent);
export const Calendar = VxeCalendar;
export default VxeCalendar;
