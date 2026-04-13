import { VxeUI } from '@vxe-ui/core';
import VxeLayoutBodyComponent from './src/layout-body';
import { dynamicApp } from '../dynamics';
export const VxeLayoutBody = Object.assign({}, VxeLayoutBodyComponent, {
    install(app) {
        app.component(VxeLayoutBodyComponent.name, VxeLayoutBodyComponent);
    }
});
dynamicApp.use(VxeLayoutBody);
VxeUI.component(VxeLayoutBodyComponent);
export const LayoutBody = VxeLayoutBody;
export default VxeLayoutBody;
