import { VxeUI } from '@vxe-ui/core';
import VxeSegmentedComponent from './src/segmented';
import { dynamicApp } from '../dynamics';
export const VxeSegmented = Object.assign({}, VxeSegmentedComponent, {
    install(app) {
        app.component(VxeSegmentedComponent.name, VxeSegmentedComponent);
    }
});
dynamicApp.use(VxeSegmented);
VxeUI.component(VxeSegmentedComponent);
export const Segmented = VxeSegmented;
export default VxeSegmented;
