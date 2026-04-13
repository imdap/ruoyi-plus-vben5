import { VxeUI } from '@vxe-ui/core';
import VxeFormItemComponent from '../form/src/form-item';
import { dynamicApp } from '../dynamics';
export const VxeFormItem = Object.assign(VxeFormItemComponent, {
    install(app) {
        app.component(VxeFormItemComponent.name, VxeFormItemComponent);
    }
});
dynamicApp.use(VxeFormItem);
VxeUI.component(VxeFormItemComponent);
export const FormItem = VxeFormItem;
export default VxeFormItem;
