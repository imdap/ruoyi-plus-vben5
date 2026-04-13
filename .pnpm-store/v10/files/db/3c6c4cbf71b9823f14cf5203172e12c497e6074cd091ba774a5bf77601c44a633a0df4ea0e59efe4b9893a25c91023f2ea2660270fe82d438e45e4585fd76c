import { h, ref, computed, reactive, inject, nextTick, watch } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, getIcon, getI18n, createEvent, useSize, renderEmptyElement } from '../../ui';
import { getFuncText } from '../../ui/src/utils';
import { getSlotVNs } from '../../ui/src/vn';
export default defineVxeComponent({
    name: 'VxePasswordInput',
    props: {
        modelValue: String,
        immediate: {
            type: Boolean,
            default: true
        },
        name: String,
        clearable: {
            type: Boolean,
            default: () => getConfig().passwordInput.clearable
        },
        readonly: Boolean,
        disabled: Boolean,
        maxLength: [String, Number],
        placeholder: String,
        autoComplete: {
            type: String,
            default: 'off'
        },
        className: String,
        size: {
            type: String,
            default: () => getConfig().passwordInput.size || getConfig().size
        },
        prefixIcon: String,
        suffixIcon: String,
        controls: {
            type: Boolean,
            default: () => getConfig().passwordInput.controls
        },
        // 已废弃
        autocomplete: String
    },
    emits: [
        'update:modelValue',
        'input',
        'change',
        'click',
        'focus',
        'blur',
        'clear',
        'lazy-change',
        'toggle-visible',
        'prefix-click',
        'suffix-click'
    ],
    setup(props, context) {
        const { emit, slots } = context;
        const $xeForm = inject('$xeForm', null);
        const formItemInfo = inject('xeFormItemInfo', null);
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const reactData = reactive({
            showPwd: false,
            isActivated: false,
            inputValue: props.modelValue
        });
        const refElem = ref();
        const refInputTarget = ref();
        const refMaps = {
            refElem,
            refInput: refInputTarget
        };
        const $xePasswordInput = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps
        };
        let passwordInputMethods = {};
        const computeIsClearable = computed(() => {
            return props.clearable;
        });
        const computeInpReadonly = computed(() => {
            const { readonly } = props;
            return readonly;
        });
        const computeInpPlaceholder = computed(() => {
            const { placeholder } = props;
            if (placeholder) {
                return getFuncText(placeholder);
            }
            const globalPlaceholder = getConfig().passwordInput.placeholder;
            if (globalPlaceholder) {
                return getFuncText(globalPlaceholder);
            }
            return getI18n('vxe.base.pleaseInput');
        });
        const computeInputType = computed(() => {
            const { showPwd } = reactData;
            if (showPwd) {
                return 'text';
            }
            return 'password';
        });
        const computeInpImmediate = computed(() => {
            const { immediate } = props;
            return immediate;
        });
        const triggerEvent = (evnt) => {
            const { inputValue } = reactData;
            passwordInputMethods.dispatchEvent(evnt.type, { value: inputValue }, evnt);
        };
        const emitInputEvent = (value, evnt) => {
            const inpImmediate = computeInpImmediate.value;
            reactData.inputValue = value;
            if (inpImmediate) {
                handleChange(value, evnt);
            }
            else {
                passwordInputMethods.dispatchEvent('input', { value }, evnt);
            }
        };
        const inputEvent = (evnt) => {
            const inputElem = evnt.target;
            const value = inputElem.value;
            emitInputEvent(value, evnt);
        };
        const handleChange = (value, evnt) => {
            reactData.inputValue = value;
            emit('update:modelValue', value);
            passwordInputMethods.dispatchEvent('input', { value }, evnt);
            if (XEUtils.toValueString(props.modelValue) !== value) {
                passwordInputMethods.dispatchEvent('change', { value }, evnt);
                // 自动更新校验状态
                if ($xeForm && formItemInfo) {
                    $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
                }
            }
        };
        const changeEvent = (evnt) => {
            triggerEvent(evnt);
            $xePasswordInput.dispatchEvent('lazy-change', { value: reactData.inputValue }, evnt);
            // 自动更新校验状态
            if ($xeForm && formItemInfo) {
                $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, reactData.inputValue);
            }
        };
        const focusEvent = (evnt) => {
            reactData.isActivated = true;
            triggerEvent(evnt);
        };
        const blurEvent = (evnt) => {
            const { inputValue } = reactData;
            const value = inputValue;
            $xePasswordInput.dispatchEvent('blur', { value }, evnt);
            // 自动更新校验状态
            if ($xeForm && formItemInfo) {
                $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
            }
        };
        const passwordToggleEvent = (evnt) => {
            const { readonly, disabled } = props;
            const { showPwd } = reactData;
            if (!disabled && !readonly) {
                reactData.showPwd = !showPwd;
            }
            $xePasswordInput.dispatchEvent('toggle-visible', { visible: reactData.showPwd }, evnt);
        };
        const clickEvent = (evnt) => {
            triggerEvent(evnt);
        };
        const clearValueEvent = (evnt, value) => {
            focus();
            handleChange('', evnt);
            $xePasswordInput.dispatchEvent('clear', { value }, evnt);
            $xePasswordInput.dispatchEvent('lazy-change', { value: reactData.inputValue }, evnt);
        };
        const clickSuffixEvent = (evnt) => {
            const { disabled } = props;
            if (!disabled) {
                const { inputValue } = reactData;
                $xePasswordInput.dispatchEvent('suffix-click', { value: inputValue }, evnt);
            }
        };
        const clickPrefixEvent = (evnt) => {
            const { disabled } = props;
            if (!disabled) {
                const { inputValue } = reactData;
                $xePasswordInput.dispatchEvent('prefix-click', { value: inputValue }, evnt);
            }
        };
        const renderPasswordIcon = () => {
            const { showPwd } = reactData;
            return h('div', {
                class: 'vxe-password-input--control-icon',
                onClick: passwordToggleEvent
            }, [
                h('i', {
                    class: ['vxe-password-input--password-icon', showPwd ? getIcon().PASSWORD_INPUT_SHOW_PWD : getIcon().PASSWORD_INPUT_HIDE_PWD]
                })
            ]);
        };
        const renderPrefixIcon = () => {
            const { prefixIcon } = props;
            const prefixSlot = slots.prefix;
            return prefixSlot || prefixIcon
                ? h('div', {
                    class: 'vxe-password-input--prefix',
                    onClick: clickPrefixEvent
                }, [
                    h('div', {
                        class: 'vxe-password-input--prefix-icon'
                    }, prefixSlot
                        ? getSlotVNs(prefixSlot({}))
                        : [
                            h('i', {
                                class: prefixIcon
                            })
                        ])
                ])
                : null;
        };
        const renderSuffixIcon = () => {
            const { disabled, suffixIcon, controls } = props;
            const { inputValue } = reactData;
            const suffixSlot = slots.suffix;
            const isClearable = computeIsClearable.value;
            return isClearable || controls || suffixSlot || suffixIcon
                ? h('div', {
                    class: ['vxe-password-input--suffix', {
                            'is--clear': isClearable && !disabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
                        }]
                }, [
                    isClearable
                        ? h('div', {
                            class: 'vxe-password-input--clear-icon',
                            onClick: clearValueEvent
                        }, [
                            h('i', {
                                class: getIcon().INPUT_CLEAR
                            })
                        ])
                        : renderEmptyElement($xePasswordInput),
                    controls ? renderPasswordIcon() : renderEmptyElement($xePasswordInput),
                    suffixSlot || suffixIcon
                        ? h('div', {
                            class: 'vxe-password-input--suffix-icon',
                            onClick: clickSuffixEvent
                        }, suffixSlot
                            ? getSlotVNs(suffixSlot({}))
                            : [
                                h('i', {
                                    class: suffixIcon
                                })
                            ])
                        : renderEmptyElement($xePasswordInput)
                ])
                : null;
        };
        passwordInputMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, createEvent(evnt, { $passwordInput: $xePasswordInput }, params));
            },
            focus() {
                const inputElem = refInputTarget.value;
                reactData.isActivated = true;
                inputElem.focus();
                return nextTick();
            },
            blur() {
                const inputElem = refInputTarget.value;
                inputElem.blur();
                reactData.isActivated = false;
                return nextTick();
            },
            select() {
                const inputElem = refInputTarget.value;
                inputElem.select();
                reactData.isActivated = false;
                return nextTick();
            }
        };
        Object.assign($xePasswordInput, passwordInputMethods);
        watch(() => props.modelValue, (val) => {
            reactData.inputValue = val;
        });
        const renderVN = () => {
            const { className, name, disabled, readonly, autocomplete, autoComplete, maxLength } = props;
            const { inputValue, isActivated } = reactData;
            const vSize = computeSize.value;
            const inpReadonly = computeInpReadonly.value;
            const inputType = computeInputType.value;
            const inpPlaceholder = computeInpPlaceholder.value;
            const isClearable = computeIsClearable.value;
            const prefix = renderPrefixIcon();
            const suffix = renderSuffixIcon();
            return h('div', {
                ref: refElem,
                class: ['vxe-password-input', className, {
                        [`size--${vSize}`]: vSize,
                        'is--prefix': !!prefix,
                        'is--suffix': !!suffix,
                        'is--readonly': readonly,
                        'is--disabled': disabled,
                        'is--active': isActivated,
                        'show--clear': isClearable && !disabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
                    }],
                spellcheck: false
            }, [
                prefix || renderEmptyElement($xePasswordInput),
                h('div', {
                    class: 'vxe-password-input--wrapper'
                }, [
                    h('input', {
                        ref: refInputTarget,
                        class: 'vxe-password-input--inner',
                        value: inputValue,
                        name,
                        type: inputType,
                        placeholder: inpPlaceholder,
                        readonly: inpReadonly,
                        disabled,
                        autocomplete: autocomplete || autoComplete,
                        maxlength: maxLength,
                        onClick: clickEvent,
                        onInput: inputEvent,
                        onChange: changeEvent,
                        onFocus: focusEvent,
                        onBlur: blurEvent
                    })
                ]),
                suffix || renderEmptyElement($xePasswordInput)
            ]);
        };
        $xePasswordInput.renderVN = renderVN;
        return $xePasswordInput;
    },
    render() {
        return this.renderVN();
    }
});
