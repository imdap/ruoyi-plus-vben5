import { VxeUI } from '@vxe-ui/core';
import VxeCountdownComponent from './src/countdown';
import { dynamicApp } from '../dynamics';
export const VxeCountdown = Object.assign({}, VxeCountdownComponent, {
    install(app) {
        app.component(VxeCountdownComponent.name, VxeCountdownComponent);
    }
});
dynamicApp.use(VxeCountdown);
VxeUI.component(VxeCountdownComponent);
export const Countdown = VxeCountdown;
export default VxeCountdown;
