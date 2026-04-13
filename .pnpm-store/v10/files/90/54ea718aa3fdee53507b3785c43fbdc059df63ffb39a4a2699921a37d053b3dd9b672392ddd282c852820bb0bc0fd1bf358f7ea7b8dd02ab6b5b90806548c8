import { VxeUI } from '@vxe-ui/core';
import VxeNumberInputComponent from './src/number-input';
import { dynamicApp } from '../dynamics';
export const VxeNumberInput = Object.assign({}, VxeNumberInputComponent, {
    install(app) {
        app.component(VxeNumberInputComponent.name, VxeNumberInputComponent);
    }
});
dynamicApp.use(VxeNumberInput);
VxeUI.component(VxeNumberInputComponent);
export const NumberInput = VxeNumberInput;
export default VxeNumberInput;
