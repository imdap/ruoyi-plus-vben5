import { VxeUI } from '../ui';
import VxeGridComponent from './src/grid';
export const VxeGrid = Object.assign({}, VxeGridComponent, {
    install(app) {
        app.component(VxeGridComponent.name, VxeGridComponent);
    }
});
if (VxeUI.dynamicApp) {
    VxeUI.dynamicApp.component(VxeGridComponent.name, VxeGridComponent);
}
VxeUI.component(VxeGridComponent);
export const Grid = VxeGrid;
export default VxeGrid;
