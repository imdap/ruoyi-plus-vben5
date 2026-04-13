import { VxeUI } from '@vxe-ui/core';
import VxeCascaderComponent from './src/cascader';
import { dynamicApp } from '../dynamics';
export const VxeCascader = Object.assign({}, VxeCascaderComponent, {
    install(app) {
        app.component(VxeCascaderComponent.name, VxeCascaderComponent);
    }
});
dynamicApp.use(VxeCascader);
VxeUI.component(VxeCascaderComponent);
export const Cascader = VxeCascader;
export default VxeCascader;
