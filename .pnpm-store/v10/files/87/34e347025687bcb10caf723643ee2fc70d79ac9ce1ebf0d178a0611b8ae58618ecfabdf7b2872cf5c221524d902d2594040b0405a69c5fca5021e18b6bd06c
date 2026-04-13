import { VxeUI } from '@vxe-ui/core';
import VxeCollapsePaneComponent from '../collapse/src/collapse-pane';
import { dynamicApp } from '../dynamics';
export const VxeCollapsePane = Object.assign({}, VxeCollapsePaneComponent, {
    install(app) {
        app.component(VxeCollapsePaneComponent.name, VxeCollapsePaneComponent);
    }
});
dynamicApp.use(VxeCollapsePane);
VxeUI.component(VxeCollapsePaneComponent);
export const CollapsePane = VxeCollapsePane;
export default VxeCollapsePane;
