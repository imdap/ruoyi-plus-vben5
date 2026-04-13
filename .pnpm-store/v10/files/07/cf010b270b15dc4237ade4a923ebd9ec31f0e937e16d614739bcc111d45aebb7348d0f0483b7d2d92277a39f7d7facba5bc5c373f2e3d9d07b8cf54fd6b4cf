import { VxeUI } from '@vxe-ui/core';
import VxeLayoutAsideComponent from './src/layout-aside';
import { dynamicApp } from '../dynamics';
export const VxeLayoutAside = Object.assign({}, VxeLayoutAsideComponent, {
    install(app) {
        app.component(VxeLayoutAsideComponent.name, VxeLayoutAsideComponent);
    }
});
dynamicApp.use(VxeLayoutAside);
VxeUI.component(VxeLayoutAsideComponent);
export const LayoutAside = VxeLayoutAside;
export default VxeLayoutAside;
