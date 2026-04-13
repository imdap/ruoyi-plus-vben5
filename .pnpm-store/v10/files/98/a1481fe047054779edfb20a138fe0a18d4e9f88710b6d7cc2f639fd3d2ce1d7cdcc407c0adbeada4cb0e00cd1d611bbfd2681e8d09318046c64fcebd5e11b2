import { h, computed, reactive, inject } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getFuncText } from '../../ui/src/utils';
import { getConfig, createEvent, useSize } from '../../ui';
export default defineVxeComponent({
    name: 'VxeCheckboxButton',
    props: {
        modelValue: [String, Number, Boolean],
        label: {
            type: [String, Number, Boolean],
            default: null
        },
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
            default: () => getConfig().checkboxButton.size || getConfig().size
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
        const { computeSize } = useSize(props);
        const $xeCheckboxButton = {
            xID,
            props,
            context,
            reactData
        };
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
                    $xeCheckboxButton.dispatchEvent('change', params, evnt);
                    // 自动更新校验状态
                    if ($xeForm && formItemInfo) {
                        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
                    }
                }
            }
        };
        const checkboxButtonMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, createEvent(evnt, { $checkboxButton: $xeCheckboxButton }, params));
            }
        };
        const checkboxButtonPrivateMethods = {};
        Object.assign($xeCheckboxButton, checkboxButtonMethods, checkboxButtonPrivateMethods);
        const renderVN = () => {
            const { label } = props;
            const vSize = computeSize.value;
            const isDisabled = computeIsDisabled.value;
            const isChecked = computeIsChecked.value;
            return h('label', {
                key: label,
                class: ['vxe-checkbox vxe-checkbox--button', {
                        [`size--${vSize}`]: vSize,
                        'is--disabled': isDisabled
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
                    class: 'vxe-checkbox--label'
                }, slots.default ? slots.default({}) : getFuncText(props.content))
            ]);
        };
        $xeCheckboxButton.renderVN = renderVN;
        return renderVN;
    }
});
