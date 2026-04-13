import { VxeUI } from '@vxe-ui/core';
import VxeContextMenuComponent from './src/context-menu';
import { dynamicApp, dynamicStore, checkDynamic } from '../dynamics';
export const VxeContextMenu = Object.assign({}, VxeContextMenuComponent, {
    install(app) {
        app.component(VxeContextMenuComponent.name, VxeContextMenuComponent);
    }
});
function openMenu(opts, x, y) {
    dynamicStore.globalContextMenu = {
        modelValue: true,
        options: opts.options,
        className: opts.className,
        size: opts.size,
        zIndex: opts.zIndex,
        x,
        y,
        position: 'fixed',
        destroyOnClose: true,
        transfer: false,
        events: opts.events
    };
    checkDynamic();
}
export const ContextMenuController = {
    open(options) {
        const opts = Object.assign({ x: 0, y: 0 }, options);
        openMenu(opts, opts.x, opts.y);
    },
    openByEvent(evnt, options) {
        evnt.preventDefault();
        evnt.stopPropagation();
        const opts = Object.assign({}, options);
        const x = evnt.clientX + 1;
        const y = evnt.clientY + 1;
        openMenu(opts, x, y);
    },
    close() {
        dynamicStore.globalContextMenu = null;
    }
};
dynamicApp.use(VxeContextMenu);
VxeUI.component(VxeContextMenuComponent);
VxeUI.contextMenu = ContextMenuController;
export const ContextMenu = VxeContextMenu;
export default VxeContextMenu;
