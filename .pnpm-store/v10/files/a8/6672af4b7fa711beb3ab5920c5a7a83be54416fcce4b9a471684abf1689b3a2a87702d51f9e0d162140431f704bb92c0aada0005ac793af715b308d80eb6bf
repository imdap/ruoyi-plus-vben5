import { VxeUI } from '@vxe-ui/core';
import VxeFormGroupComponent from '../form/src/form-group';
import { dynamicApp } from '../dynamics';
const VxeFormGatherComponent = Object.assign({}, VxeFormGroupComponent, { name: 'VxeFormGather' });
/**
 * 已废弃，被 VxeFormGather 替换
 * @deprecated
 */
export const VxeFormGather = Object.assign(VxeFormGatherComponent, {
    install(app) {
        app.component(VxeFormGatherComponent.name, VxeFormGatherComponent);
    }
});
dynamicApp.use(VxeFormGather);
VxeUI.component(VxeFormGatherComponent);
/**
 * 已废弃，被 FormGroup 替换
 * @deprecated
 */
export const FormGather = VxeFormGather;
export default VxeFormGather;
