import XEUtils from 'xe-utils';
export function getOnName(type) {
    return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1);
}
export function getModelEvent(renderOpts) {
    switch (renderOpts.name) {
        case 'input':
        case 'textarea':
            return 'input';
        case 'select':
            return 'change';
    }
    return 'update:modelValue';
}
export function getChangeEvent(renderOpts) {
    switch (renderOpts.name) {
        case 'input':
        case 'textarea':
        case 'VxeInput':
        case 'VxeTextarea':
        case '$input': // 已废弃
        case '$textarea': // 已废弃
            return 'input';
    }
    return 'change';
}
export function getSlotVNs(vns) {
    if (XEUtils.isArray(vns)) {
        return vns;
    }
    return vns ? [vns] : [];
}
