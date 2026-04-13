import { VxeUI } from '@vxe-ui/core';
import VxeTreeSelectComponent from './src/tree-select';
import { dynamicApp } from '../dynamics';
export const VxeTreeSelect = Object.assign({}, VxeTreeSelectComponent, {
    install(app) {
        app.component(VxeTreeSelectComponent.name, VxeTreeSelectComponent);
    }
});
dynamicApp.use(VxeTreeSelect);
VxeUI.component(VxeTreeSelectComponent);
export const TreeSelect = VxeTreeSelect;
export default VxeTreeSelect;
