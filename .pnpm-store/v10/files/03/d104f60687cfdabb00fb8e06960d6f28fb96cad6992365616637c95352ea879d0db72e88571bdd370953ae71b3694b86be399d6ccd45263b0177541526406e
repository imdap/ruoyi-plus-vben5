import { VxeUI } from '@vxe-ui/core';
import VxeMentionComponent from './src/mention';
import { dynamicApp } from '../dynamics';
export const VxeMention = Object.assign({}, VxeMentionComponent, {
    install(app) {
        app.component(VxeMentionComponent.name, VxeMentionComponent);
    }
});
dynamicApp.use(VxeMention);
VxeUI.component(VxeMentionComponent);
export const Mention = VxeMention;
export default VxeMention;
