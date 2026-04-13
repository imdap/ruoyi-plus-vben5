import { VxeUI } from '@vxe-ui/core';
import VxeBadgeComponent from './src/badge';
import { dynamicApp } from '../dynamics';
export const VxeBadge = Object.assign({}, VxeBadgeComponent, {
    install(app) {
        app.component(VxeBadgeComponent.name, VxeBadgeComponent);
    }
});
dynamicApp.use(VxeBadge);
VxeUI.component(VxeBadgeComponent);
export const Badge = VxeBadge;
export default VxeBadge;
