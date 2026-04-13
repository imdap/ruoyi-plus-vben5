import { VxeCore } from './src/core';
import { createCommentVNode } from 'vue';
import { setConfig, getConfig } from './src/config';
import { globalStore } from './src/dataStore';
import { setIcon, getIcon, renderGlobalIcon, renderCustomIcon } from './src/icon';
import { setTheme, getTheme } from './src/theme';
import { globalEvents, GLOBAL_EVENT_KEYS, createEvent } from './src/event';
import { globalResize } from './src/resize';
import { getI18n, setI18n, setLanguage, hasLanguage, getLanguage } from './src/i18n';
import { renderer } from './src/renderer';
import { validators } from './src/validators';
import { menus } from './src/menus';
import { formats } from './src/formats';
import { commands } from './src/commands';
import { interceptor } from './src/interceptor';
import { clipboard } from './src/clipboard';
import { permission } from './src/permission';
import { log } from './src/log';
import { hooks } from './src/hooks';
import { useFns } from './src/useFns';
import { getSlotVNs } from './src/vm';
import XEUtils from 'xe-utils';
const installedPlugins = [];
export function use(Plugin, options) {
    if (Plugin && Plugin.install) {
        if (installedPlugins.indexOf(Plugin) === -1) {
            Plugin.install(VxeUI, options);
            installedPlugins.push(Plugin);
        }
    }
    return VxeUI;
}
const components = {};
export function getComponent(name) {
    return components[name] || null;
}
export function hasComponent(name) {
    return !!components[name];
}
export function component(comp) {
    if (comp && comp.name) {
        components[comp.name] = comp;
        components[XEUtils.kebabCase(comp.name)] = comp;
    }
}
export function renderEmptyElement() {
    return createCommentVNode();
}
export function checkVersion(version, pVersion, sVersion) {
    if (version) {
        const vRest = `${version}`.match(/(\d+).(\d+).(\d+)/);
        if (vRest) {
            const pV = XEUtils.toNumber(vRest[1]);
            if (sVersion) {
                const sV = XEUtils.toNumber(vRest[2]);
                return pV >= pVersion && sV >= sVersion;
            }
            return pV >= pVersion;
        }
    }
    return false;
}
export const VxeUI = Object.assign(VxeCore, {
    renderEmptyElement,
    setTheme,
    getTheme,
    setConfig,
    getConfig: getConfig,
    setIcon,
    getIcon: getIcon,
    renderGlobalIcon,
    renderCustomIcon,
    setLanguage,
    hasLanguage,
    getLanguage,
    setI18n,
    getI18n,
    globalEvents,
    GLOBAL_EVENT_KEYS,
    createEvent,
    globalResize,
    renderer,
    validators,
    menus,
    formats,
    commands,
    interceptor,
    clipboard,
    log,
    permission,
    globalStore,
    hooks,
    component,
    getComponent,
    hasComponent,
    useFns,
    getSlotVNs,
    checkVersion,
    use
});
setTheme();
export * from './src/core';
export * from './src/event';
export * from './src/resize';
export * from './src/config';
export * from './src/i18n';
export * from './src/icon';
export * from './src/theme';
export * from './src/renderer';
export * from './src/validators';
export * from './src/menus';
export * from './src/formats';
export * from './src/commands';
export * from './src/interceptor';
export * from './src/clipboard';
export * from './src/permission';
export * from './src/dataStore';
export * from './src/useFns';
export * from './src/vm';
export * from './src/log';
export * from './src/hooks';
export default VxeUI;
