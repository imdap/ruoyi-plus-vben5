import { VxeUI } from '@vxe-ui/core';
import VxeLayoutHeaderComponent from './src/layout-header';
import { dynamicApp } from '../dynamics';
export const VxeLayoutHeader = Object.assign({}, VxeLayoutHeaderComponent, {
    install(app) {
        app.component(VxeLayoutHeaderComponent.name, VxeLayoutHeaderComponent);
    }
});
dynamicApp.use(VxeLayoutHeader);
VxeUI.component(VxeLayoutHeaderComponent);
export const LayoutHeader = VxeLayoutHeader;
export default VxeLayoutHeader;
