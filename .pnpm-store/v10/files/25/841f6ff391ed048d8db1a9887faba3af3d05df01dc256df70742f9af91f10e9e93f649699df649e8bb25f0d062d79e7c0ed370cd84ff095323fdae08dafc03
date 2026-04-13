import { defineTableRender } from './table';
import { defineFormRender } from './form';
import { defineFormDesignRender } from './form-design';
import { globalConfig, componentMaps } from './store';
import XEUtils from 'xe-utils';
function getEventTarget(evnt) {
    const target = evnt.target;
    if (target && target.shadowRoot && evnt.composed) {
        return evnt.composedPath()[0] || target;
    }
    return target;
}
/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode(evnt, container, className) {
    let targetElem;
    let target = getEventTarget(evnt);
    const rootEl = document.documentElement || document.querySelector('html');
    while (target && target.nodeType && target !== rootEl) {
        if (className && target.className && target.className.split && target.className.split(' ').indexOf(className) > -1) {
            targetElem = target;
        }
        else if (target === container) {
            return { flag: className ? !!targetElem : true, container, targetElem: targetElem };
        }
        target = target.parentElement;
    }
    return { flag: false };
}
function toComponentName(name) {
    if (name) {
        return name.slice(0, 1).toUpperCase() + name.slice(1);
    }
    return name;
}
export const VxeUIPluginRenderAntd = {
    component(comp) {
        if (comp && comp.name) {
            const kcName = XEUtils.kebabCase(comp.name);
            const ccName = toComponentName(XEUtils.camelCase(comp.name));
            componentMaps[kcName] = comp;
            componentMaps[ccName] = comp;
        }
        else {
            console.error('[@vxe-ui/plugin-render-antd 4.3.1] error component.', comp);
        }
    },
    install(VxeUI, options) {
        const pluginOpts = Object.assign({}, options);
        if (options) {
            Object.assign(globalConfig, options);
        }
        // 检查版本
        if (VxeUI.checkVersion) {
            const pVersion = 4;
            const sVersion = 11;
            if (!VxeUI.checkVersion(VxeUI.tableVersion, pVersion, sVersion)) {
                console.error(`[@vxe-ui/plugin-render-antd 4.3.1] ${VxeUI.getI18n('vxe.error.errorVersion', [`vxe-table@${VxeUI.tableVersion || '?'}`, `vxe-table v${pVersion}.${sVersion}+`])} https://vxeui.com/other4/#/plugin-render-antd/install`);
            }
        }
        else {
            if (!/^(4)\./.test(VxeUI.uiVersion || VxeUI.tableVersion)) {
                console.error('[@vxe-ui/plugin-render-antd 4.3.1] Requires vxe-table 4.7.0+ version. https://vxeui.com/other4/#/plugin-render-antd/install');
            }
        }
        /**
         * 事件兼容性处理
         */
        const handleClearEvent = (params) => {
            const { $event } = params;
            const bodyElem = document.body;
            const prefixCls = `${pluginOpts.prefixCls || 'ant'}`.replace(/-$/, '');
            if (
            // 下拉框
            getEventTargetNode($event, bodyElem, `${prefixCls}-select-dropdown`).flag ||
                // 级联
                getEventTargetNode($event, bodyElem, `${prefixCls}-cascader-menus`).flag ||
                // 日期
                getEventTargetNode($event, bodyElem, `${prefixCls}-picker-dropdown`).flag ||
                getEventTargetNode($event, bodyElem, `${prefixCls}-calendar-picker-container`).flag ||
                // 时间选择
                getEventTargetNode($event, bodyElem, `${prefixCls}-time-picker-panel`).flag) {
                return false;
            }
        };
        defineTableRender(VxeUI);
        defineFormRender(VxeUI);
        defineFormDesignRender(VxeUI);
        VxeUI.interceptor.add('event.clearFilter', handleClearEvent);
        VxeUI.interceptor.add('event.clearEdit', handleClearEvent);
        VxeUI.interceptor.add('event.clearAreas', handleClearEvent);
        // 兼容老版本
        VxeUI.interceptor.add('event.clearActived', handleClearEvent);
    }
};
if (typeof window !== 'undefined') {
    if (window.VxeUI && window.VxeUI.use) {
        window.VxeUI.use(VxeUIPluginRenderAntd);
    }
    if (window.antd) {
        globalConfig.Antd = window.antd;
    }
}
export default VxeUIPluginRenderAntd;
