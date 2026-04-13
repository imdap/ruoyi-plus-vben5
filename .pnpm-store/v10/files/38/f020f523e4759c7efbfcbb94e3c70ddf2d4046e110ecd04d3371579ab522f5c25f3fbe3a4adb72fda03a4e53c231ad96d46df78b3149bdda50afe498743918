import { VxeUI } from '@vxe-ui/core';
import VxeWatermarkComponent from './src/watermark';
import { checkDynamic, dynamicStore, dynamicApp } from '../dynamics';
export const VxeWatermark = Object.assign({}, VxeWatermarkComponent, {
    install(app) {
        app.component(VxeWatermarkComponent.name, VxeWatermarkComponent);
    }
});
dynamicApp.use(VxeWatermark);
VxeUI.component(VxeWatermarkComponent);
export const WatermarkController = {
    load(options) {
        checkDynamic();
        dynamicStore.globalWatermark = Object.assign({}, options);
        return Promise.resolve();
    },
    clear() {
        dynamicStore.globalWatermark = null;
        return Promise.resolve();
    }
};
VxeUI.watermark = WatermarkController;
export const Watermark = VxeWatermark;
export default VxeWatermark;
