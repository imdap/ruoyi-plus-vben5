import { VxeUI } from '@vxe-ui/core';
import VxeCheckboxButtonComponent from '../checkbox/src/button';
import { dynamicApp } from '../dynamics';
export const VxeCheckboxButton = Object.assign(VxeCheckboxButtonComponent, {
    install: function (app) {
        app.component(VxeCheckboxButtonComponent.name, VxeCheckboxButtonComponent);
    }
});
dynamicApp.use(VxeCheckboxButton);
VxeUI.component(VxeCheckboxButtonComponent);
export const CheckboxButton = VxeCheckboxButton;
export default VxeCheckboxButton;
