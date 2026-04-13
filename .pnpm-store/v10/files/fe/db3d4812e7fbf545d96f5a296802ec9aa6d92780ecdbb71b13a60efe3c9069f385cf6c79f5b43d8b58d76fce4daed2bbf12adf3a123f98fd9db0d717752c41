import { h, createApp, reactive, createCommentVNode } from 'vue';
import { defineVxeComponent } from '../ui/src/comp';
import { VxeUI } from '@vxe-ui/core';
let dynamicContainerElem;
export const dynamicStore = reactive({
    modals: [],
    drawers: [],
    globalLoading: null,
    globalWatermark: null,
    globalContextMenu: null
});
/**
 * 动态组件
 */
const VxeDynamics = defineVxeComponent({
    setup() {
        const VxeUIModalComponent = VxeUI.getComponent('vxe-modal');
        const VxeUIDrawerComponent = VxeUI.getComponent('vxe-drawer');
        const VxeUILoadingComponent = VxeUI.getComponent('vxe-loading');
        const VxeUIWatermarkComponent = VxeUI.getComponent('vxe-watermark');
        const VxeUIContextMenuComponent = VxeUI.getComponent('vxe-context-menu');
        return () => {
            const { modals, drawers, globalWatermark, globalLoading, globalContextMenu } = dynamicStore;
            let cmOpts = globalContextMenu;
            if (globalContextMenu) {
                const events = globalContextMenu.events || {};
                const { optionClick, show, hide } = events;
                cmOpts = Object.assign({}, globalContextMenu, {
                    onShow(params) {
                        if (show) {
                            show(params);
                        }
                    },
                    onHide(params) {
                        if (hide) {
                            hide(params);
                        }
                        dynamicStore.globalContextMenu = null;
                    },
                    onOptionClick(params) {
                        if (optionClick) {
                            optionClick(params);
                        }
                    }
                }, { events: undefined });
            }
            return [
                modals.length
                    ? h('div', {
                        key: 1,
                        class: 'vxe-dynamics--modal'
                    }, modals.map((item) => h(VxeUIModalComponent, item)))
                    : createCommentVNode(),
                drawers.length
                    ? h('div', {
                        key: 2,
                        class: 'vxe-dynamics--drawer'
                    }, drawers.map((item) => h(VxeUIDrawerComponent, item)))
                    : createCommentVNode(),
                globalWatermark ? h(VxeUIWatermarkComponent, globalWatermark) : createCommentVNode(),
                globalLoading ? h(VxeUILoadingComponent, globalLoading) : createCommentVNode(),
                globalContextMenu ? h(VxeUIContextMenuComponent, cmOpts) : createCommentVNode()
            ];
        };
    }
});
export const dynamicApp = createApp(VxeDynamics);
export function checkDynamic() {
    if (!dynamicContainerElem) {
        dynamicContainerElem = document.createElement('div');
        dynamicContainerElem.className = 'vxe-dynamics';
        document.body.appendChild(dynamicContainerElem);
        dynamicApp.mount(dynamicContainerElem);
    }
}
