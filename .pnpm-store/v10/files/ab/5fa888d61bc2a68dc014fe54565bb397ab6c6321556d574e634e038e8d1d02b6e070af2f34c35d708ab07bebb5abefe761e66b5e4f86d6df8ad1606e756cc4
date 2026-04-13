import { VxeUI } from '@vxe-ui/core';
import VxeListComponent from './src/list';
import { dynamicApp } from '../dynamics';
export const VxeList = Object.assign(VxeListComponent, {
    install(app) {
        app.component(VxeListComponent.name, VxeListComponent);
    }
});
dynamicApp.use(VxeList);
VxeUI.component(VxeListComponent);
export const List = VxeList;
export default VxeList;
