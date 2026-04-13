import { VxeUI } from '@vxe-ui/core';
import VxeSplitterComponent from './src/splitter';
import { dynamicApp } from '../dynamics';
export const VxeSplitter = Object.assign({}, VxeSplitterComponent, {
    install(app) {
        app.component(VxeSplitterComponent.name, VxeSplitterComponent);
    }
});
dynamicApp.use(VxeSplitter);
VxeUI.component(VxeSplitterComponent);
export const Splitter = VxeSplitter;
export default VxeSplitter;
