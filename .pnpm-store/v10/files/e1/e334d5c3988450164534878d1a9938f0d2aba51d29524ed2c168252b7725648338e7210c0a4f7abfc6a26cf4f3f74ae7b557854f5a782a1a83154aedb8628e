import { VxeUI } from '@vxe-ui/core';
import VxePrintComponent from './src/print';
import { dynamicApp } from '../dynamics';
import { printHtml } from './src/util';
export const VxePrint = Object.assign({}, VxePrintComponent, {
    install(app) {
        app.component(VxePrintComponent.name, VxePrintComponent);
    }
});
dynamicApp.use(VxePrint);
VxeUI.component(VxePrintComponent);
VxeUI.print = printHtml;
export const Print = VxePrint;
export default VxePrint;
