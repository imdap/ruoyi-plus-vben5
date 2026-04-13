import { VxeUI } from '@vxe-ui/core';
import VxeSwitchComponent from './src/switch';
import { dynamicApp } from '../dynamics';
export const VxeSwitch = Object.assign(VxeSwitchComponent, {
    install: function (app) {
        app.component(VxeSwitchComponent.name, VxeSwitchComponent);
    }
});
dynamicApp.use(VxeSwitch);
VxeUI.component(VxeSwitchComponent);
export const Switch = VxeSwitch;
export default VxeSwitch;
