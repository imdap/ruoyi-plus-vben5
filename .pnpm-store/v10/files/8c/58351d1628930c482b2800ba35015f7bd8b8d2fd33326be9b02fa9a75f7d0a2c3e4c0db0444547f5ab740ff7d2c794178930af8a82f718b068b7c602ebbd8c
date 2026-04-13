import { VxeUI } from '@vxe-ui/core';
import VxeTreeComponent from './src/tree';
import { dynamicApp } from '../dynamics';
export const VxeTree = Object.assign({}, VxeTreeComponent, {
    install(app) {
        app.component(VxeTreeComponent.name, VxeTreeComponent);
    }
});
dynamicApp.use(VxeTree);
VxeUI.component(VxeTreeComponent);
export const Tree = VxeTree;
export default VxeTree;
