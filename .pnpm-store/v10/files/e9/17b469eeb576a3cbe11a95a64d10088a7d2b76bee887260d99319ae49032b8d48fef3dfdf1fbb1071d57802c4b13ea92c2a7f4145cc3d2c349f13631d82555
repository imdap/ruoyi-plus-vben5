import { VxeUI } from '@vxe-ui/core';
import VxeDatePickerComponent from './src/date-picker';
import { dynamicApp } from '../dynamics';
export const VxeDatePicker = Object.assign({}, VxeDatePickerComponent, {
    install(app) {
        app.component(VxeDatePickerComponent.name, VxeDatePickerComponent);
    }
});
dynamicApp.use(VxeDatePicker);
VxeUI.component(VxeDatePickerComponent);
export const DatePicker = VxeDatePicker;
export default VxeDatePicker;
