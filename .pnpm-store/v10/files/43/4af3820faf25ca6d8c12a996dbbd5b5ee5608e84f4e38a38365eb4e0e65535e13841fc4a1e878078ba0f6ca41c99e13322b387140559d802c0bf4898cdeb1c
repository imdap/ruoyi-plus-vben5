import { VxeUI } from '@vxe-ui/core';
import VxeMenuComponent from './src/menu';
import { dynamicApp } from '../dynamics';
export const VxeMenu = Object.assign({}, VxeMenuComponent, {
    install(app) {
        app.component(VxeMenuComponent.name, VxeMenuComponent);
    }
});
dynamicApp.use(VxeMenu);
VxeUI.component(VxeMenuComponent);
export const Menu = VxeMenu;
export default VxeMenu;
