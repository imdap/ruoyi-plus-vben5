import { VxeUI } from '@vxe-ui/core';
import VxeTableSelectComponent from './src/table-select';
import { dynamicApp } from '../dynamics';
export const VxeTableSelect = Object.assign({}, VxeTableSelectComponent, {
    install(app) {
        app.component(VxeTableSelectComponent.name, VxeTableSelectComponent);
    }
});
dynamicApp.use(VxeTableSelect);
VxeUI.component(VxeTableSelectComponent);
export const TableSelect = VxeTableSelect;
export default VxeTableSelect;
