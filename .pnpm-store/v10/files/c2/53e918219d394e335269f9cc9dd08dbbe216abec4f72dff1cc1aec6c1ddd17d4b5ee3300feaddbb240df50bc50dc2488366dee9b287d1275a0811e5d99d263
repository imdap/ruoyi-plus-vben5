import { h, provide, inject, computed, reactive, watch, onMounted, nextTick, onUnmounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, useSize } from '../../ui';
import VxeRadioComponent from './radio';
import VxeRadioButtonComponent from './button';
function createInternalData() {
    return {
    // isLoaded: false
    };
}
export default defineVxeComponent({
    name: 'VxeRadioGroup',
    props: {
        modelValue: [String, Number, Boolean],
        disabled: {
            type: Boolean,
            default: null
        },
        type: String,
        options: Array,
        optionProps: Object,
        strict: {
            type: Boolean,
            default: () => getConfig().radioGroup.strict
        },
        size: {
            type: String,
            default: () => getConfig().radioGroup.size || getConfig().size
        },
        defaultConfig: Object
    },
    emits: [
        'update:modelValue',
        'change',
        'default-change'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const $xeForm = inject('$xeForm', null);
        const formItemInfo = inject('xeFormItemInfo', null);
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const reactData = reactive({});
        const internalData = createInternalData();
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
        const computeDefaultOpts = computed(() => {
            return Object.assign({}, props.defaultConfig);
        });
        const computeMaps = {
            computeIsDisabled
        };
        const $xeRadioGroup = {
            xID,
            props,
            context,
            reactData,
            name: XEUtils.uniqueId('xe_group_'),
            getComputeMaps: () => computeMaps
        };
        const computePropsOpts = computed(() => {
            return Object.assign({}, props.optionProps);
        });
        const computeLabelField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.label || 'label';
        });
        const computeValueField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.value || 'value';
        });
        const computeDisabledField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.disabled || 'disabled';
        });
        const emitModel = (value) => {
            emit('update:modelValue', value);
        };
        const emitDefaultValue = (value) => {
            emitModel(value);
            dispatchEvent('default-change', { value }, null);
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $radioGroup: $xeRadioGroup }, params));
        };
        const radioGroupMethods = {
            dispatchEvent
        };
        const radioGroupPrivateMethods = {
            handleChecked(params, evnt) {
                const { checkedValue, checkedLabel } = params;
                const value = checkedValue;
                emitModel(value);
                dispatchEvent('change', { value, label: value, checkedValue, checkedLabel }, evnt);
                // 自动更新校验状态
                if ($xeForm && formItemInfo) {
                    $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
                }
            }
        };
        const loadData = (datas) => {
            const { isLoaded } = internalData;
            const defaultOpts = computeDefaultOpts.value;
            const valueField = computeValueField.value;
            if (!isLoaded) {
                const { selectMode } = defaultOpts;
                if (datas.length > 0 && XEUtils.eqNull(props.modelValue)) {
                    if (selectMode === 'first' || selectMode === 'last') {
                        const selectItem = XEUtils[selectMode](datas);
                        if (selectItem) {
                            nextTick(() => {
                                if (XEUtils.eqNull(props.modelValue)) {
                                    emitDefaultValue(selectItem[valueField]);
                                }
                            });
                        }
                    }
                    internalData.isLoaded = true;
                }
            }
            return nextTick();
        };
        Object.assign($xeRadioGroup, radioGroupMethods, radioGroupPrivateMethods);
        const renderVN = () => {
            const { options, type } = props;
            const vSize = computeSize.value;
            const defaultSlot = slots.default;
            const valueField = computeValueField.value;
            const labelField = computeLabelField.value;
            const disabledField = computeDisabledField.value;
            const btnComp = type === 'button' ? VxeRadioButtonComponent : VxeRadioComponent;
            return h('div', {
                class: ['vxe-radio-group', {
                        [`size--${vSize}`]: vSize
                    }]
            }, defaultSlot
                ? defaultSlot({})
                : (options
                    ? options.map(item => {
                        return h(btnComp, {
                            key: item[valueField],
                            checkedValue: item[valueField],
                            content: item[labelField],
                            disabled: item[disabledField]
                        });
                    })
                    : []));
        };
        watch(() => props.options, (val) => {
            loadData(val || []);
        });
        onMounted(() => {
            nextTick(() => {
                const { options } = props;
                if (options) {
                    loadData(options);
                }
            });
        });
        onUnmounted(() => {
            XEUtils.assign(internalData, createInternalData());
        });
        provide('$xeRadioGroup', $xeRadioGroup);
        $xeRadioGroup.renderVN = renderVN;
        return $xeRadioGroup;
    },
    render() {
        return this.renderVN();
    }
});
