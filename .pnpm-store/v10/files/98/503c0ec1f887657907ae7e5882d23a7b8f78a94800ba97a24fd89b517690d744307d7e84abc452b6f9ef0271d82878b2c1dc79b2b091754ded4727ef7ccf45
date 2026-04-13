import { VxeUI } from '@vxe-ui/core';
import VxeStepsComponent from './src/steps';
import { dynamicApp } from '../dynamics';
export const VxeSteps = Object.assign({}, VxeStepsComponent, {
    install(app) {
        app.component(VxeStepsComponent.name, VxeStepsComponent);
    }
});
dynamicApp.use(VxeSteps);
VxeUI.component(VxeStepsComponent);
export const Steps = VxeSteps;
export default VxeSteps;
