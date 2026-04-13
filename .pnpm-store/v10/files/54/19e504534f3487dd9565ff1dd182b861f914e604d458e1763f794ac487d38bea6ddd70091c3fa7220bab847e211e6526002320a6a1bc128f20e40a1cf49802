import { VxeCore } from './core';
import { themeConfigStore } from './themeStore';
export function setTheme(name) {
    const theme = !name || name === 'default' ? 'light' : name;
    themeConfigStore.theme = theme;
    if (typeof document !== 'undefined') {
        const documentElement = document.documentElement;
        if (documentElement) {
            documentElement.setAttribute('data-vxe-ui-theme', theme);
        }
    }
    return VxeCore;
}
export function getTheme() {
    return themeConfigStore.theme;
}
