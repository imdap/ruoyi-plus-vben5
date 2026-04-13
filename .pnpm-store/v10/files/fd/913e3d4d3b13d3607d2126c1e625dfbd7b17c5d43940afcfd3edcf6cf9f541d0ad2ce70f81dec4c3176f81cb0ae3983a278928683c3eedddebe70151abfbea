import { h, ref, computed, nextTick, watch, reactive, inject } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, getI18n, createEvent, useSize } from '../../ui';
import { getFuncText } from '../../ui/src/utils';
let autoTxtElem;
export default defineVxeComponent({
    name: 'VxeTextarea',
    props: {
        modelValue: [String, Number],
        className: String,
        immediate: {
            type: Boolean,
            default: true
        },
        name: String,
        readonly: {
            type: Boolean,
            default: null
        },
        editable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: null
        },
        placeholder: String,
        maxLength: [String, Number],
        trim: {
            type: Boolean,
            default: () => getConfig().textarea.trim
        },
        rows: {
            type: [String, Number],
            default: null
        },
        cols: {
            type: [String, Number],
            default: null
        },
        showWordCount: Boolean,
        countMethod: Function,
        autosize: [Boolean, Object],
        form: String,
        resize: {
            type: String,
            default: () => getConfig().textarea.resize
        },
        size: {
            type: String,
            default: () => getConfig().textarea.size || getConfig().size
        },
        // 已废弃
        maxlength: [String, Number]
    },
    emits: [
        'update:modelValue',
        'input',
        'keydown',
        'keyup',
        'click',
        'change',
        'focus',
        'blur',
        'lazy-change'
    ],
    setup(props, context) {
        const { emit } = context;
        const $xeForm = inject('$xeForm', null);
        const formItemInfo = inject('xeFormItemInfo', null);
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const reactData = reactive({
            inputValue: props.modelValue
        });
        const refElem = ref();
        const refTextarea = ref();
        const refMaps = {
            refElem,
            refTextarea
        };
        const $xeTextarea = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps
        };
        let textareaMethods = {};
        const computeFormReadonly = computed(() => {
            const { readonly } = props;
            if (readonly === null) {
                if ($xeForm) {
                    return $xeForm.props.readonly;
                }
                return false;
            }
            return readonly;
        });
        const computeIsDisabled = computed(() => {
            const { disabled } = props;
            if (disabled === null) {
                if ($xeForm) {
                    return $xeForm.props.disabled;
                }
                return false;
            }
            return disabled;
        });
        const computeInputReadonly = computed(() => {
            const { editable, readonly } = props;
            return readonly || !editable;
        });
        const computeInpPlaceholder = computed(() => {
            const { placeholder } = props;
            if (placeholder) {
                return getFuncText(placeholder);
            }
            const globalPlaceholder = getConfig().textarea.placeholder;
            if (globalPlaceholder) {
                return getFuncText(globalPlaceholder);
            }
            return getI18n('vxe.base.pleaseInput');
        });
        const computeInpMaxLength = computed(() => {
            const { maxLength, maxlength } = props;
            return maxLength || maxlength;
        });
        const computeInputCount = computed(() => {
            return XEUtils.getSize(reactData.inputValue);
        });
        const computeIsCountError = computed(() => {
            const inputCount = computeInputCount.value;
            const inpMaxLength = computeInpMaxLength.value;
            return inpMaxLength && inputCount > XEUtils.toNumber(inpMaxLength);
        });
        const computeSizeOpts = computed(() => {
            return Object.assign({ minRows: 1, maxRows: 10 }, getConfig().textarea.autosize, props.autosize);
        });
        const updateAutoTxt = () => {
            const { size, autosize } = props;
            const { inputValue } = reactData;
            if (autosize) {
                if (!autoTxtElem) {
                    autoTxtElem = document.createElement('div');
                }
                if (!autoTxtElem.parentNode) {
                    document.body.appendChild(autoTxtElem);
                }
                const textElem = refTextarea.value;
                if (!textElem) {
                    return;
                }
                const textStyle = getComputedStyle(textElem);
                autoTxtElem.className = ['vxe-textarea--autosize', size ? `size--${size}` : ''].join(' ');
                autoTxtElem.style.width = `${textElem.clientWidth}px`;
                autoTxtElem.style.padding = textStyle.padding;
                autoTxtElem.innerText = ('' + (inputValue || '　')).replace(/\n$/, '\n　');
            }
        };
        const handleResize = () => {
            if (props.autosize) {
                nextTick(() => {
                    const sizeOpts = computeSizeOpts.value;
                    const { minRows, maxRows } = sizeOpts;
                    const textElem = refTextarea.value;
                    if (!textElem) {
                        return;
                    }
                    const sizeHeight = autoTxtElem.clientHeight;
                    const textStyle = getComputedStyle(textElem);
                    const lineHeight = XEUtils.toNumber(textStyle.lineHeight);
                    const paddingTop = XEUtils.toNumber(textStyle.paddingTop);
                    const paddingBottom = XEUtils.toNumber(textStyle.paddingBottom);
                    const borderTopWidth = XEUtils.toNumber(textStyle.borderTopWidth);
                    const borderBottomWidth = XEUtils.toNumber(textStyle.borderBottomWidth);
                    const intervalHeight = paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;
                    const rowNum = (sizeHeight - intervalHeight) / lineHeight;
                    const textRows = rowNum && /[0-9]/.test('' + rowNum) ? rowNum : Math.floor(rowNum) + 1;
                    let vaildRows = textRows;
                    if (textRows < minRows) {
                        vaildRows = minRows;
                    }
                    else if (textRows > maxRows) {
                        vaildRows = maxRows;
                    }
                    textElem.style.height = `${(vaildRows * lineHeight) + intervalHeight}px`;
                });
            }
        };
        const triggerEvent = (evnt) => {
            const value = reactData.inputValue;
            $xeTextarea.dispatchEvent(evnt.type, { value }, evnt);
        };
        const handleChange = (value, evnt) => {
            if (props.trim) {
                value = `${value || ''}`.trim();
            }
            reactData.inputValue = value;
            emit('update:modelValue', value);
            if (XEUtils.toValueString(props.modelValue) !== value) {
                textareaMethods.dispatchEvent('change', { value }, evnt);
                // 自动更新校验状态
                if ($xeForm && formItemInfo) {
                    $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
                }
            }
        };
        const inputEvent = (evnt) => {
            const { immediate } = props;
            const textElem = evnt.target;
            const value = textElem.value;
            reactData.inputValue = value;
            if (immediate) {
                handleChange(value, evnt);
            }
            $xeTextarea.dispatchEvent('input', { value }, evnt);
            handleResize();
        };
        const changeEvent = (evnt) => {
            const { immediate } = props;
            if (immediate) {
                triggerEvent(evnt);
            }
            else {
                handleChange(reactData.inputValue, evnt);
            }
            $xeTextarea.dispatchEvent('lazy-change', { value: reactData.inputValue }, evnt);
        };
        const blurEvent = (evnt) => {
            const { immediate } = props;
            const { inputValue } = reactData;
            if (!immediate) {
                handleChange(inputValue, evnt);
            }
            $xeTextarea.dispatchEvent('blur', { value: inputValue }, evnt);
        };
        textareaMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, createEvent(evnt, { $textarea: $xeTextarea }, params));
            },
            focus() {
                const textElem = refTextarea.value;
                textElem.focus();
                return nextTick();
            },
            blur() {
                const textElem = refTextarea.value;
                textElem.blur();
                return nextTick();
            }
        };
        Object.assign($xeTextarea, textareaMethods);
        watch(() => props.modelValue, (val) => {
            reactData.inputValue = val;
            updateAutoTxt();
        });
        watch(computeSizeOpts, () => {
            updateAutoTxt();
            handleResize();
        });
        nextTick(() => {
            const { autosize } = props;
            if (autosize) {
                updateAutoTxt();
                handleResize();
            }
        });
        const renderVN = () => {
            const { className, resize, autosize, showWordCount, countMethod, rows, cols } = props;
            const { inputValue } = reactData;
            const vSize = computeSize.value;
            const isDisabled = computeIsDisabled.value;
            const isCountError = computeIsCountError.value;
            const inputCount = computeInputCount.value;
            const inputReadonly = computeInputReadonly.value;
            const formReadonly = computeFormReadonly.value;
            const inpPlaceholder = computeInpPlaceholder.value;
            const inpMaxLength = computeInpMaxLength.value;
            if (formReadonly) {
                return h('div', {
                    ref: refElem,
                    class: ['vxe-textarea--readonly', className]
                }, inputValue);
            }
            return h('div', {
                ref: refElem,
                class: ['vxe-textarea', className, {
                        [`size--${vSize}`]: vSize,
                        'is--autosize': autosize,
                        'is--count': showWordCount,
                        'is--disabled': isDisabled,
                        'is--rows': !XEUtils.eqNull(rows),
                        'is--cols': !XEUtils.eqNull(cols)
                    }],
                spellcheck: false
            }, [
                h('textarea', {
                    ref: refTextarea,
                    class: 'vxe-textarea--inner',
                    value: inputValue,
                    name: props.name,
                    placeholder: inpPlaceholder,
                    maxlength: inpMaxLength,
                    readonly: inputReadonly,
                    disabled: isDisabled,
                    rows,
                    cols,
                    style: resize
                        ? {
                            resize
                        }
                        : null,
                    onInput: inputEvent,
                    onChange: changeEvent,
                    onKeydown: triggerEvent,
                    onKeyup: triggerEvent,
                    onClick: triggerEvent,
                    onFocus: triggerEvent,
                    onBlur: blurEvent
                }),
                showWordCount
                    ? h('span', {
                        class: ['vxe-textarea--count', {
                                'is--error': isCountError
                            }]
                    }, countMethod ? `${countMethod({ value: inputValue })}` : `${inputCount}${inpMaxLength ? `/${inpMaxLength}` : ''}`)
                    : null
            ]);
        };
        $xeTextarea.renderVN = renderVN;
        return $xeTextarea;
    },
    render() {
        return this.renderVN();
    }
});
