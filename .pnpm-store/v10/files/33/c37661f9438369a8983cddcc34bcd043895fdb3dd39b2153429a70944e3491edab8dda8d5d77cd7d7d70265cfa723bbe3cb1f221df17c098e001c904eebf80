import { VxeUI } from '@vxe-ui/core';
import VxeRowComponent from './src/row';
import { dynamicApp } from '../dynamics';
export const VxeRow = Object.assign({}, VxeRowComponent, {
    install(app) {
        app.component(VxeRowComponent.name, VxeRowComponent);
    }
});
dynamicApp.use(VxeRow);
VxeUI.component(VxeRowComponent);
export const Row = VxeRow;
export default VxeRow;
