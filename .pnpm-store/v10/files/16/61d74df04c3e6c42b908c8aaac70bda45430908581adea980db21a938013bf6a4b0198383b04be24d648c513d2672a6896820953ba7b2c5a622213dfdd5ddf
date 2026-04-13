import { VxeUI } from '@vxe-ui/core';
import VxeAlertComponent from './src/alert';
import { dynamicApp } from '../dynamics';
export const VxeAlert = Object.assign({}, VxeAlertComponent, {
    install(app) {
        app.component(VxeAlertComponent.name, VxeAlertComponent);
    }
});
dynamicApp.use(VxeAlert);
VxeUI.component(VxeAlertComponent);
export const Alert = VxeAlert;
export default VxeAlert;
