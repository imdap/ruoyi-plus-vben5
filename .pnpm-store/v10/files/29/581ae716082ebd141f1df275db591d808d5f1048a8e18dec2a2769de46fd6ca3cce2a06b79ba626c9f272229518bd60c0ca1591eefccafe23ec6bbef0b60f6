import XEUtils from 'xe-utils';
export class OptionInfo {
    constructor($xeselect, _vm) {
        Object.assign(this, {
            id: XEUtils.uniqueId('option_'),
            value: _vm.value,
            label: _vm.label,
            visible: _vm.visible,
            className: _vm.className,
            disabled: _vm.disabled
        });
    }
    update(name, value) {
        this[name] = value;
    }
}
