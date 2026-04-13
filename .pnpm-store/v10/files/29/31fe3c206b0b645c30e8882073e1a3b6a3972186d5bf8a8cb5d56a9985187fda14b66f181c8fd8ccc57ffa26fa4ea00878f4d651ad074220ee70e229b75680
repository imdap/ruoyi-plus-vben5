import { VxeUI } from '@vxe-ui/core';
import VxeTextEllipsisComponent from './src/text-ellipsis';
import { dynamicApp } from '../dynamics';
export const VxeTextEllipsis = Object.assign({}, VxeTextEllipsisComponent, {
    install(app) {
        app.component(VxeTextEllipsisComponent.name, VxeTextEllipsisComponent);
    }
});
dynamicApp.use(VxeTextEllipsis);
VxeUI.component(VxeTextEllipsisComponent);
export const TextEllipsis = VxeTextEllipsis;
export default VxeTextEllipsis;
