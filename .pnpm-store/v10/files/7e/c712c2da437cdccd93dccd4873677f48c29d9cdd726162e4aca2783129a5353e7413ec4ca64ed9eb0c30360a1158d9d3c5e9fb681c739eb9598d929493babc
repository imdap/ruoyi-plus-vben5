import { VxeUI } from '@vxe-ui/core';
import VxeAvatarComponent from './src/avatar';
import { dynamicApp } from '../dynamics';
export const VxeAvatar = Object.assign({}, VxeAvatarComponent, {
    install(app) {
        app.component(VxeAvatarComponent.name, VxeAvatarComponent);
    }
});
dynamicApp.use(VxeAvatar);
VxeUI.component(VxeAvatarComponent);
export const Avatar = VxeAvatar;
export default VxeAvatar;
