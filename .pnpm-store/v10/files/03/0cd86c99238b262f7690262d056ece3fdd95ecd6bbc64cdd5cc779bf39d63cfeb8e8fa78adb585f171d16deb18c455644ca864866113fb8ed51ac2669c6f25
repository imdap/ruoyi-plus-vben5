import { VxeUI } from '@vxe-ui/core';
import VxePrintPageBreakComponent from '../print/src/page-break';
import { dynamicApp } from '../dynamics';
export const VxePrintPageBreak = Object.assign({}, VxePrintPageBreakComponent, {
    install(app) {
        app.component(VxePrintPageBreakComponent.name, VxePrintPageBreakComponent);
    }
});
dynamicApp.use(VxePrintPageBreak);
VxeUI.component(VxePrintPageBreakComponent);
export const PrintPageBreak = VxePrintPageBreak;
export default VxePrintPageBreak;
