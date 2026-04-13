import { VxeUI } from '@vxe-ui/core';
import VxeTagComponent from './src/tag';
import { dynamicApp } from '../dynamics';
export const VxeTag = Object.assign({}, VxeTagComponent, {
    install(app) {
        app.component(VxeTagComponent.name, VxeTagComponent);
    }
});
dynamicApp.use(VxeTag);
VxeUI.component(VxeTagComponent);
export const Tag = VxeTag;
export default VxeTag;
