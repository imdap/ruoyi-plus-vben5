import { VxeUI } from '@vxe-ui/core';
import VxeCardComponent from './src/card';
import { dynamicApp } from '../dynamics';
export const VxeCard = Object.assign({}, VxeCardComponent, {
    install(app) {
        app.component(VxeCardComponent.name, VxeCardComponent);
    }
});
dynamicApp.use(VxeCard);
VxeUI.component(VxeCardComponent);
export const Card = VxeCard;
export default VxeCard;
