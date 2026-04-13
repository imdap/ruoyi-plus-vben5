import { VxeUI } from '@vxe-ui/core';
import VxeOptgroupComponent from '../select/src/optgroup';
import { dynamicApp } from '../dynamics';
export const VxeOptgroup = Object.assign(VxeOptgroupComponent, {
    install: function (app) {
        app.component(VxeOptgroupComponent.name, VxeOptgroupComponent);
    }
});
dynamicApp.use(VxeOptgroup);
VxeUI.component(VxeOptgroupComponent);
export const Optgroup = VxeOptgroup;
export default VxeOptgroup;
