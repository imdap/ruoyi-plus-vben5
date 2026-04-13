import { VxeUI } from '@vxe-ui/core';
import VxeDateRangePickerComponent from './src/date-range-picker';
import { dynamicApp } from '../dynamics';
export const VxeDateRangePicker = Object.assign({}, VxeDateRangePickerComponent, {
    install(app) {
        app.component(VxeDateRangePickerComponent.name, VxeDateRangePickerComponent);
    }
});
dynamicApp.use(VxeDateRangePicker);
VxeUI.component(VxeDateRangePickerComponent);
export const DateRangePicker = VxeDateRangePicker;
export default VxeDateRangePicker;
