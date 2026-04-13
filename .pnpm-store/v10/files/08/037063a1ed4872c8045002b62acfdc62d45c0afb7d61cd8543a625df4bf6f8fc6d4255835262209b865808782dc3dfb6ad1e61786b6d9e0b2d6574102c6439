import { VxeUI } from '@vxe-ui/core';
import VxeTipComponent from './src/tip';
import { dynamicApp } from '../dynamics';
export const VxeTip = Object.assign({}, VxeTipComponent, {
    install(app) {
        app.component(VxeTipComponent.name, VxeTipComponent);
        app.component('VxeTipsComponent', VxeTipComponent);
    }
});
dynamicApp.use(VxeTip);
VxeUI.component(VxeTipComponent);
export const Tips = VxeTip;
export const Tip = VxeTip;
export default VxeTip;
