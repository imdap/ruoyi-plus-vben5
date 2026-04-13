import { VxeUI } from '@vxe-ui/core';
import VxeTextComponent from './src/text';
import { dynamicApp } from '../dynamics';
export const VxeText = Object.assign({}, VxeTextComponent, {
    install(app) {
        app.component(VxeTextComponent.name, VxeTextComponent);
    }
});
dynamicApp.use(VxeText);
VxeUI.component(VxeTextComponent);
export const Text = VxeText;
export default VxeText;
