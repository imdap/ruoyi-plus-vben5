import { h, computed, inject, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getFuncText } from '../../ui/src/utils';
import { getConfig, createEvent, useSize, getIcon } from '../../ui';
export default defineVxeComponent({
    name: 'VxeCheckbox',
    props: {
        modelValue: [String, Number, Boolean],
        label: {
            type: [String, Number],
            default: null
        },
        indeterminate: Boolean,
        title: [String, Number],
        checkedValue: {
            type: [String, Number, Boolean],
            default: true
        },
        uncheckedValue: {
            type: [String, Number, Boolean],
            default: false
        },
        content: [String, Number],
        disabled: {
            type: Boolean,
            default: null
        },
        size: {
            type: String,
            default: () => getConfig().checkbox.size || getConfig().size
        }
    },
    emits: [
        'update:modelValue',
        'change'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const $xeForm = inject('$xeForm', null);
        const formItemInfo = inject('xeFormItemInfo', null);
        const $xeCheckboxGroup = inject('$xeCheckboxGroup', null);
        const xID = XEUtils.uniqueId();
        const reactData = reactive({});
        const $xeCheckbox = {
            xID,
            props,
            context,
            reactData
        };
        let checkboxMethods = {};
        const { computeSize } = useSize(props);
        const computeIsChecked = computed(() => {
            if ($xeCheckboxGroup) {
                return XEUtils.includes($xeCheckboxGroup.props.modelValue, props.label);
            }
            return props.modelValue === props.checkedValue;
        });
        const computeIsDisabled = computed(() => {
            const { disabled } = props;
            const isChecked = computeIsChecked.value;
            if (disabled === null) {
                if ($xeCheckboxGroup) {
                    const { computeIsDisabled: computeIsGroupDisabled, computeIsMaximize: computeIsGroupMaximize } = $xeCheckboxGroup.getComputeMaps();
                    const isGroupDisabled = computeIsGroupDisabled.value;
                    const isGroupMaximize = computeIsGroupMaximize.value;
                    return isGroupDisabled || (isGroupMaximize && !isChecked);
                }
            }
            return disabled;
        });
        const changeEvent = (evnt) => {
            const { checkedValue, uncheckedValue } = props;
            const isDisabled = computeIsDisabled.value;
            if (!isDisabled) {
                const checked = evnt.target.checked;
                const value = checked ? checkedValue : uncheckedValue;
                const params = { checked, value, label: props.label };
                if ($xeCheckboxGroup) {
                    $xeCheckboxGroup.handleChecked(params, evnt);
                }
                else {
                    emit('update:modelValue', value);
                    checkboxMethods.dispatchEvent('change', params, evnt);
                    // 自动更新校验状态
                    if ($xeForm && formItemInfo) {
                        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
                    }
                }
            }
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $checkbox: $xeCheckbox }, params));
        };
        checkboxMethods = {
            dispatchEvent
        };
        Object.assign($xeCheckbox, checkboxMethods);
        const renderVN = () => {
            const { label } = props;
            const vSize = computeSize.value;
            const isDisabled = computeIsDisabled.value;
            const isChecked = computeIsChecked.value;
            const indeterminate = !isChecked && props.indeterminate;
            return h('label', {
                key: label,
                class: ['vxe-checkbox vxe-checkbox--default', {
                        [`size--${vSize}`]: vSize,
                        'is--indeterminate': indeterminate,
                        'is--disabled': isDisabled,
                        'is--checked': isChecked
                    }],
                title: props.title
            }, [
                h('input', {
                    class: 'vxe-checkbox--input',
                    type: 'checkbox',
                    disabled: isDisabled,
                    checked: isChecked,
                    onChange: changeEvent
                }),
                h('span', {
                    class: ['vxe-checkbox--icon', indeterminate ? getIcon().CHECKBOX_INDETERMINATE : (isChecked ? getIcon().CHECKBOX_CHECKED : (isDisabled ? getIcon().CHECKBOX_DISABLED_UNCHECKED : getIcon().CHECKBOX_UNCHECKED))]
                }),
                h('span', {
                    class: 'vxe-checkbox--label'
                }, slots.default ? slots.default({}) : getFuncText(props.content))
            ]);
        };
        $xeCheckbox.renderVN = renderVN;
        return $xeCheckbox;
    },
    render() {
        return this.renderVN();
    }
});
