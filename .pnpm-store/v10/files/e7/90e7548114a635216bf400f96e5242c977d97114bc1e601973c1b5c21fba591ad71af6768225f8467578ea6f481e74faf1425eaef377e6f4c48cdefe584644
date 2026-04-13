import { VxeUI } from '@vxe-ui/core';
import VxeBacktopComponent from './src/backtop';
import { dynamicApp } from '../dynamics';
export const VxeBacktop = Object.assign({}, VxeBacktopComponent, {
    install(app) {
        app.component(VxeBacktopComponent.name, VxeBacktopComponent);
    }
});
dynamicApp.use(VxeBacktop);
VxeUI.component(VxeBacktopComponent);
export const Backtop = VxeBacktop;
export default VxeBacktop;
