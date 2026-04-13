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
        case 'VxeNumberInput':
        case 'VxeTextarea':
        case '$input':
        case '$textarea':
            return 'input';
    }
    return 'change';
}
export function hasInputType(renderOpts) {
    switch (renderOpts.name) {
        case 'VxeInput':
        case 'VxeNumberInput':
        case 'VxeTextarea':
        case '$input':
        case '$textarea':
            return true;
    }
    return false;
}
export function getSlotVNs(vns) {
    if (vns === null || vns === undefined) {
        return [];
    }
    if (XEUtils.isArray(vns)) {
        return vns;
    }
    return [vns];
}
