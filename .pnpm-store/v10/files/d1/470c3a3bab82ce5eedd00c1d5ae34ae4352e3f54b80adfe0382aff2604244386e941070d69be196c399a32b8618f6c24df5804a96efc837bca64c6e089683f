import VxeImagePreviewComponent from '../image/src/preview';
import { VxeUI } from '@vxe-ui/core';
import { dynamicApp } from '../dynamics';
import { openPreviewImage } from '../image/src/util';
export const VxeImagePreview = Object.assign(VxeImagePreviewComponent, {
    install(app) {
        app.component(VxeImagePreviewComponent.name, VxeImagePreviewComponent);
    }
});
VxeUI.previewImage = openPreviewImage;
dynamicApp.use(VxeImagePreview);
VxeUI.component(VxeImagePreviewComponent);
export const ImagePreview = VxeImagePreview;
export default VxeImagePreview;
