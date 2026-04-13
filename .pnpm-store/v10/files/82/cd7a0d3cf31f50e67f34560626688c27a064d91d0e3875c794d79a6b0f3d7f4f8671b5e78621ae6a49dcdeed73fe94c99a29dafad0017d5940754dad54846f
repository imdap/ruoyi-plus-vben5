import { VxeUI } from '../ui';
import VxeColumnComponent from '../table/src/column';
export const VxeColumn = Object.assign({}, VxeColumnComponent, {
    install(app) {
        app.component(VxeColumnComponent.name, VxeColumnComponent);
        // 兼容旧用法
        app.component('VxeTableColumn', VxeColumnComponent);
    }
});
if (VxeUI.dynamicApp) {
    VxeUI.dynamicApp.component(VxeColumnComponent.name, VxeColumnComponent);
    // 兼容旧用法
    VxeUI.dynamicApp.component('VxeTableColumn', VxeColumnComponent);
}
VxeUI.component(VxeColumnComponent);
export const Column = VxeColumn;
export default VxeColumn;
