import { h } from 'vue';
import XEUtils from 'xe-utils';
import { VxeCore } from './core';
import { iconConfigStore } from './iconStore';
import { getSlotVNs } from './vm';
export function setIcon(options) {
    if (options) {
        Object.assign(iconConfigStore, options);
    }
    return VxeCore;
}
export function getIcon(key) {
    return arguments.length ? XEUtils.get(iconConfigStore, key) : iconConfigStore;
}
export function renderGlobalIcon(name) {
    const icon = getIcon(name);
    return renderCustomIcon(icon, name);
}
export function renderCustomIcon(icon, name) {
    if (XEUtils.isFunction(icon)) {
        return h('span', {}, getSlotVNs(icon({ name })));
    }
    return h('i', {
        class: icon
    });
}
