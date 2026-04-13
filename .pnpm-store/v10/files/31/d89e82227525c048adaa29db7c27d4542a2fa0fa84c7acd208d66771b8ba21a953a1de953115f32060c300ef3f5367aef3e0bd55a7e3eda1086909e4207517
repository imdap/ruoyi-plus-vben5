import { VxeUI } from '@vxe-ui/core';
import VxePulldownComponent from './src/pulldown';
import { dynamicApp } from '../dynamics';
export const VxePulldown = Object.assign(VxePulldownComponent, {
    install: function (app) {
        app.component(VxePulldownComponent.name, VxePulldownComponent);
    }
});
dynamicApp.use(VxePulldown);
VxeUI.component(VxePulldownComponent);
export const Pulldown = VxePulldown;
export default VxePulldown;
