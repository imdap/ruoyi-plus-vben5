import XEUtils from 'xe-utils';
import DomZIndex from 'dom-zindex';
import { VxeCore } from './core';
import { globalConfigStore } from './configStore';
import { setTheme } from './theme';
/**
* 全局参数设置
*/
export function setConfig(options) {
    if (options) {
        if (options.zIndex) {
            DomZIndex.setCurrent(options.zIndex);
        }
        if (options.theme) {
            setTheme(options.theme);
        }
        XEUtils.merge(globalConfigStore, options);
    }
    return VxeCore;
}
/**
* 获取全局参数
*/
export function getConfig(key, defaultValue) {
    return arguments.length ? XEUtils.get(globalConfigStore, key, defaultValue) : globalConfigStore;
}
