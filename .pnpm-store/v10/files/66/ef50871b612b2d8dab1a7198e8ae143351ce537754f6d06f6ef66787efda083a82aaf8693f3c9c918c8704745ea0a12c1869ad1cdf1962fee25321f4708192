import { VxeUI } from '@vxe-ui/core';
import VxeFormGroupComponent from '../form/src/form-group';
import { dynamicApp } from '../dynamics';
export const VxeFormGroup = Object.assign(VxeFormGroupComponent, {
    install(app) {
        app.component(VxeFormGroupComponent.name, VxeFormGroupComponent);
    }
});
dynamicApp.use(VxeFormGroup);
VxeUI.component(VxeFormGroupComponent);
export const FormGroup = VxeFormGroup;
export default VxeFormGroup;
