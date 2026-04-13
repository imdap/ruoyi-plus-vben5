import { VxeUI } from '@vxe-ui/core';
import VxeTooltipComponent from './src/tooltip';
import { dynamicApp } from '../dynamics';
export const VxeTooltip = Object.assign({}, VxeTooltipComponent, {
    install(app) {
        app.component(VxeTooltipComponent.name, VxeTooltipComponent);
    }
});
dynamicApp.use(VxeTooltip);
VxeUI.component(VxeTooltipComponent);
export const Tooltip = VxeTooltip;
export default VxeTooltip;
