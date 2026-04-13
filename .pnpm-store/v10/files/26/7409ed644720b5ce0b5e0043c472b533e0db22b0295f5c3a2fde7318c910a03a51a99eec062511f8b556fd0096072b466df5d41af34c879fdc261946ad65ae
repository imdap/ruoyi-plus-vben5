import { VxeUI } from '@vxe-ui/core';
import VxeButtonGroupComponent from '../button/src/button-group';
import { dynamicApp } from '../dynamics';
export const VxeButtonGroup = Object.assign({}, VxeButtonGroupComponent, {
    install(app) {
        app.component(VxeButtonGroupComponent.name, VxeButtonGroupComponent);
    }
});
dynamicApp.use(VxeButtonGroup);
VxeUI.component(VxeButtonGroupComponent);
export const ButtonGroup = VxeButtonGroup;
export default VxeButtonGroup;
