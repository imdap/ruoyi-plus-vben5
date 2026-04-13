import { h, ref, computed, reactive, nextTick, inject } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, useSize, renderEmptyElement } from '../../ui';
import { getFuncText } from '../../ui/src/utils';
export default defineVxeComponent({
    name: 'VxeSwitch',
    props: {
        modelValue: [String, Number, Boolean],
        disabled: {
            type: Boolean,
            default: null
        },
        readonly: {
            type: Boolean,
            default: null
        },
        size: {
            type: String,
            default: () => getConfig().switch.size || getConfig().size
        },
        openLabel: String,
        closeLabel: String,
        openValue: {
            type: [String, Number, Boolean],
            default: true
        },
        closeValue: {
            type: [String, Number, Boolean],
            default: false
        },
        openIcon: String,
        closeIcon: String,
        openActiveIcon: String,
        closeActiveIcon: String
    },
    emits: [
        'update:modelValue',
        'change',
        'focus',
        'blur'
    ],
    setup(props, context) {
        const { emit } = context;
        const $xeForm = inject('$xeForm', null);
        const formItemInfo = inject('xeFormItemInfo', null);
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const reactData = reactive({
            isActivated: false,
            hasAnimat: false,
            offsetLeft: 0
        });
        const internalData = {};
        const $xeSwitch = {
            xID,
            props,
            context,
            reactData,
            internalData
        };
        const refButton = ref();
        let switchMethods = {};
        const computeIsDisabled = computed(() => {
            const { disabled } = props;
            if (disabled === null) {
                if ($xeForm) {
                    return $xeForm.props.readonly || $xeForm.props.disabled;
                }
                return false;
            }
            return disabled;
        });
        const computeIsReadonly = computed(() => {
            const { readonly } = props;
            if (readonly === null) {
                if ($xeForm) {
                    return $xeForm.props.readonly || $xeForm.props.disabled;
                }
                return false;
            }
            return readonly;
        });
        const computeOnShowLabel = computed(() => {
            return getFuncText(props.openLabel);
        });
        const computeOffShowLabel = computed(() => {
            return getFuncText(props.closeLabel);
        });
        const computeIsChecked = computed(() => {
            return props.modelValue === props.openValue;
        });
        const emitModel = (value) => {
            emit('update:modelValue', value);
        };
        const clickEvent = (evnt) => {
            const isDisabled = computeIsDisabled.value;
            const isReadonly = computeIsReadonly.value;
            if (!(isDisabled || isReadonly)) {
                const isChecked = computeIsChecked.value;
                clearTimeout(internalData.atTimeout);
                const value = isChecked ? props.closeValue : props.openValue;
                reactData.hasAnimat = true;
                emitModel(value);
                switchMethods.dispatchEvent('change', { value }, evnt);
                // 自动更新校验状态
                if ($xeForm && formItemInfo) {
                    $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
                }
                internalData.atTimeout = setTimeout(() => {
                    reactData.hasAnimat = false;
                    internalData.atTimeout = undefined;
                }, 400);
            }
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $switch: $xeSwitch }, params));
        };
        const focusEvent = (evnt) => {
            reactData.isActivated = true;
            switchMethods.dispatchEvent('focus', { value: props.modelValue }, evnt);
        };
        const blurEvent = (evnt) => {
            reactData.isActivated = false;
            switchMethods.dispatchEvent('blur', { value: props.modelValue }, evnt);
        };
        switchMethods = {
            dispatchEvent,
            focus() {
                const btnElem = refButton.value;
                reactData.isActivated = true;
                if (btnElem) {
                    btnElem.focus();
                }
                return nextTick();
            },
            blur() {
                const btnElem = refButton.value;
                if (btnElem) {
                    btnElem.blur();
                }
                reactData.isActivated = false;
                return nextTick();
            }
        };
        Object.assign($xeSwitch, switchMethods);
        const renderVN = () => {
            const { openIcon, closeIcon, openActiveIcon, closeActiveIcon } = props;
            const vSize = computeSize.value;
            const isChecked = computeIsChecked.value;
            const onShowLabel = computeOnShowLabel.value;
            const offShowLabel = computeOffShowLabel.value;
            const isDisabled = computeIsDisabled.value;
            const isReadonly = computeIsReadonly.value;
            return h('div', {
                class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', {
                        [`size--${vSize}`]: vSize,
                        'is--disabled': isDisabled,
                        'is--readonly': isReadonly,
                        'is--animat': reactData.hasAnimat
                    }]
            }, [
                h('button', {
                    ref: refButton,
                    class: 'vxe-switch--button',
                    type: 'button',
                    disabled: isDisabled || isReadonly,
                    onClick: clickEvent,
                    onFocus: focusEvent,
                    onBlur: blurEvent
                }, [
                    h('span', {
                        class: 'vxe-switch--label vxe-switch--label-on'
                    }, [
                        openIcon
                            ? h('i', {
                                class: ['vxe-switch--label-icon', openIcon]
                            })
                            : renderEmptyElement($xeSwitch),
                        onShowLabel
                    ]),
                    h('span', {
                        class: 'vxe-switch--label vxe-switch--label-off'
                    }, [
                        closeIcon
                            ? h('i', {
                                class: ['vxe-switch--label-icon', closeIcon]
                            })
                            : renderEmptyElement($xeSwitch),
                        offShowLabel
                    ]),
                    h('span', {
                        class: ['vxe-switch--icon']
                    }, openActiveIcon || closeActiveIcon
                        ? [
                            h('i', {
                                class: isChecked ? openActiveIcon : closeActiveIcon
                            })
                        ]
                        : [])
                ])
            ]);
        };
        $xeSwitch.renderVN = renderVN;
        return $xeSwitch;
    },
    render() {
        return this.renderVN();
    }
});
