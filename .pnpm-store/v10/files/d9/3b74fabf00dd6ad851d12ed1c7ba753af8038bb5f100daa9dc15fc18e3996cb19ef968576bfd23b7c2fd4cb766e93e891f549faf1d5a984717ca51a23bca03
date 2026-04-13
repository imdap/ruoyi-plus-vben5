import { VxeUI } from '@vxe-ui/core';
import VxeTabPaneComponent from '../tabs/src/tab-pane';
import { dynamicApp } from '../dynamics';
export const VxeTabPane = Object.assign({}, VxeTabPaneComponent, {
    install(app) {
        app.component(VxeTabPaneComponent.name, VxeTabPaneComponent);
    }
});
dynamicApp.use(VxeTabPane);
VxeUI.component(VxeTabPaneComponent);
export const TabPane = VxeTabPane;
export default VxeTabPane;
