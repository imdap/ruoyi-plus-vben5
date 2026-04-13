import { VxeUI } from '@vxe-ui/core';
import VxeEmptyComponent from './src/empty';
import { dynamicApp } from '../dynamics';
export const VxeEmpty = Object.assign({}, VxeEmptyComponent, {
    install(app) {
        app.component(VxeEmptyComponent.name, VxeEmptyComponent);
    }
});
dynamicApp.use(VxeEmpty);
VxeUI.component(VxeEmptyComponent);
export const Empty = VxeEmpty;
export default VxeEmpty;
