import { VxeUI } from '@vxe-ui/core';
import VxeCollapseComponent from './src/collapse';
import { dynamicApp } from '../dynamics';
export const VxeCollapse = Object.assign({}, VxeCollapseComponent, {
    install(app) {
        app.component(VxeCollapseComponent.name, VxeCollapseComponent);
    }
});
dynamicApp.use(VxeCollapse);
VxeUI.component(VxeCollapseComponent);
export const Collapse = VxeCollapse;
export default VxeCollapse;
