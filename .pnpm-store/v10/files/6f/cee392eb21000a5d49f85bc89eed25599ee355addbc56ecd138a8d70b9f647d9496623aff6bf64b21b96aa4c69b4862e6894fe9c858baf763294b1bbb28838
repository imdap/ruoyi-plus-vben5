import { h, computed, inject, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getFuncText } from '../../ui/src/utils';
import { getConfig, createEvent, useSize, getIcon } from '../../ui';
export default defineVxeComponent({
    name: 'VxeRadio',
    props: {
        modelValue: [String, Number, Boolean],
        checkedValue: {
            type: [String, Number, Boolean],
            default: undefined
        },
        title: [String, Number],
        content: [String, Number],
        disabled: {
            type: Boolean,
            default: null
        },
        name: String,
        strict: {
            type: Boolean,
            default: () => getConfig().radio.strict
        },
        size: {
            type: String,
            default: () => getConfig().radio.size || getConfig().size
        },
        /**
         * 已废弃，被 checkedValue 替换
         */
        label: {
            type: [String, Number, Boolean],
            default: null
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
        const $xeRadioGroup = inject('$xeRadioGroup', null);
        const xID = XEUtils.uniqueId();
        const reactData = reactive({});
        const $xeRadio = {
            xID,
            props,
            context,
            reactData
        };
        const { computeSize } = useSize(props);
        const computeIsDisabled = computed(() => {
            const { disabled } = props;
            if (disabled === null) {
                if ($xeRadioGroup) {
                    const { computeIsDisabled } = $xeRadioGroup.getComputeMaps();
                    return computeIsDisabled.value;
                }
            }
            return disabled;
        });
        const computeName = computed(() => {
            return $xeRadioGroup ? $xeRadioGroup.name : props.name;
        });
        const computeStrict = computed(() => {
            return $xeRadioGroup ? $xeRadioGroup.props.strict : props.strict;
        });
        const computeChecked = computed(() => {
            const { label, checkedValue } = props;
            const radioValue = XEUtils.isUndefined(checkedValue) ? label : checkedValue;
            return $xeRadioGroup ? $xeRadioGroup.props.modelValue === radioValue : props.modelValue === radioValue;
        });
        const handleValue = (checkedValue, evnt) => {
            const { content } = props;
            if ($xeRadioGroup) {
                $xeRadioGroup.handleChecked({ label: checkedValue, checkedValue, checkedLabel: content }, evnt);
            }
            else {
                emit('update:modelValue', checkedValue);
                dispatchEvent('change', { value: checkedValue, label: checkedValue, checkedValue, checkedLabel: content }, evnt);
                // 自动更新校验状态
                if ($xeForm && formItemInfo) {
                    $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, checkedValue);
                }
            }
        };
        const changeEvent = (evnt) => {
            const isDisabled = computeIsDisabled.value;
            if (!isDisabled) {
                const { label, checkedValue } = props;
                const radioValue = XEUtils.isUndefined(checkedValue) ? label : checkedValue;
                handleValue(radioValue, evnt);
            }
        };
        const clickEvent = (evnt) => {
            const isDisabled = computeIsDisabled.value;
            const isStrict = computeStrict.value;
            if (!isDisabled && !isStrict) {
                const { label, checkedValue } = props;
                const radioValue = XEUtils.isUndefined(checkedValue) ? label : checkedValue;
                if (radioValue === ($xeRadioGroup ? $xeRadioGroup.props.modelValue : props.modelValue)) {
                    handleValue(null, evnt);
                }
            }
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $radio: $xeRadio }, params));
        };
        const radioMethods = {
            dispatchEvent
        };
        const radioPrivateMethods = {};
        Object.assign($xeRadio, radioMethods, radioPrivateMethods);
        const renderVN = () => {
            const { label, checkedValue } = props;
            const radioValue = XEUtils.isUndefined(checkedValue) ? label : checkedValue;
            const vSize = computeSize.value;
            const isDisabled = computeIsDisabled.value;
            const name = computeName.value;
            const isChecked = computeChecked.value;
            return h('label', {
                key: radioValue,
                class: ['vxe-radio vxe-radio--default', {
                        [`size--${vSize}`]: vSize,
                        'is--checked': isChecked,
                        'is--disabled': isDisabled
                    }],
                title: props.title
            }, [
                h('input', {
                    class: 'vxe-radio--input',
                    type: 'radio',
                    name,
                    checked: isChecked,
                    disabled: isDisabled,
                    onChange: changeEvent,
                    onClick: clickEvent
                }),
                h('span', {
                    class: ['vxe-radio--icon', isChecked ? getIcon().RADIO_CHECKED : (isDisabled ? getIcon().RADIO_DISABLED_UNCHECKED : getIcon().RADIO_UNCHECKED)]
                }),
                h('span', {
                    class: 'vxe-radio--label'
                }, slots.default ? slots.default({}) : getFuncText(props.content))
            ]);
        };
        $xeRadio.renderVN = renderVN;
        return $xeRadio;
    },
    render() {
        return this.renderVN();
    }
});
