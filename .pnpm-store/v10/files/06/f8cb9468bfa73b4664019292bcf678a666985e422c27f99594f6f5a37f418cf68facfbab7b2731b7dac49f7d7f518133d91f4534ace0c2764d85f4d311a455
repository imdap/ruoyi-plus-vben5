import { VxeUI } from '@vxe-ui/core';
import VxeRateComponent from './src/rate';
import { dynamicApp } from '../dynamics';
export const VxeRate = Object.assign({}, VxeRateComponent, {
    install(app) {
        app.component(VxeRateComponent.name, VxeRateComponent);
    }
});
dynamicApp.use(VxeRate);
VxeUI.component(VxeRateComponent);
export const Rate = VxeRate;
export default VxeRate;
