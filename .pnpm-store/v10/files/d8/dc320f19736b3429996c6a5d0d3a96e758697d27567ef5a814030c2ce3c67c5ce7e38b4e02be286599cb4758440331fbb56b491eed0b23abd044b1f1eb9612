import { VxeUI } from '../ui';
import VxeTableComponent from './src/table';
import { useCellView } from './src/use';
export const VxeTable = Object.assign({}, VxeTableComponent, {
    install(app) {
        app.component(VxeTableComponent.name, VxeTableComponent);
    }
});
const tableHandle = {
    useCellView
};
if (VxeUI.dynamicApp) {
    VxeUI.dynamicApp.component(VxeTableComponent.name, VxeTableComponent);
}
VxeUI.component(VxeTableComponent);
VxeUI.tableHandle = tableHandle;
export const Table = VxeTable;
export default VxeTable;
