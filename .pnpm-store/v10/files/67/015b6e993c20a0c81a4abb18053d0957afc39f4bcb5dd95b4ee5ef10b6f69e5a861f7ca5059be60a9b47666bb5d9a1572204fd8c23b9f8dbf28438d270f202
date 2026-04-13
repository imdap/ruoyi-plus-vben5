import VxeUploadComponent from './src/upload';
import { VxeUI } from '@vxe-ui/core';
import { dynamicApp } from '../dynamics';
import { saveLocalFile, readLocalFile } from './src/util';
export const VxeUpload = Object.assign({}, VxeUploadComponent, {
    install(app) {
        app.component(VxeUploadComponent.name, VxeUploadComponent);
    }
});
dynamicApp.use(VxeUpload);
VxeUI.component(VxeUploadComponent);
VxeUI.saveFile = saveLocalFile;
VxeUI.readFile = readLocalFile;
export const Upload = VxeUpload;
export default VxeUpload;
