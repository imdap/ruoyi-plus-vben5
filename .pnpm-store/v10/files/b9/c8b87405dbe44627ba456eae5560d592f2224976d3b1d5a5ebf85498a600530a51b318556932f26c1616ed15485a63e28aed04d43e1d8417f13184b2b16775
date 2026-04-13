import { VxeUI } from '@vxe-ui/core';
import VxeTabsComponent from './src/tabs';
import { dynamicApp } from '../dynamics';
export const VxeTabs = Object.assign({}, VxeTabsComponent, {
    install(app) {
        app.component(VxeTabsComponent.name, VxeTabsComponent);
    }
});
dynamicApp.use(VxeTabs);
VxeUI.component(VxeTabsComponent);
export const Tabs = VxeTabs;
export default VxeTabs;
