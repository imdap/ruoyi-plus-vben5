import XEUtils from 'xe-utils';
import { VxeUI } from '@vxe-ui/core';
import DomZIndex from 'dom-zindex';
const { getConfig } = VxeUI;
export function isEnableConf(conf) {
    return conf && conf.enabled !== false;
}
export function isEmptyValue(cellValue) {
    return cellValue === null || cellValue === undefined || cellValue === '';
}
export function parseFile(file) {
    const name = file.name;
    const tIndex = XEUtils.lastIndexOf(name, '.');
    const type = name.substring(tIndex + 1, name.length).toLowerCase();
    const filename = name.substring(0, tIndex);
    return { filename, type };
}
export function nextZIndex() {
    return DomZIndex.getNext();
}
export function getLastZIndex() {
    return DomZIndex.getCurrent();
}
export function hasChildrenList(item) {
    return item && item.children && item.children.length > 0;
}
export function getFuncText(content, args) {
    if (XEUtils.eqNull(content)) {
        return '';
    }
    const translate = getConfig().translate;
    return `${translate ? translate('' + content, args) : content}`;
}
export function formatText(value, placeholder) {
    return '' + (isEmptyValue(value) ? (placeholder ? getConfig().emptyCell : '') : value);
}
/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
export function eqEmptyValue(cellValue) {
    return cellValue === '' || XEUtils.eqNull(cellValue);
}
export function getDefaultConfig(val1, def1) {
    return XEUtils.eqNull(val1) ? def1 : val1;
}
