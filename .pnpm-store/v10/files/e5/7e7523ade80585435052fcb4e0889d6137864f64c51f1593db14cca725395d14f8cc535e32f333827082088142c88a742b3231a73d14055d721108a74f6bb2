import { VxeUI } from '@vxe-ui/core';
import VxeButtonComponent from './src/button';
import { dynamicApp } from '../dynamics';
export const VxeButton = Object.assign({}, VxeButtonComponent, {
    install(app) {
        app.component(VxeButtonComponent.name, VxeButtonComponent);
    }
});
dynamicApp.use(VxeButton);
VxeUI.component(VxeButtonComponent);
export const Button = VxeButton;
export default VxeButton;
