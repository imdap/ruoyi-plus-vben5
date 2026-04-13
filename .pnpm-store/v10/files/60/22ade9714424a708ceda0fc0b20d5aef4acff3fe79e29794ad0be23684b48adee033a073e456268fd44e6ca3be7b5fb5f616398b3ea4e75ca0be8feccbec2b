import { VxeUI } from '@vxe-ui/core';
import VxeLoadingComponent from './src/loading';
import { dynamicApp, dynamicStore, checkDynamic } from '../dynamics';
export const VxeLoading = Object.assign({}, VxeLoadingComponent, {
    install(app) {
        app.component(VxeLoadingComponent.name, VxeLoadingComponent);
    }
});
export const LoadingController = {
    open(options) {
        const opts = Object.assign({}, options);
        dynamicStore.globalLoading = {
            modelValue: true,
            text: opts.text,
            icon: opts.icon
        };
        checkDynamic();
    },
    close() {
        dynamicStore.globalLoading = null;
    }
};
dynamicApp.use(VxeLoading);
VxeUI.component(VxeLoadingComponent);
VxeUI.loading = LoadingController;
export const Loading = VxeLoading;
export default VxeLoading;
