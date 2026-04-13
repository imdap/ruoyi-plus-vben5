import { VxeUI } from '../ui';
import VxeToolbarComponent from './src/toolbar';
export const VxeToolbar = Object.assign({}, VxeToolbarComponent, {
    install(app) {
        app.component(VxeToolbarComponent.name, VxeToolbarComponent);
    }
});
if (VxeUI.dynamicApp) {
    VxeUI.dynamicApp.component(VxeToolbarComponent.name, VxeToolbarComponent);
}
VxeUI.component(VxeToolbarComponent);
export const Toolbar = VxeToolbar;
export default VxeToolbar;
