import { VxeUI } from '@vxe-ui/core';
import VxeLayoutFooterComponent from './src/layout-footer';
import { dynamicApp } from '../dynamics';
export const VxeLayoutFooter = Object.assign({}, VxeLayoutFooterComponent, {
    install(app) {
        app.component(VxeLayoutFooterComponent.name, VxeLayoutFooterComponent);
    }
});
dynamicApp.use(VxeLayoutFooter);
VxeUI.component(VxeLayoutFooterComponent);
export const LayoutFooter = VxeLayoutFooter;
export default VxeLayoutFooter;
