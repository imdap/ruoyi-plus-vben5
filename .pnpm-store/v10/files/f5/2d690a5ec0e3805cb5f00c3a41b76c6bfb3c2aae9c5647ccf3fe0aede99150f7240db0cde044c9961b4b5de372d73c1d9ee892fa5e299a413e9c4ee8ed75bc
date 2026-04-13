import { VxeUI } from '@vxe-ui/core';
import VxeImageGroupComponent from '../image/src/group';
import { dynamicApp } from '../dynamics';
export const VxeImageGroup = Object.assign({}, VxeImageGroupComponent, {
    install(app) {
        app.component(VxeImageGroupComponent.name, VxeImageGroupComponent);
    }
});
dynamicApp.use(VxeImageGroup);
VxeUI.component(VxeImageGroupComponent);
export const ImageGroup = VxeImageGroup;
export default VxeImageGroup;
